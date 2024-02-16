using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using techconnect.Models;

namespace techconnect.Controllers.Auth
{
    [Route("[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;

        public LoginController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginRequest body, [FromQuery] bool manager)
        {
            var signIn = await _signInManager.PasswordSignInAsync(
                  userName: body.Email,
                  password: body.Password,
                  isPersistent: true,
                  lockoutOnFailure: false
                  );

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            if (!signIn.Succeeded)
                return Unauthorized(new { message = "Incorrect Credentials" });
            
            if (manager)
            {
                var user = await _userManager.GetUserAsync(User);
                var roles = await _userManager.GetRolesAsync(user);
                
                if (!roles.Contains("Manager"))
                    return Unauthorized(new { message = "Insufficient Permissions" });
                
                if (signIn.Succeeded && roles.Contains("Manager"))
                    return Ok(new { message = "Manager Successfully Logged In" });
            }
            else
            {
                if (signIn.Succeeded)
                    return Ok(new { message = "Technician Successfully Logged In" });
            }
            
            return BadRequest(new { message = "An Unexpected Error Occured" });
        }
    }
}