'use client';

import { useState } from 'react';
import {
  CaretLeft,
  ShareNetwork,
  DotsThree,
  SealCheck,
  MapPin,
  Clock,
  CalendarBlank,
  Link as LinkIcon,
  User,
  TrendUp,
  VideoCamera,
  Star,
  CaretRight,
} from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { defaultProfile, similarTutors, type TutorProfile } from '@/components/profile/profileData';
import AboutTab from '@/components/profile/AboutTab';
import ReviewsTab from '@/components/profile/ReviewsTab';
import CredentialsTab from '@/components/profile/CredentialsTab';

const TABS = ['About', 'Credentials', 'Reviews'] as const;

function getYouTubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|v=)([^&?/]+)/);
  return m?.[1] ?? 'G64LLtnjYlA';
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile] = useState<TutorProfile>({ ...defaultProfile });
  const [activeTab, setActiveTab] = useState(0);
  const videoId = getYouTubeId(profile.ytLink);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* ── Fixed Top Nav ── */}
      <div className="fixed top-0 left-0 right-0 z-[200] bg-white border-b border-[#EBEBEB] h-[56px] flex items-center px-4">
        <div className="max-w-[1300px] w-full mx-auto flex items-center gap-3">
          <button onClick={() => router.back()} className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer shrink-0 border-none bg-transparent">
            <CaretLeft size={20} className="text-[#111]" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="font-season text-[17px] font-medium text-[#111] leading-tight truncate">{profile.name}</p>
            <p className="text-[12px] text-[#888]">{profile.sessions} Sessions · ⭐ {profile.rating}</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button className="w-[34px] h-[34px] rounded-full border border-[#EBEBEB] bg-white flex items-center justify-center cursor-pointer">
              <ShareNetwork size={16} className="text-[#555]" />
            </button>
            <button className="w-[34px] h-[34px] rounded-full border border-[#EBEBEB] bg-white flex items-center justify-center cursor-pointer">
              <DotsThree size={16} className="text-[#555]" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Three-column layout ── */}
      <div className="max-w-[1440px] mx-auto pt-[56px] px-4 flex gap-6 items-stretch justify-center tp-layout">

        {/* ── LEFT SPACER (video + calendar) ── */}
        <div className="w-[440px] shrink-0 pt-5 hidden lg:block self-stretch">
          <div className="sticky top-[76px]">
            {/* Video */}
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
              <div className="relative pb-[62%] h-0">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={`${profile.name} - Introduction`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full border-none rounded-t-[14px]"
                />
              </div>
              <div className="p-3.5 px-4">
                <p className="font-season text-[15px] font-medium text-[#111] leading-[1.3]">Meet {profile.name}</p>
                <p className="text-[13px] text-[#888] mt-1">Watch intro video · Mathematics & Physics Tutor</p>
              </div>
            </div>

            {/* Book a Session */}
            <div className="mt-2.5 bg-white border border-[#EBEBEB] rounded-[12px] overflow-hidden">
              <div className="p-3 px-3.5 border-b border-[#EBEBEB] flex items-center gap-2">
                <CalendarBlank size={16} className="text-[#F97316]" />
                <span className="font-season text-[15px] font-medium text-[#111]">Book a Session</span>
              </div>
              <div className="p-4 text-center">
                <p className="text-[14px] text-[#888]">Calendar coming soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── CENTER COLUMN ── */}
        <div className="flex-1 max-w-[640px] min-w-0">
          {/* Profile Hero Card */}
          <div className="bg-white border border-[#EBEBEB] rounded-[16px] overflow-hidden mb-3">
            {/* Cover */}
            <div className="h-[140px] relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0A2156 0%, #1e3a8a 50%, #F97316 100%)' }}>
              <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(255,255,255,0.2) 12px, rgba(255,255,255,0.2) 24px)' }} />
            </div>

            <div className="px-5 relative mb-1">
              {/* Avatar */}
              <div className="w-[104px] h-[104px] rounded-full bg-white border-4 border-white overflow-hidden flex items-center justify-center relative z-[2]" style={{ marginTop: -52, boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}>
                {profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#F8FAFC] flex items-center justify-center">
                    <User size={40} className="text-[#CBD5E1]" />
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="absolute top-3 right-5 flex gap-2">
                <button className="h-9 px-5 rounded-full border-[1.5px] border-[#EBEBEB] bg-white text-[14px] font-semibold text-[#111] cursor-pointer">Follow</button>
                <button className="font-season h-9 px-5 rounded-full border-[1.5px] border-[#EBEBEB] bg-white text-[15px] font-semibold text-[#111] cursor-pointer">Book Trial</button>
              </div>

              {/* Name + handle */}
              <div className="mt-3">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h1 className="font-season text-[22px] font-medium text-[#111] m-0">{profile.name}</h1>
                  <SealCheck size={18} weight="fill" className="text-[#F97316]" />
                  <span className="bg-[#F97316] text-white text-[11px] font-semibold px-2.5 py-[3px] rounded-full">{profile.level || 'Expert'}</span>
                </div>
                <p className="text-[14px] text-[#888] mt-1">@{profile.handle} · Mathematics & Physics Tutor</p>
              </div>

              {/* Bio */}
              <p className="text-[14px] text-[#444] leading-[1.55] mt-2.5 mb-3">{profile.bio}</p>

              {/* Meta row */}
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-[#666] mb-3">
                <span className="flex items-center gap-1"><MapPin size={14} /> {profile.location}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> Responds {profile.responseTime || 'quickly'}</span>
                <span className="flex items-center gap-1"><CalendarBlank size={14} /> Joined Jun 2025</span>
                <span className="flex items-center gap-1 text-[#F97316]"><LinkIcon size={14} weight="bold" /> {profile.website || 'homeguru.com'}</span>
              </div>

              {/* Stats row */}
              <div className="flex gap-0 border-t border-[#EBEBEB] -mx-5 px-5 py-3">
                {[
                  { value: profile.students.toString(), label: 'Students' },
                  { value: profile.sessions.toLocaleString(), label: 'Sessions' },
                  { value: profile.reviewCount.toString(), label: 'Reviews' },
                  { value: `⭐ ${profile.rating}`, label: 'Rating' },
                ].map((s, i, arr) => (
                  <div key={i} className="flex-1 text-center" style={i < arr.length - 1 ? { borderRight: '1px solid #EBEBEB' } : undefined}>
                    <div className="font-season text-[18px] font-semibold text-[#111]">{s.value}</div>
                    <div className="text-[11px] text-[#888] mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Traits */}
            <div className="px-5 py-2.5 border-t border-[#EBEBEB] flex flex-wrap gap-1.5">
              {(profile.traits || ['Experienced', 'Patient', 'Knowledgeable']).map((t) => (
                <span key={t} className="bg-[#F3F4F6] text-[#444] text-[12px] font-medium px-3 py-1 rounded-full border border-[#EBEBEB]">{t}</span>
              ))}
            </div>
          </div>

          {/* Mobile Video */}
          <div className="lg:hidden mb-3">
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={`${profile.name} - Introduction`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full border-none rounded-t-[14px]"
                />
              </div>
              <div className="p-3 px-3.5">
                <p className="font-season text-[15px] font-medium text-[#111]">Meet {profile.name}</p>
                <p className="text-[13px] text-[#888] mt-1">Watch intro video · Mathematics & Physics Tutor</p>
              </div>
            </div>
          </div>

          {/* ── Tabs ── */}
          <div className="bg-white border border-[#EBEBEB] rounded-[12px] overflow-hidden mb-3">
            <div className="flex border-b border-[#EBEBEB]">
              {TABS.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`font-season flex-1 py-3.5 text-[14px] relative transition-all cursor-pointer border-none bg-transparent ${
                    activeTab === i ? 'font-semibold text-[#111]' : 'font-normal text-[#888]'
                  }`}
                >
                  {tab}
                  {activeTab === i && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-9 h-[3px] bg-[#111] rounded-full" />
                  )}
                </button>
              ))}
            </div>
            <div className="p-5">
              {activeTab === 0 && <AboutTab profile={profile} />}
              {activeTab === 1 && <CredentialsTab />}
              {activeTab === 2 && <ReviewsTab />}
            </div>
          </div>

          {/* Mobile Book Trial */}
          <div className="lg:hidden mb-3">
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
              <div className="flex items-center justify-between gap-3 p-4 px-5">
                <div>
                  <div className="font-season text-[20px] font-medium text-[#111]">₹500<span className="text-[14px] font-medium text-[#888]">/hr</span></div>
                  <div className="text-[12px] text-[#888]">Free trial · Next available today</div>
                </div>
                <div className="font-season bg-white text-[#111] border-[1.5px] border-[#EBEBEB] rounded-full px-7 h-11 font-semibold text-[16px] flex items-center justify-center cursor-pointer">Book Trial</div>
              </div>
            </div>
          </div>

          {/* Similar Tutors */}
          <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden mb-24">
            <div className="px-5 py-3.5 border-b border-[#EBEBEB]">
              <span className="font-season text-[16px] font-medium text-[#111]">Similar tutors you may like</span>
            </div>
            {similarTutors.map((tutor, i) => (
              <div key={i} className="px-5 py-3.5 flex items-center gap-3 cursor-pointer hover:bg-[#FAFAFA] transition-colors" style={i < similarTutors.length - 1 ? { borderBottom: '1px solid #EBEBEB' } : undefined}>
                <img src={tutor.avatar} alt={tutor.name} className="w-11 h-11 rounded-full object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[14px] font-semibold text-[#111]">{tutor.name}</span>
                    <SealCheck size={13} weight="fill" className="text-[#F97316]" />
                  </div>
                  <p className="text-[12px] text-[#888]">{tutor.subject} · ₹{tutor.price}/hr · ⭐ {tutor.rating}</p>
                </div>
                <button className="shrink-0 px-3.5 py-1.5 rounded-full border-[1.5px] border-[#EBEBEB] bg-white text-[12px] font-semibold text-[#111] cursor-pointer">View</button>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <aside className="w-[340px] shrink-0 hidden lg:flex flex-col gap-6 pt-5 pb-24 self-stretch">
          {/* Pricing */}
          <div className="bg-white border border-[#EBEBEB] rounded-[16px] p-5">
            <div className="flex items-baseline gap-1 mb-1">
              <span className="font-season text-[24px] font-medium text-[#111]">₹500</span>
              <span className="text-[13px] text-[#888]">/ 60-min lesson</span>
            </div>
            <div className="text-[12px] text-[#10B981] font-semibold mb-4">✓ Free trial available</div>
            <button className="font-season w-full h-[46px] rounded-full bg-white text-[#111] font-semibold text-[16px] border-[1.5px] border-[#EBEBEB] cursor-pointer mb-2.5">Book Trial Lesson</button>
            <p className="text-[11px] text-[#AAA] text-center mt-2.5">You won&apos;t be charged until you confirm</p>
          </div>

          {/* Quick Stats */}
          <div className="bg-white border border-[#EBEBEB] rounded-[14px] p-4">
            <div className="font-season text-[15px] font-medium text-[#111] mb-3">Quick stats</div>
            {[
              { icon: <TrendUp size={14} className="text-[#F97316]" />, label: 'Success rate', value: profile.successRate || '95%' },
              { icon: <Clock size={14} className="text-[#F97316]" />, label: 'Response time', value: profile.responseTime || 'within 1 hour' },
              { icon: <VideoCamera size={14} className="text-[#F97316]" />, label: 'Sessions taught', value: `${profile.sessions}+` },
              { icon: <Star size={14} weight="fill" className="text-[#F97316]" />, label: 'Avg. rating', value: `${profile.rating} / 5.0` },
            ].map((stat, i, arr) => (
              <div key={i} className="flex items-center justify-between py-2" style={i < arr.length - 1 ? { borderBottom: '1px solid #EBEBEB' } : undefined}>
                <div className="flex items-center gap-2">
                  {stat.icon}
                  <span className="text-[13px] text-[#666]">{stat.label}</span>
                </div>
                <span className="text-[13px] font-semibold text-[#111]">{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Today's Blogs */}
          <div className="bg-white border border-[#EBEBEB] rounded-[14px]">
            <div className="p-3.5 px-4 border-b border-[#EBEBEB]">
              <span className="font-season text-[15px] font-medium text-[#111]">Today&apos;s Blogs</span>
            </div>
            {[
              { name: 'Aarav Sharma', seed: 'Aarav', time: '2h ago', title: 'How I Cracked JEE in 6 Months' },
              { name: 'Priya Menon', seed: 'Priya', time: '5h ago', title: 'Why Every Student Should Learn Python in 2025' },
              { name: 'Ravi Kumar', seed: 'Ravi', time: '8h ago', title: 'The Secret to Mastering Any Musical Instrument' },
            ].map((blog, i) => (
              <div key={i} className="p-3.5 px-4 border-b border-[#EBEBEB] cursor-pointer hover:bg-[#FAFAFA] transition-colors">
                <div className="flex items-center gap-1.5 mb-2">
                  <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${blog.seed}`} alt={blog.name} className="w-5 h-5 rounded-full" />
                  <span className="text-[13px] font-semibold text-[#111]">{blog.name}</span>
                  <span className="text-[10px] text-[#DDD]">·</span>
                  <span className="text-[12px] text-[#BBB]">{blog.time}</span>
                </div>
                <p className="text-[14px] font-medium text-[#111] m-0 leading-[1.5]">{blog.title}</p>
              </div>
            ))}
            <div className="p-2.5 px-4">
              <button className="bg-transparent border-none cursor-pointer text-[13px] text-[#F97316] font-semibold">Show more →</button>
            </div>
          </div>

          {/* Top Tutors */}
          <div className="bg-white border border-[#EBEBEB] rounded-[14px]">
            <div className="p-3.5 px-4 border-b border-[#EBEBEB] flex items-center gap-1.5">
              <span className="text-[18px]">🏆</span>
              <span className="font-season text-[15px] font-medium text-[#111]">Top Tutors</span>
            </div>
            {[
              { medal: '🥇', name: 'Ravi Kumar', seed: 'Ravi', subject: 'Guitar', students: 156, rating: 5 },
              { medal: '🥈', name: 'Aarav Sharma', seed: 'Aarav', subject: 'Mathematics', students: 342, rating: 4.9 },
              { medal: '🥉', name: 'Vikram Joshi', seed: 'Vikram', subject: 'Physics', students: 290, rating: 4.9 },
            ].map((tutor, i, arr) => (
              <div key={i} className="p-3.5 px-4 flex items-center gap-3 cursor-pointer hover:bg-[#FAFAFA] transition-colors" style={i < arr.length - 1 ? { borderBottom: '1px solid #EBEBEB' } : undefined}>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[20px] w-6 text-center">{tutor.medal}</span>
                  <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${tutor.seed}`} alt={tutor.name} className="w-9 h-9 rounded-full object-cover border-[1.5px] border-[#EBEBEB]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-season text-[14px] font-medium text-[#111] leading-[1.3]">{tutor.name}</div>
                  <div className="text-[12px] text-[#888] mt-0.5">{tutor.subject} · {tutor.students} students</div>
                </div>
                <div className="text-[13px] font-semibold text-[#F97316] flex items-center gap-1">
                  <span>⭐</span> {tutor.rating}
                </div>
              </div>
            ))}
            <div className="p-2.5 px-4">
              <button className="bg-transparent border-none cursor-pointer text-[13px] text-[#F97316] font-semibold">View all rankings →</button>
            </div>
          </div>
        </aside>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .tp-layout { padding-left: 8px !important; padding-right: 8px !important; gap: 12px !important; }
        }
        @media (max-width: 480px) {
          .tp-layout { padding-left: 4px !important; padding-right: 4px !important; gap: 8px !important; }
        }
      `}</style>
    </div>
  );
}
