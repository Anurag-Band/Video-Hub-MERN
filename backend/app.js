const express = require("express");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/public", express.static("public"));

if (process.env.NODE_ENV != "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// import routes
const user = require("./routes/userRoute");
const video = require('./routes/videoRoute');
const comment = require('./routes/commentRoute');

app.use("/api/v1", user);
app.use('/api/v1', video);
app.use('/api/v1', comment);

// deployment
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Server is Running! 🚀");
  });
}

// error middleware
app.use(errorMiddleware);

module.exports = app;
