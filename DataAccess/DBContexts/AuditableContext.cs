using Application.Common.Interfaces;
using DataAccess.AuditTracking;
using Domain.AuditEntities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using EntityState = Microsoft.EntityFrameworkCore.EntityState;

namespace DataAccess.DBContexts
{
    public class AuditableContext : DbContext
    {
      
        public AuditableContext(DbContextOptions options) : base(options)
        {
           
        }

        public DbSet<Audit> AuditLogs { get; set; }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken)
        {
            try
            {
                OnBeforeSaveChanges();
                var result = await base.SaveChangesAsync(cancellationToken);
                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        private void OnBeforeSaveChanges()
        {
                       
            var auditEntries = new List<AuditEntry>();
            foreach (var entry in ChangeTracker.Entries().Where(e => e.Entity is not Audit && (e.State != EntityState.Detached && e.State != EntityState.Unchanged)))
            {
                UpdateAuditProps(entry);

                var auditEntry = new AuditEntry(entry)
                {
                    TableName = entry.Entity.GetType().Name,
                };
                auditEntries.Add(auditEntry);
                foreach (var property in entry.Properties)
                {
                    string propertyName = property.Metadata.Name;
                    if (property.Metadata.IsPrimaryKey())
                    {
                        auditEntry.KeyValues[propertyName] = property.CurrentValue;
                        continue;
                    }

                    switch (entry.State)
                    {
                        case EntityState.Added:
                            auditEntry.AuditType = AuditType.Create;
                            auditEntry.NewValues[propertyName] = property.CurrentValue;
                            break;

                        case EntityState.Deleted:
                            auditEntry.AuditType = AuditType.Delete;
                            auditEntry.OldValues[propertyName] = property.OriginalValue;
                            break;

                        case EntityState.Modified:
                            if (property.IsModified && property.OriginalValue?.ToString() != property.CurrentValue?.ToString())
                            {
                                auditEntry.ChangedColumns.Add(propertyName);
                                auditEntry.AuditType = AuditType.Update;
                                auditEntry.OldValues[propertyName] = property.OriginalValue;
                                auditEntry.NewValues[propertyName] = property.CurrentValue;
                            }
                            break;
                    }
                }
            }
            foreach (var auditEntry in auditEntries)
            {
                AuditLogs.Add(auditEntry.ToAudit());
            }
        }

        private void UpdateAuditProps(EntityEntry entry)
        {
            

            var modifiedBy = entry.Property("ModifiedBy");
            if (modifiedBy != null)
            {
               
                modifiedBy.IsModified = true;
            }

            var modifiedOn = entry.Property("ModifiedOn");
            if (modifiedOn != null)
            {
                modifiedOn.CurrentValue = DateTime.UtcNow;
                modifiedBy.IsModified = true;
            }
        }

       

    }
}