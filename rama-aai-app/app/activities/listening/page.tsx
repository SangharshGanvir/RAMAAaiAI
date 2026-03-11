'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { pageTransition } from '@/utils/animations';
import ListeningGame from '@/games/ListeningGame';
import CelebrationAnimation from '@/components/CelebrationAnimation';

const allGameData = [
  {
    word: 'cat',
    images: [
      { word: 'cat', emoji: '🐱' },
      { word: 'dog', emoji: '🐶' },
      { word: 'bird', emoji: '🐦' },
      { word: 'fish', emoji: '🐟' }
    ]
  },
  {
    word: 'sun',
    images: [
      { word: 'moon', emoji: '🌙' },
      { word: 'sun', emoji: '☀️' },
      { word: 'star', emoji: '⭐' },
      { word: 'cloud', emoji: '☁️' }
    ]
  },
  {
    word: 'tree',
    images: [
      { word: 'flower', emoji: '🌸' },
      { word: 'tree', emoji: '🌳' },
      { word: 'grass', emoji: '🌿' },
      { word: 'leaf', emoji: '🍃' }
    ]
  },
  {
    word: 'book',
    images: [
      { word: 'book', emoji: '📚' },
      { word: 'pencil', emoji: '✏️' },
      { word: 'ball', emoji: '⚽' },
      { word: 'toy', emoji: '🧸' }
    ]
  },
  {
    word: 'apple',
    images: [
      { word: 'banana', emoji: '🍌' },
      { word: 'orange', emoji: '🍊' },
      { word: 'apple', emoji: '🍎' },
      { word: 'grape', emoji: '🍇' }
    ]
  },
  {
    word: 'car',
    images: [
      { word: 'car', emoji: '🚗' },
      { word: 'bus', emoji: '🚌' },
      { word: 'train', emoji: '🚂' },
      { word: 'bike', emoji: '🚲' }
    ]
  },
  {
    word: 'house',
    images: [
      { word: 'house', emoji: '🏠' },
      { word: 'school', emoji: '🏫' },
      { word: 'park', emoji: '🏞️' },
      { word: 'shop', emoji: '🏪' }
    ]
  },
  {
    word: 'happy',
    images: [
      { word: 'happy', emoji: '😊' },
      { word: 'sad', emoji: '😢' },
      { word: 'angry', emoji: '😠' },
      { word: 'sleepy', emoji: '😴' }
    ]
  },
  {
    word: 'rainbow',
    images: [
      { word: 'rainbow', emoji: '🌈' },
      { word: 'rain', emoji: '🌧️' },
      { word: 'snow', emoji: '❄️' },
      { word: 'wind', emoji: '💨' }
    ]
  },
  {
    word: 'heart',
    images: [
      { word: 'heart', emoji: '❤️' },
      { word: 'star', emoji: '⭐' },
      { word: 'diamond', emoji: '💎' },
      { word: 'crown', emoji: '👑' }
    ]
  }
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
