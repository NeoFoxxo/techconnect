using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using techconnect.DTO;
using techconnect.Interfaces;

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
        [HttpPatch("edit/{techId}")]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> EditTech([FromBody] EditTechDTO newTechInfo, string techId)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            try
            {
                await _techRepository.EditTech(newTechInfo, techId);
                return Ok(new { message =  newTechInfo.FirstName + " successfully updated" });
            }
            catch (Exception ex)
            {
                return StatusCode(500,
                    new { message = "An unexpected error occured when updating Technician: " + ex.Message });
            }
        }
    }
}