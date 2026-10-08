import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Sparkles, CornerDownLeft, XCircle } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

const QUICK_SUGGESTIONS = [
  'Bài 1',
  'Bài 2',
  'Bài 3',
  'Bài 4',
  'Bài 5',
  'Em đồng ý một phần, nhưng còn băn khoăn về giả định ngầm...',
  'Nếu nhìn từ góc độ khác thì sao ạ?',
  'Làm sao để đặt câu hỏi sâu hơn cho vấn đề này?'
];

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  disabled = false,
}) => {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check speech recognition support
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'vi-VN';

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const handleToggleRecord = () => {
    if (!recognitionRef.current) {
      alert('Trình duyệt của bạn chưa hỗ trợ nhận diện giọng nói tiếng Việt.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error(err);
        setIsRecording(false);
      }
    }
  };

  const handleSend = () => {
    if (!input.trim() || isLoading || disabled) return;
    onSendMessage(input.trim());
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 180)}px`;
  };

  return (
    <div className="border-t border-slate-200 bg-white/95 backdrop-blur-md p-3 sm:p-4 sticky bottom-0 z-10 shadow-lg">
      <div className="max-w-4xl mx-auto space-y-2">
        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Nhanh:
          </span>
          {QUICK_SUGGESTIONS.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setInput(chip);
                textareaRef.current?.focus();
              }}
              className="shrink-0 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 transition-colors cursor-pointer text-xs"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Text Input Container */}
        <div className="relative rounded-2xl border border-slate-300 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 bg-white transition-all shadow-xs">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={handleInputResize}
            onKeyDown={handleKeyDown}
            disabled={disabled || isLoading}
            placeholder={
              isRecording
                ? 'Đang lắng nghe giọng nói của em...'
                : 'Nhập câu hỏi, suy nghĩ, phản biện hoặc nhập "Bài 1", "Bài 2"...'
            }
            className="w-full resize-none px-4 pt-3 pb-12 sm:pb-3 sm:pr-28 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none max-h-44 min-h-[44px]"
          />

          {/* Action buttons inside input */}
          <div className="absolute right-2 bottom-2 flex items-center gap-1.5">
            {input.trim() && (
              <button
                type="button"
                onClick={() => setInput('')}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                title="Xóa văn bản"
              >
                <XCircle className="w-4 h-4" />
              </button>
            )}

            {/* Voice Dictation Button */}
            <button
              type="button"
              onClick={handleToggleRecord}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isRecording
                  ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-200'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
              }`}
              title={isRecording ? 'Dừng thu âm' : 'Nhập bằng giọng nói (Tiếng Việt)'}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Send Button */}
            <button
              type="button"
              onClick={handleSend}
              disabled={!input.trim() || isLoading || disabled}
              className={`px-3 py-2 rounded-xl font-medium text-xs flex items-center gap-1 transition-all cursor-pointer ${
                input.trim() && !isLoading && !disabled
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs shadow-emerald-200'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
              title="Gửi (Enter)"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Gửi</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span>Nhấn <strong>Enter</strong> để gửi, <strong>Shift + Enter</strong> để xuống dòng.</span>
          <span>{input.length} ký tự</span>
        </div>
      </div>
    </div>
  );
};
