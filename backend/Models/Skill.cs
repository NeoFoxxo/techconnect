namespace techconnect.Models
{
    public class Skill
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Rating { get; set; }
        public string TechId { get; set; }
        public AppUser Tech { get; set; }
    }
}
