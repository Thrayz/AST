using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AST.Server.Models;
using Microsoft.EntityFrameworkCore;
using Azure.Core;
using System.Text.Json.Serialization;
using System.Text.Json;



namespace AST.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TeamsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Team>>> GetTeams()
        {
            return await _context.Teams.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Team>> CreateTeam(Team team)
        {
            _context.Teams.Add(team);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTeams), new { id = team.Id }, team);
        }





        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTeam(int id, Team team)
        {
            if (id != team.Id)
            {
                return BadRequest();
            }
            _context.Entry(team).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeamExists(id))
                {
                    return NotFound();
                }
            }
            return NoContent();
        }


        [HttpDelete]
        public async Task<ActionResult<Team>> DeleteTeam(int teamId)
        {
            var team = await _context.Teams.FindAsync(teamId);
            if (team == null)
            {
                return NotFound();
            }
            _context.Teams.Remove(team);
            await _context.SaveChangesAsync();
            return team;
        }


        [HttpPost("addUserToTeam")]
        public async Task<ActionResult<Team>> AddUserToTeam(TeamUser teamUser)
        {
            _context.TeamUsers.Add(teamUser);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTeams), new { id = teamUser.Id }, teamUser);
           
        }

        [HttpDelete("removeUserFromTeam")]
        public async Task<ActionResult<TeamUser>> RemoveUserFromTeam(int teamId, string userId)
        {
            var teamUser = await _context.TeamUsers.Where(tu => tu.TeamId == teamId && tu.UserId == userId).FirstOrDefaultAsync();
            if (teamUser == null)
            {
                return NotFound();
            }
            _context.TeamUsers.Remove(teamUser);
            await _context.SaveChangesAsync();
            return teamUser;
        }

        [HttpGet("GetTeamUser")]
        public async Task<IEnumerable<TeamUser>> getAllTeamUsers()
        {
            return await _context.TeamUsers.ToListAsync();
        }

        [HttpGet("GetTeamUserT/{teamId}")]
        public async Task<IEnumerable<TeamUser>> getTeamUsers(int teamId)
        {
            return await _context.TeamUsers.Where(tu => tu.TeamId == teamId).ToListAsync();
        }

        [HttpGet("GetTeamUserU/{userId}")]
        public async Task<IEnumerable<TeamUser>> getUserTeams(string userId)
        {
            return await _context.TeamUsers.Where(tu => tu.UserId == userId).ToListAsync();
        }





        private bool TeamExists(int id)
        {
            return _context.Teams.Any(e => e.Id == id);
        }
    }
}
