using techconnect.DTO;
using techconnect.Models;

namespace techconnect.Interfaces
{
    public interface ITicketRepository
    {
        ICollection<TicketDTO> GetTickets(string techId);
        Ticket GetTicketInfo(int ticketId);
    }
}
