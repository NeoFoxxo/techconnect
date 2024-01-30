using techconnect.Data;
using techconnect.DTO;
using techconnect.Interfaces;
using techconnect.Models;

namespace techconnect.Repository
{
    public class TicketRepository : ITicketRepository
    {
        private readonly DataContext _context;
        public TicketRepository(DataContext dataContext)
        {
            _context = dataContext;
        }

        public ICollection<TicketDTO> GetTickets(string techId)
        {
            return _context.Tickets
                .Where(t => t.TechId == techId)
                .Select(t => new TicketDTO
                {
                    Id = t.Id,
                    Title = t.Title,
                    ClientName = t.ClientName,
                    Urgency = t.Urgency,
                })
                .ToList();
        }
        public Ticket GetTicketInfo(int ticketId)
        {
            return _context.Tickets.Where(t => t.Id == ticketId).FirstOrDefault();
        }
    }
}
