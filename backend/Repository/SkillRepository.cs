using Microsoft.EntityFrameworkCore;
using techconnect.Data;
using techconnect.DTO;
using techconnect.Interfaces;
using techconnect.Models;

namespace techconnect.Repository
{
    public class SkillRepository : ISkillRepository
    {
        private readonly DataContext _context;
        public SkillRepository(DataContext dataContext)
        {
            _context = dataContext;
        }

        public ICollection<Skill> GetSkills()
        {
            return _context.Skills.ToList();
        }
        
        
        public void AddSkill(string skillName)
        {
            var skillExists = _context.Skills
                .FirstOrDefault(s => s.Name.ToLower() == skillName.ToLower());
            
            if (skillExists != null)
            {
                throw new InvalidOperationException("Skill already exists.");
            }

            var newSkill = new Skill
            {
                Name = skillName
            };

            _context.Add(newSkill);
            _context.SaveChanges();
        }
    }
}
