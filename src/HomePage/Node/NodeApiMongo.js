const NodeApiMongo = () => {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#f9f9f9", color: "#333", lineHeight: 1.6, padding: 20, maxWidth: 900, margin: "auto" }}>
      <h1 style={{ color: "#0a5275" }}>Node API with MongoDB - Express & Mongoose</h1>
      
      <section style={{ background: "#fff", border: "1px solid #ddd", padding: 20, marginBottom: 20, borderRadius: 8 }}>
        <h2 style={{ color: "#0a5275" }}>✅ Prerequisites</h2>
        <ul style={{ paddingLeft: 20 }}>
          <li>Node.js installed</li>
          <li>MongoDB installed</li>
          <li>MongoDB Compass</li>
          <li>Postman or Swagger</li>
        </ul>
      </section>

      <section style={{ background: "#fff", border: "1px solid #ddd", padding: 20, marginBottom: 20, borderRadius: 8 }}>
        <h2 style={{ color: "#0a5275" }}>🔹 1. Initialize Project</h2>
        <pre style={{ background: "#f0f0f0", padding: 15, borderLeft: "4px solid #007acc", overflowX: "auto" }}>
          <code>
{`npm init -y
npm install express mongoose body-parser`}
          </code>
        </pre>
      </section>

      <section style={{ background: "#fff", border: "1px solid #ddd", padding: 20, marginBottom: 20, borderRadius: 8 }}>
        <h2 style={{ color: "#0a5275" }}>🔹 2. Create Model</h2>
        <p><strong>models/Employee.js</strong></p>
        <pre style={{ background: "#f0f0f0", padding: 15, borderLeft: "4px solid #007acc", overflowX: "auto" }}>
          <code>
{`const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  salary: { type: Number, required: true }
});

module.exports = mongoose.model('Employee', employeeSchema);
`}
          </code>
        </pre>
      </section>

      <section style={{ background: "#fff", border: "1px solid #ddd", padding: 20, marginBottom: 20, borderRadius: 8 }}>
        <h2 style={{ color: "#0a5275" }}>🔹 3. Setup Express and Connect to MongoDB</h2>
        <p><strong>index.js</strong></p>
        <pre style={{ background: "#f0f0f0", padding: 15, borderLeft: "4px solid #007acc", overflowX: "auto" }}>
          <code>
{`const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/ems', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const Employee = require('./models/Employee');

// Routes will be here...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
`}
          </code>
        </pre>
      </section>

      <section style={{ background: "#fff", border: "1px solid #ddd", padding: 20, marginBottom: 20, borderRadius: 8 }}>
        <h2 style={{ color: "#0a5275" }}>🔹 4. Create REST API Routes</h2>
        <p><strong>index.js (continued)</strong></p>
        <pre style={{ background: "#f0f0f0", padding: 15, borderLeft: "4px solid #007acc", overflowX: "auto" }}>
          <code>
{`// Get all employees
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get employee by ID
app.get('/api/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new employee
app.post('/api/employees', async (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    position: req.body.position,
    salary: req.body.salary
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update employee
app.put('/api/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    employee.name = req.body.name ?? employee.name;
    employee.position = req.body.position ?? employee.position;
    employee.salary = req.body.salary ?? employee.salary;

    const updatedEmployee = await employee.save();
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete employee
app.delete('/api/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    await employee.remove();
    res.json({ message: 'Employee deleted successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
`}
          </code>
        </pre>
      </section>

      <h1 style={{ color: "#0a5275", marginTop: 40 }}>Country, State and District API - Node + Express + MongoDB</h1>

      <section style={{ background: "#fff", border: "1px solid #ddd", padding: 20, marginBottom: 20, borderRadius: 8 }}>
        <h2 style={{ color: "#0a5275" }}>🔹 1. Create Country, State and District Models</h2>

        <p><strong>models/Country.js</strong></p>
        <pre style={{ background: "#f0f0f0", padding: 15, borderLeft: "4px solid #007acc", overflowX: "auto" }}>
          <code>
{`const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model('Country', countrySchema);`}
          </code>
        </pre>

        <p><strong>models/State.js</strong></p>
        <pre style={{ background: "#f0f0f0", padding: 15, borderLeft: "4px solid #007acc", overflowX: "auto" }}>
          <code>
{`const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  countryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' }
});

module.exports = mongoose.model('State', stateSchema);`}
          </code>
        </pre>

        <p><strong>models/District.js</strong></p>
        <pre style={{ background: "#f0f0f0", padding: 15, borderLeft: "4px solid #007acc", overflowX: "auto" }}>
          <code>
{`const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stateId: { type: mongoose.Schema.Types.ObjectId, ref: 'State' }
});

module.exports = mongoose.model('District', districtSchema);`}
          </code>
        </pre>
      </section>

      <section style={{ background: "#fff", border: "1px solid #ddd", padding: 20, marginBottom: 20, borderRadius: 8 }}>
        <h2 style={{ color: "#0a5275" }}>🔹 2. Setup MongoDB Connection</h2>
        <p><strong>db.js</strong></p>
        <pre style={{ background: "#f0f0f0", padding: 15, borderLeft: "4px solid #007acc", overflowX: "auto" }}>
          <code>
{`const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/locationdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));`}
          </code>
        </pre>
      </section>

      <section style={{ background: "#fff", border: "1px solid #ddd", padding: 20, marginBottom: 20, borderRadius: 8 }}>
        <h2 style={{ color: "#0a5275" }}>🔹 3. Create Controllers</h2>
        <p><strong>controllers/countryController.js</strong></p>
        <pre style={{ background: "#f0f0f0", padding: 15, borderLeft: "4px solid #007acc", overflowX: "auto" }}>
          <code>
{`const Country = require('../models/Country');

exports.getAll = async (req, res) => {
  const countries = await Country.find();
  res.json(countries);
};

exports.getById = async (req, res) => {
  const country = await Country.findById(req.params.id);
  res.json(country);
};

exports.create = async (req, res) => {
  const country = new Country(req.body);
  await country.save();
  res.send('Country added successfully!');
};

exports.update = async (req, res) => {
  await Country.findByIdAndUpdate(req.params.id, req.body);
  res.send('Country updated successfully!');
};

exports.delete = async (req, res) => {
  await Country.findByIdAndDelete(req.params.id);
  res.send('Country deleted successfully!');
};`}
          </code>
        </pre>
      </section>

      <section style={{ background: "#fff", border: "1px solid #ddd", padding: 20, marginBottom: 20, borderRadius: 8 }}>
        <h2 style={{ color: "#0a5275" }}>🔹 4. Setup Routes</h2>
        <p><strong>routes/countryRoutes.js</strong></p>
        <pre style={{ background: "#f0f0f0", padding: 15, borderLeft: "4px solid #007acc", overflowX: "auto" }}>
          <code>
{`const express = require('express');
const router = express.Router();
const countryCtrl = require('../controllers/countryController');

router.get('/', countryCtrl.getAll);
router.get('/:id', countryCtrl.getById);
router.post('/', countryCtrl.create);
router.put('/:id', countryCtrl.update);
router.delete('/:id', countryCtrl.delete);

module.exports = router;`}
          </code>
        </pre>
      </section>

      <section style={{ background: "#fff", border: "1px solid #ddd", padding: 20, marginBottom: 20, borderRadius: 8 }}>
        <h2 style={{ color: "#0a5275" }}>🔹 5. Register Routes in App</h2>
        <p><strong>index.js</strong></p>
        <pre style={{ background: "#f0f0f0", padding: 15, borderLeft: "4px solid #007acc", overflowX: "auto" }}>
          <code>
{`const express = require('express');
const app = express();
const cors = require('cors');
require('./db'); // DB connection

app.use(cors());
app.use(express.json());

const countryRoutes = require('./routes/countryRoutes');
app.use('/api/countries', countryRoutes);

app.listen(3000, () => console.log('Server started on port 3000'));`}
          </code>
        </pre>
      </section>

      <section style={{ background: "#fff", border: "1px solid #ddd", padding: 20, marginBottom: 20, borderRadius: 8 }}>
        <h2 style={{ color: "#0a5275" }}>🔹 6. API Routes</h2>
        <pre style={{ background: "#f0f0f0", padding: 15, borderLeft: "4px solid #007acc", overflowX: "auto" }}>
          <code>
{`GET: http://localhost:3000/api/countries
POST: http://localhost:3000/api/countries
GET: http://localhost:3000/api/countries/:id
PUT: http://localhost:3000/api/countries/:id
DELETE: http://localhost:3000/api/countries/:id`}
          </code>
        </pre>
      </section>

      <section style={{ background: "#fff", border: "1px solid #ddd", padding: 20, marginBottom: 20, borderRadius: 8 }}>
        <h2 style={{ color: "#0a5275" }}>🔹 7. Apply CORS Middleware</h2>
        <p>Allow CORS for cross-origin requests:</p>
        <pre style={{ background: "#f0f0f0", padding: 15, borderLeft: "4px solid #007acc", overflowX: "auto" }}>
          <code>
{`const cors = require('cors');
app.use(cors());`}
          </code>
        </pre>
      </section>
    </div>
  );
};

export default NodeApiMongo;
