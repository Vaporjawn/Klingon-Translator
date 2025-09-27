/**
 * @fileoverview Star Trek-inspired audio effects for UI interactions
 * @module AudioEffects
 * @version 1.0.0
 *
 * @description
 * This module provides futuristic sound effects inspired by Star Trek for
 * enhancing the user interface experience. It includes translation confirmation
 * sounds, success chimes, and other audio feedback using Web Audio API.
 *
 * @example
 * ```typescript
 * import { playTranslationSound, playSuccessSound, isAudioSupported } from './AudioEffects';
 *
 * // Check audio support
 * if (isAudioSupported()) {
 *   // Play translation confirmation
 *   playTranslationSound();
 *
 *   // Play success confirmation after 1 second
 *   setTimeout(() => playSuccessSound(), 1000);
 * }
 * ```
 */

/**
 * Audio effect configuration for different sound types
 * @interface EffectConfig
 */
export interface EffectConfig {
  /** Primary frequency in Hz */
  frequency: number;
  /** Secondary frequency in Hz (for harmonics) */
  secondaryFrequency?: number;
  /** Duration in seconds */
  duration: number;
  /** Volume level (0 to 1) */
  volume: number;
  /** Frequency modulation over time */
  frequencyRamp?: {
    /** Target frequency */
    target: number;
    /** Ramp type */
    type: "linear" | "exponential";
  };
}

/**
 * Checks if Web Audio API is supported in the current environment
 *
 * @returns {boolean} True if audio effects can be played
 *
 * @example
 * ```typescript
 * if (isAudioSupported()) {
 *   console.log("Audio effects available");
 * } else {
 *   console.log("Using silent mode");
 * }
 * ```
 */
export const isAudioSupported = (): boolean => {
  return (
    typeof window !== "undefined" &&
    ("AudioContext" in window || "webkitAudioContext" in window)
  );
};

/**
 * Gets the audio context for sound generation
 *
 * @returns {AudioContext | null} Audio context instance or null if not supported
 *
 * @example
 * ```typescript
 * const context = getAudioContext();
 * if (context) {
 *   // Create custom audio effects
 * }
 * ```
 */
export const getAudioContext = (): AudioContext | null => {
  if (!isAudioSupported()) {
    return null;
  }

  try {
    const AudioContextConstructor =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    return AudioContextConstructor ? new AudioContextConstructor() : null;
  } catch (error) {
    console.warn("Failed to create audio context:", error);
    return null;
  }
};

/**
 * Creates and plays a sound effect with the specified configuration
 *
 * @param {EffectConfig} config - Audio effect configuration
 * @returns {boolean} True if effect was played successfully
 *
 * @example
 * ```typescript
 * // Create a custom beep
 * const customBeep = {
 *   frequency: 1000,
 *   duration: 0.2,
 *   volume: 0.3,
 *   frequencyRamp: { target: 500, type: 'exponential' as const }
 * };
 *
 * playEffect(customBeep);
 * ```
 */
export const playEffect = (config: EffectConfig): boolean => {
  const audioContext = getAudioContext();
  if (!audioContext) {
    return false;
  }

  try {
    // Create oscillator for primary tone
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // Connect audio graph
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Configure primary frequency
    oscillator.frequency.setValueAtTime(
      config.frequency,
      audioContext.currentTime,
    );

    // Apply frequency modulation if specified
    if (config.frequencyRamp) {
      if (config.frequencyRamp.type === "exponential") {
        oscillator.frequency.exponentialRampToValueAtTime(
          config.frequencyRamp.target,
          audioContext.currentTime + config.duration,
        );
      } else {
        oscillator.frequency.linearRampToValueAtTime(
          config.frequencyRamp.target,
          audioContext.currentTime + config.duration,
        );
      }
    }

    // Configure volume envelope
    gainNode.gain.setValueAtTime(config.volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + config.duration,
    );

    // Create secondary oscillator for harmonics if specified
    if (config.secondaryFrequency) {
      const secondaryOscillator = audioContext.createOscillator();
      secondaryOscillator.connect(gainNode);
      secondaryOscillator.frequency.setValueAtTime(
        config.secondaryFrequency,
        audioContext.currentTime,
      );

      secondaryOscillator.start(audioContext.currentTime);
      secondaryOscillator.stop(audioContext.currentTime + config.duration);
    }

    // Start and stop the primary oscillator
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + config.duration);

    return true;
  } catch (error) {
    console.warn("Failed to play audio effect:", error);
    return false;
  }
};

/**
 * Plays a futuristic translation confirmation sound
 *
 * This creates a distinctive beep that sweeps from high to low frequency,
 * reminiscent of Star Trek computer confirmations.
 *
 * @returns {boolean} True if sound was played successfully
 *
 * @example
 * ```typescript
 * // Play when translation begins
 * const onTranslateClick = () => {
 *   playTranslationSound();
 *   startTranslation();
 * };
 * ```
 */
export const playTranslationSound = (): boolean => {
  const translationConfig: EffectConfig = {
    frequency: 800, // High starting pitch
    duration: 0.1, // Quick beep
    volume: 0.3, // Moderate volume
    frequencyRamp: {
      target: 400, // Sweep down to lower pitch
      type: "exponential", // Smooth exponential decay
    },
  };

  return playEffect(translationConfig);
};

/**
 * Plays a success confirmation chime
 *
 * This creates a pleasant two-tone harmony indicating successful completion,
 * using a perfect fifth interval (C5 + E5) for musical consonance.
 *
 * @returns {boolean} True if sound was played successfully
 *
 * @example
 * ```typescript
 * // Play when translation completes successfully
 * const onTranslationSuccess = (result) => {
 *   if (result.confidence > 0.8) {
 *     playSuccessSound();
 *   }
 * };
 * ```
 */
export const playSuccessSound = (): boolean => {
  const successConfig: EffectConfig = {
    frequency: 523.25, // C5 note
    secondaryFrequency: 659.25, // E5 note (major third harmony)
    duration: 0.3, // Longer duration for pleasant effect
    volume: 0.2, // Softer volume for subtlety
  };

  return playEffect(successConfig);
};

/**
 * Plays an error or warning sound
 *
 * This creates a distinct low-pitched tone to indicate errors or warnings,
 * different from success sounds to provide clear audio feedback.
 *
 * @returns {boolean} True if sound was played successfully
 *
 * @example
 * ```typescript
 * // Play when translation fails
 * const onTranslationError = (error) => {
 *   playErrorSound();
 *   showErrorMessage(error);
 * };
 * ```
 */
export const playErrorSound = (): boolean => {
  const errorConfig: EffectConfig = {
    frequency: 200, // Low, ominous tone
    duration: 0.2, // Brief but noticeable
    volume: 0.25, // Moderate volume
    frequencyRamp: {
      target: 150, // Even lower pitch
      type: "linear", // Linear decrease for harsh effect
    },
  };

  return playEffect(errorConfig);
};

/**
 * Plays a subtle UI interaction sound
 *
 * This creates a very brief, soft click sound for button presses
 * and other UI interactions without being intrusive.
 *
 * @returns {boolean} True if sound was played successfully
 *
 * @example
 * ```typescript
 * // Play on button hover or click
 * const onButtonInteraction = () => {
 *   playClickSound();
 * };
 * ```
 */
export const playClickSound = (): boolean => {
  const clickConfig: EffectConfig = {
    frequency: 1200, // Sharp, crisp frequency
    duration: 0.05, // Very brief
    volume: 0.15, // Subtle volume
  };

  return playEffect(clickConfig);
};
