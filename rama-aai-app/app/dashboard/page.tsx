'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { pageTransition, buttonHover, buttonTap, scaleIn } from '@/utils/animations';
import { useApp } from '@/contexts/AppContext';
import RamaAaiCharacter from '@/components/RamaAaiCharacter';
import StarDisplay from '@/components/StarDisplay';
import ProgressBar from '@/components/ProgressBar';

export default function DashboardPage() {
  const router = useRouter();
  const { progress } = useApp();

  const activities = [
    { id: 'alphabet', title: 'Alphabet Learning', emoji: '🔤', path: '/activities/alphabet' },
    { id: 'words', title: 'Word Builder', emoji: '📝', path: '/activities/word-builder' },
    { id: 'pronunciation', title: 'Pronunciation', emoji: '🗣️', path: '/activities/pronunciation' },
    { id: 'sentences', title: 'Sentence Builder', emoji: '✍️', path: '/activities/sentence-builder' },
    { id: 'listening', title: 'Listening Game', emoji: '👂', path: '/activities/listening' },
    { id: 'dictionary', title: 'Word Dictionary', emoji: '📖', path: '/dictionary' },
    { id: 'stories', title: 'Story Time', emoji: '�', path: '/stories' },
    { id: 'conversation', title: 'Ask Rama Aai', emoji: '💬', path: '/conversation' },
    { id: 'rewards', title: 'My Rewards', emoji: '🏆', path: '/rewards' },
  ];

  return (
    <motion.div
      className="min-h-screen p-4 md:p-8"
      {...pageTransition}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-primary"
            {...scaleIn}
          >
            Learning Dashboard
          </motion.h1>
          
          <div className="flex gap-4">
            <StarDisplay count={progress.totalStars} />
            <motion.button
              onClick={() => router.push('/settings')}
              className="text-3xl"
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              ⚙️
            </motion.button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <motion.div
            className="bg-white rounded-2xl p-6 card-shadow-lg"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <RamaAaiCharacter />
            <p className="text-center text-xl font-medium text-gray-700 mt-4">
              Hello my dear child! Ready to learn today?
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl p-6 card-shadow-lg"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
            <div className="space-y-4">
              <ProgressBar
                current={progress.lettersLearned.length}
                total={26}
                label="Letters Learned"
              />
              <ProgressBar
                current={progress.wordsLearned.length}
                total={50}
                label="Words Mastered"
              />
              <ProgressBar
                current={progress.storiesCompleted.length}
                total={10}
                label="Stories Completed"
              />
              <div className="flex items-center gap-2 text-lg">
                <span>🔥</span>
                <span className="font-bold">{progress.dailyStreak} Day Streak!</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.h2
          className="text-3xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Learning Activities
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {activities.map((activity, index) => (
            <motion.button
              key={activity.id}
              onClick={() => router.push(activity.path)}
              className="bg-white rounded-2xl p-6 card-shadow hover:shadow-xl transition-shadow flex flex-col items-center gap-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              <div className="text-5xl">{activity.emoji}</div>
              <p className="text-lg font-medium text-center">{activity.title}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
