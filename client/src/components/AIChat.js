import React, { useState, useRef, useEffect } from "react";
import "../styles/ai-chat.css";
import { HiSparkles } from "react-icons/hi2";
export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", content: "Hi Ask me anything." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const boxRef = useRef(null);

  // auto-scroll
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
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "ai", content: data.reply || "No response" },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Error connecting to server." },
      ]);
    }

    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {/* floating button */}
      <div className="ai-btn" onClick={() => setOpen((p) => !p)}>
       <HiSparkles size={22} />
      </div>

      {/* chat box */}
      {open && (
        <div className="ai-chat">
          <div className="ai-header">
            <span>AI Assistant</span>
            <button onClick={() => setOpen(false)}>×</button>
          </div>

          <div className="ai-messages" ref={boxRef}>
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.role}`}>
                {m.content}
              </div>
            ))}

            {loading && <div className="msg ai">Typing...</div>}
          </div>

          <div className="ai-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}