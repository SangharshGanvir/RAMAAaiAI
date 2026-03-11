import { LearningProgress, Badge, LearningLevel } from '@/types';

const STORAGE_KEYS = {
  PROGRESS: 'ramaAai_progress',
  AVATAR: 'ramaAai_avatar',
  REWARDS: 'ramaAai_rewards',
};

export function getProgress(): LearningProgress {
  if (typeof window === 'undefined') return getDefaultProgress();

  const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS);
  if (stored) {
    return JSON.parse(stored);
  }
  
  return getDefaultProgress();
}

export function saveProgress(progress: LearningProgress): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
}

export function addLetterLearned(letter: string): void {
  const progress = getProgress();
  if (!progress.lettersLearned.includes(letter)) {
    progress.lettersLearned.push(letter);
    progress.totalStars += 5;
    saveProgress(progress);
    checkForBadges(progress);
  }
}

export function addWordLearned(word: string): void {
  const progress = getProgress();
  if (!progress.wordsLearned.includes(word)) {
    progress.wordsLearned.push(word);
    progress.totalStars += 3;
    saveProgress(progress);
    checkForBadges(progress);
  }
}

export function addStoryCompleted(storyId: string): void {
  const progress = getProgress();
  if (!progress.storiesCompleted.includes(storyId)) {
    progress.storiesCompleted.push(storyId);
    progress.totalStars += 10;
    saveProgress(progress);
    checkForBadges(progress);
  }
}

export function updatePronunciationScore(word: string, score: number): void {
  const progress = getProgress();
  progress.pronunciationScores.push({
    word,
    spokenText: word,
    score,
    timestamp: new Date(),
  });
  if (score >= 80) {
    progress.totalStars += 2;
  }
  saveProgress(progress);
}

export function updateDailyStreak(): void {
  const progress = getProgress();
  const today = new Date().toDateString();
  
  if (progress.lastActiveDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (progress.lastActiveDate === yesterday.toDateString()) {
      progress.dailyStreak += 1;
    } else {
      progress.dailyStreak = 1;
    }
    
    progress.lastActiveDate = today;
    saveProgress(progress);
    checkForBadges(progress);
  }
}

function checkForBadges(progress: LearningProgress): void {
  const newBadges: Badge[] = [];

  if (progress.lettersLearned.length >= 5 && !hasBadge(progress, 'alphabet-starter')) {
    newBadges.push({
      id: 'alphabet-starter',
      name: 'Alphabet Starter',
      description: 'Learned 5 letters!',
      icon: '🔤',
      earnedDate: new Date().toISOString(),
    });
  }

  if (progress.lettersLearned.length >= 26 && !hasBadge(progress, 'alphabet-master')) {
    newBadges.push({
      id: 'alphabet-master',
      name: 'Alphabet Master',
      description: 'Learned all 26 letters!',
      icon: '🎓',
      earnedDate: new Date().toISOString(),
    });
  }

  if (progress.wordsLearned.length >= 10 && !hasBadge(progress, 'word-explorer')) {
    newBadges.push({
      id: 'word-explorer',
      name: 'Word Explorer',
      description: 'Learned 10 words!',
      icon: '📚',
      earnedDate: new Date().toISOString(),
    });
  }

  if (progress.storiesCompleted.length >= 5 && !hasBadge(progress, 'story-lover')) {
    newBadges.push({
      id: 'story-lover',
      name: 'Story Lover',
      description: 'Completed 5 stories!',
      icon: '📖',
      earnedDate: new Date().toISOString(),
    });
  }

  if (progress.dailyStreak >= 7 && !hasBadge(progress, 'week-warrior')) {
    newBadges.push({
      id: 'week-warrior',
      name: 'Week Warrior',
      description: '7 day learning streak!',
      icon: '🔥',
      earnedDate: new Date().toISOString(),
    });
  }

  if (newBadges.length > 0) {
    progress.badges.push(...newBadges);
    saveProgress(progress);
  }
}

function hasBadge(progress: LearningProgress, badgeId: string): boolean {
  return progress.badges.some(badge => badge.id === badgeId);
}

export function getCurrentLevel(progress: LearningProgress): LearningLevel {
  const totalLearned = progress.lettersLearned.length + progress.wordsLearned.length;
  
  if (totalLearned < 10) return 'alphabet';
  if (totalLearned < 30) return 'word';
  if (totalLearned < 60) return 'sentence';
  return 'story';
}

function getDefaultProgress(): LearningProgress {
  return {
    lettersLearned: [],
    wordsLearned: [],
    storiesCompleted: [],
    pronunciationScores: [],
    dailyStreak: 0,
    lastActiveDate: '',
    totalStars: 0,
    badges: [],
    currentLevel: 'alphabet',
  };
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.PROGRESS);
}
