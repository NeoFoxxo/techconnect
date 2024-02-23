using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using techconnect.Interfaces;

namespace techconnect.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SkillController : ControllerBase
    {
        private readonly ISkillRepository _skillRepository;

        public SkillController(ISkillRepository skillRepository)
        {
            _skillRepository = skillRepository;
        }

        [HttpGet]
        public IActionResult GetSkills()
        {
            var skills = _skillRepository.GetSkills();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(skills);
        }
        
        public class AddSkillModel
        {
            public string SkillName { get; set; }
        }
        
        [HttpPost]
        [Authorize(Roles = "Manager")]
        public IActionResult AddSkill(AddSkillModel body)
        {
            
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                _skillRepository.AddSkill(body.SkillName);
                return Ok(new { message = "Skill " + body.SkillName + " successfully added" });
            }
            catch (Exception ex)
            {
                return StatusCode(500,
                    new { message = "An error occured when adding skill: " + ex.Message });
            }
        }
    }
}
