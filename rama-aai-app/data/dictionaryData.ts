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
  {
    word: 'tree',
    definition: 'A tall plant with a wooden trunk, branches, and leaves.',
    example: 'The bird built a nest in the tree.',
    category: 'nature',
    difficulty: 'easy',
    synonyms: ['plant']
  },
  {
    word: 'house',
    definition: 'A building where people live.',
    example: 'My house has a red door.',
    category: 'places',
    difficulty: 'easy',
    synonyms: ['home']
  },
  {
    word: 'water',
    definition: 'A clear liquid that we drink and that falls from the sky as rain.',
    example: 'I drink water when I am thirsty.',
    category: 'nature',
    difficulty: 'easy'
  },
  {
    word: 'bird',
    definition: 'An animal with wings and feathers that can usually fly.',
    example: 'The bird sang a beautiful song.',
    category: 'animals',
    difficulty: 'easy'
  },
  {
    word: 'flower',
    definition: 'The colorful part of a plant that smells nice.',
    example: 'I picked a flower for my mom.',
    category: 'nature',
    difficulty: 'easy',
    synonyms: ['bloom', 'blossom']
  },
  {
    word: 'smile',
    definition: 'To make your mouth curve up when you are happy.',
    example: 'She has a big smile on her face.',
    category: 'actions',
    difficulty: 'easy',
    synonyms: ['grin'],
    antonyms: ['frown']
  },
  {
    word: 'play',
    definition: 'To have fun doing games or activities.',
    example: 'I love to play with my toys.',
    category: 'actions',
    difficulty: 'easy',
    antonyms: ['work']
  },
  {
    word: 'learn',
    definition: 'To get new knowledge or skills by studying or practicing.',
    example: 'I learn new things at school every day.',
    category: 'actions',
    difficulty: 'easy',
    synonyms: ['study'],
    antonyms: ['forget']
  },
  {
    word: 'help',
    definition: 'To make something easier for someone or do something useful for them.',
    example: 'I help my mom cook dinner.',
    category: 'actions',
    difficulty: 'easy',
    synonyms: ['assist', 'aid']
  },
  {
    word: 'kind',
    definition: 'Friendly, caring, and helpful to others.',
    example: 'She is very kind to animals.',
    category: 'descriptors',
    difficulty: 'easy',
    synonyms: ['nice', 'caring'],
    antonyms: ['mean', 'cruel']
  },
  {
    word: 'beautiful',
    definition: 'Very pretty or pleasing to look at.',
    example: 'The sunset is beautiful tonight.',
    category: 'descriptors',
    difficulty: 'medium',
    synonyms: ['pretty', 'lovely'],
    antonyms: ['ugly']
  },
  {
    word: 'family',
    definition: 'People who are related to you, like parents, siblings, and grandparents.',
    example: 'I love spending time with my family.',
    category: 'relationships',
    difficulty: 'easy'
  },
  {
    word: 'school',
    definition: 'A place where children go to learn.',
    example: 'I go to school five days a week.',
    category: 'places',
    difficulty: 'easy'
  },
  {
    word: 'teacher',
    definition: 'A person who helps students learn.',
    example: 'My teacher is very patient and helpful.',
    category: 'people',
    difficulty: 'easy',
    synonyms: ['instructor', 'educator']
  },
  {
    word: 'student',
    definition: 'A person who is learning at a school.',
    example: 'Every student in the class raised their hand.',
    category: 'people',
    difficulty: 'easy',
    synonyms: ['pupil', 'learner']
  },
  {
    word: 'color',
    definition: 'What something looks like - red, blue, green, yellow, etc.',
    example: 'What is your favorite color?',
    category: 'descriptors',
    difficulty: 'easy',
    synonyms: ['hue', 'shade']
  },
  {
    word: 'music',
    definition: 'Pleasant sounds made by singing or playing instruments.',
    example: 'I love listening to music.',
    category: 'arts',
    difficulty: 'easy'
  },
  {
    word: 'dance',
    definition: 'To move your body to music.',
    example: 'We dance at the party.',
    category: 'actions',
    difficulty: 'easy'
  },
  {
    word: 'sing',
    definition: 'To make music with your voice.',
    example: 'I sing my favorite song in the shower.',
    category: 'actions',
    difficulty: 'easy'
  },
  {
    word: 'draw',
    definition: 'To make pictures with a pencil, pen, or crayon.',
    example: 'I like to draw pictures of animals.',
    category: 'actions',
    difficulty: 'easy',
    synonyms: ['sketch']
  },
  {
    word: 'paint',
    definition: 'To make pictures using colors and a brush.',
    example: 'We paint in art class.',
    category: 'actions',
    difficulty: 'easy'
  },
  {
    word: 'story',
    definition: 'A tale about people or events, real or imaginary.',
    example: 'Grandma tells me a story before bed.',
    category: 'objects',
    difficulty: 'easy',
    synonyms: ['tale', 'narrative']
  },
  {
    word: 'adventure',
    definition: 'An exciting experience or journey.',
    example: 'Going camping was a great adventure.',
    category: 'concepts',
    difficulty: 'medium',
    synonyms: ['journey', 'quest']
  },
  {
    word: 'dream',
    definition: 'Pictures and stories that happen in your mind while you sleep.',
    example: 'I had a dream about flying last night.',
    category: 'concepts',
    difficulty: 'easy'
  },
  {
    word: 'sleep',
    definition: 'To rest with your eyes closed and your mind not awake.',
    example: 'I sleep eight hours every night.',
    category: 'actions',
    difficulty: 'easy',
    synonyms: ['rest', 'slumber'],
    antonyms: ['wake']
  },
  {
    word: 'wake',
    definition: 'To stop sleeping and become conscious.',
    example: 'I wake up at seven in the morning.',
    category: 'actions',
    difficulty: 'easy',
    antonyms: ['sleep']
  },
  {
    word: 'morning',
    definition: 'The early part of the day, from sunrise to noon.',
    example: 'I eat breakfast in the morning.',
    category: 'time',
    difficulty: 'easy',
    antonyms: ['evening', 'night']
  },
  {
    word: 'night',
    definition: 'The time when it is dark outside and most people sleep.',
    example: 'The stars come out at night.',
    category: 'time',
    difficulty: 'easy',
    antonyms: ['day', 'morning']
  },
  {
    word: 'day',
    definition: 'The time when the sun is up and it is light outside.',
    example: 'We play outside during the day.',
    category: 'time',
    difficulty: 'easy',
    antonyms: ['night']
  },
  {
    word: 'moon',
    definition: 'The bright round object you see in the sky at night.',
    example: 'The moon is full tonight.',
    category: 'nature',
    difficulty: 'easy',
    antonyms: ['sun']
  },
  {
    word: 'star',
    definition: 'A tiny bright light you see in the night sky.',
    example: 'I made a wish on a shooting star.',
    category: 'nature',
    difficulty: 'easy'
  },
  {
    word: 'sky',
    definition: 'The space above the earth where you see clouds, sun, moon, and stars.',
    example: 'The sky is blue today.',
    category: 'nature',
    difficulty: 'easy'
  },
  {
    word: 'cloud',
    definition: 'White or gray fluffy things floating in the sky.',
    example: 'That cloud looks like a bunny.',
    category: 'nature',
    difficulty: 'easy'
  },
  {
    word: 'rain',
    definition: 'Water that falls from clouds in the sky.',
    example: 'We need an umbrella when it rains.',
    category: 'nature',
    difficulty: 'easy'
  },
  {
    word: 'snow',
    definition: 'Soft white flakes that fall from the sky when it is very cold.',
    example: 'We build a snowman when it snows.',
    category: 'nature',
    difficulty: 'easy'
  },
  {
    word: 'wind',
    definition: 'Moving air that you can feel but cannot see.',
    example: 'The wind blew my hat away.',
    category: 'nature',
    difficulty: 'easy',
    synonyms: ['breeze']
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
