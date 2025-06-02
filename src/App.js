import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Register from './Components/Register';
import Login from './Components/Login';
import AssignRole from './SuperAdmin/AssignRole';
import HomeLayout from './layouts/HomeLayout';
import DashboardLayout from './layouts/DashboardLayout';
import TaskManager from './SuperAdmin/TaskManager';
import Role from './SuperAdmin/Role';
import Country from './Common/Country';
import State from './Common/State';
import District from './Common/District';
import Doctors from './HealthCare/Admin/Doctors';
import Nurses from './HealthCare/Admin/Nurses';
import Sidebar from './SuperAdmin/Sidebar';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />         
          <Route path="/register" element={<Register />} />          
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="assignrole" element={<AssignRole />} />
          <Route path="taskmanager" element={<TaskManager/>} />
          <Route path="role" element={<Role/>} />
          <Route path="country" element={<Country/>} />
          <Route path="state" element={<State/>} />
          <Route path="district" element={<District/>} />
          <Route path="doctor" element={<Doctors />} />
          <Route path="nurses" element={<Nurses />} />
          <Route path="sidebar" element={<Sidebar />} />          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
