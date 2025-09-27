/**
 * @fileoverview Text-to-speech functionality with language-specific optimizations
 * @module TextToSpeech
 * @version 1.0.0
 *
 * @description
 * This module provides high-level text-to-speech functionality that coordinates
 * speech synthesis with proper error handling and language optimization.
 * It handles the complete speech pipeline from text input to audio output.
 *
 * @example
 * ```typescript
 * import { speakText, stopSpeaking } from './TextToSpeech';
 *
 * // Speak English text
 * try {
 *   await speakText("Hello, world!", "en");
 *   console.log("Speech completed");
 * } catch (error) {
 *   console.error("Speech failed:", error);
 * }
 *
 * // Stop any ongoing speech
 * stopSpeaking();
 * ```
 */

import {
  getSpeechSynthesis,
  isSupported,
  getLanguageConfig,
  findBestVoice,
  type SupportedLanguage,
} from "../SpeechSynthesis/SpeechSynthesis";

/**
 * Result of a text-to-speech operation
 * @interface SpeechResult
 */
export interface SpeechResult {
  /** Whether the speech operation was successful */
  success: boolean;
  /** Error message if speech failed */
  error?: string;
  /** Duration of speech in milliseconds (if successful) */
  duration?: number;
}

/**
 * Converts text to speech with language-specific optimizations
 *
 * This function handles the complete text-to-speech pipeline including
 * validation, voice selection, parameter configuration, and error handling.
 *
 * @param {string} text - Text to speak (must not be empty)
 * @param {SupportedLanguage} language - Language code ('en' or 'tlh')
 * @returns {Promise<void>} Promise that resolves when speech completes
 *
 * @throws {string} Error message if speech synthesis fails or is not supported
 *
 * @example
 * ```typescript
 * // English speech
 * await speakText("Welcome to the translator", "en");
 *
 * // Klingon speech with dramatic voice
 * await speakText("Qapla'! bagh naDev naghmey", "tlh");
 *
 * // Handle errors
 * try {
 *   await speakText("", "en"); // Will throw error for empty text
 * } catch (error) {
 *   console.log(error); // "No text provided for speech synthesis"
 * }
 * ```
 */
export const speakText = async (
  text: string,
  language: SupportedLanguage = "en",
): Promise<void> => {
  // Validate prerequisites
  if (!isSupported()) {
    return Promise.reject("Speech synthesis not supported in this environment");
  }

  if (!text.trim()) {
    return Promise.reject("No text provided for speech synthesis");
  }

  const synth = getSpeechSynthesis()!;

  return new Promise((resolve, reject) => {
    try {
      // Cancel any ongoing speech to prevent overlap
      synth.cancel();

      // Create speech utterance with the provided text
      const utterance = new SpeechSynthesisUtterance(text.trim());

      // Apply language-specific configuration
      const config = getLanguageConfig(language);
      utterance.rate = config.rate;
      utterance.pitch = config.pitch;
      utterance.volume = config.volume;

      // Select the best available voice for the language
      const bestVoice = findBestVoice(language);
      if (bestVoice) {
        utterance.voice = bestVoice;
      }

      // Set up event handlers for speech completion and errors
      utterance.onend = () => {
        resolve();
      };

      utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
        reject(`Speech synthesis error: ${event.error}`);
      };

      // Start speaking
      synth.speak(utterance);
    } catch (error) {
      reject(`Failed to initialize speech synthesis: ${error}`);
    }
  });
};

/**
 * Stops any currently active speech synthesis
 *
 * This function immediately cancels any ongoing speech synthesis,
 * providing instant control over audio output.
 *
 * @returns {boolean} True if speech was stopped, false if no speech was active
 *
 * @example
 * ```typescript
 * // Start a long speech
 * speakText("This is a very long text that will take time to speak", "en");
 *
 * // Stop it immediately
 * const wasStopped = stopSpeaking();
 * console.log(wasStopped); // true if speech was active
 * ```
 */
export const stopSpeaking = (): boolean => {
  const synth = getSpeechSynthesis();
  if (synth && synth.speaking) {
    synth.cancel();
    return true;
  }
  return false;
};

/**
 * Checks if speech synthesis is currently active
 *
 * @returns {boolean} True if speech is currently being synthesized
 *
 * @example
 * ```typescript
 * speakText("Hello", "en");
 * console.log(isSpeaking()); // true during speech
 *
 * setTimeout(() => {
 *   console.log(isSpeaking()); // false after speech completes
 * }, 2000);
 * ```
 */
export const isSpeaking = (): boolean => {
  const synth = getSpeechSynthesis();
  return synth ? synth.speaking : false;
};

/**
 * Gets the current speech synthesis state information
 *
 * @returns {object} Current state with speaking, pending, and paused flags
 *
 * @example
 * ```typescript
 * const state = getSpeechState();
 * console.log(`Speaking: ${state.speaking}, Pending: ${state.pending}`);
 * ```
 */
export const getSpeechState = () => {
  const synth = getSpeechSynthesis();

  if (!synth) {
    return { speaking: false, pending: false, paused: false };
  }

  return {
    speaking: synth.speaking,
    pending: synth.pending,
    paused: synth.paused,
  };
};
