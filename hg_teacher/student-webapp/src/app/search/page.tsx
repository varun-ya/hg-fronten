"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  MagnifyingGlass,
  Star,
  List,
  Bell,
  CaretRight,
  Calculator,
  Atom,
  Flask,
  Leaf,
  BookOpen,
  CheckCircle,
  Clock,
  Users,
  GraduationCap,
} from "@phosphor-icons/react";
import { useSidebar } from "@/context/SidebarContext";

interface Teacher {
  id: string;
  name: string;
  avatar: string;
  subjects: string[];
  rating: number;
  reviews: number;
  price: number;
  experience: string;
  students: number;
  availability: "available" | "busy" | "offline";
}

const MOCK_TEACHERS: Teacher[] = [
  {
    id: "1",
    name: "Ayush Soni",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Ayush Soni",
    subjects: ["Mathematics", "Physics"],
    rating: 4.9,
    reviews: 127,
    price: 499,
    experience: "6 yrs",
    students: 48,
    availability: "available",
  },
  {
    id: "2",
    name: "Priya Menon",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    subjects: ["Physics", "Chemistry"],
    rating: 4.8,
    reviews: 98,
    price: 399,
    experience: "4 yrs",
    students: 35,
    availability: "available",
  },
  {
    id: "3",
    name: "Ankit Kapoor",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Ankit Kapoor",
    subjects: ["English", "Literature"],
    rating: 4.7,
    reviews: 85,
    price: 349,
    experience: "5 yrs",
    students: 28,
    availability: "busy",
  },
  {
    id: "4",
    name: "Sneha Sharma",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    subjects: ["Chemistry", "Biology"],
    rating: 4.9,
    reviews: 112,
    price: 449,
    experience: "7 yrs",
    students: 41,
    availability: "available",
  },
  {
    id: "5",
    name: "Rahul Verma",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Rahul Verma",
    subjects: ["Mathematics"],
    rating: 4.6,
    reviews: 73,
    price: 299,
    experience: "4 years",
    students: 28,
    availability: "offline",
  },
  {
    id: "6",
    name: "Kavya Reddy",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    subjects: ["Biology", "Chemistry"],
    rating: 4.8,
    reviews: 95,
    price: 399,
    experience: "6 years",
    students: 36,
    availability: "available",
  },
  {
    id: "7",
    name: "Arjun Patel",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Arjun Patel",
    subjects: ["Computer Science"],
    rating: 4.9,
    reviews: 145,
    price: 549,
    experience: "8 yrs",
    students: 52,
    availability: "available",
  },
  {
    id: "8",
    name: "Neha Singh",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    subjects: ["English", "History"],
    rating: 4.7,
    reviews: 89,
    price: 379,
    experience: "5 yrs",
    students: 33,
    availability: "available",
  },
  {
    id: "9",
    name: "Vikram Desai",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Vikram Desai",
    subjects: ["Physics", "Mathematics"],
    rating: 4.8,
    reviews: 103,
    price: 459,
    experience: "6 yrs",
    students: 44,
    availability: "busy",
  },
  {
    id: "10",
    name: "Isha Gupta",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    subjects: ["Biology", "Chemistry"],
    rating: 4.9,
    reviews: 118,
    price: 489,
    experience: "7 yrs",
    students: 47,
    availability: "available",
  },
  {
    id: "11",
    name: "Rohan Kumar",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Rohan Kumar",
    subjects: ["Mathematics", "Statistics"],
    rating: 4.6,
    reviews: 76,
    price: 329,
    experience: "4 yrs",
    students: 31,
    availability: "available",
  },
  {
    id: "12",
    name: "Anika Joshi",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
    subjects: ["Chemistry", "Physics"],
    rating: 4.8,
    reviews: 92,
    price: 419,
    experience: "5 yrs",
    students: 38,
    availability: "available",
  },
  {
    id: "13",
    name: "Karan Mehta",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Karan Mehta",
    subjects: ["Economics", "Business"],
    rating: 4.7,
    reviews: 81,
    price: 369,
    experience: "5 yrs",
    students: 29,
    availability: "offline",
  },
  {
    id: "14",
    name: "Diya Shah",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
    subjects: ["English", "Literature"],
    rating: 4.9,
    reviews: 125,
    price: 479,
    experience: "7 yrs",
    students: 45,
    availability: "available",
  },
  {
    id: "15",
    name: "Aditya Rao",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Aditya Rao",
    subjects: ["Computer Science", "Mathematics"],
    rating: 4.8,
    reviews: 97,
    price: 529,
    experience: "6 yrs",
    students: 42,
    availability: "available",
  },
];

type FilterType = "for-you" | "available" | "top-rated" | "subjects";

export default function SearchPage() {
  const router = useRouter();
  const { toggle, isMobile } = useSidebar();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("for-you");
  const [hoveredTeacher, setHoveredTeacher] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = MOCK_TEACHERS;

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.subjects.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (filter === "available") {
      list = list.filter((t) => t.availability === "available");
    } else if (filter === "top-rated") {
      list = list.filter((t) => t.rating >= 4.8);
    }

    return list;
  }, [search, filter]);

  const getAvailabilityStatus = (availability: string) => {
    switch (availability) {
      case "available":
        return { icon: CheckCircle, text: "Available", color: "#22C55E" };
      case "busy":
        return { icon: Clock, text: "In Session", color: "#F97316" };
      case "offline":
        return { icon: Clock, text: "Offline", color: "#999" };
      default:
        return { icon: CheckCircle, text: "Available", color: "#22C55E" };
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans">
      {/* Content */}
      <div className="max-w-[1200px] mx-auto flex">
        {/* Main Column - Feed */}
        <main className="flex-1 min-w-0 border-r border-[#EBEBEB] bg-white">
          <div className="sticky top-0 z-30 bg-white border-b border-[#EBEBEB]">
            <div className="px-4 py-4">
              <div className="relative">
                <MagnifyingGlass size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888]" weight="bold" />
                <input
                  type="text"
                  placeholder="Search tutors, subjects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-[10px] bg-[#F5F5F5] border border-transparent text-[13px] text-[#111] placeholder-[#888] focus:outline-none focus:bg-white focus:border-[#EBEBEB] transition-all"
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center px-1">
              {([
                { value: "for-you", label: "For You" },
                { value: "available", label: "Available" },
                { value: "top-rated", label: "Top Rated" },
                { value: "subjects", label: "Subjects" },
              ] as const).map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className="flex-1 px-4 py-3 text-[13px] font-medium transition-all cursor-pointer border-none relative bg-transparent hover:bg-[#FAFAFA]"
                  style={{
                    color: filter === f.value ? "#111" : "#888",
                  }}
                >
                  {f.label}
                  {filter === f.value && (
                    <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#111] rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Feed - Tile Grid Layout */}
          <div>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-3 gap-[1px] bg-[#EBEBEB]">
                {filtered.map((teacher, idx) => {
                  const isTall = idx % 7 === 0 || idx % 7 === 4;
                  const status = getAvailabilityStatus(teacher.availability);
                  const StatusIcon = status.icon;
                  
                  return (
                    <div
                      key={teacher.id}
                      onClick={() => router.push(`/teachers/${teacher.id}`)}
                      className={`relative bg-white overflow-hidden cursor-pointer group ${
                        isTall ? 'row-span-2' : ''
                      }`}
                      style={{ aspectRatio: isTall ? '1/2' : '1/1' }}
                    >
                      {/* Background Image */}
                      <div className="absolute inset-0">
                        <img
                          src={teacher.avatar}
                          alt={teacher.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 group-hover:opacity-90 transition-opacity" />

                      {/* Content Container */}
                      <div className="relative h-full flex flex-col justify-between p-3">
                        {/* Top Section */}
                        <div className="flex items-start justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                          {/* Availability Indicator */}
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: status.color }}
                          />
                          
                          {/* Price Badge */}
                          <div className="px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded-md">
                            <span className="text-[10px] font-semibold text-[#111]">₹{teacher.price}</span>
                          </div>
                        </div>

                        {/* Bottom Section - Teacher Info */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <h3 className="text-[12px] font-semibold text-white mb-0.5">{teacher.name}</h3>
                          <div className="flex items-center gap-1 mb-0.5">
                            <Star size={10} weight="fill" className="text-[#F97316]" />
                            <span className="text-[10px] font-semibold text-white">{teacher.rating}</span>
                            <span className="text-[9px] text-white/70">({teacher.reviews})</span>
                          </div>
                          <p className="text-[9px] text-white/90 mb-0.5 truncate">{teacher.subjects.join(", ")}</p>
                          <div className="flex items-center gap-1.5 text-[9px] text-white/70">
                            <span>{teacher.experience}</span>
                            <span>•</span>
                            <span>{teacher.students} students</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 px-4">
                <div className="w-16 h-16 rounded-full bg-[#F5F5F5] flex items-center justify-center mb-3">
                  <MagnifyingGlass size={24} className="text-[#CCC]" />
                </div>
                <p className="text-[14px] font-semibold text-[#111] mb-1">No results found</p>
                <p className="text-[12px] text-[#888]">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden lg:block w-[350px] px-5 py-4 bg-white">
          <div className="sticky top-0 space-y-4">
            {/* Popular Subjects */}
            <div className="bg-white rounded-[14px] overflow-hidden border border-[#EBEBEB]">
              <div className="px-4 py-3 border-b border-[#F5F5F5]">
                <h2 className="text-[12px] font-semibold text-[#111]">Popular Subjects</h2>
              </div>
              <div className="divide-y divide-[#F5F5F5]">
                {[
                  { subject: "Mathematics", count: "2 tutors", icon: Calculator, color: "#F97316" },
                  { subject: "Physics", count: "2 tutors", icon: Atom, color: "#F97316" },
                  { subject: "Chemistry", count: "2 tutors", icon: Flask, color: "#F97316" },
                  { subject: "Biology", count: "1 tutor", icon: Leaf, color: "#F97316" },
                  { subject: "English", count: "1 tutor", icon: BookOpen, color: "#F97316" },
                ].map((item, i) => (
                  <div
                    key={item.subject}
                    className="px-4 py-3 hover:bg-[#FAFAFA] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-[8px] bg-[#FFF7F0] flex items-center justify-center">
                          <item.icon size={14} weight="bold" className="text-[#F97316]" />
                        </div>
                        <span className="text-[13px] font-semibold text-[#111]">{item.subject}</span>
                      </div>
                      <span className="text-[11px] text-[#888]">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white rounded-[14px] overflow-hidden border border-[#EBEBEB]">
              <div className="px-4 py-3 border-b border-[#F5F5F5]">
                <h2 className="text-[12px] font-semibold text-[#111]">Price Range</h2>
              </div>
              <div className="divide-y divide-[#F5F5F5]">
                {[
                  { label: "Under ₹300", count: 1 },
                  { label: "₹300 - ₹400", count: 3 },
                  { label: "₹400 - ₹500", count: 6 },
                  { label: "Above ₹500", count: 5 },
                ].map((range, i) => (
                  <div
                    key={range.label}
                    className="px-4 py-3 hover:bg-[#FAFAFA] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-medium text-[#111]">{range.label}</span>
                      <span className="text-[11px] text-[#888]">{range.count} tutors</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}