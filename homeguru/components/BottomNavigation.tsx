"use client";
import { useState } from "react";
import { 
  Home, 
  Search, 
  Sparkles, 
  Calendar, 
  Newspaper, 
  MessageCircle 
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface NavItem {
  id: string;
  label: string;
  icon: any;
  path: string;
  isCenter?: boolean;
}

const navItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    path: "/dashboard"
  },
  {
    id: "search",
    label: "Search",
    icon: Search,
    path: "/search"
  },
  {
    id: "ai",
    label: "Guru AI",
    icon: Sparkles,
    path: "/ai-chat",
    isCenter: true
  },
  {
    id: "schedule",
    label: "Schedule",
    icon: Calendar,
    path: "/schedule"
  },
  {
    id: "feed",
    label: "Feed",
    icon: Newspaper,
    path: "/feed"
  },
  {
    id: "chat",
    label: "Chat",
    icon: MessageCircle,
    path: "/chat"
  }
];

export default function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = (path: string) => {
    router.push(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 safe-area-bottom">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.path)}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 ${
                  isActive ? 'scale-110' : 'scale-100'
                }`}
              >
                {item.isCenter ? (
                  // Special center button with Hoot mascot
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg transition-transform ${
                      isActive ? 'scale-110' : 'scale-100'
                    }`}>
                      <Icon 
                        size={24} 
                        className="text-white"
                        strokeWidth={2.5}
                      />
                    </div>
                    {/* Animated Hoot mascot would go here */}
                  </div>
                ) : (
                  <>
                    <Icon 
                      size={23} 
                      className={`transition-colors ${
                        isActive ? 'text-gray-900' : 'text-gray-400'
                      }`}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    <div className={`mt-1 transition-all duration-200 ${
                      isActive ? 'w-1 h-1 bg-gray-900 rounded-full' : 'w-0 h-0'
                    }`} />
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

// Add this to global CSS for safe area support
// .safe-area-bottom {
//   padding-bottom: env(safe-area-inset-bottom);
// }
