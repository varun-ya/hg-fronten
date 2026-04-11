"use client";

import { useState, useRef, useEffect } from "react";
import {
  Sparkle, PaperPlaneRight, Notebook, Brain, Clock,
  Lightning, BookOpen, MathOperations, Atom, Flask,
  Globe, Pencil, Code, ChartLine, List, CaretRight,
  Paperclip, Image, Camera, File, X,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import { studentData } from "@/data/studentData";
import AnimatedHoot from "@/components/AnimatedHoot";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  attachments?: { type: "image" | "document"; name: string; url: string }[];
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

const SUGGESTION_PROMPTS = [
  { 
    text: "Explain a concept", 
    subtitle: "Break down any topic simply",
    icon: Flask, 
    color: "#10B981",
    query: "Explain photosynthesis in simple terms"
  },
  { 
    text: "Solve a problem", 
    subtitle: "Step-by-step math help",
    icon: MathOperations, 
    color: "#3B82F6",
    query: "Help me solve quadratic equations"
  },
  { 
    text: "Quiz me", 
    subtitle: "Test your knowledge",
    icon: Brain, 
    color: "#8B5CF6",
    query: "Quiz me on Indian history"
  },
  { 
    text: "Summarize a chapter", 
    subtitle: "Quick revision notes",
    icon: BookOpen, 
    color: "#F97316",
    query: "Summarize the chapter on cell biology"
  },
];

export default function GuruAIPage() {
  const router = useRouter();
  const { toggle, isMobile } = useSidebar();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [attachments, setAttachments] = useState<{ type: "image" | "document"; name: string; url: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages]);

  const createNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
    };
    setSessions([newSession, ...sessions]);
    setCurrentSession(newSession);
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() && attachments.length === 0) return;

    let session = currentSession;
    if (!session) {
      session = {
        id: Date.now().toString(),
        title: content.slice(0, 30) + (content.length > 30 ? "..." : ""),
        messages: [],
        createdAt: new Date(),
      };
      setSessions([session, ...sessions]);
      setCurrentSession(session);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
      attachments: attachments.length > 0 ? [...attachments] : undefined,
    };

    const updatedMessages = [...session.messages, userMessage];
    const updatedSession = { ...session, messages: updatedMessages };
    setCurrentSession(updatedSession);
    setSessions(sessions.map(s => s.id === session.id ? updatedSession : s));
    setInputValue("");
    setAttachments([]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(content),
        timestamp: new Date(),
      };
      const finalMessages = [...updatedMessages, aiMessage];
      const finalSession = { ...updatedSession, messages: finalMessages };
      setCurrentSession(finalSession);
      setSessions(sessions.map(s => s.id === session.id ? finalSession : s));
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Photosynthesis explanation
    if (lowerQuery.includes("photosynthesis")) {
      return "Photosynthesis is how plants make food! 🌱\n\nThey use sunlight, water (H₂O), and carbon dioxide (CO₂) to create glucose (sugar) and oxygen.\n\nThe formula is:\n6CO₂ + 6H₂O + sunlight → C₆H₁₂O₆ + 6O₂\n\nThink of it like a kitchen where:\n• Sunlight = Energy source\n• Water + CO₂ = Ingredients\n• Glucose = Food produced\n• Oxygen = Waste product (which we breathe!)\n\nWould you like me to explain any specific part in more detail?";
    }
    
    // Quadratic equations
    if (lowerQuery.includes("quadratic")) {
      return "Let me help you with quadratic equations! 📊\n\nA quadratic equation has the form:\nax² + bx + c = 0\n\nTo solve it, use the quadratic formula:\nx = (-b ± √(b² - 4ac)) / 2a\n\n**Example:** Solve x² - 5x + 6 = 0\n\nHere: a=1, b=-5, c=6\n\nStep 1: Calculate discriminant\nb² - 4ac = 25 - 24 = 1\n\nStep 2: Apply formula\nx = (5 ± 1) / 2\nx = 3 or x = 2\n\nWant to try solving one together?";
    }
    
    // Quiz
    if (lowerQuery.includes("quiz") || lowerQuery.includes("history")) {
      return "Great! Let's test your knowledge with a quick quiz! 📝\n\n**Question 1:** Who was the first Prime Minister of India?\n\nA) Mahatma Gandhi\nB) Jawaharlal Nehru\nC) Sardar Patel\nD) Dr. Rajendra Prasad\n\nTake your time and let me know your answer! I'll explain why it's correct or incorrect.";
    }
    
    // Cell biology summary
    if (lowerQuery.includes("cell") || lowerQuery.includes("biology")) {
      return "Here's a quick summary of Cell Biology! 🧬\n\n**Key Points:**\n\n1. **Cell Structure**\n   • Nucleus: Control center (DNA)\n   • Mitochondria: Powerhouse\n   • Ribosomes: Protein factories\n   • Cell membrane: Protective barrier\n\n2. **Types of Cells**\n   • Prokaryotic: No nucleus (bacteria)\n   • Eukaryotic: Has nucleus (plants, animals)\n\n3. **Cell Division**\n   • Mitosis: Growth & repair\n   • Meiosis: Reproduction\n\nNeed more details on any topic?";
    }
    
    // Hello/Hi greeting
    if (lowerQuery.includes("hello") || lowerQuery.includes("hi")) {
      return "Hey there! 👋 How can I help you today?\n\nI can assist you with:\n• 🧪 Explaining concepts\n• 📐 Solving problems step-by-step\n• 📝 Creating quizzes\n• 📖 Summarizing chapters\n• 🎯 Study tips and strategies\n\nWhat would you like to learn about?";
    }
    
    // Default response
    return `Great question! I'm here to help you with ${studentData.grade} ${studentData.board} curriculum, especially for JEE 2026 preparation. 🚀\n\nI can help you with:\n• **Concept explanations** - Break down complex topics\n• **Problem solving** - Step-by-step solutions\n• **Quiz generation** - Test your knowledge\n• **Weak area analysis** - Identify improvement areas\n• **Study planning** - Organize your learning\n\nWhat would you like to focus on today?`;
  };

  const handleSuggestionClick = (query: string) => {
    sendMessage(query);
  };

  const handleFileSelect = (type: "image" | "document") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = type === "image" ? "image/*" : ".pdf,.doc,.docx,.txt";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setAttachments([...attachments, { type, name: file.name, url }]);
      }
    };
    input.click();
    setShowAttachMenu(false);
  };

  const handleCameraCapture = () => {
    // Simulate camera capture
    const mockImage = {
      type: "image" as const,
      name: `photo_${Date.now()}.jpg`,
      url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80",
    };
    setAttachments([...attachments, mockImage]);
    setShowAttachMenu(false);
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  return (
    <div className="flex h-screen bg-[#FAFAFA]">
      
      {/* Chat History Sidebar */}
      <aside className="hidden lg:block w-[260px] border-r border-[#EBEBEB] bg-white flex-shrink-0">
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="px-4 py-3 border-b border-[#EBEBEB]">
            <button
              onClick={createNewChat}
              className="w-full h-9 rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-white text-[13px] font-semibold transition-colors cursor-pointer border-none flex items-center justify-center gap-2"
            >
              <Sparkle size={16} weight="fill" />
              New Chat
            </button>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto px-2 py-2">
            {sessions.length === 0 ? (
              <div className="px-3 py-8 text-center">
                <p className="text-[12px] text-[#AAA]">No chat history yet</p>
              </div>
            ) : (
              <div className="space-y-1">
                {sessions.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => setCurrentSession(session)}
                    className={`w-full px-3 py-2.5 rounded-lg text-left transition-colors cursor-pointer border-none ${
                      currentSession?.id === session.id
                        ? "bg-[#FFF4ED] border border-[#FFDDC1]"
                        : "bg-transparent hover:bg-[#F5F5F5]"
                    }`}
                  >
                    <p className={`text-[13px] font-medium mb-0.5 line-clamp-1 ${
                      currentSession?.id === session.id ? "text-[#F97316]" : "text-[#111]"
                    }`}>
                      {session.title}
                    </p>
                    <p className="text-[11px] text-[#AAA]">
                      {session.messages.length} {session.messages.length === 1 ? "message" : "messages"}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Footer */}
          <div className="px-4 py-3 border-t border-[#EBEBEB]">
            <div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-[#FAFAFA]">
              <div className="w-7 h-7 rounded-full bg-[#F97316]/10 flex items-center justify-center shrink-0">
                <span className="text-[11px] font-bold text-[#F97316]">
                  {studentData.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium text-[#111] truncate">{studentData.name}</p>
                <p className="text-[10px] text-[#AAA]">{studentData.grade}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-[#EBEBEB] px-5 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {isMobile && (
                <button
                  onClick={toggle}
                  className="p-2 hover:bg-[#F7F7F8] rounded-lg transition-colors cursor-pointer border-none bg-transparent lg:hidden"
                >
                  <List size={20} className="text-[#555]" weight="bold" />
                </button>
              )}
              <h1 className="text-[17px] font-semibold text-[#111]">AI Mentor</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={createNewChat}
                className="h-9 px-4 rounded-lg bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[#111] text-[13px] font-semibold transition-colors cursor-pointer border-none flex items-center gap-2"
              >
                New Chat
              </button>
              <button className="w-9 h-9 rounded-lg bg-[#F5F5F5] hover:bg-[#EBEBEB] flex items-center justify-center transition-colors cursor-pointer border-none">
                <Clock size={18} className="text-[#555]" />
              </button>
            </div>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          {!currentSession || currentSession.messages.length === 0 ? (
            // Empty State
            <div className="h-full flex flex-col items-center justify-center px-6 py-12">
              <div className="max-w-[600px] w-full text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <AnimatedHoot size={80} />
                  </div>
                  <h2 className="text-[20px] font-normal text-[#666] mb-1">
                    Hey! I'm Hoot <span className="inline-block">👋</span>
                  </h2>
                  <p className="text-[15px] text-[#AAA] mb-6">Your Guru AI study buddy</p>
                </div>

                {/* Input Box */}
                <div className="mb-8">
                  <div className="relative">
                    <textarea
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage(inputValue);
                        }
                      }}
                      placeholder="What's on your mind?"
                      className="w-full px-5 py-4 pr-14 rounded-[16px] border border-[#E0E0E0] focus:border-[#F97316] focus:outline-none resize-none text-[14px] text-[#111] placeholder:text-[#AAA] transition-colors bg-white"
                      rows={1}
                      style={{ minHeight: "56px", maxHeight: "200px" }}
                    />
                    <button
                      onClick={() => sendMessage(inputValue)}
                      disabled={!inputValue.trim()}
                      className="absolute right-3 bottom-3 w-10 h-10 rounded-full bg-[#888] hover:bg-[#111] disabled:bg-[#E0E0E0] disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer border-none"
                    >
                      <PaperPlaneRight size={18} weight="fill" className="text-white" />
                    </button>
                  </div>

                  {/* Mode Tabs */}
                  <div className="flex items-center gap-2 mt-3 justify-center">
                    <button className="px-3 py-1.5 rounded-lg bg-white border border-[#E0E0E0] text-[12px] font-medium text-[#111] cursor-pointer hover:bg-[#F5F5F5] transition-colors flex items-center gap-1.5">
                      <Notebook size={14} />
                      Notes
                    </button>
                    <button className="px-3 py-1.5 rounded-lg bg-[#FFF4ED] border border-[#FFDDC1] text-[12px] font-medium text-[#F97316] cursor-pointer hover:bg-[#FFE8D0] transition-colors flex items-center gap-1.5">
                      <Brain size={14} weight="fill" />
                      Quiz
                    </button>
                  </div>
                </div>

                {/* Suggestion Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[500px] mx-auto">
                  {SUGGESTION_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestionClick(prompt.query)}
                      className="p-4 rounded-[16px] bg-white border border-[#EBEBEB] hover:border-[#F97316] hover:shadow-sm transition-all cursor-pointer text-left group"
                    >
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${prompt.color}15` }}
                        >
                          <prompt.icon size={20} weight="fill" style={{ color: prompt.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-semibold text-[#111] mb-1">{prompt.text}</p>
                          <p className="text-[12px] text-[#888] leading-[1.4]">{prompt.subtitle}</p>
                        </div>
                        <CaretRight size={16} className="text-[#CCC] group-hover:text-[#F97316] transition-colors shrink-0 mt-1" weight="bold" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Chat Messages
            <div className="max-w-[800px] mx-auto px-6 py-6">
              {currentSession.messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-6 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 flex items-center justify-center mr-3 shrink-0">
                      <AnimatedHoot size={32} />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] rounded-[16px] relative overflow-hidden ${
                      message.role === "user"
                        ? "text-[#111]"
                        : "bg-[#F5F5F5] text-[#111]"
                    }`}
                  >
                    {message.role === "user" && (
                      <>
                        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(50% 55% at 20% 100%, rgba(139, 92, 246, 0.25) 0%, rgba(139, 92, 246, 0.15) 40%, transparent 70%)' }} />
                        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(50% 55% at 80% 100%, rgba(59, 130, 246, 0.25) 0%, rgba(59, 130, 246, 0.15) 40%, transparent 70%)' }} />
                      </>
                    )}
                    
                    {/* Attachments */}
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="px-4 pt-3 pb-2 relative z-10">
                        <div className="flex flex-wrap gap-2">
                          {message.attachments.map((att, idx) => (
                            <div key={idx} className="relative">
                              {att.type === "image" ? (
                                <img
                                  src={att.url}
                                  alt={att.name}
                                  className="w-32 h-32 object-cover rounded-lg border border-[#E0E0E0]"
                                />
                              ) : (
                                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-[#E0E0E0]">
                                  <File size={20} className="text-[#F97316]" />
                                  <span className="text-[12px] text-[#111] max-w-[120px] truncate">{att.name}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {message.content && (
                      <p className="px-4 py-3 text-[14px] leading-[1.6] whitespace-pre-wrap relative z-10">{message.content}</p>
                    )}
                    <span
                      className={`px-4 pb-3 text-[11px] block relative z-10 ${
                        message.role === "user" ? "text-[#666]" : "text-[#AAA]"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-[#F97316]/10 flex items-center justify-center ml-3 shrink-0">
                      <span className="text-[12px] font-bold text-[#F97316]">
                        {studentData.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="mb-6 flex justify-start">
                  <div className="w-8 h-8 flex items-center justify-center mr-3 shrink-0">
                    <AnimatedHoot size={32} />
                  </div>
                  <div className="bg-white border border-[#EBEBEB] px-4 py-3 rounded-[16px]">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-[#AAA] animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 rounded-full bg-[#AAA] animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 rounded-full bg-[#AAA] animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Bar (when chat is active) */}
        {currentSession && currentSession.messages.length > 0 && (
          <div className="border-t border-[#EBEBEB] bg-white px-6 py-4">
            <div className="max-w-[800px] mx-auto">
              {/* Attachments Preview */}
              {attachments.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {attachments.map((att, idx) => (
                    <div key={idx} className="relative group">
                      {att.type === "image" ? (
                        <div className="relative">
                          <img
                            src={att.url}
                            alt={att.name}
                            className="w-20 h-20 object-cover rounded-lg border border-[#E0E0E0]"
                          />
                          <button
                            onClick={() => removeAttachment(idx)}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#111] hover:bg-[#000] flex items-center justify-center cursor-pointer border-none opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={12} weight="bold" className="text-white" />
                          </button>
                        </div>
                      ) : (
                        <div className="relative flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5F5] border border-[#E0E0E0]">
                          <File size={18} className="text-[#F97316]" />
                          <span className="text-[11px] text-[#111] max-w-[100px] truncate">{att.name}</span>
                          <button
                            onClick={() => removeAttachment(idx)}
                            className="ml-1 w-4 h-4 rounded-full bg-[#111] hover:bg-[#000] flex items-center justify-center cursor-pointer border-none"
                          >
                            <X size={10} weight="bold" className="text-white" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              <div className="relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(inputValue);
                    }
                  }}
                  placeholder="Type your message..."
                  className="w-full px-5 py-3 pr-24 rounded-[12px] border border-[#E0E0E0] focus:border-[#F97316] focus:outline-none resize-none text-[14px] text-[#111] placeholder:text-[#AAA] transition-colors bg-white"
                  rows={1}
                  style={{ minHeight: "48px", maxHeight: "150px" }}
                />
                <div className="absolute right-2 bottom-2 flex items-center gap-1">
                  {/* Attachment Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setShowAttachMenu(!showAttachMenu)}
                      className="w-9 h-9 rounded-full bg-transparent hover:bg-[#F5F5F5] flex items-center justify-center transition-colors cursor-pointer border-none"
                    >
                      <Paperclip size={18} className="text-[#888]" />
                    </button>
                    
                    {showAttachMenu && (
                      <div className="absolute bottom-full right-0 mb-2 w-[160px] bg-white border border-[#EBEBEB] rounded-lg shadow-lg overflow-hidden">
                        <button
                          onClick={() => handleFileSelect("image")}
                          className="w-full px-3 py-2.5 flex items-center gap-2 hover:bg-[#F5F5F5] transition-colors cursor-pointer border-none bg-transparent text-left"
                        >
                          <Image size={18} className="text-[#F97316]" />
                          <span className="text-[13px] text-[#111]">Photo</span>
                        </button>
                        <button
                          onClick={handleCameraCapture}
                          className="w-full px-3 py-2.5 flex items-center gap-2 hover:bg-[#F5F5F5] transition-colors cursor-pointer border-none bg-transparent text-left"
                        >
                          <Camera size={18} className="text-[#F97316]" />
                          <span className="text-[13px] text-[#111]">Camera</span>
                        </button>
                        <button
                          onClick={() => handleFileSelect("document")}
                          className="w-full px-3 py-2.5 flex items-center gap-2 hover:bg-[#F5F5F5] transition-colors cursor-pointer border-none bg-transparent text-left"
                        >
                          <File size={18} className="text-[#F97316]" />
                          <span className="text-[13px] text-[#111]">Document</span>
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => sendMessage(inputValue)}
                    disabled={!inputValue.trim() && attachments.length === 0}
                    className="w-9 h-9 rounded-full bg-[#F97316] hover:bg-[#EA580C] disabled:bg-[#E0E0E0] disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer border-none"
                  >
                    <PaperPlaneRight size={16} weight="fill" className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
