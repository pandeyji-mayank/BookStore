import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import OTP from '../models/otpModel.js'; // OTP Model
import { config } from 'dotenv';
config();
import { generateAndSendOTP, validateOTP } from '../controllers/otpController.js'; // Import OTP controllers
const router = express.Router();

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Registration Route (Step 1: Email submission and OTP generation)
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const regex = /^[a-zA-Z0-9._%+-]+@iiitbh\.ac\.in$/;

    try {
        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Check for valid college email
        if (!regex.test(email)) {
            return res.status(400).json({ message: 'Invalid email. Please use a valid College Email' });
        }

        // Generate OTP and send it via email
        await generateAndSendOTP(req, res); // Send OTP to user's email
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// OTP Validation and User Creation (Step 2: OTP validation and user creation)
router.post('/validate-otp', async (req, res) => {
    const { email, otp, password } = req.body;
    console.log(email, otp, password);
    try {
        const userFirst = await User.findOne({ email });
        if (userFirst) {
            console.log('haa');
            return res.status(400).json({ message: 'User already exists' });
        }
        // Validate OTP
        const otpValidationResult = await validateOTP(req, res); // Validate OTP
        if (!otpValidationResult.success) {
            return res.status(400).json({ message: otpValidationResult.message });
        }
        console.log(email, password);
        // OTP is valid, create the user
        const user = new User({ email, password });
        await user.save();

        // Delete the OTP entry after successful validation
        await OTP.deleteOne({ email });

        // Send JWT token after successful signup
        const token = generateToken(user._id);
        return res.status(201).json({ token, user: { id: user._id, email: user.email } });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server error');
    }
});
// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if the password is correct
        const isMatch = await user.matchPassword(password);
        console.log(email, password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Send token after successful login
        const token = generateToken(user._id);

        return res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server error');
    }
});
const protect = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add the decoded user ID to the request object
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Verify Route
router.post('/verify', protect, async (req, res) => {
    try {
        // Fetch the user from the database using the decoded ID
        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with user details
        res.json({ success: true, user });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});
export default router;
