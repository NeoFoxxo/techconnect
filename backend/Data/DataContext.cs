using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using techconnect.Models;

namespace techconnect.Data
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public string FirstName { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<UserSkill> UserSkills { get; set; }
        public DbSet<TicketSkill> TicketSkills { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
    }
}
