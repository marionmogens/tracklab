using Microsoft.EntityFrameworkCore;
using TrackLabBackend.Data;
using TrackLabBackend.Middlewares;

var builder = WebApplication.CreateBuilder(args);

// Add Services & SQLite Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=tracklab_logging.db"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextJS",
        policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

// Ensure Database Created Automatically
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

app.UseCors("AllowNextJS");

// Register Custom Logging Middleware
app.UseMiddleware<RequestLoggingMiddleware>();

app.MapControllers();

app.Run();