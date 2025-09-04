'use client';

class SoundManager {
  private sounds: { [key: string]: { play: () => void } } = {};
  private muted = false;

  constructor() {
    if (typeof window !== 'undefined') {
      // Placeholder sounds - in real implementation, load actual audio files
      this.sounds = {
        click: { play: () => console.log('🔊 Click sound') },
        drumroll: { play: () => console.log('🔊 Drumroll sound') },
        victory: { play: () => console.log('🔊 Victory sound') },
        defeat: { play: () => console.log('🔊 Defeat sound') },
        draw: { play: () => console.log('🔊 Draw sound') }
      };
    }
  }

  play(soundName: string) {
    if (!this.muted && this.sounds[soundName]) {
      this.sounds[soundName].play();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }
}

export const soundManager = new SoundManager();