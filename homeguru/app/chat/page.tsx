"use client";
import { useState, useRef, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Menu, X } from "lucide-react";

/* ─── Colour tokens — matches Sarvam theme ─── */
const P = {
  blue:       "#2C3C69",
  blueDark:   "#1E2D52",
  blueDeep:   "#131E3A",
  blueSub:    "#EDF0F7",
  blueMid:    "#D3D9EC",
  blueText:   "#2C3C69",
  amber:      "#FBBF24",
  amberDark:  "#B45309",
  amberSub:   "#FFFBEB",
  amberMid:   "#FEF3C7",
  green:      "#16A34A",
  red:        "#EF4444",
  white:      "#FFFFFF",
  bg:         "#FAFAFA",
  border:     "#E5E7EB",
  borderSoft: "#F3F4F6",
  text:       "#0F1117",
  mid:        "#303A4F",
  muted:      "#6B7280",
  bubbleIn:   "#FAFAFA",
  bubbleOut:  "#2C3C69",
};

/* ── Svg helper ── */
const Svg = ({ d, s = 14, className = "" }: { d: React.ReactNode, s?: number, className?: string }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);

const D = {
  srch: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
  cal:  <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
  info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
  link: <><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></>,
  file: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></>,
  clip: <><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></>,
  send: <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
  back: <polyline points="15 18 9 12 15 6"/>
};

/* ── Types ── */
interface MsgItem {
  id: number; from: "tutor" | "student"; type?: "text" | "context" | "file";
  text: string; time: string; date: string;
  subtext?: string; fileName?: string; fileSize?: string; fileObj?: File;
}

interface CtxCard { type: string; label: string; value: string; meta: string; color: string; }

interface Convo {
  id: string; name: string; av: string; subject: string; subColor: string;
  online: boolean; unread: number; lastMsg: string; lastTime: string;
  nextSession: string; totalSessions: number; pendingAssign: string | null;
  messages: MsgItem[]; quickReplies: string[]; contextCards: CtxCard[];
}

/* ── CONVERSATIONS ── */
const CONVOS: Convo[] = [
  {
    id: "cl", name: "Cercei Lannister", av: "CL", subject: "English Speaking", subColor: P.amberDark,
    online: true, unread: 2, lastMsg: "Great! Make sure you practice the /spl/ clusters tonight.",
    lastTime: "2:41 PM", nextSession: "May 14, 2026 · 2:00 PM", totalSessions: 16, pendingAssign: "Spanish Essay",
    messages: [
      { id: 1, from: "tutor", text: "Hi Varun! Just wanted to check — did you get a chance to review the pcap file I shared after our last session?", time: "Yesterday, 11:20 AM", date: "Mar 13" },
      { id: 2, from: "student", text: "Yes I did! I could identify the suspicious ARP packets but got confused about the TCP retransmissions. Were those intentional in the exercise?", time: "Yesterday, 11:47 AM", date: "Mar 13" },
      { id: 3, from: "tutor", text: "Good catch on the ARP! The TCP retransmissions were actually a red herring — they were normal network noise. The key was the ARP spoofing pattern. Did you notice the MAC address cycling?", time: "Yesterday, 12:03 PM", date: "Mar 13" },
      { id: 4, from: "student", text: "Ohh no I missed that completely. I was too focused on the TCP side. Should I redo the whole analysis?", time: "Yesterday, 12:15 PM", date: "Mar 13" },
      { id: 5, from: "tutor", text: "Don't redo it from scratch — just go back and filter for ARP packets specifically. Look at frames 42–67. You'll see the pattern clearly. It's a great learning moment!", time: "Yesterday, 12:22 PM", date: "Mar 13" },
      { id: 6, from: "tutor", type: "context", text: "Re: Network Security Basics session", subtext: "Mar 11, 2026", time: "Yesterday, 12:22 PM", date: "Mar 13" },
      { id: 7, from: "student", text: "Found it! Frames 44, 51, 58 — the MAC keeps changing for the same IP. That's the spoofing. Makes complete sense now.", time: "Yesterday, 1:10 PM", date: "Mar 13" },
      { id: 8, from: "tutor", text: "Exactly. You've got it. I'll build on this in our next session when we cover IDS/IPS systems. Also — have you started the Spanish essay for our English track?", time: "Yesterday, 1:14 PM", date: "Mar 13" },
      { id: 9, from: "student", text: "Not yet, I'll start it tonight. Quick question though — for the essay, do you want me to use formal or informal register?", time: "Yesterday, 4:30 PM", date: "Mar 13" },
      { id: 10, from: "tutor", text: "Formal register please — think of it as writing to a pen pal you haven't met. Semi-formal transitions, past tense for history, present for current state. Check the template I shared.", time: "Yesterday, 5:01 PM", date: "Mar 13" },
      { id: 11, from: "tutor", type: "file", fileName: "Essay_Template.docx", fileSize: "48 KB", text: "", time: "Yesterday, 5:02 PM", date: "Mar 13" },
      { id: 12, from: "student", text: "Perfect, thanks! One more thing — my pronunciation of 'throughout' still sounds off. Any quick tip?", time: "Today, 10:15 AM", date: "Mar 14" },
      { id: 13, from: "tutor", text: "Say it in three parts: 'throo · owt'. Stress the second syllable. The /θr/ cluster at the start is where most students rush — slow it down. Record yourself and compare with a native speaker audio.", time: "Today, 10:32 AM", date: "Mar 14" },
      { id: 14, from: "tutor", text: "Great! Make sure you practice the /spl/ clusters tonight.", time: "Today, 2:41 PM", date: "Mar 14" },
    ],
    quickReplies: ["Can you explain this again?", "When is our next session?", "I have a doubt about the assignment"],
    contextCards: [
      { type: "session", label: "Last Session", value: "Network Security Basics", meta: "Mar 11 · 1h 30m", color: P.amberDark },
      { type: "assign", label: "Pending Assignment", value: "Spanish Essay", meta: "Due tomorrow", color: P.red },
      { type: "session", label: "Next Session", value: "English Speaking — Upper Intermediate", meta: "May 14 · 2:00 PM", color: P.green },
    ],
  },
  {
    id: "pk", name: "Ms. Priya Kapoor", av: "PK", subject: "Physics", subColor: "#6366F1",
    online: false, unread: 0, lastMsg: "Review the vector decomposition notes before Friday.",
    lastTime: "Mar 10", nextSession: "Mar 19, 2026 · 4:00 PM", totalSessions: 9, pendingAssign: "Laws of Motion — Problem Set 3A",
    messages: [
      { id: 1, from: "tutor", text: "Varun, I reviewed your Laws of Motion homework. Your conceptual answers are solid but the numerical working has careless errors. You need to slow down on calculations.", time: "Mar 10, 3:00 PM", date: "Mar 10" },
      { id: 2, from: "student", text: "Yes ma'am, I noticed that too. I think I rush through the arithmetic. Should I use a different approach for showing my steps?", time: "Mar 10, 3:45 PM", date: "Mar 10" },
      { id: 3, from: "tutor", text: "Yes — write out every unit conversion explicitly, even if it seems obvious. Box your final answers. That forces you to slow down and double-check.", time: "Mar 10, 4:10 PM", date: "Mar 10" },
      { id: 4, from: "student", text: "That makes sense. I'll try it on Problem Set 3A. Also, I'm struggling with the Atwood machine setup — is there a video you'd recommend?", time: "Mar 10, 4:30 PM", date: "Mar 10" },
      { id: 5, from: "tutor", text: "The Khan Academy series on Newton's Laws is excellent. Specifically the Atwood machine video — watch it twice, pause and draw the FBD yourself before they show it.", time: "Mar 10, 4:52 PM", date: "Mar 10" },
      { id: 6, from: "student", text: "Will do. One question — for Problem 7 in Set 3A, do we consider the mass of the pulley or assume it's massless?", time: "Mar 10, 5:15 PM", date: "Mar 10" },
      { id: 7, from: "tutor", text: "Massless and frictionless — standard assumption at this level. If the problem specifies otherwise, it will explicitly state it.", time: "Mar 10, 5:20 PM", date: "Mar 10" },
      { id: 8, from: "tutor", text: "Review the vector decomposition notes before Friday.", time: "Mar 10, 5:22 PM", date: "Mar 10" },
    ],
    quickReplies: ["I have a doubt about Problem Set 3A", "Can we cover this in next session?", "What should I focus on before Friday?"],
    contextCards: [
      { type: "session", label: "Last Session", value: "Laws of Motion — Numericals", meta: "Mar 2 · 1h", color: "#6366F1" },
      { type: "assign", label: "Pending Assignment", value: "Problem Set 3A", meta: "Due Mar 19", color: P.amber },
      { type: "session", label: "Next Session", value: "Kinematics — Circular Motion", meta: "Mar 19 · 4:00 PM", color: P.green },
    ],
  },
  {
    id: "ak", name: "Aditya Kulkarni", av: "AK", subject: "Python", subColor: "#0EA5E9",
    online: true, unread: 0, lastMsg: "Your memoization decorator was clean. Try the class-based version next.",
    lastTime: "Mar 9", nextSession: "Mar 20, 2026 · 11:00 AM", totalSessions: 12, pendingAssign: null,
    messages: [
      { id: 1, from: "tutor", text: "Hey Varun, great work on the memoization decorator. The cache key logic using tuples was exactly the right approach.", time: "Mar 9, 6:00 PM", date: "Mar 9" },
      { id: 2, from: "student", text: "Thanks! I was unsure about whether to use a tuple or convert to a string. Went with tuple for hashability.", time: "Mar 9, 6:20 PM", date: "Mar 9" },
      { id: 3, from: "tutor", text: "Perfect reasoning. String conversion would've worked but with edge cases — tuples are the clean solution. One thing you missed: functools.wraps. Without it, your decorator hides the wrapped function's __name__ and __doc__.", time: "Mar 9, 6:35 PM", date: "Mar 9" },
      { id: 4, from: "student", text: "Oh I didn't know about that. So I should always wrap with functools.wraps inside decorators?", time: "Mar 9, 6:50 PM", date: "Mar 9" },
      { id: 5, from: "tutor", text: "Always — it's a best practice. Think of it as being a polite decorator. It preserves the wrapped function's identity, which matters a lot for debugging and documentation.", time: "Mar 9, 7:00 PM", date: "Mar 9" },
      { id: 6, from: "tutor", type: "file", fileName: "decorator_pattern_advanced.py", fileSize: "8 KB", text: "", time: "Mar 9, 7:01 PM", date: "Mar 9" },
      { id: 7, from: "student", text: "This file is really helpful — the class-based decorator pattern is something I haven't seen before. Should I attempt implementing it before our next session?", time: "Mar 9, 8:15 PM", date: "Mar 9" },
      { id: 8, from: "tutor", text: "Your memoization decorator was clean. Try the class-based version next.", time: "Mar 9, 9:00 PM", date: "Mar 9" },
    ],
    quickReplies: ["I have a question about decorators", "Can you review my code?", "What's on the agenda for next session?"],
    contextCards: [
      { type: "session", label: "Last Session", value: "Python Functions & Closures", meta: "Mar 5 · 1h 15m", color: "#0EA5E9" },
      { type: "assign", label: "Last Graded", value: "Memoization Decorator", meta: "88% · Graded Mar 10", color: P.green },
      { type: "session", label: "Next Session", value: "Class-based Decorators", meta: "Mar 20 · 11:00 AM", color: P.green },
    ],
  },
];

/* ── HELPERS ── */
function Avatar({ label, size = 30, color = P.mid, online = false }: { label: string; size?: number; color?: string; online?: boolean }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div className="rounded-full flex items-center justify-center font-bold transition-all duration-300 hover:scale-110"
        style={{ 
          width: "100%", 
          height: "100%", 
          background: `linear-gradient(135deg, ${color}15 0%, ${color}25 100%)`,
          border: `2px solid ${color}40`,
          fontSize: size * 0.36, 
          color: color,
          boxShadow: `0 4px 12px ${color}20`
        }}>
        {label}
      </div>
      {online && (
        <>
          <div className="absolute bottom-0 right-0 rounded-full animate-pulse"
               style={{ 
                 width: size * 0.32, 
                 height: size * 0.32,
                 background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                 border: '2px solid white',
                 boxShadow: '0 2px 8px rgba(34,197,94,0.4)'
               }} />
          <div className="absolute bottom-0 right-0 rounded-full animate-ping"
               style={{ 
                 width: size * 0.32, 
                 height: size * 0.32,
                 background: '#22C55E',
                 opacity: 0.4
               }} />
        </>
      )}
    </div>
  );
}

/* ── CONVO LIST PANEL ── */
function ConvoList({ active, setActive }: { active: string; setActive: (id: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Filter conversations
  const filtered = CONVOS.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full md:w-[360px] shrink-0 flex flex-col h-full relative overflow-hidden" 
         style={{ 
           background: 'linear-gradient(180deg, rgba(44,60,105,0.03) 0%, rgba(251,191,36,0.02) 100%)',
           borderRight: `1px solid rgba(44,60,105,0.08)` 
         }}>
      
      {/* Premium gradient overlay */}
      <div className="absolute inset-0 pointer-events-none" 
           style={{ 
             background: 'radial-gradient(circle at top right, rgba(251,191,36,0.08) 0%, transparent 60%)',
             mixBlendMode: 'overlay'
           }} />
      
      <div className="px-5 h-[72px] flex items-center justify-between shrink-0 relative z-10 backdrop-blur-sm" 
           style={{ borderBottom: `1px solid rgba(44,60,105,0.08)` }}>
        {!isSearching ? (
          <>
            <div className="flex items-center gap-3">
              <h2 className="text-[20px] font-season font-bold bg-gradient-to-r from-[#2C3C69] to-[#FBBF24] bg-clip-text text-transparent">Messages</h2>
              <div className="px-2 py-0.5 rounded-full text-[10px] font-bold" 
                   style={{ background: 'linear-gradient(135deg, #2C3C69 0%, #FBBF24 100%)', color: 'white' }}>
                {CONVOS.filter(c => c.unread > 0).reduce((sum, c) => sum + c.unread, 0)}
              </div>
            </div>
            <div onClick={() => setIsSearching(true)}
              className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110"
              style={{ 
                background: 'rgba(44,60,105,0.06)',
                backdropFilter: 'blur(10px)',
                border: `1px solid rgba(44,60,105,0.1)`,
                color: P.blue 
              }}>
              <Svg d={D.srch} s={15} />
            </div>
          </>
        ) : (
          <div className="flex w-full items-center gap-2">
            <div className="flex-1 rounded-full flex items-center px-4 py-2" 
                 style={{ 
                   background: 'rgba(255,255,255,0.8)',
                   backdropFilter: 'blur(20px)',
                   border: `1px solid rgba(44,60,105,0.1)`,
                   boxShadow: '0 4px 12px rgba(44,60,105,0.08)'
                 }}>
              <Svg d={D.srch} s={14} className="text-gray-400 mr-2 shrink-0" />
              <input 
                autoFocus
                placeholder="Search messages..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-[13px]"
                style={{ color: P.text }}
              />
            </div>
            <button onClick={() => { setIsSearching(false); setSearchQuery(""); }} 
              className="text-[12px] font-bold hover:opacity-70 transition-opacity" style={{ color: P.blue }}>
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
        {filtered.map((c, i) => (
          <div key={c.id} onClick={() => setActive(c.id)}
            className="px-5 py-4 cursor-pointer flex gap-3 items-start transition-all duration-300 hover:scale-[1.02] group relative"
            style={{
              background: active === c.id 
                ? 'linear-gradient(90deg, rgba(44,60,105,0.08) 0%, rgba(251,191,36,0.05) 100%)' 
                : 'transparent',
              borderBottom: `1px solid rgba(44,60,105,0.05)`,
              borderLeft: `3px solid ${active === c.id ? P.blue : "transparent"}`,
            }}>
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                 style={{ background: 'radial-gradient(circle at center, rgba(251,191,36,0.08) 0%, transparent 70%)' }} />
            
            <div className="relative z-10">
              <Avatar label={c.av} size={46} online={c.online} color={c.subColor} />
            </div>
            
            <div className="flex-1 min-w-0 relative z-10">
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                  <p className="text-[15px] font-bold truncate" style={{ color: P.text }}>{c.name}</p>
                  {c.online && (
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: P.green }} />
                  )}
                </div>
                <p className="text-[11px] shrink-0 ml-2 font-medium" style={{ color: P.muted }}>{c.lastTime}</p>
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <p className="text-[11.5px] font-bold px-2 py-0.5 rounded-full" 
                   style={{ 
                     background: `${c.subColor}15`,
                     color: c.subColor 
                   }}>{c.subject}</p>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p className="text-[13px] truncate flex-1 font-medium" style={{ color: P.mid }}>{c.lastMsg}</p>
                {c.unread > 0 && (
                  <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white shadow-lg animate-pulse"
                       style={{ 
                         background: 'linear-gradient(135deg, #2C3C69 0%, #FBBF24 100%)',
                         boxShadow: '0 4px 12px rgba(251,191,36,0.4)'
                       }}>{c.unread}</div>
                )}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center h-32 px-5 text-center">
            <p className="text-[13px] font-semibold" style={{ color: P.mid }}>No results found</p>
            <p className="text-[12px] mt-1" style={{ color: P.muted }}>Try a different name or subject</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── CHAT MAIN ── */
function ChatMain({ convo, onBack }: { convo: Convo; onBack: () => void }) {
  const [input, setInput]       = useState("");
  const [messages, setMessages] = useState<MsgItem[]>(convo.messages);
  const [showCtx, setShowCtx]   = useState(false); // Default hide context on mobile
  const [showCal, setShowCal]   = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [mounted, setMounted]   = useState(false);
  const bottomRef               = useRef<HTMLDivElement>(null);
  const fileInputRef            = useRef<HTMLInputElement>(null);
  const calRef                  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Click outside to close calendar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calRef.current && !calRef.current.contains(event.target as Node)) {
        setShowCal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMessages(convo.messages);
    setInput("");
  }, [convo.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showCtx]);

  function send() {
    const t = input.trim();
    if (!t && !attachedFile) return;
    if (!mounted) return;
    
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    
    // Send file if attached
    if (attachedFile) {
      setMessages(m => [...m, { 
        id: Date.now() + 1, from: "student", text: "", time: `Today, ${timeStr}`, date: "Mar 14", 
        type: "file", fileName: attachedFile.name, fileSize: `${(attachedFile.size / 1024).toFixed(1)} KB`,
        fileObj: attachedFile
      }]);
      setAttachedFile(null);
    }
    
    // Send text if exists
    if (t) {
      setMessages(m => [...m, { id: Date.now(), from: "student", text: t, time: `Today, ${timeStr}`, date: "Mar 14", type: "text" }]);
    }
    
    setInput("");
  }
  
  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setAttachedFile(e.target.files[0]);
    }
  }

  function downloadFile(m: MsgItem) {
    if (!m.fileName) return;
    
    // If it's a locally attached file in this session
    if (m.fileObj) {
      const url = URL.createObjectURL(m.fileObj);
      const a = document.createElement("a");
      a.href = url;
      a.download = m.fileName;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    // Dummy download for mocked files
    const a = document.createElement("a");
    const blob = new Blob(["Mock file content for " + m.fileName], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = m.fileName;
    a.click();
    URL.revokeObjectURL(url);
  }

  /* Group messages by date */
  const grouped = messages.reduce((acc, m) => {
    const last = acc[acc.length - 1];
    if (!last || last.date !== m.date) acc.push({ date: m.date, msgs: [m] });
    else last.msgs.push(m);
    return acc;
  }, [] as { date: string, msgs: MsgItem[] }[]);

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative min-w-0">

      {/* Topbar */}
      <div className="px-3 md:px-6 h-[72px] flex items-center justify-between shrink-0 relative overflow-hidden" 
           style={{ 
             background: 'linear-gradient(90deg, rgba(44,60,105,0.02) 0%, rgba(251,191,36,0.02) 100%)',
             borderBottom: `1px solid rgba(44,60,105,0.08)`,
             backdropFilter: 'blur(10px)'
           }}>
        
        {/* Premium gradient overlay */}
        <div className="absolute inset-0 pointer-events-none" 
             style={{ 
               background: 'radial-gradient(circle at left, rgba(44,60,105,0.05) 0%, transparent 50%)',
               mixBlendMode: 'overlay'
             }} />
        
        <div className="flex items-center gap-2 md:gap-3 min-w-0 relative z-10">
          <button onClick={onBack} className="md:hidden w-9 h-9 flex items-center justify-center rounded-full transition-all hover:scale-110 shrink-0 mr-1"
                  style={{ 
                    background: 'rgba(44,60,105,0.06)',
                    color: P.blue 
                  }}>
             <Svg d={D.back} s={18} />
          </button>
          <Avatar label={convo.av} size={44} online={convo.online} color={convo.subColor} />
          <div className="min-w-0 pr-4">
            <h2 className="text-[16px] font-bold truncate" style={{ color: P.text }}>{convo.name}</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-[12px] truncate font-semibold" 
                 style={{ 
                   color: convo.online ? P.green : P.muted,
                   textShadow: convo.online ? '0 0 8px rgba(34,197,94,0.3)' : 'none'
                 }}>
                {convo.online ? "● Online now" : `Last seen ${convo.lastTime}`}
              </p>
              <span className="text-[11px]" style={{ color: P.muted }}>·</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" 
                    style={{ 
                      background: `${convo.subColor}15`,
                      color: convo.subColor 
                    }}>{convo.subject}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <div className="relative" ref={calRef}>
            <button onClick={() => setShowCal(!showCal)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-colors hover:bg-gray-50"
              style={{ border: `1px solid ${showCal ? P.blue : P.border}`, color: showCal ? P.blue : P.mid, background: showCal ? P.blueSub : "transparent" }}>
              <Svg d={D.cal} s={13} className={showCal ? "text-[#2C3C69]" : "text-gray-400"} /> Next: {convo.nextSession.split("·")[0].trim()}
            </button>

            {/* Calendar Popover */}
            {showCal && (
              <div className="absolute top-10 right-0 w-[280px] bg-white rounded-2xl shadow-xl border z-50 p-4"
                   style={{ borderColor: P.border }}>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[13px] font-bold" style={{ color: P.text }}>{convo.nextSession.split("·")[0].trim()}</p>
                  <div className="flex gap-1">
                    <button className="p-1 rounded hover:bg-gray-100" style={{ color: P.muted }}><Svg d={<polyline points="15 18 9 12 15 6"/>} s={14} /></button>
                    <button className="p-1 rounded hover:bg-gray-100" style={{ color: P.muted }}><Svg d={<polyline points="9 18 15 12 9 6"/>} s={14} /></button>
                  </div>
                </div>
                
                {/* Mini mock calendar grid */}
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {['S','M','T','W','T','F','S'].map((d, i) => (
                    <div key={i} className="text-[10px] font-bold" style={{ color: P.muted }}>{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {Array.from({length: 31}).map((_, i) => {
                    const day = i + 1;
                    const isToday = day === 14;
                    const isSelected = day === parseInt(convo.nextSession.match(/\d+/)?.[0] || "0");
                    return (
                      <div key={i} className="h-8 flex flex-col items-center justify-center text-[12px] rounded-full cursor-pointer transition-colors"
                           style={{
                             background: isSelected ? P.blue : isToday ? P.blueSub : "transparent",
                             color: isSelected ? P.white : isToday ? P.blue : P.text,
                             fontWeight: isSelected || isToday ? 600 : 400
                           }}
                           onClick={() => setShowCal(false)}>
                        {day}
                      </div>
                    )
                  })}
                </div>
                <div className="mt-4 pt-3 flex justify-between items-center" style={{ borderTop: `1px solid ${P.borderSoft}` }}>
                  <p className="text-[11.5px] font-medium" style={{ color: P.mid }}>{convo.nextSession.split("·")[1].trim()}</p>
                  <button className="text-[11.5px] font-bold" style={{ color: P.blue }}>Reschedule</button>
                </div>
              </div>
            )}
          </div>

          <div onClick={() => setShowCtx(!showCtx)} 
            className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors hover:bg-gray-50"
            style={{ border: `1px solid ${showCtx ? P.blue : P.border}`, color: showCtx ? P.blue : P.mid, background: showCtx ? P.blueSub : "transparent" }}>
            <Svg d={D.info} s={16} />
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden min-h-0 relative">
        
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-5 flex flex-col gap-0 custom-scrollbar relative" 
             style={{ 
               background: 'linear-gradient(180deg, rgba(250,250,250,1) 0%, rgba(255,255,255,0.5) 100%)',
             }}>
          
          {/* Premium pattern overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-30" 
               style={{ 
                 backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(44,60,105,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(251,191,36,0.03) 0%, transparent 50%)',
               }} />
          {grouped.map((group, gi) => (
            <div key={group.date} className="relative z-10">
              
              {/* Date divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px" 
                     style={{ 
                       background: 'linear-gradient(90deg, transparent 0%, rgba(44,60,105,0.15) 50%, transparent 100%)' 
                     }} />
                <div className="px-3 py-1 rounded-full" 
                     style={{ 
                       background: 'linear-gradient(135deg, rgba(44,60,105,0.08) 0%, rgba(251,191,36,0.08) 100%)',
                       border: '1px solid rgba(44,60,105,0.1)',
                       boxShadow: '0 2px 8px rgba(44,60,105,0.06)'
                     }}>
                  <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: P.mid }}>
                    {group.date === "Mar 14" ? "Today" : group.date === "Mar 13" ? "Yesterday" : group.date}
                  </span>
                </div>
                <div className="flex-1 h-px" 
                     style={{ 
                       background: 'linear-gradient(90deg, transparent 0%, rgba(44,60,105,0.15) 50%, transparent 100%)' 
                     }} />
              </div>

              {group.msgs.map((m, mi) => {
                const isOut    = m.from === "student";
                const isCtx    = m.type === "context";
                const isFile   = m.type === "file";
                const prevSame = mi > 0 && group.msgs[mi - 1].from === m.from && group.msgs[mi - 1].type !== "context";

                if (isCtx) {
                  return (
                    <div key={m.id} className="flex justify-center my-4">
                      <div className="flex items-center gap-2 rounded-full px-4 py-2 border transition-all duration-300 hover:scale-105" 
                           style={{ 
                             background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(250,250,250,0.95) 100%)',
                             borderColor: 'rgba(44,60,105,0.12)',
                             boxShadow: '0 4px 12px rgba(44,60,105,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
                             backdropFilter: 'blur(10px)'
                           }}>
                        <div className="w-6 h-6 rounded-full flex items-center justify-center" 
                             style={{ 
                               background: 'linear-gradient(135deg, rgba(44,60,105,0.1) 0%, rgba(251,191,36,0.1) 100%)' 
                             }}>
                          <Svg d={D.link} s={12} className="text-[#2C3C69]" />
                        </div>
                        <span className="text-[12px] font-bold" style={{ color: P.mid }}>{m.text}</span>
                        <span className="text-[11px] font-medium" style={{ color: P.muted }}>· {m.subtext}</span>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={m.id} className={`flex w-full gap-2.5 items-end ${prevSame ? 'mb-1' : 'mb-3'}`} style={{ flexDirection: isOut ? "row-reverse" : "row" }}>
                    {!isOut && !prevSame ? <Avatar label={convo.av} size={28} /> : !isOut ? <div className="w-7 shrink-0" /> : null}

                    <div className={`flex flex-col max-w-[85%] md:max-w-[70%] ${isOut ? 'items-end' : 'items-start'}`}>
                      {isFile ? (
                        <div onClick={() => downloadFile(m)}
                             className="bg-white rounded-2xl p-4 flex items-center gap-3 border cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group"
                             style={{ 
                               borderColor: 'rgba(44,60,105,0.1)',
                               boxShadow: '0 4px 16px rgba(44,60,105,0.08)'
                             }}>
                          <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110" 
                               style={{ 
                                 background: 'linear-gradient(135deg, rgba(44,60,105,0.1) 0%, rgba(251,191,36,0.1) 100%)',
                                 color: P.blue 
                               }}>
                            <Svg d={D.file} s={18} />
                          </div>
                          <div className="min-w-0 pr-2">
                            <p className="text-[13.5px] font-bold truncate" style={{ color: P.text }}>{m.fileName}</p>
                            <p className="text-[11px] mt-0.5 font-medium" style={{ color: P.muted }}>{m.fileSize} · Click to download</p>
                          </div>
                        </div>
                      ) : (
                        <div className="px-4 py-3 text-[14px] transition-all duration-300 hover:scale-[1.01]"
                             style={{
                               background: isOut 
                                 ? 'linear-gradient(135deg, #2C3C69 0%, #1E2D52 100%)' 
                                 : 'white',
                               color: isOut ? 'white' : P.text,
                               border: isOut ? '1px solid rgba(255,255,255,0.1)' : `1px solid rgba(44,60,105,0.08)`,
                               borderRadius: isOut ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                               boxShadow: isOut 
                                 ? '0 8px 24px rgba(44,60,105,0.25), inset 0 1px 0 rgba(255,255,255,0.1)' 
                                 : '0 2px 8px rgba(44,60,105,0.06)',
                               lineHeight: 1.5,
                             }}>
                          {m.text}
                        </div>
                      )}
                      <p className={`text-[10px] mt-1 mx-1`} style={{ color: P.muted, opacity: prevSame && mi < group.msgs.length - 1 && group.msgs[mi+1].from === m.from ? 0 : 1 }}>
                        {m.time.split(", ")[1] || m.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
          <div ref={bottomRef} className="h-4 shrink-0" />
        </div>

        {/* Desktop Context Panel (Slide out / fixed width) */}
        {showCtx && (
          <div className="hidden lg:block w-[280px] bg-white overflow-y-auto shrink-0 z-10" style={{ borderLeft: `1px solid ${P.border}` }}>
            <div className="p-5">
               <p className="text-[10.5px] font-bold uppercase tracking-widest mb-4" style={{ color: P.muted }}>Context Details</p>
               
               <div className="flex flex-col gap-0 border rounded-xl overflow-hidden" style={{ borderColor: P.border }}>
                 {convo.contextCards.map((ctx, i) => (
                   <div key={i} className="p-4 bg-white" style={{ borderBottom: i < convo.contextCards.length - 1 ? `1px solid ${P.borderSoft}` : "none" }}>
                     <p className="text-[10.5px] font-bold uppercase tracking-wider mb-1" style={{ color: P.muted }}>{ctx.label}</p>
                     <p className="text-[13px] font-semibold leading-tight mb-1" style={{ color: P.text }}>{ctx.value}</p>
                     <p className="text-[11.5px] font-medium" style={{ color: ctx.color }}>{ctx.meta}</p>
                   </div>
                 ))}
               </div>

               <div className="mt-6 border border-gray-100 rounded-xl p-4 bg-gray-50/50">
                 <p className="text-[10.5px] font-bold uppercase tracking-widest mb-3" style={{ color: P.muted }}>Quick Stats</p>
                 <div className="flex flex-col gap-2.5">
                   {[
                     { l: "Total sessions", n: convo.totalSessions, bad: false },
                     { l: "Pending assign", n: convo.pendingAssign || "None", bad: !!convo.pendingAssign },
                   ].map((s, i) => (
                     <div key={i} className="flex justify-between items-center">
                       <span className="text-[12.5px]" style={{ color: P.mid }}>{s.l}</span>
                       <span className="text-[12.5px] font-semibold" style={{ color: s.bad ? P.amberDark : P.text }}>{s.n}</span>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          </div>
        )}

        {/* Mobile Context Overlay */}
        {showCtx && (
          <div className="lg:hidden absolute inset-0 z-20 flex justify-end">
            <div className="absolute inset-0 bg-black/20" onClick={() => setShowCtx(false)} />
            <div className="w-[85%] max-w-[320px] bg-white h-full relative z-30 shadow-2xl overflow-y-auto border-l border-gray-200">
               <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                 <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: P.muted }}>Context</p>
                 <button onClick={() => setShowCtx(false)} className="p-1"><Svg d={<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>} s={16} /></button>
               </div>
               <div className="p-5">
                 <div className="flex flex-col gap-0 border rounded-xl overflow-hidden" style={{ borderColor: P.border }}>
                   {convo.contextCards.map((ctx, i) => (
                     <div key={i} className="p-4 bg-white" style={{ borderBottom: i < convo.contextCards.length - 1 ? `1px solid ${P.borderSoft}` : "none" }}>
                       <p className="text-[10.5px] font-bold uppercase tracking-wider mb-1" style={{ color: P.muted }}>{ctx.label}</p>
                       <p className="text-[13px] font-semibold leading-tight mb-1" style={{ color: P.text }}>{ctx.value}</p>
                       <p className="text-[11.5px] font-medium" style={{ color: ctx.color }}>{ctx.meta}</p>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white shrink-0 z-10 p-4 pt-2 relative overflow-hidden" 
           style={{ 
             borderTop: `1px solid rgba(44,60,105,0.08)`,
             background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,1) 100%)'
           }}>
        
        {/* Premium gradient overlay */}
        <div className="absolute inset-0 pointer-events-none" 
             style={{ 
               background: 'radial-gradient(circle at bottom, rgba(251,191,36,0.03) 0%, transparent 50%)',
               mixBlendMode: 'overlay'
             }} />
        
        {/* Attached File Preview */}
        {attachedFile && (
          <div className="mb-3 p-3 rounded-2xl flex items-center justify-between border relative z-10" 
               style={{ 
                 background: 'linear-gradient(135deg, rgba(44,60,105,0.03) 0%, rgba(251,191,36,0.03) 100%)',
                 borderColor: 'rgba(44,60,105,0.1)',
                 boxShadow: '0 2px 8px rgba(44,60,105,0.06)'
               }}>
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" 
                   style={{ 
                     background: 'linear-gradient(135deg, rgba(44,60,105,0.1) 0%, rgba(251,191,36,0.1) 100%)',
                     color: P.blue 
                   }}>
                <Svg d={D.file} s={15} />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-bold truncate" style={{ color: P.text }}>{attachedFile.name}</p>
                <p className="text-[10.5px] font-medium" style={{ color: P.muted }}>{(attachedFile.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
            <button onClick={() => setAttachedFile(null)} 
                    className="p-1.5 rounded-full transition-all hover:scale-110" 
                    style={{ 
                      background: 'rgba(239,68,68,0.1)',
                      color: P.red 
                    }}>
              <X size={14} />
            </button>
          </div>
        )}

        {/* Quick Replies */}
        {!attachedFile && (
          <div className="flex gap-2 mb-3 overflow-x-auto custom-scrollbar no-scrollbar whitespace-nowrap relative z-10">
            {convo.quickReplies.map((r, i) => (
              <button key={i} onClick={() => setInput(r)}
                className="px-4 py-2 rounded-full text-[12px] font-semibold transition-all duration-300 border hover:scale-105 hover:shadow-lg"
                style={{ 
                  borderColor: 'rgba(44,60,105,0.15)',
                  color: P.mid,
                  background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(250,250,250,1) 100%)',
                  boxShadow: '0 2px 6px rgba(44,60,105,0.04)'
                }}>
                {r}
              </button>
            ))}
          </div>
        )}

        {/* Main Input Box */}
        <div className="flex items-end justify-center w-full gap-2 md:gap-3 mx-auto relative z-10">
          <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileSelect} />
          
          <div className="flex-[0.9] md:flex-[0.85] rounded-3xl flex items-center transition-all duration-200 px-2" 
               style={{ 
                 background: 'linear-gradient(135deg, rgba(250,250,250,1) 0%, rgba(255,255,255,1) 100%)',
                 border: `1.5px solid rgba(44,60,105,0.12)`,
                 boxShadow: '0 4px 16px rgba(44,60,105,0.08), inset 0 1px 2px rgba(255,255,255,0.8)'
               }}>
            
            <button onClick={() => fileInputRef.current?.click()}
              className="w-9 h-9 ml-1 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 hover:scale-110"
              style={{ 
                background: 'rgba(44,60,105,0.06)',
                color: P.blue 
              }}>
              <Svg d={D.clip} s={17} />
            </button>

            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
              }}
              placeholder={`Message ${convo.name.split(" ")[0]}…`}
              className="w-full bg-transparent border-none outline-none text-[14.5px] px-3 py-3 min-h-[46px] max-h-[120px] resize-none overflow-y-auto font-medium"
              style={{ color: P.text, lineHeight: 1.4 }}
              rows={1}
            />
          </div>
          
          <button onClick={send}
            disabled={!input.trim() && !attachedFile}
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 text-white disabled:opacity-50 hover:scale-110"
            style={{ 
              background: (input.trim() || attachedFile) 
                ? 'linear-gradient(135deg, #2C3C69 0%, #FBBF24 100%)' 
                : 'rgba(229,231,235,1)',
              boxShadow: (input.trim() || attachedFile) 
                ? '0 8px 24px rgba(251,191,36,0.4)' 
                : 'none'
            }}>
            <Svg d={D.send} s={18} className={(input.trim() || attachedFile) ? "-ml-0.5 mt-0.5" : ""} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE LAYOUT ── */
export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Setup initial state: default on desktop, empty on mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) setActiveId("cl");
  }, []);

  const active = CONVOS.find(c => c.id === activeId) || null;

  return (
    <div className="flex h-screen overflow-hidden font-matter" style={{ background: P.bg }}>
      
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setMobileSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full z-50 md:hidden">
            <Sidebar isOpen={true} setIsOpen={() => {}} />
          </div>
        </>
      )}

      {/* Main Container */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden min-w-0 bg-white">
        
        {/* Mobile toggle */}
        <div className="md:hidden fixed top-4 left-4 z-30">
          <button onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 bg-white rounded-lg shadow-sm border border-[#E5E7EB]">
            {mobileSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Global Header */}
        <div className="px-5 md:px-7 py-4 md:py-6 mt-14 md:mt-0 shrink-0">
          <Header 
            title="Messenger" 
            titleAccent="" 
            titleSuffix="" 
            subtitle={`${CONVOS.filter(c => c.unread > 0).length} unread message${CONVOS.filter(c => c.unread > 0).length !== 1 ? "s" : ""}`} 
            hideRightTools={true}
          />
        </div>

        {/* Chat Split View Layout */}
        <div className="flex-1 flex overflow-hidden min-h-0 relative">
           
           {/* List Column (Hidden on mobile if a chat is active) */}
           <div className={`h-full ${active ? 'hidden md:block' : 'block w-full md:w-auto'}`}>
             <ConvoList active={active?.id || ""} setActive={setActiveId} />
           </div>

           {/* Msg Column (Hidden on mobile if no chat is active) */}
           <div className={`flex-1 h-full min-w-0 ${!active ? 'hidden md:flex flex-col items-center justify-center bg-gray-50' : 'block'}`}>
             {active ? (
               <ChatMain convo={active} onBack={() => setActiveId(null)} />
             ) : (
               <div className="text-center">
                 <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-4" style={{ color: P.muted, border: `1px solid ${P.border}` }}>
                   <Svg d={<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>} s={24} />
                 </div>
                 <h2 className="text-[18px] font-season" style={{ color: P.text }}>Your Messages</h2>
                 <p className="text-[13px] mt-1" style={{ color: P.muted }}>Select a conversation to start chatting</p>
               </div>
             )}
           </div>

        </div>
      </main>
    </div>
  );
}
