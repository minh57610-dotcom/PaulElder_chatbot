import React from 'react';
import { ChatMessage } from '../types/paulElder';
import { X, Download, Copy, Check, FileText } from 'lucide-react';

interface ReflectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  currentLesson: string | null;
}

export const ReflectionModal: React.FC<ReflectionModalProps> = ({
  isOpen,
  onClose,
  messages,
  currentLesson,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const generateMarkdown = () => {
    const dateStr = new Date().toLocaleString('vi-VN');
    let md = `# Nhật Ký Tư Duy Phản Biện Paul-Elder\n\n`;
    md += `**Thời gian:** ${dateStr}\n`;
    if (currentLesson) {
      md += `**Bài học:** ${currentLesson}\n`;
    }
    md += `\n---\n\n`;

    messages.forEach((m) => {
      const sender = m.sender === 'ai' ? '🧑‍🏫 Chuyên gia' : '👤 Học sinh';
      md += `### ${sender} (${m.timestamp})\n`;
      md += `${m.text}\n\n`;
    });

    md += `\n---\n*Được tạo bởi Nền tảng Tư Duy Phản Biện & Tâm Lý Học Đường Paul-Elder*`;
    return md;
  };

  const handleDownload = () => {
    const md = generateMarkdown();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nhat-ky-tu-duy-paul-elder-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    const md = generateMarkdown();
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Nhật Ký & Chiêm Nghiệm Tư Duy</h3>
              <p className="text-[11px] text-slate-500">
                Toàn bộ nội dung trao đổi cùng chuyên gia tâm lý học đường
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1 font-mono text-xs bg-slate-50/70 text-slate-700 whitespace-pre-wrap leading-relaxed border-y border-slate-200/60 max-h-96">
          {generateMarkdown()}
        </div>

        <div className="p-3 border-t border-slate-100 bg-white flex items-center justify-between">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Đã sao chép' : 'Sao chép văn bản'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-slate-600 hover:text-slate-800 text-xs font-medium"
            >
              Đóng
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải file .md</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
