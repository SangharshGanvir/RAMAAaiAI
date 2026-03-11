export class SpeechRecognizer {
  private recognition: any;
  private isListening: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';
      }
    }
  }

  startListening(onResult: (text: string) => void, onError?: (error: string) => void): void {
    if (!this.recognition) {
      onError?.('Speech recognition not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    if (this.isListening) return;

    this.isListening = true;

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (transcript && transcript.trim().length > 0) {
        onResult(transcript);
      } else {
        onError?.('Could not hear you clearly. Please try again!');
      }
      this.isListening = false;
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      this.isListening = false;
      
      // Provide user-friendly error messages
      switch (event.error) {
        case 'no-speech':
          onError?.('Could not hear you. Please speak clearly and try again!');
          break;
        case 'audio-capture':
          onError?.('Microphone not found. Please check your microphone connection.');
          break;
        case 'not-allowed':
          onError?.('Microphone permission denied. Please allow microphone access.');
          break;
        case 'network':
          onError?.('Network error. Please check your internet connection.');
          break;
        default:
          onError?.('Could not hear you. Try again!');
      }
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    try {
      this.recognition.start();
    } catch (error) {
      console.error('Error starting recognition:', error);
      this.isListening = false;
      onError?.('Failed to start listening. Please try again.');
    }
  }

  stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  isCurrentlyListening(): boolean {
    return this.isListening;
  }
}

export function calculatePronunciationScore(spoken: string, expected: string): number {
  const spokenLower = spoken.toLowerCase().trim();
  const expectedLower = expected.toLowerCase().trim();

  if (spokenLower === expectedLower) return 100;

  const similarity = calculateSimilarity(spokenLower, expectedLower);
  return Math.round(similarity * 100);
}

function calculateSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}
