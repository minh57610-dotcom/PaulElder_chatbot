import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { LessonSelector } from './components/LessonSelector';
import { ChatMessageItem } from './components/ChatMessageItem';
import { ChatInput } from './components/ChatInput';
import { PaulElderWheel } from './components/PaulElderWheel';
import { CuratedTopicsModal } from './components/CuratedTopicsModal';
import { ReflectionModal } from './components/ReflectionModal';
import { ChatMessage, LessonInfo } from './types/paulElder';
import { WELCOME_MESSAGE, LESSONS } from './data/lessons';
import { Brain, Sparkles, MessageCircleQuestion, Compass } from 'lucide-react';

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: WELCOME_MESSAGE,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      activeElements: ['purpose', 'question'],
      suggestedPrompts: [
        'Bài 1',
        'Bài 2',
        'Bài 3',
        'Bài 4',
        'Bài 5',
      ],
    },
  ]);

  const [currentLesson, setCurrentLesson] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [studentMood, setStudentMood] = useState('curious');
  const [activeElementIds, setActiveElementIds] = useState<string[]>(['purpose', 'question']);
  const [selectedLessonModal, setSelectedLessonModal] = useState<LessonInfo | null>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const triggerMilestoneConfetti = () => {
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch {
      // Ignore if confetti fails
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    // Detect if user is selecting a lesson explicitly
    const trimmed = text.trim();
    const lessonMatch = trimmed.match(/Bài\s*([1-5])/i);
    let updatedCurrentLesson = currentLesson;
    if (lessonMatch) {
      updatedCurrentLesson = `Bài ${lessonMatch[1]}`;
      setCurrentLesson(updatedCurrentLesson);
      triggerMilestoneConfetti();
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages,
          currentLesson: updatedCurrentLesson,
          studentMood: studentMood,
        }),
      });

      if (!response.ok) {
        throw new Error(`Máy chủ phản hồi với mã lỗi ${response.status}`);
      }

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.text || 'Thầy/cô đang lắng nghe em, em hãy chia sẻ tiếp nhé!',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        isWarning: data.isWarning,
        activeElements: data.activeElements || [],
      };

      if (data.activeElements && data.activeElements.length > 0) {
        setActiveElementIds(data.activeElements);
      }

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: unknown) {
      console.error('Error contacting chat endpoint:', err);
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        sender: 'ai',
        text: 'Có chút gián đoạn kết nối tới chuyên gia. Em hãy bấm nút thử lại bên dưới để gửi lại nhé.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        suggestedPrompts: [trimmed],
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectLesson = (lessonCode: string, promptText?: string) => {
    setCurrentLesson(lessonCode);
    const lessonData = LESSONS.find((l) => l.code === lessonCode);
    if (lessonData?.paulElderFocus) {
      setActiveElementIds(lessonData.paulElderFocus);
    }

    const textToSend = promptText || lessonCode;
    handleSendMessage(textToSend);
  };

  const handleReset = () => {
    setCurrentLesson(null);
    setActiveElementIds(['purpose', 'question']);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'ai',
        text: WELCOME_MESSAGE,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        activeElements: ['purpose', 'question'],
        suggestedPrompts: ['Bài 1', 'Bài 2', 'Bài 3', 'Bài 4', 'Bài 5'],
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Navigation */}
      <Header
        currentLesson={currentLesson}
        onReset={handleReset}
        onExportNotes={() => setIsExportOpen(true)}
        studentMood={studentMood}
        setStudentMood={setStudentMood}
        toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        isSidebarOpen={isSidebarOpen}
      />

      {/* 5 Lesson Roadmap Bar */}
      <LessonSelector
        currentLesson={currentLesson}
        onSelectLesson={handleSelectLesson}
        onOpenTopicsModal={(lesson) => setSelectedLessonModal(lesson)}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto relative overflow-hidden">
        {/* Chat / Interaction Stream */}
        <main className="flex-1 flex flex-col min-w-0 h-[calc(100vh-175px)] md:h-[calc(100vh-165px)]">
          {/* Messages scroll area */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-4">
            {/* Context Banner */}
            <div className="max-w-3xl mx-auto bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200/70 rounded-2xl p-3 sm:p-4 text-xs text-slate-700 shadow-2xs flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-white text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 shadow-2xs">
                <Compass className="w-4 h-4" />
              </div>
              <div className="flex-1 leading-relaxed">
                <span className="font-bold text-emerald-900 block text-xs">
                  Không gian rèn luyện tư duy phản biện Socratic:
                </span>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Chuyên gia sẽ dẫn dắt em lần lượt từng phần (1–2 yếu tố Paul-Elder tại một thời điểm) bằng những câu hỏi gợi mở, giúp em tự khai phóng tiềm năng suy nghĩ logic và đa chiều.
                </p>
              </div>
            </div>

            {/* Conversation Messages */}
            <div className="max-w-3xl mx-auto space-y-4">
              {messages.map((msg) => (
                <ChatMessageItem
                  key={msg.id}
                  message={msg}
                  onSelectPrompt={(prompt) => handleSendMessage(prompt)}
                />
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex gap-3 py-3 px-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs w-fit">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                    <Brain className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="flex items-center gap-1.5 px-2">
                    <span className="text-xs text-slate-500 font-medium">Chuyên gia đang lắng nghe & suy ngẫm...</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Sticky Input Bar */}
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        </main>

        {/* Paul-Elder Wheel & Reference Sidebar */}
        <PaulElderWheel
          activeElementIds={activeElementIds}
          onInsertPrompt={(prompt) => handleSendMessage(prompt)}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* Modals */}
      <CuratedTopicsModal
        lesson={selectedLessonModal}
        onClose={() => setSelectedLessonModal(null)}
        onSelectTopic={(prompt) => handleSendMessage(prompt)}
      />

      <ReflectionModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        messages={messages}
        currentLesson={currentLesson}
      />
    </div>
  );
}
