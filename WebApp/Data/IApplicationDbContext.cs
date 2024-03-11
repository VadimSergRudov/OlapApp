using Microsoft.EntityFrameworkCore;
using WebApp.Domain.Entities;

namespace WebApp.Data
{
    public interface IApplicationDbContext
    {
        DbSet<DimCountry> Countries { get; }
        DbSet<DimIndicator> Indicators { get; }
        DbSet<Facts> Facts { get; }

        int SaveChanges();
    }
}
