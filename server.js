const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");

connectDB();

const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// //Allow Localhost to be access anywhere locally
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "Content-Type",
    "Authorization"
  );
  next();
});

//routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to RandomIdeas API - Murk Technology Solutions.",
  });
});

const ideasRouter = require("./routes/ideas");
const { connect } = require("http2");
app.use("/api/ideas", ideasRouter);

app.listen(port, () => console.log(`Server listening in port ${port}`));
