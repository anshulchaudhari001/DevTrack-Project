import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import { CheckSquare, Clock, LayoutDashboard, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const DashboardHome = () => {
  const [summary, setSummary] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [summaryRes, analyticsRes] = await Promise.all([
          api.get('/dashboard/summary'),
          api.get('/dashboard/analytics')
        ]);
        setSummary(summaryRes.data);
        setAnalytics(analyticsRes.data);
      } catch (error) {
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Format time (seconds to hours/minutes)
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow p-5 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <LayoutDashboard className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">Total Tasks</dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900 dark:text-white">{summary?.tasks?.total || 0}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow p-5 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckSquare className="h-6 w-6 text-green-500" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">Tasks Done</dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900 dark:text-white">{summary?.tasks?.done || 0}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow p-5 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Target className="h-6 w-6 text-blue-500" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">In Progress</dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900 dark:text-white">{summary?.tasks?.inProgress || 0}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow p-5 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-6 w-6 text-orange-500" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">Time Today</dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900 dark:text-white">{formatTime(summary?.time?.todayDurationSeconds || 0)}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-lg bg-white dark:bg-gray-800 shadow p-5 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">Tasks Completed (Last 7 Days)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics?.tasksCompleted || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" allowDecimals={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6' }}
                  itemStyle={{ color: '#c084fc' }}
                />
                <Bar dataKey="count" fill="#aa3bff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg bg-white dark:bg-gray-800 shadow p-5 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">Hours Tracked (Last 7 Days)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics?.timeTracked || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6' }}
                  itemStyle={{ color: '#3b82f6' }}
                />
                <Line type="monotone" dataKey="hours" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
