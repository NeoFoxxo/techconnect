namespace techconnect.Models;

public class TicketSkill
{
    public int Id { get; set; }
    public Ticket Ticket { get; set; }
    public int SkillId { get; set; }
    public Skill Skill { get; set; }
}