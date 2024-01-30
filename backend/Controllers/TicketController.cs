using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
            var ticketInfo = _ticketRepository.GetTicketInfo(ticketId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            if (ticketInfo == null)
                return NotFound(new { message = "No Ticket Found With The Given ID" });
            return Ok(ticketInfo);
        }
    }
}
