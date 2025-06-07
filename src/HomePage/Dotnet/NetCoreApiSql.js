import React from 'react';

function NetCoreApiSql() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>CRUD in .NET Core using SQL Server EF Code First</h2>

      <h3>1. Create Project</h3>
      <p>Create a new ASP.NET Core Web API project in Visual Studio.</p>

      <h3>2. Install NuGet Packages</h3>
      <pre>
        <code>
          Install-Package Microsoft.EntityFrameworkCore{'\n'}
          Install-Package Microsoft.EntityFrameworkCore.SqlServer{'\n'}
          Install-Package Microsoft.EntityFrameworkCore.Tools
        </code>
      </pre>

      <h3>3. Country Model</h3>
      <pre>
        <code>
          {`public class Country {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Code { get; set; }
}`}
        </code>
      </pre>

      <h3>4. AppDbContext</h3>
      <pre>
        <code>
          {`public class AppDbContext : DbContext {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Country> Countries { get; set; }
}`}
        </code>
      </pre>

      <h3>5. appsettings.json</h3>
      <pre>
        <code>
          {`"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SQL_SERVER;Database=CountryDb;Trusted_Connection=True;"
}`}
        </code>
      </pre>

      <h3>6. Configure Program.cs</h3>
      <pre>
        <code>
          {`builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));`}
        </code>
      </pre>

      <h3>7. CountryController</h3>
      <pre>
        <code>
          {`[ApiController]
[Route("api/[controller]")]
public class CountryController : ControllerBase {
    private readonly AppDbContext _context;

    public CountryController(AppDbContext context) {
        _context = context;
    }

    [HttpGet]
    public async Task<IEnumerable<Country>> Get() => await _context.Countries.ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<Country>> Get(int id) {
        var country = await _context.Countries.FindAsync(id);
        if (country == null) return NotFound();
        return country;
    }

    [HttpPost]
    public async Task<ActionResult<Country>> Post(Country country) {
        _context.Countries.Add(country);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = country.Id }, country);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Country country) {
        if (id != country.Id) return BadRequest();
        _context.Entry(country).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id) {
        var country = await _context.Countries.FindAsync(id);
        if (country == null) return NotFound();
        _context.Countries.Remove(country);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}`}
        </code>
      </pre>

      <h3>8. Run Migrations</h3>
      <pre>
        <code>
          Add-Migration InitialCreate{'\n'}
          Update-Database
        </code>
      </pre>

      <h3> API Endpoints</h3>
      <ul>
        <li>GET /api/country → Get all countries</li>
        <li>GET /api/country/&#123;id&#125; → Get country by ID</li>
        <li>POST /api/country → Create new country</li>
        <li>PUT /api/country/&#123;id&#125; → Update a country</li>
        <li>DELETE /api/country/&#123;id&#125; → Delete a country</li>
      </ul>
    </div>
  );
}

export default NetCoreApiSql;
