import React, { useState } from "react";
import "../../styles/AdminStyles.css";

const UploadSyllabus = () => {
  const [syllabus, setSyllabus] = useState([]);
  const [newModule, setNewModule] = useState({ name: "", content: "" });
  const [error, setError] = useState("");

  // Handle syllabus file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`File "${file.name}" uploaded successfully!`);
      // In real scenario, you would process the file data here
    }
  };

  // Handle manual module addition
  const addModule = () => {
    if (!newModule.name || !newModule.content) {
      setError("Module name and content are required!");
      return;
    }
    setSyllabus([...syllabus, { id: Date.now(), ...newModule }]);
    setNewModule({ name: "", content: "" });
    setError("");
  };

  // Handle deleting a module
  const deleteModule = (id) => {
    setSyllabus(syllabus.filter(module => module.id !== id));
  };

  return (
    <div>
      <h2>Upload Syllabus</h2>
      <p>Admins can upload syllabus details via Excel or manually enter module-wise content.</p>

      {/* File Upload */}
      <h3>Upload via Excel</h3>
      <input type="file" accept=".xlsx, .csv" onChange={handleFileUpload} />
      <p>(Supported formats: .xlsx, .csv)</p>

      {/* Manual Entry */}
      <h3>Manual Syllabus Entry</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Module Name"
        value={newModule.name}
        onChange={(e) => setNewModule({ ...newModule, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Module Content"
        value={newModule.content}
        onChange={(e) => setNewModule({ ...newModule, content: e.target.value })}
      />
      <button onClick={addModule}>Add Module</button>

      {/* Display Uploaded Syllabus */}
      <h3>Uploaded Modules</h3>
      <ul>
        {syllabus.map(module => (
          <li key={module.id}>
            <strong>{module.name}:</strong> {module.content}
            <button onClick={() => deleteModule(module.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadSyllabus;
