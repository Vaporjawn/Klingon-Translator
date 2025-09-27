/**
 * @fileoverview Dictionary search and matching engine for translation services
 * @module DictionaryMatcher
 * @version 1.0.0
 *
 * @description
 * Provides sophisticated dictionary matching capabilities including exact matches,
 * fuzzy matching, and similarity-based ranking for translation lookups.
 *
 * @example
 * ```typescript
 * import { findMatches } from './DictionaryMatcher';
 * import { klingonDictionary } from '../../data/klingonDictionary';
 *
 * const matches = findMatches("hello", klingonDictionary, 'english');
 * console.log(matches); // Array of matching translations, ranked by similarity
 * ```
 */

import type { Translation } from "../../../types/index/index";
import {
  normalizeText,
  isExactMatch,
  containsText,
} from "../TextNormalizer/TextNormalizer";
import { calculateSimilarity } from "../SimilarityCalculator/SimilarityCalculator";

/**
 * Interface for match results with similarity scoring
 */
interface MatchResult {
  /** The translation entry that matched */
  translation: Translation;
  /** Similarity score from 0 to 1 */
  similarity: number;
}

/**
 * Finds matching translations in the dictionary based on input text.
 * Uses a multi-tier matching strategy: exact matches, partial matches, fuzzy matches.
 *
 * @param {string} input - The text to search for
 * @param {Translation[]} dictionary - Array of translation entries to search
 * @param {'english' | 'klingon'} sourceField - Which field to search in
 * @returns {Translation[]} Array of matching translations, sorted by relevance
 *
 * @example
 * ```typescript
 * // Find English matches for "hello"
 * const matches = findMatches("hello", dictionary, 'english');
 *
 * // Find Klingon matches for "nuqneH"
 * const klingonMatches = findMatches("nuqneH", dictionary, 'klingon');
 * ```
 *
 * @algorithm Multi-Tier Matching Strategy
 * 1. **Exact Match**: Perfect normalized text match (similarity = 1.0)
 * 2. **Partial Match**: Input contains target or vice versa (similarity = 0.9)
 * 3. **Fuzzy Match**: Levenshtein distance similarity > 0.6
 */
export const findMatches = (
  input: string,
  dictionary: Translation[],
  sourceField: "english" | "klingon",
): Translation[] => {
  if (!input.trim()) return [];

  const normalizedInput = normalizeText(input);
  const matches: MatchResult[] = [];

  for (const translation of dictionary) {
    const sourceText = translation[sourceField];

    // Skip entries without the source field
    if (!sourceText) continue;

    const similarity = calculateMatchSimilarity(normalizedInput, sourceText);

    // Only include matches above threshold
    if (similarity > 0.6) {
      matches.push({ translation, similarity });
    }
  }

  // Sort by similarity (highest first) and return just the translations
  return matches
    .sort((a, b) => b.similarity - a.similarity)
    .map((match) => match.translation);
};

/**
 * Calculates similarity score using the multi-tier matching strategy
 *
 * @param {string} normalizedInput - The normalized search input
 * @param {string} sourceText - The text from the dictionary entry
 * @returns {number} Similarity score from 0 to 1
 */
const calculateMatchSimilarity = (
  normalizedInput: string,
  sourceText: string,
): number => {
  const normalizedSource = normalizeText(sourceText);

  // Tier 1: Exact match
  if (isExactMatch(normalizedInput, normalizedSource)) {
    return 1.0;
  }

  // Tier 2: Partial match (contains or is contained)
  if (containsText(normalizedInput, normalizedSource)) {
    return 0.9;
  }

  // Tier 3: Fuzzy similarity
  return calculateSimilarity(normalizedInput, normalizedSource);
};

/**
 * Searches dictionary entries by multiple fields (english, klingon, category)
 *
 * @param {string} query - The search query
 * @param {Translation[]} dictionary - Array of translation entries
 * @returns {Translation[]} Matching translations
 *
 * @example
 * ```typescript
 * // Search across all fields
 * const results = searchDictionary("greet", dictionary);
 * // Might match "greetings" in category, "hello" in english, etc.
 * ```
 */
export const searchDictionary = (
  query: string,
  dictionary: Translation[],
): Translation[] => {
  if (!query.trim()) return [];

  const normalizedQuery = normalizeText(query);

  return dictionary.filter((translation) => {
    const english = normalizeText(translation.english);
    const klingon = normalizeText(translation.klingon);
    const category = translation.category
      ? normalizeText(translation.category)
      : "";

    return (
      english.includes(normalizedQuery) ||
      klingon.includes(normalizedQuery) ||
      category.includes(normalizedQuery)
    );
  });
};

/**
 * Gets translations filtered by category
 *
 * @param {string} category - The category to filter by
 * @param {Translation[]} dictionary - Array of translation entries
 * @returns {Translation[]} Translations in the specified category
 *
 * @example
 * ```typescript
 * const greetings = getTranslationsByCategory("greetings", dictionary);
 * ```
 */
export const getTranslationsByCategory = (
  category: string,
  dictionary: Translation[],
): Translation[] => {
  return dictionary.filter((translation) => translation.category === category);
};

/**
 * Extracts all unique categories from the dictionary
 *
 * @param {Translation[]} dictionary - Array of translation entries
 * @returns {string[]} Sorted array of unique categories
 *
 * @example
 * ```typescript
 * const categories = getCategories(dictionary);
 * console.log(categories); // ["greetings", "insults", "commands", ...]
 * ```
 */
export const getCategories = (dictionary: Translation[]): string[] => {
  const categories = new Set(
    dictionary
      .map((translation) => translation.category)
      .filter((category): category is string => Boolean(category)),
  );

  return Array.from(categories).sort();
};
