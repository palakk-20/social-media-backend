const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
module.exports = app;
