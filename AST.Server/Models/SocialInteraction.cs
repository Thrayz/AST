namespace AST.Server.Models
{
    public class SocialInteraction
    {
        public int Id { get; set; }
        public string? InteractionType { get; set; }
        public string? Date { get; set; }
        public int? InitiatorUserId { get; set; }
        public int? TargetUserId { get; set; }  

        public User? InitiatorUser { get; set; }
        public User? TargetUser { get; set; }


    }
}
