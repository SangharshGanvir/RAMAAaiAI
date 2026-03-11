'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { pageTransition, scaleIn, buttonHover, buttonTap } from '@/utils/animations';
import { useApp } from '@/contexts/AppContext';

export default function ParentDashboardPage() {
  const router = useRouter();
  const { progress } = useApp();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'activities' | 'achievements'>('overview');

  // Calculate statistics
  const totalActivitiesCompleted = 
    progress.lettersLearned.length +
    progress.wordsLearned.length +
    progress.storiesCompleted.length;

  const averagePronunciationScore = progress.pronunciationScores.length > 0
    ? Math.round(
        progress.pronunciationScores.reduce((sum, score) => sum + score.score, 0) / 
        progress.pronunciationScores.length
      )
    : 0;

  return (
    <motion.div
      className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-blue-50 to-purple-50"
      {...pageTransition}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-primary"
            {...scaleIn}
          >
            👨‍👩‍👧 Parent Dashboard
          </motion.h1>
          
          <button
            onClick={() => router.push('/settings')}
            className="px-6 py-3 bg-white rounded-full font-medium shadow-md text-gray-800"
          >
            ← Back to Settings
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setSelectedTab('overview')}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              selectedTab === 'overview'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📊 Overview
          </button>
          <button
            onClick={() => setSelectedTab('activities')}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              selectedTab === 'activities'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📚 Activities
          </button>
          <button
            onClick={() => setSelectedTab('achievements')}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              selectedTab === 'achievements'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            🏆 Achievements
          </button>
        </div>

        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Stars */}
            <motion.div
              className="bg-white rounded-2xl p-6 card-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">⭐</div>
                <div>
                  <h3 className="text-lg text-gray-600">Total Stars</h3>
                  <p className="text-4xl font-bold text-primary">{progress.totalStars}</p>
                </div>
              </div>
              <p className="text-gray-600">Earned through learning activities</p>
            </motion.div>

            {/* Letters Learned */}
            <motion.div
              className="bg-white rounded-2xl p-6 card-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">🔤</div>
                <div>
                  <h3 className="text-lg text-gray-600">Letters Learned</h3>
                  <p className="text-4xl font-bold text-primary">{progress.lettersLearned.length}/26</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all"
                  style={{ width: `${(progress.lettersLearned.length / 26) * 100}%` }}
                />
              </div>
            </motion.div>

            {/* Words Mastered */}
            <motion.div
              className="bg-white rounded-2xl p-6 card-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">📝</div>
                <div>
                  <h3 className="text-lg text-gray-600">Words Mastered</h3>
                  <p className="text-4xl font-bold text-primary">{progress.wordsLearned.length}</p>
                </div>
              </div>
              <p className="text-gray-600">Words successfully learned</p>
            </motion.div>

            {/* Stories Completed */}
            <motion.div
              className="bg-white rounded-2xl p-6 card-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">📚</div>
                <div>
                  <h3 className="text-lg text-gray-600">Stories Completed</h3>
                  <p className="text-4xl font-bold text-primary">{progress.storiesCompleted.length}</p>
                </div>
              </div>
              <p className="text-gray-600">Stories read and understood</p>
            </motion.div>

            {/* Pronunciation Score */}
            <motion.div
              className="bg-white rounded-2xl p-6 card-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">🗣️</div>
                <div>
                  <h3 className="text-lg text-gray-600">Avg Pronunciation</h3>
                  <p className="text-4xl font-bold text-primary">{averagePronunciationScore}%</p>
                </div>
              </div>
              <p className="text-gray-600">Based on {progress.pronunciationScores.length} attempts</p>
            </motion.div>

            {/* Total Activities */}
            <motion.div
              className="bg-white rounded-2xl p-6 card-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">🎯</div>
                <div>
                  <h3 className="text-lg text-gray-600">Activities Done</h3>
                  <p className="text-4xl font-bold text-primary">{totalActivitiesCompleted}</p>
                </div>
              </div>
              <p className="text-gray-600">Total learning activities completed</p>
            </motion.div>
          </div>
        )}

        {/* Activities Tab */}
        {selectedTab === 'activities' && (
          <div className="space-y-6">
            {/* Alphabet Progress */}
            <motion.div
              className="bg-white rounded-2xl p-6 card-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-2xl font-bold mb-4">🔤 Alphabet Learning</h3>
              <div className="mb-4">
                <p className="text-gray-600 mb-2">Letters Learned: {progress.lettersLearned.length}/26</p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-green-500 h-4 rounded-full transition-all"
                    style={{ width: `${(progress.lettersLearned.length / 26) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {progress.lettersLearned.map((letter, idx) => (
                  <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                    {letter}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Word Builder Progress */}
            <motion.div
              className="bg-white rounded-2xl p-6 card-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-2xl font-bold mb-4">📝 Word Builder</h3>
              <p className="text-gray-600 mb-4">Words Mastered: {progress.wordsLearned.length}</p>
              <div className="flex flex-wrap gap-2">
                {progress.wordsLearned.slice(0, 20).map((word, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {word}
                  </span>
                ))}
                {progress.wordsLearned.length > 20 && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                    +{progress.wordsLearned.length - 20} more
                  </span>
                )}
              </div>
            </motion.div>

            {/* Pronunciation Progress */}
            <motion.div
              className="bg-white rounded-2xl p-6 card-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-4">🗣️ Pronunciation Practice</h3>
              <p className="text-gray-600 mb-4">Recent Scores:</p>
              <div className="space-y-2">
                {progress.pronunciationScores.slice(-5).reverse().map((score, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{score.word}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            score.score >= 80 ? 'bg-green-500' :
                            score.score >= 60 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${score.score}%` }}
                        />
                      </div>
                      <span className="font-bold w-12 text-right">{score.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Stories Progress */}
            <motion.div
              className="bg-white rounded-2xl p-6 card-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-4">📚 Story Time</h3>
              <p className="text-gray-600 mb-4">Stories Completed: {progress.storiesCompleted.length}</p>
              <div className="flex flex-wrap gap-2">
                {progress.storiesCompleted.map((storyId, idx) => (
                  <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    Story #{storyId}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Achievements Tab */}
        {selectedTab === 'achievements' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Star Milestones */}
            <motion.div
              className="bg-white rounded-2xl p-6 card-shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="text-6xl mb-4 text-center">⭐</div>
              <h3 className="text-xl font-bold text-center mb-2">Star Collector</h3>
              <p className="text-center text-gray-600 mb-4">Earned {progress.totalStars} stars</p>
              <div className={`px-4 py-2 rounded-full text-center font-medium ${
                progress.totalStars >= 100 ? 'bg-gold text-yellow-900' :
                progress.totalStars >= 50 ? 'bg-silver text-gray-700' :
                'bg-bronze text-orange-900'
              }`}>
                {progress.totalStars >= 100 ? '🥇 Gold' :
                 progress.totalStars >= 50 ? '🥈 Silver' :
                 '🥉 Bronze'}
              </div>
            </motion.div>

            {/* Alphabet Master */}
            <motion.div
              className="bg-white rounded-2xl p-6 card-shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-6xl mb-4 text-center">🔤</div>
              <h3 className="text-xl font-bold text-center mb-2">Alphabet Master</h3>
              <p className="text-center text-gray-600 mb-4">
                {progress.lettersLearned.length === 26 ? 'All letters learned!' : 
                 `${progress.lettersLearned.length}/26 letters`}
              </p>
              <div className={`px-4 py-2 rounded-full text-center font-medium ${
                progress.lettersLearned.length === 26 ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-600'
              }`}>
                {progress.lettersLearned.length === 26 ? '✓ Completed' : 'In Progress'}
              </div>
            </motion.div>

            {/* Word Wizard */}
            <motion.div
              className="bg-white rounded-2xl p-6 card-shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-6xl mb-4 text-center">📝</div>
              <h3 className="text-xl font-bold text-center mb-2">Word Wizard</h3>
              <p className="text-center text-gray-600 mb-4">{progress.wordsLearned.length} words mastered</p>
              <div className={`px-4 py-2 rounded-full text-center font-medium ${
                progress.wordsLearned.length >= 50 ? 'bg-purple-100 text-purple-800' :
                progress.wordsLearned.length >= 25 ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-600'
              }`}>
                {progress.wordsLearned.length >= 50 ? '🌟 Expert' :
                 progress.wordsLearned.length >= 25 ? '⭐ Advanced' :
                 '📚 Beginner'}
              </div>
            </motion.div>

            {/* Story Reader */}
            <motion.div
              className="bg-white rounded-2xl p-6 card-shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-6xl mb-4 text-center">📚</div>
              <h3 className="text-xl font-bold text-center mb-2">Story Reader</h3>
              <p className="text-center text-gray-600 mb-4">{progress.storiesCompleted.length} stories completed</p>
              <div className={`px-4 py-2 rounded-full text-center font-medium ${
                progress.storiesCompleted.length >= 20 ? 'bg-pink-100 text-pink-800' :
                progress.storiesCompleted.length >= 10 ? 'bg-orange-100 text-orange-800' :
                'bg-gray-100 text-gray-600'
              }`}>
                {progress.storiesCompleted.length >= 20 ? '📖 Bookworm' :
                 progress.storiesCompleted.length >= 10 ? '📕 Reader' :
                 '📗 Starting'}
              </div>
            </motion.div>

            {/* Pronunciation Pro */}
            <motion.div
              className="bg-white rounded-2xl p-6 card-shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-6xl mb-4 text-center">🗣️</div>
              <h3 className="text-xl font-bold text-center mb-2">Pronunciation Pro</h3>
              <p className="text-center text-gray-600 mb-4">Average: {averagePronunciationScore}%</p>
              <div className={`px-4 py-2 rounded-full text-center font-medium ${
                averagePronunciationScore >= 80 ? 'bg-green-100 text-green-800' :
                averagePronunciationScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-600'
              }`}>
                {averagePronunciationScore >= 80 ? '🎯 Excellent' :
                 averagePronunciationScore >= 60 ? '👍 Good' :
                 '💪 Keep Practicing'}
              </div>
            </motion.div>

            {/* Consistent Learner */}
            <motion.div
              className="bg-white rounded-2xl p-6 card-shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-6xl mb-4 text-center">🎯</div>
              <h3 className="text-xl font-bold text-center mb-2">Consistent Learner</h3>
              <p className="text-center text-gray-600 mb-4">{totalActivitiesCompleted} activities done</p>
              <div className={`px-4 py-2 rounded-full text-center font-medium ${
                totalActivitiesCompleted >= 100 ? 'bg-indigo-100 text-indigo-800' :
                totalActivitiesCompleted >= 50 ? 'bg-cyan-100 text-cyan-800' :
                'bg-gray-100 text-gray-600'
              }`}>
                {totalActivitiesCompleted >= 100 ? '🏆 Champion' :
                 totalActivitiesCompleted >= 50 ? '🎖️ Dedicated' :
                 '🌱 Growing'}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
