namespace FootballTournament.API.Controllers
{
    using FootballTournament.Data.Models;
    using FootballTournament.ViewModels.Users;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.IdentityModel.Tokens;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;

    [ApiController]
    [Route("/[controller]")]
    public class UsersController : Controller
    {
        private readonly IConfiguration configuration;
        private readonly UserManager<ApplicationUser> userManager;

        public UsersController(
            IConfiguration configuration,
            UserManager<ApplicationUser> userManager)
        {
            this.configuration = configuration;
            this.userManager = userManager;
        }

        [HttpPost]
        [Route("/register")]
        public async Task<IActionResult> Register([FromBody] InputUserVIewModel input)
        {
            var newUser = new ApplicationUser()
            {
                UserName = input.Username,
            };

            var result = await this.userManager.CreateAsync(newUser, input.Password);

            if (!result.Succeeded)
            {
                return BadRequest(new { message = "Username or password is incorrect" });
            }

            var token = this.GenerateJwtToken(ClaimTypes.NameIdentifier, input.Username);

            return new JsonResult(token);
        }

        private object GenerateJwtToken(string id, string username)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, id),
                new Claim("username", username),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(configuration["JwtExpireDays"]));

            var token = new JwtSecurityToken(
                configuration["JwtIssuer"],
                configuration["JwtIssuer"],
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
