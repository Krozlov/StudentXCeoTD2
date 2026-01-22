"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare, X, Maximize2, Send } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { role: "assistant", text: "Hi! How can I help you with StudentsxCEOs Jakarta today?" }
  ]);

  const handleFullScreen = () => {
    setIsOpen(false);
    router.push('/ai');
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add the user's message to the history
    const newHistory = [...history, { role: "user", text: input }];
    setHistory(newHistory);
    setInput("");

    // Simulate an AI response (Still placeholder)
    setTimeout(() => {
      setHistory((prev) => [
        ...prev,
        { 
          role: "assistant", 
          text: "I'm currently in 'Demo Mode'. Soon, I will connect to a real brain to answer your questions about SXC Jakarta!" 
        }
      ]);
    }, 1000);
  };

  return (
    <div className="relative">
      {/* Header Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-bold transition-all active:scale-95 shadow-md"
      >
        {isOpen ? <X size={18} /> : <MessageSquare size={18} />}
        <span>{isOpen ? "Close" : "Ask AI"}</span>
      </button>

      {/* Chatbot Popup */}
      {isOpen && (
        <div className="absolute right-0 mt-4 w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden text-slate-900 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Popup Header */}
          <div className="bg-slate-900 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="font-bold text-xs uppercase tracking-wider">SxC Intelligence</span>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={handleFullScreen} 
                className="hover:bg-white/10 p-1.5 rounded-lg transition-colors"
                title="Full Screen Mode"
              >
                <Maximize2 size={16} />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-1.5 rounded-lg transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {history.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-xl text-sm ${
                  msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..."
              className="flex-1 bg-slate-100 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
            />
            <button 
              onClick={handleSend}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}