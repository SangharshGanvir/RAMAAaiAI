# RAMA AAI - My Loving Learning Companion

An AI-powered English learning companion designed for 6-year-old children. Rama Aai acts as a loving grandmother teacher who talks with the child, listens to voice input, teaches vocabulary, tells stories, and guides learning through playful activities.

## 🌟 Features

### Core Features
- **Voice Conversation**: Talk with Rama Aai using speech recognition and synthesis
- **AI-Powered Teaching**: Personalized learning with OpenAI GPT-4
- **Alphabet Learning**: Interactive letter pronunciation and recognition
- **Word Building Games**: Drag-and-drop letter games
- **Sentence Builder**: Arrange words to form sentences
- **Listening Comprehension**: Choose correct images based on spoken words
- **Story Time**: AI-generated stories with questions
- **Pronunciation Practice**: Real-time pronunciation scoring
- **Progress Tracking**: Track letters learned, words mastered, stories completed
- **Gamification**: Earn stars, badges, and maintain daily streaks
- **Character Customization**: Customize Rama Aai's appearance and voice

### Learning Activities
1. **Alphabet Explorer** - Learn all 26 letters with pronunciation
2. **Word Builder** - Build words from scrambled letters
3. **Sentence Maker** - Arrange words into sentences
4. **Story Speaker** - Listen to and interact with stories
5. **Pronunciation Practice** - Practice saying words correctly
6. **Ask Rama Aai** - Free conversation with AI teacher

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- OpenAI API key (for AI conversation and teaching)

### Installation

1. **Clone the repository**
```bash
cd rama-aai-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your API keys:
```env
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
rama-aai-app/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Welcome screen
│   ├── dashboard/                # Main dashboard
│   ├── conversation/             # Voice conversation with Rama Aai
│   ├── activities/               # Learning activities
│   │   └── alphabet/             # Alphabet learning
│   ├── stories/                  # Story library
│   ├── rewards/                  # Badges and achievements
│   ├── settings/                 # Customization settings
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── ai/                           # AI engines
│   ├── conversationEngine.ts    # OpenAI conversation handler
│   ├── teachingEngine.ts        # Teaching mode prompts
│   ├── lessonGenerator.ts       # Dynamic lesson generation
│   └── storyGenerator.ts        # Story creation
├── voice/                        # Voice systems
│   ├── speechRecognizer.ts      # Web Speech API wrapper
│   └── voiceSynthesizer.ts      # Text-to-speech
├── components/                   # Reusable UI components
│   ├── VoiceButton.tsx           # Microphone button
│   ├── RamaAaiCharacter.tsx     # Animated character
│   ├── ProgressBar.tsx           # Progress visualization
│   ├── StarDisplay.tsx           # Star counter
│   └── CelebrationAnimation.tsx # Confetti animation
├── games/                        # Learning games
│   ├── AlphabetGame.tsx          # Letter learning
│   ├── WordBuilderGame.tsx       # Word building
│   ├── SentenceBuilderGame.tsx   # Sentence building
│   └── ListeningGame.tsx         # Listening comprehension
├── progress/                     # Progress tracking
│   └── progressTracker.ts       # localStorage-based tracking
├── avatar/                       # Character customization
│   └── avatarManager.ts         # Avatar settings
├── contexts/                     # React contexts
│   └── AppContext.tsx           # Global state management
├── utils/                        # Utilities
│   └── animations.ts            # Framer Motion animations
├── types/                        # TypeScript types
│   └── index.ts                 # Type definitions
└── package.json                  # Dependencies

```

## 🎮 How to Use

### For Children

1. **Start Learning**: Click "Start Learning" on the welcome screen
2. **Choose Activity**: Select from alphabet, words, stories, or conversation
3. **Use Voice**: Press the microphone button to speak
4. **Earn Rewards**: Complete activities to earn stars and badges
5. **Customize**: Change Rama Aai's appearance in settings

### For Parents

1. **View Progress**: Access parent dashboard from settings
2. **Track Learning**: See letters learned, words mastered, stories completed
3. **Monitor Streak**: Check daily learning streak
4. **Review Badges**: See all earned achievements

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **AI**: OpenAI GPT-4
- **Voice**: Web Speech API
- **State**: React Context
- **Storage**: localStorage

## 🎨 Design Principles

### Rama Aai Personality
- **Warm & Patient**: Never criticizes, always encourages
- **Simple Language**: Short sentences, simple words
- **Playful**: Makes learning fun and engaging
- **Storytelling**: Uses stories to teach concepts
- **Encouraging**: Celebrates every effort

### Speech Rules
- Maximum 3 sentences per response
- Use simple English vocabulary
- Always ask follow-up questions
- Provide positive reinforcement

### Child Safety
- Content filtering for inappropriate topics
- Polite redirection to learning topics
- No violence, politics, or adult content

## 📊 Progress Tracking

### Metrics Tracked
- Letters learned (0-26)
- Words mastered
- Stories completed
- Pronunciation scores
- Daily learning streak
- Total stars earned
- Badges collected

### Badges Available
- **Alphabet Starter**: Learn 5 letters
- **Alphabet Master**: Learn all 26 letters
- **Word Explorer**: Learn 10 words
- **Story Lover**: Complete 5 stories
- **Week Warrior**: 7-day learning streak

## 🎯 Learning Levels

1. **Alphabet Explorer**: Learning letters and sounds
2. **Word Builder**: Building simple words
3. **Sentence Maker**: Creating sentences
4. **Story Speaker**: Reading and comprehension

## 🔧 Configuration

### Avatar Customization
- Hair styles: Bun, Braided, Short
- Saree colors: Orange, Purple, Blue, Green, Red
- Voice tones: Warm, Gentle, Cheerful
- Background themes: Garden, Library, Classroom, Nature
- Glasses: On/Off

### Voice Settings
- **Warm**: Rate 0.9, Pitch 1.1
- **Gentle**: Rate 0.85, Pitch 1.15
- **Cheerful**: Rate 1.0, Pitch 1.2

## 📝 API Requirements

### OpenAI API
- Model: GPT-4
- Used for: Conversation, teaching, story generation
- Rate limits: Consider implementing caching

### Web Speech API
- Browser support: Chrome, Edge, Safari
- Permissions: Microphone access required
- Fallback: Text input if speech not available

## 🚧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Adding New Features

1. **New Learning Activity**: Add to `games/` folder
2. **New Page**: Add to `app/` folder
3. **New AI Mode**: Add to `ai/teachingEngine.ts`
4. **New Badge**: Add to `progress/progressTracker.ts`

## 🐛 Troubleshooting

### Voice Recognition Not Working
- Check browser compatibility (Chrome/Edge recommended)
- Grant microphone permissions
- Check microphone hardware

### AI Not Responding
- Verify OpenAI API key in `.env.local`
- Check API rate limits
- Verify internet connection

### Progress Not Saving
- Check localStorage is enabled
- Clear browser cache if corrupted
- Check browser console for errors

## 📱 Browser Support

- **Chrome**: ✅ Full support
- **Edge**: ✅ Full support
- **Safari**: ⚠️ Limited speech recognition
- **Firefox**: ⚠️ Limited speech recognition

## 🔐 Privacy & Security

- **No External Database**: All data stored locally
- **No User Accounts**: No registration required
- **API Keys**: Stored in environment variables
- **Child Safety**: Content filtering enabled

## 🎓 Educational Standards

Aligned with early childhood education standards:
- Phonemic awareness
- Letter recognition
- Vocabulary development
- Listening comprehension
- Speaking skills

## 📄 License

This project is created for educational purposes.

## 🤝 Contributing

This is a portfolio project. For questions or suggestions, please contact the developer.

## 📞 Support

For issues or questions:
1. Check troubleshooting section
2. Review browser console for errors
3. Verify API keys are configured correctly

## 🎉 Acknowledgments

- OpenAI for GPT-4 API
- Next.js team for the framework
- Framer Motion for animations
- Tailwind CSS for styling

---

**Built with ❤️ for children's education**

*RAMA AAI - Where learning feels like spending time with a loving grandmother*
