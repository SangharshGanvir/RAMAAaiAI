'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { pageTransition, scaleIn, buttonHover, buttonTap } from '@/utils/animations';
import { useApp } from '@/contexts/AppContext';
import { AVATAR_OPTIONS } from '@/avatar/avatarManager';

export default function SettingsPage() {
  const router = useRouter();
  const { avatar, updateAvatar } = useApp();
  const [localAvatar, setLocalAvatar] = useState(avatar);

  const handleSave = () => {
    updateAvatar(localAvatar);
    alert('Settings saved!');
  };

  return (
    <motion.div
      className="min-h-screen p-4 md:p-8"
      {...pageTransition}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-primary"
            {...scaleIn}
          >
            Settings ⚙️
          </motion.h1>
          
          <motion.button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-gray-200 rounded-full font-medium"
          >
            ← Back
          </motion.button>
        </div>

        <motion.div
          className="bg-white rounded-2xl p-8 card-shadow-lg mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold mb-6">Customize Rama Aai</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-medium mb-4">Saree Color</h3>
              <div className="flex gap-4">
                {AVATAR_OPTIONS.sareeColors.map((color) => (
                  <motion.button
                    key={color.id}
                    onClick={() => setLocalAvatar({ ...localAvatar, sareeColor: color.id })}
                    className={`w-16 h-16 rounded-full border-4 ${
                      localAvatar.sareeColor === color.id ? 'border-primary' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.color }}
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4">Voice Tone</h3>
              <div className="grid gap-3">
                {AVATAR_OPTIONS.voiceTones.map((tone) => (
                  <motion.button
                    key={tone.id}
                    onClick={() => setLocalAvatar({ ...localAvatar, voiceTone: tone.id as any })}
                    className={`p-4 rounded-lg border-2 text-left ${
                      localAvatar.voiceTone === tone.id
                        ? 'border-primary bg-orange-50'
                        : 'border-gray-300'
                    }`}
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                  >
                    <p className="font-medium">{tone.name}</p>
                    <p className="text-sm text-gray-600">{tone.description}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4">Background Theme</h3>
              <div className="grid grid-cols-2 gap-4">
                {AVATAR_OPTIONS.backgroundThemes.map((theme) => (
                  <motion.button
                    key={theme.id}
                    onClick={() => setLocalAvatar({ ...localAvatar, backgroundTheme: theme.id as 'garden' | 'library' | 'classroom' | 'nature' })}
                    className={`p-6 rounded-lg border-2 ${
                      localAvatar.backgroundTheme === theme.id
                        ? 'border-primary bg-orange-50'
                        : 'border-gray-300'
                    }`}
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                  >
                    <div className="text-4xl mb-2">{theme.emoji}</div>
                    <p className="font-medium">{theme.name}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localAvatar.glasses}
                  onChange={(e) => setLocalAvatar({ ...localAvatar, glasses: e.target.checked })}
                  className="w-6 h-6"
                />
                <span className="text-xl">👓 Add Glasses</span>
              </label>
            </div>
          </div>

          <motion.button
            onClick={handleSave}
            className="w-full mt-8 px-8 py-4 bg-primary text-white text-xl font-bold rounded-full"
            whileHover={buttonHover}
            whileTap={buttonTap}
          >
            Save Settings ✓
          </motion.button>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl p-8 card-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-4">Parent Dashboard</h2>
          <p className="text-gray-600 mb-4">
            View detailed progress and analytics
          </p>
          <motion.button
            onClick={() => router.push('/parent-dashboard')}
            className="px-8 py-3 bg-blue-500 text-white font-medium rounded-full"
            whileHover={buttonHover}
            whileTap={buttonTap}
          >
            Open Parent Dashboard →
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
