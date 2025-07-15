"use client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarPrivate from "../components/NavbarPrivate";
import axios from "../utils/axiosInstance";

const EditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    avatar: null,
    avatarPreview: "/placeholder.svg",
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/auth/me");
        setFormData((prev) => ({
          ...prev,
          name: res.data.user.name,
          bio: res.data.user.bio || "",
          avatarPreview: res.data.user.avatar || "/placeholder.svg",
        }));
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, avatar: file }));
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, avatarPreview: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("bio", formData.bio);
      if (formData.avatar) {
        data.append("avatar", formData.avatar);
      }

      const res = await axios.put("/auth/update-profile", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Profile updated");
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Profile update failed:", err);
      alert("Profile update failed");
    }
  };

  return (
    <>
      <NavbarPrivate />
      <div className="max-w-3xl mx-auto mt-24 p-6 bg-white shadow-md rounded-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="text-sm bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600"
            >
              Edit
            </button>
          ) : null}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <img
              src={formData.avatarPreview}
              alt="Avatar"
              className="h-24 w-24 rounded-full border object-cover"
            />
            {editing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="text-sm"
              />
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              disabled={!editing}
              className="w-full border rounded-md px-4 py-2"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Bio</label>
            <textarea
              name="bio"
              disabled={!editing}
              className="w-full border rounded-md px-4 py-2"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
            ></textarea>
          </div>

          {editing && (
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-md"
            >
              Save Changes
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default EditProfile;
