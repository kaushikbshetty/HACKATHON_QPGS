import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ManageUsers from "./components/Admin/ManageUsers";
import UploadSyllabus from "./components/Admin/UploadSyllabus";
import ManageQuestions from "./components/Admin/ManageQuestions";
import GenerateQuestionPaper from "./components/Admin/GenerateQuestionPaper";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="users" element={<ManageUsers />} />
          <Route path="syllabus" element={<UploadSyllabus />} />
          <Route path="questions" element={<ManageQuestions />} />
          <Route path="generate-paper" element={<GenerateQuestionPaper />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
