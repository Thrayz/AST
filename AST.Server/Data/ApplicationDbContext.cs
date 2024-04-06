using AST.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : IdentityDbContext<User>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    public DbSet<Message> Messages { get; set; }
    public DbSet<SocialInteraction> SocialInteractions { get; set; }
    public DbSet<TrainingPlan> TrainingPlans { get; set; }
    public DbSet<Goal> Goals { get; set; }
    public DbSet<Activity> Activities { get; set; }
    public DbSet<Challenge> Challenges { get; set; }
    public DbSet<Notification> Notifications { get; set; }
    public DbSet<Team> Teams { get; set; }
    public DbSet<DailyInformation> DailyInformations { get; set; }



}
