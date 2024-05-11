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



        //get daily info by user id
        [HttpGet("GetDailyInfoByUserId/{userId}")]
        public async Task<ActionResult<IEnumerable<DailyInformation>>> GetDailyInfoByUserId(string userId)
        {
            return await _context.DailyInformations.Where(x => x.UserId == userId).ToListAsync();
        }



    }

    
}
