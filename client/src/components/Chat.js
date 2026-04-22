import React, { useState, useContext } from "react";
import "../styles/chat.css";

import { FaPaperPlane, FaUserCircle, FaPaperclip } from "react-icons/fa";

import { AuthContext } from "../components/AuthContext";
import { NotificationContext } from "../components/Notification";

export default function ChatPage() {
  const { user } = useContext(AuthContext);
  const { addNotification } = useContext(NotificationContext);

  const [messages, setMessages] = useState([
    { id: 1, sender: "system", text: "Welcome to Course Discussion Room 🚀" },
    { id: 2, sender: "ai", text: "Ask anything about your courses!" },
  ]);

  const [input, setInput] = useState("");

  // 📎 FILE UPLOAD
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newFileMessage = {
      id: Date.now(),
      sender: "user",
      file: URL.createObjectURL(file),
      fileName: file.name,
      fileType: file.type,
    };

    setMessages((prev) => [...prev, newFileMessage]);

    addNotification("📎 File sent in chat");
  };

  // 💬 SEND MESSAGE
  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    addNotification("💬 New chat message sent");

    // fake AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: "Nice question 👍 Backend/AI integration coming soon.",
        },
      ]);
    }, 800);
  };

  return (
    <div className="chat-wrapper">

      {/* HEADER */}
      <div className="chat-header">
        <h2>Course <span>Discussion</span></h2>
        <p>Ask questions, share files, learn together</p>
      </div>

      {/* CHAT BOX */}
      <div className="chat-box">

        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message ${msg.sender}`}>

            {/* AVATAR */}
            <div className="avatar-wrapper">
              {msg.sender === "user" ? (
                user?.image ? (
                  <img src={user.image} className="avatar-img" alt="me" />
                ) : (
                  <FaUserCircle className="avatar" />
                )
              ) : (
                <FaUserCircle className="avatar ai" />
              )}
            </div>

            {/* MESSAGE */}
            <div className="bubble">

              {msg.text && <p>{msg.text}</p>}

              {msg.file && (
                <div className="file-box">
                  {msg.fileType.startsWith("image") ? (
                    <img src={msg.file} className="chat-image" alt="upload" />
                  ) : (
                    <a href={msg.file} download className="file-link">
                      📄 {msg.fileName}
                    </a>
                  )}
                </div>
              )}

            </div>

          </div>
        ))}

      </div>

      {/* INPUT */}
      <div className="chat-input">

        {/* FILE */}
        <label className="file-upload">
          <FaPaperclip />
          <input type="file" hidden onChange={handleFile} />
        </label>

        {/* TEXT INPUT */}
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {/* SEND */}
        <button onClick={handleSend}>
          <FaPaperPlane />
        </button>

      </div>

    </div>
  );
}