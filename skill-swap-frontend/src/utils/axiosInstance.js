// src/axiosinstance.js

import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // ✅ Use baseURL, not BASE_URL
  withCredentials: true,
});



export default instance;