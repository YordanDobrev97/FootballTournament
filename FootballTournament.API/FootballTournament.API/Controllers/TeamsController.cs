namespace FootballTournament.API.Controllers
{
    using FootballTournament.Services.Teams;
    using FootballTournament.ViewModels.Teams;
    using Microsoft.AspNetCore.Mvc;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;

    [ApiController]
    public class TeamsController : ControllerBase
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
            var teams = await this.teamsService.All();
            return new JsonResult(teams);
        }

        [HttpPost]
        [Route("/teams/create")]
        public async Task<bool> Create([FromBody] CreateTeamInputModel input)
        {
            var token = this.HttpContext.Request.Headers["X-User-Token"].ToString();
            var userId = GetUserId(token);
            
            if (userId == null)
            {
                return false;
            }

            var res = await this.teamsService.CreateAsync(userId, input.Name, input.Capacity);
            return res;
        }

        private string GetUserId(Microsoft.Extensions.Primitives.StringValues cookie)
        {
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(cookie);
            var tokenS = handler.ReadToken(cookie) as JwtSecurityToken;
            var id = tokenS.Claims.Where(x => x.Type == ClaimTypes.NameIdentifier)
                .FirstOrDefault()?.Value;

            return id;
        }
    }
}
