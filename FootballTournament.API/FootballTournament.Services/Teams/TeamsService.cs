namespace FootballTournament.Services.Teams
{
    using FootballTournament.Data;
    using FootballTournament.Data.Models;
    using FootballTournament.ViewModels.Teams;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;

    public class TeamsService : ITeamsService
    {
        private readonly FootballTournamentContext db;

        public TeamsService(FootballTournamentContext db)
        {
            this.db = db;
        }

        public async Task<List<ListTeamViewModel>> All(string userId)
        {
            return await this.db.Teams.Select(x => new ListTeamViewModel()
            {
                Id = x.Id,
                Name = x.Name,
                MaxCapacity = x.MaxCapacity,
                FreeCapacity = Math.Abs(x.MaxCapacity - x.Players.Count),
                IsCreated = x.Captain.Id == userId,
                Captain = new CaptainViewModel()
                {
                    Id = x.Captain.Id,
                    Username = x.Captain.UserName
                }
            }).ToListAsync();
        }

        public async Task<bool> CreateAsync(string userId, string name, int capacity)
        {
            if (this.db.Teams.Any(t => t.Name == name))
            {
                return false;
            }

            var captain = this.db.Users.FirstOrDefault(u => u.Id == userId);

            if (captain == null)
            {
                return false;
            }

            await this.db.Teams.AddAsync(new Team()
            {
                Name = name,
                MaxCapacity = capacity,
                Captain = captain
            });
            await this.db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Update(int id, string name, int maxCapacity, string newCaptainId)
        {
            var team = await this.db.Teams.FirstOrDefaultAsync(x => x.Id == id);

            if (team == null)
            {
                return false;
            }

            var newCaptain = await this.db.Users.FirstOrDefaultAsync(x => x.Id == newCaptainId);

            if (newCaptain == null)
            {
                return false;
            }

            team.Name = name;
            team.MaxCapacity = maxCapacity;
            team.Captain = newCaptain;

            this.db.Teams.Update(team);
            await this.db.SaveChangesAsync();

            return true;
        }

        public async Task<GetTeamById> GetById(int id)
        {
            var allPlayers = await this.db.Users.Select(x => new CaptainViewModel()
            {
                Id = x.Id,
                Username = x.UserName
            }).ToListAsync();

            var res = await this.db.Teams
                .Where(x => x.Id == id)
                .Select(x => new GetTeamById()
            {
                Id = x.Id,
                Name = x.Name,
                MaxCapacity = x.MaxCapacity,
                CurrentCaptain = new CaptainViewModel()
                {
                    Id = x.Captain.Id,
                    Username = x.Captain.UserName
                },
                Players = allPlayers
            }).FirstOrDefaultAsync();

            return res;
        }

        public async Task<bool> Delete(int id)
        {
            var team = await this.db.Teams.FirstOrDefaultAsync(x => x.Id == id);

            if (team == null)
            {
                return false;
            }

            this.db.Teams.Remove(team);
            await this.db.SaveChangesAsync();

            return true;
        }

        public async Task<bool> AddPlayer(int teamId, string player)
        {
            var team = await this.db.Teams.FirstOrDefaultAsync(x => x.Id == teamId);

            if (team == null) return false;

            var user = await this.db.Users.FirstOrDefaultAsync(x => x.Id == player);

            if (user == null) return false;

            team.Players.Add(user);
            this.db.Teams.Update(team);
            await this.db.SaveChangesAsync();
            return true;
        }
    }
}
