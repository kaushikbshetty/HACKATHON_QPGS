import React, { useState } from "react";
import "../../styles/AdminStyles.css";


const ManageUsers = () => {
  // Sample user data
  const [users, setUsers] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Teacher" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Admin" },
  ]);

  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Teacher" });
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState("");

  // Function to handle input changes
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Function to add a new user
  const addUser = () => {
    if (!newUser.name || !newUser.email) {
      setError("All fields are required!");
      return;
    }
    setUsers([...users, { id: Date.now(), ...newUser }]);
    setNewUser({ name: "", email: "", role: "Teacher" });
    setError("");
  };

  // Function to edit a user
  const updateUser = () => {
    if (!editingUser.name || !editingUser.email) {
      setError("All fields are required!");
      return;
    }
    setUsers(users.map(user => user.id === editingUser.id ? editingUser : user));
    setEditingUser(null);
    setError("");
  };

  // Function to delete a user
  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div>
      <h2>Manage Users</h2>

      {/* Add User Form */}
      <div>
        <h3>{editingUser ? "Edit User" : "Add New User"}</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input type="text" name="name" placeholder="Name" value={editingUser ? editingUser.name : newUser.name} onChange={(e) => editingUser ? setEditingUser({ ...editingUser, name: e.target.value }) : handleChange(e)} />
        <input type="email" name="email" placeholder="Email" value={editingUser ? editingUser.email : newUser.email} onChange={(e) => editingUser ? setEditingUser({ ...editingUser, email: e.target.value }) : handleChange(e)} />
        <select name="role" value={editingUser ? editingUser.role : newUser.role} onChange={(e) => editingUser ? setEditingUser({ ...editingUser, role: e.target.value }) : handleChange(e)}>
          <option value="Teacher">Teacher</option>
          <option value="Admin">Admin</option>
          <option value="Exam Staff">Exam Staff</option>
        </select>
        <button onClick={editingUser ? updateUser : addUser}>{editingUser ? "Update User" : "Add User"}</button>
      </div>

      {/* Users List */}
      <h3>Users List</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => setEditingUser(user)}>Edit</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
