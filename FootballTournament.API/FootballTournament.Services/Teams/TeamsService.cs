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
    }
}
