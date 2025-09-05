const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // --- EXISTING FIELDS (UNCHANGED) ---
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    collegeId: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    
    // --- NEW RATING FIELDS (CORRECTLY INTEGRATED) ---
    ratings: [{
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String },
        ratedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }],
    averageRating: {
        type: Number,
        default: 0
    }
    
}, { timestamps: true }); // timestamps adds `createdAt` and `updatedAt` fields automatically

module.exports = mongoose.model('User', UserSchema);