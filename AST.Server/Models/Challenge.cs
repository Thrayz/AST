namespace AST.Server.Models
{
    public class Challenge
    {
        public int Id { get; set; }
        public string ChallengeName { get; set; }
        public string ChallengeDescription { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<User> Users { get; set; }
        public List<Activity> Activities { get; set; }

        
    }
}
