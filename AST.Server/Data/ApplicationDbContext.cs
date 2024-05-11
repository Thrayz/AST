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
    public DbSet<ChallengeUser> ChallengeUsers { get; set; }
    public DbSet<TeamUser> TeamUsers { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<ChallengeUser>()
            .HasKey(cu => new { cu.ChallengeId, cu.UserId });

        modelBuilder.Entity<ChallengeUser>()
            .HasOne(cu => cu.Challenge)
            .WithMany(c => c.ChallengeUsers)
            .HasForeignKey(cu => cu.ChallengeId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<ChallengeUser>()
            .HasOne<User>()
            .WithMany(u => u.ChallengeUsers)
            .HasForeignKey(cu => cu.UserId)
            .OnDelete(DeleteBehavior.Restrict);


        modelBuilder.Entity<TeamUser>()
            .HasKey(tu => new { tu.TeamId, tu.UserId });

        modelBuilder.Entity<TeamUser>()
            .HasOne(tu => tu.Team)
            .WithMany(t => t.Users)
            .HasForeignKey(tu => tu.TeamId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<TeamUser>()
            .HasOne<User>()
            .WithMany(u => u.Teams)
            .HasForeignKey(tu => tu.UserId)
            .OnDelete(DeleteBehavior.Restrict);


        
    
       
    }


}
