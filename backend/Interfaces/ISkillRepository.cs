using techconnect.DTO;

namespace techconnect.Interfaces
{
    public interface ISkillRepository
    {
        ICollection<string> GetSkills();
        void AddSkill(string skillName);
    }
}
