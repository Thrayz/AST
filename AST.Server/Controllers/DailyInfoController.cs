using AST.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AST.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DailyInfoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DailyInfoController(ApplicationDbContext context)
        {
            _context = context;
        }


        private bool DailyInfoExists(int id)
        {
            return _context.DailyInformations.Any(e => e.Id == id);
        }



        [HttpGet]
        public async Task<ActionResult<IEnumerable<DailyInformation>>> GetDailyInformations()
        {
            return await _context.DailyInformations.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<DailyInformation>> GetDailyInformation(int id)
        {
            var dailyInformation = await _context.DailyInformations.FindAsync(id);

            if (dailyInformation == null)
            {
                return NotFound();
            }

            return dailyInformation;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutDailyInformation(int id, DailyInformation dailyInformation)
        {
            if (id != dailyInformation.Id)
            {
                return BadRequest();
            }

            _context.Entry(dailyInformation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DailyInfoExists(id))
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
        public async Task<ActionResult<DailyInformation>> PostDailyInformation(DailyInformation dailyInformation)
        {
            //prevent if user already has daily info for the same date
            dailyInformation.Date = dailyInformation.Date.Value.Date;
            var dailyInfo = await _context.DailyInformations.FirstOrDefaultAsync(x => x.UserId == dailyInformation.UserId && x.Date == dailyInformation.Date);
            
            if (dailyInfo != null)
            {
                return BadRequest("User already has daily info for this date");
            }


            _context.DailyInformations.Add(dailyInformation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDailyInformation", new { id = dailyInformation.Id }, dailyInformation);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDailyInformation(int id)
        {
            var dailyInformation = await _context.DailyInformations.FindAsync(id);
            if (dailyInformation == null)
            {
                return NotFound();
            }

            _context.DailyInformations.Remove(dailyInformation);
            await _context.SaveChangesAsync();

            return NoContent();
        }



        
        [HttpGet("GetDailyInfoByUserId/{userId}")]
        public async Task<ActionResult<IEnumerable<DailyInformation>>> GetDailyInfoByUserId(string userId)
        {
            return await _context.DailyInformations.Where(x => x.UserId == userId).ToListAsync();
        }


        [HttpGet("GetDailyInfoByTeamId/{teamId}")]
        public async Task<ActionResult<IEnumerable<DailyInformation>>> GetDailyInfoByTeamId(int teamId)
        {
            var teamUsers = await _context.TeamUsers.Where(x => x.TeamId == teamId).ToListAsync();
            List<DailyInformation> dailyInformations = new List<DailyInformation>();
            foreach (var teamUser in teamUsers)
            {
                var dailyInfo = await _context.DailyInformations.Where(x => x.UserId == teamUser.UserId).ToListAsync();
                dailyInformations.AddRange(dailyInfo);
            }
            return dailyInformations;
        }



    }

    
}
