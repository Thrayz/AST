using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace AST.Server.SignalR
{
    
    public class ChatHub : Hub
    {
        private static readonly Dictionary<string, HashSet<string>> _userConnections = new Dictionary<string, HashSet<string>>();
        public string GetUserIdFromToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var userIdClaim = jwtToken.Claims.First(claim => claim.Type == "nameid").Value;
            return userIdClaim;
        }

        public override async Task OnConnectedAsync()
        {
            string token = Context.GetHttpContext().Request.Query["access_token"];
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
            string token = Context.GetHttpContext().Request.Query["access_token"];
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

        public async Task SendMessageToUser(string userId, string message)
        {
            if (_userConnections.ContainsKey(userId))
            {
                foreach (var connectionId in _userConnections[userId])
                {
                    await Clients.Client(connectionId).SendAsync("ReceiveMessage", Context.UserIdentifier, message);
                }
            }
        }

        public async Task BroadcastMessage(string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", Context.UserIdentifier, message);
        }
    }
}
