import React from 'react';
import '../App.css';
import { FaSignOutAlt, FaCog, FaUserCircle } from 'react-icons/fa';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import SideBar from "../Components/SideBar";
import { Link, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="dashboard-container">
      <Header/>
      <div className="dashboard-body">
       <SideBar />
        <main className="main-content">
          <h2></h2>
          <Outlet />
        </main>
      </div>
    <Footer />
    </div>
  );
};

export default DashboardLayout;
