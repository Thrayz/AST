namespace AST.Server.Models
{
    public class ChallengeActivity
    {
        public int ChallengeId { get; set; }
        public Challenge Challenge { get; set; }

        public int ActivityId { get; set; }
        public Activity Activity { get; set; }

    }
}
