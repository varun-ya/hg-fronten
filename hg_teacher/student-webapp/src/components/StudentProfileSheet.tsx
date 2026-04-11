"use client";

import { useState } from "react";
import { X, ChatCircle, Play, FileText, Note, VideoCamera, CalendarBlank } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { StudentProfile } from "@/types/schedule";
import { MOCK_STUDENTS } from "@/types/chat";

interface StudentProfileSheetProps {
  profile: StudentProfile;
  onClose: () => void;
}

type TabType = 'sessions' | 'assignments' | 'recordings' | 'transcripts' | 'notes' | 'chat';

export default function StudentProfileSheet({ profile, onClose }: StudentProfileSheetProps) {
  const [activeTab, setActiveTab] = useState<TabType>('sessions');
  const [expandedSession, setExpandedSession] = useState<number | null>(null);
  const router = useRouter();

  const handleMessage = () => {
    const student = MOCK_STUDENTS.find(s => s.name === profile.name);
    router.push(`/students/${student?.id || '1'}`);
    onClose();
  };

  const tabs: { id: TabType; label: string }[] = [
    { id: 'sessions', label: 'Sessions' },
    { id: 'assignments', label: 'Assignments' },
    { id: 'recordings', label: 'Recordings' },
    { id: 'transcripts', label: 'Transcripts' },
    { id: 'notes', label: 'Notes' },
    { id: 'chat', label: 'Chat' }
  ];

  const allAssignments = profile.sessions.flatMap(s =>
    s.assignments.map(a => ({ assignment: a, session: s.topic, date: s.date }))
  );
  const allRecordings = profile.sessions.filter(s => s.recordingUrl);
  const allTranscripts = profile.sessions.filter(s => s.transcriptUrl);
  const allNotes = profile.sessions.flatMap(s =>
    s.sharedNotes.map(n => ({ note: n, session: s.topic, date: s.date }))
  );
  const allChatMessages = profile.sessions.flatMap(s =>
    s.chatMessages.map(m => ({ ...m, session: s.topic, date: s.date }))
  );

  const completionRate = profile.totalClasses > 0
    ? Math.round((profile.completedClasses / profile.totalClasses) * 100)
    : 0;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[100]" onClick={onClose} />
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[16px] z-[101] w-[640px] max-h-[82vh] border border-[#EBEBEB] flex overflow-hidden"
        style={{ boxShadow: '0 16px 48px -8px rgba(0,0,0,0.12)' }}
      >
        {/* Left — Profile strip */}
        <div className="w-[200px] bg-[#FAFAFA] border-r border-[#F0F0F0] flex flex-col flex-shrink-0">
          <div className="p-5 flex flex-col items-center text-center border-b border-[#F0F0F0]">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white mb-3"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            />
            <h3 className="text-[14px] font-semibold text-[#111] leading-tight">{profile.name}</h3>
            <p className="text-[11px] text-[#999] mt-1">{profile.subject}</p>
            {profile.isDemo && (
              <span className="text-[9px] font-bold text-[#F97316] bg-[#FFF7ED] px-2 py-0.5 rounded-full mt-2">DEMO</span>
            )}
          </div>

          {/* Quick stats */}
          {!profile.isDemo && (
            <div className="p-4 space-y-3 border-b border-[#F0F0F0]">
              {[
                { label: 'Total classes', value: String(profile.totalClasses) },
                { label: 'Completed', value: String(profile.completedClasses), color: '#10B981' },
                { label: 'Missed', value: String(profile.missedClasses), color: '#EF4444' },
                { label: 'Rate', value: `₹${profile.ratePerHour}/hr` },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[11px] text-[#AAA]">{s.label}</span>
                  <span className="text-[12px] font-semibold" style={{ color: s.color || '#111' }}>{s.value}</span>
                </div>
              ))}

              {/* Completion bar */}
              <div className="pt-1">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-[#CCC]">Completion</span>
                  <span className="text-[10px] font-medium text-[#AAA]">{completionRate}%</span>
                </div>
                <div className="w-full h-1 bg-[#EBEBEB] rounded-full overflow-hidden">
                  <div className="h-full bg-[#111] rounded-full transition-all" style={{ width: `${completionRate}%` }} />
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="p-4 space-y-2 mt-auto">
            <button onClick={handleMessage} className="w-full px-3 py-2 bg-[#555] hover:bg-[#444] rounded-lg text-[11px] font-medium text-white transition-colors cursor-pointer border-none flex items-center justify-center gap-1.5">
              <ChatCircle size={12} weight="fill" />
              Message
            </button>

          </div>
        </div>

        {/* Right — Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#F0F0F0] flex-shrink-0">
            <div className="flex gap-0">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-2.5 py-1.5 text-[11px] font-medium transition-all cursor-pointer border-none bg-transparent relative ${
                    activeTab === tab.id ? 'text-[#111]' : 'text-[#CCC] hover:text-[#888]'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[1.5px] bg-[#F97316] rounded-full" />
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg hover:bg-[#F5F5F5] transition-colors flex items-center justify-center text-[#DDD] hover:text-[#888] border-none bg-transparent cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            {activeTab === 'sessions' && (
              <div className="space-y-px">
                {profile.sessions.map((session, idx) => (
                  <div key={session.id}>
                    <button
                      onClick={() => setExpandedSession(expandedSession === session.id ? null : session.id)}
                      className="w-full px-0 py-3 flex items-center gap-3 hover:bg-transparent transition-colors text-left border-none bg-transparent cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] flex items-center justify-center shrink-0 group-hover:bg-[#F5F5F5] transition-colors">
                        <CalendarBlank size={13} className="text-[#CCC]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[12px] font-medium text-[#111] truncate">{session.topic}</h4>
                        <p className="text-[10px] text-[#CCC] mt-0.5">{session.date}</p>
                      </div>
                      <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                        session.status === 'attended' ? 'bg-[#ECFDF5] text-[#059669]' : 'bg-[#FEF2F2] text-[#DC2626]'
                      }`}>
                        {session.status === 'attended' ? 'DONE' : 'MISSED'}
                      </span>
                      <svg
                        width="10" height="10" fill="currentColor" viewBox="0 0 256 256"
                        className={`text-[#DDD] transition-transform shrink-0 ${expandedSession === session.id ? 'rotate-180' : ''}`}
                      >
                        <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
                      </svg>
                    </button>

                    {expandedSession === session.id && (
                      <div className="pl-11 pb-3 space-y-2">
                        {session.notes && (
                          <p className="text-[11px] text-[#666] leading-relaxed">{session.notes}</p>
                        )}
                        {session.assignments.length > 0 && (
                          <div>
                            <span className="text-[9px] font-semibold text-[#CCC] uppercase tracking-widest">Assignments</span>
                            {session.assignments.map((a, i) => (
                              <p key={i} className="text-[11px] text-[#666] mt-0.5">· {a}</p>
                            ))}
                          </div>
                        )}
                        {(session.recordingUrl || session.transcriptUrl) && (
                          <div className="flex gap-1.5 pt-0.5">
                            {session.recordingUrl && (
                              <button className="px-2 py-1 bg-[#FAFAFA] hover:bg-[#F5F5F5] rounded-md text-[9px] font-medium text-[#888] transition-colors cursor-pointer border border-[#F0F0F0] flex items-center gap-1">
                                <Play size={8} weight="fill" /> Recording
                              </button>
                            )}
                            {session.transcriptUrl && (
                              <button className="px-2 py-1 bg-[#FAFAFA] hover:bg-[#F5F5F5] rounded-md text-[9px] font-medium text-[#888] transition-colors cursor-pointer border border-[#F0F0F0] flex items-center gap-1">
                                <FileText size={8} /> Transcript
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {idx < profile.sessions.length - 1 && <div className="h-px bg-[#F5F5F5]" />}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'assignments' && (
              <div>
                {allAssignments.length === 0 ? <Empty /> : allAssignments.map((item, i) => (
                  <div key={i} className="py-3" style={{ borderBottom: i < allAssignments.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
                    <p className="text-[12px] text-[#111] font-medium">{item.assignment}</p>
                    <p className="text-[10px] text-[#CCC] mt-0.5">{item.session} · {item.date}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'recordings' && (
              <div>
                {allRecordings.length === 0 ? <Empty /> : allRecordings.map((s, i) => (
                  <div key={s.id} className="flex items-center gap-3 py-3" style={{ borderBottom: i < allRecordings.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
                    <div className="w-8 h-8 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] flex items-center justify-center shrink-0">
                      <VideoCamera size={13} className="text-[#CCC]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[12px] font-medium text-[#111] truncate">{s.topic}</h4>
                      <p className="text-[10px] text-[#CCC] mt-0.5">{s.date}</p>
                    </div>
                    <button className="px-2.5 py-1 bg-[#555] hover:bg-[#444] rounded-md text-[10px] font-medium text-white transition-colors cursor-pointer border-none flex items-center gap-1">
                      <Play size={8} weight="fill" /> Play
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'transcripts' && (
              <div>
                {allTranscripts.length === 0 ? <Empty /> : allTranscripts.map((s, i) => (
                  <div key={s.id} className="flex items-center gap-3 py-3" style={{ borderBottom: i < allTranscripts.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
                    <div className="w-8 h-8 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] flex items-center justify-center shrink-0">
                      <FileText size={13} className="text-[#CCC]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[12px] font-medium text-[#111] truncate">{s.topic}</h4>
                      <p className="text-[10px] text-[#CCC] mt-0.5">{s.date}</p>
                    </div>
                    <button className="px-2.5 py-1 rounded-md text-[10px] font-medium text-[#666] transition-colors cursor-pointer border border-[#E0E0E0] bg-white hover:bg-[#FAFAFA]">
                      View
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'notes' && (
              <div>
                {allNotes.length === 0 ? <Empty /> : allNotes.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-3 cursor-pointer" style={{ borderBottom: i < allNotes.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
                    <div className="w-8 h-8 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] flex items-center justify-center shrink-0">
                      <Note size={13} className="text-[#CCC]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[12px] font-medium text-[#111] truncate">{item.note}</h4>
                      <p className="text-[10px] text-[#CCC] mt-0.5">{item.session} · {item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'chat' && (
              <div className="space-y-2.5">
                {allChatMessages.length === 0 ? <Empty /> : allChatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'tutor' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] px-3 py-2 ${
                      msg.sender === 'tutor'
                        ? 'bg-[#111] text-white rounded-[10px] rounded-br-[3px]'
                        : 'bg-[#F5F5F5] text-[#111] rounded-[10px] rounded-bl-[3px]'
                    }`}>
                      <p className="text-[11px] leading-relaxed">{msg.message}</p>
                      <p className={`text-[9px] mt-0.5 ${msg.sender === 'tutor' ? 'text-white/30' : 'text-[#CCC]'}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function Empty() {
  return <div className="text-center py-10 text-[12px] text-[#DDD]">Nothing here yet</div>;
}
