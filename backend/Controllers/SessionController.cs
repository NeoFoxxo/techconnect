using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using techconnect.Models;

namespace techconnect.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SessionController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;

        public SessionController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetSession()
        {
            var cookie = HttpContext.User;
            var session = await _userManager.GetUserAsync(cookie);
            var roles = await _userManager.GetRolesAsync(session);
            string role = roles.FirstOrDefault("Technican");
            return Ok(new
            {
                session.Id,
                session.Email,
                session.FirstName,
                role
            });
        }
    }
}
