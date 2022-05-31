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
                Ranking = x.Ranking
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

        public async Task<bool> AddRanking(string userId)
        {
            var user = await this.db.Users.FirstOrDefaultAsync(x => x.Id == userId);

            if (user == null)
            {
                return false;
            }

            user.Ranking += 1;
            this.db.Users.Update(user);
            await this.db.SaveChangesAsync();
            return true;
        }

        public async Task<List<GetUserRankingViewModel>> GetTopPlayers()
        {
            var topPlayers = await this.db.Users
                .Where(x => x.Ranking > 0)
                .OrderByDescending(x => x.Ranking)
                .Select(x => new GetUserRankingViewModel()
                {
                    User = x.UserName,
                    Ranking = x.Ranking
                }).ToListAsync();

            return topPlayers;
        }
    }
}
