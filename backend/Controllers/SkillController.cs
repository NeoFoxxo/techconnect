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
        
        [HttpGet("tech/{techId}")]
        [Authorize]
        public IActionResult GetTechSkills(string techId)
        {
            var techSkills = _skillRepository.GetTechSkills(techId);
        
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            if (techSkills.Count == 0)
                return NotFound(new { message = "No Skills Found With The Given TechID" });
            return Ok(techSkills);
        }
        
        public class AddSkillModel
        {
            public string SkillName { get; }
        }
        
        [HttpPost ("add")]
        [Authorize(Roles = "Manager")]
        public IActionResult AddSkill([FromBody] AddSkillModel input)
        {
            
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                _skillRepository.AddSkill(input.SkillName);
                return Ok(new { message = "Skill " + input.SkillName + " successfully added" });
            }
            catch (Exception ex)
            {
                return StatusCode(500,
                    new { message = "An unexpected error occured when adding skill: " + ex.Message });
            }
        }
    }
}
