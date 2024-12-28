const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const courseRoutes = require("./routes/courseRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect("mongodb://localhost/course_platform", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.use("/api/courses", courseRoutes);

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Uploads directory: ${path.join(__dirname, "uploads")}`);
});
