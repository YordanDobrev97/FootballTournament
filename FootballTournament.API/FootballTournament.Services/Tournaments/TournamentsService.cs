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

        public async Task<bool> AddTeam(int teamId, int tournamentId)
        {
            var team = await this.db.Teams.FirstOrDefaultAsync(x => x.Id == teamId);

            if (team == null) return false;

            var tournament = await this.db.Tournaments.FirstOrDefaultAsync(x => x.Id == tournamentId);

            if (tournament == null) return false;

            tournament.Teams.Add(team);
            this.db.Tournaments.Update(tournament);
            await this.db.SaveChangesAsync();

            return true;
        }

        public async Task<List<GetTournamentViewModel>> All()
        {
            return await this.db.Tournaments.Select(x => new GetTournamentViewModel()
            {
                Id = x.Id,
                Name = x.Name,
                Country = x.Country.FlagPicture,
                Category = x.Category.ToString(),
                Price = x.Price,
                Winner = x.Winner.Name,
                StartDate = x.StartDate.ToUniversalTime().ToString("dd/MM/yyyy"),
                EndDate = x.EndDate.ToUniversalTime().ToString("dd/MM/yyyy")
            }).ToListAsync();
        }

        public async Task<bool> CreateTournamentAsync(CreateTournamentInputModel input)
        {
            var countryEntity = this.db.Countries.FirstOrDefault(c => c.Name.ToLower() == input.Country.ToLower());

            if (countryEntity == null) return false;

            var categoryRes = this.ParseCategory(input.Category);
            
            if (categoryRes == null) return false;

            var parsedStartDate = this.ParseDate(input.StartDate, "dd-MM-yyyy HH:mm");

            if (parsedStartDate == null) return false;

            var parsedEndDate = this.ParseDate(input.EndDate, "dd-MM-yyyy HH:mm");

            if (parsedEndDate == null) return false;

            await this.db.Tournaments.AddAsync(new Tournament()
            {
                Name = input.Name,
                Country = countryEntity,
                Category = (Category)categoryRes,
                Price = input.Price,
                StartDate = ((DateTime)parsedStartDate).ToUniversalTime(),
                EndDate = ((DateTime)parsedEndDate).ToUniversalTime(),
            });
            await this.db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Delete(int id)
        {
            var tournament = await this.db.Tournaments.FirstOrDefaultAsync(x => x.Id == id);

            if (tournament == null) return false;

            this.db.Tournaments.Remove(tournament);
            await this.db.SaveChangesAsync();
            return true;
        }

        public async Task<GetTournamentViewModel> GetById(int id)
        {
            var tournament = await this.db.Tournaments
                .Where(x => x.Id == id)
                .Select(x => new GetTournamentViewModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Category = x.Category.ToString(),
                    Country = x.Country.Name,
                    Price = x.Price,
                    Winner = x.Winner.Name,
                    StartDate = x.StartDate.ToUniversalTime().ToString("dd/MM/yyyy HH:mm"),
                    EndDate = x.EndDate.ToUniversalTime().ToString("dd/MM/yyyy HH:mm")
                }).FirstOrDefaultAsync();

            return tournament;
        }

        public async Task<List<GetCountriesViewModel>> GetCountries()
        {
            return await this.db.Countries.Select(c => new GetCountriesViewModel()
            {
                Id = c.Id,
                Name = c.Name
            }).ToListAsync();
        }

        public async Task<bool> Update(GetTournamentViewModel input)
        {
            var tournament = await this.db.Tournaments.FirstOrDefaultAsync(x => x.Id == input.Id);

            if (tournament == null) return false;

            var categoryRes = this.ParseCategory(input.Category);

            if (categoryRes == null) return false;

            var country = await this.db.Countries.FirstOrDefaultAsync(x => x.Name == input.Country);

            if (country == null) return false;

            var team = await this.db.Teams.FirstOrDefaultAsync(x => x.Name == input.Winner);

            if (team == null) return false;

            var parseStartDate = this.ParseDate(input.StartDate, "dd.MM.yyyy HH:mm");

            if (parseStartDate == null) return false;

            var parseEndDate = this.ParseDate(input.EndDate, "dd.MM.yyyy HH:mm");

            if (parseEndDate == null) return false;

            tournament.Name = input.Name;
            tournament.Category = (Category)categoryRes;
            tournament.Country = country;
            tournament.Price = input.Price;
            tournament.Winner = team;
            tournament.StartDate = ((DateTime)parseStartDate).ToUniversalTime();
            tournament.EndDate = ((DateTime)parseEndDate).ToUniversalTime();

            this.db.Tournaments.Update(tournament);
            await this.db.SaveChangesAsync();

            return true;
        }

        private object ParseCategory(string inputCategory)
        {
            var isParsed = Enum.TryParse(inputCategory, out Category categoryEntity);
            
            if (!isParsed) return null;

            return categoryEntity;
        }

        private object ParseDate(string date, string format)
        {
            var isParsedStartDate = DateTime.TryParseExact(date, format,
                            CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime parseDate);
            
            if (!isParsedStartDate) return null;

            return parseDate;
        }
    }
}
