using AST.Server.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AST.Server.SignalR
{
    public class ChatHub : Hub
    {
        private readonly ApplicationDbContext _context;
        private static readonly Dictionary<string, HashSet<string>> _userConnections = new Dictionary<string, HashSet<string>>();

        public ChatHub(ApplicationDbContext context)
        {
            _context = context;
        }

        public string GetUserIdFromToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var userIdClaim = jwtToken.Claims.First(claim => claim.Type == "nameid").Value;
            return userIdClaim;
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            string token = httpContext.Request.Query["access_token"];
            string userId = GetUserIdFromToken(token);
            string connectionId = Context.ConnectionId;

            if (!_userConnections.ContainsKey(userId))
            {
                _userConnections[userId] = new HashSet<string>();
            }

            _userConnections[userId].Add(connectionId);

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var httpContext = Context.GetHttpContext();
            string token = httpContext.Request.Query["access_token"];
            string userId = GetUserIdFromToken(token);
            string connectionId = Context.ConnectionId;

            if (_userConnections.ContainsKey(userId))
            {
                _userConnections[userId].Remove(connectionId);

                if (_userConnections[userId].Count == 0)
                {
                    _userConnections.Remove(userId);
                }
            }

            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessageToUser(string recipientUserId, string messageContent, string token)
        {
            var senderUserId = GetUserIdFromToken(token);

            var message = new Message
            {
                SenderId = senderUserId,
                ReceiverId = recipientUserId,
                Content = messageContent
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            if (_userConnections.ContainsKey(recipientUserId))
            {
                foreach (var connectionId in _userConnections[recipientUserId])
                {
                    await Clients.Client(connectionId).SendAsync("ReceiveMessage", senderUserId, messageContent);
                }
            }
        }


        public async Task BroadcastMessage(string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", Context.UserIdentifier, message);
        }
    }
}
