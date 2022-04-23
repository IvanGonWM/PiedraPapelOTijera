using Microsoft.EntityFrameworkCore;
using PiedraPapelOTijera.Data;
using PiedraPapelOTijera.Data.Model;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

var connectionString = builder.Configuration.GetConnectionString("conexion1");

builder.Services.AddDbContext<Context>(
    options => options.UseSqlServer(connectionString));

var app = builder.Build();

using (var serviceScope = app.Services.CreateScope())
{
    var cntx = serviceScope.ServiceProvider.GetService<Context>();

    if (!cntx.Elemento.Any())
    {
        cntx.Elemento.Add(new Elemento() {Nombre = "Piedra"});

        cntx.Elemento.Add(new Elemento() {Nombre = "Papel"});

        cntx.Elemento.Add(new Elemento() {Nombre = "Tijera"});

        await cntx.SaveChangesAsync();

        cntx.Gana.Add(new Gana()
        {
            ElementoId = cntx.Elemento.First(e => e.Nombre == "Piedra").Id,
            GanaContraId = cntx.Elemento.First(e => e.Nombre == "Tijera").Id
        });

        cntx.Gana.Add(new Gana()
        {
            ElementoId = cntx.Elemento.First(e => e.Nombre == "Tijera").Id,
            GanaContraId = cntx.Elemento.First(e => e.Nombre == "Papel").Id
        });

        cntx.Gana.Add(new Gana()
        {
            ElementoId = cntx.Elemento.First(e => e.Nombre == "Papel").Id,
            GanaContraId = cntx.Elemento.First(e => e.Nombre == "Piedra").Id
        });

        await cntx.SaveChangesAsync();
    }

// Configure the HTTP request pipeline.
    if (!app.Environment.IsDevelopment())
    {
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
    }

    app.UseHttpsRedirection();
    app.UseStaticFiles();
    app.UseRouting();


    app.MapControllerRoute(
        name: "default",
        pattern: "{controller}/{action=Index}/{id?}");

    app.MapFallbackToFile("index.html");
    ;

    app.Run();
}
