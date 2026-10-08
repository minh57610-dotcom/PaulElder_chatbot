import React, { useState } from 'react';
import { ChatMessage } from '../types/paulElder';
import {
  Brain,
  User,
  AlertTriangle,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { PAUL_ELDER_ELEMENTS } from '../data/lessons';

interface ChatMessageItemProps {
  message: ChatMessage;
  onSelectPrompt?: (prompt: string) => void;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  message,
  onSelectPrompt,
}) => {
  const isAI = message.sender === 'ai';
  const isWarning =
    message.isWarning ||
    message.text.trim() === 'Bạn đang đi sai hướng, vui lòng sử dụng ngôn từ đúng đắn.';

  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message.text);
    utterance.lang = 'vi-VN';
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Find active elements metadata
  const activeElementsMeta = (message.activeElements || [])
    .map((id) => PAUL_ELDER_ELEMENTS.find((elem) => elem.id === id))
    .filter(Boolean);

  // Parse simple markdown paragraphs & bold
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      // Check if header or list
      const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
      const cleanLine = isBullet ? line.trim().substring(2) : line;

      // Replace bold tags **text** with <strong>
      const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
      const renderedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="font-bold text-slate-900">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (isBullet) {
        return (
          <div key={idx} className="flex items-start gap-2 my-1 pl-1">
            <span className="text-emerald-500 mt-1 select-none">•</span>
            <div className="flex-1 leading-relaxed">{renderedParts}</div>
          </div>
        );
      }

      return (
        <p key={idx} className="leading-relaxed my-1">
          {renderedParts}
        </p>
      );
    });
  };

  return (
    <div
      className={`flex gap-3 py-3 px-3 sm:px-4 rounded-2xl transition-all ${
        isWarning
          ? 'bg-rose-50/90 border border-rose-200'
          : isAI
          ? 'bg-white border border-slate-200/90 shadow-2xs'
          : 'bg-emerald-50/60 border border-emerald-200/70 ml-6 sm:ml-12'
      }`}
    >
      {/* Avatar */}
      <div className="shrink-0">
        {isWarning ? (
          <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-xs">
            <ShieldAlert className="w-5 h-5" />
          </div>
        ) : isAI ? (
          <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center shadow-xs">
            <Brain className="w-5 h-5" />
          </div>
        ) : (
          <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-slate-600 to-slate-800 text-white flex items-center justify-center shadow-xs">
            <User className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Message Body */}
      <div className="flex-1 min-w-0">
        {/* Top meta */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-xs text-slate-800">
              {isWarning ? 'Quy Tắc An Toàn & Chuẩn Mực' : isAI ? 'Chuyên Gia Tâm Lý & Phản Biện' : 'Học Sinh'}
            </span>
            <span className="text-[10px] text-slate-400">{message.timestamp}</span>

            {/* Active Paul-Elder Elements Badges */}
            {activeElementsMeta.length > 0 && (
              <div className="flex items-center gap-1 flex-wrap">
                {activeElementsMeta.map((elem) => elem && (
                  <span
                    key={elem.id}
                    className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200"
                  >
                    <Sparkles className="w-2.5 h-2.5 text-emerald-500" />
                    {elem.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1">
            {isAI && !isWarning && 'speechSynthesis' in window && (
              <button
                onClick={handleSpeak}
                className="text-slate-400 hover:text-emerald-600 p-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                title={isSpeaking ? 'Dừng đọc' : 'Nghe thầy/cô đọc'}
              >
                {isSpeaking ? (
                  <VolumeX className="w-3.5 h-3.5 text-rose-500" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
              </button>
            )}
            <button
              onClick={handleCopy}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
              title="Sao chép"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Text Content */}
        {isWarning ? (
          <div className="space-y-2">
            <div className="text-rose-800 font-bold text-sm bg-white/80 p-3 rounded-xl border border-rose-200 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{message.text}</span>
            </div>
            <p className="text-xs text-rose-600/90 leading-relaxed italic">
              Không gian học tập luôn tôn trọng sự đa dạng, không chấp nhận ngôn từ thô tục, công kích cá nhân hay xúc phạm các nhóm yếu thế. Em hãy điều chỉnh lại cách diễn đạt để tiếp tục thảo luận nhé!
            </p>
          </div>
        ) : (
          <div className="text-slate-700 text-xs sm:text-sm leading-relaxed space-y-1">
            {renderFormattedText(message.text)}
          </div>
        )}

        {/* Suggested Quick Prompts if any */}
        {message.suggestedPrompts && message.suggestedPrompts.length > 0 && onSelectPrompt && (
          <div className="mt-3 pt-2.5 border-t border-slate-100">
            <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
              Gợi ý phản hồi để tiếp tục bài học:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {message.suggestedPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectPrompt(p)}
                  className="text-xs px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 transition-colors flex items-center gap-1 cursor-pointer text-left"
                >
                  <span>{p}</span>
                  <ArrowRight className="w-3 h-3 text-emerald-600 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
