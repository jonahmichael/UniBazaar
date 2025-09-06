const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // This loads the .env file
const cloudinaryConnect = require('./config/cloudinaryConfig'); // <-- 1. Import
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();
cloudinaryConnect();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again after 15 minutes',
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

// b) Data Sanitization against NoSQL Query Injection
// This will remove any keys in req.body, req.query, or req.params that start with '$' or '.'.
app.use(mongoSanitize());

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