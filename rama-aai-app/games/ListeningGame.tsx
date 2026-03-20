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
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffledImages, setShuffledImages] = useState(images);
  const voiceSynth = new VoiceSynthesizer();

  useEffect(() => {
    // Shuffle images so correct answer isn't always first
    const shuffled = [...images].sort(() => Math.random() - 0.5);
    setShuffledImages(shuffled);
    playWord();
  }, []);

  const playWord = async () => {
    try {
      setIsPlaying(true);
      await voiceSynth.speak(`Listen carefully. ${word}`);
      setHasPlayed(true);
    } catch (error) {
      console.error('Error playing word:', error);
      setHasPlayed(true);
    } finally {
      setIsPlaying(false);
    }
  };

  const handleImageClick = async (selectedWord: string) => {
    if (isPlaying) return;
    
    try {
      setIsPlaying(true);
      if (selectedWord === word) {
        await voiceSynth.speak('Wonderful! That is correct!');
        setIsPlaying(false);
        onComplete(100);
      } else {
        await voiceSynth.speak('Try again, my dear.');
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error in handleImageClick:', error);
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <h2 className="text-3xl font-bold text-primary">Listen and Choose</h2>
      
      <motion.button
        onClick={playWord}
        disabled={isPlaying}
        className={`px-6 py-3 rounded-full font-medium text-lg ${
          isPlaying 
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
            : 'bg-blue-500 text-white'
        }`}
        whileHover={!isPlaying ? buttonHover : {}}
        whileTap={!isPlaying ? buttonTap : {}}
      >
        {isPlaying ? '⏸️ Playing...' : '🔊 Play Word'}
      </motion.button>

      {hasPlayed && (
        <div className="grid grid-cols-2 gap-6 max-w-lg">
          {shuffledImages.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => handleImageClick(image.word)}
              disabled={isPlaying}
              className={`flex flex-col items-center gap-3 p-6 rounded-xl shadow-lg border-4 ${
                isPlaying
                  ? 'bg-gray-100 border-gray-300 cursor-not-allowed opacity-50'
                  : 'bg-white border-transparent hover:border-primary'
              }`}
              whileHover={!isPlaying ? buttonHover : {}}
              whileTap={!isPlaying ? buttonTap : {}}
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
