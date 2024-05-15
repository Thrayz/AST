namespace AST.Server.Models
{
    public class Goal
    {
        public int Id { get; set; }
        public string? GoalType { get; set; }
        public int? GoalValue { get; set; }

        public DateTime? start { get; set; }

        public DateTime? finish { get; set; }

        public  string? UserId { get; set; }

        public User? User { get; set; }


    }
}
