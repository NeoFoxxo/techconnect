using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using techconnect.Interfaces;
using techconnect.Models;

namespace techconnect.Controllers.Auth
{
    [Route("[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITechRepository _techRepository;
        public RegisterController(UserManager<AppUser> userManager, ITechRepository techRepository)
        {
            _userManager = userManager;
            _techRepository = techRepository;
        }

        [HttpPost]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> RegisterTech(RegisterTech body)
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
            
            try
            {
                _techRepository.AddTechSkills(body.Skills, user.Id);
                await _userManager.AddToRoleAsync(user, "Technician");
                return Ok(new { message = "Successfully created Technician " + user.FirstName + " with " + body.Skills.Count + " skills"});
            }
            catch (Exception ex)
            {
                return StatusCode(500,
                    new { message = "An unexpected error occured when adding skill & role to technician: " + ex.Message });
            }
        }
        
        [HttpPost("manager")]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> RegisterManager(RegisterManager body)
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
            
            try
            {
                await _userManager.AddToRoleAsync(user, "Manager");
                return Ok(new { message = "Successfully created Manager " + user.FirstName });
            }
            catch (Exception ex)
            {
                return StatusCode(500,
                    new { message = "An unexpected error occured when adding role to Manager: " + ex.Message });
            }
        }
    }
}