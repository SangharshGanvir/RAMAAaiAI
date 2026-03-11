'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { pageTransition } from '@/utils/animations';
import WordBuilderGame from '@/games/WordBuilderGame';
import CelebrationAnimation from '@/components/CelebrationAnimation';

const allWords = [
  // Easy 3-letter words
  'cat', 'dog', 'sun', 'bat', 'hat', 'pen',
  // Medium 4-letter words
  'moon', 'tree', 'book', 'ball', 'home', 'fish', 'bird', 'frog',
  // Harder 5+ letter words
  'apple', 'house', 'water', 'happy', 'smile', 'friend', 'flower', 'garden'
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
