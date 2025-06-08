const DotNetQA = () => {
  const styles = {
    container: {
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      maxWidth: 900,
      margin: "40px auto",
      backgroundColor: "#f9f9f9",
      color: "#333",
      lineHeight: 1.6,
      padding: "0 20px",
    },
    h1: {
      textAlign: "center",
      color: "#2c3e50",
      marginBottom: 30,
    },
    h2: {
      color: "#34495e",
      borderBottom: "2px solid #2980b9",
      paddingBottom: 6,
      marginTop: 40,
    },
    pre: {
      background: "#ecf0f1",
      padding: 12,
      borderRadius: 6,
      overflowX: "auto",
    },
    table: {
      borderCollapse: "collapse",
      margin: "12px 0 20px 0",
      width: "100%",
    },
    th: {
      border: "1px solid #ddd",
      padding: 8,
      textAlign: "left",
      backgroundColor: "#2980b9",
      color: "white",
    },
    td: {
      border: "1px solid #ddd",
      padding: 8,
      textAlign: "left",
    },
    answer: {
      marginTop: 8,
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>.NET Core Interview Questions & Answers</h1>

      <section>
        <h2 style={styles.h2}>1. What is .NET Core?</h2>
        <div style={styles.answer}>
          <p>
            <strong>Answer:</strong> <br />
            .NET Core is an open-source, cross-platform framework developed by
            Microsoft for building modern, cloud-based, internet-connected
            applications. It supports Windows, macOS, and Linux.
          </p>
        </div>
      </section>

      <section>
        <h2 style={styles.h2}>
          2. What are the main differences between .NET Framework and .NET Core?
        </h2>
        <div style={styles.answer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Feature</th>
                <th style={styles.th}>.NET Framework</th>
                <th style={styles.th}>.NET Core</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>Platform</td>
                <td style={styles.td}>Windows only</td>
                <td style={styles.td}>Cross-platform (Win, Linux, macOS)</td>
              </tr>
              <tr>
                <td style={styles.td}>App Types</td>
                <td style={styles.td}>Desktop, Web</td>
                <td style={styles.td}>Web, Console, Cloud, IoT</td>
              </tr>
              <tr>
                <td style={styles.td}>Open-source</td>
                <td style={styles.td}>Partially</td>
                <td style={styles.td}>Fully open-source</td>
              </tr>
              <tr>
                <td style={styles.td}>Performance</td>
                <td style={styles.td}>Moderate</td>
                <td style={styles.td}>High-performance</td>
              </tr>
              <tr>
                <td style={styles.td}>Dependency Injection</td>
                <td style={styles.td}>Requires external libs</td>
                <td style={styles.td}>Built-in support</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 style={styles.h2}>3. What is Middleware in .NET Core?</h2>
        <div style={styles.answer}>
          <p>
            <strong>Answer:</strong> <br />
            Middleware is software that's assembled into the request pipeline to
            handle requests and responses. You configure middleware in{" "}
            <code>Startup.cs</code> using <code>app.Use...</code> methods.
          </p>
          <pre style={styles.pre}>
            {`public void Configure(IApplicationBuilder app)
{
    app.UseRouting();
    app.UseAuthorization();
    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
    });
}`}
          </pre>
        </div>
      </section>

      <section>
        <h2 style={styles.h2}>4. How do you inject dependencies in .NET Core?</h2>
        <div style={styles.answer}>
          <p>
            <strong>Answer:</strong> <br />
            Using built-in <strong>Dependency Injection (DI)</strong> container
            via constructor injection.
          </p>
          <pre style={styles.pre}>
            {`public class EmployeeService : IEmployeeService
{
    private readonly IRepository _repository;

    public EmployeeService(IRepository repository)
    {
        _repository = repository;
    }
}`}
          </pre>
          <p>Registered in <code>Startup.cs</code>:</p>
          <pre style={styles.pre}>
            {`services.AddScoped<IRepository, Repository>();`}
          </pre>
        </div>
      </section>

      <section>
        <h2 style={styles.h2}>
          5. What is the difference between AddScoped, AddSingleton, and AddTransient?
        </h2>
        <div style={styles.answer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Lifetime</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>Singleton</td>
                <td style={styles.td}>Same instance for the entire application.</td>
              </tr>
              <tr>
                <td style={styles.td}>Scoped</td>
                <td style={styles.td}>One instance per request.</td>
              </tr>
              <tr>
                <td style={styles.td}>Transient</td>
                <td style={styles.td}>New instance every time it's requested.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 style={styles.h2}>6. What is the purpose of <code>appsettings.json</code>?</h2>
        <div style={styles.answer}>
          <p>
            <strong>Answer:</strong> <br />
            It's used for application configuration (e.g., connection strings,
            keys).
          </p>
          <pre style={styles.pre}>
            {`public class MyService
{
    private readonly IConfiguration _config;

    public MyService(IConfiguration config)
    {
        _config = config;
    }

    public void PrintKey()
    {
        var value = _config["MyKey"];
    }
}`}
          </pre>
        </div>
      </section>

      <section>
        <h2 style={styles.h2}>7. What is Kestrel in .NET Core?</h2>
        <div style={styles.answer}>
          <p>
            <strong>Answer:</strong> <br />
            Kestrel is a cross-platform web server included in ASP.NET Core, used
            to handle HTTP requests.
          </p>
        </div>
      </section>

      <section>
        <h2 style={styles.h2}>8. How do you enable CORS in .NET Core?</h2>
        <div style={styles.answer}>
          <pre style={styles.pre}>
            {`// Startup.cs - ConfigureServices
services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

// Startup.cs - Configure
app.UseCors("AllowAll");
`}
          </pre>
        </div>
      </section>

      <section>
        <h2 style={styles.h2}>9. What is Model Binding in ASP.NET Core?</h2>
        <div style={styles.answer}>
          <p>
            <strong>Answer:</strong> <br />
            Model Binding automatically maps HTTP request data to action method
            parameters.
          </p>
          <pre style={styles.pre}>
            {`[HttpPost]
public IActionResult Create(Employee emp)
{
    // Model binder binds form fields to 'emp'
}`}
          </pre>
        </div>
      </section>

      <section>
        <h2 style={styles.h2}>10. How do you implement logging in .NET Core?</h2>
        <div style={styles.answer}>
          <pre style={styles.pre}>
            {`private readonly ILogger<HomeController> _logger;

public HomeController(ILogger<HomeController> logger)
{
    _logger = logger;
}

_logger.LogInformation("This is an info log.");
`}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default DotNetQA