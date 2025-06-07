import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const Technology = () => {
  const [technologies, setTechnologies] = useState([]);
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false); // new state for view mode

  // Fetch all countries on component mount
  useEffect(() => {
    GetAlltechnology();
  }, []);

  const GetAlltechnology = () => {
    axios
      .get(process.env.REACT_APP_BASE_URL + 'Technology/GetAlltechnology')
      .then((res) => {
        setTechnologies(res.data);
      })
      .catch((err) => {
        console.error("Error fetching technologies:", err);
      });
  };

  const addOrUpdateTechnology = (e) => {
    e.preventDefault();

    const url = isEditing
      ? process.env.REACT_APP_BASE_URL + `Technology/Updatetechnology/${id}`
      : process.env.REACT_APP_BASE_URL + "Technology/Addtechnology";
      

    const method = isEditing ? axios.put : axios.post;

    method(url, { id, name })
      .then(() => {
        GetAlltechnology();
        setShowModal(false);
        setName("");
        setId(0);
        setIsEditing(false);
        setIsViewing(false);
      })
      .catch((err) => {
        console.error("Error saving country:", err);
      });
  };

  const deleteTechnology = (technoloyId) => {
    if (window.confirm("Are you sure you want to delete this technology?")) {
      axios
        .delete(process.env.REACT_APP_BASE_URL + `Technology/DeleteTechnology/${technoloyId}`)
        .then(() => {
           GetAlltechnology();
        })
        .catch((err) => {
          console.error("Error deleting technology:", err);
        });
    }
  };

  const viewTechnology = (technology) => {
    setId(technology.id);
    setName(technology.name);
    setIsEditing(false);
    setIsViewing(true);
    setShowModal(true);
  };

  const editTechnology = (technology) => {
    setId(technology.id);
    setName(technology.name);
    setIsEditing(true);
    setIsViewing(false);
    setShowModal(true);
  };

  return (
    <div>
      <h2>Manage Technology</h2>
      <button
        className="add-country-button"
        onClick={() => {
          setShowModal(true);
          setIsEditing(false);
          setIsViewing(false);
          setName("");
          setId(0);
        }}
      >
        + Add Technology
      </button>

      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {technologies.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.name}</td>
              <td className="action-icons">
                <FaEye
                  className="icon view-icon"
                  title="View"
                  onClick={() => viewTechnology(t)}
                />
                <FaEdit
                  className="icon edit-icon"
                  title="Edit"
                  onClick={() => editTechnology(t)}
                />
                <FaTrash
                  className="icon delete-icon"
                  title="Delete"
                  onClick={() => deleteTechnology(t.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Add/Edit/View */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>
              {isViewing
                ? "View Technology"
                : isEditing
                ? "Edit Technology"
                : "Add New Technology"}
            </h2>
            <form onSubmit={addOrUpdateTechnology}>
              <label>Technology Name</label>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="Enter technology name"
                onChange={(e) => setName(e.target.value)}
                readOnly={isViewing}
                required
              />
              <div className="modal-buttons">
                {!isViewing && (
                  <button type="submit" className="submit-button">
                    {isEditing ? "Update Technology" : "Add Technology"}
                  </button>
                )}
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setShowModal(false);
                    setName("");
                    setId(0);
                    setIsEditing(false);
                    setIsViewing(false);
                  }}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Technology;
