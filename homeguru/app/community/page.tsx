"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Menu, X, ArrowBigUp, ArrowBigDown, MessageSquare, Share2, MoreHorizontal, Award } from "lucide-react";

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
  bg:         "#FFFFFF",
  border:     "#E5E7EB",
  borderSoft: "#F3F4F6",
  text:       "#0F1117",
  mid:        "#303A4F",
  muted:      "#6B7280",
};

/* ── Svg helper ── */
const Svg = ({ d, s = 14, className = "" }: { d: React.ReactNode, s?: number, className?: string }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);

const D = {
  up: <><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></>,
  msg: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>,
  book: <><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></>,
  users: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
  check: <polyline points="20 6 9 17 4 12"/>,
  pin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>,
  srch: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
  fire: <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 3z"/>,
  plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
  back: <polyline points="15 18 9 12 15 6"/>
};

function CommunityBanner() {
  return (
    <div className="relative w-full h-[140px] md:h-[180px] rounded-2xl overflow-hidden mb-6 group cursor-pointer">
      <img 
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200" 
        alt="Community Banner" 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-4 left-6 flex items-end gap-5">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white p-1 shadow-xl border-2 border-white overflow-hidden -mb-2">
           <div className="w-full h-full bg-[#2C3C69] flex items-center justify-center text-white font-black text-2xl font-season rounded-xl">HG</div>
        </div>
        <div className="pb-1 text-white">
          <h2 className="text-xl md:text-2xl font-black m-0 leading-tight">The HomeGuru Collective</h2>
          <p className="text-[12px] md:text-[13px] opacity-90 m-0">hg/collective · 12.4k students online</p>
        </div>
      </div>
    </div>
  );
}

/* ── MOCK DATA ── */
const POSTS = [
  {
    id: 1, type: "question",
    title: "How to distinguish ARP spoofing from normal ARP broadcasts in Wireshark?",
    body: "I'm analyzing a pcap file for our Network Security class and I can see a lot of ARP traffic. My teacher mentioned there's a spoofing pattern in frames 42–67 but I can't isolate what makes it different from normal ARP requests. Any tips on what to look for?",
    author: "Varun K.", av: "VK", subject: "Python", subColor: "#0EA5E9",
    tags: ["Network Security", "Wireshark", "ARP"],
    time: "2 hours ago", views: 47, upvotes: 12, answers: 3,
    solved: true, pinned: false,
    comments: [
      { id: 1, author: "Rohan S.", av: "RS", time: "1h 45m ago", text: "Look at the MAC address in each ARP reply. If the same IP resolves to different MACs within a short time window, that's the spoofing indicator. Filter with: arp.opcode == 2 and then sort by sender IP.", upvotes: 8, isTutor: false },
      { id: 2, author: "Cercei Lannister", av: "CL", time: "1h 30m ago", text: "Rohan is correct. To be more specific — genuine ARP in a local network will always see one IP ↔ one MAC mapping. In your pcap, filter `arp.duplicate-address-detected` and Wireshark will flag the anomaly automatically. Also check the time delta between conflicting replies — legitimate gratuitous ARPs are spaced out; spoofing floods are rapid.", upvotes: 19, isTutor: true },
    ],
  },
  {
    id: 2, type: "resource",
    title: "Comprehensive notes on Python decorators — from basics to class-based patterns",
    body: "Compiled everything from sessions with Aditya sir into one clean PDF. Covers: function decorators, closure-based decorators, functools.wraps, stacking multiple decorators, and class-based decorators with __call__. Hope this helps others in the Python track!",
    author: "Meera P.", av: "MP", subject: "Python", subColor: "#0EA5E9",
    tags: ["Python", "Decorators", "Notes"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
    time: "5 hours ago", views: 134, upvotes: 41, answers: 7,
    solved: false, pinned: true,
    comments: [
      { id: 1, author: "Varun K.", av: "VK", time: "4h ago", text: "This is exactly what I needed before my next session. The class-based section is super clear. Thank you!", upvotes: 6, isTutor: false },
    ],
  },
  {
    id: 3, type: "question",
    title: "Newton's first law — does it apply if there's gravity acting on a body at rest?",
    body: "My teacher said Newton's first law applies to objects at rest OR uniform motion. But if a book is on a table, gravity is acting on it — so there IS a net force. Isn't the first law violated? Or am I misunderstanding something about 'net force'?",
    author: "Kabir R.", av: "KR", subject: "Physics", subColor: "#6366F1",
    tags: ["Physics", "Newton's Laws", "Mechanics"],
    time: "1 day ago", views: 89, upvotes: 27, answers: 5,
    solved: true, pinned: false,
    comments: [],
  },
];

const LEADERBOARD = [
  { rank: 1, name: "Meera Patel",    av: "MP", pts: 1240, badge: "🏆", isYou: false },
  { rank: 2, name: "Rohan Shah",     av: "RS", pts: 1087, badge: "🥈", isYou: false },
  { rank: 3, name: "Anjali Mehta",   av: "AM", pts:  965, badge: "🥉", isYou: false },
  { rank: 4, name: "Varun Kumar",    av: "VK", pts:  842, badge: "",   isYou: true  },
  { rank: 5, name: "Kabir Roy",      av: "KR", pts:  790, badge: "",   isYou: false },
];

const TRENDING = [
  { tag: "ARP Spoofing", posts: 8, color: "#0EA5E9" },
  { tag: "Newton's Laws", posts: 14, color: "#6366F1" },
  { tag: "Decorators", posts: 11, color: "#0EA5E9" },
  { tag: "Present Perfect", posts: 6, color: P.amberDark },
  { tag: "Wireshark", posts: 7, color: "#0EA5E9" },
];

/* ── ATOMS ── */
function Avatar({ label, size = 28, color = P.mid }: { label: string; size?: number; color?: string; }) {
  return (
    <div className="shrink-0 flex items-center justify-center font-bold rounded-full"
      style={{ width: size, height: size, background: color === P.amberDark ? P.amberMid : P.blueSub, border: `1px solid ${color === P.amberDark ? P.amberDark : P.blueMid}`, fontSize: size * 0.34, color: color === P.amberDark ? P.amberDark : P.blueText }}>
      {label}
    </div>
  );
}

function Tag({ label, color }: { label: string; color?: string; }) {
  return (
    <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full"
      style={{ color: color || P.mid, background: color ? `${color}15` : P.bg, border: `1px solid ${color ? `${color}30` : P.border}` }}>
      {label}
    </span>
  );
}

function TypeBadge({ type }: { type: string }) {
  const map: any = {
    question: { l: "Question", c: P.blue },
    resource: { l: "Resource", c: P.green },
    studygroup: { l: "Study Group", c: "#6366F1" },
  };
  const m = map[type] || map.question;
  return <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: m.c }}>{m.l}</span>;
}

/* ── RIGHT PANEL ── */
function RightPanel() {
  const you = LEADERBOARD.find(l => l.isYou) || LEADERBOARD[3];
  return (
    <div className="w-[260px] shrink-0 flex flex-col gap-4 pb-8 hidden xl:flex">

      {/* Leaderboard */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm" style={{ border: `1px solid ${P.border}` }}>
        <div className="p-4 border-b flex items-center gap-2" style={{ borderColor: P.border }}>
          <div className="w-1 h-4 rounded-full" style={{ background: P.blue }} />
          <p className="text-[13px] font-bold m-0" style={{ color: P.text }}>Leaderboard</p>
          <span className="ml-auto text-[10.5px] font-semibold" style={{ color: P.muted }}>This month</span>
        </div>
        {LEADERBOARD.map((u, i) => (
          <div key={u.rank} className="flex items-center gap-2.5 px-4 py-2.5"
            style={{
              borderBottom: i < LEADERBOARD.length - 1 ? `1px solid ${P.borderSoft}` : "none",
              background: u.isYou ? P.amberSub : "transparent",
              borderLeft: u.isYou ? `2px solid ${P.amberDark}` : "2px solid transparent",
            }}>
            <span className="text-[11px] font-bold min-w-[16px]" style={{ color: u.rank <= 3 ? P.text : P.muted }}>
              {u.badge || `#${u.rank}`}
            </span>
            <Avatar label={u.av} size={26} color={u.isYou ? P.amberDark : undefined} />
            <div className="flex-1 min-w-0">
              <p className="text-[12.5px] m-0 truncate" style={{ fontWeight: u.isYou ? 700 : 500, color: u.isYou ? P.text : P.mid }}>
                {u.name}{u.isYou ? " (you)" : ""}
              </p>
            </div>
            <span className="text-[12px] font-bold" style={{ color: u.isYou ? P.amberDark : P.muted }}>{u.pts}</span>
          </div>
        ))}
        <div className="p-3 text-center border-t" style={{ background: P.bg, borderColor: P.border }}>
          <p className="text-[11px] m-0" style={{ color: P.muted }}>
            You're #{you.rank} · <span className="font-semibold" style={{ color: P.amberDark }}>{LEADERBOARD[2].pts - you.pts} pts</span> behind 3rd place
          </p>
        </div>
      </div>

      {/* Trending topics */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm" style={{ border: `1px solid ${P.border}` }}>
        <div className="p-4 border-b flex items-center gap-2" style={{ borderColor: P.border }}>
          <div className="w-1 h-4 rounded-full" style={{ background: P.blue }} />
          <p className="text-[13px] font-bold m-0" style={{ color: P.text }}>Trending Topics</p>
        </div>
        {TRENDING.map((t, i) => (
          <div key={t.tag} className="flex items-center justify-between px-4 py-2.5 transition-colors hover:bg-gray-50 cursor-pointer"
            style={{ borderBottom: i < TRENDING.length - 1 ? `1px solid ${P.borderSoft}` : "none" }}>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: t.color }} />
              <span className="text-[12.5px] font-medium" style={{ color: P.text }}>#{t.tag}</span>
            </div>
            <span className="text-[11px]" style={{ color: P.muted }}>{t.posts} posts</span>
          </div>
        ))}
      </div>

      {/* Your activity */}
      <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `1px solid ${P.border}` }}>
        <div className="flex items-center gap-2 mb-3.5">
          <div className="w-1 h-4 rounded-full" style={{ background: P.blue }} />
          <p className="text-[13px] font-bold m-0" style={{ color: P.text }}>Your Activity</p>
        </div>
        {[
          { n: 7, l: "Posts this month" },
          { n: 23, l: "Upvotes received" },
          { n: 842, l: "Community points" },
        ].map((s, i) => (
          <div key={i} className="flex justify-between py-1.5" style={{ borderBottom: i < 2 ? `1px solid ${P.borderSoft}` : "none" }}>
            <span className="text-[12px]" style={{ color: P.muted }}>{s.l}</span>
            <span className="text-[13px] font-bold" style={{ color: P.text }}>{s.n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── POST CARD ── */
function PostCard({ post, onClick }: { post: any, onClick: () => void }) {
  const [vote, setVote] = useState(0); // 1 = up, -1 = down, 0 = none
  
  return (
    <div onClick={onClick} className="bg-white rounded-xl overflow-hidden flex cursor-pointer transition-all hover:border-[#111827] shadow-sm border"
      style={{ borderColor: P.border }}>
      
      {/* Upvote Column */}
      <div className="w-11 md:w-12 bg-[#F8F9FA] flex flex-col items-center py-3 gap-1 shrink-0">
        <button onClick={e => { e.stopPropagation(); setVote(v => v === 1 ? 0 : 1); }} 
          className={`p-1 rounded hover:bg-gray-200 transition-colors ${vote === 1 ? "text-[#F97316]" : "text-gray-400"}`}>
          <ArrowBigUp size={20} fill={vote === 1 ? "currentColor" : "none"} />
        </button>
        <span className={`text-[12px] font-black ${vote === 1 ? "text-[#F97316]" : vote === -1 ? "text-[#2563EB]" : "text-gray-700"}`}>
          {post.upvotes + vote}
        </span>
        <button onClick={e => { e.stopPropagation(); setVote(v => v === -1 ? 0 : -1); }} 
          className={`p-1 rounded hover:bg-gray-200 transition-colors ${vote === -1 ? "text-[#2563EB]" : "text-gray-400"}`}>
          <ArrowBigDown size={20} fill={vote === -1 ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="flex-1 p-4 md:p-5 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <Avatar label={post.av} size={20} />
          <span className="text-[12px] font-bold text-gray-900 leading-none">{post.author}</span>
          <span className="text-[11px] text-gray-500 leading-none">· {post.time}</span>
          <div className="ml-auto">
            <TypeBadge type={post.type} />
          </div>
        </div>

        <h3 className="text-[15px] md:text-[16px] font-bold m-0 mb-2 leading-snug text-gray-900">{post.title}</h3>

        <p className="text-[13px] m-0 mb-4 leading-relaxed line-clamp-2 text-gray-600">
          {post.body}
        </p>

        {post.image && (
          <div className="w-full h-48 md:h-64 rounded-xl overflow-hidden mb-4 border border-gray-100">
            <img src={post.image} alt="post content" className="w-full h-full object-cover" />
          </div>
        )}

        <div className="flex gap-1.5 flex-wrap mb-4">
          {post.tags.map((t: string) => <Tag key={t} label={t} />)}
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500 text-[12px] font-bold">
            <MessageSquare size={14} />
            <span>{post.answers} Comments</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500 text-[12px] font-bold">
            <Share2 size={14} />
            <span>Share</span>
          </div>
          <button className="ml-auto p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-400">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── POST DETAIL ── */
function PostDetail({ post, onBack }: { post: any, onBack: () => void }) {
  const [reply, setReply] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const [upvoted, setUpvoted] = useState(false);

  function submitReply() {
    if (!reply.trim()) return;
    setComments((c: any) => [...c, {
      id: Date.now(), author: "Varun K.", av: "VK",
      time: "Just now", text: reply.trim(), upvotes: 0, isTutor: false,
    }]);
    setReply("");
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
      {/* Header handled by main layout but we have a back button here */}
      <div className="px-5 md:px-8 py-4 border-b flex items-center gap-3 bg-white shrink-0" style={{ borderColor: P.borderSoft }}>
        <button onClick={onBack} className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 border hover:bg-gray-100 transition-colors"
          style={{ borderColor: P.border, color: P.mid }}>
          <Svg d={D.back} s={14} />
        </button>
        <div>
          <h2 className="text-[16px] font-season m-0" style={{ color: P.text }}>Back to Community</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6" style={{ background: P.bg }}>
        <div className="max-w-[1000px] mx-auto flex gap-6 items-start">

          <div className="flex-1 flex flex-col gap-4 min-w-0">
            {/* post body */}
            <div className="bg-white border rounded-xl p-5 md:p-6 shadow-sm" style={{ borderColor: P.border }}>
              <div className="flex items-center gap-2 mb-2.5">
                <TypeBadge type={post.type} />
                {post.solved && (
                  <span className="flex items-center gap-1 text-[10.5px] font-bold" style={{ color: P.green }}>
                    <Svg d={D.check} s={11} /> Solved
                  </span>
                )}
              </div>
              <h2 className="text-[18px] md:text-[20px] font-bold m-0 mb-3 leading-snug" style={{ color: P.text, letterSpacing: "-0.01em" }}>{post.title}</h2>
              <p className="text-[14px] leading-relaxed m-0 mb-4" style={{ color: P.mid }}>{post.body}</p>
              
              <div className="flex gap-1.5 flex-wrap mb-4">
                {post.tags.map((t: string) => <Tag key={t} label={t} />)}
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: P.borderSoft }}>
                <div className="flex items-center gap-2">
                  <Avatar label={post.av} size={30} />
                  <div>
                    <p className="text-[13px] font-bold m-0 leading-tight" style={{ color: P.text }}>{post.author}</p>
                    <p className="text-[11px] m-0" style={{ color: P.muted }}>{post.time} · {post.views} views</p>
                  </div>
                </div>
                <button onClick={() => setUpvoted(v => !v)} 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md font-bold text-[12.5px] transition-colors border"
                  style={{ background: upvoted ? P.amberSub : "transparent", borderColor: upvoted ? P.amberDark : P.border, color: upvoted ? P.amberDark : P.mid }}>
                  <Svg d={D.up} s={13} /> {post.upvotes + (upvoted ? 1 : 0)} upvotes
                </button>
              </div>
            </div>

            {/* answers / comments */}
            <div className="bg-white border rounded-xl overflow-hidden shadow-sm" style={{ borderColor: P.border }}>
              <div className="p-4 border-b flex items-center gap-2" style={{ borderColor: P.border }}>
                <div className="w-1 h-4 rounded-full" style={{ background: P.blue }} />
                <p className="text-[13px] font-bold m-0" style={{ color: P.text }}>
                  {post.type === "question" ? "Answers" : "Replies"} · {comments.length}
                </p>
              </div>

              {comments.map((c: any, i: number) => (
                <div key={c.id} className="p-4 md:p-5" 
                  style={{ 
                    borderBottom: i < comments.length - 1 ? `1px solid ${P.borderSoft}` : "none", 
                    background: c.isTutor ? P.amberSub : "transparent", 
                    borderLeft: c.isTutor ? `3px solid ${P.amberDark}` : "3px solid transparent" 
                  }}>
                  <div className="flex gap-3 items-start">
                    <Avatar label={c.av} size={34} color={c.isTutor ? P.amberDark : undefined} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[13.5px] font-bold" style={{ color: P.text }}>{c.author}</span>
                        {c.isTutor && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" 
                            style={{ color: P.amberDark, background: P.amberMid }}>Tutor</span>
                        )}
                        <span className="text-[11px]" style={{ color: P.muted }}>{c.time}</span>
                      </div>
                      <p className="text-[13.5px] leading-relaxed m-0 mb-2.5" style={{ color: P.mid }}>{c.text}</p>
                      <button className="flex items-center gap-1 bg-transparent border-none cursor-pointer p-0 text-[12px] font-semibold"
                        style={{ color: P.muted }}>
                        <Svg d={D.up} s={12} /> {c.upvotes} helpful
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* reply box */}
            <div className="bg-white border rounded-xl p-4 md:p-5 shadow-sm" style={{ borderColor: P.border }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 rounded-full" style={{ background: P.blue }} />
                <p className="text-[13px] font-bold m-0" style={{ color: P.text }}>
                   Leave a Reply
                </p>
              </div>
              <textarea
                value={reply} onChange={e => setReply(e.target.value)}
                placeholder="Share your knowledge, experience, or ask a follow-up…"
                className="w-full h-24 p-3 rounded-lg border outline-none text-[13.5px] resize-none"
                style={{ borderColor: P.border, background: P.bg, color: P.text }}
              />
              <div className="flex justify-end mt-3">
                <button onClick={submitReply} 
                  disabled={!reply.trim()}
                  className="px-5 py-2 rounded-full font-bold text-[13px] transition-colors shadow-sm disabled:opacity-50 disabled:shadow-none bg-[#2C3C69] text-white">
                  Post Reply
                </button>
              </div>
            </div>
          </div>

          <RightPanel />
        </div>
      </div>
    </div>
  );
}

/* ── FEED PAGE ── */
function FeedPage({ onOpen }: { onOpen: (p: any) => void }) {
  const [tab, setTab] = useState("all");
  const [sortBy, setSortBy] = useState("hot");
  const [compose, setCompose] = useState(false);
  const [postText, setPostText] = useState("");
  const [postTitle, setPostTitle] = useState("");

  const TABS = [
    { id: "all", l: "All", icon: D.fire },
    { id: "question", l: "Questions", icon: D.msg },
    { id: "resource", l: "Resources", icon: D.book },
    { id: "studygroup", l: "Study Groups", icon: D.users },
  ];

  let filtered = tab === "all" ? POSTS : POSTS.filter(p => p.type === tab);
  
  if (sortBy === "top") {
    filtered = [...filtered].sort((a, b) => b.upvotes - a.upvotes);
  } else if (sortBy === "new") {
    filtered = [...filtered].sort((a, b) => 0); // mock new
  }

  return (
    <main className="flex-1 h-screen overflow-y-auto min-w-0 bg-white">
      <div className="px-4 md:px-8 py-6">
        <div className="max-w-[1100px] mx-auto">
          
          <CommunityBanner />

          <div className="flex gap-6 items-start">
            <div className="flex-1 flex flex-col gap-4 min-w-0">

              {/* compose */}
              {!compose ? (
                <div onClick={() => setCompose(true)} 
                  className="bg-white border rounded-xl p-3.5 flex items-center gap-3 cursor-pointer hover:shadow-sm transition-all shadow-sm"
                  style={{ borderColor: P.border }}>
                  <Avatar label="VK" size={32} />
                  <div className="flex-1 rounded-full px-4 py-2 bg-gray-50 border" style={{ borderColor: P.border }}>
                    <span className="text-[13px]" style={{ color: P.muted }}>Ask a question or share something useful…</span>
                  </div>
                  <button className="flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-[12.5px] shadow-sm bg-[#2C3C69] text-white">
                    <Svg d={D.plus} s={14} /> Post
                  </button>
                </div>
              ) : (
                <div className="bg-white border rounded-xl p-4 md:p-5 shadow-sm" style={{ borderColor: P.border }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-4 rounded-full" style={{ background: P.blue }} />
                    <p className="text-[13px] font-bold m-0" style={{ color: P.text }}>Create a post</p>
                  </div>
                  <input value={postTitle} onChange={e => setPostTitle(e.target.value)} placeholder="Title — make it clear and specific"
                    className="w-full p-2.5 rounded-lg border outline-none text-[14px] font-semibold mb-2"
                    style={{ borderColor: P.border, background: P.bg, color: P.text }} />
                  <textarea value={postText} onChange={e => setPostText(e.target.value)} placeholder="Describe your question or resource in detail…"
                    className="w-full h-24 p-3 rounded-lg border outline-none text-[13.5px] resize-none"
                    style={{ borderColor: P.border, background: P.bg, color: P.text }} />
                  <div className="flex justify-end gap-2 mt-3">
                    <button onClick={() => setCompose(false)} 
                      className="px-4 py-2 rounded-lg border text-[13px] font-semibold hover:bg-gray-50 transition-colors"
                      style={{ borderColor: P.border, color: P.mid }}>Cancel</button>
                    <button 
                      disabled={!postTitle.trim() || !postText.trim()}
                      className="px-4 py-2 rounded-full font-bold text-[13px] shadow-sm disabled:opacity-50 disabled:shadow-none bg-[#2C3C69] text-white">Post to Community</button>
                  </div>
                </div>
              )}

              {/* sorting tabs */}
              <div className="flex items-center gap-2 mb-1 bg-white p-2 rounded-xl border border-gray-100">
                {["hot", "new", "top"].map(s => (
                  <button 
                    key={s} 
                    onClick={() => setSortBy(s)}
                    className={`px-4 py-2 rounded-lg text-[13px] font-bold capitalize transition-all flex items-center gap-2 ${
                      sortBy === s ? "bg-[#F8F9FA] text-[#2C3C69] shadow-sm" : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {s === "hot" && <span className="text-orange-500">🔥</span>}
                    {s === "new" && <span className="text-blue-500">✨</span>}
                    {s === "top" && <span className="text-amber-500">🏆</span>}
                    {s}
                  </button>
                ))}
              </div>

              {/* categories */}
              <div className="flex gap-4 border-b mb-2" style={{ borderColor: P.border }}>
                {TABS.map(t => (
                  <button key={t.id} onClick={() => setTab(t.id)} 
                    className="flex items-center gap-1.5 px-2 py-3 bg-transparent border-none cursor-pointer text-[13.5px] font-bold transition-colors"
                    style={{
                      color: tab === t.id ? P.text : P.muted,
                      borderBottom: `3px solid ${tab === t.id ? P.blue : "transparent"}`,
                      marginBottom: -1,
                    }}>
                    {t.l}
                  </button>
                ))}
              </div>

              {/* feed */}
              <div className="flex flex-col gap-4">
                {filtered.map(p => (
                  <PostCard key={p.id} post={p} onClick={() => onOpen(p)} />
                ))}
              </div>
            </div>

            <RightPanel />
          </div>
        </div>
      </div>
    </main>
  );
}

/* ── ROOT ── */
export default function CommunityPage() {
  const [selected, setSelected] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden font-matter bg-white">
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
        <div className="md:hidden fixed top-4 left-4 z-40">
          <button onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 bg-white rounded-lg shadow-sm border border-[#E5E7EB]">
            {mobileSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Global Header */}
        <div className="px-5 md:px-8 py-4 md:py-6 mt-14 md:mt-0">
          <Header 
            title="Community" 
            titleAccent="" 
            titleSuffix="" 
            subtitle="Peer discussions, shared resources & study groups" 
            hideRightTools={true}
          />
        </div>

        {selected
          ? <PostDetail post={selected} onBack={() => setSelected(null)} />
          : <FeedPage onOpen={p => setSelected(p)} />
        }
      </main>
    </div>
  );
}
