import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Register from './Components/Register';
import Login from './Components/Login';
import AssignRole from './Admin/AssignRole';
import HomeLayout from './layouts/HomeLayout';
import DashboardLayout from './layouts/DashboardLayout';
import TaskManager from './Admin/TaskManager';
import Role from './Admin/Role';
import Country from './Admin/Country';
import State from './Admin/State';
import District from './Admin/District';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Layout */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />         
          <Route path="/register" element={<Register />} />          
        </Route>

        {/* Common Layout */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route path="assignrole" element={<AssignRole />} />
          <Route path="taskmanager" element={<TaskManager/>} />
          <Route path="role" element={<Role/>} />
          <Route path="country" element={<Country/>} />
          <Route path="state" element={<State/>} />
          <Route path="district" element={<District/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
