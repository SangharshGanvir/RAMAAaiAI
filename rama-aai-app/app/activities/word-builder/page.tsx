'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { pageTransition } from '@/utils/animations';
import WordBuilderGame from '@/games/WordBuilderGame';
import CelebrationAnimation from '@/components/CelebrationAnimation';

const allWords = [
  // Easy 3-letter words (30 words)
  'cat', 'dog', 'sun', 'bat', 'hat', 'pen', 'cup', 'box', 'fox', 'ant',
  'bee', 'car', 'bus', 'egg', 'ice', 'jam', 'key', 'leg', 'map', 'net',
  'owl', 'pig', 'rat', 'sea', 'tea', 'van', 'web', 'zoo', 'arm', 'bed',
  
  // Medium 4-letter words (40 words)
  'moon', 'tree', 'book', 'ball', 'home', 'fish', 'bird', 'frog', 'duck', 'goat',
  'bear', 'lion', 'star', 'rain', 'snow', 'wind', 'fire', 'door', 'hand', 'foot',
  'head', 'nose', 'eyes', 'ears', 'hair', 'face', 'neck', 'back', 'knee', 'toes',
  'milk', 'cake', 'rice', 'soup', 'meat', 'corn', 'bean', 'pear', 'plum', 'lime',
  
  // Harder 5-letter words (30 words)
  'apple', 'house', 'water', 'happy', 'smile', 'bread', 'chair', 'table', 'plant', 'cloud',
  'grass', 'beach', 'ocean', 'river', 'stone', 'horse', 'sheep', 'tiger', 'zebra', 'snake',
  'whale', 'eagle', 'robin', 'daisy', 'tulip', 'lemon', 'peach', 'grape', 'melon', 'mango',
  
  // Advanced 6+ letter words (20 words)
  'friend', 'flower', 'garden', 'rabbit', 'turtle', 'monkey', 'giraffe', 'elephant', 'dolphin', 'penguin',
  'rainbow', 'thunder', 'mountain', 'butterfly', 'dragonfly', 'strawberry', 'pineapple', 'watermelon', 'chocolate', 'umbrella'
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function WordBuilderPage() {
  const router = useRouter();
  const [showCelebration, setShowCelebration] = useState(false);
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    setWords(shuffleArray(allWords));
  }, []);

  const handleComplete = () => {
    setShowCelebration(true);
    
    setTimeout(() => {
      setShowCelebration(false);
      if (currentWordIndex < words.length - 1) {
        setCurrentWordIndex(currentWordIndex + 1);
      } else {
        router.push('/dashboard');
      }
    }, 3000);
  };

  return (
    <motion.div
      className="min-h-screen p-4 md:p-8"
      {...pageTransition}
    >
      {showCelebration && <CelebrationAnimation />}
      
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Word Builder</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-gray-200 rounded-full font-medium"
          >
            ← Back
          </button>
        </div>

        <div className="bg-white rounded-2xl p-8 card-shadow-lg">
          {words.length > 0 && (
            <WordBuilderGame 
              word={words[currentWordIndex]} 
              onComplete={handleComplete} 
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
