/**
 * @fileoverview Unified Type System Export Hub
 *
 * Central barrel export for all TypeScript type definitions and utilities
 * in the Klingon translator application. Provides organized, tree-shakable
 * access to translation, language, state, and theme types with comprehensive
 * utility functions for type validation and manipulation.
 *
 * @author Klingon Translator Team
 * @version 2.0.0
 */

// =============================================================================
// TRANSLATION SYSTEM TYPES
// =============================================================================

/**
 * Core translation functionality types
 *
 * Essential types for translation operations, dictionary management,
 * and linguistic processing with comprehensive Klingon language support.
 */
export type {
  /** Grammatical part of speech classification for Klingon linguistics */
  PartOfSpeech,
  /** Individual translation entry with linguistic metadata */
  Translation,
  /** Contextual usage example for translations */
  Example,
  /** Complete translation result with confidence metrics */
  TranslationResult,
} from "../translation/translation";

/** Translation utility functions for validation and processing */
export { translationUtils } from "../translation/translation";

// =============================================================================
// LANGUAGE AND LOCALIZATION TYPES
// =============================================================================

/**
 * Language support and internationalization types
 *
 * Comprehensive language system for multi-language interface support,
 * text-to-speech configuration, and localization preferences.
 */
export type {
  /** ISO 639-1 language codes for supported languages */
  LanguageCode,
  /** Text direction for proper typography layout */
  LanguageDirection,
  /** Language option configuration for UI selectors */
  LanguageOption,
  /** Complete user language preference configuration */
  LanguagePreference,
  /** Speech synthesis language settings */
  SpeechLanguage,
  /** Language detection results with confidence metrics */
  LanguageDetection,
  /** Internationalization system configuration */
  InternationalizationConfig,
} from "../language/language";

/** Language system utilities for validation and configuration */
export { languageUtils } from "../language/language";

// =============================================================================
// APPLICATION STATE TYPES
// =============================================================================

/**
 * State management and application state types
 *
 * Comprehensive state system for managing application preferences,
 * translation history, speech synthesis, and global application state.
 */
export type {
  /** Async operation status indicators */
  LoadingState,
  /** Visual theme mode selection */
  ThemeMode,
  /** Star Trek series aesthetic variants */
  StarTrekSeries,
  /** Translation history entry with metadata */
  TranslationHistoryEntry,
  /** User preferences and accessibility settings */
  UserPreferences,
  /** Translation functionality state slice */
  TranslationState,
  /** Speech synthesis state slice */
  SpeechState,
  /** Root application state combining all slices */
  AppState,
} from "../state/state";

/** State management utilities for validation and initialization */
export { stateUtils } from "../state/state";

// =============================================================================
// THEME SYSTEM TYPES
// =============================================================================

/**
 * Theme and styling system types
 *
 * Advanced theming system for Star Trek LCARS-inspired interface
 * with multi-series support, glassmorphism effects, and comprehensive
 * Material-UI component styling integration.
 */
export type {
  /** Star Trek series identifiers for theme variants */
  ThemeSeriesId,
  /** Theme appearance mode (light/dark) */
  ThemeModeId,
  /** Complete color palette for Star Trek series theming */
  StarTrekColorPalette,
  /** LCARS-inspired typography configuration */
  StarTrekTypography,
  /** Component styling with glassmorphism effects */
  StarTrekComponentStyles,
  /** Complete theme configuration object */
  StarTrekThemeConfig,
  /** Theme factory customization options */
  ThemeFactoryOptions,
} from "../theme/theme";

/** Theme system utilities for validation and configuration */
export { themeTypeUtils } from "../theme/theme";
