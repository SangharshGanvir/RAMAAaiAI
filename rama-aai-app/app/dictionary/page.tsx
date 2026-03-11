'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { pageTransition, scaleIn, buttonHover, buttonTap } from '@/utils/animations';
import { VoiceSynthesizer } from '@/voice/voiceSynthesizer';
import { SpeechRecognizer } from '@/voice/speechRecognizer';
import { searchDictionary, getWordDefinition, getRandomWord, DictionaryEntry } from '@/data/dictionaryData';

export default function DictionaryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<DictionaryEntry[]>([]);
  const [selectedWord, setSelectedWord] = useState<DictionaryEntry | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [randomWord, setRandomWord] = useState<DictionaryEntry | null>(null);
  
  const voiceSynth = new VoiceSynthesizer();
  const speechRecognizer = new SpeechRecognizer();

  useEffect(() => {
    // Show a random word on load
    setRandomWord(getRandomWord());
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = searchDictionary(query);
      setSearchResults(results);
      setSelectedWord(null);
    } else {
      setSearchResults([]);
      setSelectedWord(null);
    }
  };

  const handleWordClick = (word: DictionaryEntry) => {
    setSelectedWord(word);
    setSearchResults([]);
  };

  const speakDefinition = async (entry: DictionaryEntry) => {
    try {
      await voiceSynth.speak(`The word is ${entry.word}.`);
      await new Promise(resolve => setTimeout(resolve, 500));
      await voiceSynth.speak(entry.definition);
      await new Promise(resolve => setTimeout(resolve, 500));
      await voiceSynth.speak(`For example: ${entry.example}`);
    } catch (error) {
      console.error('Error speaking definition:', error);
    }
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    
    speechRecognizer.startListening(
      (spokenText) => {
        setIsListening(false);
        setSearchQuery(spokenText);
        handleSearch(spokenText);
        
        // Try to find exact match and speak it
        const exactMatch = getWordDefinition(spokenText);
        if (exactMatch) {
          setSelectedWord(exactMatch);
          speakDefinition(exactMatch);
        }
      },
      (error) => {
        setIsListening(false);
        console.error('Voice search error:', error);
      }
    );
  };

  const handleRandomWord = () => {
    const word = getRandomWord();
    setRandomWord(word);
    setSelectedWord(word);
    speakDefinition(word);
  };

  return (
    <motion.div
      className="min-h-screen p-4 md:p-8"
      {...pageTransition}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-primary"
            {...scaleIn}
          >
            📖 Word Dictionary
          </motion.h1>
          
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-gray-200 rounded-full font-medium text-gray-800"
          >
            ← Back
          </button>
        </div>

        <motion.p
          className="text-xl text-gray-700 mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Search for any word to learn its meaning! Use text or voice search.
        </motion.p>

        {/* Search Section */}
        <div className="bg-white rounded-2xl p-6 card-shadow-lg mb-6">
          <div className="flex gap-4 mb-4">
            {/* Text Search */}
            <input
              type="text"
              placeholder="Type a word to search..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 px-6 py-4 rounded-full border-2 border-gray-300 focus:border-primary focus:outline-none text-lg text-gray-800"
            />
            
            {/* Voice Search Button */}
            <motion.button
              onClick={handleVoiceSearch}
              disabled={isListening}
              className={`px-8 py-4 rounded-full font-medium text-lg ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-blue-500 text-white'
              }`}
              whileHover={!isListening ? buttonHover : {}}
              whileTap={!isListening ? buttonTap : {}}
            >
              {isListening ? '🎤 Listening...' : '🎤 Voice Search'}
            </motion.button>

            {/* Random Word Button */}
            <motion.button
              onClick={handleRandomWord}
              className="px-8 py-4 bg-purple-500 text-white rounded-full font-medium text-lg"
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              🎲 Random Word
            </motion.button>
          </div>

          {/* Search Results */}
          <AnimatePresence>
            {searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4"
              >
                <p className="text-gray-600 mb-2">Found {searchResults.length} results:</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {searchResults.slice(0, 12).map((result, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleWordClick(result)}
                      className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg text-left hover:shadow-md transition-shadow border-2 border-transparent hover:border-primary"
                      whileHover={buttonHover}
                      whileTap={buttonTap}
                    >
                      <p className="font-bold text-primary text-lg">{result.word}</p>
                      <p className="text-sm text-gray-600 capitalize">{result.category} • {result.difficulty}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Selected Word Definition */}
        <AnimatePresence mode="wait">
          {selectedWord && (
            <motion.div
              key={selectedWord.word}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 card-shadow-lg"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-5xl font-bold text-primary mb-2">{selectedWord.word}</h2>
                  <div className="flex gap-2">
                    <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                      selectedWord.difficulty === 'easy' ? 'bg-green-200 text-green-800' :
                      selectedWord.difficulty === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-red-200 text-red-800'
                    }`}>
                      {selectedWord.difficulty.toUpperCase()}
                    </span>
                    <span className="px-4 py-1 bg-blue-200 text-blue-800 rounded-full text-sm font-medium capitalize">
                      {selectedWord.category}
                    </span>
                  </div>
                </div>
                
                <motion.button
                  onClick={() => speakDefinition(selectedWord)}
                  className="px-6 py-3 bg-primary text-white rounded-full font-medium"
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                >
                  🔊 Listen
                </motion.button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">📝 Definition:</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">{selectedWord.definition}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">💡 Example:</h3>
                  <p className="text-lg text-gray-700 italic leading-relaxed">"{selectedWord.example}"</p>
                </div>

                {selectedWord.synonyms && selectedWord.synonyms.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">🔄 Similar Words:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedWord.synonyms.map((syn, idx) => (
                        <span key={idx} className="px-4 py-2 bg-green-100 text-green-800 rounded-full">
                          {syn}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedWord.antonyms && selectedWord.antonyms.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">↔️ Opposite Words:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedWord.antonyms.map((ant, idx) => (
                        <span key={idx} className="px-4 py-2 bg-red-100 text-red-800 rounded-full">
                          {ant}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Random Word of the Day */}
        {!selectedWord && randomWord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 card-shadow-lg"
          >
            <h3 className="text-2xl font-bold text-primary mb-4">✨ Word of the Moment</h3>
            <div className="cursor-pointer" onClick={() => handleWordClick(randomWord)}>
              <h4 className="text-4xl font-bold text-gray-800 mb-2">{randomWord.word}</h4>
              <p className="text-lg text-gray-700">{randomWord.definition}</p>
              <p className="text-sm text-gray-600 mt-2 capitalize">Category: {randomWord.category}</p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
