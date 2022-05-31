namespace FootballTournament.API.Controllers
{
    using FootballTournament.Data;
    using FootballTournament.Data.Models;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Identity;
    public class SeedController : BaseController
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<ApplicationRole> roleManager;
        private readonly FootballTournamentContext db;

        public SeedController(
            FootballTournamentContext db,
            UserManager<ApplicationUser> userManager,
            RoleManager<ApplicationRole> roleManager)
        {
            this.db = db;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        [HttpGet]
        [Route("/seedCountries")]
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

        [HttpGet]
        [Route("/createAdmin")]
        public async Task<IActionResult> CreateAdminUser()
        {
            var newUser = new ApplicationUser()
            {
                UserName = "admin",
            };

            var newRole = new ApplicationRole("Admin");

            var result = await this.userManager.CreateAsync(newUser, "admin-pass");
            var resRole = await this.roleManager.CreateAsync(newRole);

            await this.userManager.AddToRoleAsync(newUser, "Admin");

            return new JsonResult("Created");
        }
    }
}
