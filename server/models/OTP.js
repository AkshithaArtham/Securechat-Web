const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    otpHash: { type: String, required: true },
    attempts: { type: Number, default: 0 },  // Track failed attempts
    blockedUntil: { type: Date, default: null }, // Lock if too many failed attempts
    createdAt: { type: Date, default: Date.now, expires: 300 } // Auto-delete after 5 min
});

// Block user for 10 minutes after 5 failed attempts
otpSchema.methods.incrementAttempts = async function () {
    this.attempts += 1;
    if (this.attempts >= 5) {
        this.blockedUntil = new Date(Date.now() + 10 * 60 * 1000); // Block for 10 min
    }
    await this.save();
};

module.exports = mongoose.model('OTP', otpSchema);
