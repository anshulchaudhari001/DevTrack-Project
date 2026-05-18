import express from 'express';
import {
  startTimer,
  stopTimer,
  getTimerHistory,
} from '../controllers/timerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/start', protect, startTimer);
router.post('/stop', protect, stopTimer);
router.get('/history', protect, getTimerHistory);

export default router;
