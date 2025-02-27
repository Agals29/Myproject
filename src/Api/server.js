// Import required dependencies
const express = require("express");
const cors = require("cors"); // Import CORS middleware
const fs = require("fs"); // For file system operations (to store data in a JSON file)
const app = express();

// Enable CORS for all incoming requests
app.use(cors()); // This will allow requests from any origin

// Optionally, you can configure CORS for specific origins:
const corsOptions = {
  origin: "http://localhost:3000", // Allow only the frontend at localhost:3000
  methods: ["GET", "POST"], // Allow specific HTTP methods
  allowedHeaders: ["Content-Type"], // Allow specific headers
};
app.use(cors(corsOptions)); // Apply CORS configuration to the server

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Sample POST route to handle the reservation
app.post("/api/reservation", (req, res) => {
  const reservationData = req.body;

  // You can store reservation data in a JSON file (data.json) for simplicity
  fs.readFile("data.json", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Failed to read data file." });
    }

    let reservations = [];
    if (data.length > 0) {
      reservations = JSON.parse(data); // Parse existing reservation data if available
    }

    // Add new reservation to the array
    reservations.push(reservationData);

    // Save the updated reservation data back to data.json
    fs.writeFile("data.json", JSON.stringify(reservations, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to save reservation." });
      }

      // Send a success response
      res.status(200).json({ message: "Table booked successfully!" });
    });
  });
});

// Start the server
app.listen(5000, () => {
  console.log("Backend is running on http://localhost:5000");
});
