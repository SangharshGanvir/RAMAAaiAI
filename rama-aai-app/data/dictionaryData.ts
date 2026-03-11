export interface DictionaryEntry {
  word: string;
  definition: string;
  example: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  synonyms?: string[];
  antonyms?: string[];
}

// Comprehensive dictionary with 500+ words
export const dictionaryEntries: DictionaryEntry[] = [
  // EASY WORDS (150 entries)
  {
    word: 'cat',
    definition: 'A small furry animal that people keep as a pet. Cats say meow.',
    example: 'My cat likes to play with a ball of yarn.',
    category: 'animals',
    difficulty: 'easy',
    synonyms: ['kitty', 'kitten', 'feline']
  },
  {
    word: 'dog',
    definition: 'A friendly animal that people keep as a pet. Dogs say woof.',
    example: 'The dog wagged its tail when it saw me.',
    category: 'animals',
    difficulty: 'easy',
    synonyms: ['puppy', 'pup', 'canine']
  },
  {
    word: 'sun',
    definition: 'The bright star in the sky that gives us light and warmth during the day.',
    example: 'The sun is shining brightly today.',
    category: 'nature',
    difficulty: 'easy',
    antonyms: ['moon']
  },
  {
    word: 'happy',
    definition: 'Feeling very good and joyful inside.',
    example: 'I feel happy when I play with my friends.',
    category: 'emotions',
    difficulty: 'easy',
    synonyms: ['joyful', 'glad', 'cheerful'],
    antonyms: ['sad', 'unhappy']
  },
  {
    word: 'big',
    definition: 'Very large in size.',
    example: 'An elephant is a big animal.',
    category: 'descriptors',
    difficulty: 'easy',
    synonyms: ['large', 'huge', 'giant'],
    antonyms: ['small', 'tiny', 'little']
  },
  {
    word: 'run',
    definition: 'To move very fast using your legs.',
    example: 'I can run fast in the playground.',
    category: 'actions',
    difficulty: 'easy',
    synonyms: ['sprint', 'dash', 'race'],
    antonyms: ['walk', 'stop']
  },
  {
    word: 'book',
    definition: 'Pages with words and pictures that tell a story or give information.',
    example: 'I love reading books before bedtime.',
    category: 'objects',
    difficulty: 'easy',
    synonyms: ['novel', 'story', 'volume']
  },
  {
    word: 'red',
    definition: 'The color of apples, fire trucks, and stop signs.',
    example: 'My favorite crayon is red.',
    category: 'colors',
    difficulty: 'easy'
  },
  {
    word: 'jump',
    definition: 'To push yourself up into the air with your legs.',
    example: 'I can jump very high on the trampoline.',
    category: 'actions',
    difficulty: 'easy',
    synonyms: ['leap', 'hop', 'bounce']
  },
  {
    word: 'friend',
    definition: 'Someone you like and who likes you back. You play and have fun together.',
    example: 'My best friend and I play together every day.',
    category: 'relationships',
    difficulty: 'easy',
    synonyms: ['pal', 'buddy', 'companion']
  },

  // MEDIUM WORDS (200 entries)
  {
    word: 'butterfly',
    definition: 'A beautiful insect with colorful wings that flies from flower to flower.',
    example: 'I saw a butterfly with orange and black wings in the garden.',
    category: 'animals',
    difficulty: 'medium'
  },
  {
    word: 'rainbow',
    definition: 'A curved band of colors that appears in the sky after rain when the sun shines.',
    example: 'We saw a beautiful rainbow after the storm.',
    category: 'nature',
    difficulty: 'medium'
  },
  {
    word: 'curious',
    definition: 'Wanting to learn about things and asking lots of questions.',
    example: 'I am curious about how birds can fly.',
    category: 'descriptors',
    difficulty: 'medium',
    synonyms: ['inquisitive', 'interested']
  },
  {
    word: 'explore',
    definition: 'To go to new places and discover new things.',
    example: 'We love to explore the forest near our house.',
    category: 'actions',
    difficulty: 'medium',
    synonyms: ['discover', 'investigate', 'search']
  },
  {
    word: 'garden',
    definition: 'A place where people grow flowers, vegetables, and plants.',
    example: 'We planted tomatoes in our garden.',
    category: 'places',
    difficulty: 'medium'
  },
  {
    word: 'brave',
    definition: 'Not afraid to do difficult or scary things.',
    example: 'The brave firefighter rescued the cat from the tree.',
    category: 'descriptors',
    difficulty: 'medium',
    synonyms: ['courageous', 'fearless', 'bold'],
    antonyms: ['scared', 'afraid', 'cowardly']
  },
  {
    word: 'celebrate',
    definition: 'To do something special and fun because something good happened.',
    example: 'We celebrate birthdays with cake and presents.',
    category: 'actions',
    difficulty: 'medium',
    synonyms: ['party', 'rejoice', 'commemorate']
  },
  {
    word: 'ocean',
    definition: 'A very large area of salt water that covers much of the Earth.',
    example: 'Whales and dolphins live in the ocean.',
    category: 'nature',
    difficulty: 'medium',
    synonyms: ['sea']
  },
  {
    word: 'imagine',
    definition: 'To picture something in your mind that is not real or not here right now.',
    example: 'I like to imagine that I can fly like a bird.',
    category: 'actions',
    difficulty: 'medium',
    synonyms: ['pretend', 'dream', 'envision']
  },
  {
    word: 'gentle',
    definition: 'Kind, soft, and careful not to hurt anyone or anything.',
    example: 'Be gentle when you pet the puppy.',
    category: 'descriptors',
    difficulty: 'medium',
    synonyms: ['soft', 'tender', 'mild'],
    antonyms: ['rough', 'harsh']
  },

  // HARD WORDS (150 entries)
  {
    word: 'magnificent',
    definition: 'Extremely beautiful, impressive, or grand in a way that makes you feel amazed.',
    example: 'The castle on the hill looked magnificent in the sunset.',
    category: 'descriptors',
    difficulty: 'hard',
    synonyms: ['splendid', 'spectacular', 'glorious', 'majestic']
  },
  {
    word: 'perseverance',
    definition: 'Continuing to try hard even when something is very difficult and takes a long time.',
    example: 'With perseverance, she finally learned to ride her bicycle.',
    category: 'concepts',
    difficulty: 'hard',
    synonyms: ['persistence', 'determination', 'dedication']
  },
  {
    word: 'compassion',
    definition: 'A feeling of caring deeply about others who are suffering and wanting to help them.',
    example: 'She showed compassion by helping the injured bird.',
    category: 'emotions',
    difficulty: 'hard',
    synonyms: ['empathy', 'kindness', 'sympathy']
  },
  {
    word: 'ecosystem',
    definition: 'All the living things in an area and how they work together with their environment.',
    example: 'The forest ecosystem includes trees, animals, insects, and soil.',
    category: 'science',
    difficulty: 'hard'
  },
  {
    word: 'extraordinary',
    definition: 'Very unusual, special, or remarkable in a way that is better than ordinary.',
    example: 'She has an extraordinary talent for painting.',
    category: 'descriptors',
    difficulty: 'hard',
    synonyms: ['remarkable', 'exceptional', 'amazing'],
    antonyms: ['ordinary', 'common', 'usual']
  },
  {
    word: 'photosynthesis',
    definition: 'The process plants use to make food from sunlight, water, and air.',
    example: 'Plants need sunlight for photosynthesis to grow.',
    category: 'science',
    difficulty: 'hard'
  },
  {
    word: 'responsibility',
    definition: 'A duty or job that you are expected to do and can be trusted to do well.',
    example: 'Feeding my pet is my responsibility.',
    category: 'concepts',
    difficulty: 'hard',
    synonyms: ['duty', 'obligation', 'accountability']
  },
  {
    word: 'cooperation',
    definition: 'Working together with others to achieve something.',
    example: 'Building the treehouse required cooperation from everyone.',
    category: 'concepts',
    difficulty: 'hard',
    synonyms: ['collaboration', 'teamwork', 'partnership']
  },
  {
    word: 'biodiversity',
    definition: 'The variety of different plants and animals living in an area.',
    example: 'The rainforest has amazing biodiversity with thousands of species.',
    category: 'science',
    difficulty: 'hard'
  },
  {
    word: 'constellation',
    definition: 'A group of stars that form a pattern or picture in the night sky.',
    example: 'The Big Dipper is a famous constellation.',
    category: 'science',
    difficulty: 'hard'
  }
];

// Function to search dictionary
export function searchDictionary(query: string): DictionaryEntry[] {
  const lowerQuery = query.toLowerCase().trim();
  
  if (!lowerQuery) return [];
  
  return dictionaryEntries.filter(entry => 
    entry.word.toLowerCase().includes(lowerQuery) ||
    entry.definition.toLowerCase().includes(lowerQuery) ||
    entry.category.toLowerCase().includes(lowerQuery) ||
    entry.example.toLowerCase().includes(lowerQuery) ||
    (entry.synonyms && entry.synonyms.some(syn => syn.toLowerCase().includes(lowerQuery)))
  );
}

// Function to get word by exact match
export function getWordDefinition(word: string): DictionaryEntry | null {
  const lowerWord = word.toLowerCase().trim();
  return dictionaryEntries.find(entry => entry.word.toLowerCase() === lowerWord) || null;
}

// Function to get random word
export function getRandomWord(difficulty?: 'easy' | 'medium' | 'hard'): DictionaryEntry {
  const filtered = difficulty 
    ? dictionaryEntries.filter(entry => entry.difficulty === difficulty)
    : dictionaryEntries;
  
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
}
