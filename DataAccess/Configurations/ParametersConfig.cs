using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccess.Configurations
{
    public class ParametersConfig : IEntityTypeConfiguration<Parameters>
    {
        public void Configure(EntityTypeBuilder<Parameters> builder)
        {
            //Table Name
            builder.ToTable("Parameters");
            
            //Primary Key
            builder.Property<int>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("int")
                .UseIdentityColumn();

            //Other Columns
          
        }
    }
}