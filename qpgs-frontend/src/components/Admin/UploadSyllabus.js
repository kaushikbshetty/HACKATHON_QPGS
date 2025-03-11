import React, { useState, useEffect } from "react";

const UploadSyllabus = () => {
  const [subjectName, setSubjectName] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [syllabusList, setSyllabusList] = useState([]);

  // Fetch syllabus list
  const fetchSyllabus = async () => {
    try {
      const response = await fetch("http://localhost:5000/syllabus");
      const data = await response.json();
      setSyllabusList(data);
    } catch (error) {
      console.error("Error fetching syllabus:", error);
    }
  };

  useEffect(() => {
    fetchSyllabus(); // Load syllabus files when component mounts
  }, []);

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle form submission
  const handleUpload = async () => {
    if (!subjectName || !file) {
      setMessage("Please enter subject name and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("subjectName", subjectName);
    formData.append("syllabusFile", file);

    try {
      const response = await fetch("http://localhost:5000/upload-syllabus", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Syllabus uploaded successfully!");
        alert("Syllabus uploaded successfully!");
        setSubjectName("");
        setFile(null);
        fetchSyllabus(); // Refresh list after upload
      } else {
        setMessage(data.error || "Error uploading syllabus.");
      }
    } catch (error) {
      setMessage("Server error. Please try again.");
      console.error("Upload error:", error);
    }
  };

  // Handle syllabus deletion
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this syllabus?")) return;

    try {
      const response = await fetch(`http://localhost:5000/syllabus/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (response.ok) {
        alert("Syllabus deleted successfully!");
        fetchSyllabus(); // Refresh list after deletion
      } else {
        setMessage(data.error || "Error deleting syllabus.");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div>
      <h2>Upload Syllabus</h2>
      {message && <p style={{ color: message.includes("success") ? "green" : "red" }}>{message}</p>}

      <div>
        <label>Subject Name:</label>
        <input
          type="text"
          placeholder="Enter Subject Name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />
      </div>

      <div>
        <label>Choose Syllabus File:</label>
        <input type="file" accept=".pdf, .docx, .xlsx" onChange={handleFileChange} />
      </div>

      <button onClick={handleUpload}>Upload Syllabus</button>

      <h3>Uploaded Syllabus</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Subject Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {syllabusList.map((syllabus) => (
            <tr key={syllabus._id}>
              <td>{syllabus.subjectName}</td>
              <td>
                <a href={`http://localhost:5000/${syllabus.filePath}`} target="_blank" rel="noopener noreferrer">
                  <button>View</button>
                </a>
                <button onClick={() => handleDelete(syllabus._id)} style={{ marginLeft: "10px", color: "red" }}>
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UploadSyllabus;
