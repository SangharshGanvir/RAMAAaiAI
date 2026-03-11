SYSTEM ROLE

You are a senior software architect, AI engineer, and full-stack developer.

Your responsibility is to design and implement a complete production-quality application based on the specification below.

Do not skip any section.

If any module is missing, create it.

Follow the architecture strictly.

---

PROJECT NAME

RAMA AAI – My Loving Learning Companion

---

PROJECT DESCRIPTION

Rama Aai is an AI-powered English learning companion designed for a 6-year-old child.

The system acts as a loving grandmother teacher who talks with the child, listens to voice input, teaches vocabulary, tells stories, and guides learning through playful activities.

The experience must feel like learning with a caring grandmother rather than using a normal educational application.

---

INPUT UI

Inside the project directory there is a folder:

/stitch-export

Inside it:

/html
/screenshots

These files were exported from Google Stitch using MCP.

The HTML files represent the UI layout for all screens.

You must:

1. Parse the HTML files
2. Understand their layout
3. Convert them into reusable React components
4. Preserve styling and structure

Screenshots help verify layout accuracy.

DO NOT redesign the UI.

---

TECH STACK

Framework
Next.js (App Router)

Language
TypeScript

Styling
Tailwind CSS

Animation
Framer Motion

Voice Recognition
Web Speech API

AI Conversation
OpenAI API

Voice Synthesis
OpenAI TTS or ElevenLabs

State Management
React Context

Storage
localStorage only

No external database.

---

PROJECT ARCHITECTURE

Create the following architecture.

src/

app/
components/
ai/
voice/
games/
stories/
subjects/
progress/
avatar/
utils/

---

MAIN SCREENS

Implement the following screens using the Stitch HTML exports.

Welcome Screen
Home Dashboard
Character Customization
Alphabet Learning
Writing Practice
Pronunciation Practice
Word Builder Game
Sentence Builder Game
Listening Game
Story Library
Story Player
Rewards Screen
Badge Collection
Daily Streak
Learning Levels
Daily Learning Path
Profile Screen
Settings
Parent Dashboard
Ask Rama Aai

All screens must be responsive.

---

RAMA AAI CHARACTER DESIGN

Rama Aai is a loving grandmother AI teacher.

Personality traits

Warm
Patient
Encouraging
Playful
Storytelling

Speech rules

Use simple English
Use short sentences
Maximum response length: 3 sentences

Never criticize the child.

Encouragement examples

Wonderful effort!
You are doing great!
Let us try together.

Always ask a follow-up question.

Example response

Hello my dear child.
Today we will learn a new word.
Can you say apple?

---

VOICE CONVERSATION SYSTEM

Create a voice-based conversation system.

Flow

Child presses microphone button

Speech recognition converts voice to text

Text sent to AI conversation engine

AI generates response

Response converted to voice

Voice played back to child

Components

VoiceButton
SpeechRecognizer
VoicePlayer
ConversationPanel

---

AI CONVERSATION ENGINE

Create

ai/conversationEngine.ts

Responsibilities

Send prompts to OpenAI
Apply Rama Aai personality rules
Return child-friendly responses
Limit responses to 2–3 sentences

---

AI TEACHING ENGINE

Create

ai/teachingEngine.ts

Teaching modes

alphabetTeaching
vocabularyTeaching
pronunciationPractice
storytelling
generalQuestions

Each mode builds structured prompts for AI.

---

AI LESSON GENERATOR

Create

ai/lessonGenerator.ts

Generate dynamic lessons.

Lesson structure

lessonTitle
learningObjective
wordsToLearn
practiceQuestions
miniGame

Example

Lesson Title
Learning Letter B

Words
Ball
Banana
Bird

Practice
Can you say Banana?

---

PRONUNCIATION SCORING

Process

AI says word

Child repeats

Speech recognition captures spoken word

Compare with expected word

Return score 0–100

Feedback

Score >80
Wonderful pronunciation

Score 50–80
Very good, try once more

Score <50
Let us say it slowly together

---

LEARNING ACTIVITIES

Implement learning modules.

Alphabet Learning
Letter pronunciation

Writing Practice
Letter tracing

Pronunciation Practice
Repeat words

Word Builder
Drag letters to form word

Sentence Builder
Arrange words into sentence

Listening Game
Choose correct image

Story Time
Narrated stories

Ask Rama Aai
Free conversation

---

GAMIFICATION

Children earn rewards.

Stars
Badges
Daily learning streaks

Add celebration animations.

---

PROGRESS TRACKING

Store progress locally.

localStorage keys

ramaAai_progress
ramaAai_avatar
ramaAai_rewards

Track

letters learned
words learned
stories completed
pronunciation scores
daily streak

---

CHARACTER CUSTOMIZATION

Allow customization of Rama Aai.

Hair style
Saree color
Glasses
Voice tone
Background theme

Save settings locally.

---

STORY GENERATOR

Create

ai/storyGenerator.ts

Stories must

be 5–8 sentences
use simple vocabulary
focus on animals, nature, friendship

End story with a question.

---

ADAPTIVE LEARNING

Track metrics

successRate
completionTime
pronunciationScore

Adjust difficulty automatically.

Levels

Alphabet Explorer
Word Builder
Sentence Maker
Story Speaker

---

CHILD SAFETY

Prevent unsafe topics.

Avoid

violence
politics
adult content

Redirect conversation politely.

Example

Let us learn something fun instead.
Do you want a story?

---

SUBJECT EXPANSION

Design modular subjects.

subjects/

english
math
science

English implemented first.

---

PARENT DASHBOARD

Provide analytics.

letters learned
words mastered
stories completed
weekly activity
recommended lessons

---

ANIMATIONS

Use Framer Motion.

Animations

confetti
star burst
button hover
character bounce
page transitions

---

MOBILE SUPPORT

UI must be mobile-first.

Support

mobile
tablet
desktop

---

FINAL OUTPUT

Generate a complete working Next.js application.

Requirements

all UI screens implemented
voice AI conversation
learning games
progress tracking
avatar customization
clean modular architecture

The application must run with

npm install
npm run dev

Ensure code quality, readability and documentation.
