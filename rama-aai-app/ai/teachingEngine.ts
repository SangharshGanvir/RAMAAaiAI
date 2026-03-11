import { generateResponse } from './conversationEngine';
import { PronunciationResult } from '@/types';

export type TeachingMode = 
  | 'alphabet'
  | 'vocabulary'
  | 'pronunciation'
  | 'storytelling'
  | 'general';

export async function generateTeachingPrompt(
  mode: TeachingMode,
  topic: string,
  context?: string
): Promise<string> {
  const prompts: Record<TeachingMode, string> = {
    alphabet: `Teach the child about the letter "${topic}". Say the letter sound, give 2 simple words that start with it, and ask them to repeat. Keep it very simple and fun!`,
    
    vocabulary: `Teach the child the word "${topic}". Explain what it means using simple words, give an example they can relate to, and ask them to use it in a sentence.`,
    
    pronunciation: `Help the child pronounce "${topic}" correctly. Say it slowly, break it into parts if needed, and encourage them to repeat after you.`,
    
    storytelling: `Tell a very short story (3-4 sentences) about "${topic}". Use simple words, make it fun, and end with a question about the story.`,
    
    general: `Answer the child's question about "${topic}" in a simple, fun way. Use examples they understand and ask a follow-up question.`
  };

  const prompt = prompts[mode] || prompts.general;
  const fullPrompt = context ? `${prompt}\n\nContext: ${context}` : prompt;

  return await generateResponse(fullPrompt, []);
}

export async function generateAlphabetLesson(letter: string): Promise<string> {
  return await generateTeachingPrompt('alphabet', letter);
}

export async function generateVocabularyLesson(word: string): Promise<string> {
  return await generateTeachingPrompt('vocabulary', word);
}

export async function generatePronunciationHelp(word: string): Promise<string> {
  return await generateTeachingPrompt('pronunciation', word);
}

export async function generateStoryPrompt(topic: string): Promise<string> {
  return await generateTeachingPrompt('storytelling', topic);
}

export function getPronunciationFeedback(result: PronunciationResult): string {
  if (result.score >= 90) {
    return "Excellent! You said it perfectly! 🌟";
  } else if (result.score >= 70) {
    return "Very good! You're doing great! Keep practicing! 👏";
  } else if (result.score >= 50) {
    return "Good try! Let's practice it again together. You can do it! 💪";
  } else {
    return "That's okay! Learning takes practice. Let me say it again, then you try! 😊";
  }
}

export async function generateEncouragement(achievement: string): Promise<string> {
  const encouragements = [
    `Wonderful job on ${achievement}! I'm so proud of you! 🌟`,
    `You did it! ${achievement} - you're learning so fast! 🎉`,
    `Amazing work with ${achievement}! Keep going, my dear! ⭐`,
    `Look at you! ${achievement} - you're so smart! 💖`
  ];
  
  return encouragements[Math.floor(Math.random() * encouragements.length)];
}
