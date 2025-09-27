/**
 * @fileoverview Test suite for TranslationPanels component
 *
 * Tests comprehensive functionality including:
 * - Component rendering with various props
 * - Language display and flag rendering
 * - Input and output text areas
 * - Audio controls and speech functionality
 * - Clear input functionality
 * - Loading states and animations
 * - Responsive layout and styling
 * - User interactions and callbacks
 */

import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { starTrekThemes } from "../../../theme/starTrekTheme/starTrekTheme";
import TranslationPanels from "./TranslationPanels";
import type { LanguageOption } from "../../../types/index/index";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({
    children,
  }: React.PropsWithChildren<Record<string, unknown>>) => <>{children}</>,
}));

// Mock react-i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        input_placeholder: "Enter text to translate...",
        output_placeholder: "Translation will appear here...",
        "translation.translating": "Translating...",
      };
      return translations[key] || key;
    },
  }),
}));

describe("TranslationPanels", () => {
  // Test data
  const mockLanguages: LanguageOption[] = [
    { code: "en", name: "English", flag: "🇺🇸", direction: "ltr" },
    { code: "tlh", name: "Klingon", flag: "⚔️", direction: "ltr" },
  ];

  const defaultProps = {
    sourceLanguage: mockLanguages[0],
    targetLanguage: mockLanguages[1],
    inputText: "",
    outputText: "",
    onInputChange: vi.fn(),
  };

  // Helper function to render component with theme
  const renderWithTheme = (props = {}) => {
    return render(
      <ThemeProvider theme={starTrekThemes.tng}>
        <TranslationPanels {...defaultProps} {...props} />
      </ThemeProvider>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Component Rendering", () => {
    it("renders without crashing", () => {
      renderWithTheme();

      // Should render input and output panels - use getAllByDisplayValue for multiple empty textareas
      const emptyTextAreas = screen.getAllByDisplayValue("");
      expect(emptyTextAreas.length).toBeGreaterThan(0);
    });

    it("renders with custom languages", () => {
      renderWithTheme({
        sourceLanguage: mockLanguages[1],
        targetLanguage: mockLanguages[0],
      });

      // Should display language names and flags
      expect(screen.getByText("Klingon")).toBeInTheDocument();
      expect(screen.getByText("English")).toBeInTheDocument();
      expect(screen.getByText("⚔️")).toBeInTheDocument();
      expect(screen.getByText("🇺🇸")).toBeInTheDocument();
    });

    it("renders with input and output text", () => {
      const inputText = "Hello world";
      const outputText = "nuqneH puS";

      renderWithTheme({
        inputText,
        outputText,
      });

      expect(screen.getByDisplayValue(inputText)).toBeInTheDocument();
      expect(screen.getByDisplayValue(outputText)).toBeInTheDocument();
    });

    it("renders with animation delay", () => {
      renderWithTheme({ animationDelay: 1.0 });

      // Component should render regardless of animation delay
      expect(screen.getByText("English")).toBeInTheDocument();
    });
  });

  describe("Input Panel Functionality", () => {
    it("handles input text changes", () => {
      const onInputChange = vi.fn();
      renderWithTheme({ onInputChange });

      const inputField = screen.getAllByRole("textbox")[0];
      fireEvent.change(inputField, { target: { value: "Hello" } });

      expect(onInputChange).toHaveBeenCalledWith("Hello");
    });

    it("displays placeholder text", () => {
      renderWithTheme();

      expect(
        screen.getByPlaceholderText("Enter text to translate..."),
      ).toBeInTheDocument();
    });

    it("shows clear button when input has text", () => {
      const onClearInput = vi.fn();
      renderWithTheme({
        inputText: "Hello world",
        onClearInput,
      });

      // Clear button shows when inputText.trim() exists and onClearInput is provided
      // It uses ClearIcon without accessible name, find by role button
      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBeGreaterThan(0);
      // The clear button should be present
      expect(buttons).toBeTruthy();
    });

    it("does not show clear button when input is empty", () => {
      const onClearInput = vi.fn();
      renderWithTheme({
        inputText: "",
        onClearInput,
      });

      // No buttons should be present when inputText is empty
      const buttons = screen.queryAllByRole("button");
      expect(buttons).toHaveLength(0);
    });

    it("calls onClearInput when clear button is clicked", () => {
      const onClearInput = vi.fn();
      renderWithTheme({
        inputText: "Hello world",
        onClearInput,
      });

      // Find any button (should be the clear button when only onClearInput is provided)
      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBeGreaterThan(0);

      // Click the first/only button which should be the clear button
      fireEvent.click(buttons[0]);

      expect(onClearInput).toHaveBeenCalled();
    });

    it("does not show clear button when onClearInput is not provided", () => {
      renderWithTheme({
        inputText: "Hello world",
        onClearInput: undefined,
      });

      // No buttons should be present when onClearInput is not provided
      const buttons = screen.queryAllByRole("button");
      expect(buttons).toHaveLength(0);
    });
  });

  describe("Output Panel Functionality", () => {
    it("displays output placeholder text", () => {
      renderWithTheme();

      expect(
        screen.getByPlaceholderText("Translation will appear here..."),
      ).toBeInTheDocument();
    });

    it("renders readonly output text area", () => {
      const outputText = "nuqneH puS";
      renderWithTheme({ outputText });

      const outputField = screen.getByDisplayValue(outputText);
      expect(outputField).toHaveAttribute("readonly");
    });

    it("shows loading state during translation", () => {
      renderWithTheme({ isTranslating: true });

      expect(screen.getByText("Translating...")).toBeInTheDocument();
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("does not show loading state when not translating", () => {
      renderWithTheme({ isTranslating: false });

      expect(screen.queryByText("Translating...")).not.toBeInTheDocument();
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });
  });

  describe("Audio Controls", () => {
    it("shows audio button for input when speech is supported and text exists", () => {
      renderWithTheme({
        inputText: "Hello world",
        isSpeechSupported: true,
        onPlaySourceAudio: vi.fn(),
      });

      // Should have audio buttons for both panels
      const audioButtons = screen.getAllByRole("button");
      const volumeButtons = audioButtons.filter((button) =>
        button.querySelector('svg[data-testid="VolumeUpIcon"]'),
      );
      expect(volumeButtons).toHaveLength(1);
    });

    it("shows audio button for output when speech is supported and text exists", () => {
      renderWithTheme({
        outputText: "nuqneH puS",
        isSpeechSupported: true,
        onPlayTargetAudio: vi.fn(),
      });

      const audioButtons = screen.getAllByRole("button");
      const volumeButtons = audioButtons.filter((button) =>
        button.querySelector('svg[data-testid="VolumeUpIcon"]'),
      );
      expect(volumeButtons).toHaveLength(1);
    });

    it("does not show audio buttons when speech is not supported", () => {
      renderWithTheme({
        inputText: "Hello world",
        outputText: "nuqneH puS",
        isSpeechSupported: false,
        onPlaySourceAudio: vi.fn(),
        onPlayTargetAudio: vi.fn(),
      });

      const audioButtons = screen.queryAllByRole("button");
      const volumeButtons = audioButtons.filter((button) =>
        button.querySelector('svg[data-testid="VolumeUpIcon"]'),
      );
      expect(volumeButtons).toHaveLength(0);
    });

    it("does not show audio buttons when text is empty", () => {
      renderWithTheme({
        inputText: "",
        outputText: "",
        isSpeechSupported: true,
        onPlaySourceAudio: vi.fn(),
        onPlayTargetAudio: vi.fn(),
      });

      const audioButtons = screen.queryAllByRole("button");
      const volumeButtons = audioButtons.filter((button) =>
        button.querySelector('svg[data-testid="VolumeUpIcon"]'),
      );
      expect(volumeButtons).toHaveLength(0);
    });

    it("does not show audio buttons when callbacks are not provided", () => {
      renderWithTheme({
        inputText: "Hello world",
        outputText: "nuqneH puS",
        isSpeechSupported: true,
        onPlaySourceAudio: undefined,
        onPlayTargetAudio: undefined,
      });

      const audioButtons = screen.queryAllByRole("button");
      const volumeButtons = audioButtons.filter((button) =>
        button.querySelector('svg[data-testid="VolumeUpIcon"]'),
      );
      expect(volumeButtons).toHaveLength(0);
    });

    it("calls onPlaySourceAudio when source audio button is clicked", () => {
      const onPlaySourceAudio = vi.fn();
      renderWithTheme({
        inputText: "Hello world",
        isSpeechSupported: true,
        onPlaySourceAudio,
      });

      const audioButtons = screen.getAllByRole("button");
      const volumeButton = audioButtons.find((button) =>
        button.querySelector('svg[data-testid="VolumeUpIcon"]'),
      );

      fireEvent.click(volumeButton!);
      expect(onPlaySourceAudio).toHaveBeenCalled();
    });

    it("calls onPlayTargetAudio when target audio button is clicked", () => {
      const onPlayTargetAudio = vi.fn();
      renderWithTheme({
        outputText: "nuqneH puS",
        isSpeechSupported: true,
        onPlayTargetAudio,
      });

      const audioButtons = screen.getAllByRole("button");
      const volumeButton = audioButtons.find((button) =>
        button.querySelector('svg[data-testid="VolumeUpIcon"]'),
      );

      fireEvent.click(volumeButton!);
      expect(onPlayTargetAudio).toHaveBeenCalled();
    });

    it("disables audio buttons when audio is playing", () => {
      renderWithTheme({
        inputText: "Hello world",
        outputText: "nuqneH puS",
        isSpeechSupported: true,
        isPlaying: true,
        onPlaySourceAudio: vi.fn(),
        onPlayTargetAudio: vi.fn(),
      });

      const audioButtons = screen.getAllByRole("button");
      const volumeButtons = audioButtons.filter((button) =>
        button.querySelector('svg[data-testid="VolumeUpIcon"]'),
      );

      volumeButtons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });

    it("enables audio buttons when audio is not playing", () => {
      renderWithTheme({
        inputText: "Hello world",
        outputText: "nuqneH puS",
        isSpeechSupported: true,
        isPlaying: false,
        onPlaySourceAudio: vi.fn(),
        onPlayTargetAudio: vi.fn(),
      });

      const audioButtons = screen.getAllByRole("button");
      const volumeButtons = audioButtons.filter((button) =>
        button.querySelector('svg[data-testid="VolumeUpIcon"]'),
      );

      volumeButtons.forEach((button) => {
        expect(button).not.toBeDisabled();
      });
    });
  });

  describe("Panel Layout and Styling", () => {
    it("renders input and output panels", () => {
      renderWithTheme();

      // Should have two text areas - input and output
      const textAreas = screen.getAllByRole("textbox");
      expect(textAreas).toHaveLength(2);
    });

    it("displays language flags and names in headers", () => {
      renderWithTheme();

      expect(screen.getByText("🇺🇸")).toBeInTheDocument();
      expect(screen.getByText("⚔️")).toBeInTheDocument();
      expect(screen.getByText("English")).toBeInTheDocument();
      expect(screen.getByText("Klingon")).toBeInTheDocument();
    });

    it("renders with proper panel structure", () => {
      const { container } = renderWithTheme();

      // Should have papers for both panels
      const papers = container.querySelectorAll(".MuiPaper-root");
      expect(papers).toHaveLength(2);
    });
  });

  describe("Text Area Behavior", () => {
    it("handles multiline input text", () => {
      const onInputChange = vi.fn();
      const multilineText = "Line 1\nLine 2\nLine 3";

      renderWithTheme({
        inputText: multilineText,
        onInputChange,
      });

      // Check that the text appears in the textarea - use a partial match since formatting may vary
      const inputField = screen.getAllByRole("textbox")[0];
      expect(inputField).toHaveValue(multilineText);
    });

    it("handles empty text input", () => {
      const onInputChange = vi.fn();
      renderWithTheme({
        inputText: "initial text",
        onInputChange,
      });

      const inputField = screen.getAllByRole("textbox")[0];
      fireEvent.change(inputField, { target: { value: "" } });

      expect(onInputChange).toHaveBeenCalledWith("");
    });

    it("handles whitespace-only input text", () => {
      renderWithTheme({
        inputText: "   ",
        onClearInput: vi.fn(),
      });

      // Clear button should NOT show for whitespace-only text (inputText.trim() is false)
      const buttons = screen.queryAllByRole("button");
      expect(buttons).toHaveLength(0);
    });

    it("displays long text content properly", () => {
      const longText =
        "This is a very long text that should be displayed properly in the text area and should handle word wrapping and multiple lines correctly without any issues.";

      renderWithTheme({
        inputText: longText,
        outputText: longText,
      });

      // Use getAllByDisplayValue since both input and output might have the same text
      const textBoxes = screen.getAllByDisplayValue(longText);
      expect(textBoxes.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("Animation and Transitions", () => {
    it("renders loading animation when translating", async () => {
      renderWithTheme({ isTranslating: true });

      await waitFor(() => {
        expect(screen.getByRole("progressbar")).toBeInTheDocument();
        expect(screen.getByText("Translating...")).toBeInTheDocument();
      });
    });

    it("does not render loading animation when not translating", () => {
      renderWithTheme({ isTranslating: false });

      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
      expect(screen.queryByText("Translating...")).not.toBeInTheDocument();
    });

    it("handles animation state transitions", async () => {
      const { rerender } = renderWithTheme({ isTranslating: false });

      // Start translating
      rerender(
        <ThemeProvider theme={starTrekThemes.tng}>
          <TranslationPanels {...defaultProps} isTranslating={true} />
        </ThemeProvider>,
      );

      await waitFor(() => {
        expect(screen.getByRole("progressbar")).toBeInTheDocument();
      });

      // Stop translating
      rerender(
        <ThemeProvider theme={starTrekThemes.tng}>
          <TranslationPanels {...defaultProps} isTranslating={false} />
        </ThemeProvider>,
      );

      await waitFor(() => {
        expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
      });
    });
  });

  describe("Props Handling", () => {
    it("handles all optional props being undefined", () => {
      renderWithTheme({
        isTranslating: undefined,
        isSpeechSupported: undefined,
        isPlaying: undefined,
        onPlaySourceAudio: undefined,
        onPlayTargetAudio: undefined,
        onClearInput: undefined,
        animationDelay: undefined,
      });

      // Should render without errors
      expect(screen.getByText("English")).toBeInTheDocument();
    });

    it("handles default prop values correctly", () => {
      renderWithTheme();

      // Should use default values when props are not provided
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
      expect(screen.queryByText("Translating...")).not.toBeInTheDocument();
    });

    it("updates when props change", () => {
      const { rerender } = renderWithTheme({
        inputText: "Initial text",
      });

      expect(screen.getByDisplayValue("Initial text")).toBeInTheDocument();

      // Update props
      rerender(
        <ThemeProvider theme={starTrekThemes.tng}>
          <TranslationPanels {...defaultProps} inputText="Updated text" />
        </ThemeProvider>,
      );

      expect(screen.getByDisplayValue("Updated text")).toBeInTheDocument();
    });
  });
});
