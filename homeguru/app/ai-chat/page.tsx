"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  PaperPlaneRight, 
  ArrowUp, 
  Sparkle,
  FileText,
  Question,
  ClockCounterClockwise,
  Plus
} from "@phosphor-icons/react";

export default function GuruAIPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setMessage("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I'm Guru AI, your learning assistant! I can help you with your studies, answer questions, and provide personalized guidance. How can I assist you today?" 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestions = [
    "Review you weak areas",
    "Challenging topics review",
    "Generate quiz on kinematics"
  ];

  return (
    <div className="flex h-screen bg-[#FAFAFA]">
      {/* LEFT SIDEBAR */}
      <aside className="bg-[#F9FAFB] border-r border-[#E5E7EB] flex flex-col px-3 py-5 shrink-0 h-screen overflow-y-auto transition-all duration-300 ease-in-out w-[260px] hidden xl:flex fixed left-0 top-0 z-10">
        <div className="flex items-center justify-between mb-8 px-2 transition-all duration-300">
          <img alt="HomeGuru Logo" loading="lazy" width="90" height="28" className="object-contain" src="/images/homeguru.png" />
        </div>
        
        <nav className="w-full flex-1 transition-all duration-300">
          <div className="mb-6">
            <h3 className="text-[#9CA3AF] text-[10.5px] font-medium tracking-widest uppercase mb-2 px-3">Main</h3>
            <ul className="flex flex-col gap-0.5">
              <li>
                <a className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[14px] font-normal transition-all duration-150 text-[#374151] hover:bg-[#F3F4F6] hover:text-[#111827]" href="/">
                  <span className="flex items-center justify-center shrink-0 opacity-60">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 256 256"><path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"></path></svg>
                  </span>
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[14px] font-normal transition-all duration-150 text-[#374151] hover:bg-[#F3F4F6] hover:text-[#111827]" href="/schedule">
                  <span className="flex items-center justify-center shrink-0 opacity-60">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 256 256"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-64-56a16,16,0,1,1-16-16A16,16,0,0,1,144,152Z"></path></svg>
                  </span>
                  <span>My Schedule</span>
                </a>
              </li>
              <li>
                <a className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-150 bg-[#F3F4F6] text-[#111827]" href="/ai-chat">
                  <span className="flex items-center justify-center shrink-0 opacity-60">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 256 256"><path d="M230.15,70.54,185.46,25.86a20,20,0,0,0-28.28,0L33.86,149.17A19.86,19.86,0,0,0,28,163.31V208a20,20,0,0,0,20,20H92.69a19.86,19.86,0,0,0,14.14-5.86L230.15,98.82a20,20,0,0,0,0-28.28ZM91,204H52V165l84-84,39,39ZM192,103,153,64l18.34-18.34,39,39Z"></path></svg>
                  </span>
                  <span>Guru AI</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-[#9CA3AF] text-[10.5px] font-medium tracking-widest uppercase mb-2 px-3">Learning</h3>
            <ul className="flex flex-col gap-0.5">
              <li>
                <a className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[14px] font-normal transition-all duration-150 text-[#374151] hover:bg-[#F3F4F6] hover:text-[#111827]" href="/session-history">
                  <span className="flex items-center justify-center shrink-0 opacity-60">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 256 256"><path d="M136,80v43.47l36.12,21.67a8,8,0,0,1-8.24,13.72l-40-24A8,8,0,0,1,120,128V80a8,8,0,0,1,16,0Zm-8-48A95.44,95.44,0,0,0,60.08,60.15C52.81,67.51,46.35,74.59,40,82V64a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H72a8,8,0,0,0,0-16H49c7.15-8.42,14.27-16.35,22.39-24.57a80,80,0,1,1,1.66,114.75,8,8,0,1,0-11,11.64A96,96,0,1,0,128,32Z"></path></svg>
                  </span>
                  <span>Session History</span>
                </a>
              </li>
              <li>
                <a className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[14px] font-normal transition-all duration-150 text-[#374151] hover:bg-[#F3F4F6] hover:text-[#111827]" href="/assignment">
                  <span className="flex items-center justify-center shrink-0 opacity-60">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 256 256"><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z"></path></svg>
                  </span>
                  <span>Assignment</span>
                </a>
              </li>
              <li>
                <a className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[14px] font-normal transition-all duration-150 text-[#374151] hover:bg-[#F3F4F6] hover:text-[#111827]" href="/chat">
                  <span className="flex items-center justify-center shrink-0 opacity-60">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 256 256"><path d="M232.07,186.76a80,80,0,0,0-62.5-114.17A80,80,0,1,0,23.93,138.76l-7.27,24.71a16,16,0,0,0,19.87,19.87l24.71-7.27a80.39,80.39,0,0,0,25.18,7.35,80,80,0,0,0,108.34,40.65l24.71,7.27a16,16,0,0,0,19.87-19.86ZM62,159.5a8.28,8.28,0,0,0-2.26.32L32,168l8.17-27.76a8,8,0,0,0-.63-6,64,64,0,1,1,26.26,26.26A8,8,0,0,0,62,159.5Zm153.79,28.73L224,216l-27.76-8.17a8,8,0,0,0-6,.63,64.05,64.05,0,0,1-85.87-24.88A79.93,79.93,0,0,0,174.7,89.71a64,64,0,0,1,41.75,92.48A8,8,0,0,0,215.82,188.23Z"></path></svg>
                  </span>
                  <span>Messages</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col xl:ml-[260px]">
        {/* Header */}
        <header className="h-[60px] bg-white border-b border-[#E5E7EB] flex items-center justify-between px-6">
          <h1 className="text-[18px] font-bold text-[#111]">AI Mentor</h1>
          <div className="flex items-center gap-3">
            <button className="h-9 px-4 rounded-lg bg-white border border-[#E5E7EB] text-[13px] font-semibold text-[#111] hover:bg-[#F5F5F5] transition-colors flex items-center gap-2">
              <Plus size={16} weight="bold" />
              New Chat
            </button>
            <button className="w-9 h-9 rounded-lg border border-[#E5E7EB] flex items-center justify-center hover:bg-[#F5F5F5] transition-colors">
              <ClockCounterClockwise size={18} />
            </button>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center px-6">
              <h2 className="text-[32px] font-normal text-[#999] mb-12">
                Welcome back, <span className="text-[#111] font-semibold">Ravi</span>
              </h2>

              {/* Input Area */}
              <div className="w-full max-w-[700px]">
                <div className="relative bg-white rounded-2xl border border-[#E5E7EB] shadow-sm">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="What's on your mind?"
                    className="w-full px-5 py-4 pr-14 rounded-2xl text-[14px] resize-none focus:outline-none"
                    rows={1}
                    style={{ minHeight: "56px" }}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className="absolute right-3 bottom-3 w-10 h-10 rounded-full bg-[#6B7280] hover:bg-[#4B5563] disabled:bg-[#E5E7EB] disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  >
                    <ArrowUp size={20} weight="bold" className="text-white" />
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 mt-3 px-1">
                  <button className="px-3 py-1.5 rounded-lg border border-[#E5E7EB] bg-white text-[12px] font-medium text-[#666] hover:bg-[#F5F5F5] transition-colors flex items-center gap-1.5">
                    <FileText size={14} />
                    Notes
                  </button>
                  <button className="px-3 py-1.5 rounded-lg border border-[#E5E7EB] bg-white text-[12px] font-medium text-[#666] hover:bg-[#F5F5F5] transition-colors flex items-center gap-1.5">
                    <Question size={14} />
                    Quiz
                  </button>
                </div>

                {/* Suggestions */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {suggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => setMessage(suggestion)}
                      className="px-4 py-2.5 rounded-xl text-[13px] font-medium transition-colors"
                      style={{
                        backgroundColor: i === 0 ? "#FEE2E2" : i === 1 ? "#FEF3C7" : "#DBEAFE",
                        color: i === 0 ? "#991B1B" : i === 1 ? "#92400E" : "#1E3A8A"
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-[800px] mx-auto px-6 py-8">
              {messages.map((msg, i) => (
                <div key={i} className={`mb-6 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] ${msg.role === "user" ? "bg-[#F97316] text-white" : "bg-white border border-[#E5E7EB] text-[#111]"} rounded-2xl px-5 py-3`}>
                    <p className="text-[14px] leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="mb-6 flex justify-start">
                  <div className="bg-white border border-[#E5E7EB] rounded-2xl px-5 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-[#999] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-[#999] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-[#999] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Bottom Input (when chat started) */}
        {messages.length > 0 && (
          <div className="bg-white border-t border-[#E5E7EB] px-6 py-4">
            <div className="max-w-[800px] mx-auto">
              <div className="relative bg-white rounded-2xl border border-[#E5E7EB]">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full px-5 py-4 pr-14 rounded-2xl text-[14px] resize-none focus:outline-none"
                  rows={1}
                  style={{ minHeight: "56px" }}
                />
                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="absolute right-3 bottom-3 w-10 h-10 rounded-full bg-[#6B7280] hover:bg-[#4B5563] disabled:bg-[#E5E7EB] disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                >
                  <ArrowUp size={20} weight="bold" className="text-white" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
