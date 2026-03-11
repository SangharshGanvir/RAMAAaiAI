'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { pageTransition } from '@/utils/animations';
import AlphabetGame from '@/games/AlphabetGame';
import CelebrationAnimation from '@/components/CelebrationAnimation';
import { getNextLesson } from '@/ai/lessonGenerator';
import { useApp } from '@/contexts/AppContext';

export default function AlphabetLearningPage() {
  const router = useRouter();
  const { progress } = useApp();
  const [currentLetter, setCurrentLetter] = useState(getNextLesson(progress.lettersLearned));
  const [showCelebration, setShowCelebration] = useState(false);

  const handleComplete = (score: number) => {
    setShowCelebration(true);
    
    setTimeout(() => {
      setShowCelebration(false);
      const nextLetter = getNextLesson(progress.lettersLearned);
      if (nextLetter !== currentLetter) {
        setCurrentLetter(nextLetter);
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
          <h1 className="text-4xl font-bold text-primary">Alphabet Learning</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-gray-200 rounded-full font-medium"
          >
            ← Back
          </button>
        </div>

        <div className="bg-white rounded-2xl p-8 card-shadow-lg">
          <AlphabetGame letter={currentLetter} onComplete={handleComplete} />
        </div>
      </div>
    </motion.div>
  );
}
