namespace FootballTournament.API.Controllers
{
    using FootballTournament.Data.Models;
    using FootballTournament.Services.Users;
    using FootballTournament.ViewModels.Users;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.IdentityModel.Tokens;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;

    public class UsersController : BaseController
    {
        private readonly IConfiguration configuration;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly RoleManager<ApplicationRole> roleManager;
        private readonly IUsersService usersService;


        public UsersController(
            IConfiguration configuration,
            UserManager<ApplicationUser> userManager,
            RoleManager<ApplicationRole> roleManager,
            SignInManager<ApplicationUser> signInManager,
            IUsersService usersService)
        {
            this.configuration = configuration;
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.signInManager = signInManager;
            this.usersService = usersService;
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
                return BadRequest(new { message = "Password too short. Passwords must be at least 6 characters." });
            }
            var user = this.userManager.Users.First(x => x.UserName == input.Username);
            var role = await this.userManager.IsInRoleAsync(user, "Admin");
            var token = this.GenerateJwtToken(ClaimTypes.NameIdentifier, input.Username, role);

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
            var role = await this.userManager.IsInRoleAsync(user, "Admin");
            var token = GenerateJwtToken(user.Id, user.UserName, role);
            return new JsonResult(token);
        }

        [HttpGet]
        [Route("/users/all")]
        public async Task<IActionResult> All()
        {
            var users = await this.usersService.All();
            return new JsonResult(users);
        }

        [HttpGet]
        [Route("/users/{userId}")]
        public async Task<IActionResult> GetById(string userId)
        {
            var res = await this.usersService.GetById(userId);
            return new JsonResult(res);
        }

        [HttpPost]
        [Route("/users/addRanking")]
        public async Task<IActionResult> AddRanking([FromBody] AddUserRankingInputModel input)
        {
            var res = await this.usersService.AddRanking(input.Id);
            return new JsonResult(res);
        }

        [HttpGet]
        [Route("/users/tops")]
        public async Task<IActionResult> GetTopPlayers()
        {
            var res = await this.usersService.GetTopPlayers();
            return new JsonResult(res);
        }

        private object GenerateJwtToken(string id, string username, bool isInRole)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, id),
                new Claim("username", username),
                new Claim("IsInRole", isInRole.ToString())
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
