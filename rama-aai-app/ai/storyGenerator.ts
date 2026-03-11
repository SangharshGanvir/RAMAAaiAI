import { Story } from '@/types';
import OpenAI from 'openai';

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
    {
      id: 'story-easy-11',
      title: '🐝 The Busy Bee',
      content: [
        '🐝 A little bee flies from flower to flower.',
        '🌸 The bee collects sweet nectar.',
        '🍯 It makes yummy honey.',
        '😊 The bee works hard every day.'
      ],
      moral: 'Hard work brings sweet rewards.',
      difficulty: 'easy',
      question: 'What does the bee make?'
    },
    {
      id: 'story-easy-12',
      title: '🎈 The Red Balloon',
      content: [
        '🎈 A red balloon floats in the sky.',
        '☁️ It goes up, up, up.',
        '👋 A child waves goodbye.',
        '😊 The balloon is free and happy.'
      ],
      moral: 'Sometimes letting go brings happiness.',
      difficulty: 'easy',
      question: 'What color is the balloon?'
    },
    {
      id: 'story-easy-13',
      title: '🐸 The Jumping Frog',
      content: [
        '🐸 A green frog sits on a lily pad.',
        '💦 It jumps into the water.',
        '🎵 The frog says ribbit, ribbit.',
        '🌊 It swims and plays all day.'
      ],
      moral: 'Playing keeps us healthy and happy.',
      difficulty: 'easy',
      question: 'What sound does the frog make?'
    },
    {
      id: 'story-easy-14',
      title: '🎂 Birthday Party',
      content: [
        '🎂 Today is my birthday.',
        '🎈 There are balloons everywhere.',
        '🎁 I get many presents.',
        '😄 I am so happy today.'
      ],
      moral: 'Special days bring joy.',
      difficulty: 'easy',
      question: 'What special day is it?'
    },
    {
      id: 'story-easy-15',
      title: '🌧️ The Rain',
      content: [
        '🌧️ Rain falls from the sky.',
        '💧 It makes puddles on the ground.',
        '👢 I wear my rain boots.',
        '😊 I love to jump in puddles.'
      ],
      moral: 'Rainy days can be fun too.',
      difficulty: 'easy',
      question: 'What do you wear in the rain?'
    },
    {
      id: 'story-easy-16',
      title: '🦆 The Duck Family',
      content: [
        '🦆 A mother duck swims in the pond.',
        '🐥 Five baby ducks follow her.',
        '🌊 They swim in a line.',
        '❤️ The mother duck loves her babies.'
      ],
      moral: 'Families stay together.',
      difficulty: 'easy',
      question: 'How many baby ducks are there?'
    },
    {
      id: 'story-easy-17',
      title: '🍪 The Cookie',
      content: [
        '🍪 Mom bakes cookies in the oven.',
        '🤤 They smell so good.',
        '🥛 I drink milk with my cookie.',
        '😋 It tastes delicious.'
      ],
      moral: 'Homemade treats are the best.',
      difficulty: 'easy',
      question: 'What does mom bake?'
    },
    {
      id: 'story-easy-18',
      title: '🚂 The Train Ride',
      content: [
        '🚂 The train goes choo choo.',
        '🏞️ It passes trees and mountains.',
        '👀 I look out the window.',
        '😊 Train rides are fun.'
      ],
      moral: 'Journeys can be exciting.',
      difficulty: 'easy',
      question: 'What sound does the train make?'
    },
    {
      id: 'story-easy-19',
      title: '🎨 My Drawing',
      content: [
        '🎨 I draw with crayons.',
        '🏠 I draw my house.',
        '👨‍👩‍👧 I draw my family.',
        '😊 My drawing is beautiful.'
      ],
      moral: 'Art shows our love.',
      difficulty: 'easy',
      question: 'What do you draw with?'
    },
    {
      id: 'story-easy-20',
      title: '🌟 The Wishing Star',
      content: [
        '🌟 I see a star at night.',
        '🙏 I make a wish.',
        '✨ The star twinkles bright.',
        '💭 I hope my wish comes true.'
      ],
      moral: 'Hope keeps dreams alive.',
      difficulty: 'easy',
      question: 'What do you make on a star?'
    },
    {
      id: 'story-easy-21',
      title: '🐌 The Slow Snail',
      content: [
        '🐌 A snail moves very slowly.',
        '🏠 It carries its house.',
        '🌿 It crawls on leaves.',
        '😊 Slow and steady is okay.'
      ],
      moral: 'Everyone moves at their own pace.',
      difficulty: 'easy',
      question: 'What does the snail carry?'
    },
    {
      id: 'story-easy-22',
      title: '🎵 The Music Box',
      content: [
        '🎵 I open the music box.',
        '💃 A dancer spins around.',
        '🎶 Pretty music plays.',
        '😊 It makes me smile.'
      ],
      moral: 'Music brings joy.',
      difficulty: 'easy',
      question: 'What spins in the music box?'
    },
    {
      id: 'story-easy-23',
      title: '🌻 The Sunflower',
      content: [
        '🌻 A tall sunflower grows.',
        '☀️ It faces the sun.',
        '🐝 Bees visit the flower.',
        '😊 The sunflower is happy.'
      ],
      moral: 'Always look toward the light.',
      difficulty: 'easy',
      question: 'What does the sunflower face?'
    },
    {
      id: 'story-easy-24',
      title: '🧸 My Teddy Bear',
      content: [
        '🧸 I have a soft teddy bear.',
        '🛏️ It sleeps with me at night.',
        '🤗 I hug it tight.',
        '❤️ My teddy is my friend.'
      ],
      moral: 'Comfort comes from things we love.',
      difficulty: 'easy',
      question: 'Where does the teddy sleep?'
    },
    {
      id: 'story-easy-25',
      title: '🍦 Ice Cream Day',
      content: [
        '🍦 It is a hot summer day.',
        '😋 I eat ice cream.',
        '🍓 It is strawberry flavor.',
        '😊 Ice cream is yummy.'
      ],
      moral: 'Sweet treats make hot days better.',
      difficulty: 'easy',
      question: 'What flavor is the ice cream?'
    },
    {
      id: 'story-easy-26',
      title: '🦋 The Colorful Butterfly',
      content: [
        '🦋 A butterfly has pretty wings.',
        '🌈 Its wings are many colors.',
        '🌸 It lands on a flower.',
        '✨ The butterfly is beautiful.'
      ],
      moral: 'Beauty comes in many colors.',
      difficulty: 'easy',
      question: 'Where does the butterfly land?'
    },
    {
      id: 'story-easy-27',
      title: '🎪 The Circus Clown',
      content: [
        '🤡 A funny clown makes me laugh.',
        '🎈 The clown has balloons.',
        '😂 The clown does silly tricks.',
        '😊 The circus is fun.'
      ],
      moral: 'Laughter is good medicine.',
      difficulty: 'easy',
      question: 'What does the clown have?'
    },
    {
      id: 'story-easy-28',
      title: '🌊 The Beach',
      content: [
        '🏖️ I go to the beach.',
        '🏖️ I build a sandcastle.',
        '🌊 Waves splash on my feet.',
        '😊 The beach is wonderful.'
      ],
      moral: 'Nature is a playground.',
      difficulty: 'easy',
      question: 'What do you build at the beach?'
    },
    {
      id: 'story-easy-29',
      title: '🎃 The Pumpkin',
      content: [
        '🎃 A big orange pumpkin grows.',
        '🌱 It grows in the garden.',
        '😊 I carve a happy face.',
        '🕯️ I put a candle inside.'
      ],
      moral: 'We can create joy from simple things.',
      difficulty: 'easy',
      question: 'What color is the pumpkin?'
    },
    {
      id: 'story-easy-30',
      title: '🚀 The Rocket Ship',
      content: [
        '🚀 A rocket flies to space.',
        '⭐ It passes many stars.',
        '🌙 It goes to the moon.',
        '😊 Space is amazing.'
      ],
      moral: 'Dreams can take us far.',
      difficulty: 'easy',
      question: 'Where does the rocket go?'
    },
    {
      id: 'story-easy-31',
      title: '🐿️ The Squirrel',
      content: [
        '🐿️ A squirrel finds an acorn.',
        '🌰 It hides the acorn.',
        '🌳 The squirrel climbs a tree.',
        '😊 The squirrel is clever.'
      ],
      moral: 'Planning ahead is wise.',
      difficulty: 'easy',
      question: 'What does the squirrel find?'
    },
    {
      id: 'story-easy-32',
      title: '🎁 Sharing Toys',
      content: [
        '🧸 I have many toys.',
        '👦 My friend comes to play.',
        '🤝 I share my toys.',
        '😊 We both have fun.'
      ],
      moral: 'Sharing makes everyone happy.',
      difficulty: 'easy',
      question: 'What do you share?'
    },
    {
      id: 'story-easy-33',
      title: '🌲 The Pine Tree',
      content: [
        '🌲 A pine tree is green.',
        '❄️ It stays green in winter.',
        '🎄 Birds live in the tree.',
        '😊 The tree is strong.'
      ],
      moral: 'Strength helps us through hard times.',
      difficulty: 'easy',
      question: 'What color is the pine tree?'
    },
    {
      id: 'story-easy-34',
      title: '🎸 The Guitar',
      content: [
        '🎸 I play the guitar.',
        '🎵 It makes music.',
        '🎶 I sing a song.',
        '😊 Music is fun.'
      ],
      moral: 'Making music brings happiness.',
      difficulty: 'easy',
      question: 'What instrument do you play?'
    },
    {
      id: 'story-easy-35',
      title: '🦉 The Wise Owl',
      content: [
        '🦉 An owl sits in a tree.',
        '🌙 It comes out at night.',
        '👀 It has big eyes.',
        '😊 The owl is wise.'
      ],
      moral: 'Wisdom comes with watching and learning.',
      difficulty: 'easy',
      question: 'When does the owl come out?'
    },
    // MEDIUM STORIES (35 stories)
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

export function getAllStories(): Story[] {
  const defaultStories = getDefaultStories();
  // Import additional stories dynamically
  try {
    const { additionalStories } = require('@/data/additionalStories');
    return [...defaultStories, ...additionalStories];
  } catch {
    return defaultStories;
  }
}

export function getStoriesByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): Story[] {
  const allStories = getAllStories();
  return allStories.filter(s => s.difficulty === difficulty);
}

export function getStoryById(id: string): Story | null {
  const allStories = getAllStories();
  return allStories.find(s => s.id === id) || null;
}

export function getStoryByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): Story {
  const topics = {
    easy: 'bunny',
    medium: 'kitten',
    hard: 'dolphin'
  };
  
  return getDefaultStory(topics[difficulty], difficulty);
}
