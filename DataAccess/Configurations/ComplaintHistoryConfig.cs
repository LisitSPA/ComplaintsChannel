using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccess.Configurations
{
    public class ComplaintHistoryConfig: IEntityTypeConfiguration<ComplaintHistory>
    {
        public void Configure(EntityTypeBuilder<ComplaintHistory> builder)
        {
            //Table Name
            builder.ToTable("ComplaintHistory");
            
            //Primary Key
            builder.Property<int>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("int")
                .UseIdentityColumn();

            //Other Columns
           
           

        }
    }
}