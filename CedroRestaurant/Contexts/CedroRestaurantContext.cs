using System.Security.Cryptography.X509Certificates;
using CedroRestaurant.Models;
using Microsoft.EntityFrameworkCore;

namespace CedroRestaurant.Contexts
{
    public class CedroRestaurantContext : DbContext
    {
        public DbSet<Restaurant> Restaurants { get; set; }
        public DbSet<Dish> Dishes { get; set; }

        public CedroRestaurantContext(DbContextOptions<CedroRestaurantContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Restaurant>(entity =>
            {
                entity.ToTable("Restaurant");
                entity.HasKey(x => x.Id);
                entity.Property(x => x.Name).HasColumnType("varchar(150)").IsRequired();
                entity.Property(x => x.CreateDate).HasColumnType("datetime");

            });

            modelBuilder.Entity<Dish>(entity =>
            {
                entity.ToTable("Dish");
                entity.HasKey(x => x.Id);
                entity.Property(x => x.Name).HasColumnType("varchar(150)").IsRequired();
                entity.Property(x => x.Price).HasColumnType("decimal(10,2)").IsRequired();
                entity.Property(x => x.CreateDate).HasColumnType("datetime");

                entity.HasOne(x => x.Restaurant)
                .WithMany(x => x.Dishes)
                .HasForeignKey(x => x.RestaurantId);
            });
        }
    }
}
