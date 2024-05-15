using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AST.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.Identity.Client;


namespace AST.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ActivitiesController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet("/Paginated")]
        public async Task<ActionResult<IEnumerable<Activity>>> GetActivitiesPaginated(int page, int pageSize)
        {
            return await _context.Activities.Skip(page * pageSize).Take(pageSize).ToListAsync();
        }

        [HttpGet("/FilteredAndPaginated")]
        public async Task<ActionResult<IEnumerable<Activity>>> GetActivitiesFilteredandPaginated(int page, int pageSize, string filter)
        {
            return await _context.Activities.Where(a => a.ActivityType.Contains(filter)).Skip(page * pageSize).Take(pageSize).ToListAsync();
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Activity>>> GetActivities()
        {
            return await _context.Activities.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(int id)
        {
            var activity = await _context.Activities.FindAsync(id);

            if (activity == null)
            {
                return NotFound();
            }

            return activity;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutActivity(int id, Activity activity)
        {
            if (id != activity.Id)
            {
                return BadRequest();
            }

            _context.Entry(activity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActivityExists(id))
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
        public async Task<ActionResult<Activity>> PostActivity(Activity activity)
        {
            _context.Activities.Add(activity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActivity", new { id = activity.Id }, activity);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(int id)
        {
            var activity = await _context.Activities.FindAsync(id);
            if (activity == null)
            {
                return NotFound();
            }

            _context.Activities.Remove(activity);
            await _context.SaveChangesAsync();

            return NoContent();
        }



        [HttpGet("user/{userId}/dateRange")]
        public async Task<ActionResult<IEnumerable<Activity>>> GetActivitiesUserDateRange(string userId, DateTime startDate, DateTime endDate)
        {
            // Parse the start and end dates before using them in the LINQ expression
            var parsedStartDate = startDate.Date;
            var parsedEndDate = endDate.Date.AddDays(1).AddTicks(-1); // Adjusted to include the end of the end date

            return await _context.Activities
                .Where(a => a.UserId == userId && DateTime.Parse(a.Date) >= parsedStartDate && DateTime.Parse(a.Date) <= parsedEndDate)
                .ToListAsync();
        }



        private bool ActivityExists(int id)
        {
            return _context.Activities.Any(e => e.Id == id);
        }


        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Activity>>> GetActivitiesUser(string userId)
        {
            return await _context.Activities.Where(a => a.UserId == userId).ToListAsync();
        }




        [HttpGet("team/{teamId}")]
        public async Task<ActionResult<IEnumerable<Activity>>> GetActivitiesForTeam(int teamId)
        {   
            var teamUsers = await _context.TeamUsers.Where(tu => tu.TeamId == teamId).ToListAsync();
            List<Activity> activities = new List<Activity>();
            foreach (var tu in teamUsers)
            {
                var userActivities = await _context.Activities.Where(a => a.UserId == tu.UserId).ToListAsync();
                activities.AddRange(userActivities);
            }
            return activities;
        }


        




      





    }
}
