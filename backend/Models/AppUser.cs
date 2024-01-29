using Microsoft.AspNetCore.Identity;

namespace techconnect.Models
{
    public class AppUser : IdentityUser
    {
        public ICollection<Skill> Skills { get; set; }
    }
}
