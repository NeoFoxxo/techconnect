using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using techconnect.Models;

namespace techconnect.Controllers.Auth
{
    [Route("[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        public RegisterController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> Register(Register body)
        {
            var user = new AppUser
            {
                FirstName = body.FirstName,
                Email = body.Email,
                UserName = body.Email,
                PasswordHash = body.Password
            };
            var register = await _userManager.CreateAsync(user, user.PasswordHash);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!register.Succeeded)
                return BadRequest(new { error = register.Errors });

            if (body.IsManager && register.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "Manager");
                return Ok(new { message = "Successfully created Manager " + user.FirstName });
            }

            await _userManager.AddToRoleAsync(user, "Technician");
            return Ok(new { message = "Successfully created Technician " + user.FirstName });
        }
    }
}