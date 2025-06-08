const NodeApiPostgre = () => {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#f9f9f9", color: "#333", lineHeight: 1.6, padding: 20, maxWidth: 900, margin: "auto" }}>
      <h1 style={{ color: "#0a5275" }}>Node API with PostgreSQL - Express & Sequelize</h1>

      <section style={{ background: "#fff", border: "1px solid #ddd", padding: 20, marginBottom: 20, borderRadius: 8 }}>
        <h2 style={{ color: "#0a5275" }}>✅ Prerequisites</h2>
        <ul style={{ paddingLeft: 20 }}>
          <li>Node.js installed</li>
          <li>PostgreSQL installed</li>
          <li>pgAdmin</li>
          <li>Postman or Swagger</li>
        </ul>
      </section>

      <section style={{ background: "#fff", border: "1px solid #ddd", padding: 20, marginBottom: 20, borderRadius: 8 }}>
        <h2 style={{ color: "#0a5275" }}>🔹 1. Initialize Project</h2>
        <pre style={{ background: "#f0f0f0", padding: 15, borderLeft: "4px solid #007acc", overflowX: "auto" }}>
          <code>{`npm init -y
npm install express sequelize pg pg-hstore body-parser`}</code>
        </pre>
      </section>

      <section style={{ background: "#fff", border: "1px solid #ddd", padding: 20, marginBottom: 20, borderRadius: 8 }}>
        <h2 style={{ color: "#0a5275" }}>🔹 2. Create Model</h2>
        <p><strong>models/Employee.js</strong></p>
        <pre style={{ background: "#f0f0f0", padding: 15, borderLeft: "4px solid #007acc", overflowX: "auto" }}>
          <code>{`const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Employee = sequelize.define('Employee', {
  name: { type: DataTypes.STRING, allowNull: false },
  position: { type: DataTypes.STRING, allowNull: false },
  salary: { type: DataTypes.FLOAT, allowNull: false }
});

module.exports = Employee;`}</code>
        </pre>
      </section>

      <section style={{ background: "#fff", border: "1px solid #ddd", padding: 20, marginBottom: 20, borderRadius: 8 }}>
        <h2 style={{ color: "#0a5275" }}>🔹 3. Setup Express and Connect to PostgreSQL</h2>
        <p><strong>db.js</strong></p>
        <pre style={{ background: "#f0f0f0", padding: 15, borderLeft: "4px solid #007acc", overflowX: "auto" }}>
          <code>{`const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ems', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;`}</code>
        </pre>
      </section>

      <section style={{ background: "#fff", border: "1px solid #ddd", padding: 20, marginBottom: 20, borderRadius: 8 }}>
        <h2 style={{ color: "#0a5275" }}>🔹 4. Create REST API Routes</h2>
        <p><strong>index.js</strong></p>
        <pre style={{ background: "#f0f0f0", padding: 15, borderLeft: "4px solid #007acc", overflowX: "auto" }}>
          <code>{`const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const Employee = require('./models/Employee');

const app = express();
app.use(bodyParser.json());

sequelize.sync();

app.get('/api/employees', async (req, res) => {
  const employees = await Employee.findAll();
  res.json(employees);
});

app.get('/api/employees/:id', async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);
  if (!employee) return res.status(404).json({ message: 'Employee not found' });
  res.json(employee);
});

app.post('/api/employees', async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/employees/:id', async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);
  if (!employee) return res.status(404).json({ message: 'Employee not found' });
  await employee.update(req.body);
  res.json(employee);
});

app.delete('/api/employees/:id', async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);
  if (!employee) return res.status(404).json({ message: 'Employee not found' });
  await employee.destroy();
  res.json({ message: 'Employee deleted successfully!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));`}</code>
        </pre>
      </section>
    </div>
  );
};

export default NodeApiPostgre