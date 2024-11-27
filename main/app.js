const express = require("express");
const router = require("./src/routes/api");
const app = new express();
const dotenv = require("dotenv").config();

// Security Middleware lib Import
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Database Lib Import
const mongoose = require("mongoose");

// let URL = process.env.MONGO_URL;
let URL =
  "mongodb+srv://<username>:<password>@cluster0.jxaw5.mongodb.net/ostad_ecom?retryWrites=true&w=majority&appName=Cluster0";

let option = { user: "shobujd6", pass: "shobujd6", autoIndex: true };

mongoose
  .connect(URL, option)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log(error);
  });

// Security Middleware Implement
app.use(cookieParser())
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

// Request Rate Limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);

// Routing Implement
app.use("/api/v1", router);

// Undefined Route Implement
app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "Not found" });
});

module.exports = app;
