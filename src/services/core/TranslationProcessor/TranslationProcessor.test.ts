/**
 * @fileoverview Tests for TranslationProcessor utility functions
 * Tests the helper functions and edge cases in the translation processor
 */

import { describe, it, expect } from "vitest";
import { isSuccessfulTranslation } from "./TranslationProcessor";
import type { TranslationResult } from "../../../types/translation/translation";

describe("TranslationProcessor", () => {
  describe("isSuccessfulTranslation", () => {
    it("should return true for high confidence results", () => {
      const result: TranslationResult = {
        input: "Hello",
        output: "nuqneH",
        confidence: 0.8,
        suggestions: [],
      };

      expect(isSuccessfulTranslation(result)).toBe(true);
    });

    it("should return false for low confidence results", () => {
      const result: TranslationResult = {
        input: "xyz",
        output: "[xyz]",
        confidence: 0.3,
        suggestions: [],
      };

      expect(isSuccessfulTranslation(result)).toBe(false);
    });

    it("should use custom threshold when provided", () => {
      const result: TranslationResult = {
        input: "test",
        output: "nugh",
        confidence: 0.4,
        suggestions: [],
      };

      expect(isSuccessfulTranslation(result, 0.3)).toBe(true);
      expect(isSuccessfulTranslation(result, 0.5)).toBe(false);
    });

    it("should handle edge case with zero confidence", () => {
      const result: TranslationResult = {
        input: "",
        output: "",
        confidence: 0,
        suggestions: [],
      };

      expect(isSuccessfulTranslation(result)).toBe(false);
    });

    it("should handle edge case with perfect confidence", () => {
      const result: TranslationResult = {
        input: "yes",
        output: "HIja'",
        confidence: 1.0,
        suggestions: [],
      };

      expect(isSuccessfulTranslation(result)).toBe(true);
    });

    it("should handle edge case with confidence exactly at threshold", () => {
      const result: TranslationResult = {
        input: "maybe",
        output: "chup",
        confidence: 0.5,
        suggestions: [],
      };

      expect(isSuccessfulTranslation(result, 0.5)).toBe(true);
      expect(isSuccessfulTranslation(result, 0.51)).toBe(false);
    });
  });
});
