
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Timer, 
  GitBranch, 
  BarChart3, 
  User, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

const DashboardLayout = () => {
  const { logout, user } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Tasks', path: '/dashboard/tasks', icon: CheckSquare },
    { name: 'Timer', path: '/dashboard/timer', icon: Timer },
    { name: 'GitHub', path: '/dashboard/github', icon: GitBranch },
    { name: 'Analytics', path: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Profile', path: '/dashboard/profile', icon: User },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700">
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">DevTrack</span>
            <button 
              className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-3">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary-700 dark:text-primary-300' : 'text-gray-400'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center mb-4 px-3">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-700 dark:text-primary-300 font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate w-32">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar for mobile */}
        <header className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex h-16 items-center px-4">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Menu size={24} />
          </button>
          <span className="ml-4 text-xl font-bold text-gray-900 dark:text-white">DevTrack</span>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
