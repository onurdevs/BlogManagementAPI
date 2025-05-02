const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Rotalar
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));

app.get("/", (req, res) => {
  res.send("Blog API çalışıyor 🚀");
});

module.exports = app;
