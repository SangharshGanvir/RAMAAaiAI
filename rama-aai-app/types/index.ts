export interface LearningProgress {
  lettersLearned: string[];
  wordsLearned: string[];
  storiesCompleted: string[];
  pronunciationScores: PronunciationResult[];
  totalStars: number;
  dailyStreak: number;
  lastActiveDate: string;
  badges: Badge[];
  currentLevel: LearningLevel;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: string;
}

export type LearningLevel = 'alphabet' | 'word' | 'sentence' | 'story';

export interface AvatarCustomization {
  hairStyle: 'bun' | 'braided' | 'short';
  sareeColor: string;
  glasses: boolean;
  voiceTone: 'warm' | 'gentle' | 'cheerful';
  backgroundTheme: 'garden' | 'library' | 'classroom' | 'nature';
}

export interface Lesson {
  id: string;
  title: string;
  topic: string;
  level: LearningLevel;
  objectives: string[];
  activities: string[];
  questions: string[];
}

export interface Story {
  id: string;
  title: string;
  content: string[];
  moral: string;
  question: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export type TeachingMode = 
  | 'alphabet'
  | 'vocabulary'
  | 'pronunciation'
  | 'storytelling'
  | 'general';

export interface PronunciationResult {
  word: string;
  spokenText: string;
  score: number;
  timestamp: Date;
}

export interface GameResult {
  gameType: string;
  score: number;
  starsEarned: number;
  completedAt: Date;
}
