const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token payload (id and role)
            // We need to check which collection to look into based on role or if we encoded role in token
            // Assuming we encode { id: user._id, role: 'student' } in token

            req.user = decoded; // Attach decoded token payload (id, role) to req.user

            // Optionally fetch full user data if needed, but for protecting routes, role and ID might be enough
            // If we need full user object:
            if (decoded.role === 'student') {
                req.userIs = await Student.findById(decoded.id).select('-password');
            } else if (decoded.role === 'faculty') {
                req.userIs = await Faculty.findById(decoded.id).select('-password');
            } else if (decoded.role === 'admin') {
                req.userIs = await Admin.findById(decoded.id).select('-password');
            }

            if (!req.userIs) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: `User role ${req.user.role} is not authorized to access this route` });
        }
        next();
    };
};

module.exports = { protect, authorize };
