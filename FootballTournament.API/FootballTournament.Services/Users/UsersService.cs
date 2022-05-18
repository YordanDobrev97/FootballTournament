namespace FootballTournament.Services.Users
{
    using FootballTournament.Data;
    using FootballTournament.Data.Models;
    using Microsoft.AspNetCore.Identity;

    public class UsersService : IUsersService
    {
        private readonly FootballTournamentContext db;
       
        public UsersService(FootballTournamentContext db)
        {
            this.db = db;
        }
    }
}
