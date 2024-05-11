using Microsoft.Identity.Client;

namespace AST.Server.Models
{
    public class DailyInformation
    {
        public int Id { get; set; }

        public DateTime? Date { get; set; }

        public float? Weight { get; set; }

        public float? caloriesIntake { get; set; }
        public int? ActivityId { get; set; }
        public Activity? Activity { get; set; }

        public string ? UserId { get; set; }

        public User? User { get; set; }

       



    }
}
