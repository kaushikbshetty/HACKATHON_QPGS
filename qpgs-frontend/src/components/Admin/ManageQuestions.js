import React, { useState, useEffect } from "react";
import "../../styles/AdminStyles.css";

const ManageQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    subject: "",
    module: "",
    questionText: "",
    type: "2-mark",
    co: "",
    po: "",
    bloomLevel: "",
  });
  const [error, setError] = useState("");

  // Fetch questions from MongoDB
  useEffect(() => {
    fetch("http://localhost:5000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value });
  };

  // Add new question to MongoDB
  const addQuestion = async () => {
    if (!newQuestion.subject || !newQuestion.module || !newQuestion.questionText) {
      setError("All fields are required!");
      return;
    }
    
    try {
      const res = await fetch("http://localhost:5000/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQuestion),
      });

      const data = await res.json();
      if (res.ok) {
        setQuestions([...questions, data]); // Update UI with new question
        setNewQuestion({ subject: "", module: "", questionText: "", type: "2-mark", co: "", po: "", bloomLevel: "" });
        setError("");
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error("Error adding question:", err);
    }
  };

  // Delete question from MongoDB
  const deleteQuestion = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/questions/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setQuestions(questions.filter((q) => q._id !== id)); // Update UI
      }
    } catch (err) {
      console.error("Error deleting question:", err);
    }
  };

  return (
    <div className="manage-questions-container">
      <h2>Manage Questions</h2>

      {/* Add Question Form */}
      <h3>Add New Question</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input type="text" name="subject" placeholder="Subject" value={newQuestion.subject} onChange={handleChange} />
      <input type="text" name="module" placeholder="Module" value={newQuestion.module} onChange={handleChange} />
      <input type="text" name="questionText" placeholder="Question" value={newQuestion.questionText} onChange={handleChange} />
      <select name="type" value={newQuestion.type} onChange={handleChange}>
        <option value="2-mark">2-Mark</option>
        <option value="8-mark">8-Mark</option>
        <option value="10-mark">10-Mark</option>
      </select>
      <input type="text" name="co" placeholder="Course Outcome (CO)" value={newQuestion.co} onChange={handleChange} />
      <input type="text" name="po" placeholder="Program Outcome (PO)" value={newQuestion.po} onChange={handleChange} />
      <input type="text" name="bloomLevel" placeholder="Bloom's Taxonomy Level" value={newQuestion.bloomLevel} onChange={handleChange} />
      <button onClick={addQuestion}>Add Question</button>

      {/* Display Questions */}
      <h3>Question Bank</h3>
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Module</th>
            <th>Question</th>
            <th>Type</th>
            <th>CO</th>
            <th>PO</th>
            <th>Bloom Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q._id}>
              <td>{q.subject}</td>
              <td>{q.module}</td>
              <td>{q.questionText}</td>
              <td>{q.type}</td>
              <td>{q.co}</td>
              <td>{q.po}</td>
              <td>{q.bloomLevel}</td>
              <td>
                <button className="delete-btn" onClick={() => deleteQuestion(q._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageQuestions;
