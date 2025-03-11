import React, { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "../../styles/AdminStyles.css";

const GenerateQuestionPaper = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [studentUsn, setStudentUsn] = useState("");
  const [questionCounts, setQuestionCounts] = useState({
    "2-mark": 2,
    "8-mark": 4,
  });
  const [generatedPaper, setGeneratedPaper] = useState([]);

  const subjects = ["Internet of Things", "Computer Networks", "Advanced Web Technology", "NoSQL"];

  const questionBank = {
    "Internet of Things": {
      "2-mark": [
        "What is IoT?",
        "Define MQTT protocol.",
        "What are IoT sensors?",
        "Explain Edge computing in IoT.",
        "List two applications of IoT in healthcare."
      ],
      "8-mark": [
        "Explain IoT architecture with a neat diagram.",
        "Describe the working of RFID technology in IoT.",
        "Compare Wi-Fi, Zigbee, and Bluetooth in IoT communication.",
        "Explain the role of Cloud Computing in IoT.",
        "What are the security challenges in IoT?"
      ],
    },
    "Computer Networks": {
      "2-mark": [
        "What is the purpose of a subnet mask?",
        "Define IP address.",
        "What is a MAC address?",
        "Explain CSMA/CD.",
        "What is the role of a router in a network?"
      ],
      "8-mark": [
        "Explain TCP/IP model with a neat diagram.",
        "Compare circuit switching and packet switching.",
        "Discuss the working of DNS with an example.",
        "What is NAT? Explain its types.",
        "Describe congestion control mechanisms in computer networks."
      ],
    },
    "Advanced Web Technology": {
      "2-mark": [
        "What is a RESTful API?",
        "Define JSX in React.",
        "What is the purpose of Redux in React?",
        "What are WebSockets?",
        "Explain the concept of responsive web design."
      ],
      "8-mark": [
        "Compare client-side and server-side rendering.",
        "Explain the working of the Virtual DOM in React.",
        "Discuss the benefits and limitations of Single Page Applications (SPA).",
        "What are the different HTTP methods in REST API? Explain.",
        "Explain how authentication and authorization work in web applications."
      ],
    },
    "NoSQL": {
      "2-mark": [
        "What is NoSQL?",
        "Define CAP theorem.",
        "Differentiate between SQL and NoSQL databases.",
        "What are the types of NoSQL databases?",
        "Explain BASE property in NoSQL."
      ],
      "8-mark": [
        "Explain the characteristics of NoSQL databases.",
        "Compare key-value, document, column-family, and graph databases.",
        "Describe MongoDB indexing and aggregation framework.",
        "What are the advantages and disadvantages of NoSQL databases?",
        "Explain how data replication works in NoSQL."
      ],
    },
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleUsnChange = (event) => {
    setStudentUsn(event.target.value);
  };

  const generatePaper = () => {
    if (!selectedSubject) {
      alert("Please select a subject!");
      return;
    }

    const twoMarkQuestions = questionBank[selectedSubject]["2-mark"]
      .sort(() => 0.5 - Math.random())
      .slice(0, questionCounts["2-mark"]);

    const eightMarkQuestions = questionBank[selectedSubject]["8-mark"]
      .sort(() => 0.5 - Math.random())
      .slice(0, questionCounts["8-mark"]);

    const selectedQuestions = [...twoMarkQuestions.map((q) => ({ text: q, type: "2-mark" })), 
                               ...eightMarkQuestions.map((q) => ({ text: q, type: "8-mark" }))];

    setGeneratedPaper(selectedQuestions);
    generatePDF(selectedQuestions);
  };

  const generatePDF = (questions) => {
    const doc = new jsPDF();
    doc.setFont("times", "bold");
    doc.setFontSize(16);
    doc.text("ST. JOSEPH ENGINEERING COLLEGE, MANGALORE", 40, 10);
    doc.setFontSize(12);
    doc.text(`Student USN: ${studentUsn}`, 10, 20);
    doc.text(`Subject: ${selectedSubject}`, 10, 30);

    let startY = 40;

    const twoMarkQuestions = questions.filter((q) => q.type === "2-mark");
    const eightMarkQuestions = questions.filter((q) => q.type === "8-mark");

    if (twoMarkQuestions.length > 0) {
      doc.setFontSize(14);
      doc.text("PART A - Answer any TWO questions", 10, startY);
      startY += 10;

      autoTable(doc, {
        head: [["Q.No", "Question (2 Marks)"]],
        body: twoMarkQuestions.map((q, index) => [`${index + 1}`, q.text]),
        startY: startY,
      });

      startY += (twoMarkQuestions.length * 10) + 10;
    }

    if (eightMarkQuestions.length > 0) {
      doc.setFontSize(14);
      doc.text("PART B - Answer any TWO questions per Module", 10, startY);
      startY += 10;

      let moduleCount = 1;
      for (let i = 0; i < eightMarkQuestions.length; i += 4) {
        doc.setFontSize(12);
        doc.text(`Module ${moduleCount}`, 10, startY);
        startY += 10;

        autoTable(doc, {
          head: [["Q.No", "Question"]],
          body: [
            [`${moduleCount}.1a`, eightMarkQuestions[i]?.text || ""],
            [`${moduleCount}.1b`, eightMarkQuestions[i + 1]?.text || ""],
            ["OR", ""],
            [`${moduleCount}.2a`, eightMarkQuestions[i + 2]?.text || ""],
            [`${moduleCount}.2b`, eightMarkQuestions[i + 3]?.text || ""],
          ],
          startY: startY,
        });

        startY += 60;
        moduleCount++;
      }
    }

    doc.save("Question_Paper.pdf");
  };

  return (
    <div className="question-paper-container">
      <h2>Generate Question Paper</h2>

      <label>Student USN:</label>
      <input type="text" value={studentUsn} onChange={handleUsnChange} placeholder="Enter USN" />

      <label>Select Subject:</label>
      <select value={selectedSubject} onChange={handleSubjectChange}>
        <option value="">-- Select --</option>
        {subjects.map((subject, index) => (
          <option key={index} value={subject}>{subject}</option>
        ))}
      </select>

      <button onClick={generatePaper}>Generate Paper</button>
    </div>
  );
};

export default GenerateQuestionPaper;
