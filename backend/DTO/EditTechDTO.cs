namespace techconnect.DTO
{
    public class EditTechDTO
    {
        public string FirstName { get; set; }
        public string Email { get; set; }
        public TechSkillsDTO[] Skills { get; set; }
    }
}