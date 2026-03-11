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
  const voiceSynth = new VoiceSynthesizer();
  const speechRecognizer = new SpeechRecognizer();

  useEffect(() => {
    speakLetter();
  }, [letter]);

  const speakLetter = async () => {
    await voiceSynth.speak(`The letter ${letter}. Can you say ${letter}?`);
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

    if (pronunciationScore >= 80) {
      setFeedback('Wonderful! You said it perfectly! ⭐');
      await voiceSynth.speak('Wonderful! You said it perfectly!');
      addLetterLearned(letter);
      setTimeout(() => onComplete(pronunciationScore), 2000);
    } else if (pronunciationScore >= 50) {
      setFeedback('Very good! Let us try once more.');
      await voiceSynth.speak('Very good! Let us try once more.');
    } else {
      setFeedback('Let us say it slowly together.');
      await voiceSynth.speak(`Let us say it slowly together. ${letter}`);
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
        className="px-6 py-3 bg-blue-500 text-white rounded-full font-medium"
        whileHover={buttonHover}
        whileTap={buttonTap}
      >
        🔊 Hear the letter
      </motion.button>

      <div className="flex flex-col items-center gap-4">
        <p className="text-lg font-medium">Now you try!</p>
        <VoiceButton
          onStartListening={handleStartListening}
          onStopListening={handleStopListening}
          isListening={isListening}
        />
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
