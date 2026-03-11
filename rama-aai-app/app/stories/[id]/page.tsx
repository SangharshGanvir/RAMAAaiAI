'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { pageTransition, buttonHover, buttonTap } from '@/utils/animations';
import { VoiceSynthesizer } from '@/voice/voiceSynthesizer';
import { Story } from '@/types';
import { getStoryById, getAllStories } from '@/ai/storyGenerator';
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
    const loadedStory = getStoryById(storyId);
    
    if (loadedStory) {
      setStory(loadedStory);
    } else {
      // Fallback: get first story from all stories
      const allStories = getAllStories();
      setStory(allStories[0]);
    }
  }, [params.id]);

  const playStory = async () => {
    if (!story) return;
    
    try {
      setIsPlaying(true);
      
      // Warm grandmother introduction
      await voiceSynth.speak(`Let me tell you a wonderful story, my dear.`);
      await new Promise(resolve => setTimeout(resolve, 800));
      await voiceSynth.speak(story.title.replace(/[^\w\s]/g, ''));
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Read each sentence with pauses
      for (let i = 0; i < story.content.length; i++) {
        setCurrentSentenceIndex(i);
        // Remove emojis for speech but keep text readable
        const textToSpeak = story.content[i].replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();
        await voiceSynth.speak(textToSpeak);
        await new Promise(resolve => setTimeout(resolve, 1200)); // Longer pause between sentences
      }
      
      // Pause before moral
      await new Promise(resolve => setTimeout(resolve, 1500));
      await voiceSynth.speak(`And the lesson of this story is:`);
      await new Promise(resolve => setTimeout(resolve, 500));
      await voiceSynth.speak(story.moral);
      
      // Ask the question at the end
      if (story.question) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await voiceSynth.speak(`Now, let me ask you something, dear.`);
        await new Promise(resolve => setTimeout(resolve, 500));
        await voiceSynth.speak(story.question);
      }
      
      await new Promise(resolve => setTimeout(resolve, 800));
      await voiceSynth.speak(`What a lovely story! You did wonderfully listening, my dear.`);
      
      setIsPlaying(false);
      setShowCelebration(true);
      addStoryCompleted(story.id);
      
      setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
    } catch (error) {
      console.error('Error playing story:', error);
      setIsPlaying(false);
    }
  };

  const playSentence = async (index: number) => {
    if (!story || isPlaying) return;
    
    try {
      setCurrentSentenceIndex(index);
      const textToSpeak = story.content[index].replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();
      await voiceSynth.speak(textToSpeak);
    } catch (error) {
      console.error('Error playing sentence:', error);
    }
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

          <div className="space-y-6 mb-8">
            {story.content.map((sentence, index) => {
              // Extract emojis from sentence
              const emojiMatch = sentence.match(/[\u{1F300}-\u{1F9FF}]+/gu);
              const textOnly = sentence.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();
              
              return (
                <motion.div
                  key={index}
                  className={`p-6 rounded-xl cursor-pointer transition-all ${
                    currentSentenceIndex === index
                      ? 'bg-orange-100 border-2 border-orange-400 shadow-lg'
                      : 'bg-gradient-to-r from-purple-50 to-pink-50 hover:shadow-md border-2 border-transparent'
                  }`}
                  onClick={() => playSentence(index)}
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-4">
                    {emojiMatch && (
                      <div className="text-6xl flex-shrink-0">
                        {emojiMatch[0]}
                      </div>
                    )}
                    <p className="text-xl text-gray-800 leading-relaxed flex-1">
                      {textOnly}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {story.moral && (
            <motion.div
              className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl mb-6 border-2 border-green-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-lg font-medium text-green-900 mb-2">
                💡 Moral of the Story:
              </p>
              <p className="text-xl text-green-800 italic">
                {story.moral}
              </p>
            </motion.div>
          )}

          {story.question && (
            <motion.div
              className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl mb-6 border-2 border-blue-200"
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
