"use client";
import { useState } from "react";
import { Heart, Bookmark, Share2, Sparkles } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

const blogs = [
  {
    id: 1,
    title: "How to Master Quadratic Equations",
    subtitle: "Learn the step-by-step approach to solving any quadratic equation with ease",
    author: "HomeGuru",
    date: "Dec 15",
    tag: "Mathematics",
    readTime: "5 min read",
    likes: 42,
    comments: 12,
    source: "HomeGuru"
  },
  {
    id: 2,
    title: "Understanding Newton's Three Laws of Motion",
    subtitle: "A comprehensive guide to the fundamental principles of classical mechanics",
    author: "Priya Menon",
    date: "Dec 14",
    tag: "Physics",
    readTime: "7 min read",
    likes: 38,
    comments: 8,
    source: "External"
  },
  {
    id: 3,
    title: "Organic Chemistry Made Simple",
    subtitle: "Breaking down complex organic reactions into easy-to-understand concepts",
    author: "HomeGuru",
    date: "Dec 13",
    tag: "Chemistry",
    readTime: "6 min read",
    likes: 56,
    comments: 15,
    source: "HomeGuru"
  },
  {
    id: 4,
    title: "JEE Preparation Strategy for 2026",
    subtitle: "Expert tips and study plan for cracking JEE Advanced",
    author: "Ayush Soni",
    date: "Dec 12",
    tag: "JEE",
    readTime: "10 min read",
    likes: 89,
    comments: 24,
    source: "External"
  },
  {
    id: 5,
    title: "Cell Biology: Structure and Function",
    subtitle: "Complete guide to understanding cellular components and their roles",
    author: "HomeGuru",
    date: "Dec 11",
    tag: "Biology",
    readTime: "8 min read",
    likes: 45,
    comments: 10,
    source: "HomeGuru"
  }
];

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState<'foryou' | 'shorts'>('foryou');

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-5 py-4">
          <h1 className="text-2xl font-extrabold text-gray-900">Feed</h1>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('foryou')}
              className={`flex-1 py-3 text-sm font-bold transition-colors relative ${
                activeTab === 'foryou'
                  ? 'text-gray-900'
                  : 'text-gray-500'
              }`}
            >
              For you
              {activeTab === 'foryou' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('shorts')}
              className={`flex-1 py-3 text-sm font-bold transition-colors relative ${
                activeTab === 'shorts'
                  ? 'text-gray-900'
                  : 'text-gray-500'
              }`}
            >
              HG Shorts
              {activeTab === 'shorts' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto">
        {activeTab === 'foryou' ? (
          <ForYouTab blogs={blogs} />
        ) : (
          <ShortsTab />
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}

function ForYouTab({ blogs }: { blogs: any[] }) {
  return (
    <div className="px-4 py-4 space-y-3">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

function BlogCard({ blog }: { blog: any }) {
  const [clapped, setClapped] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showClapAnimation, setShowClapAnimation] = useState(false);
  const isLocal = blog.source === "HomeGuru";

  const handleDoubleClick = () => {
    if (!clapped) {
      setClapped(true);
      setShowClapAnimation(true);
      setTimeout(() => setShowClapAnimation(false), 600);
    }
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-sm transition-shadow cursor-pointer relative"
      onDoubleClick={handleDoubleClick}
    >
      {/* Clap Animation */}
      {showClapAnimation && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="animate-ping">
            <span className="text-6xl">👏</span>
          </div>
        </div>
      )}

      {/* Author Row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
            isLocal ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
          }`}>
            {blog.author[0]}
          </div>
          <span className="text-sm font-semibold text-gray-900">{blog.author}</span>
          {isLocal && (
            <Sparkles size={12} className="text-blue-600" />
          )}
        </div>
        <span className="text-xs text-gray-500">{blog.date}</span>
      </div>

      {/* Content */}
      <h3 className="text-base font-extrabold text-gray-900 mb-1 leading-tight">
        {blog.title}
      </h3>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {blog.subtitle}
      </p>

      {/* Meta Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
            {blog.tag}
          </span>
          <span className="text-xs text-gray-500">{blog.readTime}</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Clap Button */}
          <button
            onClick={() => setClapped(!clapped)}
            className="flex items-center gap-1 hover:opacity-70 transition-opacity"
          >
            <span className="text-lg">{clapped ? '👏' : '👏'}</span>
            <span className={`text-xs font-medium ${clapped ? 'text-orange-600' : 'text-gray-500'}`}>
              {blog.likes + (clapped ? 1 : 0)}
            </span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={() => setSaved(!saved)}
            className="hover:opacity-70 transition-opacity"
          >
            <Bookmark 
              size={16} 
              className={saved ? 'fill-blue-600 text-blue-600' : 'text-gray-500'}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

function ShortsTab() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-200px)]">
      <div className="text-center px-6">
        <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">📹</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">HG Shorts Coming Soon!</h3>
        <p className="text-sm text-gray-600">
          Short-form educational videos will be available here soon.
        </p>
      </div>
    </div>
  );
}
