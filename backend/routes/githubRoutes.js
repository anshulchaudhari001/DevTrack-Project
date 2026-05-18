import express from 'express';
import { getGithubProfile } from '../controllers/githubController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:username', protect, getGithubProfile);

export default router;
