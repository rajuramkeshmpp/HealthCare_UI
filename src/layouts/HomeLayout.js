import React, { useState } from 'react';
import '../App.css';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';

const HomeLayout = () => {
  const [technologies] = useState([
    { Id: 1, Name: 'Dotnet' },
    { Id: 2, Name: 'NodeJs' },
    { Id: 3, Name: 'ReactJs' },
    { Id: 4, Name: 'NextJs' },
    { Id: 5, Name: 'Database' },
    { Id: 6, Name: 'DevOps' },
    { Id: 7, Name: 'Python' },
    { Id: 8, Name: 'Java' },
    { Id: 9, Name: 'Installation' },
    { Id: 10, Name: 'Migration' },
  ]);

  const [homepagesidebar] = useState([
    { Id: 1, Name: '.Net Core Api Sql', Path: 'netcoreapi', TechnologyId: 1 },
    { Id: 2, Name: '.Net Core Api PostgreSql', Path: 'netcoreapipostgre', TechnologyId: 1 },
    { Id: 3, Name: '.Net Core Api Monodb', Path: 'netcoreapimongo', TechnologyId: 1 },
    { Id: 4, Name: 'Dot Net Q/A', Path: 'dotnetqa', TechnologyId: 1 },
    { Id: 5, Name: 'API with MongoDB', Path: 'nodeapimongo', TechnologyId: 2 },
    { Id: 6, Name: 'API with SQL Server', Path: 'nodeapisql', TechnologyId: 2 },
    { Id: 7, Name: 'API with Postgresql', Path: 'nodeapipostgre', TechnologyId: 2 },
    { Id: 8, Name: 'Node Js Q/A', Path: 'nodeqa', TechnologyId: 2 },
    { Id: 9, Name: 'CRUD-Static Array', Path: 'crudstaticarray', TechnologyId: 3 },
    { Id: 10, Name: 'CRUD-JSON Server', Path: 'crudjsonserver', TechnologyId: 3 },
    { Id: 11, Name: 'React CRUD with API', Path: 'reactcrudwithapi', TechnologyId: 3 },
    { Id: 12, Name: 'React Js Q/A ', Path: 'reactqa', TechnologyId: 3 },
    { Id: 13, Name: 'VS Code', Path: 'vscode', TechnologyId: 9 },
    { Id: 14, Name: 'Visual Studio', Path: 'visualstudio', TechnologyId: 9 },
    { Id: 15, Name: 'SQL Server', Path: 'sqlserverinstall', TechnologyId: 9 },
    { Id: 16, Name: 'PostgreSql Server', Path: 'postgresqlserverinstall', TechnologyId: 9 },
    { Id: 17, Name: 'MongoDB', Path: 'mongodbinstall', TechnologyId: 9 },
    { Id: 18, Name: 'Node JS', Path: 'nodejs', TechnologyId: 9 },
    { Id: 19, Name: 'SQL Server', Path: 'sqlserverdb', TechnologyId: 5 },
    { Id: 20, Name: 'PostgreSql Server', Path: 'postgresqlserverdb', TechnologyId: 5 },
    { Id: 21, Name: 'MongoDB Server', Path: 'mongodbserver', TechnologyId: 5 },
  ]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="logo" style={{ marginRight: '20px', color: 'white' }}>Shiwansh Solutions</div>
          {technologies.map((s) => (
            <Link
              key={s.Id}
              to={s.Id.toString()}
              style={{ marginRight: '15px', color: 'white', textDecoration: 'none' }}
            >
              {s.Name}
            </Link>
          ))}
        </div>
        <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="username" style={{ display: 'flex', gap: '15px' }}>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
          </span>
        </div>
      </header>

      <div className="dashboard-body">
        <aside className="sidebar">
          <ul>
            {homepagesidebar.map((s) => (
              <li key={s.Id} className="sidebar-item">
                <Link to={s.Path} className="sidebar-link">{s.Name}</Link>
              </li>
            ))}
          </ul>
        </aside>

        <main className="main-content">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default HomeLayout;



// import React, { useEffect, useState } from 'react';
// import '../App.css';
// import { Link, Outlet } from 'react-router-dom';
// import Footer from '../Components/Footer';
// import axios from 'axios';

// const HomeLayout = () => {
//   const [technologies, setTechnologies] = useState([]);
//   const [homepagesidebar, setHomepagesidebar] = useState([]);

//   useEffect(() => {
//     GetAllTechnologies();
//   }, []);

//   const GetAllTechnologies = () => {
//     axios
//       .get(process.env.REACT_APP_BASE_URL + "Technology/GetAlltechnology")
//       .then((res) => setTechnologies(res.data))
//       .catch((err) => console.error("Error fetching technologies:", err));
//   };

//   const getHomePageSideBar = (id) => {
//     axios
//       .get(`${process.env.REACT_APP_BASE_URL}HomePageSidebar/GetAllHomeSidebarByTechId?Id=${id}`)
//       .then((res) => setHomepagesidebar(res.data))
//       .catch((err) => console.error("Sidebar fetch error:", err));
//   };

//   return (
//     <div className="dashboard-container">
//       <header className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <div className="logo" style={{ marginRight: '20px', color: 'white' }}>Shiwansh Solutions</div>
//           {technologies.map((s) => (
//             <Link
//               key={s.id}
//               to={s.id}
//               style={{ marginRight: '15px', color: 'white', textDecoration: 'none' }}
//               onClick={() => getHomePageSideBar(s.id)}
//             >
//               {s.name}
//             </Link>
//           ))}
//         </div>
//         <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//           <span className="username" style={{ display: 'flex', gap: '15px' }}>
//             <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
//             <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
//           </span>
//         </div>
//       </header>

//       <div className="dashboard-body">
//         <aside className="sidebar">
//           <ul>
//             {homepagesidebar.map((s) => (
//               <li key={s.id} className="sidebar-item">
//                 <Link to={s.path} className="sidebar-link">{s.name}</Link>
//               </li>
//             ))}
//           </ul>
//         </aside>

//         <main className="main-content">
//           <Outlet />
//         </main>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default HomeLayout;

