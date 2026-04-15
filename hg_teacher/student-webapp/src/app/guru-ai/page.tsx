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

const m3 = {
  primary: "#1B6EF3", primaryContainer: "#D6E3FF", onPrimaryContainer: "#001B3E",
  secondary: "#0E8A6D", secondaryContainer: "#B4F1DD", onSecondaryContainer: "#002117",
  tertiary: "#7C4DFF", tertiaryContainer: "#E8DEFF", onTertiaryContainer: "#22005D",
  green: "#2E7D32", greenContainer: "#C8E6C9", onGreenContainer: "#002204",
  amber: "#B5651D", amberContainer: "#FFDDB5",
  surface: "#F8F9FC", surfaceLowest: "#FFFFFF", surfaceLow: "#F1F3F8",
  surfaceHigh: "#E3E5EA", surfaceHighest: "#DCDEE3",
  onSurface: "#1A1C1E", onSurfaceVariant: "#44474E", outline: "#74777F", outlineVariant: "#C4C6D0",
};

const SUGGESTION_PROMPTS = [
  { text: "Explain a concept", subtitle: "Break down any topic simply", icon: Flask, color: m3.secondary, bg: m3.secondaryContainer, query: "Explain photosynthesis in simple terms" },
  { text: "Solve a problem", subtitle: "Step-by-step math help", icon: MathOperations, color: m3.primary, bg: m3.primaryContainer, query: "Help me solve quadratic equations" },
  { text: "Quiz me", subtitle: "Test your knowledge", icon: Brain, color: m3.tertiary, bg: m3.tertiaryContainer, query: "Quiz me on Indian history" },
  { text: "Summarize a chapter", subtitle: "Quick revision notes", icon: BookOpen, color: m3.amber, bg: m3.amberContainer, query: "Summarize the chapter on cell biology" },
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
  const [historyOpen, setHistoryOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { scrollToBottom(); }, [currentSession?.messages]);

  const createNewChat = () => {
    const s: ChatSession = { id: Date.now().toString(), title: "New Chat", messages: [], createdAt: new Date() };
    setSessions([s, ...sessions]);
    setCurrentSession(s);
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() && attachments.length === 0) return;
    let session = currentSession;
    if (!session) {
      session = { id: Date.now().toString(), title: content.slice(0, 30) + (content.length > 30 ? "..." : ""), messages: [], createdAt: new Date() };
      setSessions([session, ...sessions]);
      setCurrentSession(session);
    }
    const userMsg: Message = { id: Date.now().toString(), role: "user", content, timestamp: new Date(), attachments: attachments.length > 0 ? [...attachments] : undefined };
    const msgs = [...session.messages, userMsg];
    const updated = { ...session, messages: msgs };
    setCurrentSession(updated);
    setSessions(sessions.map(s => s.id === session.id ? updated : s));
    setInputValue("");
    setAttachments([]);
    setIsTyping(true);
    setTimeout(() => {
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: getAIResponse(content), timestamp: new Date() };
      const final = { ...updated, messages: [...msgs, aiMsg] };
      setCurrentSession(final);
      setSessions(sessions.map(s => s.id === session.id ? final : s));
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes("photosynthesis")) return "Photosynthesis is how plants make food! 🌱\n\nThey use sunlight, water (H₂O), and carbon dioxide (CO₂) to create glucose (sugar) and oxygen.\n\nThe formula is:\n6CO₂ + 6H₂O + sunlight → C₆H₁₂O₆ + 6O₂\n\nThink of it like a kitchen where:\n• Sunlight = Energy source\n• Water + CO₂ = Ingredients\n• Glucose = Food produced\n• Oxygen = Waste product (which we breathe!)\n\nWould you like me to explain any specific part in more detail?";
    if (q.includes("quadratic")) return "Let me help you with quadratic equations! 📊\n\nA quadratic equation has the form:\nax² + bx + c = 0\n\nTo solve it, use the quadratic formula:\nx = (-b ± √(b² - 4ac)) / 2a\n\n**Example:** Solve x² - 5x + 6 = 0\n\nHere: a=1, b=-5, c=6\n\nStep 1: Calculate discriminant\nb² - 4ac = 25 - 24 = 1\n\nStep 2: Apply formula\nx = (5 ± 1) / 2\nx = 3 or x = 2\n\nWant to try solving one together?";
    if (q.includes("quiz") || q.includes("history")) return "Great! Let's test your knowledge with a quick quiz! 📝\n\n**Question 1:** Who was the first Prime Minister of India?\n\nA) Mahatma Gandhi\nB) Jawaharlal Nehru\nC) Sardar Patel\nD) Dr. Rajendra Prasad\n\nTake your time and let me know your answer! I'll explain why it's correct or incorrect.";
    if (q.includes("cell") || q.includes("biology")) return "Here's a quick summary of Cell Biology! 🧬\n\n**Key Points:**\n\n1. **Cell Structure**\n   • Nucleus: Control center (DNA)\n   • Mitochondria: Powerhouse\n   • Ribosomes: Protein factories\n   • Cell membrane: Protective barrier\n\n2. **Types of Cells**\n   • Prokaryotic: No nucleus (bacteria)\n   • Eukaryotic: Has nucleus (plants, animals)\n\n3. **Cell Division**\n   • Mitosis: Growth & repair\n   • Meiosis: Reproduction\n\nNeed more details on any topic?";
    if (q.includes("hello") || q.includes("hi")) return "Hey there! 👋 How can I help you today?\n\nI can assist you with:\n• 🧪 Explaining concepts\n• 📐 Solving problems step-by-step\n• 📝 Creating quizzes\n• 📖 Summarizing chapters\n• 🎯 Study tips and strategies\n\nWhat would you like to learn about?";
    return `Great question! I'm here to help you with ${studentData.grade} ${studentData.board} curriculum, especially for JEE 2026 preparation. 🚀\n\nI can help you with:\n• **Concept explanations** - Break down complex topics\n• **Problem solving** - Step-by-step solutions\n• **Quiz generation** - Test your knowledge\n• **Weak area analysis** - Identify improvement areas\n• **Study planning** - Organize your learning\n\nWhat would you like to focus on today?`;
  };

  const handleFileSelect = (type: "image" | "document") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = type === "image" ? "image/*" : ".pdf,.doc,.docx,.txt";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) setAttachments([...attachments, { type, name: file.name, url: URL.createObjectURL(file) }]);
    };
    input.click();
    setShowAttachMenu(false);
  };

  const handleCameraCapture = () => {
    setAttachments([...attachments, { type: "image", name: `photo_${Date.now()}.jpg`, url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80" }]);
    setShowAttachMenu(false);
  };

  const removeAttachment = (i: number) => setAttachments(attachments.filter((_, idx) => idx !== i));

  /* ── Shared input box ── */
  const InputBox = ({ centered }: { centered?: boolean }) => (
    <div className={centered ? "mb-8" : ""}>
      {attachments.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {attachments.map((att, idx) => (
            <div key={idx} className="relative group">
              {att.type === "image" ? (
                <div className="relative">
                  <img src={att.url} alt={att.name} className="w-20 h-20 object-cover rounded-[10px]" style={{ border: `1px solid ${m3.surfaceHigh}` }} />
                  <button onClick={() => removeAttachment(idx)} className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center cursor-pointer border-none opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: m3.onSurface }}>
                    <X size={12} weight="bold" style={{ color: "#fff" }} />
                  </button>
                </div>
              ) : (
                <div className="relative flex items-center gap-2 px-3 py-2 rounded-[10px]" style={{ background: m3.surfaceLow, border: `1px solid ${m3.surfaceHigh}` }}>
                  <File size={18} style={{ color: m3.primary }} />
                  <span className="text-[11px] max-w-[100px] truncate" style={{ color: m3.onSurface }}>{att.name}</span>
                  <button onClick={() => removeAttachment(idx)} className="ml-1 w-4 h-4 rounded-full flex items-center justify-center cursor-pointer border-none" style={{ background: m3.onSurface }}>
                    <X size={10} weight="bold" style={{ color: "#fff" }} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="relative">
        <textarea
          ref={centered ? inputRef : undefined}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(inputValue); } }}
          placeholder={centered ? "What's on your mind?" : "Type your message..."}
          className="w-full resize-none text-[14px] transition-colors focus:outline-none"
          rows={1}
          style={{
            padding: centered ? "16px 56px 16px 20px" : "12px 96px 12px 20px",
            minHeight: centered ? "56px" : "48px", maxHeight: centered ? "200px" : "150px",
            borderRadius: centered ? "16px" : "12px",
            border: `1px solid ${m3.outlineVariant}`,
            background: m3.surfaceLowest,
            color: m3.onSurface,
          }}
        />
        <div className={`absolute ${centered ? "right-3 bottom-3" : "right-2 bottom-2"} flex items-center gap-1`}>
          {!centered && (
            <div className="relative">
              <button onClick={() => setShowAttachMenu(!showAttachMenu)} className="w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer border-none bg-transparent hover:opacity-70">
                <Paperclip size={18} style={{ color: m3.outline }} />
              </button>
              {showAttachMenu && (
                <div className="absolute bottom-full right-0 mb-2 w-[160px] rounded-[12px] overflow-hidden py-1" style={{ background: m3.surfaceLowest, border: `1px solid ${m3.surfaceHigh}`, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
                  {[
                    { label: "Photo", icon: Image, action: () => handleFileSelect("image") },
                    { label: "Camera", icon: Camera, action: handleCameraCapture },
                    { label: "Document", icon: File, action: () => handleFileSelect("document") },
                  ].map((item) => (
                    <button key={item.label} onClick={item.action} className="w-full px-3 py-2.5 flex items-center gap-2 transition-colors cursor-pointer border-none bg-transparent text-left hover:opacity-70">
                      <item.icon size={18} style={{ color: m3.primary }} />
                      <span className="text-[13px]" style={{ color: m3.onSurface }}>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          <button
            onClick={() => sendMessage(inputValue)}
            disabled={!inputValue.trim() && attachments.length === 0}
            className="rounded-full flex items-center justify-center transition-colors cursor-pointer border-none disabled:cursor-not-allowed"
            style={{ width: centered ? 40 : 36, height: centered ? 40 : 36, background: inputValue.trim() || attachments.length > 0 ? m3.primary : m3.surfaceHigh }}
          >
            <PaperPlaneRight size={centered ? 18 : 16} weight="fill" style={{ color: "#fff" }} />
          </button>
        </div>
      </div>
      {centered && (
        <div className="flex items-center gap-2 mt-3 justify-center">
          <button className="px-3 py-1.5 rounded-full text-[12px] font-medium cursor-pointer transition-colors flex items-center gap-1.5 bg-transparent" style={{ border: `1px solid ${m3.outlineVariant}`, color: m3.onSurfaceVariant }}>
            <Notebook size={14} /> Notes
          </button>
          <button className="px-3 py-1.5 rounded-full text-[12px] font-medium cursor-pointer transition-colors flex items-center gap-1.5 border-none" style={{ background: m3.tertiaryContainer, color: m3.onTertiaryContainer }}>
            <Brain size={14} weight="fill" /> Quiz
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen" style={{ background: m3.surface }}>

      {/* History Sidebar */}
      <aside className="h-full flex-shrink-0 flex flex-col overflow-hidden transition-all duration-300 ease-in-out" style={{ width: historyOpen ? 260 : 0, background: m3.surfaceLowest, borderRight: `1px solid ${m3.surfaceHigh}` }}>
        <div className="w-[260px] h-full flex flex-col">
          <div className="px-3 py-3 flex items-center gap-2" style={{ borderBottom: `1px solid ${m3.surfaceHigh}` }}>
            <button onClick={createNewChat} className="flex-1 h-9 rounded-full text-[13px] font-medium transition-colors cursor-pointer border-none flex items-center justify-center gap-2" style={{ background: m3.primary, color: "#fff" }}>
              <Sparkle size={16} weight="fill" /> New Chat
            </button>
            <button onClick={() => setHistoryOpen(false)} className="w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer border-none bg-transparent hover:opacity-70 shrink-0">
              <X size={18} style={{ color: m3.onSurfaceVariant }} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-2 py-2">
            {sessions.length === 0 ? (
              <div className="px-3 py-8 text-center">
                <p className="text-[12px]" style={{ color: m3.outline }}>No chat history yet</p>
              </div>
            ) : (
              <div className="space-y-1">
                {sessions.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => setCurrentSession(session)}
                    className="w-full px-3 py-2.5 rounded-[10px] text-left transition-colors cursor-pointer border-none"
                    style={{ background: currentSession?.id === session.id ? m3.primaryContainer : "transparent" }}
                  >
                    <p className="text-[13px] font-medium mb-0.5 line-clamp-1" style={{ color: currentSession?.id === session.id ? m3.onPrimaryContainer : m3.onSurface }}>{session.title}</p>
                    <p className="text-[11px]" style={{ color: m3.outline }}>{session.messages.length} {session.messages.length === 1 ? "message" : "messages"}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="px-3 py-3" style={{ borderTop: `1px solid ${m3.surfaceHigh}` }}>
            <div className="flex items-center gap-2 px-2 py-2 rounded-[10px]" style={{ background: m3.surfaceLow }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: m3.primaryContainer }}>
                <span className="text-[11px] font-bold" style={{ color: m3.onPrimaryContainer }}>{studentData.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium truncate" style={{ color: m3.onSurface }}>{studentData.name}</p>
                <p className="text-[10px]" style={{ color: m3.outline }}>{studentData.grade}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <header className="sticky top-0 z-40 px-5 py-3" style={{ background: m3.surfaceLowest, borderBottom: `1px solid ${m3.surfaceHigh}` }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setHistoryOpen(!historyOpen)} className="w-9 h-9 rounded-[10px] flex items-center justify-center transition-colors cursor-pointer border-none bg-transparent hover:opacity-70">
                <List size={20} weight="bold" style={{ color: m3.onSurfaceVariant }} />
              </button>
              <div className="flex items-center gap-2">
                <Sparkle size={18} weight="fill" style={{ color: m3.tertiary }} />
                <h1 className="text-[17px] font-medium" style={{ color: m3.onSurface }}>AI Mentor</h1>
              </div>
            </div>
            <button onClick={createNewChat} className="h-9 px-4 rounded-full text-[13px] font-medium transition-colors cursor-pointer border-none flex items-center gap-2" style={{ background: m3.surfaceLow, color: m3.onSurfaceVariant }}>
              New Chat
            </button>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          {!currentSession || currentSession.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center px-6 py-12">
              <div className="max-w-[600px] w-full text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <AnimatedHoot size={80} />
                  </div>
                  <h2 className="text-[20px] font-normal mb-1" style={{ color: m3.onSurfaceVariant }}>
                    Hey! I'm Hoot <span className="inline-block">👋</span>
                  </h2>
                  <p className="text-[15px] mb-6" style={{ color: m3.outline }}>Your Guru AI study buddy</p>
                </div>

                <InputBox centered />

                {/* Suggestion Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[500px] mx-auto">
                  {SUGGESTION_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(prompt.query)}
                      className="p-4 rounded-[12px] transition-all cursor-pointer text-left group border-none"
                      style={{ background: m3.surfaceLowest, border: `1px solid ${m3.surfaceHigh}` }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: prompt.bg }}>
                          <prompt.icon size={20} weight="fill" style={{ color: prompt.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium mb-0.5" style={{ color: m3.onSurface }}>{prompt.text}</p>
                          <p className="text-[11px] leading-[1.4]" style={{ color: m3.outline }}>{prompt.subtitle}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-[800px] mx-auto px-6 py-6">
              {currentSession.messages.map((message) => (
                <div key={message.id} className={`mb-6 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 flex items-center justify-center mr-3 shrink-0">
                      <AnimatedHoot size={32} />
                    </div>
                  )}
                  <div
                    className="max-w-[70%] rounded-[16px] overflow-hidden"
                    style={{
                      background: message.role === "user" ? m3.primaryContainer : m3.surfaceLow,
                      color: message.role === "user" ? m3.onPrimaryContainer : m3.onSurface,
                    }}
                  >
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="px-4 pt-3 pb-2">
                        <div className="flex flex-wrap gap-2">
                          {message.attachments.map((att, idx) => (
                            <div key={idx}>
                              {att.type === "image" ? (
                                <img src={att.url} alt={att.name} className="w-32 h-32 object-cover rounded-[10px]" style={{ border: `1px solid ${m3.surfaceHigh}` }} />
                              ) : (
                                <div className="flex items-center gap-2 px-3 py-2 rounded-[10px]" style={{ background: m3.surfaceLowest, border: `1px solid ${m3.surfaceHigh}` }}>
                                  <File size={20} style={{ color: m3.primary }} />
                                  <span className="text-[12px] max-w-[120px] truncate" style={{ color: m3.onSurface }}>{att.name}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {message.content && (
                      <p className="px-4 py-3 text-[14px] leading-[1.6] whitespace-pre-wrap">{message.content}</p>
                    )}
                    <span className="px-4 pb-3 text-[11px] block" style={{ color: m3.outline }}>
                      {message.timestamp.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center ml-3 shrink-0" style={{ background: m3.primaryContainer }}>
                      <span className="text-[12px] font-bold" style={{ color: m3.onPrimaryContainer }}>{studentData.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="mb-6 flex justify-start">
                  <div className="w-8 h-8 flex items-center justify-center mr-3 shrink-0">
                    <AnimatedHoot size={32} />
                  </div>
                  <div className="px-4 py-3 rounded-[16px]" style={{ background: m3.surfaceLow }}>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: m3.outline, animationDelay: "0ms" }} />
                      <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: m3.outline, animationDelay: "150ms" }} />
                      <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: m3.outline, animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Bottom Input (active chat) */}
        {currentSession && currentSession.messages.length > 0 && (
          <div className="px-6 py-4" style={{ background: m3.surfaceLowest, borderTop: `1px solid ${m3.surfaceHigh}` }}>
            <div className="max-w-[800px] mx-auto">
              <InputBox />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
