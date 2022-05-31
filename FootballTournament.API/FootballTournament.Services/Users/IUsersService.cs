namespace FootballTournament.Services.Users
{
    using FootballTournament.ViewModels.Users;

    public interface IUsersService
    {
        public Task<List<UserViewModel>> All();

        public Task<string> GetById(string id);

        public Task<bool> AddRanking(string userId);
    }
}
