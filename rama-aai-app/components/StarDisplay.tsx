'use client';

import { motion } from 'framer-motion';
import { starBurst } from '@/utils/animations';

interface StarDisplayProps {
  count: number;
  animate?: boolean;
}

export default function StarDisplay({ count, animate = false }: StarDisplayProps) {
  return (
    <div className="flex items-center gap-2">
      <motion.span
        className="text-3xl"
        {...(animate ? starBurst : {})}
      >
        ⭐
      </motion.span>
      <span className="text-2xl font-bold text-primary">{count}</span>
    </div>
  );
}
