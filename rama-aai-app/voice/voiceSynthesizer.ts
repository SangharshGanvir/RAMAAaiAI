export class VoiceSynthesizer {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private voicesLoaded: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      
      if (this.synth) {
        this.synth.onvoiceschanged = () => {
          this.loadVoices();
        };
      }
    }
  }

  private loadVoices(): void {
    if (this.synth) {
      this.voices = this.synth.getVoices();
      if (this.voices.length > 0) {
        this.voicesLoaded = true;
      }
    }
  }

  private async waitForVoices(): Promise<void> {
    if (this.voicesLoaded && this.voices.length > 0) {
      return;
    }

    return new Promise((resolve) => {
      const checkVoices = () => {
        this.loadVoices();
        if (this.voices.length > 0) {
          resolve();
        } else {
          setTimeout(checkVoices, 100);
        }
      };
      checkVoices();
    });
  }

  private selectFemaleVoice(): SpeechSynthesisVoice | null {
    // Prioritize female voices that sound like a grandmother
    const femaleVoice = this.voices.find(voice => 
      voice.lang.startsWith('en') && (
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('woman') ||
        voice.name.toLowerCase().includes('samantha') ||
        voice.name.toLowerCase().includes('victoria') ||
        voice.name.toLowerCase().includes('karen') ||
        voice.name.toLowerCase().includes('moira') ||
        voice.name.toLowerCase().includes('fiona') ||
        voice.name.toLowerCase().includes('zira') ||
        voice.name.toLowerCase().includes('hazel') ||
        voice.name.toLowerCase().includes('susan') ||
        voice.name.toLowerCase().includes('allison')
      )
    );

    if (femaleVoice) return femaleVoice;

    // Fallback: find any English voice
    return this.voices.find(voice => voice.lang.startsWith('en')) || null;
  }

  async speak(text: string, options?: { rate?: number; pitch?: number; volume?: number }): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (!this.synth) {
        reject('Speech synthesis not supported');
        return;
      }

      // Wait for voices to load
      await this.waitForVoices();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Select female voice
      const femaleVoice = this.selectFemaleVoice();
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }

      // Slower rate and slightly higher pitch for grandmother voice
      utterance.rate = options?.rate || 0.85;
      utterance.pitch = options?.pitch || 1.15;
      utterance.volume = options?.volume || 1.0;

      utterance.onend = () => resolve();
      utterance.onerror = (error) => reject(error);

      this.synth.speak(utterance);
    });
  }

  stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  isSpeaking(): boolean {
    return this.synth?.speaking || false;
  }
}

export async function speakWithOpenAI(text: string, apiKey: string): Promise<void> {
  try {
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1',
        input: text,
        voice: 'nova',
      }),
    });

    if (!response.ok) throw new Error('TTS request failed');

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    
    return new Promise((resolve, reject) => {
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        resolve();
      };
      audio.onerror = reject;
      audio.play();
    });
  } catch (error) {
    console.error('OpenAI TTS error:', error);
    const fallback = new VoiceSynthesizer();
    return fallback.speak(text);
  }
}
