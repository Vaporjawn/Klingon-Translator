/**
 * @fileoverview Language System Types
 *
 * Type definitions for language support, detection, preferences, and
 * internationalization features. Handles multi-language support for
 * the Klingon translator interface and content localization.
 *
 * @author Klingon Translator Team
 * @version 1.0.0
 */

/**
 * Supported language codes for the translator interface
 *
 * ISO 639-1 language codes for interface localization and content
 * translation. Determines available languages for UI elements,
 * help text, and user interface preferences.
 *
 * @example
 * ```typescript
 * const userLang: LanguageCode = 'en';
 * // Sets interface to English
 *
 * const tlhLang: LanguageCode = 'tlh';
 * // Special code for Klingon language content
 * ```
 */
export type LanguageCode =
  /** English - Primary interface language */
  | "en"
  /** Spanish - Secondary interface support */
  | "es"
  /** French - European language support */
  | "fr"
  /** German - European language support */
  | "de"
  /** Japanese - Asian language support */
  | "ja"
  /** Chinese Simplified - Asian language support */
  | "zh"
  /** Klingon - Special constructed language support */
  | "tlh";

/**
 * Language direction for text layout and rendering
 *
 * Determines text flow direction for proper typography and
 * user interface layout in different writing systems.
 *
 * @example
 * ```typescript
 * const direction: LanguageDirection = 'ltr';
 * // Left-to-right text flow (English, Klingon)
 * ```
 */
export type LanguageDirection =
  /** Left-to-right text direction (most languages) */
  | "ltr"
  /** Right-to-left text direction (Arabic, Hebrew) */
  | "rtl";

/**
 * Language option configuration for UI selectors
 *
 * Complete language definition with display information for
 * dropdown menus and language selection interfaces. Includes
 * visual representation and text direction data.
 *
 * @example
 * ```typescript
 * const englishOption: LanguageOption = {
 *   code: 'en',
 *   name: 'English',
 *   flag: '🇺🇸',
 *   direction: 'ltr'
 * };
 * // Complete language selector option
 * ```
 */
export interface LanguageOption {
  /** ISO 639-1 language code identifier */
  code: "en" | "tlh";
  /** Human-readable language name for display */
  name: string;
  /** Unicode flag emoji for visual representation */
  flag: string;
  /** Text direction for proper rendering */
  direction: LanguageDirection;
}

/**
 * User language preference settings
 *
 * Comprehensive language configuration for personalized user
 * experience including interface language, content preferences,
 * and accessibility options.
 *
 * @interface LanguagePreference
 * @property {LanguageCode} code - Primary language selection
 * @property {string} name - Human-readable language name
 * @property {string} nativeName - Language name in native script
 * @property {LanguageDirection} direction - Text layout direction
 * @property {boolean} [rtl] - Right-to-left text indicator
 * @property {string} [region] - Regional variant or dialect
 *
 * @example
 * ```typescript
 * const englishPref: LanguagePreference = {
 *   code: 'en',
 *   name: 'English',
 *   nativeName: 'English',
 *   direction: 'ltr',
 *   rtl: false,
 *   region: 'US'
 * };
 *
 * const klingonPref: LanguagePreference = {
 *   code: 'tlh',
 *   name: 'Klingon',
 *   nativeName: 'tlhIngan Hol',
 *   direction: 'ltr',
 *   rtl: false
 * };
 * ```
 */
export interface LanguagePreference {
  /** ISO 639-1 language code */
  code: LanguageCode;

  /** Human-readable language name in English */
  name: string;

  /** Language name written in its native script */
  nativeName: string;

  /** Text direction for proper layout rendering */
  direction: LanguageDirection;

  /**
   * Optional right-to-left text indicator
   *
   * Explicit flag for RTL languages to assist with
   * CSS styling and layout calculations.
   */
  rtl?: boolean;

  /**
   * Optional regional variant identifier
   *
   * Specifies regional dialects or country-specific
   * variations of the language (e.g., 'US', 'UK', 'CA').
   */
  region?: string;
}

/**
 * Speech synthesis language configuration
 *
 * Defines language settings for text-to-speech functionality,
 * including voice selection, pronunciation rules, and
 * speech rate preferences for optimal audio output.
 *
 * @interface SpeechLanguage
 * @property {LanguageCode} code - Language identifier for TTS
 * @property {string} voice - Preferred voice identifier
 * @property {number} rate - Speech rate multiplier (0.1 - 3.0)
 * @property {number} pitch - Voice pitch adjustment (0.0 - 2.0)
 * @property {string[]} [fallbackVoices] - Alternative voice options
 *
 * @example
 * ```typescript
 * const englishSpeech: SpeechLanguage = {
 *   code: 'en',
 *   voice: 'en-US-Standard-A',
 *   rate: 1.0,
 *   pitch: 1.0,
 *   fallbackVoices: ['en-US-Wavenet-A', 'en-GB-Standard-A']
 * };
 * ```
 */
export interface SpeechLanguage {
  /** Language code for voice synthesis */
  code: LanguageCode;

  /** Primary voice identifier or name */
  voice: string;

  /**
   * Speech rate multiplier
   *
   * Controls speaking speed from 0.1 (very slow) to 3.0 (very fast).
   * Default value of 1.0 represents normal speaking speed.
   */
  rate: number;

  /**
   * Voice pitch adjustment
   *
   * Controls voice pitch from 0.0 (lowest) to 2.0 (highest).
   * Default value of 1.0 represents normal pitch.
   */
  pitch: number;

  /**
   * Optional fallback voice identifiers
   *
   * Provides alternative voices when the primary voice
   * is unavailable on the user's system or browser.
   */
  fallbackVoices?: string[];
}

/**
 * Language detection result from text analysis
 *
 * Contains detected language information with confidence metrics
 * for automatic language identification in user input text.
 *
 * @interface LanguageDetection
 * @property {LanguageCode} detected - Most likely language code
 * @property {number} confidence - Detection confidence (0-1)
 * @property {Array<{code: LanguageCode, confidence: number}>} alternatives - Other possibilities
 *
 * @example
 * ```typescript
 * const detection: LanguageDetection = {
 *   detected: 'en',
 *   confidence: 0.92,
 *   alternatives: [
 *     { code: 'en', confidence: 0.92 },
 *     { code: 'es', confidence: 0.08 }
 *   ]
 * };
 * ```
 */
export interface LanguageDetection {
  /** Most likely detected language code */
  detected: LanguageCode;

  /**
   * Detection confidence score
   *
   * Numerical confidence from 0.0 (uncertain) to 1.0 (certain)
   * indicating algorithm certainty about the detection result.
   */
  confidence: number;

  /**
   * Alternative language possibilities
   *
   * Array of other potential languages with their confidence
   * scores, sorted by likelihood in descending order.
   */
  alternatives: Array<{
    /** Alternative language code */
    code: LanguageCode;
    /** Confidence score for this alternative */
    confidence: number;
  }>;
}

/**
 * Internationalization (i18n) configuration settings
 *
 * Controls localization behavior for the entire application,
 * including fallback languages, namespace organization, and
 * dynamic loading preferences.
 *
 * @interface InternationalizationConfig
 * @property {LanguageCode} defaultLanguage - Fallback language
 * @property {LanguageCode[]} supportedLanguages - Available languages
 * @property {string[]} namespaces - Translation file organization
 * @property {boolean} fallbackToDefault - Use default on missing translations
 *
 * @example
 * ```typescript
 * const i18nConfig: InternationalizationConfig = {
 *   defaultLanguage: 'en',
 *   supportedLanguages: ['en', 'es', 'fr', 'tlh'],
 *   namespaces: ['common', 'translation', 'navigation', 'errors'],
 *   fallbackToDefault: true
 * };
 * ```
 */
export interface InternationalizationConfig {
  /** Default/fallback language when translations are missing */
  defaultLanguage: LanguageCode;

  /** Array of all supported languages in the application */
  supportedLanguages: LanguageCode[];

  /**
   * Translation namespace organization
   *
   * Logical groupings of translation keys for better
   * organization and lazy loading of translation resources.
   */
  namespaces: string[];

  /**
   * Fallback behavior for missing translations
   *
   * When true, missing translations will display in the
   * default language. When false, shows the translation key.
   */
  fallbackToDefault: boolean;
}

/**
 * Language system utilities and validation functions
 */
export const languageUtils = {
  /**
   * Validates if a string is a valid LanguageCode
   *
   * @param code - String to validate as language code
   * @returns True if string is a valid LanguageCode
   *
   * @example
   * ```typescript
   * const isValid = languageUtils.isValidLanguageCode('en'); // true
   * const isInvalid = languageUtils.isValidLanguageCode('xx'); // false
   * ```
   */
  isValidLanguageCode: (code: string): code is LanguageCode => {
    const validCodes: LanguageCode[] = [
      "en",
      "es",
      "fr",
      "de",
      "ja",
      "zh",
      "tlh",
    ];
    return validCodes.includes(code as LanguageCode);
  },

  /**
   * Gets text direction for a given language code
   *
   * @param code - Language code to check
   * @returns Text direction for the language
   *
   * @example
   * ```typescript
   * const direction = languageUtils.getDirection('en'); // 'ltr'
   * ```
   */
  getDirection: (code: LanguageCode): LanguageDirection => {
    // All currently supported languages use left-to-right
    // Future RTL language support can extend this logic
    const rtlLanguages: LanguageCode[] = [];
    return rtlLanguages.includes(code) ? "rtl" : "ltr";
  },

  /**
   * Checks if a language uses right-to-left text
   *
   * @param code - Language code to check
   * @returns True if language uses RTL text direction
   *
   * @example
   * ```typescript
   * const isRtl = languageUtils.isRightToLeft('en'); // false
   * ```
   */
  isRightToLeft: (code: LanguageCode): boolean => {
    return languageUtils.getDirection(code) === "rtl";
  },

  /**
   * Validates if an object is a valid LanguagePreference
   *
   * @param obj - Object to validate
   * @returns True if object matches LanguagePreference interface
   *
   * @example
   * ```typescript
   * const isValid = languageUtils.isLanguagePreference(userSetting);
   * if (isValid) {
   *   console.log(userSetting.nativeName);
   * }
   * ```
   */
  isLanguagePreference: (obj: unknown): obj is LanguagePreference => {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "code" in obj &&
      "name" in obj &&
      "nativeName" in obj &&
      "direction" in obj &&
      languageUtils.isValidLanguageCode((obj as LanguagePreference).code)
    );
  },

  /**
   * Creates a default LanguagePreference for a given code
   *
   * @param code - Language code to create preference for
   * @returns Default LanguagePreference object
   *
   * @example
   * ```typescript
   * const englishDefault = languageUtils.createDefaultPreference('en');
   * // Returns complete LanguagePreference with sensible defaults
   * ```
   */
  createDefaultPreference: (code: LanguageCode): LanguagePreference => {
    const defaults: Record<LanguageCode, Omit<LanguagePreference, "code">> = {
      en: { name: "English", nativeName: "English", direction: "ltr" },
      es: { name: "Spanish", nativeName: "Español", direction: "ltr" },
      fr: { name: "French", nativeName: "Français", direction: "ltr" },
      de: { name: "German", nativeName: "Deutsch", direction: "ltr" },
      ja: { name: "Japanese", nativeName: "日本語", direction: "ltr" },
      zh: { name: "Chinese", nativeName: "中文", direction: "ltr" },
      tlh: { name: "Klingon", nativeName: "tlhIngan Hol", direction: "ltr" },
    };

    return {
      code,
      ...defaults[code],
    };
  },
};
