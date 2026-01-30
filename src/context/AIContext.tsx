"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Message Structure Definition
interface Message {
  role: "user" | "assistant";
  text: string;
}

interface AIContextType {
  history: Message[];
  sendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<Message[]>([
    { 
      role: "assistant", 
      text: "Hi! I'm the SxC Intelligence. How can I help you learn about StudentsxCEOs Jakarta Batch 14 today?" 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message to the UI immediately
    const userMsg: Message = { role: "user", text };
    setHistory((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: text,
          history: history 
        }),
      });

      const data = await response.json();

      if (data.text) {
        setHistory((prev) => [...prev, { role: "assistant", text: data.text }]);
      } else {
        throw new Error("No response from AI");
      }
    } catch (error) {
      console.error("AI Error:", error);
      setHistory((prev) => [
        ...prev, 
        { role: "assistant", text: "Sorry, I'm having trouble connecting to my brain right now. Please try again later!" }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AIContext.Provider value={{ history, sendMessage, isLoading }}>
      {children}
    </AIContext.Provider>
  );
}

// 4. Custom hook to make it easy to use in components
export function useAI() {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error("useAI must be used within an AIProvider");
  }
  return context;
}