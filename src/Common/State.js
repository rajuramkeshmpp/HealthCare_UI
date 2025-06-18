import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const State = () => {
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [countryId, setCountryId] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [viewState, setViewState] = useState(null);

  useEffect(() => {
    GetAllState();
    GetAllCountry();
  }, []);

  const GetAllState = () => {
    axios
      .get(process.env.REACT_APP_BASE_URL + "State/GetAllState")
      .then((res) => setStates(res.data))
      .catch((err) => console.error("Error fetching states:", err));
  };

  const GetAllCountry = () => {
    axios
      .get(process.env.REACT_APP_BASE_URL + "Country/GetAllCountry")
      .then((res) => setCountries(res.data))
      .catch((err) => console.error("Error fetching countries:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const stateData = {
      name,
      countryId: Number(countryId),
    };

    if (editingId) {
      // Include ID for update
      stateData.id = editingId;

      axios
        .put(`${process.env.REACT_APP_BASE_URL}State/UpdateState/${editingId}`, stateData)
        .then((res) => {
          console.log("State updated:", res.data);
          resetForm();
          GetAllState();
        })
        .catch((err) => {
          console.error("Error updating state:", err);
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}State/AddState`, stateData)
        .then((res) => {
          console.log("State added:", res.data);
          resetForm();
          GetAllState();
        })
        .catch((err) => {
          console.error("Error adding state:", err);
        });
    }
  };

  const resetForm = () => {
    setName("");
    setCountryId("");
    setEditingId(null);
    setShowModal(false);
    setViewState(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this state?")) {
      axios
        .delete(`${process.env.REACT_APP_BASE_URL}State/DeleteState/${id}`)
        .then(() => GetAllState())
        .catch((err) => console.error("Error deleting state:", err));
    }
  };

  const handleEdit = (state) => {
    setName(state.name);
    const matchedCountry = countries.find((c) => c.name === state.countryName);
    setCountryId(matchedCountry ? matchedCountry.id : "");
    setEditingId(state.id);
    setShowModal(true);
  };

  const handleView = (state) => {
    setViewState(state);
    setShowModal(true);
  };

  const isFormValid = () => {
    return name.trim() !== "" && countryId !== "";
  };

  return (
    <div>
      <button className="add-country-button" onClick={() => { resetForm(); setShowModal(true); }}>
        + Add State
      </button>

      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Country Name</th>
            <th>State Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {states.map((state) => (
            <tr key={state.id}>
              <td>{state.id}</td>
              <td>{state.countryName}</td>
              <td>{state.name}</td>
              <td>
                <FaEdit className="icon edit-icon" onClick={() => handleEdit(state)} />
                <FaEye className="icon view-icon" onClick={() => handleView(state)} />
                <FaTrash className="icon delete-icon" onClick={() => handleDelete(state.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            {viewState ? (
              <>
                <h2>View State</h2>
                <p><strong>State Name:</strong> {viewState.name}</p>
                <p><strong>Country Name:</strong> {viewState.countryName}</p>
                <div className="modal-buttons">
                  <button onClick={resetForm}>Close</button>
                </div>
              </>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2>{editingId ? "Edit State" : "Add State"}</h2>

                <label>Select Country</label>
                <select
                  value={countryId}
                  onChange={(e) => setCountryId(e.target.value)}
                  required
                >
                  <option value="">-- Select Country --</option>
                  {countries.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <label>State Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter state name"
                  required
                />

                <div className="modal-buttons">
                  <button type="submit" disabled={!isFormValid()}>
                    {editingId ? "Update State" : "Add State"}
                  </button>
                  <button type="button" onClick={resetForm}>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default State;
