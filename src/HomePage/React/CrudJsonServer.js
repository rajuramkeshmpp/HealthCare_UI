const CrudJsonServer = () => {
  return (
    <div style={{ maxWidth: 900, margin: 'auto', padding: 20, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", lineHeight: 1.6 }}>
      <h1>CRUD Operation in React - Fake JSON Server</h1>

      <h2>What you'll get:</h2>
      <ul>
        <li>React app with a form to add/edit data</li>
        <li>List of items fetched from fake JSON server</li>
        <li>Buttons to update and delete items</li>
      </ul>

      <h2>Step 1: Setup your environment</h2>

      <h3>1.1 Install <code>json-server</code></h3>
      <p>Fake REST API for prototyping and testing.</p>
      <pre><code>npm install -g json-server</code></pre>

      <h3>1.2 Create <code>db.json</code></h3>
      <p>In your project folder, create a file named <code>db.json</code>:</p>
      <pre><code>{`{
  "countries": [
    { "id": 1, "name": "India", "code": "IN" },
    { "id": 2, "name": "USA", "code": "US" }
  ]
}`}</code></pre>

      <h3>1.3 Run JSON Server</h3>
      <p>Run this command in your terminal (in the same folder as <code>db.json</code>):</p>
      <pre><code>json-server --watch db.json --port 3001</code></pre>
      <p>This runs your fake REST API at <code>http://localhost:3001</code>.</p>

      <h2>Step 2: Create React app (if you don't have one)</h2>
      <pre><code>{`npx create-react-app react-crud-jsonserver
cd react-crud-jsonserver
npm start`}</code></pre>

      <h2>Step 3: Setup React to do CRUD operations</h2>

      <h3>3.1 Install Axios for HTTP requests</h3>
      <pre><code>npm install axios</code></pre>

      <h2>Step 4: Code the CRUD operations in React</h2>
      <p>Replace your <code>src/App.js</code> with this:</p>

      <pre><code>{`import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/countries';

function App() {
  const [countries, setCountries] = useState([]);
  const [form, setForm] = useState({ id: null, name: '', code: '' });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(API_URL);
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.code) {
      alert('Please fill all fields');
      return;
    }

    try {
      if (editing) {
        await axios.put(\`\${API_URL}/\${form.id}\`, form);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ id: null, name: '', code: '' });
      setEditing(false);
      fetchCountries();
    } catch (error) {
      console.error('Error saving country:', error);
    }
  };

  const handleEdit = (country) => {
    setForm(country);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this country?')) {
      try {
        await axios.delete(\`\${API_URL}/\${id}\`);
        fetchCountries();
      } catch (error) {
        console.error('Error deleting country:', error);
      }
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Country CRUD with JSON Server</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          name="name"
          placeholder="Country Name"
          value={form.name}
          onChange={handleInputChange}
          style={{ marginRight: 10 }}
        />
        <input
          type="text"
          name="code"
          placeholder="Country Code"
          value={form.code}
          onChange={handleInputChange}
          style={{ marginRight: 10, width: 80 }}
        />
        <button type="submit">{editing ? 'Update' : 'Add'}</button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              setEditing(false);
              setForm({ id: null, name: '', code: '' });
            }}
            style={{ marginLeft: 10 }}
          >
            Cancel
          </button>
        )}
      </form>

      <table border="1" cellPadding="8" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {countries.length > 0 ? (
            countries.map((country) => (
              <tr key={country.id}>
                <td>{country.id}</td>
                <td>{country.name}</td>
                <td>{country.code}</td>
                <td>
                  <button onClick={() => handleEdit(country)}>Edit</button>{' '}
                  <button onClick={() => handleDelete(country.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" align="center">
                No countries found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
`}</code></pre>

      <h2>Step 5: Run your React app</h2>
      <p>Make sure:</p>
      <ul>
        <li>JSON server is running on port 3001 (<code>json-server --watch db.json --port 3001</code>)</li>
        <li>React app is running (<code>npm start</code>)</li>
      </ul>
      <p>Visit <code>http://localhost:3000</code> in your browser, and you should be able to:</p>
      <ul>
        <li>See the list of countries fetched from fake server</li>
        <li>Add new country</li>
        <li>Edit existing country</li>
        <li>Delete a country</li>
      </ul>

      <h2>Recap:</h2>
      <ul>
        <li><code>json-server</code> simulates REST API backend</li>
        <li>React + Axios for frontend CRUD</li>
        <li>Axios calls:
          <ul>
            <li><code>GET /countries</code> → Read all</li>
            <li><code>POST /countries</code> → Create</li>
            <li><code>PUT /countries/:id</code> → Update</li>
            <li><code>DELETE /countries/:id</code> → Delete</li>
          </ul>
        </li>
      </ul>

      <p>If you want, I can help you with any part of the code or explain more! Would you like me to generate this as a GitHub repo or CodeSandbox?</p>
    </div>
  );
};

export default CrudJsonServer