namespace FootballTournament.API.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;

    [ApiController]
    public class BaseController : ControllerBase
    {
        protected string GetUserId()
        {
            var token = this.HttpContext.Request.Headers["X-User-Token"].ToString();
            var userId = ParseToken(token);

            return userId;
        }

        private string ParseToken(Microsoft.Extensions.Primitives.StringValues cookie)
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
