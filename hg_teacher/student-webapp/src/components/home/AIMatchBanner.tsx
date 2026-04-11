"use client";

import { Sparkle } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import AnimatedHoot from "@/components/AnimatedHoot";

export default function AIMatchBanner() {
  const router = useRouter();

  return (
    <div 
      className="relative overflow-hidden rounded-[28px] p-6 cursor-pointer transition-all duration-300 hover:shadow-lg"
      style={{
        background: "linear-gradient(135deg, #C8E8F8 0%, #F2BEB4 50%, #F3D5F3 100%)",
      }}
      onClick={() => router.push("/guru-ai")}
    >
      {/* Content */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Sparkle size={16} weight="fill" className="text-[#111]" />
            <span className="text-[11px] font-bold text-[#111] uppercase tracking-wider">
              AI Tutor Match
            </span>
          </div>
          <h3 className="text-[22px] font-bold text-[#111] mb-1.5 leading-tight">
            Find your<br />perfect tutor
          </h3>
          <p className="text-[12px] text-[#666] mb-4 max-w-[200px]">
            Matched to your learning style and goals
          </p>
          <div className="relative inline-block">
            <button className="pl-5 pr-12 py-2 bg-white hover:bg-gray-50 rounded-full text-[12px] font-bold text-[#111] shadow-sm transition-all border-none cursor-pointer">
              Try Now
            </button>
            <div className="absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none">
              <AnimatedHoot size={28} />
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}
