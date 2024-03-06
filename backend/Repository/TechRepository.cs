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

        public void AddTechSkills(ICollection<TechSkillsDTO> skills, string techId)
        {
            foreach (TechSkillsDTO skill in skills)
            {
                var newUserSkill = new UserSkill
                {
                    SkillId = skill.Id,
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
                    Email = tech.Email
                };
                techList.Add(singleTech);
            }
            return techList;
        }
        
        public TechInfoDTO GetTechInfo(string techId)
        {
            var techSkills = _context.UserSkills
                .Include(us => us.Skill)
                .Where(us => us.TechId == techId)
                .Select(us => new TechSkillsDTO
                {
                    Id = us.SkillId,
                    Rating = us.Rating,
                    Name = us.Skill.Name
                })
                .ToList();
            
            return _context.Users
                .Where(u => u.Id == techId)
                .Select(ti => new TechInfoDTO
                {
                    Id = techId,
                    FirstName = ti.FirstName,
                    Email = ti.Email,
                    Skills = techSkills
                }).FirstOrDefault();
        }
        
        public async Task EditTech(EditTechDTO newTechInfo, string techId)
        {
            var tech = await _userManager.FindByIdAsync(techId);

            if (tech == null)
            {
                throw new ArgumentException("No Tech Found With The Given TechID", nameof(techId));
            }

            ICollection<UserSkill> newSkills = [];
            
            // TODO: The process to update skills is inefficient
            foreach (TechSkillsDTO skill in newTechInfo.Skills)
            {
                
                var newUserSkill = new UserSkill
                {
                    SkillId = skill.Id,
                    Rating = skill.Rating,
                    TechId = techId
                };
                newSkills.Add(newUserSkill);
            }

            var currentSkills = _context.UserSkills.Where(us => us.TechId == techId);
            _context.UserSkills.RemoveRange(currentSkills);
            await _context.SaveChangesAsync();
            
            tech.FirstName = newTechInfo.FirstName;
            tech.Email = newTechInfo.Email;
            tech.UserName = newTechInfo.Email;
            tech.UserSkills = newSkills;
            await _userManager.UpdateAsync(tech);
        }
        
    }
}
