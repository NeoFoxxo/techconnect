using techconnect.DTO;

namespace techconnect.Models
{
    public class RegisterTech
    {
        public string FirstName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public ICollection<TechSkillsDTO> Skills { get; set; }
    }
}
