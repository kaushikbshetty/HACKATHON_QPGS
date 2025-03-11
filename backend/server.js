require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Define Question Schema
const questionSchema = new mongoose.Schema({
  subject: String,
  module: String,
  questionText: String,
  type: String,
  co: String,
  po: String,
  bloomLevel: String,
});

const Question = mongoose.model("Question", questionSchema);

// Define storage for file uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Define Syllabus Schema
const syllabusSchema = new mongoose.Schema({
  subjectName: String,
  filePath: String,
});

const Syllabus = mongoose.model("Syllabus", syllabusSchema);

// Routes

// Add a new question
app.post("/questions", async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all questions
app.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a question
app.delete("/questions/:id", async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: "Question deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Upload syllabus file
app.post("/upload-syllabus", upload.single("syllabusFile"), async (req, res) => {
  try {
    const { subjectName } = req.body;
    if (!subjectName || !req.file) {
      return res.status(400).json({ error: "Subject name and file are required." });
    }

    const newSyllabus = new Syllabus({
      subjectName,
      filePath: req.file.path,
    });

    await newSyllabus.save();
    res.status(201).json({ message: "Syllabus uploaded successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch all uploaded syllabus files
app.get("/syllabus", async (req, res) => {
  try {
    const syllabus = await Syllabus.find();
    res.json(syllabus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a syllabus file
app.delete("/syllabus/:id", async (req, res) => {
  try {
    const syllabus = await Syllabus.findByIdAndDelete(req.params.id);
    if (!syllabus) return res.status(404).json({ error: "Syllabus not found" });

    // Delete the actual file
    fs.unlinkSync(syllabus.filePath);

    res.json({ message: "Syllabus deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// Route to generate questions based on subject and number of questions
app.post("/questions/generate", async (req, res) => {
    try {
      const { subject, counts } = req.body;
  
      if (!subject || !counts) {
        return res.status(400).json({ error: "Subject and question count are required." });
      }
  
      let selectedQuestions = [];
  
      for (let type in counts) {
        let questions = await Question.find({ subject, type });
        if (questions.length < counts[type]) {
          return res.status(400).json({ error: `Not enough ${type} questions available for ${subject}.` });
        }
  
        // Randomly pick the required number of questions
        questions = questions.sort(() => 0.5 - Math.random()).slice(0, counts[type]);
        selectedQuestions.push(...questions);
      }
  
      res.json(selectedQuestions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
