import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HeroSection from "./components/HeroSection";
import Dashboard from "./pages/Dashboard";
import BrowseSkills from "./pages/BrowseSkills";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import PostSkill from "./pages/PostSkill";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HeroSection />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/browse"
        element={
          <PrivateRoute>
            <BrowseSkills />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile/:id"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/post-skill"
        element={
          <PrivateRoute>
            <PostSkill />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
