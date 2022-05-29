namespace FootballTournament.Services.Teams
{
    using FootballTournament.ViewModels.Teams;
    public interface ITeamsService
    {
        public Task<List<ListTeamViewModel>> All(string userId);

        public Task<bool> CreateAsync(string userId, string name, int capacity);

        public Task<bool> Update(int id, string name, int maxCapacity, string newCaptainId);

        public Task<GetTeamById> GetById(int id);

        public Task<bool> Delete(int id);
    }
}
