require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();
const OTP_STORE = {}; // Temporary in-memory store for OTPs

// Nodemailer Transporter Setup for Yahoo Mail
const transporter = nodemailer.createTransport({
  service: "yahoo",
  auth: {
    user: process.env.YAHOO_EMAIL_USER,
    pass: process.env.YAHOO_EMAIL_PASS,
  },
});

// **Send OTP**
const sendOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const normalizedEmail = email.toLowerCase();
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit numeric OTP
  OTP_STORE[normalizedEmail] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // Store OTP with expiration

  setTimeout(() => delete OTP_STORE[normalizedEmail], 5 * 60 * 1000); // Auto-delete after 5 mins

  try {
    await transporter.sendMail({
      from: process.env.YAHOO_EMAIL_USER, // Fixed sender
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}. It will expire in 5 minutes.`,
    });

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// **Verify OTP**
const verifyOTP = (req, res) => {
  const { email, otp } = req.body;
  const normalizedEmail = email.toLowerCase();

  if (!OTP_STORE[normalizedEmail]) {
    return res.status(400).json({ message: "OTP expired or not found" });
  }

  const { otp: storedOtp, expiresAt } = OTP_STORE[normalizedEmail];

  if (Date.now() > expiresAt) {
    delete OTP_STORE[normalizedEmail];
    return res.status(400).json({ message: "OTP expired" });
  }

  if (storedOtp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  delete OTP_STORE[normalizedEmail]; // Remove OTP after successful verification
  res.json({ message: "OTP verified successfully" });
};

module.exports = { sendOTP, verifyOTP };
