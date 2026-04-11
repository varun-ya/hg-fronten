"use client";

import { Search, SlidersHorizontal, Filter, Plus, ChevronRight, ChevronLeft, ChevronDown, X, MessageSquare, Play, Sparkles, Users, Share2, GraduationCap, Megaphone, Clapperboard, FileUp, Settings2, Tv, CirclePlus, MoreHorizontal, ArrowRight } from "lucide-react";
import Link from "next/link";

const categories = [
  { label: "Conversational", icon: MessageSquare },
  { label: "Narration", icon: Play },
  { label: "Characters", icon: Sparkles },
  { label: "Social Media", icon: Share2 },
  { label: "Educational", icon: GraduationCap },
  { label: "Advertisement", icon: Megaphone },
  { label: "Entertainment", icon: Tv },
];

const trendingVoices = [
  { name: "Tripti - Calm and Clear", type: "Conversational", lang: "Hindi", hue: 300, extra: "+14" },
  { name: "Raqib – Clear Documentary Presenter", type: "Narration", lang: "Hindi", hue: 220 },
  { name: "Sia – Warm & Intimate Late Night Voi...", type: "Narration", lang: "Hindi", hue: 120 },
  { name: "Yash - Calm, Empathetic and Serious", type: "Conversational", lang: "Hindi", hue: 45 },
  { name: "Monika Sogam - Deep and Clear", type: "Conversational", lang: "Hindi", hue: 30 },
  { name: "Aishwarya - Sweet and Natural", type: "Narration", lang: "Hindi", hue: 130 },
];

const collections = [
  { title: "Best voices for Eleven v3", bgLight: "bg-purple-100", bgDark: "bg-purple-900", textColor: "text-purple-900", arrowText: "text-purple-100" },
  { title: "Popular Tiktok voices", bgLight: "bg-red-100", bgDark: "bg-red-900", textColor: "text-red-900", arrowText: "text-red-100" },
  { title: "Studio-Quality Conversational Voices", bgLight: "bg-blue-100", bgDark: "bg-blue-900", textColor: "text-blue-900", arrowText: "text-blue-100" },
  { title: "Engaging Characters for Video Games", bgLight: "bg-teal-100", bgDark: "bg-teal-900", textColor: "text-teal-900", arrowText: "text-teal-100" },
  { title: "Bring your stories to life", bgLight: "bg-green-100", bgDark: "bg-green-900", textColor: "text-green-900", arrowText: "text-green-100" },
  { title: "Relaxing and Meditative", bgLight: "bg-orange-100", bgDark: "bg-orange-900", textColor: "text-orange-900", arrowText: "text-orange-100" },
];

export default function VoicesPage() {
  return (
    <div className="w-full max-w-[72rem] mx-auto">
      {/* Tabs + Create Voice */}
      <div className="flex items-center justify-between w-full max-w-[72rem] mb-6">
        <div className="flex items-center gap-1">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-black/[0.05]" style={{ color: "hsl(var(--foreground))" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M2 12h4m4-8v16m4-12v8m4-4v0" strokeLinecap="round" /></svg>
            Explore
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 rounded-lg hover:bg-black/[0.03]">My Voices</button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 rounded-lg hover:bg-black/[0.03]">Default Voices</button>
        </div>
        <button className="inline-flex items-center gap-2 h-9 px-4 text-sm font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800">
          <Plus className="w-4 h-4" />
          Create Voice
        </button>
      </div>

      {/* Search + Filters */}
      <div className="w-full max-w-[72rem] pt-3 md:pt-5 pb-4 md:pb-5">
        <div className="relative flex-1">
          <div className="flex items-center gap-2">
            {/* Search input */}
            <div className="overflow-hidden flex items-center relative grow h-10 w-full rounded-xl px-3 pr-1 bg-transparent text-sm shadow-none" style={{ border: "1px solid var(--gray-alpha-200)" }}>
              <Search className="w-5 h-5 stroke-gray-400 shrink-0" />
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search library voices..."
                  className="flex bg-transparent shadow-none w-full h-10 rounded-xl border-0 px-3 py-0 text-sm outline-none focus:ring-0"
                />
              </div>
              <div className="-mr-px">
                <button aria-label="Search with audio sample" className="inline-flex items-center justify-center bg-transparent hover:bg-black/[0.04] rounded-lg p-0 h-8 w-8 group">
                  <FileUp className="w-4 h-4 text-gray-500 group-hover:text-gray-600 transition-all duration-200" />
                </button>
              </div>
            </div>

            {/* Filters button */}
            <button className="relative inline-flex justify-center whitespace-nowrap text-sm font-medium bg-white h-10 px-4 rounded-xl flex items-center gap-2" style={{ border: "1px solid var(--gray-alpha-200)", color: "hsl(var(--foreground))" }}>
              <Settings2 className="h-4 w-4" />
              Filters
            </button>

            {/* Sort dropdown */}
            <button className="flex gap-0.5 items-center justify-between whitespace-nowrap bg-white h-10 rounded-xl text-sm font-medium pl-3 pr-2 py-2 shrink transition-colors hover:bg-black/[0.02]" style={{ border: "1px solid var(--gray-alpha-200)", color: "hsl(var(--foreground))" }}>
              <div className="flex items-center gap-1.5 text-sm font-medium md:pr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" color="currentColor" className="-translate-x-0.5 md:translate-x-0.5">
                  <path d="M5.001 4.167V15.833M5.001 15.833L2.5 13.333M5.001 15.833L7.5 13.333" stroke="currentColor" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 5.833H16.667" stroke="currentColor" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13.333 14.167H16.667" stroke="currentColor" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M11.667 10H16.667" stroke="currentColor" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
          </div>

          {/* Category pills row */}
          <div className="mt-2">
            <div className="flex flex-col gap-1 md:flex-row md:gap-0 md:items-center">
              {/* Language + Accent */}
              <div className="flex items-center gap-2 shrink-0 pr-0.5">
                <button className="cursor-pointer select-none max-w-full flex items-center h-10 rounded-xl text-sm font-medium bg-transparent px-3" style={{ border: "1px solid var(--gray-alpha-200)", color: "hsl(var(--foreground))" }}>
                  <span className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" color="currentColor" className="shrink-0">
                      <path d="M3.125 4.847L10.208 4.847" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6.667 4.792V3.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10 11.875C6.612 10.999 4.871 8.845 4.375 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M3.333 11.667C6.72 10.817 8.462 8.728 8.958 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M11.953 14.271H16.38M17.708 16.042L14.946 8.73C14.675 8.012 13.659 8.012 13.387 8.73L10.625 16.042" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Language</span>
                  </span>
                  <ChevronDown className="w-4 h-4 ml-1 opacity-50" />
                </button>
                <button className="cursor-pointer select-none max-w-full flex items-center h-10 rounded-xl text-sm font-medium bg-transparent px-3 opacity-50 pointer-events-none" style={{ border: "1px solid var(--gray-alpha-200)", color: "hsl(var(--foreground))" }}>
                  <span className="text-gray-500">Accent</span>
                  <ChevronDown className="w-4 h-4 ml-1 opacity-50" />
                </button>
              </div>

              {/* Divider */}
              <div className="hidden md:block h-4 w-px bg-gray-200 shrink-0 ml-2 mr-1.5" />

              {/* Scrollable category chips */}
              <div className="relative flex-1 min-w-0">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-1">
                  {categories.map((c) => (
                    <button key={c.label} className="cursor-pointer select-none max-w-full flex items-center h-10 rounded-xl text-sm font-medium bg-transparent px-3 whitespace-nowrap hover:bg-black/[0.04]" style={{ border: "1px solid var(--gray-alpha-200)" }}>
                      <span className="flex items-center gap-1.5">
                        <span className="opacity-70 shrink-0"><c.icon className="w-4 h-4" /></span>
                        <span className="text-gray-500">{c.label}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legendary voices banner */}
      <section className="relative mb-8">
        <a href="https://elevenlabs.io/iconic-marketplace" target="_blank" className="block outline-none rounded-[14px]" aria-label="Legendary voices for your creative projects">
          <div className="relative bg-gray-50 min-h-[60px] rounded-[14px] flex items-center px-5 overflow-hidden justify-between" style={{ border: "1px solid var(--gray-alpha-200)" }}>
            <h4 className="text-base font-medium" style={{ color: "hsl(var(--foreground))" }}>Legendary voices for your creative projects</h4>
            <div className="flex items-center gap-3.5">
              {["#D1D5DB", "#C4B5FD", "#93C5FD", "#FCA5A5", "#A7F3D0"].map((bg, i) => (
                <div key={i} className="relative">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[106px] h-[106px] rounded-full" style={{ backgroundColor: bg }} />
                  <div className="relative w-[106px] h-[60px] rounded-full overflow-hidden" style={{ background: `linear-gradient(135deg, ${bg}, #6B7280)` }} />
                </div>
              ))}
              <span className="relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 h-9 px-3 rounded-[10px]">Learn more</span>
            </div>
          </div>
        </a>
        <div className="absolute -top-2.5 -right-2.5 flex justify-end">
          <button aria-label="Close popup" className="relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium bg-white hover:bg-white border border-gray-200 p-0 w-6 h-6 rounded-full">
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
              <path d="M0.833 0.833L7.5 7.5M7.5 0.833L0.833 7.5" stroke="#9CA3AF" strokeWidth="1.667" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </section>

      {/* Trending voices */}
      <div className="w-full max-w-[72rem] mb-10">
        <Link href="/voices?sort=trending" className="rounded-sm">
          <div className="group inline-flex items-baseline justify-start gap-0.5 mb-2">
            <h2 className="text-xl font-semibold" style={{ color: "hsl(var(--foreground))" }}>
              Trending voices{" "}
              <ChevronRight className="w-5 h-5 text-gray-400 translate-y-[-1px] translate-x-[-1px] group-hover:translate-x-[2px] inline-flex transition-transform" />
            </h2>
          </div>
        </Link>
        <div className="max-w-[72rem]">
          <ul className="flex flex-col gap-1 sm:grid sm:gap-2 md:gap-4 grid-cols-2 lg:grid-cols-3 relative -mx-2 w-[calc(100%+1rem)]">
            {trendingVoices.map((v) => (
              <li key={v.name} className="flex items-center p-3 gap-3 relative cursor-pointer px-2 py-2 hover:bg-black/[0.04] rounded-[20px] group">
                <button className="text-left absolute inset-0 focus:outline-none rounded-[20px]" />
                <div className="w-full flex items-center gap-3">
                  {/* Avatar container */}
                  <div className="shrink-0 relative w-[4.375rem] h-[4.375rem] bg-black/[0.04] flex justify-center items-center rounded-[16px]">
                    <div className="relative shrink-0" style={{ height: "2rem", width: "2rem" }}>
                      <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-300 via-orange-400 to-pink-500 rounded-full" style={{ filter: `hue-rotate(${v.hue}deg) saturate(120%)`, transform: `rotate(${v.hue}deg)` }} />
                      </div>
                    </div>
                  </div>
                  {/* Text */}
                  <div className="relative flex-1 min-w-0 flex items-center grow">
                    <div className="w-full">
                      <div className="flex flex-col gap-1">
                        <div className="max-w-[260px]">
                          <p className="text-sm font-semibold whitespace-nowrap truncate" style={{ color: "hsl(var(--foreground))" }}>{v.name}</p>
                          <p className="text-gray-500 font-normal text-[0.8125rem]">{v.type}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs">🇮🇳</span>
                          <p className="text-gray-500 font-normal text-[0.8125rem]">{v.lang}</p>
                          {v.extra && <span className="text-gray-400 ml-1 text-[0.8125rem]">{v.extra}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Hover actions */}
                  <div className="relative flex items-center gap-2 md:gap-4 justify-end">
                    <div className="relative flex gap-2 items-center hidden group-hover:flex pr-1 justify-end ml-2">
                      <button aria-label="Add to My Voices" className="inline-flex items-center justify-center bg-transparent hover:bg-black/[0.04] rounded-lg w-8 h-8 p-0" style={{ color: "hsl(var(--foreground))" }}>
                        <CirclePlus className="w-4 h-4" />
                      </button>
                      <button aria-label="More actions" className="inline-flex items-center justify-center bg-transparent hover:bg-black/[0.04] rounded-lg w-8 h-8 p-0" style={{ color: "hsl(var(--foreground))" }}>
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Handpicked for your use case */}
      <div className="w-full flex flex-col items-center mb-10">
        <div className="w-full max-w-[72rem] flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl font-semibold" style={{ color: "hsl(var(--foreground))" }}>Handpicked for your use case</h2>
          <div className="hidden sm:flex items-center">
            <button aria-label="Previous page" className="inline-flex items-center justify-center bg-transparent hover:bg-black/[0.04] rounded-[10px] p-0 h-9 w-9" style={{ color: "hsl(var(--foreground))" }}>
              <ChevronLeft className="w-[18px] h-[18px] -translate-x-px" />
            </button>
            <button aria-label="Next page" className="inline-flex items-center justify-center bg-transparent hover:bg-black/[0.04] rounded-[10px] p-0 h-9 w-9" style={{ color: "hsl(var(--foreground))" }}>
              <ChevronRight className="w-[18px] h-[18px] translate-x-px" />
            </button>
          </div>
        </div>
        <div className="w-[calc(100%+2.5rem)] -mx-5 px-5 overflow-x-auto no-scrollbar flex">
          <ul className="flex items-center gap-3 py-1 my-1">
            {collections.map((c) => (
              <li key={c.title} className="rounded-2xl h-[165px] shrink-0 flex flex-col justify-end w-[340px] relative">
                <a className={`flex w-full h-full rounded-2xl overflow-hidden ${c.bgLight}`} href="#">
                  <div className="grid grid-cols-2 w-full">
                    <div className="relative flex w-full h-full py-1.5 pl-1.5 pr-3 overflow-hidden">
                      <div className="flex relative w-full h-full">
                        <div className={`absolute -right-6 -top-3 rotate-[7deg] scale-75 opacity-50 flex w-full h-full rounded-[10px] overflow-hidden ${c.bgDark}`} />
                        <div className={`flex w-full h-full rounded-[10px] overflow-hidden ${c.bgDark}`} />
                      </div>
                    </div>
                    <div className="relative flex flex-col p-4">
                      <h2 className={`text-xl font-bold max-w-[200px] leading-6 ${c.textColor}`}>{c.title}</h2>
                    </div>
                  </div>
                </a>
                <div className="absolute bottom-0 right-0 p-4 flex items-center justify-center pointer-events-none">
                  <div className={`w-7 h-7 flex items-center justify-center rounded-full ${c.bgDark} ${c.arrowText}`}>
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
