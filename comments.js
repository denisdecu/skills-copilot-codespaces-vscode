// Create web server
// Start server
// Add routes
// Add middleware

// Import modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

// Create web server
const app = express();

// Start server
app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});

// Add routes
app.get("/", (req, res) => {
  res.send("Welcome to the comments page!");
});

app.get("/comments", (req, res) => {
  // Read file
  fs.readFile("./comments.json", (err, data) => {
    if (err) {
      res.send("An error occurred while reading the file.");
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.post("/comments", bodyParser.json(), (req, res) => {
  // Read file
  fs.readFile("./comments.json", (err, data) => {
    if (err) {
      res.send("An error occurred while reading the file.");
    } else {
      // Parse data
      let comments = JSON.parse(data);
      // Add new comment
      comments.push(req.body);
      // Write file
      fs.writeFile("./comments.json", JSON.stringify(comments), (err) => {
        if (err) {
          res.send("An error occurred while writing the file.");
        } else {
          res.send("Comment added successfully!");
        }
      });
    }
  });
});

// Add middleware
app.use(cors());