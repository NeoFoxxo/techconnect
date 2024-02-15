using techconnect.DTO;

namespace techconnect.Interfaces
{
    public interface ISkillRepository
    {
        ICollection<string> GetSkills();
        ICollection<TechSkillsDTO> GetTechSkills(string techId);
        void AddSkill(string skillName);
    }
}
