// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Corrected API endpoint: Added /api prefix
        const res = await axios.get("/api/auth/me"); 
        setUser(res.data.user);
      } catch (err) {
        console.log("Not authenticated or failed to fetch user data:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {/* Only render children when loading is complete */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
