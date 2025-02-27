const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/addtocart", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Define Order Schema
const orderSchema = new mongoose.Schema({
  items: [
    {
      title: String,
      price: String,
      quantity: Number,
    },
  ],
  total: Number,
});

// Use the "confirm" collection
const Order = mongoose.model("confirm", orderSchema);

// API Endpoint to Save Order
app.post("/api/orders", async (req, res) => {
  try {
    const { cart, total } = req.body;
    const newOrder = new Order({
      items: cart,
      total,
    });
    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order saved successfully!", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Failed to save order", error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
