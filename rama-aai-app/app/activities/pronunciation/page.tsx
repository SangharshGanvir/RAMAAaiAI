'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { pageTransition } from '@/utils/animations';
import { VoiceSynthesizer } from '@/voice/voiceSynthesizer';
import { SpeechRecognizer, calculatePronunciationScore } from '@/voice/speechRecognizer';
import VoiceButton from '@/components/VoiceButton';
import CelebrationAnimation from '@/components/CelebrationAnimation';
import { updatePronunciationScore } from '@/progress/progressTracker';
import { pronunciationWords } from '@/data/pronunciationWords';

// Shuffle words for variety
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const shuffledWords = shuffleArray(pronunciationWords);

export default function PronunciationPage() {
  const router = useRouter();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  
  const voiceSynth = new VoiceSynthesizer();
  const speechRecognizer = new SpeechRecognizer();
  
  const currentWord = shuffledWords[currentWordIndex];

  const speakWord = async () => {
    await voiceSynth.speak(`Listen carefully. ${currentWord.word}. Now you try saying ${currentWord.word}`);
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
    const pronunciationScore = calculatePronunciationScore(spokenText, currentWord.word);
    setScore(pronunciationScore);
    updatePronunciationScore(currentWord.word, pronunciationScore);

    if (pronunciationScore >= 80) {
      setFeedback('Excellent pronunciation! ⭐⭐⭐');
      await voiceSynth.speak('Excellent! You said it perfectly!');
      setShowCelebration(true);
      
      setTimeout(() => {
        setShowCelebration(false);
        const handleNext = () => {
          if (currentWordIndex < shuffledWords.length - 1) {
            setCurrentWordIndex(currentWordIndex + 1);
            setFeedback('');
            setScore(0);
          } else {
            router.push('/dashboard');
          }
        };
        handleNext();
      }, 3000);
    } else if (pronunciationScore >= 60) {
      setFeedback('Good try! Let us practice once more.');
      await voiceSynth.speak('Good try! Let us practice once more.');
    } else {
      setFeedback('Let us say it slowly together.');
      await voiceSynth.speak(`Let us say it slowly together. ${currentWord.word}`);
    }
  };

  return (
    <motion.div
      className="min-h-screen p-4 md:p-8"
      {...pageTransition}
    >
      {showCelebration && <CelebrationAnimation />}
      
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Pronunciation Practice</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-gray-200 rounded-full font-medium"
          >
            ← Back
          </button>
        </div>

        <div className="bg-white rounded-2xl p-8 card-shadow-lg">
          <div className="flex flex-col items-center gap-6">
            <div className="text-center">
              <p className="text-gray-600 mb-2">
                Word {currentWordIndex + 1} of {pronunciationWords.length}
              </p>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                currentWord.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                currentWord.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {currentWord.difficulty.toUpperCase()}
              </span>
            </div>

            <motion.div
              className="text-6xl font-bold text-primary"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {currentWord.word}
            </motion.div>

            <motion.button
              onClick={speakWord}
              className="px-8 py-4 bg-blue-500 text-white rounded-full font-medium text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔊 Hear the word
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
              <div className="text-3xl font-bold">
                Score: {score}/100
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
