namespace FootballTournament.API.Controllers
{
    using FootballTournament.Services.Tournaments;
    using FootballTournament.ViewModels.Tournaments;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    public class TournamentsController : ControllerBase
    {
        private readonly ITournamentsService tournamentsService;
        
        public TournamentsController(ITournamentsService tournamentsService)
        {
            this.tournamentsService = tournamentsService;
        }

        [HttpGet]
        [Route("/tournaments/all")]
        public async Task<IActionResult> All()
        {
            var tournaments = await this.tournamentsService.All();
            return new JsonResult(tournaments);
        }

        [HttpPost]
        [Route("/tournaments/create")]
        public async Task<IActionResult> CreateTournamentAsync([FromBody] CreateTournamentInputModel input)
        {
            var res = await this.tournamentsService.CreateTournamentAsync(input);
            return new JsonResult(res);
        }

        [HttpPost]
        [Route("/tournaments/addTeam")]
        public async Task<bool> AddTeam([FromBody] AddTeamInputModel input)
        {
            var res = await this.tournamentsService.AddTeam(input.TeamId, input.TournamentId);
            return res;
        }

        [HttpGet]
        [Route("/tournaments/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var res = await this.tournamentsService.GetById(id);
            return new JsonResult(res);
        }

        [HttpPut]
        [Route("/tournaments/update")]
        public async Task<bool> Update([FromBody] GetTournamentViewModel input)
        {
            var res = await this.tournamentsService.Update(input);
            return res;
        }

        [HttpDelete]
        [Route("/tournaments/{id}")]
        public async Task<bool> Delete(int id)
        {
            var res = await this.tournamentsService.Delete(id);
            return res;
        }

        [HttpGet]
        [Route("/countries")]
        public async Task<IActionResult> GetCountries()
        {
            var res = await this.tournamentsService.GetCountries();
            return new JsonResult(res);
        }

        [HttpGet]
        [Route("/tournaments/theBestTeams")]
        public IActionResult GetTheBestTeams()
        {
            var res = this.tournamentsService.GetTheBestTeams();

            return new JsonResult(res);
        }

        [HttpGet]
        [Route("/tournaments/mostExpensive")]
        public async Task<IActionResult> GetMostExpensive()
        {
            var res = await this.tournamentsService.GetMostExpensiveTournaments();
            return new JsonResult(res);
        }
    }
}
