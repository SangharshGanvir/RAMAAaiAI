import OpenAI from 'openai';
import { Lesson, LearningLevel } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function generateLesson(topic: string, level: LearningLevel = 'alphabet'): Promise<Lesson> {
  try {
    const prompt = `Create a simple English lesson for a 6-year-old child about "${topic}".
    
    The lesson should include:
    1. A title
    2. 3-4 learning objectives (simple sentences)
    3. 3-5 activities (interactive and fun)
    4. 2-3 practice questions
    
    Keep everything very simple and age-appropriate. Use emojis to make it fun.
    
    Return as JSON with this structure:
    {
      "title": "lesson title",
      "objectives": ["objective 1", "objective 2"],
      "activities": ["activity 1", "activity 2"],
      "questions": ["question 1", "question 2"]
    }`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content || '';
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const lessonData = JSON.parse(jsonMatch[0]);
      return {
        id: `lesson-${Date.now()}`,
        title: lessonData.title,
        topic,
        level,
        objectives: lessonData.objectives,
        activities: lessonData.activities,
        questions: lessonData.questions,
      };
    }

    return getDefaultLesson(topic, level);
  } catch (error) {
    console.error('Lesson generation error:', error);
    return getDefaultLesson(topic, level);
  }
}

function getDefaultLesson(topic: string, level: LearningLevel): Lesson {
  return {
    id: `lesson-${Date.now()}`,
    title: `Learning About ${topic}`,
    topic,
    level,
    objectives: [
      `Learn what ${topic} means`,
      `Practice saying ${topic}`,
      `Use ${topic} in a sentence`
    ],
    activities: [
      `Listen to Rama Aai say "${topic}"`,
      `Repeat the word 3 times`,
      `Find pictures of ${topic}`,
      `Make a sentence with ${topic}`
    ],
    questions: [
      `Can you say "${topic}"?`,
      `What does ${topic} mean?`,
      `Can you use ${topic} in a sentence?`
    ],
  };
}

export function getNextLesson(completedTopics: string[]): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const remaining = alphabet.filter(letter => !completedTopics.includes(letter));
  
  if (remaining.length > 0) {
    return remaining[0];
  }
  
  const commonWords = ['cat', 'dog', 'sun', 'moon', 'tree', 'book', 'ball', 'home'];
  const remainingWords = commonWords.filter(word => !completedTopics.includes(word));
  
  return remainingWords[0] || 'reading';
}

export async function generateDailyLesson(level: LearningLevel): Promise<Lesson> {
  const topics: Record<LearningLevel, string[]> = {
    alphabet: ['A', 'B', 'C', 'D', 'E'],
    word: ['cat', 'dog', 'sun', 'tree', 'book'],
    sentence: ['I am happy', 'The cat runs', 'I like books'],
    story: ['friendship', 'kindness', 'sharing', 'helping'],
  };

  const topicList = topics[level] || topics.alphabet;
  const randomTopic = topicList[Math.floor(Math.random() * topicList.length)];
  
  return await generateLesson(randomTopic, level);
}
