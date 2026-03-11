'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { buttonHover, buttonTap } from '@/utils/animations';

interface SentenceBuilderGameProps {
  sentence: string;
  onComplete: (score: number) => void;
}

export default function SentenceBuilderGame({ sentence, onComplete }: SentenceBuilderGameProps) {
  const words = sentence.split(' ');
  const shuffledWords = [...words].sort(() => Math.random() - 0.5);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState(shuffledWords);

  const handleWordClick = (word: string, index: number) => {
    setSelectedWords([...selectedWords, word]);
    setAvailableWords(availableWords.filter((_, i) => i !== index));
  };

  const handleRemoveWord = (index: number) => {
    const word = selectedWords[index];
    setAvailableWords([...availableWords, word]);
    setSelectedWords(selectedWords.filter((_, i) => i !== index));
  };

  const checkAnswer = () => {
    const builtSentence = selectedWords.join(' ');
    if (builtSentence === sentence) {
      onComplete(100);
    } else {
      alert('Not quite right. Try again!');
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <h2 className="text-3xl font-bold text-primary">Build the Sentence</h2>
      
      <div className="text-6xl">📝</div>

      <div className="flex flex-wrap gap-2 min-h-[100px] items-center justify-center max-w-2xl">
        {selectedWords.map((word, index) => (
          <motion.button
            key={index}
            onClick={() => handleRemoveWord(index)}
            className="px-4 py-2 bg-primary text-white text-lg font-medium rounded-lg"
            whileHover={buttonHover}
            whileTap={buttonTap}
          >
            {word}
          </motion.button>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 justify-center max-w-2xl">
        {availableWords.map((word, index) => (
          <motion.button
            key={index}
            onClick={() => handleWordClick(word, index)}
            className="px-4 py-2 bg-blue-500 text-white text-lg font-medium rounded-lg"
            whileHover={buttonHover}
            whileTap={buttonTap}
          >
            {word}
          </motion.button>
        ))}
      </div>

      {selectedWords.length === words.length && (
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
