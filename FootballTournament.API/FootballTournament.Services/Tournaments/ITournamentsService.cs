
namespace FootballTournament.Services.Tournaments
{
    using FootballTournament.ViewModels.Tournaments;

    public interface ITournamentsService
    {
        public Task<List<GetTournamentViewModel>> All();

        public Task<bool> CreateTournamentAsync(CreateTournamentInputModel input);

        public Task<GetTournamentViewModel> GetById(int id);

        public Task<bool> Update(GetTournamentViewModel input);

        public Task<bool> Delete(int id);

        public Task<bool> AddTeam(int teamId, int tournamentId);

        public Task<List<GetCountriesViewModel>> GetCountries();

        public List<GetTheBestTeam> GetTheBestTeams();

        public Task<List<GetMostExpensiveTournament>> GetMostExpensiveTournaments();
    }
}
