import { describe, it, expect } from "vitest";
import { componentUtils } from "./starTrekComponents";

describe("Star Trek Component Utilities", () => {
  describe("componentUtils", () => {
    describe("createCustomButton", () => {
      it("should create button with gradient background", () => {
        const button = componentUtils.createCustomButton(
          "#FF0000",
          "#0000FF",
          "#FFFFFF",
        );

        expect(button).toHaveProperty("background");
        expect(button).toHaveProperty("color", "#FFFFFF");
        expect(button).toHaveProperty("&:hover");
        expect(button["&:hover"]).toHaveProperty("background");
        expect(button["&:hover"]).toHaveProperty("boxShadow");
      });

      it("should create button with different colors", () => {
        const button = componentUtils.createCustomButton(
          "#00FF00",
          "#FF00FF",
          "#000000",
        );

        expect(button.color).toBe("#000000");
        expect(button).toHaveProperty("background");
        expect(button["&:hover"]).toHaveProperty("background");
        expect(button["&:hover"]).toHaveProperty("boxShadow");
      });

      it("should create proper hover states", () => {
        const button = componentUtils.createCustomButton(
          "#AAA",
          "#BBB",
          "#CCC",
        );

        expect(button["&:hover"]).toBeDefined();
        expect(button["&:hover"]).toHaveProperty("background");
        expect(button["&:hover"]).toHaveProperty("boxShadow");
      });
    });

    describe("createCustomCard", () => {
      it("should create card with glassmorphism background", () => {
        const card = componentUtils.createCustomCard(
          "#1A1A2E",
          "#FF6B35",
          "#FF6B35",
        );

        expect(card).toHaveProperty("border");
        expect(card).toHaveProperty("&:hover");
        expect(card.border).toContain("#FF6B35");
      });

      it("should create card with proper hover effects", () => {
        const card = componentUtils.createCustomCard(
          "#2A2A3E",
          "#00FF00",
          "#0000FF",
        );

        expect(card["&:hover"]).toBeDefined();
        expect(card["&:hover"]).toHaveProperty("border");
        expect(card["&:hover"]).toHaveProperty("boxShadow");
        expect(card["&:hover"].border).toContain("#00FF00");
        expect(card["&:hover"].boxShadow).toContain("#0000FF");
      });

      it("should handle different color combinations", () => {
        const card = componentUtils.createCustomCard(
          "#000000",
          "#FFFFFF",
          "#FF0000",
        );

        expect(card.border).toContain("#FFFFFF");
        expect(card["&:hover"].border).toContain("#FFFFFF");
        expect(card["&:hover"].boxShadow).toContain("#FF0000");
      });

      it("should create proper opacity effects", () => {
        const card = componentUtils.createCustomCard(
          "#123456",
          "#ABCDEF",
          "#FEDCBA",
        );

        expect(card.border).toMatch(/#ABCDEF\w{2}$/); // Should end with opacity
        expect(card["&:hover"].border).toMatch(/#ABCDEF\w{2}$/); // Should end with opacity
      });
    });
  });
});
