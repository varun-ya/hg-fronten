"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Note, Notepad, FileText, Play, TextAa, ChatCircle, CalendarBlank, CheckCircle, XCircle, Download, Eye, CaretRight, Clock } from "@phosphor-icons/react";

interface PastSession {
  topic: string;
  date: string;
  attended: boolean;
  notes: string;
  sharedNotes: string[];
  assignments: string[];
  recordingLabel: string | null;
  transcript: string | null;
  classChat: Array<[string, string]>;
}

const MOCK_SESSION: PastSession = {
  topic: "Quadratic Equations - Advanced Problems",
  date: "Jun 28, 2024",
  attended: true,
  notes: "Today we covered advanced quadratic equation problems including:\n\n• Solving equations with complex coefficients\n• Word problems involving quadratic relationships\n• Graphing parabolas and finding vertex\n• Discriminant analysis for nature of roots\n\nHomework: Complete exercises 5.3 (problems 1-10) and practice the shortcut methods we discussed.",
  sharedNotes: ["Quadratic Formula Derivation.pdf", "Practice Problems Set.pdf"],
  assignments: ["Exercise 5.3 - Problems 1-10", "Word Problems Worksheet", "Graph Analysis Assignment"],
  recordingLabel: "45 min · 128 MB",
  transcript: "Full transcript available",
  classChat: [
    ["You", "Can you explain the discriminant again?"],
    ["Ayush Soni", "Sure! The discriminant is b²-4ac. It tells us about the nature of roots."],
    ["You", "Got it, thanks!"],
    ["Ayush Soni", "If discriminant > 0, we have 2 real roots. If = 0, one repeated root. If < 0, complex roots."],
  ],
};

const TABS = ["Summary", "Notes", "Assignments", "Media", "Chat"];

export default function ClassNotesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const session = MOCK_SESSION;
  const tutorName = "Ayush Soni";

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Main Content */}
      <main className="max-w-[900px] mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h2 className="text-[32px] leading-[1.2] text-[#1C1B1F] mb-4" style={{ fontWeight: 400, letterSpacing: "-0.5px" }}>
            {session.topic}
          </h2>
          
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2.5">
              <img
                src={`https://api.dicebear.com/7.x/notionists/svg?seed=${tutorName}`}
                alt={tutorName}
                className="w-10 h-10 rounded-full"
                style={{ border: "2px solid #E7E0EC" }}
              />
              <div>
                <p className="text-[14px] font-medium text-[#1C1B1F]">{tutorName}</p>
                <p className="text-[12px] text-[#79747E]">Tutor</p>
              </div>
            </div>
            
            <div className="h-8 w-px bg-[#E7E0EC]" />
            
            <div className="flex items-center gap-2">
              <CalendarBlank size={16} className="text-[#79747E]" />
              <span className="text-[14px] text-[#49454F]">{session.date}</span>
            </div>
            
            <div className="h-8 w-px bg-[#E7E0EC]" />
            
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-[#79747E]" />
              <span className="text-[14px] text-[#49454F]">45 min</span>
            </div>
          </div>

          {/* Meta chips */}
          <div className="flex flex-wrap gap-2.5">
            {session.assignments.length > 0 && <MetaChip icon={FileText} text={`${session.assignments.length} Assignments`} />}
            {session.sharedNotes.length > 0 && <MetaChip icon={Notepad} text={`${session.sharedNotes.length} Notes`} />}
            {session.recordingLabel && <MetaChip icon={Play} text="Recording Available" />}
            {session.transcript && <MetaChip icon={TextAa} text="Transcript" />}
            {session.classChat.length > 0 && <MetaChip icon={ChatCircle} text={`${session.classChat.length} Messages`} />}
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white border border-[#E7E0EC] rounded-[16px] mb-8 overflow-hidden">
          <div className="flex">
            {TABS.map((tab, i) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(i)}
                className={`flex-1 px-6 py-4 text-[14px] font-medium transition-all relative border-none cursor-pointer ${
                  activeTab === i 
                    ? "text-[#F97316] bg-[#FFF7ED]" 
                    : "text-[#79747E] bg-white hover:bg-[#FAFAFA]"
                }`}
                style={{ 
                  borderRight: i < TABS.length - 1 ? "1px solid #E7E0EC" : "none"
                }}
              >
                <div className="flex items-center justify-center gap-2">
                  {tab === "Summary" && <Note size={16} weight={activeTab === i ? "fill" : "regular"} />}
                  {tab === "Notes" && <Notepad size={16} weight={activeTab === i ? "fill" : "regular"} />}
                  {tab === "Assignments" && <FileText size={16} weight={activeTab === i ? "fill" : "regular"} />}
                  {tab === "Media" && <Play size={16} weight={activeTab === i ? "fill" : "regular"} />}
                  {tab === "Chat" && <ChatCircle size={16} weight={activeTab === i ? "fill" : "regular"} />}
                  <span>{tab}</span>
                </div>
                {activeTab === i && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#F97316]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="pb-16">
          {activeTab === 0 && <SummaryTab session={session} />}
          {activeTab === 1 && <NotesTab notes={session.sharedNotes} />}
          {activeTab === 2 && <AssignmentsTab items={session.assignments} />}
          {activeTab === 3 && <MediaTab session={session} />}
          {activeTab === 4 && <ChatTab msgs={session.classChat} />}
        </div>
      </main>
    </div>
  );
}

function MetaChip({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="px-3.5 py-2 bg-white border border-[#E7E0EC] rounded-full flex items-center gap-2 hover:border-[#F97316] hover:bg-[#FFF7ED] transition-all cursor-default">
      <Icon size={14} className="text-[#79747E]" />
      <span className="text-[13px] font-medium text-[#49454F]">{text}</span>
    </div>
  );
}

function Chip({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="px-3 py-1.5 bg-[#F5F5F5] border border-[#E7E0EC] rounded-lg flex items-center gap-1.5">
      <Icon size={12} className="text-[#49454F]" />
      <span className="text-[11px] font-medium text-[#1C1B1F]">{text}</span>
    </div>
  );
}

function SummaryTab({ session }: { session: PastSession }) {
  return (
    <div className="space-y-8">
      {/* Class Notes - Featured */}
      <div className="bg-white border border-[#E7E0EC] rounded-[20px] p-8 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] flex items-center justify-center">
            <Note size={18} weight="fill" className="text-[#F97316]" />
          </div>
          <div>
            <h3 className="text-[18px] font-medium text-[#1C1B1F]">Class Notes</h3>
            <p className="text-[12px] text-[#79747E]">Summary from today's session</p>
          </div>
        </div>
        <div className="prose prose-sm max-w-none">
          <p className="text-[15px] text-[#49454F] leading-[1.7] whitespace-pre-line">{session.notes}</p>
        </div>
      </div>

      {/* Assignments Section */}
      {session.assignments.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[20px] font-medium text-[#1C1B1F]">Assignments</h3>
            <span className="text-[13px] text-[#79747E]">{session.assignments.length} pending</span>
          </div>
          <div className="space-y-3">
            {session.assignments.map((a, i) => (
              <div key={i} className="bg-white border border-[#E7E0EC] rounded-[16px] p-5 hover:border-[#F97316] hover:shadow-sm transition-all cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#F5F5F5] flex items-center justify-center shrink-0 group-hover:bg-[#FFF7ED] transition-colors">
                    <span className="text-[16px] font-semibold text-[#1C1B1F] group-hover:text-[#F97316] transition-colors">{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-medium text-[#1C1B1F] mb-2 leading-snug">{a}</p>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex px-3 py-1 bg-[#FFF7ED] text-[#F97316] text-[12px] font-medium rounded-full">Pending</span>
                      <span className="text-[12px] text-[#79747E]">Due in 2 days</span>
                    </div>
                  </div>
                  <CaretRight size={20} className="text-[#CAC4D0] group-hover:text-[#F97316] transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Shared Notes Section */}
      {session.sharedNotes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[20px] font-medium text-[#1C1B1F]">Shared Notes</h3>
            <span className="text-[13px] text-[#79747E]">{session.sharedNotes.length} files</span>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {session.sharedNotes.map((n, i) => (
              <div key={i} className="bg-white border border-[#E7E0EC] rounded-[16px] p-5 hover:border-[#F97316] hover:shadow-sm transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#F5F5F5] flex items-center justify-center shrink-0 group-hover:bg-[#FFF7ED] transition-colors">
                    <Notepad size={20} weight="fill" className="text-[#79747E] group-hover:text-[#F97316] transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-medium text-[#1C1B1F] mb-1 truncate">{n}</p>
                    <p className="text-[12px] text-[#79747E]">PDF • 2.4 MB</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg hover:bg-[#F5F5F5] transition-colors border-none bg-transparent cursor-pointer">
                      <Eye size={18} className="text-[#79747E]" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-[#F5F5F5] transition-colors border-none bg-transparent cursor-pointer">
                      <Download size={18} className="text-[#79747E]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Media Section */}
      {(session.recordingLabel || session.transcript) && (
        <div>
          <h3 className="text-[20px] font-medium text-[#1C1B1F] mb-4">Media & Resources</h3>
          <div className="space-y-3">
            {session.recordingLabel && (
              <div className="bg-white border border-[#E7E0EC] rounded-[16px] p-5 hover:border-[#F97316] hover:shadow-sm transition-all cursor-pointer group">
                <div className="flex items-start gap-4">
                  {/* Icon with status indicator */}
                  <div className="relative shrink-0">
                    <div className="w-11 h-11 rounded-xl bg-[#FFF7ED] flex items-center justify-center group-hover:bg-[#FFF4EB] transition-colors">
                      <Play size={20} weight="fill" className="text-[#F97316] ml-0.5" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#16A34A] rounded-full border-2 border-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-[15px] font-medium text-[#1C1B1F] mb-1">Class Recording</p>
                        <div className="flex items-center gap-2 text-[12px] text-[#79747E]">
                          <span className="flex items-center gap-1">
                            <Clock size={11} weight="fill" />
                            45 min
                          </span>
                          <span>•</span>
                          <span>128 MB</span>
                          <span>•</span>
                          <span className="text-[#16A34A] font-medium">1080p HD</span>
                        </div>
                      </div>
                      <div className="px-2.5 py-1 rounded-full bg-[#D1FAE5] border border-[#86EFAC]">
                        <span className="text-[10px] font-semibold text-[#16A34A]">Available</span>
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="mb-3">
                      <div className="h-1.5 bg-[#F5F5F5] rounded-full overflow-hidden">
                        <div className="h-full w-[35%] bg-gradient-to-r from-[#F97316] to-[#EA580C] rounded-full" />
                      </div>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-[11px] text-[#79747E]">Last watched: 15:42</span>
                        <span className="text-[11px] font-medium text-[#1C1B1F]">35% complete</span>
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                      <button className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FFF7F0] text-[#F97316] text-[13px] font-medium hover:bg-[#FFEDE0] transition-all border-none cursor-pointer">
                        <Play size={14} weight="fill" />
                        Continue Watching
                      </button>
                      <button className="p-2.5 rounded-lg bg-[#F5F5F5] border border-[#E7E0EC] text-[#49454F] hover:bg-[#ECECEC] transition-colors border-none cursor-pointer">
                        <Download size={16} weight="bold" />
                      </button>
                    </div>
                  </div>
                  
                  <CaretRight size={20} className="text-[#CAC4D0] group-hover:text-[#F97316] transition-colors shrink-0" />
                </div>
              </div>
            )}
            {session.transcript && (
              <div className="bg-white border border-[#E7E0EC] rounded-[20px] p-6 hover:border-[#F97316] hover:shadow-lg transition-all group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F5F5F5] flex items-center justify-center shrink-0 group-hover:bg-[#FFF7ED] transition-colors">
                    <TextAa size={20} weight="fill" className="text-[#79747E] group-hover:text-[#F97316] transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[15px] font-medium text-[#1C1B1F] mb-1">AI Transcript</p>
                    <p className="text-[12px] text-[#79747E]">Searchable • Timestamped • Exportable</p>
                  </div>
                  <CaretRight size={20} className="text-[#CAC4D0] group-hover:text-[#F97316] transition-colors" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function NotesTab({ notes }: { notes: string[] }) {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-[24px] font-medium text-[#1C1B1F] mb-2">Shared Notes</h3>
        <p className="text-[14px] text-[#79747E]">Documents and materials shared by your tutor</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {notes.map((note, i) => (
          <div key={i} className="bg-white border border-[#E7E0EC] rounded-[20px] p-6 hover:border-[#F97316] hover:shadow-lg transition-all cursor-pointer group">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-[#F5F5F5] flex items-center justify-center shrink-0 group-hover:bg-[#FFF7ED] transition-colors">
                <Notepad size={24} weight="fill" className="text-[#79747E] group-hover:text-[#F97316] transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[16px] font-medium text-[#1C1B1F] mb-2 leading-snug">{note}</h4>
                <div className="flex items-center gap-4 text-[13px] text-[#79747E] mb-4">
                  <span>PDF Document</span>
                  <span>•</span>
                  <span>2.4 MB</span>
                  <span>•</span>
                  <span>Shared today</span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F97316] text-white text-[13px] font-medium hover:bg-[#EA580C] transition-all border-none cursor-pointer">
                    <Download size={16} weight="bold" />
                    Download
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E7E0EC] text-[#49454F] text-[13px] font-medium hover:bg-[#F5F5F5] transition-all bg-transparent cursor-pointer">
                    <Eye size={16} />
                    Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AssignmentsTab({ items }: { items: string[] }) {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-[24px] font-medium text-[#1C1B1F] mb-2">Assignments</h3>
        <p className="text-[14px] text-[#79747E]">{items.length} assignments pending completion</p>
      </div>
      
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="bg-white border border-[#E7E0EC] rounded-[20px] p-6 hover:border-[#F97316] hover:shadow-lg transition-all cursor-pointer group">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-[#F5F5F5] flex items-center justify-center shrink-0 group-hover:bg-[#FFF7ED] transition-colors">
                <span className="text-[18px] font-semibold text-[#1C1B1F] group-hover:text-[#F97316] transition-colors">{i + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[16px] font-medium text-[#1C1B1F] mb-3 leading-snug">{item}</h4>
                <div className="flex items-center gap-4 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF7ED] text-[#F97316] text-[12px] font-medium rounded-full">
                    <Clock size={14} weight="fill" />
                    Pending
                  </span>
                  <span className="text-[13px] text-[#79747E]">Due in 2 days</span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-[13px] font-medium text-[#F97316] hover:text-[#EA580C] transition-colors bg-transparent border-none cursor-pointer">
                    View Details
                  </button>
                  <span className="text-[#E7E0EC]">•</span>
                  <button className="text-[13px] font-medium text-[#49454F] hover:text-[#1C1B1F] transition-colors bg-transparent border-none cursor-pointer">
                    Mark as Done
                  </button>
                </div>
              </div>
              <CaretRight size={24} className="text-[#CAC4D0] group-hover:text-[#F97316] transition-colors shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MediaTab({ session }: { session: PastSession }) {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-[24px] font-medium text-[#1C1B1F] mb-2">Media & Resources</h3>
        <p className="text-[14px] text-[#79747E]">Recordings and transcripts from this session</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {session.recordingLabel && (
          <div className="relative overflow-hidden bg-gradient-to-br from-[#1C1B1F] via-[#2D2A33] to-[#1C1B1F] rounded-[20px] p-8 shadow-xl">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F97316] opacity-5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#F97316] opacity-5 rounded-full blur-3xl" />
            
            <div className="relative">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#F97316]/20 backdrop-blur-sm flex items-center justify-center border border-[#F97316]/30">
                    <Play size={20} weight="fill" className="text-[#F97316]" />
                  </div>
                  <div>
                    <p className="text-[16px] font-medium text-white mb-1">Class Recording</p>
                    <div className="flex items-center gap-3 text-[12px] text-white/60">
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} weight="fill" />
                        45 min
                      </span>
                      <span>•</span>
                      <span>128 MB</span>
                      <span>•</span>
                      <span>1080p HD</span>
                    </div>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-[#16A34A]/20 border border-[#16A34A]/30 backdrop-blur-sm">
                  <span className="text-[11px] font-medium text-[#86EFAC]">Available</span>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mb-6">
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[35%] bg-gradient-to-r from-[#F97316] to-[#EA580C] rounded-full" />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[11px] text-white/50">Last watched: 15:42</span>
                  <span className="text-[11px] text-white/50">35% complete</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#F97316] text-white text-[13px] font-medium hover:bg-[#EA580C] transition-all shadow-lg hover:shadow-xl border-none cursor-pointer">
                  <Play size={16} weight="fill" />
                  Continue Watching
                </button>
                <button className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[13px] font-medium hover:bg-white/20 transition-all border-none cursor-pointer">
                  <Download size={16} weight="bold" />
                </button>
              </div>
            </div>
          </div>
        )}
        
        {session.transcript && (
          <div className="bg-white border border-[#E7E0EC] rounded-[20px] p-6 hover:border-[#F97316] hover:shadow-lg transition-all group">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#F5F5F5] flex items-center justify-center shrink-0 group-hover:bg-[#FFF7ED] transition-colors">
                <TextAa size={20} weight="fill" className="text-[#79747E] group-hover:text-[#F97316] transition-colors" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-[15px] font-medium text-[#1C1B1F] mb-1">AI-Generated Transcript</p>
                    <p className="text-[12px] text-[#79747E]">Searchable • Timestamped • Exportable</p>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-[#DBEAFE] border border-[#93C5FD]">
                    <span className="text-[10px] font-semibold text-[#1D4ED8]">AI</span>
                  </div>
                </div>
                
                {/* Preview snippet */}
                <div className="bg-[#F9FAFB] border border-[#E7E0EC] rounded-xl p-4 mb-4">
                  <p className="text-[13px] text-[#49454F] leading-relaxed line-clamp-3">
                    "Today we covered advanced quadratic equation problems including solving equations with complex coefficients, word problems involving quadratic relationships..."
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1C1B1F] text-white text-[12px] font-medium hover:bg-[#49454F] transition-colors border-none cursor-pointer">
                    <Eye size={14} />
                    Read Full Transcript
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E7E0EC] text-[#49454F] text-[12px] font-medium hover:bg-[#F5F5F5] transition-colors bg-transparent cursor-pointer">
                    <Download size={14} />
                    Export
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ChatTab({ msgs }: { msgs: Array<[string, string]> }) {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-[24px] font-medium text-[#1C1B1F] mb-2">Class Chat</h3>
        <p className="text-[14px] text-[#79747E]">Conversation during the session</p>
      </div>
      
      <div className="bg-white border border-[#E7E0EC] rounded-[24px] p-8">
        <div className="space-y-6">
          {msgs.map((msg, i) => {
            const isYou = msg[0] === "You";
            return (
              <div key={i} className={`flex gap-4 ${isYou ? "flex-row-reverse" : "flex-row"}`}>
                <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center" style={{
                  background: isYou ? "linear-gradient(135deg, #F97316 0%, #EA580C 100%)" : "#F5F5F5"
                }}>
                  <span className="text-[13px] font-semibold" style={{ color: isYou ? "white" : "#79747E" }}>
                    {msg[0][0]}
                  </span>
                </div>
                <div className={`flex-1 max-w-[70%] ${isYou ? "items-end" : "items-start"} flex flex-col`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[12px] font-medium ${isYou ? "text-[#F97316]" : "text-[#49454F]"}`}>
                      {msg[0]}
                    </span>
                    <span className="text-[11px] text-[#CAC4D0]">•</span>
                    <span className="text-[11px] text-[#CAC4D0]">2:30 PM</span>
                  </div>
                  <div className={`px-5 py-3.5 rounded-2xl ${isYou ? "rounded-tr-sm" : "rounded-tl-sm"}`} style={{
                    background: isYou ? "linear-gradient(135deg, #F97316 0%, #EA580C 100%)" : "#F5F5F5",
                    color: isYou ? "white" : "#1C1B1F"
                  }}>
                    <p className="text-[15px] leading-[1.6]">{msg[1]}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


