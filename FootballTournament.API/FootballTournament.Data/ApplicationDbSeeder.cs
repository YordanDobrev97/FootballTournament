using FootballTournament.Data.Seeding;

namespace FootballTournament.Data
{
    public class ApplicationDbSeeder
    {
        private readonly FootballTournamentContext db;
        public ApplicationDbSeeder(FootballTournamentContext db)
        {
            this.db = db;
        }

        public async Task Seed()
        {
            await new CountrySeeder(db).Seed();

        }

 
    }
}
