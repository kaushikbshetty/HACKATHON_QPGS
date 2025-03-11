import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../../styles/Dashboard.css"; // Import the CSS file

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li><Link to="/admin/users">Add Users</Link></li>
          <li><Link to="/admin/syllabus">Upload Syllabus</Link></li>
          <li><Link to="/admin/questions">Manage Questions</Link></li>
          <li><Link to="/admin/generate-paper">Generate Question Paper</Link></li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        <Outlet /> {/* This will load different components dynamically */}
      </div>
    </div>
  );
};

export default AdminDashboard;
