namespace AST.Server.Models
{
    public class TrainingPlan
    {
        public int Id { get; set; }
        public string? PlanName { get; set; }
        public List<Activity>? Activities { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; }

    }
}
