namespace AST.Server.Models
{
    public class Team
    {
        public int Id { get; set; }
        public string? TeamName { get; set; }
        public List<User>? Users { get; set; }

    }
}
