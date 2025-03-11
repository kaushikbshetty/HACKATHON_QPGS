import React from "react";
import { Link } from "react-router-dom";
import "../../styles/AdminStyles.css";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-blue-800 text-white p-5">
      <h2 className="text-xl font-bold mb-5">Admin Dashboard</h2>
      <ul>
        <li className="mb-4">
          <Link to="/admin/users" className="hover:text-gray-300">Manage Users</Link>
        </li>
        <li className="mb-4">
          <Link to="/admin/syllabus" className="hover:text-gray-300">Upload Syllabus</Link>
        </li>
        <li className="mb-4">
          <Link to="/admin/questions" className="hover:text-gray-300">Manage Questions</Link>
        </li>
        <li className="mb-4">
          <Link to="/admin/settings" className="hover:text-gray-300">System Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
