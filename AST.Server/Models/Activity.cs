namespace AST.Server.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public string? ActivityType { get; set; }

        public int? Distance { get; set; }

        public int? Duration { get; set; }

        public string? Date { get; set; }

        public float? CaloriesBurned { get; set; }

        public float? Pace { get; set; }

        public string? RouteMap { get; set; }   

        public string ? UserId { get; set; }

        public User? User { get; set; }
        




    }
}
