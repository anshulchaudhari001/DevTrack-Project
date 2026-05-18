import axios from 'axios';

// Cache structure (in-memory for simplicity):
// { 'username': { data: {}, timestamp: 12345 } }
const githubCache = {};
const CACHE_TTL = 3600000; // 1 hour

// @desc    Get GitHub profile data
// @route   GET /api/github/:username
// @access  Private
export const getGithubProfile = async (req, res) => {
  const { username } = req.params;

  // Check cache
  const cached = githubCache[username];
  if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
    return res.json(cached.data);
  }

  try {
    const config = {
      headers: {},
    };

    if (process.env.GITHUB_TOKEN) {
      config.headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }

    const [profileRes, reposRes] = await Promise.all([
      axios.get(`https://api.github.com/users/${username}`, config),
      axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`, config),
    ]);

    const data = {
      profile: {
        name: profileRes.data.name,
        avatar: profileRes.data.avatar_url,
        bio: profileRes.data.bio,
        followers: profileRes.data.followers,
        publicRepos: profileRes.data.public_repos,
        html_url: profileRes.data.html_url,
      },
      repos: reposRes.data.map(repo => ({
        id: repo.id,
        name: repo.name,
        html_url: repo.html_url,
        description: repo.description,
        stargazers_count: repo.stargazers_count,
        language: repo.language,
      })),
    };

    // Update cache
    githubCache[username] = {
      data,
      timestamp: Date.now(),
    };

    res.json(data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: 'GitHub user not found' });
    }
    res.status(500).json({ error: error.message });
  }
};
