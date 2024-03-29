﻿namespace techconnect.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public string ClientName { get; set; }
        public string ClientEmail { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Urgency { get; set; }
        public ICollection<TicketSkill> TicketSkills { get; set; }
        public string TechId { get; set; }
        public AppUser Tech { get; set; }
    }
}
