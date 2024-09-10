using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccess.Configurations
{
    public class ComplaintConfig: IEntityTypeConfiguration<Complaint>
    {
        public void Configure(EntityTypeBuilder<Complaint> builder)
        {
            //Table Name
            builder.ToTable("Complaints");
            
            //Primary Key
            builder.Property<int>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("int")
                .UseIdentityColumn();

            //Other Columns
            builder.HasOne(x => x.Complainant);
            builder.HasMany(x => x.ComplaintInvolved);
            builder.HasMany(x => x.ComplaintReasons);
            builder.HasMany(x => x.Attachments);
           

        }
    }
}