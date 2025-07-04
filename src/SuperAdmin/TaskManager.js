import axios from 'axios';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import '../App.css';

const TaskManager = () => {
  const initialTaskState = {
    taskName: '',
    firstName: 'string',
    statusName: 'string',
    taskDescription: '',
    userId: '',
    statusId: ''
  };

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState(initialTaskState);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get(process.env.REACT_APP_BASE_URL + 'TaskManger/GetAllTaskList')
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Error fetching task list:", err));
  };

  useEffect(() => {
    axios.get(process.env.REACT_APP_BASE_URL + 'Status/GetAllStatus')
      .then((res) => setStatuses(res.data))
      .catch((err) => console.error("Error fetching status list:", err));
  }, []);

  useEffect(() => {
    axios.get(process.env.REACT_APP_BASE_URL + 'User/GetAllUserForTaskManager')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching user list:", err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (editingTaskId) {
      axios.put(process.env.REACT_APP_BASE_URL + `TaskManger/UpdateTask/${editingTaskId}`, {
        id: editingTaskId,
        ...newTask
      })
        .then(() => {
          fetchTasks();
          alert('Task updated successfully!');
          resetForm();
        })
        .catch((err) => {
          console.error("Failed to update task", err);
          alert('Failed to update task');
        });
    } else {
      axios.post(process.env.REACT_APP_BASE_URL + 'TaskManger/AddTask', newTask)
        .then(() => {
          fetchTasks();
          alert('Task added successfully!');
          resetForm();
        })
        .catch((err) => {
          console.error("Failed to add task", err);
          alert('Failed to add task');
        });
    }
  };

  const resetForm = () => {
    setShowModal(false);
    setEditingTaskId(null);
    setNewTask(initialTaskState);
  };

  const handleEditClick = (taskId) => {
    setEditingTaskId(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setNewTask({
        taskName: taskToEdit.taskName,
        taskDescription: taskToEdit.taskDescription,
        userId: taskToEdit.userId,
        statusId: taskToEdit.statusId,
        firstName: taskToEdit.firstName || '',
        statusName: taskToEdit.statusName || ''
      });
      setShowModal(true);
    }
  };

  const getuserdata = (uid) => {
    axios.get(process.env.REACT_APP_BASE_URL + `TaskManger/GetAllTaskListByUserId/${uid}`)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Error fetching user-specific tasks:", err));
  };

  const handleDeleteTask = (taskId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      axios.delete(process.env.REACT_APP_BASE_URL + `TaskManger/DeleteTask/${taskId}`)
        .then(() => {
          fetchTasks();
          alert('Task deleted successfully!');
        })
        .catch((err) => {
          console.error("Failed to delete task", err);
          alert('Failed to delete task');
        });
    }
  };

  const filteredTasks = tasks.filter(task => {
    return task.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.statusName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <div className="add-task-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="user-icons-container">
          {users.map((u) => (
            <img
              key={u.id}
              src={`/${u.firstname}.jpg`}
              alt="User Icon"
              className="user-icon"
              style={{ width: '30px', height: '30px', cursor: 'pointer' }}
              onClick={() => getuserdata(u.id)}
            />
          ))}
        </div>

        <button className="add-task-button" onClick={() => setShowModal(true)}>+ Add Task</button>
      </div>

      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Task</th>
            <th>User</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.taskName}</td>
              <td>{task.firstName}</td>
              <td className={`status-cell ${task.statusName?.toLowerCase().replace(/\s/g, "")}`}>{task.statusName}</td>
              <td className="action-icons">
                <FaEye
                  className="icon view-icon"
                  title="View"
                  onClick={() => setSelectedTask(task)}
                />
                <FaEdit
                  className="icon edit-icon"
                  title="Edit"
                  onClick={() => handleEditClick(task.id)}
                />
                <FaTrash
                  className="icon delete-icon"
                  title="Delete"
                  onClick={() => handleDeleteTask(task.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTask && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Task Details</h2>
            <p><strong>Task Name:</strong> {selectedTask.taskName}</p>
            <p><strong>Description:</strong> {selectedTask.taskDescription}</p>
            <p><strong>User:</strong> {selectedTask.firstName}</p>
            <p><strong>Status:</strong> {selectedTask.statusName}</p>
            <div className="modal-buttons">
              <button className="cancel-button" onClick={() => setSelectedTask(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editingTaskId ? 'Edit Task' : 'Add New Task'}</h2>
            <form onSubmit={handleTaskSubmit}>
              <label>Task Name</label>
              <input
                type="text"
                name="taskName"
                value={newTask.taskName}
                onChange={handleInputChange}
                placeholder="Enter task name"
                required
              />

              <label>Task Description</label>
              <input
                type="text"
                name="taskDescription"
                value={newTask.taskDescription}
                onChange={handleInputChange}
                placeholder="Enter description"
                required
              />

              <label>User</label>
              <select
                name="userId"
                value={newTask.userId}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Select User</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.firstname}</option>
                ))}
              </select>

              <label>Status</label>
              <select
                name="statusId"
                value={newTask.statusId}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Select Status</option>
                {statuses.map(status => (
                  <option key={status.id} value={status.id}>{status.statusName}</option>
                ))}
              </select>

              <div className="modal-buttons">
                <button type="submit" className="submit-button">{editingTaskId ? 'Save Changes' : 'Add Task'}</button>
                <button type="button" className="cancel-button" onClick={resetForm}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManager;
