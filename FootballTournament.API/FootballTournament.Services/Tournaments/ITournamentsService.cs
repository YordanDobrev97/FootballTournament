
namespace FootballTournament.Services.Tournaments
{
    public interface ITournamentsService
    {
        public Task<bool> CreateTournamentAsync(string name, string country, string category, decimal price);
    }
}
