using AST.Server.Models;
using Azure.Messaging;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using NuGet.Common;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text.RegularExpressions;
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
            Console.WriteLine("Sender user id: " + senderUserId);
            await Clients.User(recipientUserId).SendAsync("ReceiveMessage", senderUserId, messageContent);
            Console.WriteLine("Message sent to recipient 3aaaaaaaaaaaaaaaaaaaaaaaaaaaaaasba", senderUserId, messageContent, recipientUserId);

            Console.WriteLine("Message sent to recipient", senderUserId, messageContent);


            await Clients.Caller.SendAsync("ReceiveMessage", "you", messageContent);
            var message = new Message
           {
               SenderId = senderUserId,
               ReceiverId = recipientUserId,
               Content = messageContent
           };

           _context.Messages.Add(message);
           await _context.SaveChangesAsync();

          


            await Clients.User(recipientUserId).SendAsync("ReceiveMessage", senderUserId, messageContent);
            Console.WriteLine("Message sent to recipient 3aaaaaaaaaaaaaaaaaaaaaaaaaaaaaasba", senderUserId, messageContent, recipientUserId);

            Console.WriteLine("Message sent to recipient", senderUserId, messageContent);


            await Clients.Caller.SendAsync("ReceiveMessage", "you", messageContent);
        }

        /*
     public async Task BroadcastMessage(string message)
     {
         await Clients.All.SendAsync("ReceiveMessage", Context.UserIdentifier, message);
     }
       
       public async Task SendMessageToUser(string recipientUserId, string messageContent)
    {
           var senderUserId = "eb04b5e3-49cd-477a-94d9-a17317e604b4";
           var recipientUserId1 = "706f458a-6bcb-44ec-af6d-4bb35a4acd9f";

        var message = new Message
        {
            SenderId = senderUserId,
            ReceiverId = recipientUserId1,
            Content = messageContent
        };

           await Clients.User("706f458a-6bcb-44ec-af6d-4bb35a4acd9f").SendAsync("ReceiveMessage", senderUserId, messageContent);
           await Clients.Users(senderUserId, recipientUserId1).SendAsync("ReceiveMessage", senderUserId, messageContent);

           Console.WriteLine("Message sent to recipient", senderUserId, messageContent);


           _context.Messages.Add(message);
        await _context.SaveChangesAsync();




        await Clients.Caller.SendAsync("ReceiveMessage", "you", messageContent);
    }
        */



        public async Task SendPrivateMessage()
        {
            var senderUserId = "706f458a-6bcb-44ec-af6d-4bb35a4acd9f";
            var recipientUserId = "eb04b5e3-49cd-477a-94d9-a17317e604b4";
            var message = "Hello";
            
            foreach (var userId in _userConnections.Keys)
            {
                await Clients.User(userId).SendAsync("ReceivePrivateMessage", recipientUserId, message);
                await Clients.Others.SendAsync("ReceivePrivateMessage", recipientUserId, message);
            }

            Console.WriteLine("Sender user id: " + senderUserId);
            await Clients.User(senderUserId).SendAsync("ReceivePrivateMessage",recipientUserId, message );
        }

        public async Task BroadcastMessage(string messageContent, string token)
        {
            var senderUserId = GetUserIdFromToken(token);
           
            var s = _userConnections.ContainsKey(senderUserId);
            Console.WriteLine($"Broadcast Message: {messageContent}");
            Console.WriteLine(s);
            Console.WriteLine("Sender user id: " + senderUserId);
            var content = messageContent;


            var message = new Message
            {
                SenderId = senderUserId,
                Content = content

            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

          
            await Clients.Others.SendAsync("ReceiveMessage", senderUserId, messageContent);

            Console.WriteLine("Message sent to all", senderUserId, messageContent);
            await Clients.Caller.SendAsync("ReceiveMessage", "you", messageContent);
        }



      

        public async Task GetConnectedUsers()
        {
            var connectedUsers = new List<string>();

            foreach (var userId in _userConnections.Keys)
            {
                connectedUsers.Add(userId);
                Console.WriteLine("Connected user: " + userId);
            }
            var connectedUsersJson = JsonConvert.SerializeObject(connectedUsers);

            await Clients.Caller.SendAsync("ReceiveConnectedUsers", connectedUsersJson);

            Console.WriteLine("Connected users sent to client");
            Console.WriteLine(connectedUsersJson);
        }


        
    }


    

}
