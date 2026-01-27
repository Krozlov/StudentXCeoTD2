import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { prompt, history } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is missing");
      return NextResponse.json({ error: "Server config error" }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: "You are SxC Intelligence, the official AI for StudentsxCEOs Jakarta Batch 14."
    });

    const firstUserIndex = history.findIndex((msg: any) => msg.role === "user");
    
    const validHistory = firstUserIndex !== -1 ? history.slice(firstUserIndex) : [];

    const formattedHistory = validHistory.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    const chat = model.startChat({ history: formattedHistory });
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    
    return NextResponse.json({ text: response.text() });
  } catch (error: any) {
    console.error("GEMINI API ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}