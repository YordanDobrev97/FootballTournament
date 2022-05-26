namespace FootballTournament.Services.Teams
{
    using FootballTournament.ViewModels.Teams;
    public interface ITeamsService
    {
        public Task<List<ListTeamViewModel>> All(string userId);

        public Task<bool> CreateAsync(string userId, string name, int capacity);
    }
}
