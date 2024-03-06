using techconnect.DTO;

namespace techconnect.Interfaces
{
    public interface ITechRepository
    {
        TechInfoDTO GetTechInfo(string techId);

        Task<List<TechDTO>> GetTechnicians();
        void AddTechSkills(ICollection<TechSkillsDTO> skills, string techId);
        Task EditTech(EditTechDTO newTechInfo, string techId);
    }
}

