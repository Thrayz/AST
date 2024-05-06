namespace AST.Server.Models
{
    public class Challenge
    {
        public int Id { get; set; }
        public string ChallengeName { get; set; }
        public string ChallengeDescription { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public ICollection<ChallengeUser> ChallengeUsers { get; set; } = new List<ChallengeUser>();
        public ICollection<ChallengeActivity> ChallengeActivities { get; set; } = new List<ChallengeActivity>();



    }
}
