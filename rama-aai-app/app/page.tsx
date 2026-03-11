'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { pageTransition, buttonHover, buttonTap } from '@/utils/animations';
import RamaAaiCharacter from '@/components/RamaAaiCharacter';
import { useApp } from '@/contexts/AppContext';

export default function WelcomePage() {
  const router = useRouter();
  const { progress } = useApp();

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8"
      {...pageTransition}
    >
      <motion.h1
        className="text-5xl md:text-7xl font-bold text-primary text-center mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Welcome to RAMA AAI
      </motion.h1>

      <motion.p
        className="text-2xl text-gray-700 text-center mb-12 max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Your loving grandmother teacher is here to help you learn English!
      </motion.p>

      <RamaAaiCharacter />

      <motion.div
        className="flex flex-col gap-4 mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <motion.button
          onClick={() => router.push('/dashboard')}
          className="px-12 py-4 bg-primary text-white text-2xl font-bold rounded-full shadow-lg"
          whileHover={buttonHover}
          whileTap={buttonTap}
        >
          Start Learning 🎓
        </motion.button>

        {progress.lettersLearned.length > 0 && (
          <motion.button
            onClick={() => router.push('/dashboard')}
            className="px-12 py-4 bg-blue-500 text-white text-xl font-medium rounded-full shadow-lg"
            whileHover={buttonHover}
            whileTap={buttonTap}
          >
            Continue Learning ➡️
          </motion.button>
        )}
      </motion.div>

      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-gray-600">
          ⭐ {progress.totalStars} stars earned | 
          🔥 {progress.dailyStreak} day streak
        </p>
      </motion.div>
    </motion.div>
  );
}
