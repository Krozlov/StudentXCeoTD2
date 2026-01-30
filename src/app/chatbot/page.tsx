"use client";

import { useState, useRef, useEffect } from "react";
import { useAI } from "@/context/AIContext";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Loader2, ArrowLeft, Bot, User } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function ChatbotPage() {
  const { history, sendMessage, isLoading } = useAI();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, isLoading]);

  const onSend = async () => {
    if (!input.trim() || isLoading) return;
    const currentInput = input;
    setInput("");
    await sendMessage(currentInput);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
      

      {/* Main Chat Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full pt-28 pb-32 px-6">
        <div className="space-y-8">
          {history.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar Icon */}
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                msg.role === "user" ? "bg-slate-900 text-white" : "bg-blue-50 text-blue-600 border border-blue-100"
              }`}>
                {msg.role === "user" ? <User size={20} /> : <Bot size={20} />}
              </div>

              {/* Message Content */}
              <div className={`flex flex-col max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`p-5 rounded-3xl leading-relaxed text-[15px] shadow-sm ${
                  msg.role === "user" 
                  ? "bg-blue-600 text-white rounded-tr-none" 
                  : "bg-slate-50 border border-slate-100 text-slate-800 rounded-tl-none"
                }`}>
                  <div className="prose prose-sm prose-slate max-w-none prose-p:leading-relaxed prose-invert">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 px-2">
                  {msg.role === "user" ? "You" : "SxC Intelligence"}
                </span>
              </div>
            </motion.div>
          ))}
          
          {isLoading && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                <Loader2 size={20} className="animate-spin" />
              </div>
              <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl rounded-tl-none">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* 3. Input Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent">
        <div className="max-w-3xl mx-auto relative">
          <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl shadow-2xl focus-within:border-blue-500 transition-all p-2">
            <input
              type="text"
              value={input}
              disabled={isLoading}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSend()}
              placeholder="Ask SxC Intelligence anything about Batch 14..."
              className="flex-1 px-4 py-3 bg-transparent outline-none text-slate-900 placeholder-slate-400 text-sm"
            />
            <button
              onClick={onSend}
              disabled={isLoading || !input.trim()}
              className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
            </button>
          </div>
          <p className="text-center text-[10px] text-slate-400 mt-3 font-bold uppercase tracking-widest">
            AI Chatbot • StudentsxCEOs Jakarta Batch 14
          </p>
        </div>
      </div>
    </div>
  );
}