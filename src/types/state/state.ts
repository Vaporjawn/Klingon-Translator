/**
 * @fileoverview Application State Management Types
 *
 * Type definitions for global application state, Redux/Zustand stores,
 * component states, and state management utilities. Provides comprehensive
 * type safety for all state-related operations in the translator.
 *
 * @author Klingon Translator Team
 * @version 1.0.0
 */

import type {
  LanguageCode,
  LanguageOption,
  LanguagePreference,
} from "../language/language";
import type {
  Translation,
  TranslationResult,
} from "../translation/translation";

/**
 * Application loading states for async operations
 *
 * Represents the current status of asynchronous operations
 * throughout the application for proper loading indicators
 * and error handling in the user interface.
 *
 * @example
 * ```typescript
 * const loadingState: LoadingState = 'loading';
 * // Shows loading spinner in UI
 *
 * const errorState: LoadingState = 'error';
 * // Shows error message to user
 * ```
 */
export type LoadingState =
  /** Operation has not started yet */
  | "idle"
  /** Operation is currently in progress */
  | "loading"
  /** Operation completed successfully */
  | "success"
  /** Operation failed with an error */
  | "error";

/**
 * Theme mode selection for UI appearance
 *
 * Controls the overall visual theme and color scheme
 * of the application interface based on user preference
 * and system settings.
 *
 * @example
 * ```typescript
 * const mode: ThemeMode = 'dark';
 * // Applies dark theme colors and styling
 * ```
 */
export type ThemeMode =
  /** Light theme with bright colors */
  | "light"
  /** Dark theme with darker colors */
  | "dark"
  /** Automatically match system preference */
  | "auto";

/**
 * Star Trek series theme variants
 *
 * Specialized theming options based on different Star Trek
 * series aesthetics for immersive Klingon culture experience.
 * Each series has unique color palettes and styling.
 *
 * @example
 * ```typescript
 * const series: StarTrekSeries = 'tng';
 * // Applies The Next Generation red/teal/gold theme
 * ```
 */
export type StarTrekSeries =
  /** The Original Series - classic gold/blue/red */
  | "tos"
  /** The Next Generation - red/teal/gold command colors */
  | "tng"
  /** Deep Space Nine - Bajoran and Dominion aesthetics */
  | "ds9"
  /** Voyager - exploration and frontier themes */
  | "voy"
  /** Discovery - modern blue and metallic styling */
  | "disco";

/**
 * Translation history entry with metadata
 *
 * Represents a single entry in the user's translation history,
 * including the original query, result, timestamp, and context
 * information for review and favorite management.
 *
 * @interface TranslationHistoryEntry
 * @property {string} id - Unique identifier for the history entry
 * @property {string} query - Original input text from user
 * @property {TranslationResult} result - Translation result and metadata
 * @property {Date} timestamp - When the translation was performed
 * @property {boolean} [isFavorite] - User marked as favorite
 *
 * @example
 * ```typescript
 * const historyEntry: TranslationHistoryEntry = {
 *   id: 'hist-001',
 *   query: 'Hello warrior',
 *   result: {
 *     input: 'Hello warrior',
 *     output: 'nuqneH may\'',
 *     confidence: 0.95
 *   },
 *   timestamp: new Date(),
 *   isFavorite: true
 * };
 * ```
 */
export interface TranslationHistoryEntry {
  /** Unique identifier for database and caching */
  id: string;

  /** Original user input that was translated */
  query: string;

  /** Complete translation result with alternatives */
  result: TranslationResult;

  /** Timestamp when translation was performed */
  timestamp: Date;

  /**
   * Optional favorite flag
   *
   * Indicates if user has marked this translation
   * as a favorite for quick access and review.
   */
  isFavorite?: boolean;
}

/**
 * User interface preferences and settings
 *
 * Comprehensive user preferences for interface customization,
 * accessibility options, and personalization settings that
 * persist across application sessions.
 *
 * @interface UserPreferences
 * @property {LanguagePreference} language - Interface language settings
 * @property {ThemeMode} themeMode - Visual theme preference
 * @property {StarTrekSeries} starTrekSeries - Series-specific theming
 * @property {boolean} enableSounds - Audio feedback preference
 * @property {number} fontSize - Base font size multiplier
 * @property {boolean} highContrast - Accessibility high contrast mode
 * @property {boolean} reducedMotion - Accessibility motion reduction
 *
 * @example
 * ```typescript
 * const prefs: UserPreferences = {
 *   language: { code: 'en', name: 'English', nativeName: 'English', direction: 'ltr' },
 *   themeMode: 'dark',
 *   starTrekSeries: 'tng',
 *   enableSounds: true,
 *   fontSize: 1.0,
 *   highContrast: false,
 *   reducedMotion: false
 * };
 * ```
 */
export interface UserPreferences {
  /** Language and localization settings */
  language: LanguagePreference;

  /** Visual theme mode selection */
  themeMode: ThemeMode;

  /** Star Trek series aesthetic preference */
  starTrekSeries: StarTrekSeries;

  /** Enable audio feedback and sound effects */
  enableSounds: boolean;

  /**
   * Font size multiplier for accessibility
   *
   * Scale factor applied to base font sizes throughout
   * the application. Range typically 0.8 - 2.0.
   */
  fontSize: number;

  /**
   * High contrast mode for accessibility
   *
   * Increases color contrast ratios for better visibility
   * for users with visual impairments or low vision.
   */
  highContrast: boolean;

  /**
   * Reduced motion for accessibility
   *
   * Minimizes animations and transitions for users
   * with vestibular disorders or motion sensitivity.
   */
  reducedMotion: boolean;
}

/**
 * Translation application state slice
 *
 * Contains all state related to translation functionality,
 * including current translations, history, favorites, and
 * translation service status and configuration.
 *
 * @interface TranslationState
 * @property {string} currentInput - Currently entered text to translate
 * @property {TranslationResult | null} currentResult - Latest translation result
 * @property {LoadingState} status - Current translation operation status
 * @property {string | null} error - Error message if translation failed
 * @property {TranslationHistoryEntry[]} history - Translation history array
 * @property {Translation[]} favorites - User's favorite translations
 *
 * @example
 * ```typescript
 * const translationState: TranslationState = {
 *   currentInput: 'Honor and glory',
 *   currentResult: {
 *     input: 'Honor and glory',
 *     output: 'vaQ \'ej naDev',
 *     confidence: 0.88
 *   },
 *   status: 'success',
 *   error: null,
 *   history: [],
 *   favorites: []
 * };
 * ```
 */
export interface TranslationState {
  /** Text currently being translated or in input field */
  currentInput: string;

  /** Most recent translation result or null if none */
  currentResult: TranslationResult | null;

  /** Status of current/last translation operation */
  status: LoadingState;

  /** Error message from failed translation or null */
  error: string | null;

  /** Array of previous translation attempts and results */
  history: TranslationHistoryEntry[];

  /** User's favorite translations */
  favorites: Translation[];

  /** Source language selection for translation */
  sourceLanguage: LanguageOption;

  /** Target language selection for translation */
  targetLanguage: LanguageOption;

  /** Input text field content */
  inputText: string;

  /** Translated output text */
  outputText: string;

  /** Loading state for translation operations */
  isTranslating: boolean;
}

/**
 * Speech synthesis application state slice
 *
 * Manages text-to-speech functionality state including
 * playback status, voice settings, and speech queue
 * management for pronunciation assistance.
 *
 * @interface SpeechState
 * @property {boolean} isPlaying - Whether speech is currently playing
 * @property {boolean} isPaused - Whether speech is paused
 * @property {LoadingState} status - Speech synthesis operation status
 * @property {string | null} error - Error message for speech failures
 * @property {string | null} currentText - Text currently being spoken
 * @property {number} rate - Speech rate setting (0.1 - 3.0)
 * @property {number} pitch - Voice pitch setting (0.0 - 2.0)
 * @property {number} volume - Audio volume setting (0.0 - 1.0)
 *
 * @example
 * ```typescript
 * const speechState: SpeechState = {
 *   isPlaying: false,
 *   isPaused: false,
 *   status: 'idle',
 *   error: null,
 *   currentText: null,
 *   rate: 1.0,
 *   pitch: 1.0,
 *   volume: 0.8
 * };
 * ```
 */
export interface SpeechState {
  /** Whether text-to-speech is currently active */
  isPlaying: boolean;

  /** Whether speech playback is paused */
  isPaused: boolean;

  /** Status of speech synthesis operations */
  status: LoadingState;

  /** Error message from speech synthesis failure */
  error: string | null;

  /** Text currently being spoken by TTS engine */
  currentText: string | null;

  /** Speech rate multiplier (0.1 = slow, 3.0 = fast) */
  rate: number;

  /** Voice pitch adjustment (0.0 = low, 2.0 = high) */
  pitch: number;

  /** Audio output volume (0.0 = silent, 1.0 = full) */
  volume: number;
}

/**
 * Root application state combining all state slices
 *
 * Complete application state tree containing all major
 * state slices for comprehensive state management and
 * type safety throughout the application.
 *
 * @interface AppState
 * @property {UserPreferences} preferences - User settings and preferences
 * @property {TranslationState} translation - Translation functionality state
 * @property {SpeechState} speech - Speech synthesis state
 * @property {boolean} isOnline - Network connectivity status
 *
 * @example
 * ```typescript
 * const appState: AppState = {
 *   preferences: defaultPreferences,
 *   translation: initialTranslationState,
 *   speech: initialSpeechState,
 *   isOnline: navigator.onLine
 * };
 * ```
 */
export interface AppState {
  /** User preferences and application settings */
  preferences: UserPreferences;

  /** Translation service and result state */
  translation: TranslationState;

  /** Speech synthesis and audio state */
  speech: SpeechState;

  /**
   * Network connectivity status
   *
   * Tracks online/offline state for graceful handling
   * of network-dependent features and caching strategies.
   */
  isOnline: boolean;
}

/**
 * State management utilities and type guards
 */
export const stateUtils = {
  /**
   * Validates if a string is a valid LoadingState
   *
   * @param value - String to validate
   * @returns True if string is a valid LoadingState
   *
   * @example
   * ```typescript
   * const isValid = stateUtils.isLoadingState('loading'); // true
   * const isInvalid = stateUtils.isLoadingState('invalid'); // false
   * ```
   */
  isLoadingState: (value: string): value is LoadingState => {
    return ["idle", "loading", "success", "error"].includes(value);
  },

  /**
   * Validates if a string is a valid ThemeMode
   *
   * @param value - String to validate
   * @returns True if string is a valid ThemeMode
   *
   * @example
   * ```typescript
   * const isValid = stateUtils.isThemeMode('dark'); // true
   * ```
   */
  isThemeMode: (value: string): value is ThemeMode => {
    return ["light", "dark", "auto"].includes(value);
  },

  /**
   * Validates if a string is a valid StarTrekSeries
   *
   * @param value - String to validate
   * @returns True if string is a valid StarTrekSeries
   *
   * @example
   * ```typescript
   * const isValid = stateUtils.isStarTrekSeries('tng'); // true
   * ```
   */
  isStarTrekSeries: (value: string): value is StarTrekSeries => {
    return ["tos", "tng", "ds9", "voy", "disco"].includes(value);
  },

  /**
   * Creates a default UserPreferences object
   *
   * @param languageCode - Optional language code for default language
   * @returns Default UserPreferences with sensible defaults
   *
   * @example
   * ```typescript
   * const defaults = stateUtils.createDefaultPreferences('en');
   * // Returns UserPreferences with English language and default settings
   * ```
   */
  createDefaultPreferences: (
    languageCode: LanguageCode = "en",
  ): UserPreferences => ({
    language: {
      code: languageCode,
      name: languageCode === "en" ? "English" : "Unknown",
      nativeName: languageCode === "en" ? "English" : "Unknown",
      direction: "ltr",
    },
    themeMode: "auto",
    starTrekSeries: "tng",
    enableSounds: true,
    fontSize: 1.0,
    highContrast: false,
    reducedMotion: false,
  }),

  /**
   * Creates an initial TranslationState object
   *
   * @returns Empty TranslationState with default values
   *
   * @example
   * ```typescript
   * const initialState = stateUtils.createInitialTranslationState();
   * // Returns clean slate for translation functionality
   * ```
   */
  createInitialTranslationState: (): TranslationState => ({
    currentInput: "",
    currentResult: null,
    status: "idle",
    error: null,
    history: [],
    favorites: [],
    sourceLanguage: {
      code: "en",
      name: "English",
      flag: "🇺🇸",
      direction: "ltr",
    },
    targetLanguage: {
      code: "tlh",
      name: "Klingon",
      flag: "🖖",
      direction: "ltr",
    },
    inputText: "",
    outputText: "",
    isTranslating: false,
  }),

  /**
   * Creates an initial SpeechState object
   *
   * @returns Default SpeechState with standard settings
   *
   * @example
   * ```typescript
   * const speechState = stateUtils.createInitialSpeechState();
   * // Returns default speech synthesis configuration
   * ```
   */
  createInitialSpeechState: (): SpeechState => ({
    isPlaying: false,
    isPaused: false,
    status: "idle",
    error: null,
    currentText: null,
    rate: 1.0,
    pitch: 1.0,
    volume: 0.8,
  }),
};
