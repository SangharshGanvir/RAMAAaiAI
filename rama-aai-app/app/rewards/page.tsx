'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { pageTransition, scaleIn, starBurst } from '@/utils/animations';
import { useApp } from '@/contexts/AppContext';
import StarDisplay from '@/components/StarDisplay';

export default function RewardsPage() {
  const router = useRouter();
  const { progress } = useApp();

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
            My Rewards 🏆
          </motion.h1>
          
          <motion.button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-gray-200 rounded-full font-medium"
          >
            ← Back
          </motion.button>
        </div>

        <motion.div
          className="bg-white rounded-2xl p-8 card-shadow-lg mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold mb-4">Total Stars Earned</h2>
          <StarDisplay count={progress.totalStars} animate={true} />
          <p className="text-xl text-gray-600 mt-4">
            Keep learning to earn more stars!
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl p-8 card-shadow-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-6">Badges Earned</h2>
          {progress.badges.length === 0 ? (
            <p className="text-center text-gray-500 text-xl">
              Keep learning to earn your first badge!
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {progress.badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="text-6xl">{badge.icon}</div>
                  <h3 className="text-lg font-bold text-center">{badge.name}</h3>
                  <p className="text-sm text-gray-600 text-center">{badge.description}</p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl p-8 card-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-6">Learning Streak</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="text-8xl">🔥</div>
            <div>
              <p className="text-6xl font-bold text-primary">{progress.dailyStreak}</p>
              <p className="text-2xl text-gray-600">Days in a row!</p>
            </div>
          </div>
          <p className="text-center text-xl text-gray-600 mt-6">
            Come back tomorrow to keep your streak going!
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
