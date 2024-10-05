// Generate OTP and send it via email
import OTP from "../models/otpModel.js";
import nodemailer from 'nodemailer';
export const generateAndSendOTP = async (req, res) => {
    const { email } = req.body;
    try {
        // Generate a random 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Check if an OTP entry exists for the email, update if it exists
        const existingOtpEntry = await OTP.findOne({ email });
        // console.log('yaha');
        if (existingOtpEntry) {
            existingOtpEntry.OTP = otp;
            await existingOtpEntry.save();
        } else {
            // Create a new OTP entry
            const newOtpEntry = new OTP({ email, OTP: otp });
            await newOtpEntry.save();
        }
        // console.log(process.env.email);
        // Send the OTP to user's email (use nodemailer or similar)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.email,
                pass: process.env.password,
            },
        });

        const mailOptions = {
            from: process.env.email,
            to: email,
            subject: 'Your OTP Code to SignUp',
            text: `Your OTP code is ${otp}`,
        };

        await transporter.sendMail(mailOptions);
        // console.log('hello');
        return res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: 'Failed to generate or send OTP', error });
    }
};

// Validate the OTP
export const validateOTP = async (req, res) => {
    const { email, otp: inputOtp } = req.body;

    try {
        // Find the OTP entry for the user by email
        const otpEntry = await OTP.findOne({ email });

        if (!otpEntry) {
            return { success: false, message: 'OTP not found for this email' };
        }

        // Check if the input OTP matches the stored OTP
        if (inputOtp === otpEntry.OTP) {
            return { success: true, message: 'OTP validated successfully' };
        } else {
            return { success: false, message: 'Invalid OTP' };
        }
    } catch (error) {
        return { success: false, message: 'Failed to validate OTP', error };
    }
};
