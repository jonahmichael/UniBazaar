const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    collegeId: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    // We will add ratings later in a future sprint
}, { timestamps: true }); // timestamps adds `createdAt` and `updatedAt` fields automatically

module.exports = mongoose.model('User', UserSchema);