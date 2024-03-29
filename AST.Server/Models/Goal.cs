namespace AST.Server.Models
{
    public class Goal
    {
        public int Id { get; set; }
        public string? GoalType { get; set; }
        public int ? GoalValue { get; set; }

        public DateTime? Date { get; set; }

        public int ? UserId { get; set; }

        public User? User { get; set; }


    }
}
