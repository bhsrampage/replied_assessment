/* Imports */
const express = require("express");
const dotenv = require("dotenv");

/* Initialisations */
dotenv.config({ path: "./.env" });
const app = express();

/* Transport Header Configurations */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, XMLHttpRequest"
  );
  next();
});

const PORT = process.env.PORT || 8080;

/* Server Running check endpoint */
app.get("/", (req, res) => {
  res.status(200).send("<h1>Replied Assessment server says Hi :)</h1>");
});

/* Server Listener Setup */
app.listen(PORT, (err) => {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
