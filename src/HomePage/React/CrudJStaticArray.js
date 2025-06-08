const CrudJStaticArray = () => {
  return (
    <div style={{ 
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
      maxWidth: 900, 
      margin: "20px auto", 
      padding: 20, 
      backgroundColor: "#f9f9f9", 
      color: "#333", 
      lineHeight: 1.6,
      borderRadius: 8,
      boxShadow: "0 0 10px rgba(0,0,0,0.1)"
    }}>
      <h1>CRUD with Static Array in React for Country (Id, Name, Code)</h1>
      <p>This example shows a complete CRUD operation using a static array of countries with fields <code>Id</code>, <code>Name</code>, and <code>Code</code>.</p>

      <h2>Features</h2>
      <ul>
        <li>Add a country</li>
        <li>Edit a country</li>
        <li>Delete a country</li>
        <li>Display list of countries</li>
      </ul>

      <h2>Full React Component</h2>
      <pre style={{
        backgroundColor: "#272822", 
        color: "#f8f8f2", 
        padding: 15, 
        borderRadius: 5, 
        overflowX: "auto"
      }}>
{`import React, { useState } from "react";

const CountryCrud = () => {
  const [countries, setCountries] = useState([
    { id: 1, name: "India", code: "IN" },
    { id: 2, name: "United States", code: "US" },
  ]);

  const [formData, setFormData] = useState({ id: "", name: "", code: "" });
  const [isEditMode, setIsEditMode] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!formData.name || !formData.code) return;
    const newCountry = {
      id: countries.length ? Math.max(...countries.map(c => c.id)) + 1 : 1,
      name: formData.name,
      code: formData.code,
    };
    setCountries([...countries, newCountry]);
    setFormData({ id: "", name: "", code: "" });
  };

  const handleEdit = (country) => {
    setFormData(country);
    setIsEditMode(true);
  };

  const handleUpdate = () => {
    setCountries(countries.map(c => c.id === formData.id ? formData : c));
    setFormData({ id: "", name: "", code: "" });
    setIsEditMode(false);
  };

  const handleDelete = (id) => {
    setCountries(countries.filter(c => c.id !== id));
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Country CRUD (Static Array)</h2>
      <input
        type="text"
        name="name"
        placeholder="Country Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="code"
        placeholder="Country Code"
        value={formData.code}
        onChange={handleChange}
      />
      {isEditMode ? (
        <button onClick={handleUpdate}>Update</button>
      ) : (
        <button onClick={handleAdd}>Add</button>
      )}

      <table border="1" cellPadding="8" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country.id}>
              <td>{country.id}</td>
              <td>{country.name}</td>
              <td>{country.code}</td>
              <td>
                <button onClick={() => handleEdit(country)}>Edit</button>
                <button onClick={() => handleDelete(country.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {countries.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No countries available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CountryCrud;
`}
      </pre>
    </div>
  );
};

export default CrudJStaticArray