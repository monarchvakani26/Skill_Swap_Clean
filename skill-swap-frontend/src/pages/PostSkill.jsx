// src/pages/PostSkill.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostSkill = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Tech",
    tags: "",
    availability: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", form);
    // TODO: send this data to backend
    navigate("/dashboard");
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-pink-600">Post a New Skill</h1>
      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-xl shadow-md">
        <div>
          <label className="block mb-1 font-medium">Skill Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            required
            className="w-full border px-4 py-2 rounded-lg"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          >
            <option value="Tech">Tech</option>
            <option value="Music">Music</option>
            <option value="Fitness">Fitness</option>
            <option value="Marketing">Marketing</option>
            <option value="Art">Art</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="e.g. frontend, nodejs"
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Availability</label>
          <input
            type="text"
            name="availability"
            value={form.availability}
            onChange={handleChange}
            placeholder="Weekends only / Evening 6-9pm"
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg"
        >
          Submit Skill
        </button>
      </form>
    </div>
  );
};

export default PostSkill;
