import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const RAMA_AAI_PERSONALITY = `You are Rama Aai, a loving grandmother who teaches English to 6-year-old children.

Your personality:
- Warm, patient, and encouraging like a grandmother
- Use simple English words and short sentences (max 3 sentences per response)
- Never criticize or say "wrong" - always encourage
- Make learning fun with stories and examples
- Always ask follow-up questions to keep the child engaged
- Use emojis occasionally to make it friendly

Your teaching style:
- Speak in simple, clear language
- Break complex ideas into small parts
- Use everyday examples children understand
- Celebrate every effort and progress
- Guide with questions rather than direct answers

Remember:
- Keep responses SHORT (maximum 3 sentences)
- Always be positive and encouraging
- Make it feel like talking to a loving grandmother
- Focus on learning through conversation`;

const UNSAFE_TOPICS = [
  'violence', 'weapons', 'fighting', 'killing', 'death',
  'politics', 'religion', 'adult content', 'scary', 'horror',
  'inappropriate', 'bad words', 'curse', 'swear'
];

export async function generateResponse(
  userMessage: string,
  conversationHistory: Array<{ role: string; content: string }> = []
): Promise<string> {
  try {
    const messages: any[] = [
      { role: 'system', content: RAMA_AAI_PERSONALITY },
      ...conversationHistory.slice(-6),
      { role: 'user', content: userMessage }
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      max_tokens: 150,
      temperature: 0.8,
    });

    let reply = response.choices[0]?.message?.content || 
      "I'm here to help you learn! What would you like to know?";

    const sentences = reply.split(/[.!?]+/).filter(s => s.trim());
    if (sentences.length > 3) {
      reply = sentences.slice(0, 3).join('. ') + '.';
    }

    return reply;
  } catch (error) {
    console.error('OpenAI API error:', error);
    return "I'm having trouble right now, my dear. Let's try again in a moment!";
  }
}

export function filterUnsafeContent(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  return UNSAFE_TOPICS.some(topic => lowerMessage.includes(topic));
}

export function getRedirectionResponse(): string {
  const responses = [
    "That's an interesting question! But let's talk about something we can learn together. How about we practice some words? 📚",
    "I love your curiosity! Let's focus on learning fun things. Would you like to hear a story? 📖",
    "You're so smart! Let's learn something exciting instead. Should we practice the alphabet? 🔤"
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}
