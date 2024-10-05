import OTP from '../models/User.js';
import nodemailer from 'nodemailer';

// Generate OTP and send it via email
export const generateAndSendOTP = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    try {
        // Generate a random 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Check if the user already has an OTP entry, and update it
        const existingOtpEntry = await OTP.findOne({ email });
        if (existingOtpEntry) {
            existingOtpEntry.OTP = otp;
            await existingOtpEntry.save();
        } else {
            // Create a new OTP document and save it to the database
            const newOtpEntry = new OTP({ email, OTP: otp });
            await newOtpEntry.save();
        }

        // Send the OTP to the user's email using nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can use any email provider
            auth: {
                user: 'your-email@gmail.com', // Replace with your email
                pass: 'your-email-password',  // Replace with your email password
            },
        });

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}`,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to generate or send OTP', error });
    }
};

// Validate the OTP
export const validateOTP = async (req, res) => {
    const { email, otp: inputOtp } = req.body;

    if (!email || !inputOtp) {
        return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }

    try {
        // Find the OTP entry for the user by email
        const otpEntry = await OTP.findOne({ email });

        if (!otpEntry) {
            return res.status(404).json({ success: false, message: 'OTP not found for this email' });
        }

        // Check if the input OTP matches the stored OTP
        if (inputOtp === otpEntry.OTP) {
            return res.status(200).json({ success: true, message: 'OTP validated successfully' });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to validate OTP', error });
    }
};
