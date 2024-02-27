using techconnect.DTO;
using techconnect.Models;

namespace techconnect.Interfaces
{
    public interface ISkillRepository
    {
        ICollection<Skill> GetSkills();
        void AddSkill(string skillName);
    }
}
