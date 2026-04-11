"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  HandsClapping,
  ChatCircle,
  BookmarkSimple,
  DotsThree,
  Star,
  PencilSimpleLine,
  SealCheck,
  ShareFat,
  Plus,
  CaretUp,
  CaretDown,
  WifiSlash,
  X,
  TextB,
  TextItalic,
  TextHOne,
  TextHTwo,
  Quotes,
  ListBullets,
  ListNumbers,
  Link,
  Image,
  Code,
  ArrowLeft,
  CircleNotch,
  Clock,
  MapPin,
  GraduationCap,
  CheckCircle,
  XCircle,
  ChatDots,
  CalendarBlank,
} from "@phosphor-icons/react";
import { fetchBlogs, fetchMoreBlogs, FALLBACK_BLOGS, type BlogArticle } from "@/services/blogService";
import { fetchNews, fetchMoreNews, FALLBACK_NEWS, type NewsArticle } from "@/services/newsService";

// ── Stories data ──
const STORY_NAMES = ["Aarav", "Priya", "Rohan", "Sneha", "Amit", "Kavya", "Rahul"];

type Blog = BlogArticle;

// ── Requests data (mirrors tutor_feed_tab.dart) ──
const REQUESTS = [
  { id: 1, name: "Amit Desai", handle: "amit_d", time: "6h", subject: "Mathematics", grade: "Class 11", message: "Looking for help with Calculus. Struggling with integration by parts and definite integrals. Available weekday evenings.", schedule: "Weekday evenings", budget: "₹500/hr", urgency: "high" as const },
  { id: 2, name: "Kavya Singh", handle: "kavya_s", time: "1d", subject: "JEE Advanced", grade: "Class 12", message: "Need intensive coaching for JEE Advanced. Currently scoring 180/300 in mocks, targeting 250+. Can commit 2 hours daily.", schedule: "Daily, 2 hours", budget: "₹800/hr", urgency: "medium" as const },
  { id: 3, name: "Rahul Joshi", handle: "rahul_j", time: "2d", subject: "Physics", grade: "Class 11", message: "Want to start from basics. Failed last 2 exams. Need someone patient who can explain from scratch.", schedule: "Weekends", budget: "₹400/hr", urgency: "low" as const },
  { id: 4, name: "Sneha Reddy", handle: "sneha_r", time: "3d", subject: "Chemistry", grade: "Class 12", message: "Organic chemistry is my weak point. Need help with reaction mechanisms and named reactions before boards.", schedule: "Flexible", budget: "₹600/hr", urgency: "high" as const },
  { id: 5, name: "Vikram Mehta", handle: "vikram_m", time: "4d", subject: "English", grade: "Class 10", message: "Want to improve creative writing and comprehension skills. Currently scoring 60/100, targeting 85+.", schedule: "Tue & Thu evenings", budget: "₹350/hr", urgency: "low" as const },
];

const STAFF_PICKS = [
  { author: "Brennan Kenneth", title: "How I Cracked JEE in 6 Months", date: "3d ago" },
  { author: "Daniel Coffey", title: "I'm Ready When I'm Ready or, The Art of Patient Teaching", date: "Jan 12" },
  { author: "Tobin Zolkowski", title: "The Dialect That Doesn't Exist: Teaching Regional Languages", date: "Mar 15" },
];

const TOPICS = ["Teaching", "EdTech", "Mathematics", "Physics", "JEE Prep", "Online Learning", "Mentorship"];

type Tab = "foryou" | "news" | "requests";

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState<Tab>("foryou");
  const [editorOpen, setEditorOpen] = useState(false);
  const [openBlog, setOpenBlog] = useState<Blog | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>(FALLBACK_BLOGS);
  const [news, setNews] = useState<NewsArticle[]>(FALLBACK_NEWS);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);

  useEffect(() => {
    fetchBlogs().then((data) => { setBlogs(data); setBlogsLoading(false); }).catch(() => setBlogsLoading(false));
    fetchNews().then((data) => { setNews(data); setNewsLoading(false); }).catch(() => setNewsLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-[#111]">

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#FAFAFA] border-b border-[#EBEBEB] px-5 py-2.5">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          <span className="text-[17px] font-medium text-[#111]">Feed</span>
          <button
            onClick={() => setEditorOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E5E7EB] text-[13px] font-medium text-[#111] bg-transparent cursor-pointer hover:bg-white transition-colors"
          >
            <PencilSimpleLine size={14} />
            Write
          </button>
        </div>
      </header>

      {/* Stories */}
      <div className="bg-white border-b border-[#EBEBEB]">
        <div className="max-w-[1100px] mx-auto px-5">
          <div className="flex gap-4 py-3 overflow-x-auto no-scrollbar">
            {/* Your Story */}
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer">
              <div className="relative">
                <div className="w-[56px] h-[56px] rounded-full bg-[#FAFAFA] border border-[#EBEBEB] overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Teacher" alt="You" className="w-full h-full" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-[18px] h-[18px] rounded-full bg-[#111] border-2 border-white flex items-center justify-center">
                  <Plus size={9} weight="bold" className="text-white" />
                </div>
              </div>
              <span className="text-[10px] text-[#888]">Your story</span>
            </div>
            {/* Other stories */}
            {STORY_NAMES.map((name, i) => {
              const seen = i > 3;
              return (
                <div key={name} className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer">
                  <div
                    className="w-[56px] h-[56px] rounded-full p-[2.5px] flex items-center justify-center"
                    style={{
                      background: seen
                        ? undefined
                        : "linear-gradient(135deg, #FBAA47, #D91A46, #A60F93)",
                      border: seen ? "1px solid #EBEBEB" : undefined,
                      padding: seen ? "3px" : "2.5px",
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${name}`} alt={name} className="w-[44px] h-[44px] rounded-full" />
                    </div>
                  </div>
                  <span className={`text-[10px] ${seen ? "text-[#AAA]" : "text-[#111]"}`}>{name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#FAFAFA] border-b border-[#EBEBEB]">
        <div className="max-w-[1100px] mx-auto px-5 flex gap-6">
          {([
            { id: "foryou", label: "For you" },
            { id: "news", label: "News" },
            { id: "requests", label: "Requests" },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative py-3 text-[13px] transition-colors cursor-pointer bg-transparent border-none"
              style={{ color: activeTab === tab.id ? "#111" : "#888" }}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#111]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1100px] mx-auto flex px-5 py-6 gap-6">

        {/* Main Feed */}
        <main className="flex-1 min-w-0">
          {activeTab === "foryou" && <ForYouTab blogs={blogs} loading={blogsLoading} onOpenBlog={setOpenBlog} onLoadMore={async () => { const more = await fetchMoreBlogs(); if (more.length) setBlogs((prev) => [...prev, ...more]); }} />}
          {activeTab === "news" && <NewsTab news={news} loading={newsLoading} onLoadMore={async () => { const more = await fetchMoreNews(); if (more.length) setNews((prev) => [...prev, ...more]); }} />}
          {activeTab === "requests" && <RequestsTab />}
        </main>

        {/* Right Sidebar */}
        <aside className="hidden lg:block w-[280px] flex-shrink-0">
          <div className="sticky top-[52px] space-y-4">

          {/* Staff Picks */}
          <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#EBEBEB]">
              <span className="text-[11px] font-semibold text-[#AAA] uppercase tracking-widest">Staff Picks</span>
            </div>
            <div className="p-4 space-y-4">
              {STAFF_PICKS.map((pick, i) => (
                <div key={i} className="cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${pick.author}`} alt={pick.author} className="w-5 h-5 rounded-full" style={{ backgroundColor: "#FAFAFA" }} />
                    <span className="text-[12px] text-[#888]">{pick.author}</span>
                  </div>
                  <h4 className="text-[13px] font-medium text-[#111] leading-snug mb-0.5">{pick.title}</h4>
                  <span className="text-[11px] text-[#AAA]">{pick.date}</span>
                </div>
              ))}
            </div>
            <div className="px-4 pb-3">
              <button className="text-[12px] text-[#F97316] cursor-pointer bg-transparent border-none">See the full list</button>
            </div>
          </div>

          {/* Topics */}
          <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#EBEBEB]">
              <span className="text-[11px] font-semibold text-[#AAA] uppercase tracking-widest">Topics</span>
            </div>
            <div className="p-4 flex flex-wrap gap-1.5">
              {TOPICS.map((topic) => (
                <span key={topic} className="px-3 py-1.5 rounded-full bg-[#FAFAFA] text-[12px] text-[#666] cursor-pointer hover:bg-[#F0F0F0] transition-colors border border-[#EBEBEB]">
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 px-1 text-[11px] text-[#AAA]">
            {["Help", "About", "Privacy", "Terms"].map((l) => (
              <span key={l} className="cursor-pointer hover:text-[#888]">{l}</span>
            ))}
          </div>
          </div>
        </aside>
      </div>

      {/* FAB — Write */}
      <button
        onClick={() => setEditorOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[#111] hover:bg-[#000] text-white flex items-center justify-center shadow-lg transition-colors cursor-pointer border-none z-50 lg:hidden"
      >
        <PencilSimpleLine size={19} weight="bold" />
      </button>

      {/* Blog Editor Modal */}
      {editorOpen && <BlogEditor onClose={() => setEditorOpen(false)} />}

      {/* Blog Detail Modal */}
      {openBlog && <BlogDetail blog={openBlog} allBlogs={blogs} onClose={() => setOpenBlog(null)} />}
    </div>
  );
}

// ── Blog Editor (mail-compose style) ──
function BlogEditor({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState("Education");
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => { bodyRef.current?.focus(); }, []);

  const insertAround = (before: string, after: string) => {
    const ta = bodyRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = body.slice(start, end);
    const replacement = `${before}${selected || "text"}${after}`;
    const next = body.slice(0, start) + replacement + body.slice(end);
    setBody(next);
    requestAnimationFrame(() => {
      ta.focus();
      const cursorPos = selected ? start + replacement.length : start + before.length;
      const cursorEnd = selected ? cursorPos : cursorPos + 4;
      ta.setSelectionRange(cursorPos, cursorEnd);
    });
  };

  const prefixLines = (prefix: string) => {
    const ta = bodyRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const lineStart = body.lastIndexOf("\n", start - 1) + 1;
    const lineEnd = body.indexOf("\n", end);
    const blockEnd = lineEnd === -1 ? body.length : lineEnd;
    const block = body.slice(lineStart, blockEnd);
    const prefixed = block.split("\n").map((line) =>
      line.startsWith(prefix) ? line.slice(prefix.length) : prefix + line
    ).join("\n");
    setBody(body.slice(0, lineStart) + prefixed + body.slice(blockEnd));
    requestAnimationFrame(() => { ta.focus(); ta.setSelectionRange(lineStart, lineStart + prefixed.length); });
  };

  const insertNumberedList = () => {
    const ta = bodyRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const lineStart = body.lastIndexOf("\n", start - 1) + 1;
    const lineEnd = body.indexOf("\n", end);
    const blockEnd = lineEnd === -1 ? body.length : lineEnd;
    const lines = body.slice(lineStart, blockEnd).split("\n");
    const isNumbered = /^\d+\.\s/.test(lines[0]);
    const prefixed = lines.map((line, i) =>
      isNumbered ? line.replace(/^\d+\.\s/, "") : `${i + 1}. ${line}`
    ).join("\n");
    setBody(body.slice(0, lineStart) + prefixed + body.slice(blockEnd));
    requestAnimationFrame(() => { ta.focus(); ta.setSelectionRange(lineStart, lineStart + prefixed.length); });
  };

  const insertLink = () => {
    const ta = bodyRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const selected = body.slice(start, ta.selectionEnd);
    const linkText = selected || "link text";
    const replacement = `[${linkText}](url)`;
    setBody(body.slice(0, start) + replacement + body.slice(ta.selectionEnd));
    requestAnimationFrame(() => { ta.focus(); const u = start + linkText.length + 3; ta.setSelectionRange(u, u + 3); });
  };

  const insertImage = () => {
    const ta = bodyRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const replacement = "![alt text](image-url)";
    setBody(body.slice(0, start) + replacement + body.slice(ta.selectionEnd));
    requestAnimationFrame(() => { ta.focus(); ta.setSelectionRange(start + 12, start + 21); });
  };

  const wordCount = body.trim() ? body.trim().split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const toolBtn = (Icon: any, active: boolean, onClick: () => void) => (
    <button
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer border-none transition-all"
      style={{
        backgroundColor: active ? "#111" : "transparent",
      }}
      title={Icon.displayName || ""}
    >
      <Icon size={16} weight="bold" style={{ color: active ? "#fff" : "#999" }} />
    </button>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />

      {/* Editor card — centered, mail-compose style */}
      <div className="relative w-full max-w-[680px] mx-4 bg-white rounded-[16px] flex flex-col shadow-2xl animate-editor-in" style={{ maxHeight: "88vh" }}>

        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-[#F0F0F0]">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#F5F5F5] transition-colors cursor-pointer bg-transparent border-none text-[#999]">
              <X size={18} />
            </button>
            <span className="text-[14px] font-medium text-[#111]">New Post</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg bg-[#F5F5F5] text-[12px] font-medium text-[#666] border-none cursor-pointer hover:bg-[#EBEBEB] transition-colors"
            >
              Save Draft
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[#111] text-[12px] font-medium text-white border-none cursor-pointer hover:bg-[#000] transition-colors"
            >
              Publish
            </button>
          </div>
        </div>

        {/* Meta fields — mail-style rows */}
        <div className="border-b border-[#F0F0F0]">
          <div className="flex items-center px-6 py-2.5 gap-3 border-b border-[#F5F5F5]">
            <span className="text-[12px] text-[#AAA] w-12 flex-shrink-0">From</span>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#DCE8F5] flex items-center justify-center">
                <span className="text-[8px] font-semibold" style={{ color: "#1E3162" }}>T</span>
              </div>
              <span className="text-[13px] text-[#111]">You</span>
              <span className="text-[9px] font-medium px-1.5 py-0.5 rounded" style={{ backgroundColor: "#FAFAFA" }}>
                <span className="font-semibold" style={{ color: "#1E3162" }}>home</span>
                <span className="font-semibold" style={{ color: "#E08A3C" }}>Guru</span>
              </span>
            </div>
          </div>
          <div className="flex items-center px-6 py-2.5 gap-3 border-b border-[#F5F5F5]">
            <span className="text-[12px] text-[#AAA] w-12 flex-shrink-0">Topic</span>
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="text-[13px] text-[#111] bg-transparent border-none outline-none cursor-pointer appearance-none"
            >
              {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
              <option value="Education">Education</option>
              <option value="Personal">Personal</option>
            </select>
          </div>
          <div className="flex items-center px-6 py-2.5 gap-3">
            <span className="text-[12px] text-[#AAA] w-12 flex-shrink-0">Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your post title"
              className="flex-1 text-[14px] font-medium text-[#111] placeholder:text-[#CCC] border-none outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Toolbar — between meta and body */}
        <div className="flex items-center gap-0.5 px-5 py-1.5 border-b border-[#F0F0F0] bg-[#FAFAFA]">
          {toolBtn(TextB, bold, () => { setBold(!bold); insertAround("**", "**"); })}
          {toolBtn(TextItalic, italic, () => { setItalic(!italic); insertAround("*", "*"); })}
          <div className="w-px h-4 mx-1 bg-[#E5E5E5]" />
          {toolBtn(TextHOne, false, () => prefixLines("# "))}
          {toolBtn(TextHTwo, false, () => prefixLines("## "))}
          <div className="w-px h-4 mx-1 bg-[#E5E5E5]" />
          {toolBtn(Quotes, false, () => prefixLines("> "))}
          {toolBtn(ListBullets, false, () => prefixLines("- "))}
          {toolBtn(ListNumbers, false, () => insertNumberedList())}
          <div className="w-px h-4 mx-1 bg-[#E5E5E5]" />
          {toolBtn(Link, false, () => insertLink())}
          {toolBtn(Image, false, () => insertImage())}
          {toolBtn(Code, false, () => insertAround("`", "`"))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5" style={{ minHeight: 240 }}>
          <textarea
            ref={bodyRef}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Tell your story..."
            className="w-full h-full text-[15px] text-[#111] placeholder:text-[#CCC] border-none outline-none bg-transparent resize-none"
            style={{
              lineHeight: 1.8,
              minHeight: 220,
              fontWeight: bold ? 700 : 400,
              fontStyle: italic ? "italic" : "normal",
            }}
          />
        </div>

        {/* Footer status bar */}
        <div className="flex items-center justify-between px-6 py-2.5 border-t border-[#F0F0F0] bg-[#FAFAFA] rounded-b-[16px]">
          <span className="text-[11px] text-[#AAA]">
            {wordCount} {wordCount === 1 ? "word" : "words"} · {readTime} min read
          </span>
          <span className="text-[11px] text-[#AAA]">Markdown supported</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes editorIn {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-editor-in {
          animation: editorIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}

// ── Tag color map ──
const TAG_COLORS: Record<string, { bg: string; text: string; accent: string }> = {
  Mathematics: { bg: "#F5F5F8", text: "#555", accent: "#6366F1" },
  Physics: { bg: "#F7F5F3", text: "#666", accent: "#F97316" },
  "Study Tips": { bg: "#F4F6F4", text: "#555", accent: "#22C55E" },
  Personal: { bg: "#F6F4F6", text: "#666", accent: "#EC4899" },
  "JEE Prep": { bg: "#F6F4F4", text: "#666", accent: "#EF4444" },
  Teaching: { bg: "#F3F6F5", text: "#555", accent: "#10B981" },
  EdTech: { bg: "#F4F5F8", text: "#555", accent: "#3B82F6" },
};
const DEFAULT_TAG_COLOR = { bg: "#F5F5F5", text: "#555", accent: "#888" };

// ── Render body with styled paragraphs, lists, bold ──
function renderBody(body: string) {
  const paragraphs = body.split("\n\n");
  return paragraphs.map((p, i) => {
    const trimmed = p.trim();
    if (!trimmed) return null;

    // Numbered list block
    const lines = trimmed.split("\n");
    const isNumberedList = lines.every((l) => /^\d+\.\s/.test(l.trim()));
    if (isNumberedList) {
      return (
        <div key={i} className="my-6 space-y-4">
          {lines.map((line, j) => {
            const match = line.match(/^(\d+)\.\s(.+)/);
            if (!match) return null;
            const [, num, text] = match;
            // Split on em-dash to get title and description
            const dashIdx = text.indexOf(" — ");
            return (
              <div key={j} className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[12px] font-medium text-[#888] mt-0.5">
                  {num}
                </span>
                <div className="flex-1">
                  {dashIdx > -1 ? (
                    <>
                      <span className="text-[16px] font-medium text-[#111]">{text.slice(0, dashIdx)}</span>
                      <span className="text-[16px] text-[#444]"> — {text.slice(dashIdx + 3)}</span>
                    </>
                  ) : (
                    <span className="text-[16px] text-[#333]">{text}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // Bullet list block
    const isBulletList = lines.every((l) => /^[•\-]\s/.test(l.trim()));
    if (isBulletList) {
      return (
        <div key={i} className="my-6 space-y-3 pl-1">
          {lines.map((line, j) => {
            const text = line.replace(/^[•\-]\s/, "");
            const dashIdx = text.indexOf(" — ");
            return (
              <div key={j} className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#CCC] mt-[10px]" />
                <div className="flex-1">
                  {dashIdx > -1 ? (
                    <>
                      <span className="text-[16px] font-medium text-[#111]">{text.slice(0, dashIdx)}</span>
                      <span className="text-[16px] text-[#444]"> — {text.slice(dashIdx + 3)}</span>
                    </>
                  ) : (
                    <span className="text-[16px] text-[#333]">{text}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // Section headers (e.g. "Days 1-30: Foundation", "Step 1: ...")
    const isHeader = /^(Step \d|Days \d|Here'?s)/.test(trimmed);
    if (isHeader && trimmed.length < 120) {
      return (
        <h3 key={i} className="text-[18px] font-medium text-[#111] mt-10 mb-2" style={{ letterSpacing: "-0.2px" }}>
          {trimmed}
        </h3>
      );
    }

    // Regular paragraph — first paragraph gets drop cap
    if (i === 0) {
      const firstChar = trimmed[0];
      const rest = trimmed.slice(1);
      return (
        <p key={i} className="text-[16px] text-[#333] leading-[1.9] mb-1">
          <span
            className="float-left text-[52px] font-semibold leading-[1] mr-2 mt-1"
            style={{ color: "#111" }}
          >
            {firstChar}
          </span>
          {rest}
        </p>
      );
    }

    return (
      <p key={i} className="text-[16px] text-[#333] leading-[1.9] mb-1">
        {trimmed}
      </p>
    );
  });
}

// ── Blog Detail (full-page reading view) ──
function BlogDetail({ blog, allBlogs, onClose }: { blog: Blog; allBlogs: Blog[]; onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [clapped, setClapped] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [clapCount, setClapCount] = useState(blog.likes);
  const tagColor = TAG_COLORS[blog.tag] || DEFAULT_TAG_COLOR;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const pct = el.scrollTop / (el.scrollHeight - el.clientHeight);
    setProgress(Math.min(1, Math.max(0, pct)));
  };

  const handleClap = () => {
    if (!clapped) setClapCount((c) => c + 1);
    setClapped(true);
  };

  // Related blogs from same author (excluding current)
  const morePosts = allBlogs.filter((b) => b.author === blog.author && b.id !== blog.id).slice(0, 2);

  return (
    <div className="fixed inset-0 z-[100] bg-white animate-blog-in">

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-20 h-[2px] bg-transparent">
        <div
          className="h-full transition-all duration-150 ease-out"
          style={{ width: `${progress * 100}%`, backgroundColor: tagColor.accent }}
        />
      </div>

      {/* Sticky top bar */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-[#F0F0F0]">
        <div className="max-w-[700px] mx-auto flex items-center justify-between px-5 py-2.5">
          <button onClick={onClose} className="flex items-center gap-2 text-[13px] text-[#888] hover:text-[#111] transition-colors cursor-pointer bg-transparent border-none">
            <ArrowLeft size={16} />
            Back
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={handleClap}
              className="p-2 rounded-lg hover:bg-[#F5F5F5] transition-all cursor-pointer bg-transparent border-none"
              style={{ color: clapped ? tagColor.accent : "#999" }}
            >
              <HandsClapping size={18} weight={clapped ? "fill" : "regular"} />
            </button>
            <button className="p-2 rounded-lg hover:bg-[#F5F5F5] transition-colors cursor-pointer bg-transparent border-none text-[#999] hover:text-[#111]">
              <ChatCircle size={18} />
            </button>
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className="p-2 rounded-lg hover:bg-[#F5F5F5] transition-all cursor-pointer bg-transparent border-none"
              style={{ color: bookmarked ? "#111" : "#999" }}
            >
              <BookmarkSimple size={18} weight={bookmarked ? "fill" : "regular"} />
            </button>
            <button className="p-2 rounded-lg hover:bg-[#F5F5F5] transition-colors cursor-pointer bg-transparent border-none text-[#999] hover:text-[#111]">
              <ShareFat size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="h-[calc(100vh-45px)] overflow-y-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Hero header area */}
        <div className="relative" style={{ backgroundColor: tagColor.bg }}>
          <div className="max-w-[700px] mx-auto px-5 pt-12 pb-10">
            {/* Tag pill */}
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium mb-6"
              style={{ backgroundColor: "#F0F0F0", color: "#555" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#AAA" }} />
              {blog.tag}
              <span className="text-[11px] opacity-60 ml-1">{blog.readTime}</span>
            </span>

            {/* Title */}
            <h1 className="text-[36px] font-medium text-[#111] leading-[1.15] mb-4" style={{ letterSpacing: "-0.6px" }}>
              {blog.title}
            </h1>

            {/* Subtitle as pull-quote */}
            <p className="text-[18px] text-[#666] leading-[1.6] max-w-[580px]" style={{ letterSpacing: "-0.1px" }}>
              {blog.subtitle}
            </p>
          </div>
          {/* Curved bottom edge */}
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-white" style={{ borderRadius: "24px 24px 0 0" }} />
        </div>

        <article className="max-w-[700px] mx-auto px-5 pb-20">

          {/* Author card */}
          <div className="flex items-center gap-3.5 mb-10 -mt-1">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: blog.isLocal ? "#DCE8F5" : "#F5F5F5" }}
            >
              <span className="text-[15px] font-semibold" style={{ color: blog.isLocal ? "#1E3162" : "#888" }}>
                {blog.author[0]}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[14px] font-medium text-[#111]">{blog.author}</span>
                {blog.isLocal && <SealCheck size={14} weight="fill" className="text-[#1E3162]" />}
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded" style={{ backgroundColor: "#F5F5F5" }}>
                  {blog.isLocal ? (
                    <span>
                      <span className="font-semibold" style={{ color: "#1E3162" }}>home</span>
                      <span className="font-semibold" style={{ color: "#E08A3C" }}>Guru</span>
                    </span>
                  ) : (
                    <span className="text-[#888]">{blog.source}</span>
                  )}
                </span>
              </div>
              <span className="text-[12px] text-[#AAA]">{blog.date}</span>
            </div>
            <button className="px-4 py-1.5 rounded-full text-[12px] font-medium border border-[#EBEBEB] text-[#111] bg-transparent hover:bg-[#F5F5F5] transition-colors cursor-pointer">
              Follow
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#F0F0F0] mb-8" />

          {/* Body — rich rendered */}
          <div className="article-body">
            {renderBody(blog.body)}
          </div>

          {/* Source for external */}
          {!blog.isLocal && (
            <p className="text-[12px] text-[#BBB] mt-8">Source: {blog.source}</p>
          )}

          {/* Engagement bar */}
          <div className="mt-12 py-5 border-t border-b border-[#F0F0F0] flex items-center gap-2">
            <button
              onClick={handleClap}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-[14px] transition-all cursor-pointer border"
              style={{
                backgroundColor: clapped ? `${tagColor.accent}10` : "transparent",
                borderColor: clapped ? `${tagColor.accent}30` : "#EBEBEB",
                color: clapped ? tagColor.accent : "#888",
              }}
            >
              <HandsClapping size={18} weight={clapped ? "fill" : "regular"} />
              {clapCount}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full text-[14px] text-[#888] border border-[#EBEBEB] hover:bg-[#FAFAFA] transition-colors cursor-pointer bg-transparent">
              <ChatCircle size={18} />
              {blog.comments}
            </button>
            <span className="flex-1" />
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className="p-2.5 rounded-full border border-[#EBEBEB] hover:bg-[#FAFAFA] transition-all cursor-pointer bg-transparent"
              style={{ color: bookmarked ? "#111" : "#999" }}
            >
              <BookmarkSimple size={18} weight={bookmarked ? "fill" : "regular"} />
            </button>
            <button className="p-2.5 rounded-full border border-[#EBEBEB] hover:bg-[#FAFAFA] transition-colors cursor-pointer bg-transparent text-[#999] hover:text-[#111]">
              <ShareFat size={18} />
            </button>
          </div>

          {/* More from author */}
          {morePosts.length > 0 && (
            <div className="mt-10">
              <span className="text-[11px] font-semibold text-[#AAA] uppercase tracking-widest">More from {blog.author}</span>
              <div className="mt-4 space-y-3">
                {morePosts.map((post) => (
                  <div key={post.id} className="p-4 rounded-[14px] border border-[#EBEBEB] hover:bg-[#FAFAFA] transition-colors cursor-pointer">
                    <h4 className="text-[14px] font-medium text-[#111] leading-snug mb-1">{post.title}</h4>
                    <p className="text-[13px] text-[#888] line-clamp-1">{post.subtitle}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ backgroundColor: (TAG_COLORS[post.tag] || DEFAULT_TAG_COLOR).bg, color: (TAG_COLORS[post.tag] || DEFAULT_TAG_COLOR).text }}>{post.tag}</span>
                      <span className="text-[11px] text-[#AAA]">{post.readTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>

      <style jsx>{`
        @keyframes blogIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-blog-in {
          animation: blogIn 0.2s ease-out;
        }
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

// ── Shimmer skeleton ──
function CardSkeleton() {
  return (
    <div className="bg-white border border-[#EBEBEB] rounded-[14px] p-4 animate-pulse">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-[22px] h-[22px] rounded-full bg-[#F0F0F0]" />
        <div className="h-3 w-20 rounded bg-[#F0F0F0]" />
        <div className="ml-auto h-3 w-16 rounded bg-[#F0F0F0]" />
      </div>
      <div className="h-4 w-3/4 rounded bg-[#F0F0F0] mb-2" />
      <div className="h-3 w-full rounded bg-[#F0F0F0] mb-1" />
      <div className="h-3 w-2/3 rounded bg-[#F0F0F0] mb-3" />
      <div className="flex gap-2">
        <div className="h-5 w-16 rounded-full bg-[#F0F0F0]" />
        <div className="h-5 w-20 rounded-full bg-[#F0F0F0]" />
      </div>
    </div>
  );
}

// ── For You Tab ──
function ForYouTab({ blogs, loading, onOpenBlog, onLoadMore }: { blogs: Blog[]; loading: boolean; onOpenBlog: (blog: Blog) => void; onLoadMore: () => Promise<void> }) {
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingRef.current) {
          loadingRef.current = true;
          setLoadingMore(true);
          onLoadMore().finally(() => { loadingRef.current = false; setLoadingMore(false); });
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loading, onLoadMore]);

  return (
    <div className="space-y-3">
      {blogs.map((blog, idx) => (
        <article
          key={`${blog.id}-${idx}`}
          onClick={() => onOpenBlog(blog)}
          className="bg-white border border-[#EBEBEB] rounded-[14px] p-4 cursor-pointer hover:bg-[#FAFAFA] transition-colors"
        >
          {/* Author row */}
          <div className="flex items-center gap-2 mb-2.5">
            <div
              className="w-[22px] h-[22px] rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: blog.isLocal ? "#DCE8F5" : "#F5F5F5" }}
            >
              <span className="text-[9px] font-semibold" style={{ color: blog.isLocal ? "#1E3162" : "#888" }}>
                {blog.author[0]}
              </span>
            </div>
            <span className="text-[12px] font-medium text-[#111]">{blog.author}</span>
            {blog.isLocal && <SealCheck size={12} weight="fill" className="text-[#1E3162]" />}
            <span
              className="text-[9px] font-medium px-[5px] py-[1px] rounded-md"
              style={{
                backgroundColor: "#FAFAFA",
                color: blog.isLocal ? undefined : "#888",
              }}
            >
              {blog.isLocal ? (
                <span>
                  <span className="font-semibold" style={{ color: "#1E3162" }}>home</span>
                  <span className="font-semibold" style={{ color: "#E08A3C" }}>Guru</span>
                </span>
              ) : blog.source}
            </span>
            <span className="ml-auto text-[11px] text-[#AAA]">{blog.date}</span>
          </div>

          {/* Title + subtitle */}
          <h2 className="text-[15px] font-medium text-[#111] leading-snug mb-1">{blog.title}</h2>
          <p className="text-[13px] text-[#888] leading-relaxed mb-3 line-clamp-2">{blog.subtitle}</p>

          {/* Meta row */}
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-[#FAFAFA] text-[11px] text-[#111]">{blog.tag}</span>
            <span className="text-[12px] text-[#AAA]">{blog.readTime}</span>
            {blog.likes > 0 && (
              <>
                <span className="ml-auto" />
                <span className="flex items-center gap-1 text-[12px] text-[#AAA]">
                  <HandsClapping size={13} />
                  {blog.likes}
                </span>
                <span className="flex items-center gap-1 text-[12px] text-[#AAA]">
                  <ChatCircle size={13} />
                  {blog.comments}
                </span>
              </>
            )}
            <BookmarkSimple size={14} className="text-[#AAA] hover:text-[#111] transition-colors cursor-pointer ml-auto" />
          </div>
        </article>
      ))}

      {/* Loading skeletons */}
      {loading && blogs.length <= FALLBACK_BLOGS.length && (
        <>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </>
      )}

      {/* Infinite scroll sentinel + spinner */}
      {!loading && (
        <div ref={sentinelRef} className="flex items-center justify-center py-4">
          {loadingMore && <CircleNotch size={20} className="animate-spin text-[#CCC]" />}
        </div>
      )}
    </div>
  );
}

// ── News skeletons ──
function NewsFeaturedSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 animate-pulse">
      <div className="bg-[#F0F0F0] rounded-[14px] h-[280px]" />
      <div className="flex flex-col gap-3">
        <div className="bg-[#F0F0F0] rounded-[14px] flex-1" />
        <div className="bg-[#F0F0F0] rounded-[14px] flex-1" />
      </div>
    </div>
  );
}

function NewsRowSkeleton() {
  return (
    <div className="flex gap-4 py-5 animate-pulse">
      <div className="flex-1">
        <div className="h-3 w-24 rounded bg-[#F0F0F0] mb-3" />
        <div className="h-[18px] w-full rounded bg-[#F0F0F0] mb-2" />
        <div className="h-3 w-4/5 rounded bg-[#F0F0F0] mb-3" />
        <div className="h-3 w-20 rounded bg-[#F0F0F0]" />
      </div>
      <div className="w-[120px] h-[80px] rounded-[12px] bg-[#F0F0F0] flex-shrink-0" />
    </div>
  );
}

// ── Source color helper ──
const SOURCE_COLORS: Record<string, { bg: string; text: string }> = {
  "indian express": { bg: "#F5F5F5", text: "#888" },
  "hindustan": { bg: "#F5F5F5", text: "#888" },
  "times": { bg: "#F5F5F5", text: "#888" },
  "ndtv": { bg: "#F5F5F5", text: "#888" },
  "currents": { bg: "#F5F5F5", text: "#888" },
  "gnews": { bg: "#F5F5F5", text: "#888" },
  "newsdata": { bg: "#F5F5F5", text: "#888" },
  "the hindu": { bg: "#F5F5F5", text: "#888" },
  "economic": { bg: "#F5F5F5", text: "#888" },
  "india today": { bg: "#F5F5F5", text: "#888" },
  "deccan": { bg: "#F5F5F5", text: "#888" },
};
function getSourceColor(source: string) {
  const s = source.toLowerCase();
  for (const [key, val] of Object.entries(SOURCE_COLORS)) {
    if (s.includes(key)) return val;
  }
  return { bg: "#F5F5F5", text: "#888" };
}

// ── News Tab ──
function NewsTab({ news, loading, onLoadMore }: { news: NewsArticle[]; loading: boolean; onLoadMore: () => Promise<void> }) {
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingRef.current) {
          loadingRef.current = true;
          setLoadingMore(true);
          onLoadMore().finally(() => { loadingRef.current = false; setLoadingMore(false); });
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loading, onLoadMore]);

  // Split: featured (first 3), trending (next 5), feed (rest)
  const featured = news.slice(0, 3);
  const trending = news.slice(3, 8);
  const feed = news.slice(8);

  // Featured card helper
  const FeaturedCard = ({ article, tall }: { article: NewsArticle; tall?: boolean }) => {
    const sc = getSourceColor(article.source);
    return (
      <a
        href={article.url || "#"}
        target={article.url ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="group relative block rounded-[14px] overflow-hidden bg-[#111] cursor-pointer"
        style={{ height: tall ? "100%" : undefined, minHeight: tall ? undefined : 134 }}
      >
        <img
          src={article.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-[1.04]"
          onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80"; }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white/90 backdrop-blur-sm"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              {article.source}
            </span>
            <span className="text-[10px] text-white/50">{article.time}</span>
          </div>
          <h3 className={`font-medium text-white leading-snug line-clamp-${tall ? "3" : "2"} ${tall ? "text-[17px]" : "text-[13px]"}`} style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>
            {article.title}
          </h3>
          {tall && article.description && (
            <p className="text-[12px] text-white/60 leading-relaxed line-clamp-2 mt-1.5">{article.description}</p>
          )}
        </div>
      </a>
    );
  };

  return (
    <div className="space-y-5">

      {/* ── Featured grid: 1 large left + 2 stacked right ── */}
      {featured.length >= 3 && (
        <div className="grid grid-cols-2 gap-3" style={{ height: 280 }}>
          <FeaturedCard article={featured[0]} tall />
          <div className="flex flex-col gap-3">
            <FeaturedCard article={featured[1]} />
            <FeaturedCard article={featured[2]} />
          </div>
        </div>
      )}
      {/* Fallback if < 3 articles */}
      {featured.length > 0 && featured.length < 3 && (
        <div style={{ height: 220 }}>
          <FeaturedCard article={featured[0]} tall />
        </div>
      )}

      {/* ── Trending strip ── */}
      {trending.length > 0 && (
        <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
          <div className="px-4 py-2.5 border-b border-[#F5F5F5]">
            <span className="text-[11px] font-semibold text-[#AAA] uppercase tracking-widest">Trending</span>
          </div>
          <div className="flex overflow-x-auto no-scrollbar">
            {trending.map((article, idx) => (
              <a
                key={`t-${article.id}-${idx}`}
                href={article.url || "#"}
                target={article.url ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex-shrink-0 w-[220px] px-4 py-3 border-r border-[#F5F5F5] last:border-r-0 hover:bg-[#FAFAFA] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[22px] font-semibold text-[#F0F0F0] leading-none flex-shrink-0" style={{ fontVariantNumeric: "tabular-nums" }}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[12px] font-medium text-[#111] leading-snug line-clamp-2">{article.title}</p>
                    <span className="text-[10px] text-[#AAA] mt-1 block">{article.source}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ── Latest section header ── */}
      {feed.length > 0 && (
        <div className="px-1">
          <span className="text-[11px] font-semibold text-[#AAA] uppercase tracking-widest">Latest</span>
        </div>
      )}

      {/* ── Feed articles — Medium-style rows ── */}
      {feed.length > 0 && (
        <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
          {feed.map((article, idx) => {
            const sc = getSourceColor(article.source);
            return (
              <a
                key={`f-${article.id}-${idx}`}
                href={article.url || "#"}
                target={article.url ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex gap-4 px-5 py-5 hover:bg-[#FAFAFA] transition-colors cursor-pointer"
                style={{ borderBottom: idx < feed.length - 1 ? "1px solid #F5F5F5" : "none" }}
              >
                <div className="flex-1 min-w-0">
                  {/* Source row */}
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: sc.bg }}
                    >
                      <span className="text-[7px] font-bold" style={{ color: sc.text }}>
                        {article.source[0]}
                      </span>
                    </div>
                    <span className="text-[12px] font-medium text-[#555]">{article.source}</span>
                    <span className="text-[10px] text-[#CCC]">·</span>
                    <span className="text-[11px] text-[#AAA]">{article.time}</span>
                  </div>
                  {/* Title */}
                  <h3 className="text-[15px] font-medium text-[#111] leading-[1.4] line-clamp-2 mb-1.5" style={{ letterSpacing: "-0.1px" }}>
                    {article.title}
                  </h3>
                  {/* Description */}
                  {article.description && (
                    <p className="text-[13px] text-[#888] leading-relaxed line-clamp-2 mb-3">{article.description}</p>
                  )}
                  {/* Bottom meta */}
                  <div className="flex items-center gap-3">
                    <BookmarkSimple size={14} className="text-[#CCC] hover:text-[#111] transition-colors" />
                    <ShareFat size={14} className="text-[#CCC] hover:text-[#111] transition-colors" />
                  </div>
                </div>
                {/* Thumbnail */}
                {article.image && (
                  <div className="w-[120px] h-[80px] rounded-[12px] overflow-hidden flex-shrink-0 bg-[#F5F5F5] self-center">
                    <img src={article.image} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80"; }} />
                  </div>
                )}
              </a>
            );
          })}
        </div>
      )}

      {/* Loading skeletons */}
      {loading && news.length <= FALLBACK_NEWS.length && (
        <>
          <NewsFeaturedSkeleton />
          <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
            <NewsRowSkeleton />
            <div className="h-px bg-[#F5F5F5]" />
            <NewsRowSkeleton />
            <div className="h-px bg-[#F5F5F5]" />
            <NewsRowSkeleton />
          </div>
        </>
      )}

      {/* Infinite scroll sentinel */}
      {!loading && (
        <div ref={sentinelRef} className="flex items-center justify-center py-4">
          {loadingMore && <CircleNotch size={20} className="animate-spin text-[#CCC]" />}
        </div>
      )}
    </div>
  );
}

// ── Subject color map ──
const SUBJECT_COLORS: Record<string, { bg: string; text: string }> = {
  Mathematics: { bg: "#F0F0F5", text: "#555" },
  Physics: { bg: "#F3F0EE", text: "#666" },
  Chemistry: { bg: "#EEF2EF", text: "#555" },
  "JEE Advanced": { bg: "#F2EFEF", text: "#666" },
  English: { bg: "#F2EFF2", text: "#666" },
};
const DEFAULT_SUBJECT_COLOR = { bg: "#F5F5F5", text: "#555" };

const URGENCY_MAP = {
  high: { label: "Urgent", color: "#999", bg: "#F5F5F5" },
  medium: { label: "Moderate", color: "#999", bg: "#F5F5F5" },
  low: { label: "Flexible", color: "#999", bg: "#F5F5F5" },
};

// ── Requests Tab ──
function RequestsTab() {
  return (
    <div className="space-y-5">

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Pending", value: String(REQUESTS.length), color: "#111" },
          { label: "Accepted", value: "12", color: "#111" },
          { label: "This month", value: "17", color: "#111" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-[#EBEBEB] rounded-[14px] px-4 py-3">
            <p className="text-[11px] text-[#AAA] mb-1">{stat.label}</p>
            <p className="text-[20px] font-medium" style={{ color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Section header */}
      <div className="px-1">
        <span className="text-[11px] font-semibold text-[#AAA] uppercase tracking-widest">Pending Requests</span>
      </div>

      {/* Request cards */}
      <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
        {REQUESTS.map((req, idx) => {
          const sc = SUBJECT_COLORS[req.subject] || DEFAULT_SUBJECT_COLOR;
          const urg = URGENCY_MAP[req.urgency];
          return (
            <div
              key={req.id}
              className="px-5 py-5 hover:bg-[#FAFAFA] transition-colors"
              style={{ borderBottom: idx < REQUESTS.length - 1 ? "1px solid #F5F5F5" : "none" }}
            >
              {/* Top row: avatar + name + urgency + time */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={`https://api.dicebear.com/7.x/notionists/svg?seed=${req.name}`}
                  alt={req.name}
                  className="w-10 h-10 rounded-full flex-shrink-0"
                  style={{ backgroundColor: "#FAFAFA", border: "2px solid #EBEBEB" }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[14px] font-medium text-[#111]">{req.name}</span>
                    <span className="text-[12px] text-[#CCC]">@{req.handle}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                      style={{ backgroundColor: urg.bg, color: urg.color }}
                    >
                      {urg.label}
                    </span>
                    <span className="text-[11px] text-[#AAA]">{req.time} ago</span>
                  </div>
                </div>
                <button className="p-1.5 rounded-lg hover:bg-[#F5F5F5] transition-colors cursor-pointer bg-transparent border-none text-[#CCC] hover:text-[#888]">
                  <DotsThree size={18} weight="bold" />
                </button>
              </div>

              {/* Subject + Grade + Schedule row */}
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium"
                  style={{ backgroundColor: sc.bg, color: sc.text }}
                >
                  <GraduationCap size={12} weight="bold" />
                  {req.subject}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#F5F5F5] text-[11px] text-[#555]">
                  {req.grade}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F5F5F5] text-[11px] text-[#555]">
                  <CalendarBlank size={11} />
                  {req.schedule}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F5F5F5] text-[11px] font-medium text-[#111]">
                  {req.budget}
                </span>
              </div>

              {/* Message */}
              <p className="text-[13px] text-[#555] leading-[1.7] mb-4">{req.message}</p>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button className="flex items-center justify-center gap-1.5 flex-1 py-2 rounded-lg bg-[#555] hover:bg-[#444] text-white text-[13px] font-medium transition-colors border-none cursor-pointer">
                  <CheckCircle size={15} weight="bold" />
                  Accept
                </button>
                <button className="flex items-center justify-center gap-1.5 flex-1 py-2 rounded-lg bg-transparent border border-[#EBEBEB] text-[#888] text-[13px] font-medium hover:text-[#111] hover:border-[#CCC] transition-all cursor-pointer">
                  <XCircle size={15} />
                  Decline
                </button>
                <button className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-transparent border border-[#EBEBEB] text-[#888] text-[13px] hover:text-[#111] hover:border-[#CCC] transition-all cursor-pointer">
                  <ChatDots size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
