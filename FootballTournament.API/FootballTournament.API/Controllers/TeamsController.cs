namespace FootballTournament.API.Controllers
{
    using FootballTournament.Services.Teams;
    using FootballTournament.ViewModels.Teams;
    using Microsoft.AspNetCore.Mvc;
    
    public class TeamsController : BaseController
    {
        private readonly ITeamsService teamsService;

        public TeamsController(ITeamsService teamsService)
        {
            this.teamsService = teamsService;
        }

        [HttpGet]
        [Route("/teams/all")]
        public async Task<IActionResult> All()
        {
            var userId = this.GetUserId();
            var teams = await this.teamsService.All(userId);
            return new JsonResult(teams);
        }

        [HttpPost]
        [Route("/teams/create")]
        public async Task<bool> Create([FromBody] CreateTeamInputModel input)
        {
            var userId = this.GetUserId();
            
            if (userId == null)
            {
                return false;
            }

            var res = await this.teamsService.CreateAsync(userId, input.Name, input.Capacity);
            return res;
        }

        [HttpPut]
        [Route("/teams/update")]
        public async Task<bool> Update([FromBody] UpdateTeamInputModel input)
        {
            var res = await this.teamsService.Update(input.Id, input.Name, input.MaxCapacity, input.NewCaptainId);
            return res;
        }

        [HttpGet]
        [Route("/teams/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var res = await this.teamsService.GetById(id);
            return new JsonResult(res);
        }

        [HttpDelete]
        [Route("/teams/{id}")]
        public async Task<bool> Delete(int id)
        {
            var res = await this.teamsService.Delete(id);
            return res;
        }

        [HttpPost]
        [Route("/teams/addPlayer")]
        public async Task<bool> AddPlayer([FromBody] AddPlayerViewModel input)
        {
            var res = await this.teamsService.AddPlayer(input.TeamId, input.PlayerId);
            return res;
        }
    }
}
