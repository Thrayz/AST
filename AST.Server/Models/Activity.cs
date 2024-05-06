namespace AST.Server.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public string? ActivityType { get; set; }

        public string? Distance { get; set; }

        public int? Duration { get; set; }

        public string? Date { get; set; }

        public float? CaloriesBurned { get; set; }

        public float? Pace { get; set; }

        public string? RouteMap { get; set; }   

        public int ? UserId { get; set; }

        public User? User { get; set; }
        public ICollection<ChallengeActivity> ChallengeActivities { get; set; } = new List<ChallengeActivity>();




    }
}
