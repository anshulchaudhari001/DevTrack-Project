import express from 'express';
import { getSummary, getAnalytics } from '../controllers/dashboardController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/summary', protect, getSummary);
router.get('/analytics', protect, getAnalytics);

export default router;
