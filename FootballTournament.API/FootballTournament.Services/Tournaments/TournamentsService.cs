namespace FootballTournament.Services.Tournaments
{
    using FootballTournament.Data;
    using FootballTournament.Data.Models;

    public class TournamentsService : ITournamentsService
    {
        private readonly FootballTournamentContext db;

        public TournamentsService(FootballTournamentContext db)
        {
            this.db = db;
        }

        public async Task<bool> CreateTournamentAsync(string name, string country, string category, decimal price)
        {

            var countryEntity = this.db.Countries.FirstOrDefault(c => c.Name == country);

            if (countryEntity == null)
            {
                return false;
            }

            var isParsed = Enum.TryParse(category, out Category categoryEntity);
            
            if (!isParsed)
            {
                return false;
            }

            await this.db.Tournaments.AddAsync(new Tournament()
            {
                Name = name,
                Country = countryEntity,
                Category = categoryEntity,
                Price = price
            });

            return true;
        }
    }
}
