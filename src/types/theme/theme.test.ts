/**
 * @fileoverview Tests for theme utility functions
 * Tests the utility functions for managing theme configurations
 */

import { describe, it, expect } from "vitest";
import { themeTypeUtils } from "./theme";
import type { ThemeFactoryOptions } from "./theme";

describe("Theme Type Utilities", () => {
  describe("createDefaultOptions", () => {
    it("should create default theme options", () => {
      const options = themeTypeUtils.createDefaultOptions();

      expect(options).toEqual({
        enableGlassmorphism: true,
        enableAnimations: true,
        contrastLevel: 1,
        customColors: {},
      });
    });

    it("should merge provided overrides with defaults", () => {
      const overrides: Partial<ThemeFactoryOptions> = {
        enableGlassmorphism: false,
        contrastLevel: 2,
      };

      const options = themeTypeUtils.createDefaultOptions(overrides);

      expect(options).toEqual({
        enableGlassmorphism: false,
        enableAnimations: true,
        contrastLevel: 2,
        customColors: {},
      });
    });

    it("should handle custom colors override", () => {
      const overrides: Partial<ThemeFactoryOptions> = {
        customColors: {
          primary: { main: "#ff0000" },
          secondary: { main: "#00ff00" },
        },
      };

      const options = themeTypeUtils.createDefaultOptions(overrides);

      expect(options.customColors).toEqual({
        primary: { main: "#ff0000" },
        secondary: { main: "#00ff00" },
      });
    });

    it("should handle all properties override", () => {
      const overrides: Partial<ThemeFactoryOptions> = {
        enableGlassmorphism: false,
        enableAnimations: false,
        contrastLevel: 3,
        customColors: {
          background: { default: "#000000" },
        },
      };

      const options = themeTypeUtils.createDefaultOptions(overrides);

      expect(options).toEqual({
        enableGlassmorphism: false,
        enableAnimations: false,
        contrastLevel: 3,
        customColors: {
          background: { default: "#000000" },
        },
      });
    });

    it("should handle empty overrides object", () => {
      const options = themeTypeUtils.createDefaultOptions({});

      expect(options).toEqual({
        enableGlassmorphism: true,
        enableAnimations: true,
        contrastLevel: 1,
        customColors: {},
      });
    });

    it("should handle partial custom colors", () => {
      const overrides: Partial<ThemeFactoryOptions> = {
        customColors: {
          primary: { main: "#0000ff" },
        },
      };

      const options = themeTypeUtils.createDefaultOptions(overrides);

      expect(options.customColors?.primary?.main).toBe("#0000ff");
      expect(Object.keys(options.customColors || {})).toEqual(["primary"]);
    });
  });

  describe("getSeriesName", () => {
    it("should return correct series names", () => {
      expect(themeTypeUtils.getSeriesName("tos")).toBe("The Original Series");
      expect(themeTypeUtils.getSeriesName("tng")).toBe("The Next Generation");
      expect(themeTypeUtils.getSeriesName("ds9")).toBe("Deep Space Nine");
      expect(themeTypeUtils.getSeriesName("voy")).toBe("Voyager");
      expect(themeTypeUtils.getSeriesName("disco")).toBe("Discovery");
    });
  });

  describe("isThemeModeId", () => {
    it("should validate correct theme modes", () => {
      expect(themeTypeUtils.isThemeModeId("light")).toBe(true);
      expect(themeTypeUtils.isThemeModeId("dark")).toBe(true);
    });

    it("should reject invalid theme modes", () => {
      expect(themeTypeUtils.isThemeModeId("auto")).toBe(false);
      expect(themeTypeUtils.isThemeModeId("invalid")).toBe(false);
      expect(themeTypeUtils.isThemeModeId("system")).toBe(false);
      expect(themeTypeUtils.isThemeModeId("")).toBe(false);
    });
  });

  describe("isThemeSeriesId", () => {
    it("should validate correct series IDs", () => {
      expect(themeTypeUtils.isThemeSeriesId("tos")).toBe(true);
      expect(themeTypeUtils.isThemeSeriesId("tng")).toBe(true);
      expect(themeTypeUtils.isThemeSeriesId("ds9")).toBe(true);
      expect(themeTypeUtils.isThemeSeriesId("voy")).toBe(true);
      expect(themeTypeUtils.isThemeSeriesId("disco")).toBe(true);
    });

    it("should reject invalid series IDs", () => {
      expect(themeTypeUtils.isThemeSeriesId("invalid")).toBe(false);
      expect(themeTypeUtils.isThemeSeriesId("enterprise")).toBe(false);
      expect(themeTypeUtils.isThemeSeriesId("")).toBe(false);
    });
  });

  describe("isStarTrekColorPalette", () => {
    it("should validate correct color palette objects", () => {
      const validPalette = {
        name: "Test Palette",
        primary: {
          main: "#ff0000",
          light: "#ff3333",
          dark: "#cc0000",
          contrastText: "#ffffff",
        },
        secondary: {
          main: "#00ff00",
          light: "#33ff33",
          dark: "#00cc00",
          contrastText: "#000000",
        },
        background: {
          default: "#ffffff",
          paper: "#f5f5f5",
          glass: "rgba(255,255,255,0.1)",
        },
        surface: {
          primary: "#ffffff",
          secondary: "#f0f0f0",
          elevated: "#fafafa",
        },
        status: {
          success: "#4caf50",
          error: "#f44336",
          warning: "#ff9800",
          info: "#2196f3",
        },
        text: {
          primary: "#000000",
          secondary: "#666666",
          disabled: "#999999",
          hint: "#aaaaaa",
        },
      };

      expect(themeTypeUtils.isStarTrekColorPalette(validPalette)).toBe(true);
    });

    it("should reject invalid objects", () => {
      expect(themeTypeUtils.isStarTrekColorPalette({})).toBe(false);
      expect(themeTypeUtils.isStarTrekColorPalette(null)).toBe(false);
      expect(themeTypeUtils.isStarTrekColorPalette(undefined)).toBe(false);
      expect(themeTypeUtils.isStarTrekColorPalette("string")).toBe(false);
      expect(themeTypeUtils.isStarTrekColorPalette({ name: 123 })).toBe(false);
    });
  });
});
