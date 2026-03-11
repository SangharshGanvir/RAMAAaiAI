import OpenAI from 'openai';
import { Story } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function generateStory(topic: string, difficulty: 'easy' | 'medium' | 'hard' = 'easy'): Promise<Story> {
  try {
    const wordLimits = {
      easy: '30-40 words',
      medium: '50-60 words',
      hard: '70-80 words'
    };

    const prompt = `Write a short, child-friendly story about "${topic}" for a 6-year-old.
    
    Requirements:
    - Length: ${wordLimits[difficulty]}
    - Use very simple English words
    - Make it fun and engaging
    - Include a simple moral or lesson
    - End with a question to check understanding
    
    Return as JSON:
    {
      "title": "story title",
      "content": ["sentence 1", "sentence 2", "sentence 3"],
      "moral": "the lesson",
      "question": "a question about the story"
    }`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300,
      temperature: 0.8,
    });

    const content = response.choices[0]?.message?.content || '';
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const storyData = JSON.parse(jsonMatch[0]);
      return {
        id: `story-${Date.now()}`,
        title: storyData.title,
        content: storyData.content,
        moral: storyData.moral,
        question: storyData.question,
        difficulty,
      };
    }

    return getDefaultStory(topic, difficulty);
  } catch (error) {
    console.error('Story generation error:', error);
    return getDefaultStory(topic, difficulty);
  }
}

function getDefaultStory(topic: string, difficulty: 'easy' | 'medium' | 'hard'): Story {
  const stories = {
    easy: {
      title: `The Little ${topic}`,
      content: [
        `Once there was a little ${topic}.`,
        `It was very happy and kind.`,
        `Everyone loved the little ${topic}.`,
        `The end!`
      ],
      moral: 'Being kind makes everyone happy.',
      question: `Did you like the story about the ${topic}?`
    },
    medium: {
      title: `${topic}'s Adventure`,
      content: [
        `One sunny day, ${topic} went on an adventure.`,
        `${topic} met many friends along the way.`,
        `They played together and had lots of fun.`,
        `${topic} learned that friends make everything better.`,
        `${topic} went home happy.`
      ],
      moral: 'Friends make life more fun.',
      question: `What did ${topic} learn?`
    },
    hard: {
      title: `The Brave ${topic}`,
      content: [
        `There once lived a brave ${topic} in a beautiful garden.`,
        `One day, ${topic} saw a friend who needed help.`,
        `Even though ${topic} was scared, it decided to be brave.`,
        `${topic} helped the friend and felt very proud.`,
        `Everyone thanked ${topic} for being so kind and brave.`,
        `From that day on, ${topic} knew that helping others feels wonderful.`
      ],
      moral: 'Being brave and helping others is important.',
      question: `Why was ${topic} brave?`
    }
  };

  const story = stories[difficulty];
  return {
    id: `story-${Date.now()}`,
    title: story.title,
    content: story.content,
    moral: story.moral,
    question: story.question,
    difficulty,
  };
}

export async function generateStoryLibrary(count: number = 5): Promise<Story[]> {
  const topics = ['rabbit', 'bird', 'flower', 'star', 'rainbow', 'butterfly', 'tree', 'cloud'];
  const difficulties: Array<'easy' | 'medium' | 'hard'> = ['easy', 'easy', 'medium', 'medium', 'hard'];
  
  const stories: Story[] = [];
  
  for (let i = 0; i < Math.min(count, topics.length); i++) {
    const story = await generateStory(topics[i], difficulties[i] || 'easy');
    stories.push(story);
  }
  
  return stories;
}

export function getStoryByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): Story {
  const topics = {
    easy: 'bunny',
    medium: 'kitten',
    hard: 'dolphin'
  };
  
  return getDefaultStory(topics[difficulty], difficulty);
}
