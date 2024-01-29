using techconnect.Data;
using techconnect.Interfaces;

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
            return _context.Skills.Select(c => c.Name).ToList();
        }

    }
}
