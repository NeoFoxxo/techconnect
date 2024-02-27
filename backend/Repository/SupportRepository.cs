using Microsoft.EntityFrameworkCore;
using techconnect.Data;
using techconnect.DTO;
using techconnect.Interfaces;
using techconnect.Models;

namespace techconnect.Repository
{
    public class SupportRepository : ISupportRepository
    {
        private readonly DataContext _context;
        private readonly ITechRepository _techRepository;
        
        public SupportRepository(DataContext dataContext, ITechRepository techRepository)
        {
            _context = dataContext;
            _techRepository = techRepository;
        }
        
        public async Task<SupportResult> FindTech(SupportRequest request)
        {
            /*
                How The Algorithm Works:
                1. All Technicians are obtained from the database
                2. All of the Skills assigned to Techs are obtained from the db
                3. All Techs are then looped over and the current Techs skills are taken from the previous DB call
                4. These skills are looped over and if a skill exists in the support request 
                the hasSkills value is incremented by 1 and the Techs rating of the skill is added to the score value
                5. The amount of tickets currently assigned to the Tech is obtained
                6. The score value is multiplied by the amount of skills the Tech & request share. 
                This is done to prioritise a Tech that is a jack of all trades instead of an expert in a single skill
                7. The amount of tickets assigned to the Tech is subtracted from the score 
                to prevent a Tech from being overloaded with tickets
                8. The score for that Tech and their details are added to a list
                9. The loop continues until all Tech scores are obtained 
                and finally the Tech with the highest score is returned
            */
            var techs = await _techRepository.GetTechnicians();
            
            var techScores = new List<SupportResult>();
            
            var allTechSkills = await _context.UserSkills
                .ToListAsync();

            foreach (TechDTO tech in techs)
            {
                int score = 0;
                int hasSkills = 0;

                var techSkills = allTechSkills.Where(ats => ats.TechId == tech.Id).ToList();

                foreach (UserSkill techSkill in techSkills)
                {
                    if (request.Skills.Contains(techSkill.SkillId))
                    {
                        hasSkills++;
                        score += techSkill.Rating;
                    }
                }
                
                var ticketCount = _context.Tickets
                    .Count(t => t.TechId == tech.Id);

                score *= hasSkills;
                score -= ticketCount;
                techScores.Add(new SupportResult{ Tech = tech, Score = score});
            }

            var bestTech = techScores.OrderByDescending(t => t.Score).First();
            
            return bestTech;
        }
    } 
}

