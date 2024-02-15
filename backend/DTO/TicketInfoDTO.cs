namespace techconnect.DTO
{
    public class TicketInfoDTO
    {
        public string ClientName { get; set; }
        public string ClientEmail { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Urgency { get; set; }
        public ICollection<string> Skills { get; set; }
        public string TechId { get; set; }
    }
}