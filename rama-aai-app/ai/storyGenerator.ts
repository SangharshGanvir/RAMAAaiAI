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

function getDefaultStories(): Story[] {
  return [
    {
      id: 'story-easy-1',
      title: 'The Happy Sun',
      content: [
        'The sun wakes up every morning.',
        'It shines bright in the sky.',
        'The sun makes everyone happy.',
        'All the flowers smile at the sun.'
      ],
      moral: 'Sharing happiness makes everyone smile.',
      difficulty: 'easy',
      question: 'What does the sun do in the morning?'
    },
    {
      id: 'story-easy-2',
      title: 'My Best Friend',
      content: [
        'I have a best friend named Sam.',
        'We play together every day.',
        'Sam is kind and funny.',
        'I am happy to have a friend like Sam.'
      ],
      moral: 'Good friends make life more fun.',
      difficulty: 'easy',
      question: 'What do you and your friend do together?'
    },
    {
      id: 'story-easy-3',
      title: 'The Rainbow',
      content: [
        'After the rain stops, a rainbow appears.',
        'The rainbow has many beautiful colors.',
        'Red, orange, yellow, green, blue, and purple.',
        'The rainbow makes the sky look magical.'
      ],
      moral: 'Beautiful things come after difficult times.',
      difficulty: 'easy',
      question: 'When does the rainbow appear?'
    },
    {
      id: 'story-medium-1',
      title: 'The Little Bird',
      content: [
        'A little bird lived in a big tree.',
        'Every day, the bird sang beautiful songs.',
        'All the animals loved to hear the bird sing.',
        'The bird made the forest a happy place.',
        'One day, the bird taught other birds to sing too.'
      ],
      moral: 'Sharing your talents makes the world better.',
      difficulty: 'medium',
      question: 'What did the little bird do every day?'
    },
    {
      id: 'story-medium-2',
      title: 'The Magic Garden',
      content: [
        'There was a special garden behind my house.',
        'In this garden, flowers talked to each other.',
        'The roses told jokes and made everyone laugh.',
        'The sunflowers danced when the wind blew.',
        'Every child loved to visit the magic garden.'
      ],
      moral: 'Imagination makes ordinary places magical.',
      difficulty: 'medium',
      question: 'What made the garden special?'
    },
    {
      id: 'story-medium-3',
      title: 'The Helpful Elephant',
      content: [
        'An elephant lived near a small village.',
        'The elephant loved to help people.',
        'It carried water for the farmers.',
        'It helped children cross the river safely.',
        'Everyone in the village loved the kind elephant.'
      ],
      moral: 'Helping others brings love and friendship.',
      difficulty: 'medium',
      question: 'How did the elephant help the village?'
    },
    {
      id: 'story-hard-1',
      title: 'The Brave Little Mouse',
      content: [
        'Once upon a time, there was a tiny mouse.',
        'The mouse was very small but very brave.',
        'One day, a big lion got caught in a trap.',
        'The little mouse heard the lion roar for help.',
        'The brave mouse chewed through the ropes.',
        'The lion was free and thanked the little mouse.',
        'From that day, they became best friends forever.'
      ],
      moral: 'Even small acts of kindness can make a big difference.',
      difficulty: 'hard',
      question: 'How did the mouse help the lion?'
    },
    {
      id: 'story-hard-2',
      title: 'The Adventure of Two Friends',
      content: [
        'Two friends, a rabbit and a turtle, went on an adventure.',
        'They wanted to find the tallest mountain.',
        'The rabbit was fast but got tired quickly.',
        'The turtle was slow but never gave up.',
        'They helped each other along the way.',
        'Together, they reached the top of the mountain.',
        'They learned that teamwork makes everything possible.'
      ],
      moral: 'Working together helps us achieve our dreams.',
      difficulty: 'hard',
      question: 'What did the friends learn from their adventure?'
    },
    {
      id: 'story-hard-3',
      title: 'The Magical Library',
      content: [
        'In a small town, there was a magical library.',
        'Every book in the library could come to life.',
        'When children read the stories, they entered the book.',
        'They met princes, dragons, and talking animals.',
        'The children learned many wonderful things.',
        'When they finished reading, they returned home safely.',
        'The magical library taught them that reading opens new worlds.'
      ],
      moral: 'Reading takes us on amazing adventures.',
      difficulty: 'hard',
      question: 'What happened when children read the books?'
    }
  ];
}

function getDefaultStory(topic: string, difficulty: 'easy' | 'medium' | 'hard'): Story {
  const stories = getDefaultStories();
  const story = stories.find(s => s.difficulty === difficulty);
  return story || stories[0];
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
