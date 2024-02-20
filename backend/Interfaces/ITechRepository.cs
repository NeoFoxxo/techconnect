using techconnect.DTO;
using techconnect.Models;

namespace techconnect.Interfaces
{
    public interface ITechRepository
    {
        TechInfoDTO GetTechInfo(string techId);
        void AddTechSkills(ICollection<TechSkillsDTO> skills, string techId);
        Task<List<TechDTO>> GetTechnicians();
    }
}

