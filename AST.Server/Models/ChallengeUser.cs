﻿namespace AST.Server.Models
{
    public class ChallengeUser
    {
        public int? ChallengeId { get; set; }
        public Challenge? Challenge { get; set; }

        public string? UserId { get; set; }
        public User? User { get; set; }
    }
}
