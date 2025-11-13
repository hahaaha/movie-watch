import axios from 'axios';

export const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
});

request.interceptors.response.use(
  response => {
    let data = response.data;
    // 防止object变成array
    if (Array.isArray(data)) {
      data = data[0];
    }
    return { ...response, data };
  },
  error => {
    return Promise.reject(error);
  }
);
