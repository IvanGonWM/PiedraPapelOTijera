using Microsoft.EntityFrameworkCore;

namespace PiedraPapelOTijera.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options)
            : base(options)
        {}

        public DbSet<Model.InfoRondas>IRondas { get; set; }
    }
}
