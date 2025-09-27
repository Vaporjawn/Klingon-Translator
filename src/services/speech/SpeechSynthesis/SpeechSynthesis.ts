/**
 * @fileoverview Speech synthesis utilities for text-to-speech functionality
 * @module SpeechSynthesis
 * @version 1.0.0
 *
 * @description
 * This module provides utilities for converting text to speech with language-specific
 * optimizations. It includes support for multiple languages with custom voice
 * selection and speech parameter configuration.
 *
 * @example
 * ```typescript
 * import { speakText, isSupported, getAvailableVoices } from './SpeechSynthesis';
 *
 * // Check if speech synthesis is supported
 * if (isSupported()) {
 *   // Speak English text
 *   await speakText("Hello world", "en");
 *
 *   // Speak Klingon text with deeper voice
 *   await speakText("nuqneH", "tlh");
 * }
 * ```
 */

/**
 * Language codes supported by the speech synthesis system
 */
export type SupportedLanguage = "en" | "tlh";

/**
 * Configuration options for speech synthesis
 * @interface SpeechConfig
 */
export interface SpeechConfig {
  /** Speech rate (0.1 to 10) */
  rate: number;
  /** Voice pitch (0 to 2) */
  pitch: number;
  /** Volume level (0 to 1) */
  volume: number;
  /** Preferred voice for the language */
  voice?: SpeechSynthesisVoice;
}

/**
 * Gets the global speech synthesis instance
 *
 * @returns {SpeechSynthesis | null} Speech synthesis instance or null if not supported
 *
 * @example
 * ```typescript
 * const synth = getSpeechSynthesis();
 * if (synth) {
 *   console.log("Speech synthesis is available");
 * }
 * ```
 */
export const getSpeechSynthesis = (): SpeechSynthesis | null => {
  return typeof window !== "undefined" && "speechSynthesis" in window
    ? window.speechSynthesis
    : null;
};

/**
 * Checks if speech synthesis is supported in the current environment
 *
 * @returns {boolean} True if speech synthesis is available
 *
 * @example
 * ```typescript
 * if (isSupported()) {
 *   console.log("Ready to speak!");
 * } else {
 *   console.log("Speech not available");
 * }
 * ```
 */
export const isSupported = (): boolean => {
  return getSpeechSynthesis() !== null;
};

/**
 * Gets language-specific speech configuration
 *
 * @param {SupportedLanguage} language - Target language code
 * @returns {SpeechConfig} Optimized speech parameters for the language
 *
 * @example
 * ```typescript
 * const englishConfig = getLanguageConfig("en");
 * console.log(englishConfig.rate); // 0.9
 *
 * const klingonConfig = getLanguageConfig("tlh");
 * console.log(klingonConfig.rate); // 0.7 (slower for dramatic effect)
 * ```
 */
export const getLanguageConfig = (
  language: SupportedLanguage,
): SpeechConfig => {
  const configs: Record<SupportedLanguage, SpeechConfig> = {
    en: {
      rate: 0.9,
      pitch: 1.0,
      volume: 0.9,
    },
    tlh: {
      rate: 0.7, // Slower for dramatic Klingon effect
      pitch: 0.8, // Lower pitch for warrior-like voice
      volume: 0.9,
    },
  };

  return configs[language];
};

/**
 * Finds the best voice for a given language
 *
 * @param {SupportedLanguage} language - Target language code
 * @returns {SpeechSynthesisVoice | null} Best available voice or null
 *
 * @example
 * ```typescript
 * const klingonVoice = findBestVoice("tlh");
 * if (klingonVoice) {
 *   console.log(`Using voice: ${klingonVoice.name}`);
 * }
 * ```
 */
export const findBestVoice = (
  language: SupportedLanguage,
): SpeechSynthesisVoice | null => {
  const synth = getSpeechSynthesis();
  if (!synth) return null;

  const voices = synth.getVoices();

  if (language === "tlh") {
    // For Klingon, prefer deeper, more dramatic voices
    return (
      voices.find(
        (voice) =>
          voice.name.toLowerCase().includes("male") ||
          voice.name.toLowerCase().includes("deep") ||
          voice.name.toLowerCase().includes("bass") ||
          voice.name.toLowerCase().includes("low"),
      ) || null
    );
  }

  // For English, use default voice
  return voices.find((voice) => voice.default) || voices[0] || null;
};

/**
 * Gets all available speech synthesis voices
 *
 * @returns {SpeechSynthesisVoice[]} Array of available voices
 *
 * @example
 * ```typescript
 * const voices = getAvailableVoices();
 * voices.forEach(voice => {
 *   console.log(`${voice.name} (${voice.lang})`);
 * });
 * ```
 */
export const getAvailableVoices = (): SpeechSynthesisVoice[] => {
  const synth = getSpeechSynthesis();
  return synth ? synth.getVoices() : [];
};
