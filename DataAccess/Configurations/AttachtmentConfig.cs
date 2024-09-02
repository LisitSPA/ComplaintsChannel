using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccess.Configurations
{
    public class AttachtmentConfig : IEntityTypeConfiguration<Attachtment>
    {
        public void Configure(EntityTypeBuilder<Attachtment> builder)
        {
            //Table Name
            builder.ToTable("Attachtments");
            
            //Primary Key
            builder.Property<int>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("int")
                .UseIdentityColumn();

            //Other Columns

        }
    }
}