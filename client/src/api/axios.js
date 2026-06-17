import axios from 'axios';

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1' ||
  window.location.hostname === '[::1]'
);

let baseURL = 'https://nexkind.onrender.com/api';

if (!isLocalhost) {
  baseURL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'https://nexkind.onrender.com/api';
} else {
  const envURL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL;
  if (envURL && (envURL.includes('localhost') || envURL.includes('127.0.0.1'))) {
    baseURL = envURL;
  }
}

if (baseURL && !baseURL.endsWith('/api') && !baseURL.endsWith('/api/')) {
  baseURL = baseURL.replace(/\/$/, '') + '/api';
}

if (import.meta.env.DEV) {
  console.log(`[API CLIENT] Initialized with baseURL: ${baseURL}`);
}

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
