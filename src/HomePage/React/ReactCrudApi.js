const ReactCrudApi = () => {
  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", lineHeight: 1.6 }}>
      <h1>CRUD Operation in React with API for Country</h1>

      <h2>Features:</h2>
      <ul>
        <li>List all countries (Read)</li>
        <li>Add a new country (Create)</li>
        <li>Edit a country (Update)</li>
        <li>Delete a country (Delete)</li>
      </ul>

      <h2>Assumptions:</h2>
      <p>Your API endpoints should be like this (replace <code>API_URL</code> with your backend URL):</p>
      <ul>
        <li><code>GET /countries</code> - Get all countries</li>
        <li><code>POST /countries</code> - Add new country</li>
        <li><code>PUT /countries/:id</code> - Update country by id</li>
        <li><code>DELETE /countries/:id</code> - Delete country by id</li>
      </ul>

      <h2>React CRUD Component Code:</h2>
      <pre style={{ backgroundColor: "#f4f4f4", padding: 15, borderRadius: 5, overflowX: "auto" }}>
        <code>{`import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001/countries"; // Change to your API

const CountryCrud = () => {
  const [countries, setCountries] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", code: "" });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(API_URL);
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.code) {
      alert("Please fill in both Name and Code");
      return;
    }

    try {
      if (editing) {
        await axios.put(\`\${API_URL}/\${form.id}\`, form);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ id: null, name: "", code: "" });
      setEditing(false);
      fetchCountries();
    } catch (error) {
      console.error("Error saving country:", error);
    }
  };

  const handleEdit = (country) => {
    setForm(country);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this country?")) {
      try {
        await axios.delete(\`\${API_URL}/\${id}\`);
        fetchCountries();
      } catch (error) {
        console.error("Error deleting country:", error);
      }
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
      <h2>Country CRUD</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          name="name"
          placeholder="Country Name"
          value={form.name}
          onChange={handleChange}
          style={{ marginRight: 10 }}
        />
        <input
          type="text"
          name="code"
          placeholder="Country Code"
          value={form.code}
          onChange={handleChange}
          style={{ marginRight: 10, width: 100 }}
        />
        <button type="submit">{editing ? "Update" : "Add"}</button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              setEditing(false);
              setForm({ id: null, name: "", code: "" });
            }}
            style={{ marginLeft: 10 }}
          >
            Cancel
          </button>
        )}
      </form>

      <table
        border="1"
        cellPadding="8"
        cellSpacing="0"
        width="100%"
        style={{ borderCollapse: "collapse" }}
      >
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
                  <button onClick={() => handleEdit(country)}>Edit</button>{" "}
                  <button onClick={() => handleDelete(country.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No countries found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CountryCrud;
`}</code>
      </pre>

      <h2>Usage:</h2>
      <ul>
        <li>Make sure your API is running and accessible at the <code>API_URL</code>.</li>
        <li>Import and render the <code>CountryCrud</code> component in your React app.</li>
      </ul>

      <h2>Backend Example:</h2>
      <p>You can use <code>json-server</code> with a <code>db.json</code> file like this:</p>
      <pre style={{ backgroundColor: "#f4f4f4", padding: 15, borderRadius: 5, overflowX: "auto" }}>
        <code>{`{
  "countries": [
    { "id": 1, "name": "India", "code": "IN" },
    { "id": 2, "name": "USA", "code": "US" }
  ]
}`}</code>
      </pre>

      <p>Run it with:</p>
      <pre>
        <code>json-server --watch db.json --port 3001</code>
      </pre>

      <p>This will run a fake REST API on <code>http://localhost:3001</code>.</p>
    </div>
  );
};

export default ReactCrudApi