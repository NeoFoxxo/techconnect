namespace techconnect.DTO
{
    public class TechInfoDTO
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string Email { get; set; }
        public List<TechSkillsDTO> Skills { get; set; }
    }
}