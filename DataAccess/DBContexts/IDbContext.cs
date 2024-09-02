using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.DBContexts
{
    public interface IComplaintDbContext
    {
        public DbSet<Complaint> Complaints { get; set; }
        public DbSet<Attachtment> Attachtments { get; set; }
        public DbSet<ComplaintInvolved> Involveds { get; set; }
        public DbSet<ComplaintReasons> ComplaintReasons { get; set; }
        public DbSet<ComplaintType> Reasons { get; set; }
        public DbSet<Person> People { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}