import React, { useEffect, useState } from 'react';
import '../App.css';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';
import axios from 'axios';

const HomeLayout = () => {
  const [technologies, setTechnologies] = useState([]);
  const [homepagesidebar, setHomepagesidebar] = useState([]);

  useEffect(() => {
    GetAllTechnologies();
  }, []);

  const GetAllTechnologies = () => {
    axios
      .get(process.env.REACT_APP_BASE_URL + "Technology/GetAlltechnology")
      .then((res) => setTechnologies(res.data))
      .catch((err) => console.error("Error fetching technologies:", err));
  };

  const getHomePageSideBar = (id) => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}HomePageSidebar/GetAllHomeSidebarByTechId?Id=${id}`)
      .then((res) => setHomepagesidebar(res.data))
      .catch((err) => console.error("Sidebar fetch error:", err));
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="logo" style={{ marginRight: '20px', color: 'white' }}>Shiwansh Solutions</div>
          {technologies.map((s) => (
            <Link
              key={s.id}
              to={s.id}
              style={{ marginRight: '15px', color: 'white', textDecoration: 'none' }}
              onClick={() => getHomePageSideBar(s.id)}
            >
              {s.name}
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
              <li key={s.id} className="sidebar-item">
                <Link to={s.path} className="sidebar-link">{s.name}</Link>
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
