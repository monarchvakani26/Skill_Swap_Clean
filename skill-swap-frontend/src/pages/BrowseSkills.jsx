"use client";
import React from "react";

const mockSkills = [
  {
    id: 1,
    title: "Guitar Lessons",
    description: "Learn acoustic and electric guitar from scratch.",
    user: "Jane Doe",
    location: "Delhi, India",
  },
  {
    id: 2,
    title: "Web Development",
    description: "Teach HTML, CSS, JavaScript and React basics.",
    user: "John Smith",
    location: "Mumbai, India",
  },
  {
    id: 3,
    title: "Photography",
    description: "Basics of mobile and DSLR photography.",
    user: "Priya Kumar",
    location: "Bangalore, India",
  },
];

const BrowseSkills = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-16">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Browse Available Skills
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockSkills.map((skill) => (
          <div
            key={skill.id}
            className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-pink-600 mb-2">
              {skill.title}
            </h3>
            <p className="text-gray-700 mb-2">{skill.description}</p>
            <p className="text-sm text-gray-500">
              By <span className="font-medium">{skill.user}</span> •{" "}
              {skill.location}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseSkills;
