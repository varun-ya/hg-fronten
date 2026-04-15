"use client";
import { useState, useRef, useEffect } from "react";

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
  greenLight: "#10B981",
  greenBg:    "#ECFDF5",
  red:        "#EF4444",
  white:      "#FFFFFF",
  bg:         "#FAFAFA",
  bgChat:     "#FFF8F0",
  bgChatAlt:  "#FFFBF5",
  border:     "#E5E7EB",
  borderSoft: "#F3F4F6",
  borderLight:"#F0F0F0",
  text:       "#0F1117",
  textDark:   "#1A1A1A",
  mid:        "#303A4F",
  muted:      "#6B7280",
  mutedLight: "#9CA3AF",
  bubbleIn:   "#FAFAFA",
  bubbleOut:  "#2C3C69",
  orange:     "#F97316",
  orangeLight:"#FB923C",
  orangeBg:   "#FFF7ED",
  gray:       "#6B7280",
};

/* ── Svg helper ── */
const Svg = ({ d, s = 14, className = "", style }: { d: React.ReactNode, s?: number, className?: string, style?: React.CSSProperties }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className} style={style}
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);

const D = {
  srch: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
  plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
  refresh: <><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></>,
  filter: <><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></>,
  chat: <><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></>,
  cal:  <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
  info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
  link: <><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></>,
  file: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></>,
  clip: <><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></>,
  send: <><path d="M3.714 3.048a.498.498 0 00-.683.627l2.843 7.627a2 2 0 010 1.396l-2.842 7.627a.498.498 0 00.682.627l18-8.5a.5.5 0 000-.904z"/></>,
  back: <polyline points="15 18 9 12 15 6"/>,
  users: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
  down: <polyline points="6 9 12 15 18 9"/>,
  mic: <><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></>,
  emoji: <><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></>,
  image: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></>,
  video: <><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></>,
  doc: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>,
};

/* ── Types ── */
interface MsgItem {
  id: number; from: "tutor" | "student"; type?: "text" | "context" | "file" | "meeting";
  text: string; time: string; date: string;
  subtext?: string; fileName?: string; fileSize?: string; fileObj?: File;
  meetingData?: MeetingData;
  status?: "sent" | "read";
}

interface MeetingData {
  title: string;
  date: string;
  duration: string;
  status: "completed" | "upcoming";
  summary?: string;
  assignments?: Array<{ title: string; dueDate: string; status: string }>;
  notes?: string;
  recordings?: Array<{ title: string; duration: string; url: string }>;
  transcript?: string;
  chatMessages?: Array<{ from: string; text: string; time: string }>;
}

interface CtxCard { type: string; label: string; value: string; meta: string; color: string; }

interface Convo {
  id: string; name: string; av: string; role: "tutor" | "group" | "peer"; 
  subject?: string; subColor?: string; memberCount?: number;
  online: boolean; unread: number; lastMsg: string; lastTime: string;
  nextSession?: string; totalSessions?: number; pendingAssign?: string | null;
  messages: MsgItem[]; quickReplies: string[]; contextCards: CtxCard[];
}

/* ── CONVERSATIONS ── */
const CONVOS: Convo[] = [
  {
    id: "ayush", name: "Ayush Soni", av: "A", role: "tutor", subject: "Maths · Physics", subColor: P.blue,
    online: true, unread: 2, lastMsg: "Great work on the assignment! 💪",
    lastTime: "2m", nextSession: "May 15, 2026 · 4:00 PM", totalSessions: 24, pendingAssign: "Thermodynamics Assignment",
    messages: [
      { id: 1, from: "student", text: "Good morning sir!", time: "9:30 AM", date: "Today", status: "read" },
      { id: 2, from: "tutor", text: "Good morning! Ready for today's class?", time: "9:32 AM", date: "Today" },
      { id: 3, from: "student", text: "Yes sir, I revised the last chapter too 💪", time: "9:33 AM", date: "Today", status: "read" },
      { id: 4, from: "tutor", text: "Great work on the assignment! 💪", time: "9:35 AM", date: "Today" },
    ],
    quickReplies: ["When is our next class?", "I have a doubt", "Can you share the notes?"],
    contextCards: [],
  },
  {
    id: "priya", name: "Priya Menon", av: "P", role: "tutor", subject: "Physics", subColor: "#8B5CF6",
    online: false, unread: 0, lastMsg: "See you at 5:30 for Physics",
    lastTime: "1h", nextSession: "Mar 16, 2026 · 3:00 PM", totalSessions: 18, pendingAssign: null,
    messages: [
      { id: 1, from: "tutor", text: "Hi! Ready for today's session?", time: "4:30 PM", date: "Today" },
      { id: 2, from: "student", text: "Yes ma'am! I have a few doubts from yesterday's class.", time: "4:35 PM", date: "Today", status: "read" },
      { id: 3, from: "tutor", text: "Perfect, we'll clear them first. See you at 5:30 for Physics", time: "5:00 PM", date: "Today" },
    ],
    quickReplies: ["I need help with a problem", "Can we reschedule?", "What's the homework?"],
    contextCards: [],
  },
  {
    id: "jee2026", name: "JEE 2026 Study Group", av: "J", role: "group", memberCount: 24,
    online: true, unread: 5, lastMsg: "Aarav: Anyone solved Q.14?",
    lastTime: "3h",
    messages: [
      { id: 1, from: "student", text: "Anyone solved Q.14 from yesterday?", time: "10:00 AM", date: "Today", status: "read" },
      { id: 2, from: "student", text: "Yeah I got 42 as the answer", time: "10:05 AM", date: "Today", status: "read" },
      { id: 3, from: "student", text: "Same! The trick is to use substitution first", time: "10:06 AM", date: "Today", status: "read" },
      { id: 4, from: "student", text: "Can someone share the solution steps?", time: "10:10 AM", date: "Today", status: "read" },
      { id: 5, from: "student", text: "Sure, let me type it out", time: "10:12 AM", date: "Today", status: "read" },
    ],
    quickReplies: ["What's today's topic?", "Can someone share notes?", "When is the next mock test?"],
    contextCards: [],
  },
  {
    id: "ankit", name: "Ankit Kapoor", av: "K", role: "tutor", subject: "English", subColor: "#10B981",
    online: true, unread: 1, lastMsg: "Essay feedback uploaded",
    lastTime: "5h", nextSession: "Mar 17, 2026 · 2:00 PM", totalSessions: 15, pendingAssign: null,
    messages: [
      { id: 1, from: "tutor", text: "Hi! I've reviewed your essay.", time: "2:00 PM", date: "Today" },
      { id: 2, from: "student", text: "Thank you sir! How was it?", time: "2:10 PM", date: "Today", status: "read" },
      { id: 3, from: "tutor", text: "Good structure, but work on your conclusion. I've added detailed comments.", time: "2:15 PM", date: "Today" },
      { id: 4, from: "tutor", text: "Essay feedback uploaded", time: "2:20 PM", date: "Today" },
    ],
    quickReplies: ["Can you explain this concept?", "What should I study next?", "Any tips for the exam?"],
    contextCards: [],
  },
  {
    id: "sneha", name: "Sneha Kapoor", av: "S", role: "peer",
    online: false, unread: 0, lastMsg: "Did you finish the physics set?",
    lastTime: "1d",
    messages: [
      { id: 1, from: "student", text: "Hey! Did you finish the physics set?", time: "3:00 PM", date: "Today", status: "read" },
      { id: 2, from: "student", text: "Almost done, stuck on Q.8", time: "3:05 PM", date: "Today", status: "read" },
      { id: 3, from: "student", text: "That one is tricky, use energy conservation", time: "3:06 PM", date: "Today", status: "read" },
      { id: 4, from: "student", text: "Oh wait that makes sense, thanks! 🔥", time: "3:10 PM", date: "Today", status: "read" },
    ],
    quickReplies: ["Want to study together?", "Did you understand today's class?", "Can you share your notes?"],
    contextCards: [],
  },
  {
    id: "pcm2026", name: "PCM Batch 2026", av: "P", role: "group", memberCount: 18,
    online: true, unread: 0, lastMsg: "Priya ma'am: Test on Monday",
    lastTime: "1d",
    messages: [
      { id: 1, from: "tutor", text: "Good morning everyone! Today we'll have a quick revision session.", time: "9:00 AM", date: "Yesterday" },
      { id: 2, from: "student", text: "Which topics will we cover?", time: "9:05 AM", date: "Yesterday", status: "read" },
      { id: 3, from: "tutor", text: "We'll revise vectors, calculus basics, and some thermodynamics.", time: "9:10 AM", date: "Yesterday" },
      { id: 4, from: "student", text: "Great! I need help with vector cross products.", time: "9:20 AM", date: "Yesterday", status: "read" },
      { id: 5, from: "tutor", text: "We'll cover that in detail. Make sure you have your doubts ready.", time: "9:25 AM", date: "Yesterday" },
      { id: 6, from: "tutor", text: "Priya ma'am: Test on Monday", time: "9:30 AM", date: "Yesterday" },
    ],
    quickReplies: ["What's the schedule?", "Can we have extra classes?", "When is the test?"],
    contextCards: [],
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
  const [filterTab, setFilterTab] = useState<"all" | "active" | "new">("all");
  const [showNewChatModal, setShowNewChatModal] = useState(false);

  const filtered = CONVOS.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (c.subject && c.subject.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="w-full flex flex-col h-full bg-white border-r border-[#E5E7EB]">
      
      {/* Header */}
      <div className="px-6 py-5 border-b border-[#E5E7EB]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[22px] font-semibold text-[#1A1A1A]">Messages</h2>
          <div className="flex items-center gap-2">
            {/* New Chat Button */}
            <div className="relative">
              <button 
                onClick={() => setShowNewChatModal(!showNewChatModal)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#FAFAFA] transition-colors border-none bg-transparent cursor-pointer text-[#888]"
              >
                <Svg d={D.plus} s={20} />
              </button>
              
              {/* New Chat Modal */}
              {showNewChatModal && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNewChatModal(false)} />
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl p-4 z-50" style={{ border: `1px solid ${P.borderLight}`, minWidth: '280px' }}>
                    <h3 className="text-[15px] font-semibold mb-3" style={{ color: P.textDark }}>Start New Chat</h3>
                    <input 
                      placeholder="Search contacts..."
                      className="w-full px-3 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[13px] outline-none focus:border-[#F97316] transition-colors mb-3"
                      style={{ color: P.text }}
                    />
                    <div className="space-y-1 max-h-[200px] overflow-y-auto">
                      {['Dr. Rajesh Kumar', 'Prof. Anita Deshmukh', 'Mr. Vikram Singh'].map((name) => (
                        <button
                          key={name}
                          onClick={() => {
                            setShowNewChatModal(false);
                            console.log('Start chat with:', name);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F9FAFB] transition-colors border-none cursor-pointer text-left bg-white"
                        >
                          <img 
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
                            alt={name}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-[13px]" style={{ color: P.textDark }}>{name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
            
            {/* Refresh Button */}
            <button 
              onClick={() => {
                console.log('Refreshing conversations...');
                // Add refresh logic here
              }}
              className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#FAFAFA] transition-colors border-none bg-transparent cursor-pointer text-[#888]"
            >
              <Svg d={D.refresh} s={20} />
            </button>
            
            {/* Group Chat Button */}
            <button 
              onClick={() => {
                console.log('Create group chat');
                // Add group chat creation logic
              }}
              className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#FAFAFA] transition-colors border-none bg-transparent cursor-pointer text-[#888]"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative mb-4">
          <Svg d={D.srch} s={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BBB]" />
          <input 
            placeholder="Search leads..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[14px] outline-none focus:border-[#F97316] transition-colors"
            style={{ color: P.text }}
          />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1">
          {(["all", "active", "new"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-colors border-none cursor-pointer capitalize ${
                filterTab === tab
                  ? 'bg-[#FFF7ED] text-[#F97316]'
                  : 'bg-transparent text-[#888] hover:bg-[#F9FAFB]'
              }`}
            >
              {tab === "active" ? "Active 1" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filtered.sort((a, b) => {
          // Sort by most recent first
          const timeOrder = ['Just now', 's', 'm', 'h', 'd'];
          const getTimeValue = (time: string) => {
            if (time === 'Just now') return 0;
            const unit = time.slice(-1);
            const value = parseInt(time);
            const unitIndex = timeOrder.indexOf(unit);
            return unitIndex * 1000 + value;
          };
          return getTimeValue(a.lastTime) - getTimeValue(b.lastTime);
        }).map((c) => {
          const displayColor = c.subColor || (c.role === "tutor" ? P.blue : c.role === "group" ? P.orange : P.gray);
          const isActive = active === c.id;
          
          return (
            <div key={c.id} onClick={() => setActive(c.id)}
              className={`px-4 py-2.5 cursor-pointer flex gap-2.5 items-start transition-all hover:bg-[#FAFAFA] border-b border-[#F5F5F5] ${
                isActive ? 'bg-[#FFF7ED]' : 'bg-white'
              }`}>
              
              <div className="relative shrink-0">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${c.name}`}
                  alt={c.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {c.online && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#10B981] border-2 border-white rounded-full" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-0.5">
                  <h3 className="text-[14px] font-semibold text-[#111] truncate">{c.name}</h3>
                  <span className="text-[10px] text-[#999] shrink-0 ml-2">{c.lastTime}</span>
                </div>
                
                {c.role === "group" && c.memberCount && (
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-[10px] font-medium text-[#10B981] bg-[#ECFDF5] px-1.5 py-0.5 rounded">New</span>
                    <span className="text-[10px] text-[#999]">• {c.memberCount} members</span>
                  </div>
                )}
                
                {c.role === "tutor" && c.subject && (
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-[10px] font-medium text-[#10B981] bg-[#ECFDF5] px-1.5 py-0.5 rounded">New</span>
                  </div>
                )}
                
                <p className="text-[12px] text-[#666] truncate">
                  {c.lastMsg.length > 50 ? c.lastMsg.substring(0, 50) + '...' : c.lastMsg}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── PAGE LAYOUT ── */
export default function ChatPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [conversations, setConversations] = useState<Convo[]>(CONVOS);
  const [mobileShowChat, setMobileShowChat] = useState(false);

  useEffect(() => {
    if (conversations.length > 0) setActiveId(conversations[0].id);
  }, []);

  const active = conversations.find(c => c.id === activeId) || null;

  const handleSelectConvo = (id: string) => {
    setActiveId(id);
    setMobileShowChat(true);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !active) return;
    
    const newMessage: MsgItem = {
      id: active.messages.length + 1,
      from: "student",
      text: messageInput.trim(),
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      date: "Today",
      status: "sent"
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === activeId) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMsg: messageInput.trim(),
          lastTime: "Just now"
        };
      }
      return conv;
    }));

    setMessageInput("");
    
    setTimeout(() => {
      setConversations(prev => prev.map(conv => {
        if (conv.id === activeId) {
          return {
            ...conv,
            messages: conv.messages.map(msg => 
              msg.id === newMessage.id ? { ...msg, status: "read" } : msg
            )
          };
        }
        return conv;
      }));
    }, 2000);
  };

  return (
    <div className="flex h-screen overflow-hidden font-matter" style={{ background: P.bg }}>

      {/* Conversation List - always visible on desktop, toggles on mobile */}
      <div className={`h-full shrink-0 lg:block lg:w-[380px] ${mobileShowChat ? 'hidden' : 'block w-full'}`}>
        <ConvoList active={active?.id || ""} setActive={handleSelectConvo} />
      </div>

      {/* Chat Side */}
      <main className={`flex-1 flex flex-col h-screen overflow-hidden min-w-0 bg-white lg:block ${mobileShowChat ? 'block' : 'hidden'}`}>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden min-h-0 relative h-full">

           {/* Empty State */}
           {!active && (
             <div className="flex-1 h-full min-w-0 flex flex-col items-center justify-center" style={{ background: P.bg }}>
               <div className="text-center">
                 <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-6" style={{ border: `2px solid ${P.border}` }}>
                   <Svg d={D.chat} s={32} className="text-[#F97316]" />
                 </div>
                 <h2 className="text-[20px] font-semibold text-[#111] mb-2">Your conversations</h2>
                 <p className="text-[14px] text-[#888]">Select a conversation to start messaging</p>
               </div>
             </div>
           )}

           {/* Chat Main - Show when active */}
           {active && (
             <div className="flex-1 h-full min-w-0 flex flex-col" style={{ background: P.bg }}>
               {/* Header */}
               <div className="px-4 sm:px-8 py-3.5 flex items-center justify-between shrink-0 bg-white" style={{ borderBottom: `1px solid ${P.borderLight}` }}>
                 <div className="flex items-center gap-4 min-w-0 flex-1">
                   {/* Back button - mobile only */}
                   <button onClick={() => setMobileShowChat(false)} className="lg:hidden p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors border-none bg-transparent cursor-pointer text-[#888]">
                     <Svg d={D.back} s={20} />
                   </button>
                   <div className="relative shrink-0">
                     <img 
                       src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${active.name}`}
                       alt={active.name}
                       className="w-11 h-11 rounded-full object-cover"
                       style={{ border: `2px solid ${P.borderLight}` }}
                     />
                   </div>
                   <div className="min-w-0">
                     <div className="flex items-center gap-2.5 mb-1">
                       <h2 className="text-[16px] font-semibold" style={{ color: P.textDark }}>{active.name}</h2>
                       <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md" style={{ color: P.greenLight, background: P.greenBg }}>New</span>
                     </div>
                     <div className="flex items-center gap-2.5 text-[12px]" style={{ color: P.mutedLight }}>
                       <span className="font-medium">xxxxxx6666</span>
                       <span>·</span>
                       <span className="font-medium">Jodhpur</span>
                     </div>
                   </div>
                 </div>
                 
                 {/* Options Menu */}
                 <div className="relative">
                   <button 
                     onClick={() => setShowOptionsMenu(!showOptionsMenu)}
                     className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-[#FAFAFA] transition-all border-none bg-transparent cursor-pointer" 
                     style={{ color: P.muted }}
                   >
                     <svg width="4" height="18" viewBox="0 0 4 18" fill="currentColor">
                       <circle cx="2" cy="2" r="2"/>
                       <circle cx="2" cy="9" r="2"/>
                       <circle cx="2" cy="16" r="2"/>
                     </svg>
                   </button>
                   
                   {/* Options Dropdown */}
                   {showOptionsMenu && (
                     <>
                       <div className="fixed inset-0 z-40" onClick={() => setShowOptionsMenu(false)} />
                       <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl py-2 z-50" style={{ border: `1px solid ${P.borderLight}`, minWidth: '200px' }}>
                         <button 
                           onClick={() => { setShowOptionsMenu(false); console.log('View Profile'); }}
                           className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#F9FAFB] transition-colors border-none cursor-pointer text-left bg-white"
                         >
                           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                             <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                             <circle cx="12" cy="7" r="4"/>
                           </svg>
                           <span className="text-[14px]" style={{ color: P.textDark }}>View Profile</span>
                         </button>
                         <button 
                           onClick={() => { setShowOptionsMenu(false); console.log('Search Messages'); }}
                           className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#F9FAFB] transition-colors border-none cursor-pointer text-left bg-white"
                         >
                           <Svg d={D.srch} s={18} />
                           <span className="text-[14px]" style={{ color: P.textDark }}>Search Messages</span>
                         </button>
                         <button 
                           onClick={() => { setShowOptionsMenu(false); console.log('Mute Notifications'); }}
                           className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#F9FAFB] transition-colors border-none cursor-pointer text-left bg-white"
                         >
                           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                             <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                             <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                             <line x1="1" y1="1" x2="23" y2="23"/>
                           </svg>
                           <span className="text-[14px]" style={{ color: P.textDark }}>Mute Notifications</span>
                         </button>
                         <div className="h-px bg-[#F0F0F0] my-2" />
                         <button 
                           onClick={() => { setShowOptionsMenu(false); console.log('Block User'); }}
                           className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#FEF2F2] transition-colors border-none cursor-pointer text-left bg-white"
                         >
                           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                             <circle cx="12" cy="12" r="10"/>
                             <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
                           </svg>
                           <span className="text-[14px] text-[#EF4444]">Block User</span>
                         </button>
                       </div>
                     </>
                   )}
                 </div>
               </div>

               {/* Messages Area */}
               <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 sm:py-8">
                 {/* Messages */}
                 <div className="space-y-6 max-w-[900px] mx-auto">
                   {active.messages.map((m, idx) => {
                     const isOut = m.from === "student";
                     const isFile = m.type === "file";

                     return (
                       <div key={m.id} className={`flex gap-4 ${isOut ? 'justify-end' : 'justify-start'}`}>
                         {!isOut && (
                           <img 
                             src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${active.name}`}
                             alt={active.name}
                             className="w-9 h-9 rounded-full object-cover shrink-0 mt-1"
                             style={{ border: `2px solid ${P.borderLight}` }}
                           />
                         )}

                         <div className={`flex flex-col max-w-[60%] ${isOut ? 'items-end' : 'items-start'}`}>
                           
                           {/* Message bubble */}
                           {isFile ? (
                             <div className="bg-white rounded-2xl p-5 flex items-center gap-4 transition-all hover:shadow-lg" style={{ border: `1px solid ${P.borderLight}`, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                               <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: P.bgChat }}>
                                 <Svg d={D.file} s={20} style={{ color: P.muted }} />
                               </div>
                               <div className="min-w-0">
                                 <p className="text-[14px] font-semibold truncate" style={{ color: P.textDark }}>{m.fileName}</p>
                                 <p className="text-[12px] mt-1" style={{ color: P.mutedLight }}>{m.fileSize}</p>
                               </div>
                             </div>
                           ) : (
                             <div className="relative">
                               <div className="px-5 py-4 text-[15px] leading-relaxed font-normal transition-all hover:shadow-md"
                                    style={{
                                      background: isOut ? '#fffbeb' : 'white',
                                      color: P.textDark,
                                      border: `1px solid ${P.borderLight}`,
                                      borderRadius: isOut ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
                                      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                                    }}>
                                 <div>{m.text}</div>
                                 {isOut && (
                                   <div className="flex items-center justify-end gap-2 mt-2">
                                     <span className="text-[11px]" style={{ color: P.mutedLight }}>
                                       {m.time.split(", ")[1] || m.time}
                                     </span>
                                     {m.status && (
                                       <span className="flex items-center">
                                         {m.status === "read" ? (
                                           <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                                             <path d="M1.5 6L4.5 9L9 4.5" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                             <path d="M6.5 6L9.5 9L14 4.5" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                           </svg>
                                         ) : (
                                           <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                                             <path d="M1.5 6L4.5 9L9 4.5" stroke={P.mutedLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                             <path d="M6.5 6L9.5 9L14 4.5" stroke={P.mutedLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                           </svg>
                                         )}
                                       </span>
                                     )}
                                   </div>
                                 )}
                               </div>
                             </div>
                           )}
                           
                           {/* Timestamp for incoming messages */}
                           {!isOut && (
                             <div className="flex items-center gap-2 mt-2">
                               <span className="text-[11px] font-medium" style={{ color: P.mutedLight }}>
                                 {m.time.split(", ")[1] || m.time}
                               </span>
                             </div>
                           )}
                         </div>
                       </div>
                     );
                   })}
                 </div>
               </div>

               {/* Input Area */}
               <div className="bg-white shrink-0 px-4 sm:px-8 py-4 sm:py-6" style={{ borderTop: `1px solid ${P.borderLight}`, boxShadow: '0 -4px 12px rgba(0,0,0,0.03)' }}>
                 <div className="flex items-center gap-3 max-w-[900px] mx-auto">
                   {/* Attach Button */}
                   <div className="relative">
                     <button 
                       onClick={() => setShowAttachMenu(!showAttachMenu)}
                       className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:bg-[#F5F5F5] border-none cursor-pointer" 
                       style={{ background: 'white', color: P.muted }}
                     >
                       <div style={{ 
                         transform: showAttachMenu ? 'rotate(45deg)' : 'rotate(0deg)',
                         transition: 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                       }}>
                         <Svg d={D.plus} s={20} />
                       </div>
                     </button>
                     
                     {/* Attach Menu */}
                     {showAttachMenu && (
                       <>
                         <div className="fixed inset-0 z-40" onClick={() => setShowAttachMenu(false)} />
                         <div className="absolute bottom-full left-0 mb-2 bg-white rounded-2xl shadow-2xl p-3 z-50" style={{ border: `1px solid ${P.borderLight}`, minWidth: '200px' }}>
                           <button 
                             onClick={() => { setShowAttachMenu(false); console.log('Photo'); }}
                             className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#F9FAFB] transition-colors border-none cursor-pointer text-left bg-white"
                           >
                             <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#DBEAFE' }}>
                               <Svg d={D.image} s={18} className="text-[#3B82F6]" />
                             </div>
                             <span className="text-[14px] font-medium" style={{ color: P.textDark }}>Photo</span>
                           </button>
                           <button 
                             onClick={() => { setShowAttachMenu(false); console.log('Video'); }}
                             className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#F9FAFB] transition-colors border-none cursor-pointer text-left bg-white"
                           >
                             <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#FCE7F3' }}>
                               <Svg d={D.video} s={18} className="text-[#EC4899]" />
                             </div>
                             <span className="text-[14px] font-medium" style={{ color: P.textDark }}>Video</span>
                           </button>
                           <button 
                             onClick={() => { setShowAttachMenu(false); console.log('Document'); }}
                             className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#F9FAFB] transition-colors border-none cursor-pointer text-left bg-white"
                           >
                             <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#FEF3C7' }}>
                               <Svg d={D.doc} s={18} className="text-[#F59E0B]" />
                             </div>
                             <span className="text-[14px] font-medium" style={{ color: P.textDark }}>Document</span>
                           </button>
                         </div>
                       </>
                     )}
                   </div>
                   
                   {/* Input Field */}
                   <div className="flex-1 flex items-center gap-2 px-4 py-2 rounded-2xl" style={{ background: P.bgChat, border: `1px solid ${P.borderLight}` }}>
                     <input
                       type="text"
                       placeholder="Type a message..."
                       value={messageInput}
                       onChange={(e) => setMessageInput(e.target.value)}
                       onKeyPress={(e) => {
                         if (e.key === 'Enter' && messageInput.trim()) {
                           handleSendMessage();
                         }
                       }}
                       className="flex-1 bg-transparent text-[14px] outline-none border-none"
                       style={{ color: P.textDark }}
                     />
                     
                     {/* Emoji Button */}
                     <div className="relative">
                       <button 
                         onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                         className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-white border-none cursor-pointer" 
                         style={{ background: 'transparent', color: P.muted }}
                       >
                         <Svg d={D.emoji} s={20} />
                       </button>
                       
                       {/* Simple Emoji Picker */}
                       {showEmojiPicker && (
                         <>
                           <div className="fixed inset-0 z-40" onClick={() => setShowEmojiPicker(false)} />
                           <div className="absolute bottom-full right-0 mb-2 bg-white rounded-2xl shadow-2xl p-4 z-50" style={{ border: `1px solid ${P.borderLight}`, width: '280px' }}>
                             <div className="grid grid-cols-8 gap-2">
                               {['😊', '😂', '❤️', '👍', '🙏', '🔥', '✨', '🎉', '😍', '🤔', '😎', '💪', '👏', '🙌', '💯', '✅'].map((emoji) => (
                                 <button
                                   key={emoji}
                                   onClick={() => {
                                     setMessageInput(messageInput + emoji);
                                     setShowEmojiPicker(false);
                                   }}
                                   className="w-8 h-8 flex items-center justify-center text-[20px] hover:bg-[#F9FAFB] rounded-lg transition-colors border-none cursor-pointer bg-white"
                                 >
                                   {emoji}
                                 </button>
                               ))}
                             </div>
                           </div>
                         </>
                       )}
                     </div>
                   </div>
                   
                   {/* Send/Mic Button */}
                   <button 
                     className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:shadow-lg border-none cursor-pointer" 
                     style={{ background: messageInput.trim() ? '#FB923C' : 'white', color: messageInput.trim() ? 'white' : P.muted, boxShadow: messageInput.trim() ? '0 4px 12px rgba(251,146,60,0.3)' : 'none' }}
                     onClick={() => {
                       if (messageInput.trim()) {
                         handleSendMessage();
                       } else {
                         console.log("Start voice recording");
                       }
                     }}
                   >
                     {messageInput.trim() ? (
                       <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ transform: 'translateX(1px)' }}>
                         <path d="M3.714 3.048a.498.498 0 00-.683.627l2.843 7.627a2 2 0 010 1.396l-2.842 7.627a.498.498 0 00.682.627l18-8.5a.5.5 0 000-.904z"/>
                       </svg>
                     ) : (
                       <Svg d={D.mic} s={20} />
                     )}
                   </button>
                 </div>
               </div>
             </div>
           )}

        </div>
      </main>
    </div>
  );
}
