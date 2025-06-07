import React from 'react';

function NetCoreApiMongo() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2> CRUD in .NET Core using MongoDB (Simplified)</h2>
      <h3>1. Create Project</h3>
      <p>Create a new ASP.NET Core Web API project in Visual Studio.</p>
      <h3>2. Install NuGet Packages</h3>
      <pre><code>Install-Package MongoDB.Driver</code></pre>
      <h3>3. Country Model</h3>
      <pre>
        <code>{`
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
public class Country
{
    [BsonId]
    [BsonRepresentation(BsonType.Int32)]
    public string Id { get; set; }
    public string Name { get; set; }
    public string Code { get; set; }
}
        `}</code>
      </pre>
      <h3>4. MongoDB Context</h3>
      <pre>
        <code>{`
using MongoDB.Driver;
public class MongoDbContext
{
    private readonly IMongoDatabase _database;

    public MongoDbContext(IConfiguration configuration)
    {
        var client = new MongoClient(configuration.GetConnectionString("DefaultConnection"));
        _database = client.GetDatabase("CountryDb");
    }

    public IMongoCollection<Country> Countries => _database.GetCollection<Country>("Countries");
}
        `}</code>
      </pre>
      <h3>5. appsettings.json</h3>
      <pre>
        <code>{`
{
  "ConnectionStrings": {
    "DefaultConnection": "mongodb://localhost:27017"
  }
}
        `}</code>
      </pre>

      <h3>6. Configure in Program.cs</h3>
      <pre>
        <code>{`
builder.Services.AddSingleton<MongoDbContext>();
builder.Services.AddControllers();
        `}</code>
      </pre>

      <h3>7. CountryController</h3>
      <pre>
        <code>{`
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
[ApiController]
[Route("api/[controller]")]
public class CountryController : ControllerBase
{
    private readonly IMongoCollection<Country> _countries;

    public CountryController(MongoDbContext context)
    {
        _countries = context.Countries;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Country>>> Get() =>
        await _countries.Find(_ => true).ToListAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Country>> Get(int id)
    {
        var country = await _countries.Find(c => c.Id == id).FirstOrDefaultAsync();
        if (country == null) return NotFound();
        return country;
    }
    [HttpPost]
    public async Task<ActionResult<Country>> Post(Country country)
    {
        await _countries.InsertOneAsync(country);
        return CreatedAtAction(nameof(Get), new { id = country.Id }, country);
    }
    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Put(int id, Country country)
    {
        var result = await _countries.ReplaceOneAsync(c => c.Id == id, country);
        if (result.MatchedCount == 0) return NotFound();
        return NoContent();
    }
    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _countries.DeleteOneAsync(c => c.Id == id);
        if (result.DeletedCount == 0) return NotFound();
        return NoContent();
    }
}
        `}</code>
      </pre>
      <h3> API Endpoints</h3>
      <table  cellPadding="8" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Method</th>
            <th>Endpoint</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>GET</td><td>/api/country</td><td>Get all countries</td></tr>
          <tr><td>GET</td><td>/api/country/&#123;id&#125;</td><td>Get country by ID</td></tr>
          <tr><td>POST</td><td>/api/country</td><td>Add new country</td></tr>
          <tr><td>PUT</td><td>/api/country/&#123;id&#125;</td><td>Update a country</td></tr>
          <tr><td>DELETE</td><td>/api/country/&#123;id&#125;</td><td>Delete a country</td></tr>
        </tbody>
      </table>
    </div>
  );
}

export default NetCoreApiMongo;
