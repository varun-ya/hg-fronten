"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import TeacherEarningsSummary from "@/components/TeacherEarningsSummary";
import TeacherNextClass from "@/components/TeacherNextClass";
import TeacherTodaySchedule from "@/components/TeacherTodaySchedule";
import TeacherActivityFeed from "@/components/TeacherActivityFeed";
import TeacherWeeklyStats from "@/components/TeacherWeeklyStats";
import TeacherToDo from "@/components/TeacherToDo";
import TeacherMessages from "@/components/TeacherMessages";
import TeacherEarningsBreakdown from "@/components/TeacherEarningsBreakdown";

export default function TeacherDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full z-50 md:hidden">
            <Sidebar isOpen={true} setIsOpen={() => {}} />
          </div>
        </>
      )}
      
      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto">
        
        {/* Mobile Menu Button */}
        <div className="md:hidden fixed top-4 left-4 z-30">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 bg-white rounded-lg shadow-md border border-gray-200"
            aria-label="Toggle menu"
          >
            {mobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Header */}
        <div className="px-4 md:px-6 lg:px-8 py-4 md:py-6 mt-16 md:mt-0">
          <Header 
            title="Good morning, "
            titleAccent="Ayush"
            titleSuffix=""
            subtitle="Here's what's happening with your classes today"
            hideRightTools={false}
          />
        </div>

        {/* Dashboard Content */}
        <div className="px-4 md:px-6 lg:px-8 pb-8">
          <div className="max-w-[1400px] mx-auto">
            
            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column - 8 cols */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Earnings Summary */}
                <TeacherEarningsSummary />
                
                {/* Next Class */}
                <TeacherNextClass />
                
                {/* Today's Schedule */}
                <TeacherTodaySchedule />
                
              </div>

              {/* Right Column - 4 cols */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Activity Feed */}
                <TeacherActivityFeed />
                
                {/* Weekly Stats */}
                <TeacherWeeklyStats />
                
              </div>

            </div>

            {/* Second Row - Full Width Components */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              
              {/* To Do */}
              <TeacherToDo />
              
              {/* Messages */}
              <TeacherMessages />
              
              {/* Earnings Breakdown */}
              <TeacherEarningsBreakdown />
              
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
