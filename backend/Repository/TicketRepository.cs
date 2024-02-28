using Microsoft.EntityFrameworkCore;
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
                    SkillNames = t.TicketSkills.Select(ts => ts.Skill.Name).ToList(),
                    TechId = t.TechId
                })
                .FirstOrDefault();
        }
        public class TicketId
        {
            public int Ticket { get; set; }
        }
        public TicketId AddTicket(TicketInfoDTO ticket)
        {
            // add ticket to db
            var newTicket = new Ticket
            {
                ClientEmail = ticket.ClientEmail,
                ClientName = ticket.ClientName,
                Title = ticket.Title,
                Description = ticket.Description,
                Urgency = ticket.Urgency,
                TechId = ticket.TechId
            };
                
            _context.Tickets.Add(newTicket);
            _context.SaveChanges();
            
            // then add the skills to the ticket
            foreach (int skillId in ticket.Skills)
            {
                var newTicketSkill = new TicketSkill
                {
                    SkillId = skillId,
                    Ticket = newTicket
                };
                
                _context.TicketSkills.Add(newTicketSkill);
            }
            _context.SaveChanges();

            return new TicketId { Ticket = newTicket.Id };
        }
    }
}
