require("dotenv").config();
console.log(process.env.GROQ_API_KEY);

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const commentRoutes = require("./routes/commentRoutes");
const userRoutes = require("./routes/userRoutes");
const redditRoutes = require("./routes/redditRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const subredditRoutes = require("./routes/subredditRoutes");
const seedRoutes = require("./routes/seedRoutes");
require("./jobs/redditScheduler");


const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ForumMiner Backend Running");
});

// Auth Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reddit", redditRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/subreddits", subredditRoutes);
app.use("/api/seed", seedRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
require("./jobs/redditScheduler");