import React, { useState, useRef, useEffect } from "react";
import axios from "../api/axios";
import { motion } from "framer-motion";
import { PaperAirplaneIcon, SparklesIcon } from "@heroicons/react/24/solid";

export default function AiChat() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! I'm your AI Mutual Fund Advisor. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("/ai/chat", {
        messages: [...messages, userMessage],
      });

      const reply = { sender: "ai", text: res.data.reply };
      setMessages((prev) => [...prev, reply]);

    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Sorry, I couldn't respond. Please try again." },
      ]);
    }

    setLoading(false);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="px-6 py-8 h-[90vh] flex flex-col">
      <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-emerald-300 bg-clip-text text-transparent">
        AI Chat Advisor
      </h1>

      {/* CHAT WINDOW */}
      <div className="flex-1 overflow-y-auto p-4 rounded-2xl glass-tile border border-cyan-500/20 space-y-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: msg.sender === "ai" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`max-w-[75%] p-3 rounded-xl text-sm ${
              msg.sender === "ai"
                ? "bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 border border-cyan-400/20 text-cyan-200"
                : "bg-cyan-500 text-black self-end"
            }`}
          >
            {msg.text}
          </motion.div>
        ))}

        {loading && (
          <div className="text-cyan-300 animate-pulse flex gap-2 items-center">
            <SparklesIcon className="h-5 w-5" /> AI is typing...
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* INPUT BAR */}
      <div className="mt-4 flex gap-3">
        <input
          type="text"
          className="flex-1 p-3 rounded-xl bg-black/30 border border-cyan-500/30 text-gray-200"
          placeholder="Ask anything about mutual funds, SIP, risk, portfolio..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          onClick={sendMessage}
          className="px-5 py-3 bg-gradient-to-r from-cyan-400 to-emerald-400 
                     rounded-xl text-black font-bold flex items-center gap-2"
        >
          Send <PaperAirplaneIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
