'use client';

import { Star, SealCheck, ThumbsUp, Flag } from '@phosphor-icons/react';
import { reviews, defaultProfile } from './profileData';

const ratingCounts = [18, 4, 1, 1, 0];
const totalReviews = 24;

export default function ReviewsTab() {
  return (
    <div className="flex flex-col gap-5">
      {/* Rating Summary */}
      <div className="flex items-center gap-6 bg-[#F9FAFB] rounded-[14px] border border-[#EBEBEB] p-5">
        <div className="text-center shrink-0">
          <p className="font-season text-[48px] font-bold text-[#111] leading-none">{defaultProfile.rating}</p>
          <div className="flex items-center justify-center gap-0.5 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} weight="fill" className="text-[#F59E0B]" />
            ))}
          </div>
          <p className="text-[13px] text-[#888] mt-1.5">{totalReviews} reviews</p>
        </div>
        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((star, i) => {
            const count = ratingCounts[i];
            const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-2.5">
                <span className="text-[12px] font-medium text-[#888] w-3 text-right">{star}</span>
                <div className="flex-1 h-[6px] bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div className="h-full bg-[#F59E0B] rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-[11px] text-[#BBB] w-5">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rating Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {Object.entries(defaultProfile.ratingBreakdown).map(([key, val]) => (
          <div key={key} className="bg-[#F9FAFB] rounded-[12px] border border-[#EBEBEB] p-3 text-center">
            <p className="font-season text-[18px] font-semibold text-[#111]">{val}</p>
            <p className="text-[11px] text-[#888] mt-0.5 capitalize">{key}</p>
          </div>
        ))}
      </div>

      {/* Review Cards */}
      <div className="space-y-3">
        {reviews.map((r, i) => {
          const hue1 = (i * 67) % 360;
          const hue2 = (i * 67 + 40) % 360;
          return (
            <div key={i} className="bg-[#F9FAFB] rounded-[14px] border border-[#EBEBEB] p-5 hover:bg-white transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: `linear-gradient(135deg, hsl(${hue1},50%,85%), hsl(${hue2},50%,75%))` }}>
                  <span className="text-[15px] font-bold text-white">{r.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[14px] font-semibold text-[#111]">{r.name}</span>
                    <SealCheck size={13} weight="fill" className="text-[#F97316]" />
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex items-center gap-px">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={12} weight={j < r.stars ? 'fill' : 'regular'} className="text-[#F59E0B]" />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#BBB]">{r.time}</span>
                  </div>
                </div>
              </div>
              <span className="inline-block px-2.5 py-[3px] bg-white rounded-full text-[11px] font-medium text-[#444] mb-2.5 border border-[#EBEBEB]">{r.subject}</span>
              <p className="text-[14px] text-[#444] leading-[1.6]">{r.text}</p>
              <div className="flex items-center gap-4 mt-3">
                <button className="flex items-center gap-1.5 text-[12px] text-[#888] hover:text-[#555] transition-colors cursor-pointer">
                  <ThumbsUp size={14} /> Helpful ({r.helpful})
                </button>
                <Flag size={13} className="text-[#CCC] cursor-pointer hover:text-[#888] transition-colors" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
