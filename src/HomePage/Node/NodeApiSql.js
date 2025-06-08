const NodeApiSql = () => {
  return (
    <div
      style={{
        fontFamily: "'Segoe UI', sans-serif",
        background: "#f9f9f9",
        color: "#333",
        lineHeight: 1.6,
        padding: 20,
        maxWidth: 900,
        margin: "auto", // ✅ fixed: wrapped in double quotes, not inside another string
      }}
    >
      <h1 style={{ color: "#0a5275" }}>
        Node API with SQL Server - Express & mssql
      </h1>

      {/* Prerequisites */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>✅ Prerequisites</h2>
        <ul style={{ paddingLeft: 20 }}>
          <li>Node.js installed</li>
          <li>SQL Server installed</li>
          <li>SQL Server Management Studio</li>
          <li>Postman or Swagger</li>
        </ul>
      </section>

      {/* Initialize Project */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>🔹 1. Initialize Project</h2>
        <pre style={preStyle}>
          <code>{`npm init -y
npm install express mssql body-parser`}</code>
        </pre>
      </section>

      {/* DB Connection */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>🔹 2. Setup Database Connection</h2>
        <p><strong>db.js</strong></p>
        <pre style={preStyle}>
          <code>{`const sql = require('mssql');

const config = {
  user: 'sa',
  password: 'your_password',
  server: 'localhost', 
  database: 'ems',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

module.exports = config;`}</code>
        </pre>
      </section>

      {/* REST API Routes */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>🔹 3. Create REST API Routes</h2>
        <p><strong>index.js</strong></p>
        <pre style={preStyle}>
          <code>{`const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const dbConfig = require('./db');

const app = express();
app.use(bodyParser.json());

app.get('/api/employees', async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query('SELECT * FROM Employees');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/employees/:id', async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query(\`SELECT * FROM Employees WHERE Id = \${req.params.id}\`);
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/employees', async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const { name, position, salary } = req.body;
    await sql.query(\`INSERT INTO Employees (Name, Position, Salary) VALUES ('\${name}', '\${position}', \${salary})\`);
    res.send('Employee added successfully!');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/employees/:id', async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const { name, position, salary } = req.body;
    await sql.query(\`UPDATE Employees SET Name = '\${name}', Position = '\${position}', Salary = \${salary} WHERE Id = \${req.params.id}\`);
    res.send('Employee updated successfully!');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/employees/:id', async (req, res) => {
  try {
    await sql.connect(dbConfig);
    await sql.query(\`DELETE FROM Employees WHERE Id = \${req.params.id}\`);
    res.send('Employee deleted successfully!');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));`}</code>
        </pre>
      </section>

      {/* Create Table */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>🔹 4. Create SQL Table</h2>
        <pre style={preStyle}>
          <code>{`CREATE TABLE Employees (
  Id INT PRIMARY KEY IDENTITY,
  Name NVARCHAR(100),
  Position NVARCHAR(100),
  Salary FLOAT
);`}</code>
        </pre>
      </section>

      {/* Endpoints */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>🔹 5. API Endpoints</h2>
        <pre style={preStyle}>
          <code>{`
GET    /api/employees
GET    /api/employees/:id
POST   /api/employees
PUT    /api/employees/:id
DELETE /api/employees/:id
          `}</code>
        </pre>
      </section>
    </div>
  );
};

const sectionStyle = {
  background: "#fff",
  border: "1px solid #ddd",
  padding: 20,
  marginBottom: 20,
  borderRadius: 8,
};

const headingStyle = {
  color: "#0a5275",
};

const preStyle = {
  background: "#f0f0f0",
  padding: 15,
  borderLeft: "4px solid #007acc",
  overflowX: "auto",
};

export default NodeApiSql;
