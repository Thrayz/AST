using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AST.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace AST.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SocialInteractionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SocialInteractionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SocialInteraction>>> GetSocialInteractions()
        {
            return await _context.SocialInteractions.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SocialInteraction>> GetSocialInteraction(int id)
        {
            var socialInteraction = await _context.SocialInteractions.FindAsync(id);

            if (socialInteraction == null)
            {
                return NotFound();
            }

            return socialInteraction;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSocialInteraction(int id, SocialInteraction socialInteraction)
        {
            if (id != socialInteraction.Id)
            {
                return BadRequest();
            }

            _context.Entry(socialInteraction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SocialInteractionExists(id))
                {
                    return NotFound();
                }
            }

            return NoContent();
        }

        private bool SocialInteractionExists(int id)
        {
            return _context.SocialInteractions.Any(e => e.Id == id);
        }


        [HttpPost]
        public async Task<ActionResult<SocialInteraction>> PostSocialInteraction(SocialInteraction socialInteraction)
        {
            _context.SocialInteractions.Add(socialInteraction);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSocialInteraction", new { id = socialInteraction.Id }, socialInteraction);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSocialInteraction(int id)
        {
            var socialInteraction = await _context.SocialInteractions.FindAsync(id);
            if (socialInteraction == null)
            {
                return NotFound();
            }

            _context.SocialInteractions.Remove(socialInteraction);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        

    }
}
