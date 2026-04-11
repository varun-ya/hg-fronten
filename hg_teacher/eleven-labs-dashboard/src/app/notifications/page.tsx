"use client";

import { useState } from "react";
import { Video, CurrencyInr, Star, Calendar, Bell, Circle, Check, ChatCircle, Users, List } from "@phosphor-icons/react";
import { useSidebar } from "@/context/SidebarContext";

// Mock data - matching the app's notification types
const NOTIFICATIONS = [
  { id: 1, type: "class_reminder", title: "Class starting soon", message: "Your session with Meera Iyer starts in 10 minutes", time: "10m ago", read: false },
  { id: 2, type: "message", title: "New message from Arjun Patel", message: "Can we reschedule tomorrow's class?", time: "30m ago", read: false },
  { id: 3, type: "payment", title: "Payment received", message: "₹800 received from Priya Sharma for Physics session", time: "2h ago", read: false },
  { id: 4, type: "request", title: "New demo request", message: "Amit Desai wants to book a Mathematics demo session", time: "5h ago", read: true },
  { id: 5, type: "class_reminder", title: "Class completed", message: "Your session with Kavya Singh has been completed", time: "1d ago", read: true },
  { id: 6, type: "message", title: "New message from Rohan Gupta", message: "Doubt in organic chemistry reaction", time: "1d ago", read: true },
  { id: 7, type: "payment", title: "Payment received", message: "₹1200 received from Sneha Kapoor for JEE session", time: "2d ago", read: true },
  { id: 8, type: "request", title: "Demo request accepted", message: "Rahul Joshi accepted your demo session proposal", time: "2d ago", read: true },
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const { toggle, isMobile } = useSidebar();

  const filteredNotifications = filter === "all" 
    ? notifications 
    : notifications.filter(n => !n.read);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "class_reminder": return <Video size={14} className="text-[#888]" />;
      case "payment": return <CurrencyInr size={14} className="text-[#888]" />;
      case "message": return <ChatCircle size={14} className="text-[#888]" />;
      case "request": return <Users size={14} className="text-[#888]" />;
      default: return <Bell size={14} className="text-[#888]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#FAFAFA] border-b border-[#EBEBEB] px-5 py-2.5">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {isMobile && (
              <button
                onClick={toggle}
                className="p-2 hover:bg-white rounded-lg transition-colors cursor-pointer border-none bg-transparent lg:hidden"
              >
                <List size={20} className="text-[#888]" />
              </button>
            )}
            <span className="text-[17px] font-medium text-[#111]">Notifications</span>
            {unreadCount > 0 && (
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#FFF7ED] text-[10px] font-medium text-[#F97316] border border-[#F97316]/20">
                <Circle size={6} weight="fill" className="text-[#F97316]" />
                {unreadCount} new
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#EBEBEB] text-[12px] font-medium text-[#888] hover:text-[#111] hover:bg-white transition-colors cursor-pointer bg-transparent"
            >
              <Check size={14} />
              Mark all read
            </button>
          )}
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-[#EBEBEB]">
        <div className="max-w-[1100px] mx-auto px-5">
          <div className="flex gap-6">
            {[
              { id: "all", label: "All" },
              { id: "unread", label: "Unread" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`py-3 text-[13px] relative transition-all cursor-pointer border-none bg-transparent ${
                  filter === tab.id
                    ? "font-medium text-[#111]"
                    : "font-normal text-[#888] hover:text-[#555]"
                }`}
              >
                {tab.label}
                {tab.id === "unread" && unreadCount > 0 && (
                  <span className="ml-2 px-1.5 py-0.5 rounded-full bg-[#F97316] text-white text-[10px] font-medium">
                    {unreadCount}
                  </span>
                )}
                {filter === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#111] rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-w-[1100px] mx-auto px-5 py-6">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 rounded-full bg-[#FAFAFA] border border-[#EBEBEB] flex items-center justify-center mb-4">
              <Bell size={24} className="text-[#CCC]" />
            </div>
            <p className="text-[14px] font-medium text-[#888]">No notifications</p>
            <p className="text-[12px] text-[#CCC] mt-1">You're all caught up!</p>
          </div>
        ) : (
          <div className="max-w-[700px] bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
            {filteredNotifications.map((notif, index) => (
              <div
                key={notif.id}
                onClick={() => !notif.read && markAsRead(notif.id)}
                className={`flex items-start gap-4 px-5 py-4 transition-all cursor-pointer ${
                  notif.read
                    ? "hover:bg-[#FAFAFA]"
                    : "bg-[#FAFAFA]/30 hover:bg-[#FAFAFA]/50"
                } ${index < filteredNotifications.length - 1 ? "border-b border-[#F5F5F5]" : ""}`}
              >
                {/* Icon */}
                <div className="w-7 h-7 rounded-lg bg-[#FAFAFA] flex items-center justify-center flex-shrink-0">
                  {getIcon(notif.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className={`text-[14px] leading-tight ${
                      notif.read ? "font-normal text-[#555]" : "font-medium text-[#111]"
                    }`}>
                      {notif.title}
                    </h3>
                    {!notif.read && (
                      <div className="w-2 h-2 rounded-full bg-[#F97316] flex-shrink-0 mt-1.5" />
                    )}
                  </div>
                  <p className={`text-[13px] leading-relaxed mb-2 ${
                    notif.read ? "text-[#AAA]" : "text-[#666]"
                  }`}>
                    {notif.message}
                  </p>
                  <p className="text-[11px] text-[#CCC]">{notif.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
