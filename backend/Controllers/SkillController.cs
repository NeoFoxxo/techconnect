using Microsoft.AspNetCore.Mvc;
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
    }
}
