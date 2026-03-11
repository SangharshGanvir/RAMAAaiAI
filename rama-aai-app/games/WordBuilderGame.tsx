'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { buttonHover, buttonTap } from '@/utils/animations';
import { addWordLearned } from '@/progress/progressTracker';

interface WordBuilderGameProps {
  word: string;
  onComplete: (score: number) => void;
}

export default function WordBuilderGame({ word, onComplete }: WordBuilderGameProps) {
  const letters = word.toUpperCase().split('');
  const shuffledLetters = [...letters].sort(() => Math.random() - 0.5);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState(shuffledLetters);

  const handleLetterClick = (letter: string, index: number) => {
    setSelectedLetters([...selectedLetters, letter]);
    setAvailableLetters(availableLetters.filter((_, i) => i !== index));
  };

  const handleRemoveLetter = (index: number) => {
    const letter = selectedLetters[index];
    setAvailableLetters([...availableLetters, letter]);
    setSelectedLetters(selectedLetters.filter((_, i) => i !== index));
  };

  const checkAnswer = () => {
    const builtWord = selectedLetters.join('');
    if (builtWord === word.toUpperCase()) {
      addWordLearned(word);
      onComplete(100);
    } else {
      alert('Not quite right. Try again!');
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <h2 className="text-3xl font-bold text-primary">Build the Word</h2>
      
      <div className="text-6xl">🎯</div>

      <div className="flex gap-2 min-h-[80px] items-center">
        {selectedLetters.map((letter, index) => (
          <motion.button
            key={index}
            onClick={() => handleRemoveLetter(index)}
            className="w-16 h-16 bg-primary text-white text-2xl font-bold rounded-lg"
            whileHover={buttonHover}
            whileTap={buttonTap}
          >
            {letter}
          </motion.button>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 justify-center max-w-md">
        {availableLetters.map((letter, index) => (
          <motion.button
            key={index}
            onClick={() => handleLetterClick(letter, index)}
            className="w-16 h-16 bg-blue-500 text-white text-2xl font-bold rounded-lg"
            whileHover={buttonHover}
            whileTap={buttonTap}
          >
            {letter}
          </motion.button>
        ))}
      </div>

      {selectedLetters.length === letters.length && (
        <motion.button
          onClick={checkAnswer}
          className="px-8 py-4 bg-green-500 text-white text-xl font-bold rounded-full"
          whileHover={buttonHover}
          whileTap={buttonTap}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          Check Answer ✓
        </motion.button>
      )}
    </div>
  );
}
