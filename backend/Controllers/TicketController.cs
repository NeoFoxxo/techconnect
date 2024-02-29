using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using techconnect.DTO;
using techconnect.Interfaces;

namespace techconnect.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ITicketRepository _ticketRepository;

        public TicketController(ITicketRepository ticketRepository)
        {
            _ticketRepository = ticketRepository;
        }

        [HttpGet("{techId}")]
        [Authorize]
        public IActionResult GetTickets(string techId)
        {
            var techTickets = _ticketRepository.GetTickets(techId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            if (techTickets.Count == 0)
                return NotFound(new { message = "No Tickets Found" });
            return Ok(techTickets);
        }

        [HttpGet("info/{ticketId}")]
        [Authorize]
        public IActionResult GetTicketInfo(int ticketId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var ticketInfo = _ticketRepository.GetTicketInfo(ticketId);
            
            if (ticketInfo == null)
                return NotFound(new { message = "No Ticket Found With The Given ID" });
            return Ok(ticketInfo);
        }
        
        [HttpPost]
        [Authorize]
        public IActionResult AddTicket(TicketInfoDTO ticket)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                _ticketRepository.AddTicket(ticket);
                return Ok(new { message = "Ticket successfully added" });
            }
            catch (Exception ex)
            {
                return StatusCode(500,
                    new { message = "An error occured when adding ticket: " + ex.Message });
            }
        }
        
        [HttpDelete("{ticketId}")]
        [Authorize]
        public IActionResult DeleteTicket(int ticketId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                _ticketRepository.DeleteTicket(ticketId);
                return Ok(new { message = "Ticket " + ticketId + " successfully deleted" });
            }
            catch (Exception ex)
            {
                return StatusCode(500,
                    new { message = "An error occured when deleting ticket: " + ex.Message });
            }
        }
    }
}
