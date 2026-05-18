import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { GitBranch, Users, BookOpen, Star, ExternalLink, Search } from 'lucide-react';

const GithubPage = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState('');
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.githubUsername) {
      setUsername(user.githubUsername);
      fetchGithubData(user.githubUsername);
    }
  }, [user]);

  const fetchGithubData = async (uname) => {
    if (!uname) return;
    setLoading(true);
    try {
      const res = await api.get(`/github/${uname}`);
      setGithubData(res.data);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to fetch GitHub data');
      setGithubData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchGithubData(username);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <GitBranch className="mr-2" size={28} />
          GitHub Stats
        </h1>
        
        <form onSubmit={handleSearch} className="mt-4 sm:mt-0 flex">
          <input
            type="text"
            placeholder="GitHub Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-l-md border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center rounded-r-md bg-gray-800 dark:bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 dark:hover:bg-gray-600"
          >
            {loading ? <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div> : <Search size={18} />}
          </button>
        </form>
      </div>

      {!githubData && !loading && (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <GitBranch className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">No GitHub Profile Linked</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Search for a username above or link your account in the Profile page.</p>
        </div>
      )}

      {githubData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 col-span-1 h-fit">
            <div className="flex flex-col items-center">
              <img 
                src={githubData.profile.avatar} 
                alt="Avatar" 
                className="w-32 h-32 rounded-full border-4 border-gray-100 dark:border-gray-700 mb-4 shadow-sm"
              />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{githubData.profile.name || username}</h2>
              <a 
                href={githubData.profile.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:underline flex items-center mt-1 mb-4"
              >
                @{username} <ExternalLink size={14} className="ml-1" />
              </a>
              
              {githubData.profile.bio && (
                <p className="text-center text-gray-600 dark:text-gray-300 text-sm mb-6">{githubData.profile.bio}</p>
              )}
              
              <div className="w-full grid grid-cols-2 gap-4 border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="text-center">
                  <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 mb-1">
                    <Users size={18} className="mr-1" />
                  </div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{githubData.profile.followers}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Followers</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 mb-1">
                    <BookOpen size={18} className="mr-1" />
                  </div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{githubData.profile.publicRepos}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Repos</div>
                </div>
              </div>
            </div>
          </div>

          {/* Repositories */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center mb-4">
              <BookOpen className="mr-2" size={20} />
              Recent Repositories
            </h3>
            
            {githubData.repos.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No public repositories found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {githubData.repos.map(repo => (
                  <div key={repo.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <a 
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer" 
                        className="text-lg font-semibold text-primary-600 dark:text-primary-400 hover:underline truncate mr-2"
                      >
                        {repo.name}
                      </a>
                      <span className="flex items-center text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full whitespace-nowrap">
                        <Star size={12} className="mr-1 text-yellow-500" />
                        {repo.stargazers_count}
                      </span>
                    </div>
                    
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2 h-10">
                      {repo.description || "No description provided."}
                    </p>
                    
                    <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center">
                      {repo.language ? (
                        <span className="flex items-center text-xs text-gray-500 dark:text-gray-400 font-medium">
                          <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                          {repo.language}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">Unknown language</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GithubPage;
