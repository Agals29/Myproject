const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Admin credentials (replace with your own credentials)
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "Admin@123", // This is the password the admin will use
};

// Login API
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Check if username is provided
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  // Check if password is provided
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  // Validate username
  if (username !== ADMIN_CREDENTIALS.username) {
    return res.status(401).json({ message: "Invalid username" });
  }

  // Validate password (only if username is correct)
  if (password !== ADMIN_CREDENTIALS.password) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // If both username and password are correct
  return res.status(200).json({ message: "Login successful" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
