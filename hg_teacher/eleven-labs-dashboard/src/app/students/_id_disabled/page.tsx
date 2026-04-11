"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  CaretLeft,
  PaperPlaneRight,
  Plus,
  Camera,
  Image as ImageIcon,
  File as FileIcon,
  VideoCamera,
  CaretDown,
  CaretUp,
  DotsThree,
  MagnifyingGlass,
  Circle,
  Phone,
  Info,
} from "@phosphor-icons/react";
import { MOCK_STUDENTS, MOCK_CONVERSATIONS, Message, ClassBlock } from "@/types/chat";

export default function ChatPage() {
  const router = useRouter();
  const params = useParams();
  const studentId = params.id as string;

  const [messages, setMessages] = useState<Message[]>(MOCK_CONVERSATIONS[studentId] || []);
  const [inputText, setInputText] = useState("");
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [expandedClassId, setExpandedClassId] = useState<string | null>(null);
  const [activeClassSection, setActiveClassSection] = useState<string>("summary");
  const [sidebarSearch, setSidebarSearch] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const student = MOCK_STUDENTS.find((s) => s.id === studentId);

  const filteredStudents = sidebarSearch
    ? MOCK_STUDENTS.filter((s) => s.name.toLowerCase().includes(sidebarSearch.toLowerCase()))
    : MOCK_STUDENTS;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!student) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#FAFAFA]">
        <p className="text-[14px] text-[#AAA]">Student not found</p>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const newMessage: Message = {
      id: `m${Date.now()}`,
      type: "text",
      text: inputText,
      sender: "tutor",
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
    setInputText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="flex h-screen bg-[#FAFAFA] overflow-hidden relative">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 100% 140% at 50% 130%, rgba(249,115,22,0.35) 0%, rgba(249,115,22,0.12) 30%, transparent 60%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 120% at 0% 130%, rgba(139,92,246,0.2) 0%, transparent 50%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 120% at 100% 130%, rgba(59,130,246,0.18) 0%, transparent 50%)" }} />

      {/* ── Left: Conversation list ── */}
      <div className="w-[320px] bg-white border-r border-[#EBEBEB] flex flex-col flex-shrink-0 relative z-10">
        {/* Sidebar header */}
        <div className="px-4 py-3 border-b border-[#F0F0F0] flex items-center gap-3">
          <button
            onClick={() => router.push("/students")}
            className="w-8 h-8 rounded-lg hover:bg-[#F5F5F5] transition-colors flex items-center justify-center cursor-pointer border-none bg-transparent text-[#888]"
          >
            <CaretLeft size={16} />
          </button>
          <span className="text-[15px] font-semibold text-[#111]">Messages</span>
        </div>

        {/* Search */}
        <div className="px-3 py-2.5">
          <div className="relative">
            <MagnifyingGlass size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#CCC]" />
            <input
              type="text"
              placeholder="Search conversations"
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-[10px] bg-[#FAFAFA] border border-[#F0F0F0] text-[12px] text-[#111] placeholder-[#CCC] focus:outline-none focus:border-[#DDD] transition-colors"
            />
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto">
          {filteredStudents.map((s) => {
            const isActive = s.id === studentId;
            return (
              <div
                key={s.id}
                onClick={() => router.push(`/students/${s.id}`)}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors"
                style={{
                  backgroundColor: isActive ? "#FAFAFA" : "transparent",
                  borderRight: isActive ? "2px solid #3B82F6" : "2px solid transparent",
                }}
              >
                <div className="relative shrink-0">
                  <img
                    src={s.avatar}
                    alt={s.name}
                    className="w-10 h-10 rounded-full"
                    style={{ backgroundColor: "#FAFAFA", border: "1.5px solid #EBEBEB" }}
                  />
                  {s.unreadCount > 0 && (
                    <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#3B82F6] border-2 border-white flex items-center justify-center">
                      <span className="text-[8px] font-bold text-white">{s.unreadCount}</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`text-[13px] truncate ${isActive || s.unreadCount > 0 ? "font-semibold text-[#111]" : "font-medium text-[#111]"}`}>
                      {s.name}
                    </span>
                    <span className="text-[10px] text-[#BBB] shrink-0 ml-2">{s.lastMessageTime}</span>
                  </div>
                  <p className={`text-[11px] truncate ${s.unreadCount > 0 ? "text-[#555]" : "text-[#BBB]"}`}>
                    {s.lastMessage}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Center: Chat area ── */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Chat header */}
        <div className="px-5 py-3 border-b border-[#F0F0F0] bg-white flex items-center gap-3 flex-shrink-0">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-9 h-9 rounded-full shrink-0"
            style={{ backgroundColor: "#FAFAFA", border: "1.5px solid #EBEBEB" }}
          />
          <div className="flex-1 min-w-0">
            <h1 className="text-[14px] font-semibold text-[#111] truncate">{student.name}</h1>
            <p className="text-[11px] text-[#BBB]">{student.subject} · {student.grade}</p>
          </div>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-lg hover:bg-[#F5F5F5] transition-colors flex items-center justify-center cursor-pointer border-none bg-transparent text-[#CCC] hover:text-[#888]">
              <Phone size={16} />
            </button>
            <button className="w-8 h-8 rounded-lg hover:bg-[#F5F5F5] transition-colors flex items-center justify-center cursor-pointer border-none bg-transparent text-[#CCC] hover:text-[#888]">
              <VideoCamera size={16} />
            </button>
            <button className="w-8 h-8 rounded-lg hover:bg-[#F5F5F5] transition-colors flex items-center justify-center cursor-pointer border-none bg-transparent text-[#CCC] hover:text-[#888]">
              <Info size={16} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="max-w-[620px] mx-auto space-y-1">
            {messages.map((message, idx) => {
              const prevMessage = idx > 0 ? messages[idx - 1] : null;
              const showDateLabel =
                !prevMessage || formatDate(message.timestamp) !== formatDate(prevMessage.timestamp);

              // Group consecutive messages from same sender
              const nextMessage = idx < messages.length - 1 ? messages[idx + 1] : null;
              const isLastInGroup =
                !nextMessage ||
                nextMessage.type === "class" ||
                message.type === "class" ||
                (nextMessage.type !== "class" && message.type !== "class" &&
                  ("sender" in nextMessage && "sender" in message && nextMessage.sender !== message.sender));

              return (
                <div key={message.id}>
                  {showDateLabel && (
                    <div className="flex justify-center py-4">
                      <span className="text-[10px] text-[#CCC] font-medium">
                        {formatDate(message.timestamp)}
                      </span>
                    </div>
                  )}

                  {/* Text */}
                  {message.type === "text" && (
                    <div className={`flex ${message.sender === "tutor" ? "justify-end" : "justify-start"} ${isLastInGroup ? "mb-3" : "mb-0.5"}`}>
                      <div className="flex flex-col" style={{ maxWidth: "65%" }}>
                        <div
                          className={`px-3.5 py-2 ${
                            message.sender === "tutor"
                              ? "bg-[#3B82F6] text-white rounded-[14px] rounded-br-[4px]"
                              : "bg-[#F5F5F5] text-[#111] rounded-[14px] rounded-bl-[4px]"
                          }`}
                        >
                          <p className="text-[13px] leading-[1.5] whitespace-pre-wrap">{message.text}</p>
                        </div>
                        {isLastInGroup && (
                          <span className={`text-[9px] text-[#CCC] mt-1 ${message.sender === "tutor" ? "text-right" : "text-left"} px-1`}>
                            {formatTime(message.timestamp)}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* File / Image */}
                  {(message.type === "file" || message.type === "image") && (
                    <div className={`flex ${message.sender === "tutor" ? "justify-end" : "justify-start"} mb-3`}>
                      <div style={{ maxWidth: "65%" }}>
                        {message.type === "image" ? (
                          <div className="rounded-[12px] overflow-hidden border border-[#F0F0F0]">
                            <img src={message.fileUrl} alt={message.fileName} className="max-w-full h-auto block" />
                          </div>
                        ) : (
                          <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-[12px] bg-[#F5F5F5] border border-[#F0F0F0]">
                            <div className="w-9 h-9 rounded-lg bg-white border border-[#EBEBEB] flex items-center justify-center shrink-0">
                              <FileIcon size={15} className="text-[#AAA]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[12px] font-medium text-[#111] truncate">{message.fileName}</p>
                              <p className="text-[10px] text-[#CCC]">{message.fileSize}</p>
                            </div>
                          </div>
                        )}
                        <span className={`text-[9px] text-[#CCC] mt-1 block ${message.sender === "tutor" ? "text-right" : "text-left"} px-1`}>
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Class Block */}
                  {message.type === "class" && (
                    <div className="my-4">
                      <ClassBlockCard
                        classBlock={message}
                        isExpanded={expandedClassId === message.id}
                        activeSection={activeClassSection}
                        onToggle={() => {
                          setExpandedClassId(expandedClassId === message.id ? null : message.id);
                          setActiveClassSection("summary");
                        }}
                        onSectionChange={setActiveClassSection}
                      />
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-[#F0F0F0] bg-white px-5 py-3 flex-shrink-0">
          <div className="max-w-[620px] mx-auto flex items-end gap-2.5">
            {/* Attach */}
            <div className="relative">
              <button
                onClick={() => setShowAttachMenu(!showAttachMenu)}
                className="w-9 h-9 rounded-lg hover:bg-[#F5F5F5] transition-colors flex items-center justify-center cursor-pointer border border-[#F0F0F0] bg-white text-[#BBB] hover:text-[#888]"
              >
                <Plus size={16} />
              </button>
              {showAttachMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowAttachMenu(false)} />
                  <div className="absolute bottom-full left-0 mb-2 w-[160px] bg-white border border-[#EBEBEB] rounded-[12px] z-50 py-1.5" style={{ boxShadow: '0 8px 24px -4px rgba(0,0,0,0.08)' }}>
                    {[
                      { icon: Camera, label: "Camera", color: "#888" },
                      { icon: ImageIcon, label: "Photo", color: "#888" },
                      { icon: FileIcon, label: "File", color: "#888" },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={() => { setShowAttachMenu(false); fileInputRef.current?.click(); }}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2.5 hover:bg-[#FAFAFA] transition-colors text-left border-none bg-transparent cursor-pointer"
                      >
                        <item.icon size={15} className="text-[#AAA]" />
                        <span className="text-[12px] text-[#555] font-medium">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Input field */}
            <div className="flex-1">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Write a message..."
                className="w-full px-3.5 py-2.5 rounded-[10px] border border-[#F0F0F0] text-[13px] text-[#111] resize-none focus:outline-none focus:border-[#DDD] transition-colors placeholder-[#CCC] bg-[#FAFAFA]"
                rows={1}
                style={{ minHeight: "40px", maxHeight: "100px" }}
              />
            </div>

            {/* Send */}
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="w-9 h-9 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-[#F0F0F0] transition-colors flex items-center justify-center cursor-pointer border-none disabled:cursor-not-allowed shrink-0"
            >
              <PaperPlaneRight size={15} weight="fill" className={inputText.trim() ? "text-white" : "text-[#CCC]"} />
            </button>

            <input ref={fileInputRef} type="file" className="hidden" accept="image/*,.pdf,.doc,.docx" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Class Block Card ── */
function ClassBlockCard({
  classBlock,
  isExpanded,
  activeSection,
  onToggle,
  onSectionChange,
}: {
  classBlock: ClassBlock;
  isExpanded: boolean;
  activeSection: string;
  onToggle: () => void;
  onSectionChange: (s: string) => void;
}) {
  const sections = [
    { id: "summary", label: "Summary" },
    { id: "assignments", label: "Assignments" },
    { id: "notes", label: "Notes" },
    { id: "media", label: "Media" },
    { id: "chat", label: "Chat" },
  ];

  return (
    <div className="rounded-[12px] border border-[#F0F0F0] bg-white overflow-hidden">
      {/* Header */}
      <div
        onClick={onToggle}
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#FAFAFA] transition-colors"
      >
        <div className="w-8 h-8 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] flex items-center justify-center shrink-0">
          <VideoCamera size={14} className="text-[#AAA]" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[12px] font-medium text-[#111] truncate">{classBlock.topic}</h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[10px] text-[#CCC]">{classBlock.date}</span>
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
              classBlock.status === "Completed" ? "bg-[#ECFDF5] text-[#059669]" : "bg-[#FEF2F2] text-[#DC2626]"
            }`}>
              {classBlock.status === "Completed" ? "DONE" : "MISSED"}
            </span>
          </div>
        </div>
        {isExpanded ? <CaretUp size={14} className="text-[#CCC]" /> : <CaretDown size={14} className="text-[#CCC]" />}
      </div>

      {isExpanded && (
        <div className="border-t border-[#F5F5F5]">
          {/* Tabs */}
          <div className="flex gap-0 px-4 py-2 border-b border-[#F5F5F5]">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => onSectionChange(s.id)}
                className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-colors cursor-pointer border-none ${
                  activeSection === s.id ? "bg-[#3B82F6] text-white" : "bg-transparent text-[#BBB] hover:text-[#888]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="px-4 py-3">
            {activeSection === "summary" && (
              <p className="text-[12px] text-[#666] leading-[1.7]">{classBlock.summary}</p>
            )}
            {activeSection === "assignments" && (
              <div className="space-y-1.5">
                {classBlock.assignments.map((a, i) => (
                  <p key={i} className="text-[12px] text-[#666] flex items-start gap-1.5">
                    <span className="text-[#DDD]">·</span> {a}
                  </p>
                ))}
              </div>
            )}
            {activeSection === "notes" && (
              <div className="space-y-1.5">
                {classBlock.notes.map((n, i) => (
                  <p key={i} className="text-[12px] text-[#666] flex items-start gap-1.5">
                    <span className="text-[#DDD]">·</span> {n}
                  </p>
                ))}
              </div>
            )}
            {activeSection === "media" && (
              <div className="flex gap-2">
                {classBlock.recordingUrl && (
                  <a href={classBlock.recordingUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#FAFAFA] border border-[#F0F0F0] hover:bg-[#F5F5F5] transition-colors text-[10px] font-medium text-[#666]">
                    <VideoCamera size={11} /> Recording
                  </a>
                )}
                {classBlock.transcriptUrl && (
                  <a href={classBlock.transcriptUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#FAFAFA] border border-[#F0F0F0] hover:bg-[#F5F5F5] transition-colors text-[10px] font-medium text-[#666]">
                    <FileIcon size={11} /> Transcript
                  </a>
                )}
              </div>
            )}
            {activeSection === "chat" && (
              <div className="space-y-2 max-h-[160px] overflow-y-auto">
                {classBlock.chatMessages.map((msg, i) => (
                  <div key={i} className="text-[11px]">
                    <span className="font-medium text-[#111]">{msg.sender}</span>{" "}
                    <span className="text-[#888]">{msg.message}</span>
                    <span className="text-[9px] text-[#CCC] ml-1.5">{msg.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
