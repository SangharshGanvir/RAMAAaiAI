'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { pageTransition, scaleIn, buttonHover, buttonTap } from '@/utils/animations';
import { Story } from '@/types';
import { getAllStories } from '@/ai/storyGenerator';

export default function StoryLibraryPage() {
  const router = useRouter();
  const [allStories, setAllStories] = useState<Story[]>([]);
  const [filteredStories, setFilteredStories] = useState<Story[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  useEffect(() => {
    // Get all 100+ unique stories
    const stories = getAllStories();
    setAllStories(stories);
    setFilteredStories(stories);
  }, []);

  useEffect(() => {
    // Filter stories based on search and difficulty
    let filtered = allStories;

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(story => story.difficulty === selectedDifficulty);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(story => 
        story.title.toLowerCase().includes(query) ||
        story.moral.toLowerCase().includes(query) ||
        story.content.some(sentence => sentence.toLowerCase().includes(query))
      );
    }

    setFilteredStories(filtered);
  }, [searchQuery, selectedDifficulty, allStories]);

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
          className="text-xl text-gray-700 mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Choose a story to listen to with Rama Aai - {allStories.length} Stories Available!
        </motion.p>

        {/* Search and Filter Section */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="🔍 Search stories by title, moral, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-3 rounded-full border-2 border-gray-300 focus:border-primary focus:outline-none text-lg text-gray-800"
              />
            </div>

            {/* Difficulty Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedDifficulty('all')}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedDifficulty === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All ({allStories.length})
              </button>
              <button
                onClick={() => setSelectedDifficulty('easy')}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedDifficulty === 'easy'
                    ? 'bg-green-500 text-white'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                Easy ({allStories.filter(s => s.difficulty === 'easy').length})
              </button>
              <button
                onClick={() => setSelectedDifficulty('medium')}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedDifficulty === 'medium'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                }`}
              >
                Medium ({allStories.filter(s => s.difficulty === 'medium').length})
              </button>
              <button
                onClick={() => setSelectedDifficulty('hard')}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedDifficulty === 'hard'
                    ? 'bg-red-500 text-white'
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
              >
                Hard ({allStories.filter(s => s.difficulty === 'hard').length})
              </button>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-center text-gray-600">
            Showing {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 max-h-[60vh] overflow-y-auto pr-4">
          {filteredStories.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-2xl text-gray-500">No stories found matching your search.</p>
              <p className="text-gray-400 mt-2">Try a different search term or filter.</p>
            </div>
          ) : (
            filteredStories.map((story, index) => (
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
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}
