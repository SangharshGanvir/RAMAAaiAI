'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { buttonHover, buttonTap, scaleIn } from '@/utils/animations';
import { VoiceSynthesizer } from '@/voice/voiceSynthesizer';
import { SpeechRecognizer, calculatePronunciationScore } from '@/voice/speechRecognizer';
import VoiceButton from '@/components/VoiceButton';
import { addLetterLearned } from '@/progress/progressTracker';

interface AlphabetGameProps {
  letter: string;
  onComplete: (score: number) => void;
}

export default function AlphabetGame({ letter, onComplete }: AlphabetGameProps) {
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const voiceSynth = new VoiceSynthesizer();
  const speechRecognizer = new SpeechRecognizer();

  useEffect(() => {
    speakLetter();
  }, [letter]);

  const speakLetter = async () => {
    setIsPlaying(true);
    await voiceSynth.speak(`The letter ${letter}. Can you say ${letter}?`);
    setIsPlaying(false);
  };

  const handleStartListening = () => {
    setIsListening(true);
    setFeedback('Listening...');
    
    speechRecognizer.startListening(
      (spokenText) => {
        setIsListening(false);
        checkPronunciation(spokenText);
      },
      (error) => {
        setIsListening(false);
        setFeedback('Could not hear you. Try again!');
      }
    );
  };

  const handleStopListening = () => {
    speechRecognizer.stopListening();
    setIsListening(false);
  };

  const checkPronunciation = async (spokenText: string) => {
    const pronunciationScore = calculatePronunciationScore(spokenText, letter);
    setScore(pronunciationScore);

    setIsPlaying(true);
    if (pronunciationScore >= 80) {
      setFeedback('Wonderful! You said it perfectly! ⭐');
      await voiceSynth.speak('Wonderful! You said it perfectly!');
      setIsPlaying(false);
      addLetterLearned(letter);
      setTimeout(() => onComplete(pronunciationScore), 2000);
    } else if (pronunciationScore >= 50) {
      setFeedback('Very good! Let us try once more.');
      await voiceSynth.speak('Very good! Let us try once more.');
      setIsPlaying(false);
    } else {
      setFeedback('Let us say it slowly together.');
      await voiceSynth.speak(`Let us say it slowly together. ${letter}`);
      setIsPlaying(false);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-6 p-8"
      {...scaleIn}
    >
      <h2 className="text-4xl font-bold text-primary">Learning Letter {letter}</h2>
      
      <motion.div
        className="text-9xl font-bold text-primary"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {letter}
      </motion.div>

      <motion.button
        onClick={speakLetter}
        disabled={isPlaying || isListening}
        className={`px-6 py-3 rounded-full font-medium ${
          isPlaying || isListening
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
            : 'bg-blue-500 text-white'
        }`}
        whileHover={!isPlaying && !isListening ? buttonHover : {}}
        whileTap={!isPlaying && !isListening ? buttonTap : {}}
      >
        {isPlaying ? '⏸️ Playing...' : '🔊 Hear the letter'}
      </motion.button>

      <div className="flex flex-col items-center gap-4">
        <p className="text-lg font-medium">Now you try!</p>
        {!isPlaying && (
          <VoiceButton
            onStartListening={handleStartListening}
            onStopListening={handleStopListening}
            isListening={isListening}
          />
        )}
        {isPlaying && (
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-4xl">
            ⏸️
          </div>
        )}
      </div>

      {feedback && (
        <motion.div
          className="text-xl font-medium text-center px-6 py-3 bg-yellow-100 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {feedback}
        </motion.div>
      )}

      {score > 0 && (
        <div className="text-2xl font-bold">
          Score: {score}/100
        </div>
      )}
    </motion.div>
  );
}
