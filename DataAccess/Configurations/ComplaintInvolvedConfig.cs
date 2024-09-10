using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccess.Configurations
{
    public class ComplaintInvolvedConfig : IEntityTypeConfiguration<ComplaintInvolved>
    {
        public void Configure(EntityTypeBuilder<ComplaintInvolved> builder)
        {
            //Table Name
            builder.ToTable("ComplaintInvolved");
            
            //Primary Key
            builder.Property<int>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("int")
                .UseIdentityColumn();

            //Other Columns
            builder.HasMany(x => x.People);
            builder.HasMany(x => x.Complaints);
           

        }
    }
}