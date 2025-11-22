// Audio feedback system for user interactions

class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map()
  private enabled: boolean = true

  constructor() {
    // Load sound preference from localStorage
    const soundPref = localStorage.getItem('zomato-sounds-enabled')
    this.enabled = soundPref !== 'false'
    this.initializeSounds()
  }

  private initializeSounds() {
    // Create audio elements for different actions
    const soundEffects = {
      addToCart: this.createBeep(800, 0.1, 'sine'),
      orderPlaced: this.createBeep(1000, 0.15, 'sine'),
      notification: this.createBeep(600, 0.08, 'sine'),
      favorite: this.createBeep(900, 0.12, 'triangle'),
      error: this.createBeep(300, 0.2, 'sawtooth'),
      success: this.createBeep(1200, 0.1, 'sine'),
    }

    Object.entries(soundEffects).forEach(([key, audio]) => {
      this.sounds.set(key, audio)
    })
  }

  private createBeep(frequency: number, duration: number, type: OscillatorType): HTMLAudioElement {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = frequency
    oscillator.type = type

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)

    // Create a dummy audio element for consistent interface
    const audio = new Audio()
    audio.volume = 0.3

    // Store the Web Audio API nodes for playback
    ;(audio as any)._oscillator = oscillator
    ;(audio as any)._gainNode = gainNode
    ;(audio as any)._audioContext = audioContext
    ;(audio as any)._frequency = frequency
    ;(audio as any)._duration = duration
    ;(audio as any)._type = type

    return audio
  }

  private playWebAudio(audio: HTMLAudioElement) {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = (audio as any)._frequency
    oscillator.type = (audio as any)._type

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + (audio as any)._duration)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + (audio as any)._duration)
  }

  play(soundName: string) {
    if (!this.enabled) return

    const sound = this.sounds.get(soundName)
    if (sound) {
      try {
        this.playWebAudio(sound)
      } catch (error) {
        console.warn('Sound playback failed:', error)
      }
    }
  }

  toggle() {
    this.enabled = !this.enabled
    localStorage.setItem('zomato-sounds-enabled', String(this.enabled))
    return this.enabled
  }

  isEnabled() {
    return this.enabled
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled
    localStorage.setItem('zomato-sounds-enabled', String(enabled))
  }
}

export const soundManager = new SoundManager()

// Convenience functions
export const playAddToCart = () => soundManager.play('addToCart')
export const playOrderPlaced = () => soundManager.play('orderPlaced')
export const playNotification = () => soundManager.play('notification')
export const playFavorite = () => soundManager.play('favorite')
export const playError = () => soundManager.play('error')
export const playSuccess = () => soundManager.play('success')
