import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "../../styles/AdminStyles.css";

// Sample question bank (replace with backend data if needed)
const sampleQuestions = [
  { id: 1, subject: "Math", module: "Algebra", text: "Solve x + 2 = 5", type: "2-mark", co: "CO1", po: "PO1", bloom: "Remember" },
  { id: 2, subject: "Math", module: "Geometry", text: "Define a triangle", type: "10-mark", co: "CO2", po: "PO2", bloom: "Understand" },
  { id: 3, subject: "Computer Networks", module: "Routing", text: "Explain OSPF Routing Protocol", type: "2-mark", co: "CO1", po: "PO3", bloom: "Apply" },
  { id: 4, subject: "Internet of Things", module: "IoT Basics", text: "Define IoT and its applications", type: "10-mark", co: "CO3", po: "PO4", bloom: "Analyze" },
  { id: 5, subject: "Advanced Web Technology", module: "React", text: "What are React hooks?", type: "2-mark", co: "CO2", po: "PO2", bloom: "Understand" },
  { id: 6, subject: "C#", module: "OOP Concepts", text: "Explain polymorphism in C#", type: "10-mark", co: "CO1", po: "PO1", bloom: "Remember" },
  { id: 7, subject: "NoSQL", module: "MongoDB", text: "What are advantages of NoSQL databases?", type: "2-mark", co: "CO3", po: "PO3", bloom: "Apply" },
];

const GenerateQuestionPaper = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [questionPattern, setQuestionPattern] = useState({ "2-mark": 2, "10-mark": 1 });
  const [generatedPaper, setGeneratedPaper] = useState([]);

  // Handle subject selection
  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  // Generate Question Paper
  const generatePaper = () => {
    if (!selectedSubject) {
      alert("Please select a subject!");
      return;
    }

    let selectedQuestions = [];
    Object.keys(questionPattern).forEach((type) => {
      const filteredQuestions = sampleQuestions.filter(
        (q) => q.subject === selectedSubject && q.type === type
      );

      let selected = filteredQuestions.length >= questionPattern[type]
        ? filteredQuestions.sort(() => 0.5 - Math.random()).slice(0, questionPattern[type])
        : filteredQuestions;

      selectedQuestions = [...selectedQuestions, ...selected];
    });

    setGeneratedPaper(selectedQuestions);
    generatePDF(selectedQuestions);
  };

  // Function to generate and save the question paper as a PDF
  const generatePDF = (questions) => {
    const doc = new jsPDF();
    doc.text("Generated Question Paper", 14, 10);
    
    const tableData = questions.map(q => [q.text, q.type, q.co, q.po, q.bloom]);
    
    doc.autoTable({
      head: [["Question", "Marks", "CO", "PO", "Bloom's Taxonomy"]],
      body: tableData,
      startY: 20,
    });

    doc.save("Question_Paper.pdf");
  };

  return (
    <div className="question-paper-container">
      <h2>Generate Question Paper</h2>

      {/* Subject Selection */}
      <label>Select Subject:</label>
      <select value={selectedSubject} onChange={handleSubjectChange}>
        <option value="">-- Select --</option>
        <option value="Math">Math</option>
        <option value="Computer Networks">Computer Networks</option>
        <option value="Internet of Things">Internet of Things</option>
        <option value="Advanced Web Technology">Advanced Web Technology</option>
        <option value="C#">C#</option>
        <option value="NoSQL">NoSQL</option>
      </select>

      {/* Generate Button */}
      <button onClick={generatePaper}>Generate Paper</button>

      {/* Display Generated Paper */}
      {generatedPaper.length > 0 && (
        <div className="question-paper">
          <h3>Generated Question Paper</h3>
          <ol>
            {generatedPaper.map((q) => (
              <li key={q.id}>
                {q.text} ({q.type}, CO: {q.co}, PO: {q.po}, Bloom: {q.bloom})
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default GenerateQuestionPaper;
