"use client";

import {
  House, CalendarBlank, VideoCamera, Newspaper,
  GraduationCap, CurrencyInr, ChatsCircle, BookOpen,
  User, Gear, Bell, RocketLaunch, CaretUpDown,
  ChartLine, Clock, Star, DotsThree,
  SquaresFour, CalendarCheck, UsersThree, Package,
  Warning, ArrowsClockwise, Repeat, BookBookmark,
  Folder, PencilLine, Bank, ArrowLineDown,
  ListBullets, Question, Gift, Megaphone,
  MagnifyingGlass, ChatTeardropDots, Lightning,
  Note, Wallet, Sun, Moon, Monitor, List, SignOut,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { memo, useState, useEffect } from "react";
import { useSidebar } from "@/context/SidebarContext";

type Theme = "light" | "dark" | "system";

function useTheme() {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const saved = (localStorage.getItem("hg_theme") as Theme) ?? "light";
    setThemeState(saved);
    applyTheme(saved);
    // Listen for system preference changes
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => { if (saved === "system") applyTheme("system"); };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  function applyTheme(t: Theme) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = t === "dark" || (t === "system" && prefersDark);
    const root = document.documentElement;
    if (isDark) {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
  }

  function setTheme(t: Theme) {
    setThemeState(t);
    localStorage.setItem("hg_theme", t);
    applyTheme(t);
  }

  return { theme, setTheme };
}

// ── Nav data ──────────────────────────────────────────────

const NAV_MAIN = [
  { label: "Home",      href: "/",         icon: House },
  { label: "Schedule",  href: "/schedule", icon: CalendarBlank, badge: "4" },
  { label: "Feed",      href: "/feed",     icon: Newspaper },
];

const NAV_MANAGE = [
  { label: "Students",  href: "/students",  icon: GraduationCap },
  { label: "Wallet",    href: "/wallet",    icon: Wallet },
];

// ── Sub-components ────────────────────────────────────────

function NavItem({ label, href, icon: Icon, badge, badgeColor, isOpen }: {
  label: string; href: string; icon: React.ElementType;
  badge?: string; badgeColor?: string; isOpen: boolean;
}) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <Link href={href} prefetch={false}
      className={`flex items-center gap-3 px-3 py-2 rounded-[10px] mb-0.5 transition-all group relative
        ${active ? "bg-[#FFF7F0] text-[#F97316]" : "text-[#555] hover:bg-[#F7F7F8] hover:text-[#111]"}`}
      title={!isOpen ? label : ""}>
      <Icon size={18} weight={active ? "fill" : "regular"} className="shrink-0" />
      {isOpen && (
        <span className={`text-[13.5px] flex-1 whitespace-nowrap ${active ? "font-semibold text-[#F97316]" : "font-medium"}`}>
          {label}
        </span>
      )}
      {isOpen && badge && (
        <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded-full min-w-[18px] text-center"
          style={{ background: badgeColor ?? "#111" }}>
          {badge}
        </span>
      )}
      {!isOpen && badge && (
        <span className="absolute top-1 right-1 w-2 h-2 rounded-full"
          style={{ background: badgeColor ?? "#111" }} />
      )}
    </Link>
  );
}

function SectionLabel({ label, isOpen }: { label: string; isOpen: boolean }) {
  if (!isOpen) return <div className="h-px bg-[#EBEBEB] mx-2 my-2" />;
  return <p className="text-[11px] font-semibold text-[#888] px-3 mb-1 mt-4 first:mt-2">{label}</p>;
}

// ── Sidebar ───────────────────────────────────────────────

function Sidebar({ isOpen }: { isOpen: boolean }) {
  const { toggle, isMobile } = useSidebar();
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const THEMES: { key: Theme; icon: React.ElementType; label: string }[] = [
    { key: "light",  icon: Sun,     label: "Light"  },
    { key: "dark",   icon: Moon,    label: "Dark"   },
    { key: "system", icon: Monitor, label: "System" },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen z-[41] flex flex-col border-r border-[#EBEBEB] bg-white transition-all duration-150 overflow-hidden ${
        isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : ''
      }`}
      style={{ width: isOpen ? "var(--eleven-sidebar-width-expanded)" : "var(--eleven-sidebar-width-collapsed)" }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 h-[56px] shrink-0 border-b border-[#EBEBEB]">
        <div className="flex items-center gap-3">
          {isOpen && (
            <button
              onClick={toggle}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F7F7F8] cursor-pointer border-none bg-transparent"
            >
              <List size={18} className="text-[#555]" />
            </button>
          )}
          <button onClick={toggle} className="cursor-pointer border-none bg-transparent p-0 flex items-center">
            {isOpen ? (
              <img src="/teacher/profileHeader.png" alt="HomeGuru" style={{ height: "22px", width: "auto" }} />
            ) : (
              <img src="/teacher/homeguru-logo.jpeg" alt="HomeGuru" style={{ width: "32px", height: "32px", borderRadius: "8px", objectFit: "cover" }} />
            )}
          </button>
        </div>
        {isOpen && (
          <button
            onClick={() => router.push("/notifications")}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F7F7F8] cursor-pointer border-none relative shrink-0 bg-transparent"
          >
            <Bell size={18} className="text-[#555]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F97316] border border-white" />
          </button>
        )}
      </div>

      {/* Tutor Switcher */}
      {isOpen && (
        <div className="px-3 py-2.5 border-b border-[#EBEBEB] shrink-0">
          <Link href="/profile" className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[10px] border border-[#EBEBEB] hover:border-[#DDD] hover:bg-[#FAFAFA] transition-all cursor-pointer bg-white">
            <div className="w-7 h-7 rounded-full bg-[#F97316]/10 flex items-center justify-center shrink-0">
              <span className="text-[12px] font-bold text-[#F97316]">A</span>
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="text-[13px] font-semibold text-[#111] truncate">Ayush Soni</div>
              <div className="text-[11px] text-[#888] truncate">Expert Tutor</div>
            </div>
            <CaretUpDown size={14} className="text-[#AAA] shrink-0" />
          </Link>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto no-scrollbar px-2 py-2">

        <SectionLabel label="Main" isOpen={isOpen} />
        {NAV_MAIN.map(item => <NavItem key={item.href} {...item} isOpen={isOpen} />)}

        <SectionLabel label="Manage" isOpen={isOpen} />
        {NAV_MANAGE.map(item => <NavItem key={item.href} {...item} isOpen={isOpen} />)}

        {/* Quick Stats */}
        {isOpen && (
          <div className="mt-5 mx-3 pb-4 border-b border-[#F0F0F0]">
            <p className="text-[10px] font-semibold text-[#CCC] uppercase tracking-widest mb-4">This Month</p>
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="text-[11px] text-[#BBB] mb-1">Total earned</p>
                <p className="text-[22px] font-light text-[#111] tracking-tight leading-none">₹12,400</p>
              </div>
              <span className="text-[12px] font-normal text-[#16A34A] mb-0.5">↑ 18%</span>
            </div>
            <div className="flex items-start justify-between">
              {[
                { val: "32",  label: "Sessions" },
                { val: "4.8", label: "Rating"   },
                { val: "18",  label: "Students" },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-[16px] font-light text-[#111] leading-none">{s.val}</p>
                  <p className="text-[10px] text-[#BBB] mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next Session */}
        {isOpen && (
          <div className="mt-4 mx-3 pb-4 border-b border-[#F0F0F0]">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-semibold text-[#CCC] uppercase tracking-widest">Next Session</p>
              <span className="flex items-center gap-1 text-[10px] font-semibold text-[#16A34A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse inline-block" />
                Live in 10m
              </span>
            </div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center shrink-0">
                <span className="text-[11px] font-bold text-[#555]">MI</span>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[#111] leading-none">Meera Iyer</p>
                <p className="text-[11px] text-[#BBB] mt-0.5">English Lit · 1 hr</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#BBB] mb-3">
              <Clock size={11} />
              <span>10:00 AM · Video call</span>
            </div>
            <button className="w-full h-8 rounded-full bg-[#111] text-white text-[12px] font-semibold cursor-pointer border-none hover:bg-[#333] transition-colors">
              Join now
            </button>
          </div>
        )}

        {/* Boost CTA */}
        <div className={`mt-4 mx-3 mb-2 ${!isOpen ? "flex justify-center" : ""}`}>
          {isOpen ? (
            <button className="w-full h-9 rounded-full border border-[#E0E0E0] bg-white text-[#111] text-[13px] font-semibold cursor-pointer hover:bg-[#F5F5F5] transition-colors flex items-center justify-center gap-2">
              <RocketLaunch size={14} weight="fill" className="text-[#888]" />
              Boost Profile
            </button>
          ) : (
            <button className="w-9 h-9 rounded-full border border-[#E0E0E0] bg-white text-[#888] cursor-pointer hover:bg-[#F5F5F5] transition-colors flex items-center justify-center">
              <RocketLaunch size={16} weight="fill" />
            </button>
          )}
        </div>

      </nav>

      {/* Theme toggle + Logout */}
      <div className="px-3 py-3 shrink-0 border-t border-[#EBEBEB] space-y-2">
        {isOpen ? (
          <div className="flex items-center gap-1 p-1 rounded-[10px] bg-[#F5F5F5]">
            {THEMES.map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setTheme(key)}
                title={label}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-[8px] text-[11px] font-semibold transition-all cursor-pointer border-none"
                style={{
                  background: theme === key ? "#fff" : "transparent",
                  color: theme === key ? "#111" : "#AAA",
                  boxShadow: theme === key ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                }}>
                <Icon size={13} weight={theme === key ? "fill" : "regular"} />
                {label}
              </button>
            ))}
          </div>
        ) : (
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light")}
            className="w-full flex items-center justify-center py-2 rounded-[10px] hover:bg-[#F5F5F5] transition-colors cursor-pointer border-none bg-transparent"
            title={`Theme: ${theme}`}>
            {theme === "dark" ? <Moon size={16} className="text-[#555]" /> : theme === "light" ? <Sun size={16} className="text-[#555]" /> : <Monitor size={16} className="text-[#555]" />}
          </button>
        )}

        {/* Logout */}
        {isOpen ? (
          <button
            onClick={() => { localStorage.clear(); window.location.href = "/"; }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[10px] text-[#EF4444] hover:bg-[#FEF2F2] transition-colors cursor-pointer border-none bg-transparent text-[13px] font-medium">
            <SignOut size={16} weight="regular" />
            Logout
          </button>
        ) : (
          <button
            onClick={() => { localStorage.clear(); window.location.href = "/"; }}
            className="w-full flex items-center justify-center py-2 rounded-[10px] hover:bg-[#FEF2F2] transition-colors cursor-pointer border-none bg-transparent"
            title="Logout">
            <SignOut size={16} className="text-[#EF4444]" />
          </button>
        )}
      </div>

    </aside>
  );
}

export default memo(Sidebar);
