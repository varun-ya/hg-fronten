"use client";

import { Star, ThumbsUp, Flag } from "@phosphor-icons/react";
import { reviews } from "./profileData";
import type { TutorProfile } from "./profileData";

// Star count breakdown matching mobile _ratingBar
const STAR_COUNTS = [18, 4, 1, 1, 0]; // 5★ to 1★

export default function ReviewsTab({ profile }: { profile: TutorProfile }) {
  const total = STAR_COUNTS.reduce((a, b) => a + b, 0);
  return (
    <div className="flex flex-col gap-5">
      {/* Rating Summary — matches mobile layout exactly */}
      <div className="rounded-[16px] p-5 px-6" style={{ background: "#FFFBF2", border: "1px solid #FDE68A" }}>
        <div className="flex items-start gap-6 flex-wrap">
          {/* Big number + stars + count */}
          <div className="text-center shrink-0">
            <p className="text-[42px] font-semibold text-[#111] leading-none">{profile.rating}</p>
            <div className="flex items-center justify-center gap-0.5 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} weight="fill" className="text-[#F97316]" />
              ))}
            </div>
            <p className="text-[13px] text-[#666] mt-1.5">{profile.reviewCount} reviews</p>
          </div>
          {/* Star count bars (5★ → 1★) — matches mobile */}
          <div className="flex-1 min-w-[160px] flex flex-col gap-1.5">
            {STAR_COUNTS.map((count, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-[12px] text-[#666] w-3 text-right">{5 - i}</span>
                <div className="flex-1 h-[6px] bg-[#F3F4F6] rounded-full overflow-hidden">
                  <div className="h-full bg-[#F97316] rounded-full" style={{ width: `${total > 0 ? (count / total) * 100 : 0}%` }} />
                </div>
                <span className="text-[11px] text-[#999] w-4">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Cards */}
      <div className="space-y-3">
        {reviews.map((r, i) => (
          <div key={i} className="bg-white rounded-[16px] border border-[#EBEBEB] p-[18px]">
            <div className="flex items-start justify-between mb-2.5">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-[16px] font-medium text-white"
                  style={{
                    background: `linear-gradient(135deg, hsl(${(i * 67) % 360},50%,75%), hsl(${(i * 67 + 40) % 360},50%,65%))`,
                  }}
                >
                  {r.name[0]}
                </div>
                <div>
                  <span className="text-[15px] font-medium text-[#111]">{r.name}</span>
                  <div className="flex items-center gap-px mt-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={12} weight={j < r.stars ? "fill" : "regular"} className="text-[#F97316]" />
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-[13px] text-[#999]">{r.time}</span>
            </div>

            {/* Subject tag */}
            <span className="inline-block px-2.5 py-1 bg-[#F3F4F6] rounded-full text-[11px] text-[#555] mb-2">{r.subject}</span>

            <p className="text-[15px] text-[#555] leading-[1.6]">"{r.text}"</p>

            <div className="flex items-center gap-4 mt-3">
              <button className="flex items-center gap-1.5 text-[12px] text-[#888] hover:text-[#555] transition-colors cursor-pointer">
                <ThumbsUp size={14} /> Helpful ({r.helpful})
              </button>
              <Flag size={13} className="text-[#CCC] cursor-pointer hover:text-[#888] transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
