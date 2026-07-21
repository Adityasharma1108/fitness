const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register new user
// @route   POST /api/auth/signup
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please add all fields' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        if (user) {
            return res.status(201).json({
                message: 'Registration Successful! Ab login kijiye.'
            });
        } else {
            return res.status(400).json({ message: 'Invalid user data received' });
        }
    } catch (error) {
        console.error('🔥 Signup Controller Error:', error.message);
        return res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Check for user email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials! User nahi mila.' });
        }

        // Match password hashes safely
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials! Password galat hai.' });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET || 'secret123', 
            { expiresIn: '30d' }
        );

        // Standardized response object format matching Auth.js exactly
        return res.status(200).json({
            token,
            name: user.name,
            email: user.email
        });

    } catch (error) {
        console.error('🔥 Login Controller Error:', error.message);
        return res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
};

module.exports = { registerUser, loginUser };