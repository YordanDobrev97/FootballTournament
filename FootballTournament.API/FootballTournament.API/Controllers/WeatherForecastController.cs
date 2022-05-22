using FootballTournament.Data;
using FootballTournament.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace FootballTournament.API.Controllers
{
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


        [HttpGet("/seedCountries")]
        public async Task<IActionResult> SeedCountries()
        {
            var countries = new List<Country>()
            {
                new Country()
                {
                    Name = "Bulgaria",
                    FlagPicture = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Flag_of_Bulgaria_%28with_coat_of_arms%29.svg/1280px-Flag_of_Bulgaria_%28with_coat_of_arms%29.svg.png"
                },
                new Country()
                {
                    Name = "United Kingdom",
                    FlagPicture = "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png"
                },
                new Country()
                {
                    Name = "Italy",
                    FlagPicture = "https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg"
                },
                new Country()
                {
                    Name = "Spain",
                    FlagPicture = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/2560px-Flag_of_Spain.svg.png"
                },
                new Country()
                {
                    Name = "France",
                    FlagPicture = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/2560px-Flag_of_France.svg.png"
                }
            };

            await this.db.Countries.AddRangeAsync(countries);
            await this.db.SaveChangesAsync();
            return new JsonResult("Successfully seed");
        }
    }
}