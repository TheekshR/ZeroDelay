const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/tests", require("./routes/testRoutes"));

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() =>
        console.log("Connected to MongoDB"))
    .catch((err) =>
        console.error("Error connecting to MongoDB:", err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 