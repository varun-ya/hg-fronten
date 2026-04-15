"use client";

import { Flame, Star, BookOpen, Hourglass, ArrowRight } from "@phosphor-icons/react";

interface StatCard {
  icon: any;
  gradient: string[];
  value: string;
  label: string;
  description: string;
  badge: string;
}

export default function StatsCardsScroll() {
  const stats: StatCard[] = [
    {
      icon: Flame,
      gradient: ["#FFE5E5", "#FFD4D4"],
      value: "7 days",
      label: "Streak",
      description: "Days in a row you've been learning",
      badge: "Keep going!",
    },
    {
      icon: Star,
      gradient: ["#FFF4E5", "#FFE8CC"],
      value: "1240 XP",
      label: "XP Earned",
      description: "Points from classes & quizzes",
      badge: "Total",
    },
    {
      icon: BookOpen,
      gradient: ["#E5F4FF", "#D4EBFF"],
      value: "4 done",
      label: "Classes",
      description: "Sessions completed so far",
      badge: "This week",
    },
    {
      icon: Hourglass,
      gradient: ["#E5FFE5", "#D4FFD4"],
      value: "3.5 hrs",
      label: "Hours",
      description: "Total time spent this week",
      badge: "Learning",
    },
  ];

  return (
    <div className="relative">
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[170px] h-[200px] rounded-[28px] overflow-hidden bg-white shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            {/* Gradient Top Section (52% height) */}
            <div
              className="h-[104px] flex flex-col items-center justify-center relative"
              style={{
                background: `linear-gradient(135deg, ${stat.gradient[0]} 0%, ${stat.gradient[1]} 100%)`,
              }}
            >
              <stat.icon size={32} weight="fill" className="text-[#F97316]" />
            </div>

            {/* White Bottom Section (48% height) */}
            <div className="h-[96px] bg-white p-4 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-bold text-[#111]">{stat.label}</span>
                <span className="text-[9px] font-bold text-[#888] bg-[#F5F5F5] px-2 py-0.5 rounded-full">
                  {stat.badge}
                </span>
              </div>
              <p className="text-[11px] text-[#666] mb-2 line-clamp-2">
                {stat.description}
              </p>
              <p className="text-[18px] font-bold text-[#111] mt-auto">
                {stat.value}
              </p>
            </div>
          </div>
        ))}

        {/* See More Card */}
        <div className="flex-shrink-0 w-[170px] h-[200px] rounded-[28px] bg-white border-2 border-dashed border-[#E5E7EB] flex flex-col items-center justify-center cursor-pointer hover:border-[#F97316] hover:bg-[#FFF4ED] transition-all group">
          <div className="w-12 h-12 rounded-full bg-[#F5F5F5] group-hover:bg-[#F97316] flex items-center justify-center mb-3 transition-colors">
            <ArrowRight size={20} className="text-[#888] group-hover:text-white transition-colors" weight="bold" />
          </div>
          <span className="text-[13px] font-bold text-[#888] group-hover:text-[#F97316] transition-colors">
            See More
          </span>
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
