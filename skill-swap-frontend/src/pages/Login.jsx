import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Keep Link and useNavigate
import axios from "../utils/axiosInstance";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Get the backend URL from environment variables
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/api/auth/login`, { email, password });
      console.log("Login successful:", res.data);
      if (res.data.user) {
        console.log("Attempting to navigate to /dashboard");
        navigate("/dashboard");
      
      } else {
        console.warn("Login succeeded, but user data was not returned.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      // Using a custom modal or toast for alerts instead of window.alert()
      console.error("Login failed:", err.response?.data?.message || err.message);
      // You might want to display a more user-friendly message here, e.g., using a state for a message box.
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600"
          >
            Login
          </button>
          <div className="flex justify-center mt-4 gap-4">
            {/* Corrected OAuth links to use the VITE_BACKEND_URL */}
            <a href={`${backendUrl}/api/auth/google`} className="inline-block">
              <img src="/google.svg" alt="Google Login" className="h-8 cursor-pointer" />
            </a>
            {/* Assuming LinkedIn OAuth path is /api/auth/linkedin */}
            <a href={`${backendUrl}/api/auth/linkedin`} className="inline-block">
              <img src="/linkedin.svg" alt="LinkedIn Login" className="h-8 cursor-pointer" />
            </a>
            {/* Assuming Facebook OAuth path is /api/auth/facebook */}
            <a href={`${backendUrl}/api/auth/facebook`} className="inline-block">
              <img src="/facebook.svg" alt="Facebook Login" className="h-8 cursor-pointer" />
            </a>
          </div>
        </form>
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-pink-600 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
