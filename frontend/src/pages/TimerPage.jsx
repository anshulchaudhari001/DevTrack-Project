import React, { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import { Play, Square, Clock, List } from 'lucide-react';

const TimerPage = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // in seconds
  const [startTime, setStartTime] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get('/timer/history');
      setHistory(res.data);
    } catch (error) {
      toast.error('Failed to load timer history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const handleStart = async () => {
    try {
      const res = await api.post('/timer/start');
      setStartTime(res.data.startTime);
      setIsRunning(true);
      setElapsedTime(0);
    } catch (error) {
      toast.error('Failed to start timer');
    }
  };

  const handleStop = async () => {
    if (!startTime) return;
    
    setIsRunning(false);
    const endTime = new Date().toISOString();
    
    try {
      const res = await api.post('/timer/stop', {
        startTime,
        endTime
      });
      setHistory([res.data, ...history]);
      toast.success('Timer session saved');
      setStartTime(null);
      setElapsedTime(0);
    } catch (error) {
      toast.error('Failed to stop timer');
    }
  };

  const formatDisplayTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const formatHistoryDuration = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m ${seconds % 60}s`;
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Time Tracking</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto text-center">
        <Clock className="mx-auto h-16 w-16 text-primary-500 mb-4" />
        <div className="text-6xl sm:text-8xl font-mono font-light text-gray-900 dark:text-white mb-8 tracking-wider">
          {formatDisplayTime(elapsedTime)}
        </div>
        
        <div className="flex justify-center space-x-6">
          {!isRunning ? (
            <button
              onClick={handleStart}
              className="flex items-center px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold text-xl transition-transform hover:scale-105 active:scale-95 shadow-lg"
            >
              <Play className="mr-2" size={28} />
              Start
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="flex items-center px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-full font-bold text-xl transition-transform hover:scale-105 active:scale-95 shadow-lg animate-pulse"
            >
              <Square className="mr-2" size={28} />
              Stop
            </button>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
          <List className="mr-2 text-gray-500 dark:text-gray-400" />
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Sessions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Start Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">End Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Duration</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {history.map((session) => (
                <tr key={session._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {new Date(session.startTime).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(session.startTime).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(session.endTime).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {formatHistoryDuration(session.duration)}
                  </td>
                </tr>
              ))}
              {history.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    No timer sessions found. Start tracking!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimerPage;
