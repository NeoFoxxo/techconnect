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

        public ICollection<string> GetSkills()
        {
            return _context.Skills.Select(s => s.Name).ToList();
        }
        
        
        public void AddSkill(string skillName)
        {
            var newSkill = new Skill
            {
                Name = skillName
            };

            _context.Add(newSkill);
            _context.SaveChanges();
        }
    }
}
