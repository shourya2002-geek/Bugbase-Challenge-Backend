require("dotenv").config();
const express = require("express");

const InitiateMongoServer = require("./Config/db");
const authRoute = require("./Routes/userRoutes.js");

const cors = require("cors");

InitiateMongoServer();
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
const PORT = process.env.PORT || 5000;

app.use("/api", authRoute);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
