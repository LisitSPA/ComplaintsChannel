using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccess.Configurations
{
    public class ComplaintReasonsConfig : IEntityTypeConfiguration<ComplaintReasons>
    {
        public void Configure(EntityTypeBuilder<ComplaintReasons> builder)
        {
            //Table Name
            builder.ToTable("ComplaintReasons");
            
            //Primary Key
            builder.Property<int>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("int")
                .UseIdentityColumn();

            //Other Columns
            builder.HasOne(x => x.Complaint).WithMany(x => x.Reasons).HasForeignKey(x => x.ComplaintTypeId);
            builder.HasOne(x => x.Reason);

        }
    }
}