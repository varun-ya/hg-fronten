"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { MOCK_STUDENTS, MOCK_CONVERSATIONS, Message } from "@/types/chat";
import {
  Menu,
  X,
  ArrowLeft,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
} from "lucide-react";

export default function StudentChatPage() {
  const router = useRouter();
  const params = useParams();
  const studentId = params.id as string;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(MOCK_CONVERSATIONS[studentId] || []);
  const [mounted, setMounted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const student = MOCK_STUDENTS.find((s) => s.id === studentId);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!student) {
    return <div>Student not found</div>;
  }

  const handleSend = () => {
    if (!input.trim() || !mounted) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      from: "tutor",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="flex h-screen overflow-hidden font-matter" style={{ background: "#FAFAFA" }}>
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full z-50 md:hidden">
            <Sidebar isOpen={true} setIsOpen={() => {}} />
          </div>
        </>
      )}

      {/* Main Container */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        {/* Mobile toggle */}
        <div className="md:hidden fixed top-4 left-4 z-30">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 bg-white rounded-lg shadow-sm border border-[#E5E7EB]"
          >
            {mobileSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Premium Chat Header */}
        <div
          className="px-4 md:px-6 h-[72px] flex items-center justify-between shrink-0 relative overflow-hidden mt-14 md:mt-0"
          style={{
            background: "linear-gradient(90deg, rgba(44,60,105,0.02) 0%, rgba(251,191,36,0.02) 100%)",
            borderBottom: "1px solid rgba(44,60,105,0.08)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Premium gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at left, rgba(44,60,105,0.05) 0%, transparent 50%)",
              mixBlendMode: "overlay",
            }}
          />

          <div className="flex items-center gap-3 relative z-10">
            <button
              onClick={() => router.push("/students")}
              className="w-9 h-9 flex items-center justify-center rounded-full transition-all hover:scale-110"
              style={{
                background: "rgba(44,60,105,0.06)",
                color: "#2C3C69",
              }}
            >
              <ArrowLeft size={18} />
            </button>

            {/* Avatar */}
            <div className="relative">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-[16px] transition-all duration-300 hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, #2C3C6915 0%, #FBBF2425 100%)",
                  border: "2px solid #2C3C6940",
                  color: "#2C3C69",
                  boxShadow: "0 4px 12px rgba(44,60,105,0.15)",
                }}
              >
                {student.avatar}
              </div>

              {student.online && (
                <>
                  <div
                    className="absolute bottom-0 right-0 w-3 h-3 rounded-full animate-pulse"
                    style={{
                      background: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
                      border: "2px solid white",
                      boxShadow: "0 2px 8px rgba(34,197,94,0.4)",
                    }}
                  />
                  <div
                    className="absolute bottom-0 right-0 w-3 h-3 rounded-full animate-ping"
                    style={{
                      background: "#22C55E",
                      opacity: 0.4,
                    }}
                  />
                </>
              )}
            </div>

            <div>
              <h2 className="text-[16px] font-bold" style={{ color: "#0F1117" }}>
                {student.name}
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <p
                  className="text-[12px] font-semibold"
                  style={{
                    color: student.online ? "#22C55E" : "#6B7280",
                    textShadow: student.online ? "0 0 8px rgba(34,197,94,0.3)" : "none",
                  }}
                >
                  {student.online ? "● Online now" : "Offline"}
                </p>
                <span className="text-[11px]" style={{ color: "#6B7280" }}>
                  ·
                </span>
                <span
                  className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(251,191,36,0.15)",
                    color: "#B45309",
                  }}
                >
                  {student.subject}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 relative z-10">
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{
                background: "rgba(44,60,105,0.06)",
                color: "#2C3C69",
              }}
            >
              <Phone size={16} />
            </button>
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{
                background: "rgba(44,60,105,0.06)",
                color: "#2C3C69",
              }}
            >
              <Video size={16} />
            </button>
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{
                background: "rgba(44,60,105,0.06)",
                color: "#2C3C69",
              }}
            >
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div
          className="flex-1 overflow-y-auto px-4 md:px-6 py-5 relative"
          style={{
            background: "linear-gradient(180deg, rgba(250,250,250,1) 0%, rgba(255,255,255,0.5) 100%)",
          }}
        >
          {/* Premium pattern overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, rgba(44,60,105,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(251,191,36,0.03) 0%, transparent 50%)",
            }}
          />

          <div className="max-w-3xl mx-auto relative z-10">
            {messages.map((message, index) => {
              const isFromTutor = message.from === "tutor";
              const showAvatar = index === 0 || messages[index - 1].from !== message.from;

              return (
                <div
                  key={message.id}
                  className={`flex gap-2 mb-4 ${isFromTutor ? "justify-end" : "justify-start"}`}
                >
                  {!isFromTutor && showAvatar && (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[12px] shrink-0"
                      style={{
                        background: "linear-gradient(135deg, #2C3C6915 0%, #FBBF2425 100%)",
                        border: "2px solid #2C3C6940",
                        color: "#2C3C69",
                      }}
                    >
                      {student.avatar}
                    </div>
                  )}

                  {!isFromTutor && !showAvatar && <div className="w-8 shrink-0" />}

                  <div className={`flex flex-col ${isFromTutor ? "items-end" : "items-start"} max-w-[70%]`}>
                    <div
                      className="px-4 py-3 text-[14px] transition-all duration-300 hover:scale-[1.01]"
                      style={{
                        background: isFromTutor
                          ? "linear-gradient(135deg, #2C3C69 0%, #1E2D52 100%)"
                          : "white",
                        color: isFromTutor ? "white" : "#0F1117",
                        border: isFromTutor ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(44,60,105,0.08)",
                        borderRadius: isFromTutor ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                        boxShadow: isFromTutor
                          ? "0 8px 24px rgba(44,60,105,0.25), inset 0 1px 0 rgba(255,255,255,0.1)"
                          : "0 2px 8px rgba(44,60,105,0.06)",
                        lineHeight: 1.5,
                      }}
                    >
                      {message.text}
                    </div>
                    <p className="text-[10px] mt-1 mx-1 font-medium" style={{ color: "#6B7280" }}>
                      {message.time}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Premium Input Area */}
        <div
          className="bg-white shrink-0 z-10 p-4 relative overflow-hidden"
          style={{
            borderTop: "1px solid rgba(44,60,105,0.08)",
            background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,1) 100%)",
          }}
        >
          {/* Premium gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at bottom, rgba(251,191,36,0.03) 0%, transparent 50%)",
              mixBlendMode: "overlay",
            }}
          />

          <div className="max-w-3xl mx-auto relative z-10">
            <div className="flex items-end gap-3">
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 hover:scale-110"
                style={{
                  background: "rgba(44,60,105,0.06)",
                  color: "#2C3C69",
                }}
              >
                <Paperclip size={18} />
              </button>

              <div
                className="flex-1 rounded-3xl flex items-center px-4 py-3 transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, rgba(250,250,250,1) 0%, rgba(255,255,255,1) 100%)",
                  border: "1.5px solid rgba(44,60,105,0.12)",
                  boxShadow: "0 4px 16px rgba(44,60,105,0.08), inset 0 1px 2px rgba(255,255,255,0.8)",
                }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder={`Message ${student.name.split(" ")[0]}...`}
                  className="flex-1 bg-transparent border-none outline-none text-[14.5px] font-medium"
                  style={{ color: "#0F1117" }}
                />
                <button
                  className="ml-2 transition-all hover:scale-110"
                  style={{ color: "#6B7280" }}
                >
                  <Smile size={20} />
                </button>
              </div>

              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 text-white disabled:opacity-50 hover:scale-110"
                style={{
                  background: input.trim()
                    ? "linear-gradient(135deg, #2C3C69 0%, #FBBF24 100%)"
                    : "rgba(229,231,235,1)",
                  boxShadow: input.trim() ? "0 8px 24px rgba(251,191,36,0.4)" : "none",
                }}
              >
                <Send size={18} className={input.trim() ? "-ml-0.5" : ""} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
