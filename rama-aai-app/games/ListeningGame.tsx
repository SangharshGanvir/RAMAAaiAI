'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { buttonHover, buttonTap } from '@/utils/animations';
import { VoiceSynthesizer } from '@/voice/voiceSynthesizer';

interface ListeningGameProps {
  word: string;
  images: { word: string; emoji: string }[];
  onComplete: (score: number) => void;
}

export default function ListeningGame({ word, images, onComplete }: ListeningGameProps) {
  const [hasPlayed, setHasPlayed] = useState(false);
  const voiceSynth = new VoiceSynthesizer();

  useEffect(() => {
    playWord();
  }, []);

  const playWord = async () => {
    await voiceSynth.speak(`Listen carefully. ${word}`);
    setHasPlayed(true);
  };

  const handleImageClick = (selectedWord: string) => {
    if (selectedWord === word) {
      voiceSynth.speak('Wonderful! That is correct!');
      onComplete(100);
    } else {
      voiceSynth.speak('Try again, my dear.');
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <h2 className="text-3xl font-bold text-primary">Listen and Choose</h2>
      
      <motion.button
        onClick={playWord}
        className="px-6 py-3 bg-blue-500 text-white rounded-full font-medium text-lg"
        whileHover={buttonHover}
        whileTap={buttonTap}
      >
        🔊 Play Word
      </motion.button>

      {hasPlayed && (
        <div className="grid grid-cols-2 gap-6 max-w-lg">
          {images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => handleImageClick(image.word)}
              className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl shadow-lg border-4 border-transparent hover:border-primary"
              whileHover={buttonHover}
              whileTap={buttonTap}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-7xl">{image.emoji}</div>
              <p className="text-xl font-medium">{image.word}</p>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
