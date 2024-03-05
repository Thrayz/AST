using System.ComponentModel.DataAnnotations;

namespace AST.Server.Models
{
    public class Message
    {
        public int Id { get; set; }
        [Required]
        public string Text { get; set; }
        public string SenderId { get; set; }
        public string ReceiverId { get; set; }
        public bool IsRead { get; set; }
        public int? ReplyToMessageId { get; set; }
        public List<string> Attachements { get; set; }
        public DateTime Timestamp { get; set; }

    }
}
