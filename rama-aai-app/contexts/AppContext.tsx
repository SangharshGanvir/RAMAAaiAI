'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LearningProgress, AvatarCustomization, ConversationMessage } from '@/types';
import { getProgress, saveProgress, updateDailyStreak } from '@/progress/progressTracker';
import { getAvatarCustomization } from '@/avatar/avatarManager';

interface AppContextType {
  progress: LearningProgress;
  avatar: AvatarCustomization;
  conversationHistory: ConversationMessage[];
  updateProgress: (progress: LearningProgress) => void;
  updateAvatar: (avatar: AvatarCustomization) => void;
  addMessage: (message: ConversationMessage) => void;
  clearConversation: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<LearningProgress>(getProgress());
  const [avatar, setAvatar] = useState<AvatarCustomization>(getAvatarCustomization());
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);

  useEffect(() => {
    updateDailyStreak();
  }, []);

  const updateProgress = (newProgress: LearningProgress) => {
    setProgress(newProgress);
    saveProgress(newProgress);
  };

  const updateAvatar = (newAvatar: AvatarCustomization) => {
    setAvatar(newAvatar);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ramaAai_avatar', JSON.stringify(newAvatar));
    }
  };

  const addMessage = (message: ConversationMessage) => {
    setConversationHistory(prev => [...prev, message]);
  };

  const clearConversation = () => {
    setConversationHistory([]);
  };

  return (
    <AppContext.Provider
      value={{
        progress,
        avatar,
        conversationHistory,
        updateProgress,
        updateAvatar,
        addMessage,
        clearConversation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
