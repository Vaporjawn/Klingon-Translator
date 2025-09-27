/**
 * @fileoverview Language configuration and constants for the translation system
 * @module LanguageConfig
 * @version 1.0.0
 *
 * @description
 * Defines language options, configurations, and utilities for the Klingon translator.
 * Provides centralized language settings including display names, flags, and properties.
 *
 * @example
 * ```typescript
 * import { languageOptions, getLanguageByCode } from './LanguageConfig';
 *
 * const english = getLanguageByCode('en');
 * console.log(english?.name); // "English"
 * ```
 */

import type { LanguageOption } from "../../../types/index/index";

/**
 * Available language options for the translator
 *
 * @constant {LanguageOption[]} languageOptions
 * @description
 * Array of supported languages with their display properties.
 * Each language includes code, display name, emoji flag, and text direction.
 *
 * @example
 * ```typescript
 * // Use in dropdowns or language selectors
 * languageOptions.forEach(lang => {
 *   console.log(`${lang.flag} ${lang.name} (${lang.code})`);
 * });
 * // Output:
 * // 🇺🇸 English (en)
 * // 🖖 Klingon (tlhIngan Hol) (tlh)
 * ```
 */
export const languageOptions: LanguageOption[] = [
  {
    code: "en",
    name: "English",
    flag: "🇺🇸",
    direction: "ltr",
  },
  {
    code: "tlh",
    name: "Klingon (tlhIngan Hol)",
    flag: "🖖",
    direction: "ltr",
  },
] as const;

/**
 * Default source language (English)
 *
 * @constant {LanguageOption} DEFAULT_SOURCE_LANGUAGE
 */
export const DEFAULT_SOURCE_LANGUAGE = languageOptions[0];

/**
 * Default target language (Klingon)
 *
 * @constant {LanguageOption} DEFAULT_TARGET_LANGUAGE
 */
export const DEFAULT_TARGET_LANGUAGE = languageOptions[1];

/**
 * Finds a language option by its code
 *
 * @param {string} code - The language code to search for
 * @returns {LanguageOption | undefined} The matching language or undefined
 *
 * @example
 * ```typescript
 * const klingon = getLanguageByCode('tlh');
 * console.log(klingon?.name); // "Klingon (tlhIngan Hol)"
 *
 * const invalid = getLanguageByCode('xyz');
 * console.log(invalid); // undefined
 * ```
 */
export const getLanguageByCode = (code: string): LanguageOption | undefined => {
  return languageOptions.find((lang) => lang.code === code);
};

/**
 * Checks if a language code is supported
 *
 * @param {string} code - The language code to check
 * @returns {boolean} True if the language is supported
 *
 * @example
 * ```typescript
 * isLanguageSupported('en'); // true
 * isLanguageSupported('tlh'); // true
 * isLanguageSupported('fr'); // false
 * ```
 */
export const isLanguageSupported = (code: string): boolean => {
  return languageOptions.some((lang) => lang.code === code);
};

/**
 * Gets the display name for a language code
 *
 * @param {string} code - The language code
 * @returns {string} The display name or the code if not found
 *
 * @example
 * ```typescript
 * getLanguageName('en'); // "English"
 * getLanguageName('tlh'); // "Klingon (tlhIngan Hol)"
 * getLanguageName('unknown'); // "unknown"
 * ```
 */
export const getLanguageName = (code: string): string => {
  const language = getLanguageByCode(code);
  return language?.name ?? code;
};

/**
 * Creates a language pair description for translation
 *
 * @param {LanguageOption} source - Source language
 * @param {LanguageOption} target - Target language
 * @returns {string} Formatted language pair description
 *
 * @example
 * ```typescript
 * const english = getLanguageByCode('en')!;
 * const klingon = getLanguageByCode('tlh')!;
 *
 * getLanguagePairDescription(english, klingon);
 * // "English → Klingon (tlhIngan Hol)"
 * ```
 */
export const getLanguagePairDescription = (
  source: LanguageOption,
  target: LanguageOption,
): string => {
  return `${source.name} → ${target.name}`;
};
