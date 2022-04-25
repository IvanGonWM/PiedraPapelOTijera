using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using PiedraPapelOTijera.Data.Model;

namespace PiedraPapelOTijera.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {
        }

        public DbSet<Model.InfoRondas> Rondas { get; set; }
        public DbSet<Gana> Gana { get; set; }
        public DbSet<Partida> Partida { get; set; }
        public DbSet<Elemento> Elemento { get; set; }

        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
            base.OnModelCreating(modelbuilder);

            foreach (var foreignKey in modelbuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                foreignKey.DeleteBehavior = DeleteBehavior.NoAction;
            }

            modelbuilder.Entity<Elemento>()
                .HasMany(r => r.RondasE1)
                .WithOne(e => e.Elemento1)
                .HasForeignKey(e => e.Elemento1Id)
                .OnDelete(DeleteBehavior.NoAction);

            modelbuilder.Entity<Elemento>()
                .HasMany(r => r.RondasE2)
                .WithOne(e => e.Elemento2)
                .HasForeignKey(e => e.Elemento2Id)
                .OnDelete(DeleteBehavior.NoAction);

        }
    }
}
