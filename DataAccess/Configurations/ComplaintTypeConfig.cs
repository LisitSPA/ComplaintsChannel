using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccess.Configurations
{
    public class ComplaintTypeConfig : IEntityTypeConfiguration<ComplaintType>
    {
        public void Configure(EntityTypeBuilder<ComplaintType> builder)
        {
            //Table Name
            builder.ToTable("ComplaintTypes");
            
            //Primary Key
            builder.Property<int>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("int")
                .UseIdentityColumn();

            //Other Columns

        }
    }
}