
namespace FootballTournament.Services.Tournaments
{
    using FootballTournament.ViewModels.Tournaments;

    public interface ITournamentsService
    {
        public Task<List<GetTournamentViewModel>> All();

        public Task<bool> CreateTournamentAsync(CreateTournamentInputModel input);
    }
}
