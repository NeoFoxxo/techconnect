using Microsoft.EntityFrameworkCore;
using techconnect.Data;
using techconnect.DTO;
using techconnect.Interfaces;

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
            var urgencyLevels = new Dictionary<string, int>
            {
                { "Critical", 1 },
                { "Normal", 2 },
                { "Low", 3 }
            };

            return _context.Tickets
                .Where(t => t.TechId == techId)
                .AsEnumerable()
                .OrderBy(t => urgencyLevels[t.Urgency]) // Sort by Urgency with Critical at the top
                .Select(t => new TicketDTO
                {
                    Id = t.Id,
                    Title = t.Title,
                    ClientName = t.ClientName,
                    Urgency = t.Urgency
                })
                .ToList();
        }
        public TicketInfoDTO? GetTicketInfo(int ticketId)
        {
            return _context.Tickets
                .Include(t => t.TicketSkills)
                .Where(t => t.Id == ticketId)
                .Select(t => new TicketInfoDTO
                {
                    Title = t.Title,
                    ClientName = t.ClientName,
                    ClientEmail = t.ClientEmail,
                    Description = t.Description,
                    Urgency = t.Urgency,
                    Skills = t.TicketSkills.Select(ts => ts.Skill.Name).ToList(),
                    TechId = t.TechId
                })
                .FirstOrDefault();
        }
    }
}
