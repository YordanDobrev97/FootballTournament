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
        private readonly SignInManager<ApplicationUser> signInManager;

        public UsersController(
            IConfiguration configuration,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            this.configuration = configuration;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpPost]
        [Route("/register")]
        public async Task<IActionResult> Register([FromBody] InputUserViewModel input)
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

        [HttpPost]
        [Route("/login")]
        public async Task<IActionResult> Login([FromBody] InputUserViewModel loginInput)
        {
            var result = await this.signInManager.PasswordSignInAsync(loginInput.Username, loginInput.Password, true, false);
            if (!result.Succeeded)
            {
                return this.BadRequest("Login failded");
            }

            var user = this.userManager.Users.First(x => x.UserName == loginInput.Username);
            var token = GenerateJwtToken(user.Id, user.UserName);
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
