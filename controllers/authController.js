const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const Admin = require('../models/Admin');

// Generate JWT
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password, role, ...otherData } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'Please add all required fields' });
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    let Model;
    if (role === 'student') Model = Student;
    else if (role === 'faculty') Model = Faculty;
    else if (role === 'admin') Model = Admin;
    else return res.status(400).json({ message: 'Invalid role' });

    // Check if user exists
    const userExists = await Model.findOne({ email: normalizedEmail });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await Model.create({
        name,
        email: normalizedEmail,
        password: hashedPassword,
        ...otherData // Spread other specific fields like department, etc.
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: role,
            token: generateToken(user.id, role),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password, role } = req.body;

    if (!role) {
        return res.status(400).json({ message: 'Role is required for login' });
    }

    // Normalize email
    const normalizedEmail = email ? email.toLowerCase().trim() : '';

    let Model;
    if (role === 'student') Model = Student;
    else if (role === 'faculty') Model = Faculty;
    else if (role === 'admin') Model = Admin;
    else return res.status(400).json({ message: 'Invalid role' });

    // Check if user exists
    const user = await Model.findOne({ email: normalizedEmail });

    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: role,
                avatar: user.avatar,
                verified: user.verified, // Include verification status
                token: generateToken(user.id, role),
            });
            return;
        }
    }

    // Fallthrough or if user not found
    res.status(400).json({ message: 'Invalid credentials' });
    /*
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: role,
            avatar: user.avatar,
            verified: user.verified, // Include verification status
            token: generateToken(user.id, role),
        });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
    */
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    res.status(200).json(req.userIs);
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
};
