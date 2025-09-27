/**
 * @fileoverview Tests for state utility functions
 * Tests the utility functions for managing application state
 */

import { describe, it, expect } from "vitest";
import { stateUtils } from "./state";
import type { LanguageCode } from "../language/language";

describe("State Utilities", () => {
  describe("createDefaultPreferences", () => {
    it("should create default preferences for English", () => {
      const prefs = stateUtils.createDefaultPreferences("en");

      expect(prefs).toEqual({
        language: {
          code: "en",
          name: "English",
          nativeName: "English",
          direction: "ltr",
        },
        themeMode: "auto",
        starTrekSeries: "tng",
        enableSounds: true,
        fontSize: 1.0,
        highContrast: false,
        reducedMotion: false,
      });
    });

    it("should create default preferences for unknown language", () => {
      const prefs = stateUtils.createDefaultPreferences("tlh" as LanguageCode);

      expect(prefs.language.code).toBe("tlh");
      expect(prefs.language.name).toBe("Unknown");
      expect(prefs.language.nativeName).toBe("Unknown");
      expect(prefs.language.direction).toBe("ltr");
    });

    it("should use English as default when no language provided", () => {
      const prefs = stateUtils.createDefaultPreferences();

      expect(prefs.language.code).toBe("en");
      expect(prefs.language.name).toBe("English");
    });

    it("should always include default theme settings", () => {
      const prefs = stateUtils.createDefaultPreferences("fr" as LanguageCode);

      expect(prefs.themeMode).toBe("auto");
      expect(prefs.starTrekSeries).toBe("tng");
      expect(prefs.enableSounds).toBe(true);
      expect(prefs.fontSize).toBe(1.0);
      expect(prefs.highContrast).toBe(false);
      expect(prefs.reducedMotion).toBe(false);
    });
  });

  describe("createInitialTranslationState", () => {
    it("should create initial translation state with default values", () => {
      const state = stateUtils.createInitialTranslationState();

      expect(state.currentInput).toBe("");
      expect(state.currentResult).toBeNull();
      expect(state.status).toBe("idle");
      expect(state.error).toBeNull();
      expect(state.history).toEqual([]);
      expect(state.favorites).toEqual([]);
      expect(state.inputText).toBe("");
      expect(state.outputText).toBe("");
      expect(state.isTranslating).toBe(false);
    });

    it("should create state with correct language defaults", () => {
      const state = stateUtils.createInitialTranslationState();

      expect(state.sourceLanguage).toEqual({
        code: "en",
        name: "English",
        flag: "🇺🇸",
        direction: "ltr",
      });
      expect(state.targetLanguage).toEqual({
        code: "tlh",
        name: "Klingon",
        flag: "🖖",
        direction: "ltr",
      });
    });

    it("should create state with empty history array", () => {
      const state = stateUtils.createInitialTranslationState();

      expect(state.history).toEqual([]);
      expect(Array.isArray(state.history)).toBe(true);
    });

    it("should create state with no error initially", () => {
      const state = stateUtils.createInitialTranslationState();

      expect(state.error).toBeNull();
    });

    it("should create state with translation disabled initially", () => {
      const state = stateUtils.createInitialTranslationState();

      expect(state.isTranslating).toBe(false);
    });
  });

  describe("createInitialSpeechState", () => {
    it("should create initial speech state with default values", () => {
      const state = stateUtils.createInitialSpeechState();

      expect(state.isPlaying).toBe(false);
      expect(state.isPaused).toBe(false);
      expect(state.status).toBe("idle");
      expect(state.error).toBeNull();
      expect(state.currentText).toBeNull();
      expect(state.rate).toBe(1.0);
      expect(state.pitch).toBe(1.0);
      expect(state.volume).toBe(0.8);
    });

    it("should create speech state with audio disabled initially", () => {
      const state = stateUtils.createInitialSpeechState();

      expect(state.isPlaying).toBe(false);
      expect(state.isPaused).toBe(false);
    });

    it("should create speech state with default audio settings", () => {
      const state = stateUtils.createInitialSpeechState();

      expect(state.rate).toBe(1.0);
      expect(state.pitch).toBe(1.0);
      expect(state.volume).toBe(0.8);
    });
  });

  describe("type guard functions", () => {
    describe("isLoadingState", () => {
      it("should validate valid loading states", () => {
        expect(stateUtils.isLoadingState("idle")).toBe(true);
        expect(stateUtils.isLoadingState("loading")).toBe(true);
        expect(stateUtils.isLoadingState("success")).toBe(true);
        expect(stateUtils.isLoadingState("error")).toBe(true);
      });

      it("should reject invalid loading states", () => {
        expect(stateUtils.isLoadingState("invalid")).toBe(false);
        expect(stateUtils.isLoadingState("pending")).toBe(false);
        expect(stateUtils.isLoadingState("")).toBe(false);
      });
    });

    describe("isThemeMode", () => {
      it("should validate valid theme modes", () => {
        expect(stateUtils.isThemeMode("light")).toBe(true);
        expect(stateUtils.isThemeMode("dark")).toBe(true);
        expect(stateUtils.isThemeMode("auto")).toBe(true);
      });

      it("should reject invalid theme modes", () => {
        expect(stateUtils.isThemeMode("invalid")).toBe(false);
        expect(stateUtils.isThemeMode("system")).toBe(false);
        expect(stateUtils.isThemeMode("")).toBe(false);
      });
    });

    describe("isStarTrekSeries", () => {
      it("should validate valid Star Trek series", () => {
        expect(stateUtils.isStarTrekSeries("tos")).toBe(true);
        expect(stateUtils.isStarTrekSeries("tng")).toBe(true);
        expect(stateUtils.isStarTrekSeries("ds9")).toBe(true);
        expect(stateUtils.isStarTrekSeries("voy")).toBe(true);
        expect(stateUtils.isStarTrekSeries("disco")).toBe(true);
      });

      it("should reject invalid Star Trek series", () => {
        expect(stateUtils.isStarTrekSeries("invalid")).toBe(false);
        expect(stateUtils.isStarTrekSeries("enterprise")).toBe(false);
        expect(stateUtils.isStarTrekSeries("")).toBe(false);
      });
    });
  });
});
