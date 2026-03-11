'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { pageTransition, scaleIn } from '@/utils/animations';
import { useApp } from '@/contexts/AppContext';
import VoiceButton from '@/components/VoiceButton';
import RamaAaiCharacter from '@/components/RamaAaiCharacter';
import { SpeechRecognizer } from '@/voice/speechRecognizer';
import { VoiceSynthesizer } from '@/voice/voiceSynthesizer';
import { generateResponse, filterUnsafeContent, getRedirectionResponse } from '@/ai/conversationEngine';

export default function ConversationPage() {
  const router = useRouter();
  const { conversationHistory, addMessage } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');

  const speechRecognizer = new SpeechRecognizer();
  const voiceSynth = new VoiceSynthesizer();

  const handleStartListening = () => {
    setIsListening(true);
    setCurrentMessage('Listening...');
    
    speechRecognizer.startListening(
      async (spokenText) => {
        setIsListening(false);
        setCurrentMessage('');
        
        addMessage({
          role: 'user',
          content: spokenText,
          timestamp: new Date(),
        });

        await processUserMessage(spokenText);
      },
      (error) => {
        setIsListening(false);
        setCurrentMessage('Could not hear you. Try again!');
      }
    );
  };

  const handleStopListening = () => {
    speechRecognizer.stopListening();
    setIsListening(false);
    setCurrentMessage('');
  };

  const processUserMessage = async (userMessage: string) => {
    setIsProcessing(true);
    
    try {
      let response: string;
      
      if (filterUnsafeContent(userMessage)) {
        response = getRedirectionResponse();
      } else {
        const history = conversationHistory.map(msg => ({
          role: msg.role,
          content: msg.content
        }));
        response = await generateResponse(userMessage, history);
      }

      addMessage({
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      });

      await voiceSynth.speak(response);
    } catch (error) {
      console.error('Conversation error:', error);
      const fallbackResponse = 'I am here to help you learn. What would you like to know?';
      addMessage({
        role: 'assistant',
        content: fallbackResponse,
        timestamp: new Date(),
      });
      await voiceSynth.speak(fallbackResponse);
    } finally {
      setIsProcessing(false);
    }
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
            Ask Rama Aai
          </motion.h1>
          
          <motion.button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-gray-200 rounded-full font-medium"
          >
            ← Back
          </motion.button>
        </div>

        <motion.div
          className="bg-white rounded-2xl p-6 card-shadow-lg mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <RamaAaiCharacter />
          <p className="text-center text-xl font-medium text-gray-700 mt-4">
            Hello my dear! Ask me anything you want to learn.
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl p-6 card-shadow-lg mb-6 max-h-96 overflow-y-auto">
          {conversationHistory.length === 0 ? (
            <p className="text-center text-gray-500">
              Press the microphone to start talking with Rama Aai
            </p>
          ) : (
            <div className="space-y-4">
              {conversationHistory.map((msg, index) => (
                <motion.div
                  key={index}
                  className={`p-4 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-blue-100 ml-8'
                      : 'bg-orange-100 mr-8'
                  }`}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <p className="font-medium mb-1 text-gray-900">
                    {msg.role === 'user' ? 'You' : 'Rama Aai'}
                  </p>
                  <p className="text-gray-800">{msg.content}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-4">
          {currentMessage && (
            <motion.p
              className="text-xl font-medium text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {currentMessage}
            </motion.p>
          )}

          {isProcessing ? (
            <div className="text-2xl">⏳ Thinking...</div>
          ) : (
            <VoiceButton
              onStartListening={handleStartListening}
              onStopListening={handleStopListening}
              isListening={isListening}
            />
          )}

          <p className="text-gray-600 text-center">
            Press the microphone and speak clearly
          </p>
        </div>
      </div>
    </motion.div>
  );
}
