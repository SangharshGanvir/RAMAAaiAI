'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { pageTransition } from '@/utils/animations';
import ListeningGame from '@/games/ListeningGame';
import CelebrationAnimation from '@/components/CelebrationAnimation';

const allGameData = [
  // ANIMALS (20 rounds)
  { word: 'cat', images: [{ word: 'cat', emoji: '🐱' }, { word: 'dog', emoji: '🐶' }, { word: 'bird', emoji: '🐦' }, { word: 'fish', emoji: '🐟' }] },
  { word: 'dog', images: [{ word: 'dog', emoji: '🐶' }, { word: 'cat', emoji: '🐱' }, { word: 'rabbit', emoji: '🐰' }, { word: 'mouse', emoji: '🐭' }] },
  { word: 'elephant', images: [{ word: 'elephant', emoji: '🐘' }, { word: 'lion', emoji: '🦁' }, { word: 'tiger', emoji: '🐯' }, { word: 'bear', emoji: '🐻' }] },
  { word: 'monkey', images: [{ word: 'monkey', emoji: '�' }, { word: 'gorilla', emoji: '🦍' }, { word: 'panda', emoji: '🐼' }, { word: 'koala', emoji: '🐨' }] },
  { word: 'butterfly', images: [{ word: 'butterfly', emoji: '🦋' }, { word: 'bee', emoji: '�' }, { word: 'ladybug', emoji: '🐞' }, { word: 'ant', emoji: '🐜' }] },
  { word: 'fish', images: [{ word: 'fish', emoji: '🐟' }, { word: 'whale', emoji: '🐋' }, { word: 'dolphin', emoji: '🐬' }, { word: 'shark', emoji: '🦈' }] },
  { word: 'bird', images: [{ word: 'bird', emoji: '🐦' }, { word: 'eagle', emoji: '🦅' }, { word: 'owl', emoji: '🦉' }, { word: 'duck', emoji: '🦆' }] },
  { word: 'turtle', images: [{ word: 'turtle', emoji: '🐢' }, { word: 'frog', emoji: '🐸' }, { word: 'snake', emoji: '🐍' }, { word: 'lizard', emoji: '🦎' }] },
  { word: 'rabbit', images: [{ word: 'rabbit', emoji: '🐰' }, { word: 'hamster', emoji: '🐹' }, { word: 'mouse', emoji: '🐭' }, { word: 'squirrel', emoji: '🐿️' }] },
  { word: 'horse', images: [{ word: 'horse', emoji: '🐴' }, { word: 'cow', emoji: '🐮' }, { word: 'pig', emoji: '🐷' }, { word: 'sheep', emoji: '🐑' }] },
  { word: 'chicken', images: [{ word: 'chicken', emoji: '🐔' }, { word: 'rooster', emoji: '🐓' }, { word: 'duck', emoji: '🦆' }, { word: 'turkey', emoji: '🦃' }] },
  { word: 'penguin', images: [{ word: 'penguin', emoji: '🐧' }, { word: 'seal', emoji: '🦭' }, { word: 'polar bear', emoji: '🐻‍❄️' }, { word: 'walrus', emoji: '🦭' }] },
  { word: 'giraffe', images: [{ word: 'giraffe', emoji: '🦒' }, { word: 'zebra', emoji: '🦓' }, { word: 'deer', emoji: '🦌' }, { word: 'camel', emoji: '🐫' }] },
  { word: 'lion', images: [{ word: 'lion', emoji: '🦁' }, { word: 'tiger', emoji: '🐯' }, { word: 'leopard', emoji: '🐆' }, { word: 'cheetah', emoji: '🐆' }] },
  { word: 'octopus', images: [{ word: 'octopus', emoji: '🐙' }, { word: 'squid', emoji: '🦑' }, { word: 'crab', emoji: '🦀' }, { word: 'lobster', emoji: '🦞' }] },
  { word: 'spider', images: [{ word: 'spider', emoji: '🕷️' }, { word: 'scorpion', emoji: '🦂' }, { word: 'beetle', emoji: '🪲' }, { word: 'cricket', emoji: '🦗' }] },
  { word: 'snail', images: [{ word: 'snail', emoji: '🐌' }, { word: 'worm', emoji: '🪱' }, { word: 'caterpillar', emoji: '🐛' }, { word: 'slug', emoji: '🐌' }] },
  { word: 'dinosaur', images: [{ word: 'dinosaur', emoji: '🦕' }, { word: 't-rex', emoji: '🦖' }, { word: 'dragon', emoji: '🐉' }, { word: 'lizard', emoji: '🦎' }] },
  { word: 'unicorn', images: [{ word: 'unicorn', emoji: '🦄' }, { word: 'horse', emoji: '🐴' }, { word: 'zebra', emoji: '🦓' }, { word: 'deer', emoji: '🦌' }] },
  { word: 'flamingo', images: [{ word: 'flamingo', emoji: '🦩' }, { word: 'swan', emoji: '🦢' }, { word: 'peacock', emoji: '🦚' }, { word: 'parrot', emoji: '🦜' }] },
  
  // FOOD (20 rounds)
  { word: 'apple', images: [{ word: 'apple', emoji: '🍎' }, { word: 'banana', emoji: '�' }, { word: 'orange', emoji: '🍊' }, { word: 'grape', emoji: '�' }] },
  { word: 'banana', images: [{ word: 'banana', emoji: '🍌' }, { word: 'pineapple', emoji: '🍍' }, { word: 'mango', emoji: '🥭' }, { word: 'peach', emoji: '�' }] },
  { word: 'strawberry', images: [{ word: 'strawberry', emoji: '🍓' }, { word: 'cherry', emoji: '🍒' }, { word: 'watermelon', emoji: '🍉' }, { word: 'blueberry', emoji: '🫐' }] },
  { word: 'pizza', images: [{ word: 'pizza', emoji: '🍕' }, { word: 'burger', emoji: '🍔' }, { word: 'hotdog', emoji: '🌭' }, { word: 'taco', emoji: '🌮' }] },
  { word: 'cake', images: [{ word: 'cake', emoji: '🍰' }, { word: 'cupcake', emoji: '🧁' }, { word: 'cookie', emoji: '🍪' }, { word: 'donut', emoji: '🍩' }] },
  { word: 'ice cream', images: [{ word: 'ice cream', emoji: '🍦' }, { word: 'popsicle', emoji: '🍡' }, { word: 'candy', emoji: '🍬' }, { word: 'lollipop', emoji: '🍭' }] },
  { word: 'bread', images: [{ word: 'bread', emoji: '🍞' }, { word: 'croissant', emoji: '🥐' }, { word: 'bagel', emoji: '🥯' }, { word: 'pretzel', emoji: '🥨' }] },
  { word: 'cheese', images: [{ word: 'cheese', emoji: '🧀' }, { word: 'milk', emoji: '🥛' }, { word: 'butter', emoji: '🧈' }, { word: 'egg', emoji: '�' }] },
  { word: 'carrot', images: [{ word: 'carrot', emoji: '🥕' }, { word: 'broccoli', emoji: '🥦' }, { word: 'corn', emoji: '🌽' }, { word: 'pepper', emoji: '🫑' }] },
  { word: 'tomato', images: [{ word: 'tomato', emoji: '🍅' }, { word: 'eggplant', emoji: '🍆' }, { word: 'potato', emoji: '🥔' }, { word: 'onion', emoji: '🧅' }] },
  { word: 'popcorn', images: [{ word: 'popcorn', emoji: '🍿' }, { word: 'chips', emoji: '🥔' }, { word: 'fries', emoji: '🍟' }, { word: 'nachos', emoji: '🌮' }] },
  { word: 'sushi', images: [{ word: 'sushi', emoji: '🍣' }, { word: 'rice', emoji: '🍚' }, { word: 'noodles', emoji: '🍜' }, { word: 'dumpling', emoji: '🥟' }] },
  { word: 'sandwich', images: [{ word: 'sandwich', emoji: '🥪' }, { word: 'wrap', emoji: '🌯' }, { word: 'burger', emoji: '🍔' }, { word: 'hotdog', emoji: '�' }] },
  { word: 'salad', images: [{ word: 'salad', emoji: '🥗' }, { word: 'soup', emoji: '🍲' }, { word: 'stew', emoji: '🍛' }, { word: 'pasta', emoji: '🍝' }] },
  { word: 'lemon', images: [{ word: 'lemon', emoji: '�' }, { word: 'lime', emoji: '🍈' }, { word: 'coconut', emoji: '🥥' }, { word: 'kiwi', emoji: '🥝' }] },
  { word: 'avocado', images: [{ word: 'avocado', emoji: '🥑' }, { word: 'cucumber', emoji: '🥒' }, { word: 'pickle', emoji: '🥒' }, { word: 'olive', emoji: '🫒' }] },
  { word: 'peanut', images: [{ word: 'peanut', emoji: '🥜' }, { word: 'almond', emoji: '🌰' }, { word: 'walnut', emoji: '�' }, { word: 'cashew', emoji: '🥜' }] },
  { word: 'honey', images: [{ word: 'honey', emoji: '🍯' }, { word: 'jam', emoji: '🍓' }, { word: 'syrup', emoji: '🍯' }, { word: 'sugar', emoji: '🧂' }] },
  { word: 'coffee', images: [{ word: 'coffee', emoji: '☕' }, { word: 'tea', emoji: '🍵' }, { word: 'juice', emoji: '🧃' }, { word: 'soda', emoji: '🥤' }] },
  { word: 'chocolate', images: [{ word: 'chocolate', emoji: '🍫' }, { word: 'candy', emoji: '🍬' }, { word: 'lollipop', emoji: '🍭' }, { word: 'gum', emoji: '�' }] },
  
  // VEHICLES (15 rounds)
  { word: 'car', images: [{ word: 'car', emoji: '🚗' }, { word: 'bus', emoji: '🚌' }, { word: 'truck', emoji: '🚚' }, { word: 'van', emoji: '🚐' }] },
  { word: 'train', images: [{ word: 'train', emoji: '🚂' }, { word: 'subway', emoji: '🚇' }, { word: 'tram', emoji: '🚊' }, { word: 'monorail', emoji: '🚝' }] },
  { word: 'airplane', images: [{ word: 'airplane', emoji: '✈️' }, { word: 'helicopter', emoji: '🚁' }, { word: 'rocket', emoji: '🚀' }, { word: 'ufo', emoji: '🛸' }] },
  { word: 'bike', images: [{ word: 'bike', emoji: '🚲' }, { word: 'scooter', emoji: '🛴' }, { word: 'skateboard', emoji: '🛹' }, { word: 'motorcycle', emoji: '🏍️' }] },
  { word: 'boat', images: [{ word: 'boat', emoji: '⛵' }, { word: 'ship', emoji: '🚢' }, { word: 'yacht', emoji: '🛥️' }, { word: 'canoe', emoji: '�' }] },
  { word: 'ambulance', images: [{ word: 'ambulance', emoji: '🚑' }, { word: 'fire truck', emoji: '�' }, { word: 'police car', emoji: '🚓' }, { word: 'taxi', emoji: '🚕' }] },
  { word: 'tractor', images: [{ word: 'tractor', emoji: '🚜' }, { word: 'bulldozer', emoji: '🚜' }, { word: 'crane', emoji: '🏗️' }, { word: 'excavator', emoji: '�' }] },
  { word: 'balloon', images: [{ word: 'balloon', emoji: '🎈' }, { word: 'parachute', emoji: '🪂' }, { word: 'kite', emoji: '🪁' }, { word: 'glider', emoji: '🪂' }] },
  { word: 'rocket', images: [{ word: 'rocket', emoji: '🚀' }, { word: 'satellite', emoji: '🛰️' }, { word: 'spaceship', emoji: '🛸' }, { word: 'shuttle', emoji: '�' }] },
  { word: 'trolley', images: [{ word: 'trolley', emoji: '🚎' }, { word: 'bus', emoji: '🚌' }, { word: 'tram', emoji: '🚊' }, { word: 'cable car', emoji: '🚡' }] },
  { word: 'sled', images: [{ word: 'sled', emoji: '🛷' }, { word: 'snowboard', emoji: '🏂' }, { word: 'ski', emoji: '⛷️' }, { word: 'ice skate', emoji: '⛸️' }] },
  { word: 'wheelchair', images: [{ word: 'wheelchair', emoji: '♿' }, { word: 'stroller', emoji: '🚼' }, { word: 'walker', emoji: '🦽' }, { word: 'cane', emoji: '🦯' }] },
  { word: 'roller coaster', images: [{ word: 'roller coaster', emoji: '🎢' }, { word: 'ferris wheel', emoji: '🎡' }, { word: 'carousel', emoji: '🎠' }, { word: 'swing', emoji: '🎪' }] },
  { word: 'gondola', images: [{ word: 'gondola', emoji: '🚡' }, { word: 'cable car', emoji: '🚠' }, { word: 'chairlift', emoji: '🚡' }, { word: 'funicular', emoji: '🚞' }] },
  { word: 'rickshaw', images: [{ word: 'rickshaw', emoji: '🛺' }, { word: 'cart', emoji: '🛒' }, { word: 'wagon', emoji: '🛺' }, { word: 'carriage', emoji: '🛺' }] },
  
  // NATURE (15 rounds)
  { word: 'sun', images: [{ word: 'sun', emoji: '☀️' }, { word: 'moon', emoji: '🌙' }, { word: 'star', emoji: '⭐' }, { word: 'cloud', emoji: '☁️' }] },
  { word: 'tree', images: [{ word: 'tree', emoji: '🌳' }, { word: 'palm tree', emoji: '🌴' }, { word: 'pine tree', emoji: '🌲' }, { word: 'cactus', emoji: '🌵' }] },
  { word: 'flower', images: [{ word: 'flower', emoji: '�' }, { word: 'rose', emoji: '🌹' }, { word: 'sunflower', emoji: '🌻' }, { word: 'tulip', emoji: '🌷' }] },
  { word: 'rainbow', images: [{ word: 'rainbow', emoji: '🌈' }, { word: 'rain', emoji: '🌧️' }, { word: 'snow', emoji: '❄️' }, { word: 'lightning', emoji: '⚡' }] },
  { word: 'mountain', images: [{ word: 'mountain', emoji: '⛰️' }, { word: 'volcano', emoji: '🌋' }, { word: 'hill', emoji: '⛰️' }, { word: 'cliff', emoji: '�️' }] },
  { word: 'ocean', images: [{ word: 'ocean', emoji: '🌊' }, { word: 'lake', emoji: '🏞️' }, { word: 'river', emoji: '🏞️' }, { word: 'waterfall', emoji: '💧' }] },
  { word: 'beach', images: [{ word: 'beach', emoji: '🏖️' }, { word: 'island', emoji: '🏝️' }, { word: 'desert', emoji: '🏜️' }, { word: 'oasis', emoji: '🏝️' }] },
  { word: 'forest', images: [{ word: 'forest', emoji: '🌲' }, { word: 'jungle', emoji: '🌴' }, { word: 'woods', emoji: '🌳' }, { word: 'grove', emoji: '🌲' }] },
  { word: 'leaf', images: [{ word: 'leaf', emoji: '🍃' }, { word: 'grass', emoji: '🌿' }, { word: 'herb', emoji: '🌱' }, { word: 'clover', emoji: '☘️' }] },
  { word: 'mushroom', images: [{ word: 'mushroom', emoji: '🍄' }, { word: 'toadstool', emoji: '🍄' }, { word: 'fungus', emoji: '🍄' }, { word: 'spore', emoji: '�' }] },
  { word: 'rock', images: [{ word: 'rock', emoji: '🪨' }, { word: 'stone', emoji: '🪨' }, { word: 'pebble', emoji: '🪨' }, { word: 'boulder', emoji: '🪨' }] },
  { word: 'fire', images: [{ word: 'fire', emoji: '🔥' }, { word: 'flame', emoji: '🔥' }, { word: 'campfire', emoji: '🏕️' }, { word: 'bonfire', emoji: '🔥' }] },
  { word: 'wind', images: [{ word: 'wind', emoji: '💨' }, { word: 'tornado', emoji: '🌪️' }, { word: 'hurricane', emoji: '🌀' }, { word: 'breeze', emoji: '💨' }] },
  { word: 'earth', images: [{ word: 'earth', emoji: '🌍' }, { word: 'globe', emoji: '🌎' }, { word: 'planet', emoji: '🪐' }, { word: 'world', emoji: '🌏' }] },
  { word: 'comet', images: [{ word: 'comet', emoji: '☄️' }, { word: 'meteor', emoji: '☄️' }, { word: 'asteroid', emoji: '☄️' }, { word: 'shooting star', emoji: '🌠' }] },
  
  // OBJECTS & THINGS (15 rounds)
  { word: 'book', images: [{ word: 'book', emoji: '📚' }, { word: 'notebook', emoji: '📓' }, { word: 'magazine', emoji: '📰' }, { word: 'newspaper', emoji: '�' }] },
  { word: 'pencil', images: [{ word: 'pencil', emoji: '✏️' }, { word: 'pen', emoji: '🖊️' }, { word: 'crayon', emoji: '🖍️' }, { word: 'marker', emoji: '�️' }] },
  { word: 'ball', images: [{ word: 'ball', emoji: '⚽' }, { word: 'basketball', emoji: '🏀' }, { word: 'baseball', emoji: '⚾' }, { word: 'tennis ball', emoji: '🎾' }] },
  { word: 'toy', images: [{ word: 'toy', emoji: '🧸' }, { word: 'doll', emoji: '🪆' }, { word: 'robot', emoji: '🤖' }, { word: 'puzzle', emoji: '🧩' }] },
  { word: 'phone', images: [{ word: 'phone', emoji: '📱' }, { word: 'computer', emoji: '💻' }, { word: 'tablet', emoji: '📱' }, { word: 'laptop', emoji: '�' }] },
  { word: 'camera', images: [{ word: 'camera', emoji: '📷' }, { word: 'video camera', emoji: '📹' }, { word: 'telescope', emoji: '🔭' }, { word: 'microscope', emoji: '�' }] },
  { word: 'clock', images: [{ word: 'clock', emoji: '🕐' }, { word: 'watch', emoji: '⌚' }, { word: 'timer', emoji: '⏱️' }, { word: 'alarm', emoji: '⏰' }] },
  { word: 'key', images: [{ word: 'key', emoji: '🔑' }, { word: 'lock', emoji: '🔒' }, { word: 'door', emoji: '🚪' }, { word: 'gate', emoji: '🚧' }] },
  { word: 'umbrella', images: [{ word: 'umbrella', emoji: '☂️' }, { word: 'parasol', emoji: '⛱️' }, { word: 'raincoat', emoji: '🧥' }, { word: 'boots', emoji: '👢' }] },
  { word: 'gift', images: [{ word: 'gift', emoji: '🎁' }, { word: 'present', emoji: '🎁' }, { word: 'box', emoji: '📦' }, { word: 'package', emoji: '📦' }] },
  { word: 'balloon', images: [{ word: 'balloon', emoji: '🎈' }, { word: 'confetti', emoji: '🎊' }, { word: 'ribbon', emoji: '🎀' }, { word: 'bow', emoji: '🎀' }] },
  { word: 'scissors', images: [{ word: 'scissors', emoji: '✂️' }, { word: 'knife', emoji: '🔪' }, { word: 'axe', emoji: '🪓' }, { word: 'saw', emoji: '🪚' }] },
  { word: 'hammer', images: [{ word: 'hammer', emoji: '🔨' }, { word: 'wrench', emoji: '🔧' }, { word: 'screwdriver', emoji: '🪛' }, { word: 'drill', emoji: '🔩' }] },
  { word: 'magnet', images: [{ word: 'magnet', emoji: '🧲' }, { word: 'battery', emoji: '🔋' }, { word: 'plug', emoji: '🔌' }, { word: 'bulb', emoji: '💡' }] },
  { word: 'trophy', images: [{ word: 'trophy', emoji: '🏆' }, { word: 'medal', emoji: '🏅' }, { word: 'ribbon', emoji: '�️' }, { word: 'crown', emoji: '👑' }] },
  
  // EMOTIONS & EXPRESSIONS (10 rounds)
  { word: 'happy', images: [{ word: 'happy', emoji: '😊' }, { word: 'excited', emoji: '🤩' }, { word: 'joyful', emoji: '😄' }, { word: 'cheerful', emoji: '😁' }] },
  { word: 'sad', images: [{ word: 'sad', emoji: '😢' }, { word: 'crying', emoji: '😭' }, { word: 'upset', emoji: '😞' }, { word: 'disappointed', emoji: '😔' }] },
  { word: 'angry', images: [{ word: 'angry', emoji: '😠' }, { word: 'mad', emoji: '😡' }, { word: 'furious', emoji: '🤬' }, { word: 'annoyed', emoji: '😤' }] },
  { word: 'sleepy', images: [{ word: 'sleepy', emoji: '😴' }, { word: 'tired', emoji: '🥱' }, { word: 'yawning', emoji: '😪' }, { word: 'drowsy', emoji: '�' }] },
  { word: 'surprised', images: [{ word: 'surprised', emoji: '😲' }, { word: 'shocked', emoji: '😱' }, { word: 'amazed', emoji: '😮' }, { word: 'astonished', emoji: '😯' }] },
  { word: 'love', images: [{ word: 'love', emoji: '😍' }, { word: 'heart', emoji: '❤️' }, { word: 'kiss', emoji: '😘' }, { word: 'hug', emoji: '🤗' }] },
  { word: 'thinking', images: [{ word: 'thinking', emoji: '🤔' }, { word: 'wondering', emoji: '🤨' }, { word: 'confused', emoji: '😕' }, { word: 'puzzled', emoji: '😵' }] },
  { word: 'laughing', images: [{ word: 'laughing', emoji: '😂' }, { word: 'giggling', emoji: '🤭' }, { word: 'smiling', emoji: '😊' }, { word: 'grinning', emoji: '😁' }] },
  { word: 'cool', images: [{ word: 'cool', emoji: '😎' }, { word: 'awesome', emoji: '🤩' }, { word: 'amazing', emoji: '😍' }, { word: 'fantastic', emoji: '🥳' }] },
  { word: 'sick', images: [{ word: 'sick', emoji: '🤢' }, { word: 'ill', emoji: '🤒' }, { word: 'hurt', emoji: '🤕' }, { word: 'injured', emoji: '🩹' }] },
  
  // PLACES & BUILDINGS (5 rounds)
  { word: 'house', images: [{ word: 'house', emoji: '🏠' }, { word: 'home', emoji: '🏡' }, { word: 'building', emoji: '🏢' }, { word: 'apartment', emoji: '🏘️' }] },
  { word: 'school', images: [{ word: 'school', emoji: '🏫' }, { word: 'library', emoji: '📚' }, { word: 'university', emoji: '🎓' }, { word: 'classroom', emoji: '🏫' }] },
  { word: 'hospital', images: [{ word: 'hospital', emoji: '🏥' }, { word: 'clinic', emoji: '🏥' }, { word: 'pharmacy', emoji: '💊' }, { word: 'doctor', emoji: '�‍⚕️' }] },
  { word: 'park', images: [{ word: 'park', emoji: '🏞️' }, { word: 'playground', emoji: '�' }, { word: 'garden', emoji: '🏡' }, { word: 'zoo', emoji: '🦁' }] },
  { word: 'castle', images: [{ word: 'castle', emoji: '🏰' }, { word: 'palace', emoji: '🏛️' }, { word: 'tower', emoji: '🗼' }, { word: 'fortress', emoji: '🏰' }] },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ListeningPage() {
  const router = useRouter();
  const [showCelebration, setShowCelebration] = useState(false);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [gameData, setGameData] = useState<typeof allGameData>([]);
  const maxRounds = gameData.length;

  useEffect(() => {
    setGameData(shuffleArray(allGameData));
  }, []);

  const handleComplete = () => {
    setShowCelebration(true);
    
    setTimeout(() => {
      setShowCelebration(false);
      if (roundsCompleted < maxRounds - 1) {
        setRoundsCompleted(roundsCompleted + 1);
      } else {
        router.push('/dashboard');
      }
    }, 2000);
  };

  return (
    <motion.div
      className="min-h-screen p-4 md:p-8"
      {...pageTransition}
    >
      {showCelebration && <CelebrationAnimation />}
      
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Listening Game</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-gray-200 rounded-full font-medium"
          >
            ← Back
          </button>
        </div>

        <div className="bg-white rounded-2xl p-8 card-shadow-lg">
          {gameData.length > 0 && (
            <>
              <ListeningGame 
                word={gameData[roundsCompleted].word}
                images={gameData[roundsCompleted].images}
                onComplete={handleComplete} 
              />
              <div className="mt-4 text-center text-gray-600">
                Round {roundsCompleted + 1} of {maxRounds}
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
