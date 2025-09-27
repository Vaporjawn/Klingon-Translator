/**
 * @fileoverview Main speech service coordinating text-to-speech and audio effects
 *
 * This service provides a unified interface for all speech and audio functionality,
 * including text-to-speech synthesis and Star Trek-inspired sound effects.
 * It coordinates multiple specialized modules to provide a clean API.
 *
 * @example
 * ```typescript
 * import { speechService } from './speechService';
 *
 * // Check if speech is supported
 * if (speechService.isSupported()) {
 *   // Speak text with language-specific optimization
 *   await speechService.speak("nuqneH", "tlh");
 *
 *   // Play UI sound effects
 *   speechService.playTranslationSound();
 *   speechService.playSuccessSound();
 * }
 * ```
 */

// Type declarations for browser speech APIs are handled in individual modules

import {
  isSupported as isSpeechSupported,
  getAvailableVoices,
} from "../speech/SpeechSynthesis/SpeechSynthesis";
import {
  speakText,
  stopSpeaking,
  isSpeaking,
  getSpeechState,
} from "../speech/TextToSpeech/TextToSpeech";
import {
  playTranslationSound,
  playSuccessSound,
  playErrorSound,
  playClickSound,
  isAudioSupported,
} from "../speech/AudioEffects/AudioEffects";

/**
 * Unified speech service providing text-to-speech and audio effects
 *
 * This service coordinates all speech-related functionality through a single
 * interface, making it easy to integrate speech features throughout the app.
 */
class SpeechService {
  /**
   * Checks if speech synthesis is supported in the current environment
   *
   * @returns {boolean} True if text-to-speech is available
   *
   * @example
   * ```typescript
   * if (speechService.isSupported()) {
   *   console.log("Speech synthesis ready");
   * }
   * ```
   */
  public isSupported(): boolean {
    return isSpeechSupported();
  }

  /**
   * Converts text to speech with language-specific optimizations
   *
   * @param {string} text - Text to speak
   * @param {'en' | 'tlh'} language - Language code (default: 'en')
   * @returns {Promise<void>} Promise that resolves when speech completes
   *
   * @example
   * ```typescript
   * // English text
   * await speechService.speak("Hello, world!");
   *
   * // Klingon text with optimized voice
   * await speechService.speak("Qapla'!", "tlh");
   * ```
   */
  public async speak(
    text: string,
    language: "en" | "tlh" = "en",
  ): Promise<void> {
    return speakText(text, language);
  }

  /**
   * Stops any currently active speech synthesis
   *
   * @returns {boolean} True if speech was stopped
   *
   * @example
   * ```typescript
   * speechService.speak("Long text...", "en");
   * // Stop it immediately
   * speechService.stopSpeaking();
   * ```
   */
  public stopSpeaking(): boolean {
    return stopSpeaking();
  }

  /**
   * Checks if speech is currently active
   *
   * @returns {boolean} True if speech is playing
   *
   * @example
   * ```typescript
   * const isActive = speechService.isSpeaking();
   * if (isActive) {
   *   console.log("Speech in progress");
   * }
   * ```
   */
  public isSpeaking(): boolean {
    return isSpeaking();
  }

  /**
   * Gets detailed speech synthesis state information
   *
   * @returns {object} Current state with speaking, pending, and paused flags
   */
  public getSpeechState() {
    return getSpeechState();
  }

  /**
   * Gets all available speech synthesis voices
   *
   * @returns {SpeechSynthesisVoice[]} Array of available voices
   *
   * @example
   * ```typescript
   * const voices = speechService.getAvailableVoices();
   * voices.forEach(voice => {
   *   console.log(`${voice.name} (${voice.lang})`);
   * });
   * ```
   */
  public getAvailableVoices(): SpeechSynthesisVoice[] {
    return getAvailableVoices();
  }

  /**
   * Plays a futuristic translation confirmation sound
   *
   * @returns {boolean} True if sound was played successfully
   *
   * @example
   * ```typescript
   * // Play when starting translation
   * speechService.playTranslationSound();
   * ```
   */
  public playTranslationSound(): boolean {
    return playTranslationSound();
  }

  /**
   * Plays a success confirmation chime
   *
   * @returns {boolean} True if sound was played successfully
   *
   * @example
   * ```typescript
   * // Play when translation succeeds
   * speechService.playSuccessSound();
   * ```
   */
  public playSuccessSound(): boolean {
    return playSuccessSound();
  }

  /**
   * Plays an error warning sound
   *
   * @returns {boolean} True if sound was played successfully
   *
   * @example
   * ```typescript
   * // Play when translation fails
   * speechService.playErrorSound();
   * ```
   */
  public playErrorSound(): boolean {
    return playErrorSound();
  }

  /**
   * Plays a subtle UI interaction sound
   *
   * @returns {boolean} True if sound was played successfully
   *
   * @example
   * ```typescript
   * // Play on button clicks
   * speechService.playClickSound();
   * ```
   */
  public playClickSound(): boolean {
    return playClickSound();
  }

  /**
   * Checks if audio effects are supported
   *
   * @returns {boolean} True if Web Audio API is available
   *
   * @example
   * ```typescript
   * if (speechService.isAudioSupported()) {
   *   speechService.playTranslationSound();
   * }
   * ```
   */
  public isAudioSupported(): boolean {
    return isAudioSupported();
  }
}

/** Singleton instance of the speech service */
export const speechService = new SpeechService();
