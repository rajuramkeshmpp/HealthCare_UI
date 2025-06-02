import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const Sidebar = () => {
  const [sidebars, setSidebars] = useState([]);
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [path, setPath] = useState("");  
  const [roleId, setRoleId] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [viewSidebar, setViewSidebar] = useState(null); 

  useEffect(() => {
    GetAllSidebar();
    GetAllRole();
  }, []);

  const GetAllSidebar = () => {
    axios
      .get(process.env.REACT_APP_BASE_URL + "Sidebars/GetAllSidebar")
      .then((res) => {
        setSidebars(res.data);
      })
      .catch((err) => {
        console.error("Error fetching sidebar:", err);
      });
  };

  const GetAllRole = () => {
    axios
      .get(process.env.REACT_APP_BASE_URL + "Role/GetAllRole")
      .then((res) => {
        setRoles(res.data);
      })
      .catch((err) => {
        console.error("Error fetching roles:", err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const sidebarData = { name, path, roleId: parseInt(roleId)};

    if (editingId) {
      axios.put(process.env.REACT_APP_BASE_URL + `Sidebars/UpdateSidebar/${editingId}`, sidebarData)
        .then((res) => {
          console.log("Sidebar updated:", res.data);
          resetForm();
          GetAllSidebar();
        })
        .catch((err) => {
          console.error("Error updating state:", err);
        });
    } else {
      axios
        .post(process.env.REACT_APP_BASE_URL + "Sidebars/AddSidebar", sidebarData)
        .then((res) => {
          console.log("Sidebar added:", res.data);
          resetForm();
          GetAllSidebar();
        })
        .catch((err) => {
          console.error("Error adding state:", err);
        });
    }
  };

  const resetForm = () => {
    setName("");
    setPath("");    
    setRoleId("");
    setEditingId(null);
    setShowModal(false);
    setViewSidebar(null);
  };

  const handleDelete = (sidebarId) => {
    if (window.confirm("Are you sure you want to delete this sidebar?")) {
      axios
        .delete(process.env.REACT_APP_BASE_URL + `Sidebars/DeleteSidebar/${sidebarId}`)
        .then(() => {
          console.log("Sidebar deleted successfully.");
          GetAllSidebar();
        })
        .catch((err) => {
          console.error("Error deleting sidebar:", err);
        });
    }
  };

  const handleEdit = (sidebar) => {
    setName(sidebar.name);
    setRoleId(roles.find((r) => r.name === sidebar.roleName)?.id || "");
    setEditingId(sidebar.id);
    setShowModal(true);
  };

  const handleView = (sidebar) => {
    setViewSidebar(sidebar); 
    setShowModal(true); 
  };

  const isFormValid = () => {
    return name.trim() !== "" && roleId !== "";
  };

  return (
    <div>
      <button className="add-country-button" onClick={() => setShowModal(true)}>
        + Add Sidebar
      </button>

      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Path</th>
            <th>Role Id</th>            
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sidebars.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.path}</td>
              <td>{s.roleId}</td>
              <td className="action-icons">
                <FaEdit
                  className="icon edit-icon"
                  title="Edit"
                  onClick={() => handleEdit(s)}
                />
                <FaEye
                  className="icon view-icon"
                  title="View"
                  onClick={() => handleView(s)}
                />
                <FaTrash
                  className="icon delete-icon"
                  title="Delete"
                  onClick={() => handleDelete(s.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (viewSidebar ? (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>View Sidebar</h2>
            <p><strong>Sidebar Name:</strong> {viewSidebar.name}</p>
            <p><strong>Sidebar Path:</strong> {viewSidebar.path}</p>
            <p><strong>Role Name:</strong> {viewSidebar.roleName}</p>
            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editingId ? "Edit Sidebar" : "Add New Sidebar"}</h2>
            <form onSubmit={handleSubmit}>
            <label>Select Role</label>
              <select
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
                required
              >
                <option value="" disabled>
                  -- Select Role --
                </option>
                {roles.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <label>Sidebar Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter sidebar name"
                required
              />
              <label>Sidebar Path</label>
              <input
                type="text"
                value={path}
                onChange={(e) => setPath(e.target.value)}
                placeholder="Enter sidebar path"
                required
              />              
              <div className="modal-buttons">
                <button type="submit" disabled={!isFormValid()}>
                  {editingId ? "Update Sidebar" : "Add Sidebar"}
                </button>
                <button type="button" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
