namespace AST.Server.Models
{
    public class Notification
    {
        public int Id { get; set; }

        public DateTime? Date { get; set; }

        public string? Message { get; set; }

        public int? UserId { get; set; }

        public User? User { get; set; }
        public int? TeamId { get; set; }
        public Team? Team { get; set; }


        public int? ActivityId { get; set; }

        public Activity? Activity { get; set; }

        public int? DailyInformationId { get; set; }

        public DailyInformation? DailyInformation { get; set; }

        public int? SocialInteractionId { get; set; }

        public SocialInteraction? SocialInteraction { get; set; }

        public string? NotificationType { get; set; }

        public string? NotificationStatus { get; set; }
    }
}
