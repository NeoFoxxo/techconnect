using techconnect.DTO;

namespace techconnect.Interfaces
{
    public interface ITicketRepository
    {
        ICollection<TicketDTO> GetTickets(string techId);
        TicketInfoDTO? GetTicketInfo(int ticketId);
        void AddTicket(TicketInfoDTO ticket);
    }
}
