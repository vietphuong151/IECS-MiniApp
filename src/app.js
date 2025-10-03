require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { sequelize } = require("../config/db");

const app = express();

// Middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

// Routes
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/users", require("./routes/user.route"));
app.use("/api/courses", require("./routes/course.route"));
app.use("/api/admissions", require("./routes/admission.route"));
app.use("/api/news", require("./routes/news.route"));
app.use("/api/consults", require("./routes/consult.route"));
app.use("/api/staffs", require("./routes/staff.route"));
app.use("/api/students", require("./routes/student.route"));
app.use("/api/attendances", require("./routes/attendance.route"));
app.use("/api/test-scores", require("./routes/testScore.route"));
app.use("/api/comments", require("./routes/comment.route"));

// Database connection + sync
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection successful!");

    await sequelize.sync({ alter: true });
    console.log("✅ Database synced successfully!");
  } catch (err) {
    console.error("❌ Database error:", err.message);
    process.exit(1);
  }
})();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
