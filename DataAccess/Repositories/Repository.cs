using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using DataAccess.DBContexts;
using Domain.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage;

namespace DataAccess.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected ComplaintDbContext DbContext { get; set; }
        protected DbSet<T> DbSet { get; set; }

        public Repository(ComplaintDbContext dbContext)
        {
            DbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext),"dbContext it's Null");
            DbSet = DbContext.Set<T>();
        }

        public virtual IQueryable<T> GetAll()
        {
            return DbSet;
        }
        
        public virtual async Task<bool> AllAsync( Expression<Func<T, bool>> predicate, CancellationToken cancellationToken)
        {
             //  return await _DbSet.Where(expression).ToListAsync();
            return await DbSet.AllAsync(predicate,cancellationToken);
        }
        
        public virtual IQueryable<T> GetAllActive()
        {
            var arg = Expression.Parameter(typeof(T), "p");
            var body = Expression.Call(Expression.Property(arg, "Active"), "Equals", null, Expression.Constant(true));
            var predicate = Expression.Lambda<Func<T, bool>>(body, arg);

            return DbSet.Where(predicate);
        }
        public virtual async Task<T> GetByIdAsync(int id)
        {
            return await DbSet.FindAsync(id);
        }
        public virtual async Task<T> GetByIdAsync(string id)
        {
            return await DbSet.FindAsync(id);
        }
        // LIST
        public virtual async Task<List<T>> ToListAsync()
        {
            return await DbSet.ToListAsync();
        }

        // ADD
        public virtual T Add(T entity)
        {
            try
            {
                var dbEntityEntry = DbContext.Entry<T>(entity);
                if (dbEntityEntry.State == EntityState.Detached)
                {
                    DbSet.Add(entity);
                }
                dbEntityEntry.State = EntityState.Added;

                return dbEntityEntry.Entity;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }

        }

        public virtual async void AddAsync(T entity)
        {
            EntityEntry dbEntityEntry = DbContext.Entry(entity);
            if (dbEntityEntry.State == EntityState.Detached)
            {
                await DbSet.AddAsync(entity);
            }
            dbEntityEntry.State = EntityState.Added;
        }

        public virtual void AddRange(List<T> entities)
        {
            DbContext.AddRange(entities);
        }

        public virtual async void AddRangComplaintync(T[] entities)
        {
            await DbContext.AddRangeAsync(entities);
        }

        public virtual void DeleteRangComplaintync(T[] entities)
        {
             DbContext.RemoveRange(entities);
        }

        // UPDATE
        public virtual void Update(T entity)
        {
            EntityEntry dbEntityEntry = DbContext.Entry(entity);
            if (dbEntityEntry.State == EntityState.Detached)
            {
                DbSet.Attach(entity);
            }
            dbEntityEntry.State = EntityState.Modified;
        }
        public virtual void UpdateProperty(T entity, Expression<Func<T, object>> expression)
        {
            DbContext.Entry(entity).State = EntityState.Unchanged;

            var memberExpression = expression.Body as MemberExpression ?? ((UnaryExpression)expression.Body).Operand as MemberExpression;

            if (memberExpression != null)
                DbContext.Entry(entity).Property(memberExpression.Member.Name).IsModified = true;

            // _DbContext.ChangeTracker.ValidateOnSaveEnabled = false;
        }

        // DELETE
        public virtual async Task DeletComplaintync(int id)
        {
            var entity = await this.GetByIdAsync(id);

            if (entity == null) return; // not found; assume already deleted.

            EntityEntry dbEntityEntry = DbContext.Entry(entity);
            if (dbEntityEntry.State == EntityState.Deleted)
            {
                DbSet.Attach(entity);
                DbSet.Remove(entity);
            }
            dbEntityEntry.State = EntityState.Deleted;
        }

        public virtual async void DeactivatComplaintync(int id)
        {
            var entity = await GetByIdAsync(id);

            if (entity == null) return; // not found; assume already deleted.

            PropertyInfo active = entity.GetType().GetProperty("Active");
            if (active != null)
            {
                active.SetValue(entity, true, null);
            }

            EntityEntry dbEntityEntry = DbContext.Entry(entity);
            if (dbEntityEntry.State == EntityState.Detached)
            {

                DbSet.Attach(entity);
            }
            dbEntityEntry.State = EntityState.Modified;
        }

        public virtual void Deactivate(T entity)
        {
            DbContext.Entry(entity).State = EntityState.Unchanged;

            entity.GetType().GetProperty("Active")?.SetValue(entity, false);

            DbContext.Entry(entity).Property("Active").IsModified = true;

           // _DbContext.Configuration.ValidateOnSaveEnabled = false;
        }

        // SAVE
        public async Task<bool> SavComplaintync(CancellationToken cancellationToken)
        {
            return (await DbContext.SaveChangesAsync(cancellationToken)) > 0;
        }

        public bool Save() => (DbContext.SaveChanges()) > 0;

        public IQueryable<T> GetAllIncluding(params Expression<Func<T, object>>[] includeProperties)
        {
            return includeProperties.Aggregate<Expression<Func<T, object>>, IQueryable<T>>(DbSet, (current, includeProperty) => current.Include(includeProperty));
        }

        public async Task<IEnumerable<T>> GetByConditionsAsync(Expression<Func<T, bool>> expression)
        {
            return await DbSet.Where(expression).ToListAsync();
        }

        public List<Dictionary<string, object>> ExecuteReaderDictionary(string command)
        {
            return ExecuteReaderDictionary(command, null);
        }
        public List<Dictionary<string, object>> ExecuteReaderDictionary(string command, Dictionary<string, object> parameters)
        {
            var result = new List<Dictionary<string, object>>();
            using(var cmd = GetCommand())
            {
                cmd.CommandText = command;
                if (parameters != null)
                {
                    parameters.ToList().ForEach(p => cmd.Parameters.Add(GetParamFromDictionary(cmd, p)));
                }
                using (var reader = cmd.ExecuteReader())
                {
                    var columns = reader.GetColumnSchema().Select(p => p.ColumnName).ToList();
                    var headers = string.Join(',', columns) + Environment.NewLine;
                    while (reader.Read())
                    {
                        var row = new Dictionary<string, object>(
                                columns.Select(p => new KeyValuePair<string, object>(p, reader.GetValue(columns.IndexOf(p)))));
                        result.Add(row);
                    }
                }
            }
            return result;
        }

        public int ExecuteNonQuery(string command)
        {
            return ExecuteNonQuery(command, null);
        }
        public int ExecuteNonQuery(string command, Dictionary<string, object> parameters)
        {
            using (DbCommand cmd = GetCommand())
            {
                if (parameters != null)
                {
                    parameters.ToList().ForEach(p => cmd.Parameters.Add(GetParamFromDictionary(cmd, p)));
                }
                cmd.CommandText = command;
                return cmd.ExecuteNonQuery();
            }
        }

        private DbCommand GetCommand()
        {
            var cmd = DbContext.Database.GetDbConnection().CreateCommand();
            if (cmd.Connection.State == System.Data.ConnectionState.Closed)
            {
                cmd.Connection.Open();
            }
            return cmd;
        }

        private DbParameter GetParamFromDictionary(DbCommand cmd, KeyValuePair<string, object> parameter)
        {
            var result = cmd.CreateParameter();
            result.ParameterName = parameter.Key;
            result.Value = parameter.Value;
            return result; 
        }
   
        public  IDbContextTransaction BeginTransaction()
        { 
            return DbContext.Database.BeginTransaction();
        }

        public async Task<IEnumerable<T>> ExecuteStoreProcedure(string storeProcedure, SqlParameter[] parameters)
        {
            string proc = $"EXEC {storeProcedure}";
            return await DbSet.FromSqlRaw(proc, parameters).ToListAsync();
        }


    }
}