import axios from "axios";

const API = axios.create({
 BASE_URL : import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export default instance;
