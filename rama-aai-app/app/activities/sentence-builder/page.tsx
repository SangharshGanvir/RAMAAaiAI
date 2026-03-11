'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { pageTransition } from '@/utils/animations';
import SentenceBuilderGame from '@/games/SentenceBuilderGame';
import CelebrationAnimation from '@/components/CelebrationAnimation';

export default function SentenceBuilderPage() {
  const router = useRouter();
  const [showCelebration, setShowCelebration] = useState(false);
  const sentences = [
    'I am happy',
    'The cat runs',
    'I like books',
    'The sun is bright',
    'Birds can fly'
  ];
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

  const handleComplete = () => {
    setShowCelebration(true);
    
    setTimeout(() => {
      setShowCelebration(false);
      if (currentSentenceIndex < sentences.length - 1) {
        setCurrentSentenceIndex(currentSentenceIndex + 1);
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
          <h1 className="text-4xl font-bold text-primary">Sentence Builder</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-gray-200 rounded-full font-medium"
          >
            ← Back
          </button>
        </div>

        <div className="bg-white rounded-2xl p-8 card-shadow-lg">
          <SentenceBuilderGame 
            sentence={sentences[currentSentenceIndex]} 
            onComplete={handleComplete} 
          />
        </div>
      </div>
    </motion.div>
  );
}
