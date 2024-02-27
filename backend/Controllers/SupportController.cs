using Microsoft.AspNetCore.Mvc;
using techconnect.Interfaces;
using techconnect.Models;

namespace techconnect.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SupportController : ControllerBase
    {
        private readonly ISupportRepository _supportRepository;

        public SupportController(ISupportRepository supportRepository)
        {
            _supportRepository = supportRepository;
        }
        
        [HttpPost]
        public async Task<IActionResult> PairUser(SupportRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var bestTechs = await _supportRepository.FindTech(request); 
            return Ok(bestTechs);
        }
    }
}

