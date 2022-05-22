using FootballTournament.Data.Models;

namespace FootballTournament.Data.Seeding
{
    public class CountrySeeder
    {
        private readonly FootballTournamentContext db;

        public CountrySeeder(FootballTournamentContext db)
        {
            this.db = db;
        }

        public async Task Seed()
        {
            var countries = new List<Country>()
            {
                new Country()
                {
                    Name = "Bulgaria",
                    FlagPicture = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Flag_of_Bulgaria_%28with_coat_of_arms%29.svg/1280px-Flag_of_Bulgaria_%28with_coat_of_arms%29.svg.png"
                },
                new Country()
                {
                    Name = "United Kingdom",
                    FlagPicture = "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png"
                },
                new Country()
                {
                    Name = "Italy",
                    FlagPicture = "https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg"
                },
                new Country()
                {
                    Name = "Spain",
                    FlagPicture = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/2560px-Flag_of_Spain.svg.png"
                },
                new Country()
                {
                    Name = "France",
                    FlagPicture = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/2560px-Flag_of_France.svg.png"
                }
            };

            await this.db.Countries.AddRangeAsync(countries);
        }
    }
}
