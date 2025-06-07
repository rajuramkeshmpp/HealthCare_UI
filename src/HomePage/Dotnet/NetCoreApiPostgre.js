import React from 'react';

function NetCoreApiPostgre() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>.NET Core Web API + PostgreSQL CRUD Guide</h2>

      <ol>
        <li>
          <strong>Create Project</strong><br />
          Create a new ASP.NET Core Web API project in Visual Studio.
        </li>

        <li>
          <strong>Install NuGet Packages</strong><br />
          <code>Install-Package Microsoft.EntityFrameworkCore</code><br />
          <code>Install-Package Npgsql.EntityFrameworkCore.PostgreSQL</code><br />
          <code>Install-Package Microsoft.EntityFrameworkCore.Tools</code><br />
          <em>Note: Npgsql is the EF Core provider for PostgreSQL.</em>
        </li>

        <li>
          <strong>Country Model</strong>
          <pre>
{`public class Country {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Code { get; set; }
}`}
          </pre>
        </li>

        <li>
          <strong>AppDbContext</strong>
          <pre>
{`using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Country> Countries { get; set; }
}`}
          </pre>
        </li>

        <li>
          <strong>appsettings.json</strong>
          <pre>
{`{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=CountryDb;Username=yourusername;Password=yourpassword"
  }
}`}
          </pre>
          Replace <code>yourusername</code> and <code>yourpassword</code> with your PostgreSQL credentials.
        </li>

        <li>
          <strong>Configure Program.cs</strong>
          <pre>
{`using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();
app.Run();`}
          </pre>
        </li>

        <li>
          <strong>CountryController</strong>
          <pre>
{` [ApiController]
 public class CountriesController : ControllerBase
 {
     private readonly AppDbContext _context;

     public CountriesController(AppDbContext context)
     {
         _context = context;
     }

     // GET: api/Countries
     [HttpGet]
     public async Task<ActionResult<IEnumerable<Country>>> GetCountries()
     {
         return await _context.Countries.ToListAsync();
     }

     // GET: api/Countries/5
     [HttpGet("{id}")]
     public async Task<ActionResult<Country>> GetCountry(int id)
     {
         var country = await _context.Countries.FindAsync(id);

         if (country == null)
         {
             return NotFound();
         }

         return country;
     }

     // PUT: api/Countries/5
     // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
     [HttpPut("{id}")]
     public async Task<IActionResult> PutCountry(int id, Country country)
     {
         if (id != country.Id)
         {
             return BadRequest();
         }

         _context.Entry(country).State = EntityState.Modified;

         try
         {
             await _context.SaveChangesAsync();
         }
         catch (DbUpdateConcurrencyException)
         {
             if (!CountryExists(id))
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

     // POST: api/Countries
     // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
     [HttpPost]
     public async Task<ActionResult<Country>> PostCountry(Country country)
     {
         _context.Countries.Add(country);
         await _context.SaveChangesAsync();

         return CreatedAtAction("GetCountry", new { id = country.Id }, country);
     }

     // DELETE: api/Countries/5
     [HttpDelete("{id}")]
     public async Task<IActionResult> DeleteCountry(int id)
     {
         var country = await _context.Countries.FindAsync(id);
         if (country == null)
         {
             return NotFound();
         }

         _context.Countries.Remove(country);
         await _context.SaveChangesAsync();

         return NoContent();
     }

     private bool CountryExists(int id)
     {
         return _context.Countries.Any(e => e.Id == id);
     }
 
}`}
          </pre>
        </li>

        <li>
          <strong>Run Migrations</strong><br />
          In the Package Manager Console:
          <pre>
{`Add-Migration InitialCreate
Update-Database`}
          </pre>
        </li>

        <li>
          <strong> API Endpoints</strong>
          <ul>
            <li><code>GET /api/country</code> → Get all countries</li>
            <li><code>GET /api/country/&lt;id&gt;</code> → Get country by ID</li>
            <li><code>POST /api/country</code> → Create new country</li>
            <li><code>PUT /api/country/&lt;id&gt;</code> → Update a country</li>
            <li><code>DELETE /api/country/&lt;id&gt;</code> → Delete a country</li>
          </ul>
        </li>
      </ol>
    </div>
  );
}

export default NetCoreApiPostgre;
