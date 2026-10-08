import React from 'react';
import { LessonInfo } from '../types/paulElder';
import { X, Lightbulb, ArrowRight, BookOpen } from 'lucide-react';

interface CuratedTopicsModalProps {
  lesson: LessonInfo | null;
  onClose: () => void;
  onSelectTopic: (prompt: string) => void;
}

export const CuratedTopicsModal: React.FC<CuratedTopicsModalProps> = ({
  lesson,
  onClose,
  onSelectTopic,
}) => {
  if (!lesson) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-linear-to-r from-emerald-50 to-teal-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                {lesson.code}
              </span>
              <h3 className="font-bold text-slate-800 text-sm md:text-base leading-snug">
                {lesson.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-4">
          <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-100 text-xs text-emerald-900">
            <span className="font-semibold block mb-0.5">Mục tiêu bài học:</span>
            <p className="leading-relaxed">{lesson.objective}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              Chọn một tình huống thực tế để cùng phân tích:
            </h4>
            <div className="space-y-2.5">
              {lesson.recommendedTopics.map((topic, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    onSelectTopic(topic.prompt);
                    onClose();
                  }}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 bg-slate-50/50 hover:bg-emerald-50/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h5 className="font-bold text-xs text-slate-800 group-hover:text-emerald-800 transition-colors">
                      {topic.title}
                    </h5>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-1 shrink-0 mt-0.5" />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    {topic.description}
                  </p>
                  <div className="mt-2 text-[10px] text-emerald-700 font-medium bg-white px-2 py-1 rounded border border-emerald-100 inline-block">
                    👉 Bấm để bắt đầu đối thoại về chủ đề này
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-medium transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
