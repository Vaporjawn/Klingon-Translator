/**
 * @fileoverview TranslatorInterface Component Test Suite
 *
 * Comprehensive tests for the TranslatorInterface component covering
 * service integration, hook integration, and component rendering.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { starTrekThemes } from "../../theme/starTrekTheme/starTrekTheme";
import TranslatorInterface from "./TranslatorInterface";

// Mock the hooks
const mockUseTranslation = vi.fn();
const mockUseSpeech = vi.fn();
const mockSpeak = vi.fn();

vi.mock("../hooks/useTranslation", () => ({
  useTranslation: () => mockUseTranslation(),
  useSpeech: () => mockUseSpeech(),
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: {
      children?: React.ReactNode;
      [key: string]: unknown;
    }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

// Mock the MainTranslationContent component to capture service props
let capturedTranslationService: {
  translate: (text: string, from: string, to: string) => Promise<string>;
} | null = null;

let capturedSpeechService: {
  speak: (text: string, language: string) => Promise<void>;
  isSupported: () => boolean;
  isLanguageSupported: (language: string) => boolean;
} | null = null;

vi.mock("./ui/MainTranslationContent", () => ({
  default: ({
    languages,
    translationService,
    speechService,
  }: {
    languages: Array<{ code: string; name: string }>;
    translationService: {
      translate: (text: string, from: string, to: string) => Promise<string>;
    };
    speechService: {
      speak: (text: string, language: string) => Promise<void>;
      isSupported: () => boolean;
      isLanguageSupported: (language: string) => boolean;
    };
  }) => {
    // Capture the services for testing
    capturedTranslationService = translationService;
    capturedSpeechService = speechService;

    return (
      <div data-testid="main-translation-content">
        <div data-testid="languages">{JSON.stringify(languages)}</div>
        <div data-testid="translation-service">
          {translationService ? "present" : "missing"}
        </div>
        <div data-testid="speech-service">
          {speechService ? "present" : "missing"}
        </div>
      </div>
    );
  },
}));

// Mock the translation service
vi.mock("../services/translationService", () => ({
  translateText: vi.fn().mockReturnValue({ output: "Qapla!" }),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={starTrekThemes.tos}>{component}</ThemeProvider>,
  );
};

describe("TranslatorInterface", () => {
  const mockLanguageOptions = [
    { code: "en", name: "English" },
    { code: "tlh", name: "Klingon" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseTranslation.mockReturnValue({
      languageOptions: mockLanguageOptions,
    });

    mockUseSpeech.mockReturnValue({
      speak: mockSpeak,
      isSupported: true,
    });

    // Reset captured services
    capturedTranslationService = null;
    capturedSpeechService = null;
  });

  describe("Component Rendering", () => {
    it("renders without crashing", () => {
      renderWithTheme(<TranslatorInterface />);

      expect(
        screen.getByTestId("main-translation-content"),
      ).toBeInTheDocument();
    });

    it("passes language options to MainTranslationContent", () => {
      renderWithTheme(<TranslatorInterface />);

      const languagesDiv = screen.getByTestId("languages");
      expect(languagesDiv.textContent).toBe(
        JSON.stringify(mockLanguageOptions),
      );
    });

    it("passes translation service to MainTranslationContent", () => {
      renderWithTheme(<TranslatorInterface />);

      const translationServiceDiv = screen.getByTestId("translation-service");
      expect(translationServiceDiv.textContent).toBe("present");
    });

    it("passes speech service to MainTranslationContent", () => {
      renderWithTheme(<TranslatorInterface />);

      const speechServiceDiv = screen.getByTestId("speech-service");
      expect(speechServiceDiv.textContent).toBe("present");
    });
  });

  describe("Hook Integration", () => {
    it("calls useTranslation hook", () => {
      renderWithTheme(<TranslatorInterface />);

      expect(mockUseTranslation).toHaveBeenCalled();
    });

    it("calls useSpeech hook", () => {
      renderWithTheme(<TranslatorInterface />);

      expect(mockUseSpeech).toHaveBeenCalled();
    });

    it("handles empty language options", () => {
      mockUseTranslation.mockReturnValue({
        languageOptions: [],
      });

      renderWithTheme(<TranslatorInterface />);

      const languagesDiv = screen.getByTestId("languages");
      expect(languagesDiv.textContent).toBe("[]");
    });

    it("handles speech service when not supported", () => {
      mockUseSpeech.mockReturnValue({
        speak: mockSpeak,
        isSupported: false,
      });

      renderWithTheme(<TranslatorInterface />);

      expect(screen.getByTestId("speech-service")).toHaveTextContent("present");
    });
  });

  describe("Translation Service Implementation", () => {
    it("provides translation service with correct interface", async () => {
      renderWithTheme(<TranslatorInterface />);

      expect(capturedTranslationService).toBeDefined();
      expect(capturedTranslationService?.translate).toBeInstanceOf(Function);
    });

    it("translation service uses translateText from translation service", async () => {
      const { translateText } = await import(
        "../../services/translationService/translationService"
      );

      renderWithTheme(<TranslatorInterface />);

      // Call the translate method
      expect(capturedTranslationService).not.toBeNull();
      const result = await capturedTranslationService!.translate(
        "Hello",
        "en",
        "tlh",
      );

      expect(translateText).toHaveBeenCalledWith({
        text: "Hello",
        fromLanguage: "en",
        toLanguage: "tlh",
      });
      expect(result).toBe("Qapla!");
    });

    it("translation service returns only the output string", async () => {
      renderWithTheme(<TranslatorInterface />);

      expect(capturedTranslationService).not.toBeNull();
      const result = await capturedTranslationService!.translate(
        "Test",
        "en",
        "tlh",
      );

      // Should return just the string, not the full object
      expect(result).toBe("Qapla!");
      expect(typeof result).toBe("string");
    });
  });

  describe("Speech Service Implementation", () => {
    it("provides speech service with correct interface", () => {
      renderWithTheme(<TranslatorInterface />);

      expect(capturedSpeechService).toBeDefined();
      expect(capturedSpeechService?.speak).toBeInstanceOf(Function);
      expect(capturedSpeechService?.isSupported).toBeInstanceOf(Function);
      expect(capturedSpeechService?.isLanguageSupported).toBeInstanceOf(
        Function,
      );
    });

    it("speech service calls speak hook with correct language mapping", async () => {
      renderWithTheme(<TranslatorInterface />);

      expect(capturedSpeechService).not.toBeNull();

      // Test with English
      await capturedSpeechService!.speak("Hello", "en");
      expect(mockSpeak).toHaveBeenCalledWith("Hello", "en");

      // Test with Klingon
      await capturedSpeechService!.speak("Qapla!", "tlh");
      expect(mockSpeak).toHaveBeenCalledWith("Qapla!", "tlh");

      // Test with other language (should default to English)
      await capturedSpeechService!.speak("Bonjour", "fr");
      expect(mockSpeak).toHaveBeenCalledWith("Bonjour", "en");
    });

    it("speech service isSupported returns correct value", () => {
      mockUseSpeech.mockReturnValue({
        speak: mockSpeak,
        isSupported: true,
      });

      renderWithTheme(<TranslatorInterface />);

      expect(capturedSpeechService).not.toBeNull();
      expect(capturedSpeechService!.isSupported()).toBe(true);
    });

    it("speech service isLanguageSupported handles Klingon correctly", () => {
      renderWithTheme(<TranslatorInterface />);

      expect(capturedSpeechService).not.toBeNull();
      expect(capturedSpeechService!.isLanguageSupported("tlh")).toBe(true);
      expect(capturedSpeechService!.isLanguageSupported("en")).toBe(true);
      expect(capturedSpeechService!.isLanguageSupported("fr")).toBe(false); // Only supports 'en' and 'tlh'
    });

    it("speech service when not supported", () => {
      mockUseSpeech.mockReturnValue({
        speak: mockSpeak,
        isSupported: false,
      });

      renderWithTheme(<TranslatorInterface />);

      expect(capturedSpeechService).not.toBeNull();
      expect(capturedSpeechService!.isSupported()).toBe(false);
    });
  });
});
