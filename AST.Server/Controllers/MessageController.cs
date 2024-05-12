using AST.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AST.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController(ApplicationDbContext context) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessages()
        {
            return await _context.Messages.ToListAsync();
        }
        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessages(string userId, string currentUserId)
        {
            

            var messages = await _context.Messages
                .Where(m => (m.SenderId == currentUserId && m.ReceiverId == userId) || (m.SenderId == userId && m.ReceiverId == currentUserId))
                .ToListAsync();

            if (messages != null && messages.Count > 0)
            {
                Console.WriteLine("Messages:");
                foreach (var message in messages)
                {
                    Console.WriteLine(message.Content);
                }
            }
            else
            {
                Console.WriteLine("No messages found.");
            }

            return messages;
        }

        /*
         [HttpGet("{userId}")]
public async Task<ActionResult<IEnumerable<Message>>> GetMessages(string userId, [FromQuery] string senderId)
{
    var currentUserId = senderId; // Use the senderId from query parameter
    // Fetch messages between the current user and the specified user
    var messages = await _context.Messages
        .Where(m => (m.SenderId == currentUserId && m.ReceiverId == userId) || (m.SenderId == userId && m.ReceiverId == currentUserId))
        .ToListAsync();
    return messages;
}

         */



        [HttpPost]
        public async Task<ActionResult<Message>> SendMessage(string recipientUserId, string messageContent)
        {
            var senderUserId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value; 

            var message = new Message
            {
                SenderId = senderUserId,
                ReceiverId = recipientUserId,
                Content = messageContent
            };
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMessages), new { id = message.Id }, message);
        }

    }
}
