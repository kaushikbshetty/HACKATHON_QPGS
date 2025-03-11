import React, { useState } from "react";
import "../../styles/AdminStyles.css";

const SystemSettings = () => {
  // Role-based access settings
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", permissions: "Full Access" },
    { id: 2, name: "Teacher", permissions: "Manage Questions" },
    { id: 3, name: "Exam Staff", permissions: "View Reports" },
  ]);

  // Security settings state
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    dataEncryption: true,
  });

  // System reports data
  const [reports, setReports] = useState([
    { id: 1, name: "User Activity Report", status: "Available" },
    { id: 2, name: "Question Paper Logs", status: "Available" },
  ]);

  // Toggle security settings
  const toggleSecurity = (setting) => {
    setSecuritySettings({ ...securitySettings, [setting]: !securitySettings[setting] });
  };

  // Function to add a new role
  const addRole = () => {
    const roleName = prompt("Enter new role name:");
    if (roleName) {
      setRoles([...roles, { id: Date.now(), name: roleName, permissions: "Custom Access" }]);
    }
  };

  // Function to delete a role
  const deleteRole = (id) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  // Export report function (simulated)
  const exportReport = (reportName) => {
    alert(`Exporting report: ${reportName}`);
    // Implement actual file export logic here
  };

  return (
    <div>
      <h2>System Settings</h2>

      {/* Manage Role-Based Access */}
      <h3>Manage Roles & Access</h3>
      <button onClick={addRole}>Add Role</button>
      <table border="1">
        <thead>
          <tr>
            <th>Role</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>{role.permissions}</td>
              <td>
                <button onClick={() => deleteRole(role.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Security Settings */}
      <h3>Security Settings</h3>
      <label>
        <input
          type="checkbox"
          checked={securitySettings.twoFactorAuth}
          onChange={() => toggleSecurity("twoFactorAuth")}
        />
        Enable Two-Factor Authentication
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={securitySettings.dataEncryption}
          onChange={() => toggleSecurity("dataEncryption")}
        />
        Enable Data Encryption
      </label>

      {/* System Reports */}
      <h3>System Reports</h3>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            {report.name} - <button onClick={() => exportReport(report.name)}>Export</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SystemSettings;
