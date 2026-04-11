"use client";
import { useState } from "react";
import { Search as SearchIcon, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import BottomNavigation from "@/components/BottomNavigation";

// Topic chips data
const topics = [
  { icon: "📐", label: "Maths", query: "maths" },
  { icon: "⚛️", label: "Physics", query: "physics" },
  { icon: "🧪", label: "Chemistry", query: "chemistry" },
  { icon: "📖", label: "English", query: "english" },
  { icon: "🧬", label: "Biology", query: "biology" },
  { icon: "🎓", label: "JEE", query: "jee" },
  { icon: "🏥", label: "NEET", query: "neet" },
  { icon: "💻", label: "Coding", query: "coding" },
];

// Mock tutors data
const tutors = [
  {
    name: "Ayush Soni",
    subject: "Maths · Physics",
    rating: 4.9,
    price: 499,
    students: 48,
    experience: 5,
    bio: "IIT Delhi graduate specializing in JEE preparation",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ayush",
    avatar: "A"
  },
  {
    name: "Priya Menon",
    subject: "Physics",
    rating: 4.8,
    price: 399,
    students: 35,
    experience: 4,
    bio: "Physics expert with focus on conceptual clarity",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    avatar: "P"
  },
  {
    name: "Ankit Kapoor",
    subject: "English · Literature",
    rating: 4.7,
    price: 349,
    students: 28,
    experience: 3,
    bio: "English literature specialist",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ankit",
    avatar: "A"
  },
];

// Mock blogs data
const blogs = [
  {
    title: "How to Master Quadratic Equations",
    subtitle: "Learn the step-by-step approach to solving any quadratic equation",
    tag: "Mathematics",
    readTime: "5 min read",
    author: "HomeGuru",
    date: "Dec 15",
    likes: 42,
    comments: 12,
    source: "HomeGuru"
  },
  {
    title: "Understanding Newton's Laws",
    subtitle: "A comprehensive guide to the three laws of motion",
    tag: "Physics",
    readTime: "7 min read",
    author: "Priya Menon",
    date: "Dec 14",
    likes: 38,
    comments: 8,
    source: "External"
  },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Interleave tutors and blogs for grid
  const gridItems: any[] = [];
  let tutorIndex = 0;
  let blogIndex = 0;

  while (tutorIndex < tutors.length || blogIndex < blogs.length) {
    if (tutorIndex < tutors.length) {
      gridItems.push({ type: "tutor", data: tutors[tutorIndex++] });
    }
    if (blogIndex < blogs.length) {
      gridItems.push({ type: "blog", data: blogs[blogIndex++] });
      if (blogIndex < blogs.length) {
        gridItems.push({ type: "blog", data: blogs[blogIndex++] });
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20">
      {/* Search Bar */}
      <div className="sticky top-0 z-40 bg-[#FAFAFA] px-5 py-3 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className={`flex items-center gap-3 h-11 px-4 rounded-full transition-colors ${
            isSearchFocused ? 'bg-white border-2 border-blue-500' : 'bg-gray-200'
          }`}>
            <SearchIcon size={17} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search tutors, subjects, blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-5 py-4">
        {/* Browse Topics */}
        <section className="mb-5">
          <h3 className="text-base font-bold text-gray-900 mb-3">Browse topics</h3>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {topics.map((topic, index) => (
              <button
                key={index}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm">{topic.icon}</span>
                <span className="text-xs font-semibold text-gray-900">{topic.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Explore Grid */}
        <section>
          <h3 className="text-base font-bold text-gray-900 mb-3">Explore</h3>
          
          {/* Instagram-style Grid */}
          <div className="space-y-0.5">
            {/* Featured Row: 1 big + 2 small */}
            <div className="flex gap-0.5 h-64">
              <div className="flex-[2]">
                {gridItems[0] && gridItems[0].type === "tutor" && (
                  <TutorGridTile tutor={gridItems[0].data} big />
                )}
              </div>
              <div className="flex-1 flex flex-col gap-0.5">
                {gridItems[1] && gridItems[1].type === "blog" && (
                  <div className="flex-1">
                    <BlogGridTile blog={gridItems[1].data} />
                  </div>
                )}
                {gridItems[2] && gridItems[2].type === "blog" && (
                  <div className="flex-1">
                    <BlogGridTile blog={gridItems[2].data} />
                  </div>
                )}
              </div>
            </div>

            {/* Normal Row: 3 equal */}
            <div className="grid grid-cols-3 gap-0.5 h-40">
              {gridItems.slice(3, 6).map((item, index) => (
                <div key={index}>
                  {item.type === "tutor" ? (
                    <TutorGridTile tutor={item.data} />
                  ) : (
                    <BlogGridTile blog={item.data} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
}

// Tutor Grid Tile Component
function TutorGridTile({ tutor, big = false }: { tutor: any; big?: boolean }) {
  return (
    <div className="relative w-full h-full bg-gray-900 overflow-hidden group cursor-pointer">
      {/* Image */}
      <div className="absolute inset-0">
        <Image
          src={tutor.imageUrl}
          alt={tutor.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Recommended Badge */}
      {tutor.rating >= 4.7 && (
        <div className="absolute top-2 left-2 px-2 py-1 bg-white rounded-full flex items-center gap-1">
          <Sparkles size={9} className="text-blue-600" />
          <span className="text-[10px] font-bold text-blue-600">Recommended</span>
        </div>
      )}

      {/* Price Pill */}
      <div className="absolute top-2 right-2 px-2 py-1 bg-white rounded-full">
        <span className="text-[10px] font-bold text-gray-900">₹{tutor.price}</span>
        <span className="text-[8px] text-gray-500">/hr</span>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-2 left-2 right-2">
        <p className={`font-bold text-white mb-1 ${big ? 'text-sm' : 'text-xs'}`}>
          {tutor.name}
        </p>
        <p className={`text-white/60 mb-2 ${big ? 'text-xs' : 'text-[10px]'}`}>
          {tutor.subject}
        </p>
        <div className={`flex items-center gap-1 text-white/80 mb-2 ${big ? 'text-xs' : 'text-[10px]'}`}>
          <Star size={9} className="fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">{tutor.rating}</span>
          <span className="text-white/50">·</span>
          <span>{tutor.students} students</span>
          <span className="text-white/50">·</span>
          <span>{tutor.experience} yrs</span>
        </div>
        {big && (
          <p className="text-[10px] text-white/45 line-clamp-1 mb-2">{tutor.bio}</p>
        )}
      </div>
    </div>
  );
}

// Blog Grid Tile Component
function BlogGridTile({ blog, big = false }: { blog: any; big?: boolean }) {
  const isLocal = blog.source === "HomeGuru";

  return (
    <div className="w-full h-full bg-white p-3 flex flex-col cursor-pointer hover:bg-gray-50 transition-colors">
      {/* Top Row */}
      <div className="flex items-center justify-between mb-2">
        <div className="px-2 py-0.5 bg-gray-100 rounded-full">
          <span className="text-[10px] font-semibold text-gray-600">{blog.tag}</span>
        </div>
        <span className="text-[10px] text-gray-500">{blog.readTime}</span>
      </div>

      {/* Title */}
      <div className="flex-1">
        <h4 className={`font-bold text-gray-900 leading-tight mb-1 ${
          big ? 'text-sm line-clamp-4' : 'text-xs line-clamp-3'
        }`}>
          {blog.title}
        </h4>
        {big && (
          <p className="text-[11px] text-gray-600 line-clamp-2 mb-2">{blog.subtitle}</p>
        )}
      </div>

      {/* Author Row */}
      <div className="flex items-center gap-2 mt-auto">
        <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${
          isLocal ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
        }`}>
          {blog.author[0]}
        </div>
        <span className="text-[10px] font-medium text-gray-600 flex-1 truncate">
          {blog.author}
        </span>
        {isLocal && (
          <Sparkles size={8} className="text-blue-600" />
        )}
        {blog.likes > 0 && (
          <>
            <span className="text-gray-300">·</span>
            <span className="text-[10px] text-gray-500">❤️ {blog.likes}</span>
          </>
        )}
      </div>
    </div>
  );
}
