const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));

app.use("/auth", require("./routes/auth"));
app.use("/admin", require("./routes/admin"));
app.use("/teacher", require("./routes/teacher"));
app.use("/questions", require("./routes/questions"));
app.use("/patterns", require("./routes/patterns"));
app.use("/questionPaper", require("./routes/questionPaper"));

app.listen(5000, () => console.log("Server running on port 5000"));
