import React from 'react';
import { Brain, Sparkles, BookOpen, RotateCcw, Download, ShieldCheck, Heart } from 'lucide-react';

interface HeaderProps {
  currentLesson: string | null;
  onReset: () => void;
  onExportNotes: () => void;
  studentMood: string;
  setStudentMood: (mood: string) => void;
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const MOODS = [
  { id: 'curious', label: 'Tò mò & Khám phá', emoji: '🧐' },
  { id: 'calm', label: 'Thư thái & Tập trung', emoji: '🌱' },
  { id: 'overwhelmed', label: 'Có chút áp lực / bối rối', emoji: '💭' },
  { id: 'debative', label: 'Hào hứng muốn phản biện', emoji: '🔥' },
];

export const Header: React.FC<HeaderProps> = ({
  currentLesson,
  onReset,
  onExportNotes,
  studentMood,
  setStudentMood,
  toggleSidebar,
  isSidebarOpen,
}) => {
  return (
    <header className="border-b border-emerald-100 bg-white/90 backdrop-blur-md sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Persona */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-600 flex items-center justify-center text-white shadow-md shadow-emerald-200">
            <Brain className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-slate-800 text-base md:text-lg tracking-tight">
                Tư Duy Phản Biện & Tâm Lý Học Đường
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Sparkles className="w-3 h-3 text-emerald-500" />
                Mô hình Paul-Elder
              </span>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <span>Đồng hành tâm lý</span>
              <span className="text-slate-300">•</span>
              <span>Dẫn dắt từng bước Socratic</span>
              {currentLesson && (
                <>
                  <span className="text-slate-300">•</span>
                  <span className="font-semibold text-emerald-600">{currentLesson}</span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Middle: Mood Selector */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80">
          <Heart className="w-3.5 h-3.5 text-rose-500" />
          <span className="text-xs text-slate-500 font-medium">Tâm thế lúc này:</span>
          <div className="flex items-center gap-1">
            {MOODS.map((m) => (
              <button
                key={m.id}
                onClick={() => setStudentMood(m.id)}
                title={m.label}
                className={`text-xs px-2 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  studentMood === m.id
                    ? 'bg-emerald-600 text-white font-medium shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <span>{m.emoji}</span>
                <span className="text-[11px]">{m.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSidebar}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              isSidebarOpen
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
            title="Mở bảng hướng dẫn mô hình Paul-Elder"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Khung Paul-Elder</span>
          </button>

          <button
            onClick={onExportNotes}
            className="px-2.5 py-1.5 rounded-xl text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center gap-1 transition-all cursor-pointer"
            title="Lưu lại toàn bộ nhật ký đối thoại và chiêm nghiệm"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden md:inline">Lưu nhật ký</span>
          </button>

          <button
            onClick={onReset}
            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all cursor-pointer"
            title="Khởi động lại cuộc trò chuyện mới"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
