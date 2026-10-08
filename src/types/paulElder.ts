export interface PaulElderElement {
  id: string;
  name: string;
  englishName: string;
  color: string;
  iconName: string;
  description: string;
  guideQuestions: string[];
  example: string;
}

export interface IntellectualStandard {
  id: string;
  name: string;
  englishName: string;
  question: string;
  description: string;
}

export interface LessonInfo {
  id: number;
  code: string;
  title: string;
  subtitle: string;
  objective: string;
  paulElderFocus: string[];
  recommendedTopics: {
    title: string;
    description: string;
    prompt: string;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  isWarning?: boolean;
  activeElements?: string[];
  suggestedPrompts?: string[];
}
