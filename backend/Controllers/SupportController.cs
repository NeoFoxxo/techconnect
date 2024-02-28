using Microsoft.AspNetCore.Mvc;
using techconnect.DTO;
using techconnect.Interfaces;
using techconnect.Models;

namespace techconnect.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SupportController : ControllerBase
    {
        private readonly ISupportRepository _supportRepository;
        private readonly ITicketRepository _ticketRepository;

        public SupportController(ISupportRepository supportRepository, ITicketRepository ticketRepository)
        {
            _supportRepository = supportRepository;
            _ticketRepository = ticketRepository;
        }
        
        [HttpPost]
        public async Task<IActionResult> PairUser(SupportRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var bestTech = await _supportRepository.FindTech(request);
                var supportTicket = new TicketInfoDTO
                {
                    ClientName = request.ClientName,
                    ClientEmail = request.ClientEmail,
                    Title = request.Title,
                    Urgency = request.Urgency,
                    Description = request.Description,
                    Skills = request.Skills,
                    TechId = bestTech.Tech.Id
                };
                var ticketId = _ticketRepository.AddTicket(supportTicket);
                return Ok(new { Tech = supportTicket.TechId, Ticket = ticketId.Ticket });
            }
            catch (Exception ex)
            {
                return StatusCode(500,
                    new { message = "An error occured when finding Tech & Creating Ticket " + ex.Message });
            }
        }
    }
}

