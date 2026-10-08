import React, { useState } from 'react';
import { PAUL_ELDER_ELEMENTS, INTELLECTUAL_STANDARDS } from '../data/lessons';
import { PaulElderElement } from '../types/paulElder';
import {
  Target,
  HelpCircle,
  Database,
  BookOpen,
  EyeOff,
  Compass,
  GitFork,
  Sparkles,
  CheckCircle2,
  HelpCircle as HelpIcon,
  ChevronDown,
  ChevronUp,
  Send,
  ShieldCheck,
  Award
} from 'lucide-react';

interface PaulElderWheelProps {
  activeElementIds: string[];
  onInsertPrompt: (promptText: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Target,
  HelpCircle,
  Database,
  BookOpen,
  EyeOff,
  Compass,
  GitFork,
  Sparkles,
};

export const PaulElderWheel: React.FC<PaulElderWheelProps> = ({
  activeElementIds,
  onInsertPrompt,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'elements' | 'standards' | 'counterGuide'>('elements');
  const [expandedElement, setExpandedElement] = useState<string | null>('purpose');
  const [checkedStandards, setCheckedStandards] = useState<Record<string, boolean>>({});

  const toggleStandard = (id: string) => {
    setCheckedStandards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!isOpen) return null;

  return (
    <aside className="w-full lg:w-96 bg-white border-l border-slate-200 flex flex-col h-[calc(100vh-65px)] sticky top-[65px] z-20 shadow-lg lg:shadow-none overflow-hidden transition-all duration-300">
      {/* Header with Tabs */}
      <div className="p-3 border-b border-slate-200 bg-slate-50/80">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
              PE
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Khung Tư Duy Paul-Elder
              </h3>
              <p className="text-[10px] text-slate-500">Bộ công cụ bóc tách vấn đề toàn diện</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xs px-2 py-1 rounded bg-white border border-slate-200 cursor-pointer"
          >
            Đóng
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-lg bg-slate-200/70 p-1 text-xs font-medium">
          <button
            onClick={() => setActiveTab('elements')}
            className={`flex-1 py-1 px-2 rounded-md transition-all text-center cursor-pointer ${
              activeTab === 'elements'
                ? 'bg-white text-emerald-800 font-semibold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            8 Yếu tố tư duy
          </button>
          <button
            onClick={() => setActiveTab('standards')}
            className={`flex-1 py-1 px-2 rounded-md transition-all text-center cursor-pointer ${
              activeTab === 'standards'
                ? 'bg-white text-emerald-800 font-semibold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            9 Tiêu chuẩn trí tuệ
          </button>
          <button
            onClick={() => setActiveTab('counterGuide')}
            className={`flex-1 py-1 px-2 rounded-md transition-all text-center cursor-pointer ${
              activeTab === 'counterGuide'
                ? 'bg-white text-emerald-800 font-semibold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            5 Bước phản biện
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {/* TAB 1: 8 Elements */}
        {activeTab === 'elements' && (
          <div className="space-y-2">
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-2.5 text-[11px] text-emerald-900 leading-relaxed">
              💡 <strong>Lời khuyên của chuyên gia:</strong> Đừng vội kết luận! Hãy cùng chuyên gia rà soát từng thành tố bên dưới để tìm ra các góc khuất tư duy.
            </div>

            {PAUL_ELDER_ELEMENTS.map((elem, idx) => {
              const Icon = ICON_MAP[elem.iconName] || HelpIcon;
              const isHighlighted = activeElementIds.includes(elem.id);
              const isExpanded = expandedElement === elem.id;

              return (
                <div
                  key={elem.id}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    isHighlighted
                      ? 'border-emerald-500 bg-emerald-50/40 shadow-xs ring-1 ring-emerald-400'
                      : isExpanded
                      ? 'border-slate-300 bg-white shadow-xs'
                      : 'border-slate-200 bg-white/70 hover:bg-white'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedElement(isExpanded ? null : elem.id)}
                    className="w-full p-2.5 text-left flex items-center justify-between gap-2 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0 bg-linear-to-tr ${elem.color}`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-800 truncate">
                            {idx + 1}. {elem.name}
                          </span>
                          {isHighlighted && (
                            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-500 text-white animate-pulse">
                              Đang bàn
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 block truncate">
                          {elem.englishName}
                        </span>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-3 pb-3 pt-1 border-t border-slate-100 text-xs space-y-2 bg-slate-50/50">
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        {elem.description}
                      </p>

                      <div className="bg-white p-2 rounded-lg border border-slate-200 text-[11px]">
                        <span className="font-semibold text-slate-700 block mb-1">
                          Câu hỏi khơi gợi:
                        </span>
                        <ul className="space-y-1 text-slate-600 list-disc list-inside">
                          {elem.guideQuestions.map((q, qIdx) => (
                            <li key={qIdx} className="leading-snug">
                              {q}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="text-[10px] text-slate-500 italic bg-amber-50/80 p-2 rounded border border-amber-200/60">
                        {elem.example}
                      </div>

                      <button
                        onClick={() =>
                          onInsertPrompt(
                            `Thầy/cô ơi, em muốn chúng ta cùng mổ xẻ kĩ hơn về yếu tố "${elem.name}" (${elem.englishName}) trong vấn đề này ạ.`
                          )
                        }
                        className="w-full mt-1 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Send className="w-3 h-3" />
                        Áp dụng yếu tố này vào đối thoại
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: 9 Standards */}
        {activeTab === 'standards' && (
          <div className="space-y-2">
            <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-2.5 text-[11px] text-blue-900 leading-relaxed">
              🎯 <strong>9 Tiêu chuẩn trí tuệ:</strong> Hãy dùng bảng kiểm này để tự đánh giá câu trả lời hoặc lập luận của chính mình và đối phương.
            </div>

            <div className="space-y-2">
              {INTELLECTUAL_STANDARDS.map((std, idx) => {
                const isChecked = !!checkedStandards[std.id];
                return (
                  <div
                    key={std.id}
                    onClick={() => toggleStandard(std.id)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-50/80 border-emerald-400 shadow-2xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5">
                        <CheckCircle2
                          className={`w-4 h-4 transition-colors ${
                            isChecked ? 'text-emerald-600 fill-emerald-100' : 'text-slate-300'
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800">
                            {idx + 1}. {std.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {std.englishName}
                          </span>
                        </div>
                        <p className="text-[11px] font-medium text-emerald-800 mt-0.5 leading-snug">
                          &ldquo;{std.question}&rdquo;
                        </p>
                        <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                          {std.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => {
                const checkedNames = INTELLECTUAL_STANDARDS.filter((s) => checkedStandards[s.id]).map(
                  (s) => s.name
                );
                if (checkedNames.length > 0) {
                  onInsertPrompt(
                    `Em muốn tự kiểm tra lập luận của mình theo các tiêu chuẩn trí tuệ: ${checkedNames.join(
                      ', '
                    )}. Thầy/cô thấy lập luận của em đã đạt được các chuẩn này chưa ạ?`
                  );
                } else {
                  onInsertPrompt(
                    'Nhờ thầy/cô đánh giá giúp em lập luận trên theo 9 tiêu chuẩn trí tuệ Paul-Elder (đặc biệt là tính Logic, Chiều sâu và Tính rõ ràng) ạ.'
                  );
                }
              }}
              className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Award className="w-3.5 h-3.5" />
              Yêu cầu đánh giá theo tiêu chuẩn trí tuệ
            </button>
          </div>
        )}

        {/* TAB 3: Counter-argument Guide (Bài 4) */}
        {activeTab === 'counterGuide' && (
          <div className="space-y-2.5">
            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 text-[11px] text-amber-900 leading-relaxed">
              ⚖️ <strong>Cẩm nang phản biện 5 bước văn minh:</strong> Phản biện không phải là cãi cọ hay hạ bệ, mà là cùng nhau tìm kiếm chân lý và mở rộng sự thật.
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl border border-slate-200 bg-white">
                <span className="font-bold text-emerald-700 block text-[11px] mb-1">
                  Bước 1: Lắng nghe & Phản ánh (Paraphrase)
                </span>
                <p className="text-slate-600 text-[11px]">
                  Tóm tắt lại quan điểm của đối phương một cách trung thực nhất để chứng minh mình đã lắng nghe thấu đáo (tránh lỗi ngụy biện bù nhìn rơm).
                </p>
              </div>

              <div className="p-2.5 rounded-xl border border-slate-200 bg-white">
                <span className="font-bold text-emerald-700 block text-[11px] mb-1">
                  Bước 2: Tìm điểm đồng thuận (Find Common Ground)
                </span>
                <p className="text-slate-600 text-[11px]">
                  Chỉ ra những khía cạnh hợp lý mà mình đồng ý với đối phương để tạo bầu không khí tôn trọng và xây dựng.
                </p>
              </div>

              <div className="p-2.5 rounded-xl border border-slate-200 bg-white">
                <span className="font-bold text-emerald-700 block text-[11px] mb-1">
                  Bước 3: Chỉ ra giả định mong manh hoặc giới hạn logic
                </span>
                <p className="text-slate-600 text-[11px]">
                  Bóc tách xem luận điểm của đối phương đang dựa trên giả định ngầm nào, và trong trường hợp nào thì giả định đó không còn đúng nữa.
                </p>
              </div>

              <div className="p-2.5 rounded-xl border border-slate-200 bg-white">
                <span className="font-bold text-emerald-700 block text-[11px] mb-1">
                  Bước 4: Đưa ra bằng chứng & góc nhìn mới
                </span>
                <p className="text-slate-600 text-[11px]">
                  Cung cấp các dữ liệu thực tế, nghiên cứu hoặc góc nhìn đa chiều mà lập luận trước đó chưa tính đến.
                </p>
              </div>

              <div className="p-2.5 rounded-xl border border-slate-200 bg-white">
                <span className="font-bold text-emerald-700 block text-[11px] mb-1">
                  Bước 5: Đề xuất hướng đi chung & Mời thảo luận tiếp
                </span>
                <p className="text-slate-600 text-[11px]">
                  Kết thúc bằng một câu hỏi gợi mở để cả hai cùng hoàn thiện góc nhìn, chứ không áp đặt kết luận.
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                onInsertPrompt(
                  'Bài 4: Em muốn cùng thầy/cô rèn luyện cấu trúc phản biện 5 bước cho một vấn đề gây tranh cãi ạ.'
                )
              }
              className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              Bắt đầu thực hành Bài 4 ngay
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
