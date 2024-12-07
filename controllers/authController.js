import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// Register User
export const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const user = await User.create({ name, email, password, role });
        res.status(201).json({ token: generateToken(user._id) });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({ token: generateToken(user._id) });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// Get Profile (protected)
export const getProfile = (req, res) => {
    res.json({ user: req.user });
};
