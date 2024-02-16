using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using techconnect.Data;
using techconnect.DTO;
using techconnect.Interfaces;
using techconnect.Models;

namespace techconnect.Repository
{
    public class TechRepository : ITechRepository
    {        
        private readonly DataContext _context;
        private readonly UserManager<AppUser> _userManager;

        public TechRepository(DataContext dataContext, UserManager<AppUser> userManager)
        {
            _context = dataContext;
            _userManager = userManager;
        }

        public ICollection<TechSkillsDTO> GetTechSkills(string techId)
        {
            return _context.UserSkills
                .Include(us => us.Skill)
                .Where(us => us.TechId == techId)
                .Select(us => new TechSkillsDTO
                {
                    Rating = us.Rating,
                    Name = us.Skill.Name,
                    SkillId = us.SkillId
                })
                .ToList();
        }

        public void AddTechSkills(ICollection<TechSkillsDTO> skills, string techId)
        {
            foreach (TechSkillsDTO skill in skills)
            {
                var newUserSkill = new UserSkill
                {
                    SkillId = skill.SkillId,
                    Rating = skill.Rating,
                    TechId = techId
                };
                
                _context.UserSkills.Add(newUserSkill);
            }
            _context.SaveChanges();
        }

        public async Task<List<TechDTO>> GetTechnicians()
        {
            var techsRaw = await _userManager.GetUsersInRoleAsync("Technician");
            var techList = new List<TechDTO>();
            
            foreach (AppUser tech in techsRaw)
            {
                var singleTech = new TechDTO
                {
                    Id = tech.Id,
                    FirstName = tech.FirstName,
                    Email = tech.Email,
                    Role = "Technician"
                };
                techList.Add(singleTech);
            }
            return techList;
        }
    }
}
