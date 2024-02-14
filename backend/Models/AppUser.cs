using Microsoft.AspNetCore.Identity;

namespace techconnect.Models
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public ICollection<Skill> Skills { get; set; }
        public ICollection<UserSkill> UserSkills { get; set; }
        public ICollection<Ticket> Tickets { get; set; }
    }
}
