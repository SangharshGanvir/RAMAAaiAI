'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { pageTransition, scaleIn, buttonHover, buttonTap } from '@/utils/animations';
import { Story } from '@/types';
import { getStoryByDifficulty } from '@/ai/storyGenerator';

export default function StoryLibraryPage() {
  const router = useRouter();
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    const defaultStories = [
      getStoryByDifficulty('easy'),
      getStoryByDifficulty('medium'),
      getStoryByDifficulty('hard'),
    ];
    setStories(defaultStories);
  }, []);

  return (
    <motion.div
      className="min-h-screen p-4 md:p-8"
      {...pageTransition}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-primary"
            {...scaleIn}
          >
            Story Library 📚
          </motion.h1>
          
          <motion.button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-gray-200 rounded-full font-medium"
          >
            ← Back
          </motion.button>
        </div>

        <motion.p
          className="text-xl text-gray-700 mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Choose a story to listen to with Rama Aai
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              className="bg-white rounded-2xl p-6 card-shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={buttonHover}
              whileTap={buttonTap}
              onClick={() => router.push(`/stories/${story.id}`)}
            >
              <div className="text-6xl mb-4 text-center">📖</div>
              <h3 className="text-2xl font-bold text-center mb-2">{story.title}</h3>
              <p className="text-gray-600 text-center mb-4">
                {story.content.length} sentences
              </p>
              <div className="flex justify-center">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  story.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                  story.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {story.difficulty.toUpperCase()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
