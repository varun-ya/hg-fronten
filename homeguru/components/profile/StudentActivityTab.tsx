"use client";

import { useState } from "react";
import {
  HandsClapping,
  ChatCircle,
  BookmarkSimple,
  ShareFat,
  PencilSimpleLine,
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
} from "@phosphor-icons/react";
import { blogs, type Blog } from "./studentProfileData";

interface Props {
  visitorMode: boolean;
  avatarUrl: string | null;
  authorName: string;
}

export default function StudentActivityTab({ visitorMode, avatarUrl, authorName }: Props) {
  const [openBlog, setOpenBlog] = useState<Blog | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);

  return (
    <div className="relative">
      {/* Blog list */}
      <div className="flex flex-col divide-y divide-[#EBEBEB]">
        {blogs.map((blog, i) => (
          <BlogCard
            key={i}
            blog={blog}
            avatarUrl={avatarUrl}
            authorName={authorName}
            onClick={() => setOpenBlog(blog)}
          />
        ))}
      </div>

      {/* FAB — owner only */}
      {!visitorMode && (
        <button
          onClick={() => setEditorOpen(true)}
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-[#111] flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.2)] cursor-pointer hover:bg-[#222] transition-colors z-20"
        >
          <PencilSimpleLine size={20} weight="bold" className="text-white" />
        </button>
      )}

      {/* Blog detail */}
      {openBlog && (
        <BlogDetailModal blog={openBlog} avatarUrl={avatarUrl} authorName={authorName} onClose={() => setOpenBlog(null)} />
      )}

      {/* Blog editor */}
      {editorOpen && (
        <BlogEditorModal onClose={() => setEditorOpen(false)} />
      )}
    </div>
  );
}

/* ── Blog Card ── */

function BlogCard({ blog, avatarUrl, authorName, onClick }: { blog: Blog; avatarUrl: string | null; authorName: string; onClick: () => void }) {
  return (
    <div onClick={onClick} className="py-4 cursor-pointer hover:bg-[#FAFAFA] transition-colors -mx-6 px-6">
      {/* Author row */}
      <div className="flex items-center gap-2 mb-2.5">
        <Avatar avatarUrl={avatarUrl} name={authorName} size={24} />
        <span className="text-[12px] font-semibold text-[#111]">{authorName}</span>
        <span className="text-[12px] text-[#999]">{blog.date}</span>
      </div>
      {/* Title */}
      <h3 className="text-[16px] font-extrabold text-[#111] leading-[1.3] tracking-[-0.2px] mb-1">{blog.title}</h3>
      {/* Subtitle */}
      <p className="text-[13px] text-[#666] leading-[1.5] line-clamp-2 mb-2.5">{blog.subtitle}</p>
      {/* Meta */}
      <div className="flex items-center gap-2">
        <span className="px-2.5 py-1 bg-[#F3F4F6] rounded-full text-[11px] text-[#555]">{blog.tag}</span>
        <span className="text-[12px] text-[#999]">{blog.readTime}</span>
        <div className="flex-1" />
        <div className="flex items-center gap-1 text-[#999]">
          <HandsClapping size={14} /><span className="text-[12px]">{blog.likes}</span>
        </div>
        <div className="flex items-center gap-1 text-[#999] ml-2">
          <ChatCircle size={14} /><span className="text-[12px]">{blog.comments}</span>
        </div>
        <BookmarkSimple size={14} className="text-[#999] ml-2" />
      </div>
    </div>
  );
}

/* ── Blog Detail Modal ── */

function BlogDetailModal({ blog, avatarUrl, authorName, onClose }: { blog: Blog; avatarUrl: string | null; authorName: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-[slideInRight_0.25s_ease-out]">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 h-[56px] border-b border-[#EBEBEB] shrink-0">
        <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F5F5F5] cursor-pointer">
          <X size={18} className="text-[#111]" />
        </button>
        <span className="flex-1 text-[15px] font-bold text-[#111]">Blog</span>
        <ShareFat size={18} className="text-[#888] cursor-pointer" />
        <BookmarkSimple size={18} className="text-[#888] cursor-pointer ml-3" />
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        {/* Tag + read time */}
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2.5 py-1 bg-[#F3F4F6] rounded-full text-[12px] text-[#555]">{blog.tag}</span>
          <span className="text-[12px] text-[#999]">{blog.readTime}</span>
        </div>
        {/* Title */}
        <h1 className="text-[24px] font-extrabold text-[#111] leading-[1.25] tracking-[-0.3px] mb-4">{blog.title}</h1>
        {/* Author */}
        <div className="flex items-center gap-2.5 mb-5">
          <Avatar avatarUrl={avatarUrl} name={authorName} size={36} />
          <div>
            <div className="text-[13px] font-bold text-[#111]">{authorName}</div>
            <div className="text-[12px] text-[#999]">{blog.date}</div>
          </div>
        </div>
        <div className="h-px bg-[#EBEBEB] mb-5" />
        {/* Body */}
        <p className="text-[16px] text-[#111] leading-[1.75] whitespace-pre-line">{blog.body}</p>
        <div className="h-px bg-[#EBEBEB] mt-6 mb-4" />
        {/* Actions */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5 text-[#666]">
            <HandsClapping size={20} /><span className="text-[14px]">{blog.likes}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#666]">
            <ChatCircle size={20} /><span className="text-[14px]">{blog.comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Blog Editor Modal ── */

function BlogEditorModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-[slideInRight_0.25s_ease-out]">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 h-[56px] border-b border-[#EBEBEB] shrink-0">
        <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F5F5F5] cursor-pointer">
          <X size={18} className="text-[#111]" />
        </button>
        <div className="flex-1" />
        <button onClick={onClose} className="h-8 px-4 rounded-full bg-[#F3F4F6] text-[12px] font-semibold text-[#111] cursor-pointer hover:bg-[#E5E7EB] transition-colors">
          Save Draft
        </button>
        <button onClick={onClose} className="h-8 px-4 rounded-full bg-[#111] text-[12px] font-bold text-white cursor-pointer hover:bg-[#222] transition-colors ml-2">
          Publish
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          rows={2}
          className="w-full text-[26px] font-extrabold text-[#111] leading-[1.25] tracking-[-0.3px] placeholder-[#CCC] border-none outline-none resize-none bg-transparent mb-2"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Tell your story..."
          rows={20}
          className="w-full text-[17px] text-[#111] leading-[1.75] placeholder-[#CCC] border-none outline-none resize-none bg-transparent"
          style={{ fontWeight: bold ? 700 : 400, fontStyle: italic ? "italic" : "normal" }}
        />
      </div>

      {/* Toolbar */}
      <div className="border-t border-[#EBEBEB] px-3 py-2 flex items-center gap-0.5 overflow-x-auto no-scrollbar shrink-0">
        <ToolBtn icon={<TextB size={16} />} active={bold} onClick={() => setBold(!bold)} />
        <ToolBtn icon={<TextItalic size={16} />} active={italic} onClick={() => setItalic(!italic)} />
        <ToolSep />
        <ToolBtn icon={<TextHOne size={16} />} onClick={() => {}} />
        <ToolBtn icon={<TextHTwo size={16} />} onClick={() => {}} />
        <ToolSep />
        <ToolBtn icon={<Quotes size={16} />} onClick={() => {}} />
        <ToolBtn icon={<ListBullets size={16} />} onClick={() => {}} />
        <ToolBtn icon={<ListNumbers size={16} />} onClick={() => {}} />
        <ToolSep />
        <ToolBtn icon={<Link size={16} />} onClick={() => {}} />
        <ToolBtn icon={<Image size={16} />} onClick={() => {}} />
        <ToolBtn icon={<Code size={16} />} onClick={() => {}} />
      </div>
    </div>
  );
}

function ToolBtn({ icon, active = false, onClick }: { icon: React.ReactNode; active?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-9 h-9 rounded-[6px] flex items-center justify-center cursor-pointer transition-colors"
      style={{ background: active ? "#111" : "transparent", color: active ? "#fff" : "#666" }}
    >
      {icon}
    </button>
  );
}

function ToolSep() {
  return <div className="w-px h-5 bg-[#E5E7EB] mx-1.5 shrink-0" />;
}

/* ── Avatar helper ── */

function Avatar({ avatarUrl, name, size }: { avatarUrl: string | null; name: string; size: number }) {
  if (avatarUrl) {
    return <img src={avatarUrl} alt={name} className="rounded-full object-cover shrink-0" style={{ width: size, height: size }} />;
  }
  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0 font-bold text-[#F97316]"
      style={{ width: size, height: size, background: "rgba(249,115,22,0.1)", fontSize: size * 0.4 }}
    >
      {name[0]}
    </div>
  );
}
