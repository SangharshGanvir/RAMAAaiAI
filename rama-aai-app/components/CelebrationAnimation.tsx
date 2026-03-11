'use client';

import { motion } from 'framer-motion';
import { confettiAnimation } from '@/utils/animations';

export default function CelebrationAnimation() {
  const confettiPieces = Array.from({ length: 20 }, (_, i) => i);
  const colors = ['#ee5b2b', '#ffd700', '#ff69b4', '#00bfff', '#32cd32'];

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confettiPieces.map((i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            backgroundColor: colors[i % colors.length],
            left: `${Math.random() * 100}%`,
            top: '-10%',
          }}
          initial={{ y: -100, opacity: 0 }}
          animate={{
            y: [0, 100, 200],
            opacity: [0, 1, 0],
            x: [-50, 0, 50],
            rotate: [0, 360, 720],
          }}
          transition={{
            duration: 2,
            ease: "easeOut",
            delay: i * 0.05,
          }}
        />
      ))}
    </div>
  );
}
