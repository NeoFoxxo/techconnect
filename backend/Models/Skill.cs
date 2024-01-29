namespace techconnect.Models
{
    public class Skill
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Rating { get; set; }
        public string UserId { get; set; }
        public AppUser User { get; set; }
    }
}
