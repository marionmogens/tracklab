using Microsoft.EntityFrameworkCore;
using TrackLabBackend.Models;

namespace TrackLabBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<SystemLog> SystemLogs { get; set; }
        public DbSet<AuditLog> AuditLogs { get; set; }
    }
}