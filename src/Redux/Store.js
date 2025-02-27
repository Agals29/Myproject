const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Endpoint
app.post("/api/reservations", (req, res) => {
  const { date, time, person, tableNumber, name, email, number } = req.body;

  // Validation
  if (!date || !time || !person || !tableNumber || !name || !email || !number) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!/^\d{10}$/.test(number)) {
    return res.status(400).json({ error: "Invalid phone number" });
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  console.log("Reservation received:", req.body);

  res.status(200).json({
    message: "Reservation booked successfully!",
    reservation: req.body,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
