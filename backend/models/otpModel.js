import mongoose from "mongoose";

// Define the User schema with TTL (time-to-live) for automatic deletion
const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    OTP: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600, // The document will expire after 600 seconds (10 minutes)
    },
});

// Create the User model
const OTP = mongoose.model('Otp', otpSchema);

export default OTP;
