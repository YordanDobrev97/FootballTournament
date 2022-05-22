namespace FootballTournament.Data
{
    using FootballTournament.Data.Models;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;

    public class FootballTournamentContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public FootballTournamentContext(DbContextOptions<FootballTournamentContext> options)
            : base(options)
        {
        }

        public DbSet<ApplicationUser> Users { get; set; }

        public DbSet<ApplicationRole> Roles { get; set; }

        public DbSet<Tournament> Tournaments { get; set; }

        public DbSet<Team> Teams { get; set; }

        public DbSet<Country> Countries { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

    }
}
