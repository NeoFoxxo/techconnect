using Microsoft.AspNetCore.Identity;

namespace techconnect.Models
{
    // AppUser is the technician 
    public class AppUser : IdentityUser
    {
        public ICollection<Skill> Skills { get; set; }
        public ICollection<Ticket> Tickets { get; set; }
    }
}
