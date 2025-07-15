import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

   const navigate = useNavigate()

   const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", { name, email, password });
      console.log("Registration successful:", res.data);
      if (res.status === 201) {
        navigate("/login");
      } else {
        alert("Registration returned unexpected status.");
      }
    } catch (err) {
      console.error("Register Error:", err);
      alert("Registration failed: " + (err.response?.data?.message || err.message));
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Create Account</h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <button onClick={() => navigate('/dashboard')}
            type="submit"
            className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-600 font-medium hover:underline">
            Sign In
          </Link>
        </p>

        
      </div>
    </div>
  );
}

export default Register;
