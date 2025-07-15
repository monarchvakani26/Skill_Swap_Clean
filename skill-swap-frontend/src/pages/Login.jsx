import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import axios from "../utils/axiosInstance";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      console.log("Login successful:", res.data);
      if (res.data.user) {
        navigate("/dashboard");
      } else {
        alert("Unexpected response");
      }
      
    } catch (err) {
      console.error("Login Error:", err);
      alert("Login failed: " + (err.response?.data?.message || err.message));
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
  <a href="http://localhost:5000/api/auth/google">
    <img src="/google.svg" alt="Google Login" className="h-8 cursor-pointer" />
  </a>
  <a href="http://localhost:5000/auth/linkedin">
    <img src="/linkedin.svg" alt="LinkedIn Login" className="h-8 cursor-pointer" />
  </a>
  <a href="http://localhost:5000/api/auth/facebook">
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
