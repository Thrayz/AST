namespace AST.Server.Models
{
    public class TeamUser
    {   
        public int Id { get; set; }
        public int? TeamId { get; set; }
        public Team? Team { get; set; }

        public string? UserId { get; set; }
        public User? User { get; set; }
    }
}
