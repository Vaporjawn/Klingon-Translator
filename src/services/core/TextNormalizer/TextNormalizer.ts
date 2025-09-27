/**
 * @fileoverview Text normalization utilities for translation processing
 * @module TextNormalizer
 * @version 1.0.0
 *
 * @description
 * Provides text normalization functions used throughout the translation system.
 * Handles punctuation removal, whitespace normalization, and case standardization.
 *
 * @example
 * ```typescript
 * import { normalizeText } from './TextNormalizer';
 *
 * const normalized = normalizeText("Hello, World!");
 * console.log(normalized); // "hello world"
 * ```
 */

/**
 * Normalizes text for better matching by converting to lowercase,
 * trimming whitespace, removing punctuation, and normalizing spaces
 *
 * @param {string} text - The text to normalize
 * @returns {string} The normalized text
 *
 * @example
 * ```typescript
 * normalizeText("Hello, World!   "); // "hello world"
 * normalizeText("Qapla'!"); // "qapla'"
 * normalizeText("  Multiple   spaces  "); // "multiple spaces"
 * ```
 */
export const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:]/g, "") // Remove common punctuation
    .replace(/\s+/g, " "); // Normalize whitespace to single spaces
};

/**
 * Checks if two normalized strings are exactly equal
 *
 * @param {string} text1 - First text to compare
 * @param {string} text2 - Second text to compare
 * @returns {boolean} True if texts are equal after normalization
 *
 * @example
 * ```typescript
 * isExactMatch("Hello!", "hello"); // true
 * isExactMatch("Qapla'", "qapla'"); // true
 * isExactMatch("different", "words"); // false
 * ```
 */
export const isExactMatch = (text1: string, text2: string): boolean => {
  return normalizeText(text1) === normalizeText(text2);
};

/**
 * Checks if one text contains another after normalization
 *
 * @param {string} text - The text to search in
 * @param {string} searchTerm - The term to search for
 * @returns {boolean} True if text contains searchTerm
 *
 * @example
 * ```typescript
 * containsText("Hello World", "world"); // true
 * containsText("Qapla' friend", "qapla"); // true
 * containsText("short", "very long text"); // false
 * ```
 */
export const containsText = (text: string, searchTerm: string): boolean => {
  const normalizedText = normalizeText(text);
  const normalizedTerm = normalizeText(searchTerm);

  return (
    normalizedText.includes(normalizedTerm) ||
    normalizedTerm.includes(normalizedText)
  );
};

/**
 * Checks if a text is empty or only whitespace after normalization
 *
 * @param {string} text - The text to check
 * @returns {boolean} True if text is effectively empty
 *
 * @example
 * ```typescript
 * isEmptyText(""); // true
 * isEmptyText("   "); // true
 * isEmptyText("hello"); // false
 * ```
 */
export const isEmptyText = (text: string): boolean => {
  return normalizeText(text) === "";
};
