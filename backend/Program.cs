using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using techconnect.Data;
using techconnect.Interfaces;
using techconnect.Models;
using techconnect.Repository;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("https://localhost:5173", "https://localhost:4173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
        });
});

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddScoped<ISkillRepository, SkillRepository>();
builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DBConnection")));

builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<AppUser>()
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<DataContext>();

var app = builder.Build();

app.UseCors();

app.MapIdentityApi<AppUser>();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
