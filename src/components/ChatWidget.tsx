"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Maximize2, Send, Sparkles, Loader2 } from "lucide-react";
import { useAI } from "@/context/AIContext";
import ReactMarkdown from "react-markdown"; 

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const router = useRouter();

  const { history, sendMessage, isLoading } = useAI();

  const handleFullScreen = () => {
    setIsOpen(false);
    router.push('/chatbot');
  };

  const onSend = async () => {
    if (!input.trim() || isLoading) return;
    const currentInput = input;
    setInput("");
    await sendMessage(currentInput);
  };

  return (
    <div className="relative">
      {/* Header Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-lg shadow-blue-200 overflow-hidden"
      >
        {!isOpen && (
          <span className="absolute inset-0 rounded-xl bg-blue-400 animate-ping opacity-20 pointer-events-none"></span>
        )}
        {isOpen ? <X size={18} /> : <Sparkles size={18} className="animate-pulse" />}
        <span className="relative">{isOpen ? "Close" : "Ask AI"}</span>
      </button>

      {/* Chatbot Popup */}
      {isOpen && (
        <div className="absolute right-0 mt-6 w-[380px] h-[550px] bg-white/85 backdrop-blur-2xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-slate-200/50 flex flex-col overflow-hidden text-slate-900 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
          
          {/* Header */}
          <div className="bg-slate-950 p-5 text-white flex justify-between items-center">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span className="font-black text-[10px] uppercase tracking-[0.2em] text-blue-400">SxC Intelligence</span>
              </div>
              <span className="text-xs text-slate-400 mt-0.5">Batch 14 Knowledge Base</span>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={handleFullScreen} className="hover:bg-white/10 p-2 rounded-xl transition-colors text-slate-300">
                <Maximize2 size={16} />
              </button>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-xl transition-colors text-slate-300">
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-transparent">
            {history.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none font-medium' 
                  : 'bg-white/90 border border-slate-100 text-slate-700 rounded-tl-none'
                }`}>
                  {/* Markdown Text Rendering */}
                  <div className="prose prose-sm prose-slate max-w-none prose-p:leading-relaxed prose-li:my-0">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/90 border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm">
                  <Loader2 className="animate-spin text-blue-600" size={18} />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white/40 border-t border-slate-100/50 flex gap-2">
            <input 
              type="text"
              value={input}
              disabled={isLoading}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSend()}
              placeholder={isLoading ? "SxC is thinking..." : "Ask me anything..."}
              className="flex-1 bg-white/50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 placeholder-slate-400 disabled:opacity-50"
            />
            <button 
              onClick={onSend}
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 disabled:bg-slate-400"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}