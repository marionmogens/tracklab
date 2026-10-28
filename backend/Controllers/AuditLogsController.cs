using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrackLabBackend.Data;
using TrackLabBackend.Models;

namespace TrackLabBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuditLogsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuditLogsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAuditLog([FromBody] AuditLog log)
        {
            log.Timestamp = DateTime.UtcNow;
            _context.AuditLogs.Add(log);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Audit log recorded successfully" });
        }

        [HttpGet]
        public async Task<IActionResult> GetAuditLogs()
        {
            var logs = await _context.AuditLogs.OrderByDescending(x => x.Timestamp).ToListAsync();
            return Ok(logs);
        }
    }
}