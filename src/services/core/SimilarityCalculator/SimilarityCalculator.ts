/**
 * @fileoverview String similarity calculation utilities using Levenshtein distance
 * @module SimilarityCalculator
 * @version 1.0.0
 *
 * @description
 * Provides fuzzy string matching capabilities for translation services.
 * Uses Levenshtein distance algorithm to calculate similarity between strings.
 *
 * @example
 * ```typescript
 * import { calculateSimilarity } from './SimilarityCalculator';
 *
 * const similarity = calculateSimilarity("hello", "helo");
 * console.log(similarity); // 0.8 (80% similar)
 * ```
 */

/**
 * Calculates string similarity using Levenshtein distance algorithm.
 * Returns a value between 0 (completely different) and 1 (identical).
 *
 * @param {string} str1 - First string to compare
 * @param {string} str2 - Second string to compare
 * @returns {number} Similarity score from 0 to 1
 *
 * @example
 * ```typescript
 * calculateSimilarity("kitten", "sitting"); // ~0.57
 * calculateSimilarity("hello", "hello"); // 1.0
 * calculateSimilarity("abc", "xyz"); // ~0.0
 * ```
 *
 * @algorithm Levenshtein Distance
 * The algorithm uses dynamic programming to find the minimum number of
 * single-character edits (insertions, deletions, substitutions) needed
 * to transform one string into another.
 */
export const calculateSimilarity = (str1: string, str2: string): number => {
  const len1 = str1.length;
  const len2 = str2.length;

  // Handle edge cases
  if (len1 === 0 && len2 === 0) return 1.0;
  if (len1 === 0 || len2 === 0) return 0.0;

  // Create matrix for dynamic programming
  const matrix: number[][] = [];

  // Initialize first row and column
  for (let i = 0; i <= len2; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= len1; j++) {
    matrix[0][j] = j;
  }

  // Fill the matrix using dynamic programming
  for (let i = 1; i <= len2; i++) {
    for (let j = 1; j <= len1; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        // Characters match, no edit needed
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        // Take minimum of three operations: insert, delete, substitute
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // Substitution
          matrix[i][j - 1] + 1, // Insertion
          matrix[i - 1][j] + 1, // Deletion
        );
      }
    }
  }

  // Convert distance to similarity (0-1 scale)
  const maxLen = Math.max(len1, len2);
  return 1 - matrix[len2][len1] / maxLen;
};

/**
 * Checks if two strings are similar enough based on a threshold
 *
 * @param {string} str1 - First string to compare
 * @param {string} str2 - Second string to compare
 * @param {number} threshold - Minimum similarity threshold (0-1)
 * @returns {boolean} True if similarity is above threshold
 *
 * @example
 * ```typescript
 * isSimilar("hello", "helo", 0.7); // true
 * isSimilar("cat", "dog", 0.5); // false
 * ```
 */
export const isSimilar = (
  str1: string,
  str2: string,
  threshold: number = 0.6,
): boolean => {
  return calculateSimilarity(str1, str2) >= threshold;
};

/**
 * Finds the most similar string from an array of candidates
 *
 * @param {string} target - The string to match against
 * @param {string[]} candidates - Array of candidate strings
 * @returns {string | null} The most similar candidate or null if none found
 *
 * @example
 * ```typescript
 * const candidates = ["hello", "world", "help"];
 * findMostSimilar("helo", candidates); // "hello"
 * ```
 */
export const findMostSimilar = (
  target: string,
  candidates: string[],
): string | null => {
  if (candidates.length === 0) return null;

  let maxSimilarity = 0;
  let mostSimilar: string | null = null;

  for (const candidate of candidates) {
    const similarity = calculateSimilarity(target, candidate);
    if (similarity > maxSimilarity) {
      maxSimilarity = similarity;
      mostSimilar = candidate;
    }
  }

  return mostSimilar;
};
