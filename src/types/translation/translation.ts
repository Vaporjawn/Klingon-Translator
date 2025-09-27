/**
 * @fileoverview Core Translation Types
 *
 * Fundamental type definitions for translation functionality, including
 * individual translations, translation results, and language processing
 * data structures used throughout the Klingon translator application.
 *
 * @author Klingon Translator Team
 * @version 1.0.0
 */

/**
 * Parts of speech classification for Klingon language elements
 *
 * Represents the grammatical categories used in Klingon linguistics,
 * essential for proper translation context and language learning.
 * Based on Marc Okrand's Klingon linguistic framework.
 *
 * @example
 * ```typescript
 * const wordType: PartOfSpeech = 'verb';
 * // Indicates this word functions as a verb in Klingon grammar
 * ```
 */
export type PartOfSpeech =
  /** Klingon nouns (DIch - things, concepts, beings) */
  | "noun"
  /** Klingon verbs (veb - actions, states, processes) */
  | "verb"
  /** Klingon adjectives (nugh maH - descriptive qualities) */
  | "adjective"
  /** Klingon adverbs (naDev - manner, time, degree modifiers) */
  | "adverb"
  /** Klingon pronouns (DIch naDev - personal and demonstrative) */
  | "pronoun"
  /** Klingon conjunctions (rarwI' - connecting words and phrases) */
  | "conjunction"
  /** Klingon exclamations (tlhol - expressions of emotion or emphasis) */
  | "exclamation"
  /** Klingon question words (DIch nugh - interrogative elements) */
  | "question"
  /** Klingon numerals (mI' - counting and quantity expressions) */
  | "numeral"
  /** Unclassified or uncertain grammatical category */
  | "unknown";

/**
 * Individual translation entry with comprehensive linguistic information
 *
 * Represents a single translation pair with optional pronunciation,
 * grammatical classification, contextual examples, and categorization.
 * Forms the foundation of the translation dictionary system.
 *
 * @interface Translation
 * @property {string} id - Unique identifier for database and caching
 * @property {string} english - English text or phrase
 * @property {string} klingon - Klingon translation in pIqaD or romanized form
 * @property {string} [phonetic] - Pronunciation guide for Klingon text
 * @property {PartOfSpeech} [partOfSpeech] - Grammatical classification
 * @property {string} [category] - Semantic category (military, science, etc.)
 * @property {Example[]} [examples] - Usage examples in context
 *
 * @example
 * ```typescript
 * const greeting: Translation = {
 *   id: 'greeting-001',
 *   english: 'Hello',
 *   klingon: 'nuqneH',
 *   phonetic: 'NOOK-neh',
 *   partOfSpeech: 'exclamation',
 *   category: 'greetings',
 *   examples: [{
 *     english: 'Hello, how are you?',
 *     klingon: 'nuqneH, qorDu\' Dub\'egh\'a\'?',
 *     context: 'formal_greeting'
 *   }]
 * };
 * ```
 */
export interface Translation {
  /** Unique identifier for database indexing and caching */
  id: string;

  /** English text, phrase, or sentence to be translated */
  english: string;

  /** Klingon translation in pIqaD script or romanized format */
  klingon: string;

  /**
   * Optional pronunciation guide for Klingon text
   *
   * Provides phonetic representation to help users with
   * correct pronunciation of Klingon words and phrases.
   */
  phonetic?: string;

  /**
   * Optional grammatical classification
   *
   * Indicates the part of speech for language learning
   * and proper grammatical usage context.
   */
  partOfSpeech?: PartOfSpeech;

  /**
   * Optional semantic category
   *
   * Groups translations by topic (military, science, culture)
   * for organized learning and contextual understanding.
   */
  category?: string;

  /**
   * Optional usage examples
   *
   * Provides context and practical application examples
   * to demonstrate proper usage in sentences and conversations.
   */
  examples?: Example[];
}

/**
 * Contextual usage example for translation entries
 *
 * Provides practical examples of how translations are used in context,
 * essential for understanding Klingon grammar and cultural nuances.
 *
 * @interface Example
 * @property {string} english - English example sentence or phrase
 * @property {string} klingon - Klingon example sentence or phrase
 * @property {string} [phonetic] - Pronunciation guide for example
 * @property {string} [context] - Usage context or situation description
 *
 * @example
 * ```typescript
 * const combatExample: Example = {
 *   english: 'Today is a good day to die',
 *   klingon: 'Hegh\'egh rur Hoch jaj\'e\'',
 *   phonetic: 'KHEG-egg roor khokh zhazh-eh',
 *   context: 'battle_cry'
 * };
 * ```
 */
export interface Example {
  /** English example text demonstrating usage */
  english: string;

  /** Klingon example text showing proper grammar and structure */
  klingon: string;

  /**
   * Optional pronunciation guide for the example
   *
   * Helps users learn correct pronunciation of complete
   * phrases and sentences in conversational context.
   */
  phonetic?: string;

  /**
   * Optional context description
   *
   * Describes the situation, cultural context, or specific
   * usage scenario where this example would be appropriate.
   */
  context?: string;
}

/**
 * Result object returned from translation operations
 *
 * Contains the translation output along with confidence metrics,
 * alternative suggestions, and pronunciation information. Used
 * by the translation engine to provide comprehensive results.
 *
 * @interface TranslationResult
 * @property {string} input - Original text submitted for translation
 * @property {string} output - Translated text result
 * @property {string} [phonetic] - Pronunciation guide for output
 * @property {number} confidence - Translation confidence score (0-1)
 * @property {Translation[]} [suggestions] - Alternative translation options
 *
 * @example
 * ```typescript
 * const result: TranslationResult = {
 *   input: 'Honor and victory',
 *   output: 'vaQ \'ej yeq',
 *   phonetic: 'VAHK edge yekh',
 *   confidence: 0.95,
 *   suggestions: [
 *     { id: 'alt-001', english: 'Honor and victory', klingon: 'naDev \'ej Dub' }
 *   ]
 * };
 * ```
 */
export interface TranslationResult {
  /** Original input text that was translated */
  input: string;

  /** Final translated output text */
  output: string;

  /**
   * Optional pronunciation guide for translated output
   *
   * Provides phonetic representation of the translation
   * to assist with proper pronunciation learning.
   */
  phonetic?: string;

  /**
   * Translation confidence score
   *
   * Numerical confidence rating from 0.0 (lowest) to 1.0 (highest)
   * indicating the translation engine's certainty about the result.
   */
  confidence: number;

  /**
   * Optional alternative translation suggestions
   *
   * Provides additional translation options when multiple
   * valid translations exist or when confidence is lower.
   */
  suggestions?: Translation[];
}

/**
 * Translation processing utilities and type guards
 */
export const translationUtils = {
  /**
   * Validates if an object is a valid Translation
   *
   * @param obj - Object to validate
   * @returns True if object matches Translation interface
   *
   * @example
   * ```typescript
   * const isValid = translationUtils.isTranslation(someObject);
   * if (isValid) {
   *   // Object is guaranteed to be a Translation
   *   console.log(someObject.english);
   * }
   * ```
   */
  isTranslation: (obj: unknown): obj is Translation => {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "id" in obj &&
      "english" in obj &&
      "klingon" in obj &&
      typeof (obj as Translation).id === "string" &&
      typeof (obj as Translation).english === "string" &&
      typeof (obj as Translation).klingon === "string"
    );
  },

  /**
   * Validates if an object is a valid TranslationResult
   *
   * @param obj - Object to validate
   * @returns True if object matches TranslationResult interface
   *
   * @example
   * ```typescript
   * const isValid = translationUtils.isTranslationResult(response);
   * if (isValid) {
   *   console.log(`Confidence: ${response.confidence}`);
   * }
   * ```
   */
  isTranslationResult: (obj: unknown): obj is TranslationResult => {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "input" in obj &&
      "output" in obj &&
      "confidence" in obj &&
      typeof (obj as TranslationResult).input === "string" &&
      typeof (obj as TranslationResult).output === "string" &&
      typeof (obj as TranslationResult).confidence === "number"
    );
  },

  /**
   * Validates if a string is a valid PartOfSpeech
   *
   * @param value - String to validate
   * @returns True if string is a valid PartOfSpeech
   *
   * @example
   * ```typescript
   * const isValid = translationUtils.isPartOfSpeech('verb'); // true
   * const isInvalid = translationUtils.isPartOfSpeech('invalid'); // false
   * ```
   */
  isPartOfSpeech: (value: string): value is PartOfSpeech => {
    const validParts: PartOfSpeech[] = [
      "noun",
      "verb",
      "adjective",
      "adverb",
      "pronoun",
      "conjunction",
      "exclamation",
      "question",
      "numeral",
      "unknown",
    ];
    return validParts.includes(value as PartOfSpeech);
  },
};
