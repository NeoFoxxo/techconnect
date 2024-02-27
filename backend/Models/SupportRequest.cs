namespace techconnect.Models
{
    public class SupportRequest
    {
        public string ClientName { get; set; }
        public string ClientEmail { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Urgency { get; set; }
        public ICollection<int> Skills { get; set; }
    } 
}

