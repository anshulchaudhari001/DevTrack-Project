import mongoose from 'mongoose';

const timerSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number, // duration in seconds
      required: true,
    },
  },
  { timestamps: true }
);

const TimerSession = mongoose.model('TimerSession', timerSessionSchema);
export default TimerSession;
