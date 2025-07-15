import React, { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavbarPrivate from "../components/NavbarPrivate";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const browseSectionRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [messageSearch, setMessageSearch] = useState("");
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const mySkills = user?.skills || [];

  const browseSkills = [
    {
      id: 101,
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      skill: "Guitar Lessons",
      category: "Music",
      rating: 4.5,
    },
    {
      id: 102,
      name: "Priya Sharma",
      avatar: "/placeholder.svg?height=40&width=40",
      skill: "Digital Marketing",
      category: "Marketing",
      rating: 4.8,
    },
    {
      id: 103,
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      skill: "JavaScript Coaching",
      category: "Tech",
      rating: 4.6,
    },
  ];

  const messageUsers = [
    { id: 1, name: "Alex Johnson", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Priya Sharma", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "David Kim", avatar: "/placeholder.svg?height=40&width=40" },
  ];

  const filteredSkills = browseSkills.filter(
    (u) =>
      u.skill.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All" || u.category === selectedCategory)
  );

  if (loading) return <div className="p-6">Loading...</div>;
  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <>
      <NavbarPrivate
        onBrowseClick={() =>
          browseSectionRef.current?.scrollIntoView({ behavior: "smooth" })
        }
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="min-h-screen bg-gray-100 p-8 pt-28">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Welcome, {user.name}! 👋
        </h1>

        {/* Your Posted Skills */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-pink-600">
            Your Posted Skills
          </h2>
          {mySkills.length === 0 ? (
            <p className="text-gray-600">You haven't posted any skills yet.</p>
          ) : (
            <ul className="space-y-4">
              {mySkills.map((skill, idx) => (
                <li key={idx} className="border-b pb-2">
                  <span className="font-medium">{skill}</span>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={() => navigate("/edit-profile")}
            className="mt-4 bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600"
          >
            + Edit Profile & Skills
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <select
            className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Music">Music</option>
            <option value="Marketing">Marketing</option>
            <option value="Tech">Tech</option>
          </select>
        </div>

        {/* Browse Skills */}
        <div ref={browseSectionRef} className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Browse Skills</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {filteredSkills.map((user) => (
              <div key={user.id} className="border rounded-xl p-4 shadow-sm bg-gray-50">
                <div className="flex items-center gap-4 mb-2">
                  <img src={user.avatar} alt={user.name} className="h-12 w-12 rounded-full border" />
                  <div>
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.skill}</p>
                    <p className="text-yellow-500">⭐ {user.rating}</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/profile/${user.id}`)}
                  className="mt-2 text-sm text-white bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-md"
                >
                  View More
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Message Button */}
        <div className="fixed bottom-10 right-12 z-60">
          <button
            onClick={() => setIsMessageOpen(true)}
            className="flex items-center gap-2 bg-white shadow-md px-4 py-2 rounded-full hover:bg-purple-100 text-purple-600 font-semibold"
          >
            💬 Messages
          </button>
        </div>
      </div>

      {/* Message Panel */}
      {isMessageOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-xl h-[90vh] rounded-xl shadow-lg p-6 relative overflow-y-auto">
            <button
              onClick={() => setIsMessageOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl"
            >
              ✖
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-purple-600">Messages</h2>

            {activeChatUser ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={activeChatUser.avatar}
                      alt={activeChatUser.name}
                      className="h-10 w-10 rounded-full border"
                    />
                    <h3 className="text-lg font-semibold">{activeChatUser.name}</h3>
                  </div>
                  <button
                    onClick={() => setActiveChatUser(null)}
                    className="text-sm text-gray-500 hover:text-red-500"
                  >
                    ← Back
                  </button>
                </div>

                <div className="h-[50vh] overflow-y-auto border p-4 mb-4 rounded-lg bg-gray-50 space-y-3">
                  {chatMessages.length === 0 ? (
                    <p className="text-gray-400 text-sm">No messages yet.</p>
                  ) : (
                    chatMessages.map((msg, index) => (
                      <div
                        key={index}
                        className={`max-w-[80%] px-4 py-2 rounded-xl text-sm ${
                          msg.sender === "me"
                            ? "bg-purple-100 ml-auto text-right"
                            : "bg-gray-200 text-left"
                        }`}
                      >
                        {msg.text}
                      </div>
                    ))
                  )}
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newMessage.trim()) return;
                    setChatMessages([...chatMessages, { sender: "me", text: newMessage }]);
                    setNewMessage("");
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow border rounded-lg px-4 py-2"
                  />
                  <button
                    type="submit"
                    className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
                  >
                    Send
                  </button>
                </form>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Search users..."
                  value={messageSearch}
                  onChange={(e) => setMessageSearch(e.target.value)}
                  className="w-full border px-4 py-2 rounded-lg mb-4"
                />
                <div className="space-y-4">
                  {messageUsers
                    .filter((u) =>
                      u.name.toLowerCase().includes(messageSearch.toLowerCase())
                    )
                    .map((user) => (
                      <div
                        key={user.id}
                        onClick={() => {
                          setActiveChatUser(user);
                          setChatMessages([]);
                        }}
                        className="cursor-pointer flex items-center gap-4 border p-3 rounded-lg shadow-sm bg-gray-50 hover:bg-purple-50 transition"
                      >
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-10 w-10 rounded-full border"
                        />
                        <div>
                          <h3 className="font-medium">{user.name}</h3>
                          <p className="text-sm text-gray-400">Click to chat</p>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;




