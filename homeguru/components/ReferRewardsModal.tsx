"use client";

import { useState } from "react";
import { X, Copy, Share2, Users, Star, Check, Sparkles, Crown, Zap, Gift } from "lucide-react";

interface ReferRewardsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReferRewardsModal({ isOpen, onClose }: ReferRewardsModalProps) {
  const [copied, setCopied] = useState(false);
  const referralCode = "SUMAN-47XH";

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = referralCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: "Join HomeGuru!",
      text: `Use my referral code ${referralCode} to sign up on HomeGuru and we both earn rewards!`,
      url: `https://homeguru.com/refer?code=${referralCode}`,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch { /* user cancelled */ }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[520px] max-h-[90vh] overflow-y-auto custom-scrollbar border border-[#E5E7EB]">

        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b border-[#F3F4F6]">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <Gift size={16} className="text-white" />
                </div>
                <h2 className="text-[20px] font-semibold text-[#111827] font-season">Refer & Rewards</h2>
              </div>
              <p className="text-[13px] text-[#6B7280] font-matter mt-1">Invite friends to HomeGuru and earn rewards together.</p>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-[#F3F4F6] rounded-lg transition-colors text-[#9CA3AF] hover:text-[#111827]">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-6">
          <p className="text-[13.5px] text-[#6B7280] leading-relaxed font-matter">
            When someone joins HomeGuru using your referral, both of you receive reward points that unlock exclusive platform benefits.
          </p>

          {/* Referral Code */}
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-5">
            <p className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-2 font-matter">Your Referral Code</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-white border border-[#E5E7EB] rounded-lg px-4 py-3 font-mono text-[18px] font-bold text-[#111827] tracking-widest text-center select-all">
                {referralCode}
              </div>
              <button onClick={handleCopy}
                className={`px-4 py-3 rounded-lg text-[13px] font-semibold transition-all flex items-center gap-2 shrink-0 font-matter ${
                  copied ? "bg-green-50 text-green-700 border border-green-200" : "bg-[#111827] text-white hover:bg-[#1F2937]"
                }`}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>
            <button onClick={handleShare}
              className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-[#E5E7EB] rounded-lg text-[13px] font-medium text-[#374151] hover:bg-white transition-colors font-matter">
              <Share2 size={14} /> Share Referral Link
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4 text-center">
              <div className="w-9 h-9 rounded-full bg-[#EEF2FF] flex items-center justify-center mx-auto mb-2">
                <Users size={16} className="text-[#4F46E5]" />
              </div>
              <p className="text-[20px] font-bold text-[#111827] font-season">0</p>
              <p className="text-[11.5px] text-[#9CA3AF] font-matter mt-0.5">Friends Joined</p>
            </div>
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4 text-center">
              <div className="w-9 h-9 rounded-full bg-[#FEF3C7] flex items-center justify-center mx-auto mb-2">
                <Star size={16} className="text-[#D97706]" />
              </div>
              <p className="text-[20px] font-bold text-[#111827] font-season">0</p>
              <p className="text-[11.5px] text-[#9CA3AF] font-matter mt-0.5">Points Earned</p>
            </div>
          </div>

          {/* How It Works */}
          <div>
            <h3 className="text-[14px] font-semibold text-[#111827] mb-4 font-season">How It Works</h3>
            <div className="space-y-0 relative">
              <div className="absolute left-[17px] top-8 bottom-6 w-[1px]"
                style={{ backgroundImage: 'radial-gradient(circle, #E5E7EB 1.5px, transparent 1.5px)', backgroundSize: '1px 8px', backgroundRepeat: 'repeat-y' }} />
              {[
                { step: "1", text: "Share your referral code with friends." },
                { step: "2", text: "Your friend signs up using your code." },
                { step: "3", text: "Both of you receive reward points." },
              ].map(item => (
                <div key={item.step} className="flex items-start gap-3.5 py-3 relative">
                  <div className="w-[34px] h-[34px] rounded-full bg-[#F3F4F6] border-2 border-white shadow-sm flex items-center justify-center text-[12px] font-bold text-[#6B7280] shrink-0 z-10 font-matter">{item.step}</div>
                  <p className="text-[13.5px] text-[#374151] font-matter pt-1.5">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rewards */}
          <div className="bg-gradient-to-br from-[#FEFCE8] to-[#FEF3C7] border border-[#FDE68A] rounded-xl p-5">
            <h3 className="text-[14px] font-semibold text-[#92400E] mb-3 flex items-center gap-2 font-season">
              <Sparkles size={15} className="text-[#D97706]" /> What Can You Unlock?
            </h3>
            <div className="space-y-2.5">
              {[
                { icon: <Crown size={13} />, text: "Discounts on tutoring sessions" },
                { icon: <Zap size={13} />, text: "Premium learning features" },
                { icon: <Star size={13} />, text: "Priority tutor matching" },
                { icon: <Gift size={13} />, text: "Exclusive student perks" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <span className="text-[#B45309]">{item.icon}</span>
                  <p className="text-[13px] text-[#78350F] font-matter">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[12px] text-[#9CA3AF] text-center font-matter italic">
            The more you refer, the more rewards you unlock.
          </p>
        </div>
      </div>
    </div>
  );
}
