using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.DBContexts
{
    public interface IComplaintDbContext
    {
        public DbSet<Complaint> Complaint { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}