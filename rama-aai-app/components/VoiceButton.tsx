'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { buttonHover, buttonTap, pulseGlow } from '@/utils/animations';

interface VoiceButtonProps {
  onStartListening: () => void;
  onStopListening: () => void;
  isListening: boolean;
}

export default function VoiceButton({ onStartListening, onStopListening, isListening }: VoiceButtonProps) {
  return (
    <motion.button
      onClick={isListening ? onStopListening : onStartListening}
      className={`relative w-20 h-20 rounded-full flex items-center justify-center text-4xl ${
        isListening ? 'bg-red-500' : 'bg-primary'
      } text-white shadow-lg`}
      whileHover={buttonHover}
      whileTap={buttonTap}
      animate={isListening ? pulseGlow.animate : {}}
    >
      {isListening ? '⏹️' : '🎤'}
    </motion.button>
  );
}
