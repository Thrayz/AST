﻿using AST.Server.Models;
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
using static System.Net.Mime.MediaTypeNames;

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
        public async Task CheckUserActivitiesAndInfo(string token)
        { Console.WriteLine("CheckUserActivitiesAndInfo");
            var userId = GetUserIdFromToken(token);
            var today = DateTime.Today;

           
            var hasDailyInfoForToday = await _context.DailyInformations.AnyAsync(di => di.UserId == userId && di.Date == today);

          
            var hasActivitiesForToday = await _context.Activities.AnyAsync(a => a.UserId == userId && DateTime.Parse(a.Date).Date == today);


            if (!hasDailyInfoForToday || !hasActivitiesForToday)
            {
                
                await Clients.Caller.SendAsync("NotifyMissingInfo", "Please enter your daily info and activities for today.");
            }
        }

        public string GetUserIdFromToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var userIdClaim = jwtToken.Claims.First(claim => claim.Type == "nameid").Value;
            Console.WriteLine(userIdClaim);
            return userIdClaim;
        }

        public string GetUserNameFromToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var userNameClaim = jwtToken.Claims.First(claim => claim.Type == "unique_name").Value;
            Console.WriteLine(userNameClaim);
            return userNameClaim;
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            string token = httpContext.Request.Query["access_token"];
            string userId = GetUserIdFromToken(token);
            string connectionId = Context.ConnectionId;
           

            Console.WriteLine(connectionId);

            if (!_userConnections.ContainsKey(userId))
            {
                _userConnections[userId] = new HashSet<string>();
            }

            _userConnections[userId].Add(connectionId);

            foreach (var tst in _userConnections)
            {
                if (tst.Key == userId)
                {
                    Console.WriteLine("User is still connected");
                    Console.WriteLine("User id: " + tst.Key);
                }
                else
                {
                    Console.WriteLine("User is disconnected");
                }
               

            }


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
            Console.WriteLine("Message sent to recipient", senderUserId, messageContent, recipientUserId);

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
            Console.WriteLine("Message sent to recipient ", senderUserId, messageContent, recipientUserId);

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



        public async Task SendPrivateMessage(string recipientUserId,string messageContent, string token)
        {
            var senderUserId = GetUserIdFromToken(token);
            var SenderUserName = GetUserNameFromToken(token);

            var s = _userConnections.ContainsKey(senderUserId);
            var content = messageContent;
            var cId = "";
            var test = false;
            foreach (var tst in _userConnections)
            {
                
                if (tst.Key == recipientUserId)
                {
                    Console.WriteLine("User is still connected");
                    Console.WriteLine("User id: " + tst.Key);
                    cId = tst.Value.First();
                    test = true;
                }
                else
                {
                    Console.WriteLine("User is disconnected");
                }


            }

            
            var message = new Message
            {
                SenderId = senderUserId,
                ReceiverId = recipientUserId,
                Content = content

            };
            await Clients.Caller.SendAsync("ReceivePMessage", messageContent);
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
           
            if (test == true)
            {
                await Clients.Client(cId).SendAsync("ReceivePMessage", senderUserId, messageContent);
            }
            else
            {
                Console.WriteLine("User is disconnected");
            }
            Console.WriteLine("Message sent to recipient", senderUserId, messageContent, recipientUserId);

           
        }

        public async Task BroadcastMessage(string messageContent, string token)
        {
            var senderUserId = GetUserIdFromToken(token);
            var senderUserName = GetUserNameFromToken(token);
            Console.WriteLine(senderUserName);
            var s = _userConnections.ContainsKey(senderUserId);
            Console.WriteLine($"Broadcast Message: {messageContent}");
            Console.WriteLine(s);
            Console.WriteLine("Sender user id: " + senderUserId);
            var content = messageContent;
            var recipientUserId = "c3205bc4-5966-4581-bb57-ace00878575c";
            var cId = "";
            //var test = false;

            var message = new Message
            {
                SenderId = senderUserId,
                Content = content

            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
            foreach (var tst in _userConnections)
            {
                if (tst.Key == recipientUserId)
                {
                    Console.WriteLine("User is still connected");
                    Console.WriteLine("User id: " + tst.Key);
                    cId = tst.Value.First();
                   // test = true;
                }
                else
                {
                    Console.WriteLine("User is disconnected");
                }


            }
            /*
            if (test == true)
            {
                await Clients.Client(cId).SendAsync("ReceiveMessage", senderUserName, messageContent);
            }
            else
            {
                Console.WriteLine("User is disconnected");
            }*/
            await Clients.Others.SendAsync("ReceiveMessage", "", messageContent);


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
