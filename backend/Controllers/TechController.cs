using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using techconnect.DTO;
using techconnect.Interfaces;
using techconnect.Models;

namespace techconnect.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TechController : ControllerBase
    {
        private readonly ITechRepository _techRepository;

        public TechController(ITechRepository techRepository)
        {
            _techRepository = techRepository;
        }

        [HttpPost("skills/{techId}")]
        [Authorize(Roles = "Manager")]
        public IActionResult AddTechSkills([FromBody] ICollection<TechSkillsDTO> skills, string techId)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                _techRepository.AddTechSkills(skills, techId);
                return Ok(new { message =  skills.Count + " skills successfully added" });
            }
            catch (Exception ex)
            {
                return StatusCode(500,
                    new { message = "An unexpected error occured when adding skill to technician: " + ex.Message });
            }
        }

        [HttpGet]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> GetTechnicians()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                var techs = await _techRepository.GetTechnicians();
                return Ok(techs);
            }
            catch (Exception ex)
            {
                return StatusCode(500,
                    new { message = "An unexpected error occured when obtaining technicians: " + ex.Message });
            }
        }
        
        [HttpGet("info/{techId}")]
        [Authorize(Roles = "Manager")]
        public IActionResult GetTechInfo(string techId)
        {
            var techInfo = _techRepository.GetTechInfo(techId);
        
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            if (techInfo == null)
                return NotFound(new { message = "No Tech Found With The Given TechID" });
            return Ok(techInfo);
        }
        
        // TODO: Edit Technician endpoint (name, email)
    }
}