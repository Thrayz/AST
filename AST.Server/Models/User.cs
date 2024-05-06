using Microsoft.AspNetCore.Identity;

namespace AST.Server.Models
{
    public class User : IdentityUser
    {
      
        public ICollection<ChallengeUser> ChallengeUsers { get; set; } = new List<ChallengeUser>();
        public ICollection<TeamUser> Teams { get; set; } = new List<TeamUser>();





    }
}
