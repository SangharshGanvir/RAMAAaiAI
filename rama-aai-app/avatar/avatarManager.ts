import { AvatarCustomization } from '@/types';

const STORAGE_KEY = 'ramaAai_avatar';

export function getAvatarCustomization(): AvatarCustomization {
  if (typeof window === 'undefined') return getDefaultAvatar();

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  
  return getDefaultAvatar();
}

export function saveAvatarCustomization(avatar: AvatarCustomization): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(avatar));
}

function getDefaultAvatar(): AvatarCustomization {
  return {
    hairStyle: 'bun',
    sareeColor: '#ee5b2b',
    glasses: false,
    voiceTone: 'warm',
    backgroundTheme: 'garden',
  };
}

export const AVATAR_OPTIONS = {
  hairStyles: [
    { id: 'bun', name: 'Traditional Bun', icon: '👵' },
    { id: 'braided', name: 'Braided', icon: '👩' },
    { id: 'short', name: 'Short Hair', icon: '👵' },
  ],
  sareeColors: [
    { id: '#ee5b2b', name: 'Orange', color: '#ee5b2b' },
    { id: '#9c27b0', name: 'Purple', color: '#9c27b0' },
    { id: '#2196f3', name: 'Blue', color: '#2196f3' },
    { id: '#4caf50', name: 'Green', color: '#4caf50' },
    { id: '#f44336', name: 'Red', color: '#f44336' },
  ],
  voiceTones: [
    { id: 'warm', name: 'Warm & Gentle', description: 'Soft and comforting' },
    { id: 'gentle', name: 'Very Gentle', description: 'Extra soft voice' },
    { id: 'cheerful', name: 'Cheerful', description: 'Happy and energetic' },
  ],
  backgroundThemes: [
    { id: 'garden', name: 'Garden', emoji: '🌸' },
    { id: 'library', name: 'Library', emoji: '📚' },
    { id: 'classroom', name: 'Classroom', emoji: '🏫' },
    { id: 'nature', name: 'Nature', emoji: '🌳' },
  ],
};

export function getVoiceSettings(voiceTone: string): { rate: number; pitch: number } {
  const settings = {
    warm: { rate: 0.9, pitch: 1.1 },
    gentle: { rate: 0.85, pitch: 1.15 },
    cheerful: { rate: 1.0, pitch: 1.2 },
  };
  
  return settings[voiceTone as keyof typeof settings] || settings.warm;
}
