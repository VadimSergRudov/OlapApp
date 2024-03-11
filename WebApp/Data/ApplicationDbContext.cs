using Microsoft.EntityFrameworkCore;
using WebApp.Domain.Entities;

namespace WebApp.Data
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        public DbSet<DimCountry> Countries => Set<DimCountry>();
        public DbSet<DimIndicator> Indicators => Set<DimIndicator>();
        public DbSet<Facts> Facts => Set<Facts>();

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
