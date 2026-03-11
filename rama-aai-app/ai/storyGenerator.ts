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
    // EASY STORIES (10 stories)
    {
      id: 'story-easy-1',
      title: '☀️ The Happy Sun',
      content: [
        '☀️ The sun wakes up every morning.',
        '✨ It shines bright in the sky.',
        '😊 The sun makes everyone happy.',
        '🌸 All the flowers smile at the sun.'
      ],
      moral: 'Sharing happiness makes everyone smile.',
      difficulty: 'easy',
      question: 'What does the sun do in the morning?'
    },
    {
      id: 'story-easy-2',
      title: '👫 My Best Friend',
      content: [
        '👦 I have a best friend named Sam.',
        '⚽ We play together every day.',
        '😄 Sam is kind and funny.',
        '💕 I am happy to have a friend like Sam.'
      ],
      moral: 'Good friends make life more fun.',
      difficulty: 'easy',
      question: 'What do you and your friend do together?'
    },
    {
      id: 'story-easy-3',
      title: '🌈 The Rainbow',
      content: [
        '🌧️ After the rain stops, a rainbow appears.',
        '🎨 The rainbow has many beautiful colors.',
        '❤️🧡💛💚💙💜 Red, orange, yellow, green, blue, and purple.',
        '✨ The rainbow makes the sky look magical.'
      ],
      moral: 'Beautiful things come after difficult times.',
      difficulty: 'easy',
      question: 'When does the rainbow appear?'
    },
    {
      id: 'story-easy-4',
      title: '🐶 The Puppy',
      content: [
        '🐶 A little puppy lives in my house.',
        '🎾 The puppy loves to play with a ball.',
        '💤 After playing, the puppy takes a nap.',
        '❤️ I love my puppy very much.'
      ],
      moral: 'Pets bring joy and love to our lives.',
      difficulty: 'easy',
      question: 'What does the puppy like to do?'
    },
    {
      id: 'story-easy-5',
      title: '🌟 The Star',
      content: [
        '⭐ A little star lives in the sky.',
        '🌙 Every night, the star comes out to shine.',
        '👀 Children look up and make wishes.',
        '✨ The star makes their wishes come true.'
      ],
      moral: 'Dreams can come true if we believe.',
      difficulty: 'easy',
      question: 'When does the star come out?'
    },
    {
      id: 'story-easy-6',
      title: '🦋 The Butterfly',
      content: [
        '🐛 A caterpillar lived on a leaf.',
        '😴 One day, it went to sleep in a cocoon.',
        '🦋 When it woke up, it was a beautiful butterfly.',
        '🌸 Now it flies from flower to flower.'
      ],
      moral: 'Change can make us beautiful.',
      difficulty: 'easy',
      question: 'What did the caterpillar become?'
    },
    {
      id: 'story-easy-7',
      title: '🍎 The Apple Tree',
      content: [
        '🌳 An apple tree grows in the garden.',
        '🌸 In spring, it has pretty flowers.',
        '🍎 In fall, it gives us red apples.',
        '😋 The apples are sweet and yummy.'
      ],
      moral: 'Good things take time to grow.',
      difficulty: 'easy',
      question: 'What does the tree give us?'
    },
    {
      id: 'story-easy-8',
      title: '🐱 The Kitten',
      content: [
        '🐱 A tiny kitten says meow.',
        '🥛 It drinks milk from a bowl.',
        '🧶 It plays with a ball of yarn.',
        '😴 Then it sleeps on a soft pillow.'
      ],
      moral: 'Little things need love and care.',
      difficulty: 'easy',
      question: 'What does the kitten drink?'
    },
    {
      id: 'story-easy-9',
      title: '🌺 The Garden',
      content: [
        '🌺 Many flowers grow in the garden.',
        '🌹 Roses are red and smell nice.',
        '🌻 Sunflowers are big and yellow.',
        '🦋 Butterflies visit all the flowers.'
      ],
      moral: 'Nature is full of beautiful things.',
      difficulty: 'easy',
      question: 'What color are the sunflowers?'
    },
    {
      id: 'story-easy-10',
      title: '🌙 Bedtime',
      content: [
        '🌙 The moon comes out at night.',
        '⭐ Stars twinkle in the dark sky.',
        '😴 It is time to go to sleep.',
        '💤 Sweet dreams until morning.'
      ],
      moral: 'Rest helps us grow strong.',
      difficulty: 'easy',
      question: 'What comes out at night?'
    },
    // MEDIUM STORIES (10 stories)
    {
      id: 'story-medium-1',
      title: '🐦 The Little Bird',
      content: [
        '🌳 A little bird lived in a big tree.',
        '🎵 Every day, the bird sang beautiful songs.',
        '🦊🐰🦌 All the animals loved to hear the bird sing.',
        '😊 The bird made the forest a happy place.',
        '🎶 One day, the bird taught other birds to sing too.'
      ],
      moral: 'Sharing your talents makes the world better.',
      difficulty: 'medium',
      question: 'What did the little bird do every day?'
    },
    {
      id: 'story-medium-2',
      title: '🌺 The Magic Garden',
      content: [
        '🏡 There was a special garden behind my house.',
        '🌸 In this garden, flowers talked to each other.',
        '🌹 The roses told jokes and made everyone laugh.',
        '🌻 The sunflowers danced when the wind blew.',
        '👧👦 Every child loved to visit the magic garden.'
      ],
      moral: 'Imagination makes ordinary places magical.',
      difficulty: 'medium',
      question: 'What made the garden special?'
    },
    {
      id: 'story-medium-3',
      title: '🐘 The Helpful Elephant',
      content: [
        '🐘 An elephant lived near a small village.',
        '❤️ The elephant loved to help people.',
        '💧 It carried water for the farmers.',
        '🌊 It helped children cross the river safely.',
        '🥰 Everyone in the village loved the kind elephant.'
      ],
      moral: 'Helping others brings love and friendship.',
      difficulty: 'medium',
      question: 'How did the elephant help the village?'
    },
    {
      id: 'story-medium-4',
      title: '🌊 The Brave Fish',
      content: [
        '🐠 A little fish lived in the ocean.',
        '🌊 One day, big waves came to the shore.',
        '🐚 The fish helped other sea creatures find safety.',
        '🏖️ It guided them to a calm, peaceful place.',
        '⭐ All the sea animals thanked the brave fish.'
      ],
      moral: 'Courage helps us protect others.',
      difficulty: 'medium',
      question: 'How did the fish help others?'
    },
    {
      id: 'story-medium-5',
      title: '🎨 The Artist',
      content: [
        '👧 A little girl loved to paint pictures.',
        '🖌️ She painted the sky, trees, and flowers.',
        '🎨 Her paintings made people smile.',
        '🖼️ She gave her art to friends and family.',
        '💝 Everyone felt happy when they saw her work.'
      ],
      moral: 'Art brings joy to the world.',
      difficulty: 'medium',
      question: 'What did the girl love to do?'
    },
    {
      id: 'story-medium-6',
      title: '🦁 The Kind Lion',
      content: [
        '🦁 A lion was the king of the jungle.',
        '👑 But he was not mean or scary.',
        '🤝 He helped animals solve their problems.',
        '⚖️ He made sure everyone was treated fairly.',
        '🌟 All animals respected the kind lion.'
      ],
      moral: 'True leaders are kind and fair.',
      difficulty: 'medium',
      question: 'What kind of king was the lion?'
    },
    {
      id: 'story-medium-7',
      title: '🌱 The Little Seed',
      content: [
        '🌱 A tiny seed fell on the ground.',
        '💧 Rain gave it water to drink.',
        '☀️ The sun gave it warmth and light.',
        '🌳 Slowly, it grew into a big strong tree.',
        '🍎 Now it gives fruit to everyone.'
      ],
      moral: 'With care and time, small things grow big.',
      difficulty: 'medium',
      question: 'What did the seed need to grow?'
    },
    {
      id: 'story-medium-8',
      title: '🎪 The Circus',
      content: [
        '🎪 A circus came to town one day.',
        '🤡 Clowns made everyone laugh with funny tricks.',
        '🎭 Acrobats did amazing flips in the air.',
        '🐘 Elephants danced to beautiful music.',
        '👏 Everyone clapped and had a wonderful time.'
      ],
      moral: 'Entertainment brings people together.',
      difficulty: 'medium',
      question: 'What did the clowns do?'
    },
    {
      id: 'story-medium-9',
      title: '🚂 The Little Train',
      content: [
        '🚂 A little train traveled through the mountains.',
        '⛰️ The hills were very steep and high.',
        '💪 The train said, "I think I can, I think I can!"',
        '🎉 It reached the top and went down the other side.',
        '😊 The train was proud of what it achieved.'
      ],
      moral: 'Believing in yourself helps you succeed.',
      difficulty: 'medium',
      question: 'What did the train say?'
    },
    {
      id: 'story-medium-10',
      title: '🎁 The Gift',
      content: [
        '🎂 It was my friend\'s birthday.',
        '🎨 I made a special card with drawings.',
        '🎁 I wrapped it in colorful paper.',
        '😊 When my friend opened it, they smiled big.',
        '🤗 Giving gifts from the heart feels wonderful.'
      ],
      moral: 'Thoughtful gifts show we care.',
      difficulty: 'medium',
      question: 'What did you make for your friend?'
    },
    // HARD STORIES (10 stories)
    {
      id: 'story-hard-1',
      title: '🐭 The Brave Little Mouse',
      content: [
        '🐭 Once upon a time, there was a tiny mouse.',
        '💪 The mouse was very small but very brave.',
        '🦁 One day, a big lion got caught in a trap.',
        '😢 The little mouse heard the lion roar for help.',
        '✂️ The brave mouse chewed through the ropes.',
        '🎉 The lion was free and thanked the little mouse.',
        '🤝 From that day, they became best friends forever.'
      ],
      moral: 'Even small acts of kindness can make a big difference.',
      difficulty: 'hard',
      question: 'How did the mouse help the lion?'
    },
    {
      id: 'story-hard-2',
      title: '🐰🐢 The Adventure of Two Friends',
      content: [
        '🐰🐢 Two friends, a rabbit and a turtle, went on an adventure.',
        '⛰️ They wanted to find the tallest mountain.',
        '🏃 The rabbit was fast but got tired quickly.',
        '🐢 The turtle was slow but never gave up.',
        '🤝 They helped each other along the way.',
        '🏔️ Together, they reached the top of the mountain.',
        '⭐ They learned that teamwork makes everything possible.'
      ],
      moral: 'Working together helps us achieve our dreams.',
      difficulty: 'hard',
      question: 'What did the friends learn from their adventure?'
    },
    {
      id: 'story-hard-3',
      title: '📚 The Magical Library',
      content: [
        '🏛️ In a small town, there was a magical library.',
        '✨ Every book in the library could come to life.',
        '📖 When children read the stories, they entered the book.',
        '🤴🐉🦄 They met princes, dragons, and talking animals.',
        '🎓 The children learned many wonderful things.',
        '🏠 When they finished reading, they returned home safely.',
        '🌍 The magical library taught them that reading opens new worlds.'
      ],
      moral: 'Reading takes us on amazing adventures.',
      difficulty: 'hard',
      question: 'What happened when children read the books?'
    },
    {
      id: 'story-hard-4',
      title: '🌟 The Lost Star',
      content: [
        '⭐ A little star fell from the sky one night.',
        '😢 It was lost and could not find its way home.',
        '🦉 A wise owl saw the star and wanted to help.',
        '🗺️ Together, they followed a map of the stars.',
        '🌌 They traveled through clouds and past the moon.',
        '✨ Finally, they found the star\'s family in the sky.',
        '🥰 The star thanked the owl and shined brighter than ever.'
      ],
      moral: 'Friends help us find our way when we are lost.',
      difficulty: 'hard',
      question: 'Who helped the lost star?'
    },
    {
      id: 'story-hard-5',
      title: '🎭 The Shy Actor',
      content: [
        '👦 A boy loved acting but was very shy.',
        '🎬 He wanted to be in the school play.',
        '😰 He was scared to perform in front of people.',
        '👨‍🏫 His teacher encouraged him to try.',
        '💪 He practiced every day and became confident.',
        '🎉 On the big day, he performed wonderfully.',
        '👏 Everyone clapped, and he felt so proud.'
      ],
      moral: 'Practice and courage help us overcome our fears.',
      difficulty: 'hard',
      question: 'What helped the boy become confident?'
    },
    {
      id: 'story-hard-6',
      title: '🌊 The Ocean Adventure',
      content: [
        '🚢 A group of friends sailed on a boat.',
        '🌊 They wanted to explore a mysterious island.',
        '⛈️ A big storm came and made the waves rough.',
        '🤝 The friends worked together to keep the boat safe.',
        '🏝️ When the storm passed, they found the island.',
        '💎 On the island, they discovered beautiful treasures.',
        '📸 They took pictures and memories to share forever.'
      ],
      moral: 'Adventures are better when shared with friends.',
      difficulty: 'hard',
      question: 'What did the friends find on the island?'
    },
    {
      id: 'story-hard-7',
      title: '🎨 The Colorless World',
      content: [
        '🌍 Long ago, the world had no colors.',
        '⚫⚪ Everything was black, white, and gray.',
        '👧 A little girl had a magical paintbrush.',
        '🎨 She painted the sky blue and the grass green.',
        '🌸 She added red roses and yellow sunflowers.',
        '🦋 She painted butterflies in many colors.',
        '🌈 Now the world is beautiful and full of color.'
      ],
      moral: 'Creativity makes the world more beautiful.',
      difficulty: 'hard',
      question: 'What did the girl use to add colors?'
    },
    {
      id: 'story-hard-8',
      title: '🏰 The Princess and the Dragon',
      content: [
        '👸 A princess lived in a tall castle.',
        '🐉 A dragon lived in the mountains nearby.',
        '😢 Everyone was afraid of the dragon.',
        '🤔 But the princess thought the dragon might be lonely.',
        '🎂 She baked cookies and brought them to the dragon.',
        '😊 The dragon was happy and became her friend.',
        '🌟 They showed everyone that kindness is stronger than fear.'
      ],
      moral: 'Kindness can turn enemies into friends.',
      difficulty: 'hard',
      question: 'What did the princess bring to the dragon?'
    },
    {
      id: 'story-hard-9',
      title: '🌳 The Wise Old Tree',
      content: [
        '🌳 An old tree stood in the middle of the forest.',
        '🦉🐿️🦌 Many animals came to ask for advice.',
        '💭 The tree had lived for hundreds of years.',
        '📚 It had seen many things and learned much wisdom.',
        '👂 It listened carefully to everyone\'s problems.',
        '💡 It gave thoughtful advice that helped them.',
        '🙏 All the animals were grateful for the wise tree.'
      ],
      moral: 'Wisdom comes from experience and listening.',
      difficulty: 'hard',
      question: 'Why was the tree so wise?'
    },
    {
      id: 'story-hard-10',
      title: '🚀 The Space Explorer',
      content: [
        '👨‍🚀 A young explorer dreamed of visiting space.',
        '📚 She studied hard and learned about stars and planets.',
        '🚀 One day, she built her own spaceship.',
        '🌌 She flew past the moon and saw distant galaxies.',
        '🪐 She discovered a new planet with purple skies.',
        '📝 She wrote about her discoveries in a journal.',
        '🌟 Her dream of exploring space had come true.'
      ],
      moral: 'Dreams come true when we work hard and never give up.',
      difficulty: 'hard',
      question: 'What did the explorer discover?'
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
