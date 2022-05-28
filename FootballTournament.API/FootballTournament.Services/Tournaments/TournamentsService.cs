namespace FootballTournament.Services.Tournaments
{
    using FootballTournament.Data;
    using FootballTournament.Data.Models;
    using FootballTournament.ViewModels.Tournaments;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Globalization;

    public class TournamentsService : ITournamentsService
    {
        private readonly FootballTournamentContext db;

        public TournamentsService(FootballTournamentContext db)
        {
            this.db = db;
        }

        public async Task<List<GetTournamentViewModel>> All()
        {
            return await this.db.Tournaments.Select(x => new GetTournamentViewModel()
            {
                Id = x.Id,
                Name = x.Name,
                Country = x.Country.FlagPicture,
                StartDate = x.StartDate.ToUniversalTime().ToString("dd/MM/yyyy HH:mm"),
                EndDate = x.EndDate.ToUniversalTime().ToString("dd/MM/yyyy HH:mm")
            }).ToListAsync();
        }

        public async Task<bool> CreateTournamentAsync(CreateTournamentInputModel input)
        {
            var countryEntity = this.db.Countries.FirstOrDefault(c => c.Name.ToLower() == input.Country.ToLower());

            if (countryEntity == null)
            {
                return false;
            }

            var isParsed = Enum.TryParse(input.Category, out Category categoryEntity);
            
            if (!isParsed)
            {
                return false;
            }

            var isParsedStartDate = DateTime.TryParseExact(input.StartDate, "dd-MM-yyyy HH:mm", 
                CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime startDate);
            var isParsedEndDate = DateTime.TryParseExact(input.EndDate, "dd-MM-yyyy HH:mm",
                CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime endDate);

            if (!isParsedStartDate || !isParsedEndDate)
            {
                return false;
            }

            await this.db.Tournaments.AddAsync(new Tournament()
            {
                Name = input.Name,
                Country = countryEntity,
                Category = categoryEntity,
                Price = input.Price,
                StartDate = startDate.ToUniversalTime(),
                EndDate = endDate.ToUniversalTime(),
            });
            await this.db.SaveChangesAsync();
            return true;
        }
    }
}
