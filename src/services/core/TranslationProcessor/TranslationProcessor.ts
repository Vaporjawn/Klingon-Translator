/**
 * @fileoverview Translation result processing and formatting utilities
 * @module TranslationProcessor
 * @version 1.0.0
 *
 * @description
 * Handles the processing of translation requests and formatting of results.
 * Manages confidence scoring, suggestion generation, and error handling.
 *
 * @example
 * ```typescript
 * import { processTranslation } from './TranslationProcessor';
 *
 * const result = processTranslation("hello", matches, 'en', 'tlh');
 * console.log(result.output); // "nuqneH" (or similar)
 * ```
 */

import type {
  Translation,
  TranslationResult,
  LanguageOption,
} from "../../../types/index/index";
import { calculateSimilarity } from "../SimilarityCalculator/SimilarityCalculator";
import { normalizeText, isEmptyText } from "../TextNormalizer/TextNormalizer";

/**
 * Processes translation matches and generates a formatted result
 *
 * @param {string} input - The original input text
 * @param {Translation[]} matches - Array of potential translation matches
 * @param {LanguageOption} sourceLanguage - Source language
 * @param {LanguageOption} _targetLanguage - Target language (for future use)
 * @returns {TranslationResult} Formatted translation result with confidence and suggestions
 *
 * @example
 * ```typescript
 * const matches = findMatches("hello", dictionary, 'english');
 * const result = processTranslation("hello", matches, english, klingon);
 *
 * console.log(result);
 * // {
 * //   input: "hello",
 * //   output: "nuqneH",
 * //   confidence: 0.95,
 * //   suggestions: [...]
 * // }
 * ```
 */
export const processTranslation = (
  input: string,
  matches: Translation[],
  sourceLanguage: LanguageOption,
  targetLanguage: LanguageOption,
): TranslationResult => {
  // Note: targetLanguage parameter reserved for future directional translation features
  void targetLanguage; // Suppress unused parameter warning

  // Handle empty input
  if (isEmptyText(input)) {
    return createEmptyResult(input);
  }

  // Handle no matches found
  if (matches.length === 0) {
    return createUnknownResult(input);
  }

  const bestMatch = matches[0];
  const targetField = sourceLanguage.code === "en" ? "klingon" : "english";

  // Calculate confidence based on similarity to best match
  const sourceField = sourceLanguage.code === "en" ? "english" : "klingon";
  const confidence = calculateSimilarity(
    normalizeText(input),
    normalizeText(bestMatch[sourceField]),
  );

  return {
    input,
    output: bestMatch[targetField],
    phonetic: targetField === "klingon" ? bestMatch.phonetic : undefined,
    confidence,
    suggestions: matches.slice(1, 4), // Up to 3 additional suggestions
  };
};

/**
 * Creates a result for empty input
 *
 * @param {string} input - The empty input
 * @returns {TranslationResult} Empty translation result
 */
const createEmptyResult = (input: string): TranslationResult => ({
  input,
  output: "",
  confidence: 0,
  suggestions: [],
});

/**
 * Creates a result for unknown/untranslatable input
 *
 * @param {string} input - The input that couldn't be translated
 * @returns {TranslationResult} Result indicating unknown translation
 *
 * @example
 * ```typescript
 * const result = createUnknownResult("xyz123");
 * console.log(result.output); // "[xyz123]"
 * console.log(result.confidence); // 0
 * ```
 */
const createUnknownResult = (input: string): TranslationResult => ({
  input,
  output: `[${input}]`, // Untranslated text in brackets
  confidence: 0,
  suggestions: [],
});

/**
 * Determines if a translation result is considered successful
 *
 * @param {TranslationResult} result - The translation result to evaluate
 * @param {number} threshold - Minimum confidence threshold (default: 0.5)
 * @returns {boolean} True if translation is considered successful
 *
 * @example
 * ```typescript
 * const result = { confidence: 0.8, ... };
 * isSuccessfulTranslation(result); // true
 *
 * const poorResult = { confidence: 0.3, ... };
 * isSuccessfulTranslation(poorResult); // false
 * ```
 */
export const isSuccessfulTranslation = (
  result: TranslationResult,
  threshold: number = 0.5,
): boolean => {
  return (
    result.confidence >= threshold &&
    result.output !== "" &&
    !result.output.startsWith("[")
  );
};

/**
 * Gets a human-readable confidence description
 *
 * @param {number} confidence - Confidence score from 0 to 1
 * @returns {string} Human-readable confidence level
 *
 * @example
 * ```typescript
 * getConfidenceDescription(0.95); // "Excellent"
 * getConfidenceDescription(0.75); // "Good"
 * getConfidenceDescription(0.45); // "Poor"
 * getConfidenceDescription(0.0); // "No match"
 * ```
 */
export const getConfidenceDescription = (confidence: number): string => {
  if (confidence >= 0.9) return "Excellent";
  if (confidence >= 0.7) return "Good";
  if (confidence >= 0.5) return "Fair";
  if (confidence >= 0.3) return "Poor";
  return "No match";
};
