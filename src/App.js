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
import Homesidebar from './HomePage/Admin/Homesidebar';
import Technology from './HomePage/Admin/Technology';
import NetCoreApiPostgre from './HomePage/Dotnet/NetCoreApiPostgre';
import NetCoreApiSql from './HomePage/Dotnet/NetCoreApiSql';
import NetCoreApiMongo from './HomePage/Dotnet/NetCoreApiMongo';
import DotNetQA from './HomePage/Dotnet/DotNetQA';
import MongoServerDb from './HomePage/Database/MongoServerDb';
import PostgreServerDb from './HomePage/Database/PostgreServerDb';
import SqlServerDb from './HomePage/Database/SqlServerDb';
import MongoServerInstall from './HomePage/Installation/MongoServerInstall';
import NodeJsInstall from './HomePage/Installation/NodeJsInstall';
import PostgreServerInstall from './HomePage/Installation/PostgreServerInstall';
import SqlServerInstall from './HomePage/Installation/SqlServerInstall';
import VsCodeInstall from './HomePage/Installation/VsCodeInstall';
import VisualStudioInstall from './HomePage/Installation/VisualStudioInstall';
import NodeApiMongo from './HomePage/Node/NodeApiMongo';
import NodeApiPostgre from './HomePage/Node/NodeApiPostgre';
import NodeApiSql from './HomePage/Node/NodeApiSql';
import NodeJsQA from './HomePage/Node/NodeJsQA';
import CrudJsonServer from './HomePage/React/CrudJsonServer';
import CrudJStaticArray from './HomePage/React/CrudJStaticArray';
import ReactCrudApi from './HomePage/React/ReactCrudApi';
import ReactJsQA from './HomePage/React/ReactJsQA';
import Company from './SuperAdmin/Company';
import PostNewJob from './JobPortal/Employer/PostNewJob';
import MyAccount from './JobPortal/Employer/MyAccount';

function App() {
  return (
    <Router>
      <Routes>
        {/* HOME LAYOUT */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Dynamically loaded sidebar routes */}
          <Route path="/netcoreapi" element={<NetCoreApiSql />} />
          <Route path="/netcoreapipostgre" element={<NetCoreApiPostgre/>} />
          <Route path="/netcoreapimongo" element={<NetCoreApiMongo/>} />
           <Route path="/dotnetqa" element={<DotNetQA/>} />
          
          <Route path="/mongodbserver" element={<MongoServerDb />} />
          <Route path="/postgresqlserverdb" element={<PostgreServerDb />} />
          <Route path="/sqlserverdb" element={<SqlServerDb />} />
          <Route path="/mongodbinstall" element={<MongoServerInstall />} />
          <Route path="/nodejs" element={<NodeJsInstall />} />
          <Route path="/postgresqlserverinstall" element={<PostgreServerInstall />} />
          <Route path="/sqlserverinstall" element={<SqlServerInstall />} />
          <Route path="/vscode" element={<VsCodeInstall />} />
          <Route path="/visualstudio" element={<VisualStudioInstall />} />
          <Route path="/nodeapimongo" element={<NodeApiMongo />} />
           <Route path="/nodeapipostgre" element={<NodeApiPostgre />} />
          <Route path="/nodeapisql" element={<NodeApiSql />} />
          <Route path="/nodeqa" element={<NodeJsQA />} />
          <Route path="/crudjsonserver" element={<CrudJsonServer />} />
          <Route path="/crudstaticarray" element={<CrudJStaticArray />} />
          <Route path="/reactcrudwithapi" element={<ReactCrudApi />} />
          <Route path="/reactqa" element={<ReactJsQA />} />
        </Route>

        {/* DASHBOARD LAYOUT */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="assignrole" element={<AssignRole />} />
          <Route path="taskmanager" element={<TaskManager />} />
          <Route path="role" element={<Role />} />
          <Route path="company" element={<Company />} />
          <Route path="country" element={<Country />} />
          <Route path="state" element={<State />} />
          <Route path="district" element={<District />} />
          <Route path="doctor" element={<Doctors />} />
          <Route path="nurses" element={<Nurses />} />
          <Route path="sidebar" element={<Sidebar />} />
          <Route path="homesidebar" element={<Homesidebar />} />
          <Route path="technology" element={<Technology />} />
          <Route path="postnewjob" element={<PostNewJob />} />
          <Route path="myaccountemployer" element={<MyAccount />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
