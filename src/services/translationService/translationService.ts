/**
 * @fileoverview Main translation service that orchestrates dictionary-based translation
 *
 * This service provides the primary interface for translating text between languages.
 * It coordinates multiple specialized utilities to handle text normalization,
 * dictionary matching, similarity calculations, and result processing.
 *
 * @example
 * ```typescript
 * import { translateText } from './translationService';
 *
 * // Translate from English to Klingon
 * const result = translateText({
 *   text: "hello world",
 *   fromLanguage: "english",
 *   toLanguage: "klingon"
 * });
 *
 * console.log(result.output); // "nuqneH yuQ"
 * console.log(result.confidence); // 0.95
 * ```
 */

import type { TranslationResult } from "../../types/index/index";
import type { LanguageOption } from "../../types/language/language";
import { klingonDictionary } from "../../data/klingonDictionary/klingonDictionary";
import { isEmptyText } from "../core/TextNormalizer/TextNormalizer";
import { findMatches } from "../core/DictionaryMatcher/DictionaryMatcher";
import { processTranslation } from "../core/TranslationProcessor/TranslationProcessor";
import {
  isLanguageSupported,
  languageOptions,
} from "../core/LanguageConfig/LanguageConfig";

/**
 * Options for translation operations
 * @interface TranslationOptions
 */
export interface TranslationOptions {
  /** Text to translate */
  text: string;
  /** Source language ('english' or 'klingon') */
  fromLanguage: string;
  /** Target language ('english' or 'klingon') */
  toLanguage: string;
}

/**
 * Creates an error result for translation failures
 *
 * @param {string} message - Error message
 * @param {string} input - Original input text
 * @returns {TranslationResult} Error result object
 *
 * @example
 * ```typescript
 * const error = createErrorResult("Language not supported", "hello");
 * console.log(error.confidence); // 0
 * console.log(error.output); // ""
 * ```
 */
const createErrorResult = (
  _message: string,
  input: string,
): TranslationResult => {
  return {
    input,
    output: "",
    confidence: 0,
    suggestions: [],
  };
};

/**
 * Translates text from one language to another
 *
 * This is the main public function that handles the complete translation
 * pipeline: validation, normalization, matching, and result processing.
 *
 * @param {TranslationOptions} options - Translation configuration
 * @returns {TranslationResult} Complete translation result with metadata
 *
 * @example
 * ```typescript
 * // English to Klingon
 * const result = translateText({
 *   text: "peace and prosperity",
 *   fromLanguage: "english",
 *   toLanguage: "klingon"
 * });
 *
 * // Klingon to English
 * const reverse = translateText({
 *   text: "nuqneH",
 *   fromLanguage: "klingon",
 *   toLanguage: "english"
 * });
 * ```
 */
export const translateText = (
  options: TranslationOptions,
): TranslationResult => {
  const { text, fromLanguage, toLanguage } = options;

  // Validate input parameters
  if (isEmptyText(text)) {
    return createErrorResult("Empty input text", text);
  }

  if (!isLanguageSupported(fromLanguage) || !isLanguageSupported(toLanguage)) {
    return createErrorResult("Unsupported language pair", text);
  }

  // Determine source field based on language
  const sourceField =
    fromLanguage.toLowerCase() === "klingon" ? "klingon" : "english";

  // Find dictionary matches for the input text
  const matches = findMatches(text, klingonDictionary, sourceField);

  // Create language options (simplified for this context)
  const sourceLang: LanguageOption = {
    code: (fromLanguage === "klingon" ? "tlh" : "en") as "en" | "tlh",
    name: fromLanguage === "klingon" ? "Klingon" : "English",
    flag: fromLanguage === "klingon" ? "🖖" : "🇺🇸",
    direction: "ltr" as const,
  };
  const targetLang: LanguageOption = {
    code: (toLanguage === "klingon" ? "tlh" : "en") as "en" | "tlh",
    name: toLanguage === "klingon" ? "Klingon" : "English",
    flag: toLanguage === "klingon" ? "🖖" : "🇺🇸",
    direction: "ltr" as const,
  };

  // Process the matches into a final translation result
  return processTranslation(text, matches, sourceLang, targetLang);
};

/**
 * Legacy interface for backward compatibility
 * @deprecated Use translateText function directly
 */
export const translationService = {
  translate: translateText,
};

/**
 * Available language options for UI selection
 * Re-exported from LanguageConfig for convenience
 */
export { languageOptions };
