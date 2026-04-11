"use client";

import { Star, ArrowRight } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

interface Tutor {
  name: string;
  subject: string;
  price: number;
  rating: number;
  imageUrl: string;
  recommended?: boolean;
}

export default function SuggestedTutors() {
  const router = useRouter();

  const tutors: Tutor[] = [
    {
      name: "Ayush Soni",
      subject: "Maths · Physics",
      price: 499,
      rating: 4.9,
      imageUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=Ayush Soni",
      recommended: true,
    },
    {
      name: "Priya Menon",
      subject: "Physics",
      price: 399,
      rating: 4.8,
      imageUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=Priya Menon",
      recommended: true,
    },
    {
      name: "Ankit Kapoor",
      subject: "English · Literature",
      price: 349,
      rating: 4.7,
      imageUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=Ankit Kapoor",
      recommended: true,
    },
    {
      name: "Neha Sharma",
      subject: "Chemistry",
      price: 549,
      rating: 4.9,
      imageUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=Neha Sharma",
      recommended: true,
    },
    {
      name: "Rohit Verma",
      subject: "Biology · Botany",
      price: 299,
      rating: 4.6,
      imageUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=Rohit Verma",
    },
  ];

  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-[15px] font-bold text-[#111]">Suggested Tutors</h2>
        <button
          onClick={() => router.push("/teachers")}
          className="text-[12px] text-[#F97316] hover:text-[#EA580C] font-semibold flex items-center gap-1 bg-transparent border-none cursor-pointer transition-colors"
        >
          See all <ArrowRight size={12} weight="bold" />
        </button>
      </div>

      {/* Horizontal Scroll */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {tutors.map((tutor, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[170px] h-[200px] rounded-[28px] overflow-hidden relative cursor-pointer transition-all shadow-sm hover:shadow-md group"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${tutor.imageUrl})`,
                backgroundColor: "#1a1a1a",
              }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />

            {/* Price Pill - Top Left */}
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-white rounded-full">
              <span className="text-[11px] font-bold text-[#111]">₹{tutor.price}/hr</span>
            </div>

            {/* Recommended Badge - Top Right */}
            {tutor.recommended && (
              <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#F97316] rounded-full">
                <span className="text-[9px] font-bold text-white">Recommended</span>
              </div>
            )}

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="text-[14px] font-bold text-white mb-0.5 truncate">
                {tutor.name}
              </h3>
              <p className="text-[11px] text-white/80 mb-2 truncate">
                {tutor.subject}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star size={12} weight="fill" className="text-[#FCD34D]" />
                  <span className="text-[12px] font-semibold text-white">
                    {tutor.rating}
                  </span>
                </div>
                <button className="px-3 py-1.5 bg-white hover:bg-gray-100 rounded-full text-[11px] font-semibold text-[#111] transition-colors border-none cursor-pointer">
                  Book Trial
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Explore More Card */}
        <div className="flex-shrink-0 w-[170px] h-[200px] rounded-[28px] bg-gradient-to-br from-[#F97316] to-[#EA580C] flex flex-col items-center justify-center cursor-pointer transition-all shadow-sm hover:shadow-md group">
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <ArrowRight size={24} className="text-white" weight="bold" />
          </div>
          <span className="text-[14px] font-bold text-white">Explore More</span>
          <span className="text-[11px] text-white/80 mt-1">100+ Tutors</span>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
