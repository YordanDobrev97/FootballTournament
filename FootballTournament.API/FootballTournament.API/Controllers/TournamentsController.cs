using FootballTournament.Services.Tournaments;
using FootballTournament.ViewModels.Tournaments;
using Microsoft.AspNetCore.Mvc;

namespace FootballTournament.API.Controllers
{
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
    }
}
