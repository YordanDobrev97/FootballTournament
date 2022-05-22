using FootballTournament.Services.Tournaments;
using FootballTournament.ViewModels.Tournaments;
using Microsoft.AspNetCore.Mvc;

namespace FootballTournament.API.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class TournamentsController : Controller
    {
        private readonly ITournamentsService tournamentsService;
        
        public TournamentsController(ITournamentsService tournamentsService)
        {
            this.tournamentsService = tournamentsService;
        }

        [HttpPost]
        [Route("/tournaments")]
        public async Task<IActionResult> CreateTournamentAsync([FromBody] CreateTournamentInputModel input)
        {
            var res = await this.tournamentsService.CreateTournamentAsync(input.Name, input.Country, input.Category, input.Price);
            return new JsonResult(res);
        }
    }
}
