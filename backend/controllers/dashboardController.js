import Task from '../models/Task.js';
import TimerSession from '../models/TimerSession.js';

// @desc    Get dashboard summary
// @route   GET /api/dashboard/summary
// @access  Private
export const getSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalTasks = await Task.countDocuments({ userId });
    const todoTasks = await Task.countDocuments({ userId, status: 'Todo' });
    const inProgressTasks = await Task.countDocuments({ userId, status: 'InProgress' });
    const doneTasks = await Task.countDocuments({ userId, status: 'Done' });

    // Calculate today's duration
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const todaySessions = await TimerSession.find({
      userId,
      startTime: { $gte: startOfToday, $lte: endOfToday },
    });

    const totalDurationToday = todaySessions.reduce((acc, session) => acc + session.duration, 0);

    res.json({
      tasks: {
        total: totalTasks,
        todo: todoTasks,
        inProgress: inProgressTasks,
        done: doneTasks,
      },
      time: {
        todayDurationSeconds: totalDurationToday,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get dashboard analytics
// @route   GET /api/dashboard/analytics
// @access  Private
export const getAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    // Tasks completed in the last 7 days (group by date)
    const tasksCompleted = await Task.aggregate([
      {
        $match: {
          userId,
          status: 'Done',
          updatedAt: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$updatedAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Hours tracked per day in the last 7 days
    const hoursTracked = await TimerSession.aggregate([
      {
        $match: {
          userId,
          startTime: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$startTime' } },
          totalSeconds: { $sum: '$duration' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      tasksCompleted: tasksCompleted.map(t => ({ date: t._id, count: t.count })),
      timeTracked: hoursTracked.map(t => ({ date: t._id, hours: (t.totalSeconds / 3600).toFixed(2) })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
