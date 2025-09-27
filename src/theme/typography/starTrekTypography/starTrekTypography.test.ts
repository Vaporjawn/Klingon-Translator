import { describe, it, expect } from "vitest";
import { typographyUtils } from "./starTrekTypography";

// Expected constants that should be used internally
const EXPECTED_FONT_FAMILY =
  '"Orbitron", "Roboto", "Helvetica", "Arial", sans-serif';
const EXPECTED_LETTER_SPACING = "0.05em";

describe("Star Trek Typography Utilities", () => {
  describe("typographyUtils", () => {
    describe("createDisplayText", () => {
      it("should create display text with default font weight", () => {
        const displayText = typographyUtils.createDisplayText("2rem");

        expect(displayText).toEqual({
          fontFamily: EXPECTED_FONT_FAMILY,
          fontSize: "2rem",
          fontWeight: 500,
          letterSpacing: EXPECTED_LETTER_SPACING,
          textTransform: "uppercase",
        });
      });

      it("should create display text with custom font weight", () => {
        const displayText = typographyUtils.createDisplayText("1.5rem", 700);

        expect(displayText).toEqual({
          fontFamily: EXPECTED_FONT_FAMILY,
          fontSize: "1.5rem",
          fontWeight: 700,
          letterSpacing: EXPECTED_LETTER_SPACING,
          textTransform: "uppercase",
        });
      });

      it("should handle different font sizes", () => {
        const smallDisplay = typographyUtils.createDisplayText("1rem");
        const largeDisplay = typographyUtils.createDisplayText("3rem", 600);

        expect(smallDisplay.fontSize).toBe("1rem");
        expect(largeDisplay.fontSize).toBe("3rem");
        expect(largeDisplay.fontWeight).toBe(600);
      });

      it("should always use uppercase text transform", () => {
        const displayText = typographyUtils.createDisplayText("1.25rem", 300);

        expect(displayText.textTransform).toBe("uppercase");
      });

      it("should always use Star Trek font family and letter spacing", () => {
        const displayText = typographyUtils.createDisplayText("2.5rem");

        expect(displayText.fontFamily).toBe(EXPECTED_FONT_FAMILY);
        expect(displayText.letterSpacing).toBe(EXPECTED_LETTER_SPACING);
      });
    });

    describe("createBodyText", () => {
      it("should create body text with proper properties", () => {
        const bodyText = typographyUtils.createBodyText("1rem");

        expect(bodyText).toEqual({
          fontFamily: EXPECTED_FONT_FAMILY,
          fontSize: "1rem",
          lineHeight: 1.6,
          fontWeight: 400,
        });
      });

      it("should handle different font sizes", () => {
        const smallBody = typographyUtils.createBodyText("0.875rem");
        const largeBody = typographyUtils.createBodyText("1.125rem");

        expect(smallBody.fontSize).toBe("0.875rem");
        expect(largeBody.fontSize).toBe("1.125rem");
        expect(smallBody.fontWeight).toBe(400);
        expect(largeBody.fontWeight).toBe(400);
      });

      it("should always use consistent line height and font weight", () => {
        const bodyText = typographyUtils.createBodyText("0.9rem");

        expect(bodyText.lineHeight).toBe(1.6);
        expect(bodyText.fontWeight).toBe(400);
      });

      it("should always use Star Trek font family", () => {
        const bodyText = typographyUtils.createBodyText("1.1rem");

        expect(bodyText.fontFamily).toBe(EXPECTED_FONT_FAMILY);
      });

      it("should handle edge case font sizes", () => {
        const tinyText = typographyUtils.createBodyText("0.5rem");
        const hugeText = typographyUtils.createBodyText("5rem");

        expect(tinyText.fontSize).toBe("0.5rem");
        expect(hugeText.fontSize).toBe("5rem");
        expect(tinyText.lineHeight).toBe(1.6);
        expect(hugeText.lineHeight).toBe(1.6);
      });
    });
  });
});
