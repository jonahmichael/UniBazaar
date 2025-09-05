const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // This loads the .env file
const cloudinaryConnect = require('./config/cloudinaryConfig'); // <-- 1. Import
const app = express();
cloudinaryConnect();

// --- Middleware ---
// Enable Cross-Origin Resource Sharing
app.use(cors());
// To parse incoming JSON request bodies
app.use(express.json());

// In server/server.js, add this line with your other routes
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders')); 
app.use('/api/upload', require('./routes/uploadRoutes')); 
app.use('/api/users', require('./routes/userRoutes')); // <-- ADD THIS LINE```
app.use('/api/upload', require('./routes/uploadRoutes'));


// --- Database Connection ---
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected successfully!');
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};
connectDB();

// --- API Routes ---
// When a request comes to /api/auth, it will be handled by our auth routes file
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/userRoutes'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));