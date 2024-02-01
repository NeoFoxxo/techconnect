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
        private readonly SignInManager<AppUser> _signInManager;

        public LoginController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            _signInManager = signInManager;
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginRequest body)
        {
            var signIn = await _signInManager.PasswordSignInAsync(
                  userName: body.Email,
                  password: body.Password!,
                  isPersistent: true,
                  lockoutOnFailure: false
                  );

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!signIn.Succeeded)
                return Unauthorized(new { message = "Incorrect Credentials" });

            if (signIn.Succeeded)
                return Ok();

            return BadRequest(new { message = "An Unexpected Error Occured" });
        }
    }
}