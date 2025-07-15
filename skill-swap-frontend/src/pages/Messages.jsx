// src/pages/Messages.jsx
import { useState, useEffect } from "react";
import { VideoIcon, CalendarIcon } from "../components/icons"; // Add icons in your icon file
import NavbarPrivate from "../components/NavbarPrivate";
import socket from "../utils/socket"; 
const dummyUsers = [
  { id: 1, name: "Alex Johnson", avatar: "/avatar1.png", lastMessage: "See you tomorrow!" },
  { id: 2, name: "Priya Sharma", avatar: "/avatar2.png", lastMessage: "Thanks for the session." },
  { id: 3, name: "David Kim", avatar: "/avatar3.png", lastMessage: "Can we reschedule?" },
];

const suggestedUsers = [
  { id: 4, name: "Aisha Khan", avatar: "/avatar4.png" },
  { id: 5, name: "Carlos Rivera", avatar: "/avatar5.png" },
];

export default function Messages() {
  const [activeUser, setActiveUser] = useState(dummyUsers[0]);
  const [messages, setMessages] = useState([
    { sender: "me", text: "Hey, are we meeting today?" },
    { sender: "them", text: "Yes, at 4PM." },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    setMessages([...messages, { sender: "me", text: newMessage }]);
    setNewMessage("");
  };



  useEffect(() => {
    // Listen for incoming messages
    socket.on("receive-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });
  
    // Optional: auto-join a room later
    return () => socket.off("receive-message");
  }, []);
  
  return (
    <>
      <NavbarPrivate />
      <div className="flex h-[calc(100vh-80px)] mt-20">
        {/* Sidebar */}
        <div className="w-1/4 border-r p-4 overflow-y-auto bg-white">
          <h3 className="text-lg font-semibold mb-4 text-pink-600">Recent Chats</h3>
          {dummyUsers.map((user) => (
            <div
              key={user.id}
              className={`flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-100 ${
                activeUser?.id === user.id ? "bg-gray-100" : ""
              }`}
              onClick={() => setActiveUser(user)}
            >
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border" />
              <div>
                <h4 className="font-semibold">{user.name}</h4>
                <p className="text-sm text-gray-500">{user.lastMessage}</p>
              </div>
            </div>
          ))}

          <h3 className="text-lg font-semibold mt-6 text-indigo-600">Suggested</h3>
          {suggestedUsers.map((user) => (
            <div key={user.id} className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded">
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border" />
              <h4 className="font-medium">{user.name}</h4>
            </div>
          ))}
        </div>

        {/* Chat Panel */}
        <div className="w-3/4 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b px-6 py-4 bg-gray-50">
            <div className="flex items-center gap-3">
              <img
                src={activeUser?.avatar}
                alt={activeUser?.name}
                className="w-10 h-10 rounded-full border"
              />
              <h3 className="text-lg font-semibold">{activeUser?.name}</h3>
            </div>
            <div className="flex gap-4">
              <button title="Video Call" className="text-gray-600 hover:text-pink-600">
                <VideoIcon className="w-6 h-6" />
              </button>
              <button title="Arrange Meeting" className="text-gray-600 hover:text-indigo-600">
                <CalendarIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-grow overflow-y-auto p-6 bg-gray-50 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[70%] px-4 py-2 rounded-xl text-sm ${
                  msg.sender === "me"
                    ? "bg-purple-100 ml-auto text-right"
                    : "bg-gray-200 text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="border-t flex p-4 gap-3 bg-white">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow border rounded-lg px-4 py-2"
            />
            <button
              type="submit"
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
