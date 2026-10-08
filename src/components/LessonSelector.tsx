import React from 'react';
import { LESSONS } from '../data/lessons';
import { Target, HelpCircle, Layers, Swords, MessageSquareHeart, ChevronRight, Lightbulb } from 'lucide-react';
import { LessonInfo } from '../types/paulElder';

interface LessonSelectorProps {
  currentLesson: string | null;
  onSelectLesson: (lessonCode: string, promptText?: string) => void;
  onOpenTopicsModal: (lesson: LessonInfo) => void;
}

const LESSON_ICONS = [Target, HelpCircle, Layers, Swords, MessageSquareHeart];

export const LessonSelector: React.FC<LessonSelectorProps> = ({
  currentLesson,
  onSelectLesson,
  onOpenTopicsModal,
}) => {
  return (
    <div className="w-full bg-linear-to-r from-emerald-50/70 via-teal-50/40 to-slate-50 border-b border-emerald-100/80 px-4 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              5 Lộ trình rèn luyện tư duy phản biện:
            </span>
            <span className="text-[11px] text-slate-500 hidden md:inline">
              (Nhấn vào bài để bắt đầu đối thoại có hướng dẫn từng bước)
            </span>
          </div>
        </div>

        {/* 5 Lesson Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {LESSONS.map((lesson, idx) => {
            const Icon = LESSON_ICONS[idx % LESSON_ICONS.length];
            const isActive = currentLesson === lesson.code;

            return (
              <div
                key={lesson.id}
                className={`relative group rounded-xl p-3 border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                    : 'bg-white/80 hover:bg-white border-slate-200/90 hover:border-emerald-300 shadow-2xs hover:shadow-xs'
                }`}
                onClick={() => onSelectLesson(lesson.code)}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1 ${
                        isActive
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {lesson.code}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenTopicsModal(lesson);
                      }}
                      className="text-slate-400 hover:text-amber-600 p-1 rounded-md hover:bg-amber-50 transition-colors"
                      title="Xem các đề tài mẫu & gợi ý"
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-800 line-clamp-2 mb-1 group-hover:text-emerald-700 transition-colors leading-snug">
                    {lesson.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {lesson.subtitle}
                  </p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 group-hover:text-emerald-600 font-medium flex items-center">
                    Bắt đầu bài <ChevronRight className="w-3 h-3 ml-0.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                    {lesson.recommendedTopics.length} gợi ý
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
