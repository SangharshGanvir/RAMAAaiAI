'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { pageTransition, buttonHover, buttonTap } from '@/utils/animations';
import { VoiceSynthesizer } from '@/voice/voiceSynthesizer';
import { Story } from '@/types';
import { getStoryByDifficulty } from '@/ai/storyGenerator';
import { addStoryCompleted } from '@/progress/progressTracker';
import CelebrationAnimation from '@/components/CelebrationAnimation';

export default function StoryDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [story, setStory] = useState<Story | null>(null);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const voiceSynth = new VoiceSynthesizer();

  useEffect(() => {
    // Load story based on ID
    const storyId = params.id as string;
    let loadedStory: Story;
    
    if (storyId.includes('easy')) {
      loadedStory = getStoryByDifficulty('easy');
    } else if (storyId.includes('medium')) {
      loadedStory = getStoryByDifficulty('medium');
    } else {
      loadedStory = getStoryByDifficulty('hard');
    }
    
    setStory(loadedStory);
  }, [params.id]);

  const playStory = async () => {
    if (!story) return;
    
    setIsPlaying(true);
    
    for (let i = 0; i < story.content.length; i++) {
      setCurrentSentenceIndex(i);
      await voiceSynth.speak(story.content[i]);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Ask the question at the end
    if (story.question) {
      await voiceSynth.speak(story.question);
    }
    
    setIsPlaying(false);
    setShowCelebration(true);
    addStoryCompleted(story.id);
    
    setTimeout(() => {
      setShowCelebration(false);
    }, 3000);
  };

  const playSentence = async (index: number) => {
    if (!story) return;
    setCurrentSentenceIndex(index);
    await voiceSynth.speak(story.content[index]);
  };

  if (!story) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <motion.div
      className="min-h-screen p-4 md:p-8"
      {...pageTransition}
    >
      {showCelebration && <CelebrationAnimation />}
      
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            className="text-4xl font-bold text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {story.title}
          </motion.h1>
          
          <button
            onClick={() => router.push('/stories')}
            className="px-6 py-3 bg-gray-200 rounded-full font-medium"
          >
            ← Back
          </button>
        </div>

        <div className="bg-white rounded-2xl p-8 card-shadow-lg mb-6">
          <div className="flex justify-center mb-6">
            <span className={`px-6 py-3 rounded-full text-lg font-medium ${
              story.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
              story.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {story.difficulty.toUpperCase()}
            </span>
          </div>

          <div className="space-y-4 mb-8">
            {story.content.map((sentence, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  currentSentenceIndex === index
                    ? 'bg-orange-100 border-2 border-orange-400'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => playSentence(index)}
                whileHover={buttonHover}
                whileTap={buttonTap}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-lg">{sentence}</p>
              </motion.div>
            ))}
          </div>

          {story.question && (
            <motion.div
              className="bg-blue-50 p-6 rounded-lg mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-xl font-medium text-blue-900">
                ❓ {story.question}
              </p>
            </motion.div>
          )}

          <div className="flex justify-center gap-4">
            <motion.button
              onClick={playStory}
              disabled={isPlaying}
              className={`px-8 py-4 rounded-full font-medium text-lg ${
                isPlaying
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-primary text-white'
              }`}
              whileHover={!isPlaying ? buttonHover : {}}
              whileTap={!isPlaying ? buttonTap : {}}
            >
              {isPlaying ? '⏸️ Playing...' : '▶️ Play Full Story'}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
