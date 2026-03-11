'use client';

import { motion } from 'framer-motion';
import { characterBounce } from '@/utils/animations';
import { useApp } from '@/contexts/AppContext';

export default function RamaAaiCharacter() {
  const { avatar } = useApp();

  return (
    <motion.div
      className="relative w-48 h-48 mx-auto"
      {...characterBounce}
    >
      <div className="w-full h-full rounded-full flex items-center justify-center text-8xl"
           style={{ backgroundColor: avatar.sareeColor + '20' }}>
        👵
      </div>
      {avatar.glasses && (
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-4xl">
          👓
        </div>
      )}
    </motion.div>
  );
}
