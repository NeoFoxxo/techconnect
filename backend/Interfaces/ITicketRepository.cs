using techconnect.DTO;
using techconnect.Repository;

namespace techconnect.Interfaces
{
    public interface ITicketRepository
    {
        ICollection<TicketDTO> GetTickets(string techId);
        TicketInfoDTO? GetTicketInfo(int ticketId);
        TicketRepository.TicketId AddTicket(TicketInfoDTO ticket);
    }
}
