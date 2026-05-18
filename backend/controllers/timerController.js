import TimerSession from '../models/TimerSession.js';

// @desc    Start a timer session
// @route   POST /api/timer/start
// @access  Private
export const startTimer = async (req, res) => {
  try {
    // Starting a timer doesn't strictly need a DB record until it stops, 
    // but if we want to record when they started to handle lost connections:
    // For simplicity, we just return the server time to sync.
    res.json({ startTime: new Date() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Stop a timer session & save
// @route   POST /api/timer/stop
// @access  Private
export const stopTimer = async (req, res) => {
  try {
    const { startTime, endTime } = req.body;

    if (!startTime || !endTime) {
      return res.status(400).json({ error: 'Start and end times are required' });
    }

    const start = new Date(startTime);
    const end = new Date(endTime);
    
    // Duration in seconds
    const duration = Math.floor((end - start) / 1000);

    if (duration < 0) {
      return res.status(400).json({ error: 'End time must be after start time' });
    }

    const session = await TimerSession.create({
      userId: req.user._id,
      startTime: start,
      endTime: end,
      duration,
    });

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get timer history
// @route   GET /api/timer/history
// @access  Private
export const getTimerHistory = async (req, res) => {
  try {
    const history = await TimerSession.find({ userId: req.user._id }).sort({ createdAt: -1 }).limit(50);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
