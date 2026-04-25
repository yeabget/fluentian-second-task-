import React, { useState, useRef, useEffect, useContext } from "react";
import "../styles/ai-chat.css";
import { FaTimes } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import API from "../api/axios";

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", content: "Hi! Ask me anything about your courses or learning path." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const boxRef = useRef(null);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [messages, open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      // Use the AI endpoint for chat
      const res = await API.post("/ai/chat", { message: text });
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: res.data.reply || "I'm here to help with your learning journey!" },
      ]);
    } catch (error) {
      console.error("AI chat error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Sorry, I'm having trouble connecting. Please try again." },
      ]);
    }

    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      <div className="ai-btn" onClick={() => setOpen((p) => !p)}>
        <HiSparkles size={22} />
      </div>

      {open && (
        <div className="ai-chat">
          <div className="ai-header">
            <span>AI Learning Assistant</span>
            <button onClick={() => setOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="ai-messages" ref={boxRef}>
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.role}`}>
                {m.content}
              </div>
            ))}
            {loading && <div className="msg ai">Thinking...</div>}
          </div>

          <div className="ai-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about courses, lessons, or learning tips..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}