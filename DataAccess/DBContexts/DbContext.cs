
using System.Reflection;
using Application.Common.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.DBContexts
{
    public class ComplaintDbContext : AuditableContext, IComplaintDbContext
    {
       
        public ComplaintDbContext(DbContextOptions options) : base(options)
        {
            
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            base.OnModelCreating(builder);
        }

        public DbSet<Complaint> Complaints { get; set; }
        public DbSet<Attachment> Attachtments { get; set; }
        public DbSet<ComplaintInvolved>  Involveds { get; set; }
        public DbSet<ComplaintReasons>  ComplaintReasons { get; set; }
        public DbSet<ComplaintType>  Reasons { get; set; }
        public DbSet<User>  People { get; set; }
        public DbSet<Chat>  Chat { get; set; }
       
        
    }
}