import express from 'express';
import { registerUser, loginUser, getProfile } from '../controllers/authController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);

// Example of role-based access
router.get('/admin', protect, authorizeRoles('Admin'), (req, res) => {
    res.json({ message: 'Welcome, Admin!' });
});

export default router;
