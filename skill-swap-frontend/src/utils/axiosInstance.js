// src/utils/axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  // Base URL for your backend API
  // This will be replaced by VITE_BACKEND_URL from your .env or Vercel environment variables
  baseURL: import.meta.env.VITE_BACKEND_URL,
  // IMPORTANT: This tells Axios to send cookies (like session cookies) with cross-origin requests.
  withCredentials: true,
});

export default instance;
