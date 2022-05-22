using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using FootballTournament.Data;
using FootballTournament.Services.Users;
using Microsoft.AspNetCore.Identity;
using FootballTournament.Data.Models;
using Microsoft.EntityFrameworkCore;
using FootballTournament.Data.Seeding;
using FootballTournament.Services.Tournaments;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));

//builder.Services.AddSqlServer<FootballTournamentContext>(
//    builder.Configuration.GetConnectionString("DefaultConnection"));

builder.Services.AddDbContext<FootballTournamentContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// builder.Services.AddSingleton<UserManager<ApplicationUser>>();
builder.Services.AddIdentity<ApplicationUser, ApplicationRole>(opts =>
{
    opts.Password.RequireDigit = false;
    opts.Password.RequireLowercase = false;
    opts.Password.RequireUppercase = false;
    opts.Password.RequireNonAlphanumeric = false;
})
    .AddEntityFrameworkStores<FootballTournamentContext>()
    .AddDefaultTokenProviders();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});
builder.Services.AddTransient<ITournamentsService, TournamentsService>();
var app = builder.Build();

Seed();

void Seed()
{
    using (var scope = app.Services.CreateScope())
    {
        var service = scope.ServiceProvider.GetService<ApplicationDbSeeder>();

        if (service != null)
        {
            service.Seed().GetAwaiter().GetResult();
        }
        else
        {
            Console.WriteLine("Service provider is null");
        }
        
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.UseCors("CorsPolicy");
app.MapControllers();

app.Run();
