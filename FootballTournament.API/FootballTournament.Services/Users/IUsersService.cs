namespace FootballTournament.Services.Users
{
    using FootballTournament.ViewModels.Users;

    public interface IUsersService
    {
        public Task<List<UserViewModel>> All(); 
    }
}
