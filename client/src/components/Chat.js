import React, { useState, useContext, useEffect, useRef } from "react";
import "../styles/chat.css";
import { FaPaperPlane, FaUserCircle, FaPaperclip } from "react-icons/fa";
import { AuthContext } from "./AuthContext";
import { NotificationContext } from "./Notification";
import API from "../api/axios";

export default function ChatPage() {
  const { user } = useContext(AuthContext);
  const { addNotification } = useContext(NotificationContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const wsRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await API.get("/chat/conversations");
        setConversations(res.data);
      } catch (err) {
        console.error("Failed to fetch conversations:", err);
      }
    };
    fetchConversations();
  }, []);

  // Fetch messages when a user is selected
  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/chat/${selectedUser.user_id}/messages`);
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
    const token = localStorage.getItem("token");
    if (token && !wsRef.current) {
      wsRef.current = new WebSocket(
        `wss://ai-powered-learning-platform-7qs7.onrender.com/chat/ws/${selectedUser.user_id}?token=${token}`
      );

      wsRef.current.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        setMessages(prev => [...prev, newMessage]);
        addNotification(`New message from ${selectedUser.full_name}`);
      };

      wsRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [selectedUser, addNotification]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedUser) return;
    addNotification("File upload feature coming soon!");
  };

  const handleSend = async () => {
    if (!input.trim() || !selectedUser) return;

    const newMessage = {
      receiver_id: selectedUser.user_id,
      message: input,
      file_url: null
    };

    try {
      const res = await API.post("/chat/send", newMessage);
      setMessages(prev => [...prev, res.data]);
      setInput("");
      addNotification("Message sent");
    } catch (err) {
      console.error("Failed to send message:", err);
      addNotification("Failed to send message");
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        <h1>Course <span>Discussion</span></h1>
        <p>Ask questions, share files, learn together</p>
      </div>

      <div className="chat-container">
        <div className="chat-sidebar">
          <h3>Conversations</h3>
          {conversations.length === 0 ? (
            <p className="no-conversations">No conversations yet</p>
          ) : (
            conversations.map(conv => (
              <div
                key={conv.user_id}
                className={`chat-user ${selectedUser?.user_id === conv.user_id ? "active" : ""}`}
                onClick={() => setSelectedUser(conv)}
              >
                <FaUserCircle className="avatar" />
                <div>
                  <h4>{conv.full_name}</h4>
                  <small>{conv.last_message?.substring(0, 30)}</small>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="chat-main">
          {!selectedUser ? (
            <div className="no-selection">
              <FaUserCircle size={48} />
              <p>Select a conversation to start chatting</p>
            </div>
          ) : (
            <>
              <div className="chat-messages">
                {loading ? (
                  <p>Loading messages...</p>
                ) : messages.length === 0 ? (
                  <p className="no-messages">No messages yet. Say hello!</p>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`chat-message ${msg.sender_id === user?.id ? "user" : "other"}`}
                    >
                      <div className="bubble">
                        <p>{msg.message}</p>
                        <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="chat-input-area">
                <label className="file-upload">
                  <FaPaperclip />
                  <input type="file" hidden onChange={handleFile} />
                </label>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                />
                <button onClick={handleSend}>
                  <FaPaperPlane />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}