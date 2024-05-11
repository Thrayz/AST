using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AST.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using System.Text.Json;
using System.CodeDom;


namespace AST.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChallengesController : ControllerBase
    {   
      

        private readonly ApplicationDbContext _context;

        public ChallengesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Challenge>>> GetChallenges()
        {
            return await _context.Challenges.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Challenge>> GetChallenge(int id)
        {
            var challenge = await _context.Challenges.FindAsync(id);

            if (challenge == null)
            {
                return NotFound();
            }

            return challenge;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutChallenge(int id, Challenge challenge)
        {
            if (id != challenge.Id)
            {
                return BadRequest();
            }

            _context.Entry(challenge).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChallengeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Challenge>> PostChallenge(Challenge challenge)
        {
            _context.Challenges.Add(challenge);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetChallenge", new { id = challenge.Id }, challenge);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChallenge(int id)
        {
            var challenge = await _context.Challenges.FindAsync(id);
            if (challenge == null)
            {
                return NotFound();
            }

            _context.Challenges.Remove(challenge);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpPost("addUserToChallenge")]
        public async Task<ActionResult<ChallengeUser>> AddUserToChallenge(ChallengeUser challengeUser)
        {
            _context.ChallengeUsers.Add(challengeUser);
            await _context.SaveChangesAsync();

          
            return StatusCode(201);
        }


        [HttpDelete("removeUserFromChallenge/{id}")]
        public async Task<ActionResult<ChallengeUser>> RemoveUserFromChallenge(int id)
        {
            var challengeUser = await _context.ChallengeUsers.FindAsync(id);
            if (challengeUser == null)
            {
                return NotFound();
            }

            _context.ChallengeUsers.Remove(challengeUser);
            await _context.SaveChangesAsync();

            return NoContent();

          
        }



        [HttpGet("GetallChallengeUsers")]
        public async Task<IEnumerable<ChallengeUser>> getAllChallengeUsers()
        {
            return await _context.ChallengeUsers.ToListAsync();
        }



        

        [HttpGet("GetTeamUserU/{userId}")]
        public async Task<IEnumerable<ChallengeUser>> getUserTeams(string userId)
        {
            return await _context.ChallengeUsers.Where(tu => tu.UserId == userId).ToListAsync();
        }





        private bool ChallengeExists(int id)
        {
            return _context.Challenges.Any(e => e.Id == id);
        }

        public class ChallengeUserBindingModel
        {
            public int ChallengeId { get; set; }
            public string UserId { get; set; }
        }

    }
}
