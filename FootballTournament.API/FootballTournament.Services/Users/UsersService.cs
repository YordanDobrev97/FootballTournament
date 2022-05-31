namespace FootballTournament.Services.Users
{
    using FootballTournament.Data;
    using FootballTournament.ViewModels.Users;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class UsersService : IUsersService
    {
        private readonly FootballTournamentContext db;
       
        public UsersService(FootballTournamentContext db)
        {
            this.db = db;
        }

        public async Task<List<UserViewModel>> All()
        {
            return await this.db.Users.Select(x => new UserViewModel()
            {
                Id = x.Id,
                Username = x.UserName,
            }).ToListAsync();
        }

        public async Task<string> GetById(string id)
        {
            var user = await this.db.Users
                .Where(x => x.Id == id)
                .Select(x => x.UserName)
                .FirstOrDefaultAsync();

            return user;
        }
    }
}
