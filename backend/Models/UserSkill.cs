namespace techconnect.Models;

    public class UserSkill
    {
        public int Id { get; set; }
        public int SkillId { get; set; }
        public Skill Skill { get; set; }
        public int Rating { get; set; }
        public string TechId { get; set; }
        public AppUser Tech { get; set; }
    }