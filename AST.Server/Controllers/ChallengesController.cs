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
        public async Task<ActionResult<ChallengeUser>> AddUserToChallenge(int challengeId, string userId)
        {
            try
            {
                var challenge = await _context.Challenges.Include(c => c.ChallengeUsers).FirstOrDefaultAsync(c => c.Id == challengeId);
                var user = await _context.Users.Include(u => u.ChallengeUsers).FirstOrDefaultAsync(u => u.Id == userId);

                if (challenge == null || user == null)
                {
                    return NotFound();
                }

                var challengeUser = new ChallengeUser { ChallengeId = challengeId, Challenge = challenge, User = user, UserId = userId };
                challenge.ChallengeUsers.Add(challengeUser);
                user.ChallengeUsers.Add(challengeUser);

                await _context.SaveChangesAsync();

                var options = new JsonSerializerOptions
                {
                    ReferenceHandler = ReferenceHandler.Preserve
                };
                var challengeUserJson = JsonSerializer.Serialize(challengeUser, options);

                return Content(challengeUserJson, "application/json");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }



        [HttpPost("removeUserFromChallenge")]
        public async Task<ActionResult<ChallengeUser>> RemoveUserFromChallenge(int challengeId, string userId)
        {
            try
            {
                var challenge = await _context.Challenges.Include(c => c.ChallengeUsers).FirstOrDefaultAsync(c => c.Id == challengeId);
                var user = await _context.Users.Include(u => u.ChallengeUsers).FirstOrDefaultAsync(u => u.Id == userId);

                if (challenge == null || user == null)
                {
                    return NotFound();
                }

                var challengeUser = challenge.ChallengeUsers.FirstOrDefault(cu => cu.UserId == userId);
                challenge.ChallengeUsers.Remove(challengeUser);
                user.ChallengeUsers.Remove(challengeUser);

                await _context.SaveChangesAsync();

                var options = new JsonSerializerOptions
                {
                    ReferenceHandler = ReferenceHandler.Preserve
                };
                var challengeUserJson = JsonSerializer.Serialize(challengeUser, options);

                return Content(challengeUserJson, "application/json");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
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


      
    }
}
