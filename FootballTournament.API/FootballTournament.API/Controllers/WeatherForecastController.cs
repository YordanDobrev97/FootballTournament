

namespace FootballTournament.API.Controllers
{
    using FootballTournament.Data;
    using Microsoft.AspNetCore.Mvc;

    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly FootballTournamentContext db;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, FootballTournamentContext db)
        {
            _logger = logger;
            this.db = db;
        }
    }
}