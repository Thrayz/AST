namespace AST.Server.Models
{
    public class TrainingPlan
    {
        public int Id { get; set; }
        public string? PlanName { get; set; }
        public string? PlanDescription { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? GoalId { get; set; }
        public Goal? Goals { get; set; }

        public List<Activity>? Activities { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; }
        public List<User>? Users { get; set; }

    }
}
