import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { describe, it, expect, vi, beforeEach } from "vitest";
import MainTranslationContent from "./MainTranslationContent";
import { starTrekThemes } from "../../../theme/starTrekTheme/starTrekTheme";
import type { LanguageOption } from "../../../types/index/index";

// Mock framer-motion to avoid issues in test environment
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));

// Mock child components
vi.mock("./MainHeaderPanel", () => ({
  default: ({
    onLanguageSwap,
    onSourceLanguageChange,
    onTargetLanguageChange,
  }: {
    onLanguageSwap: () => void;
    onSourceLanguageChange: (lang: LanguageOption) => void;
    onTargetLanguageChange: (lang: LanguageOption) => void;
  }) => (
    <div data-testid="main-header-panel">
      <button onClick={onLanguageSwap} data-testid="swap-button">
        Swap
      </button>
      <button
        onClick={() =>
          onSourceLanguageChange({
            code: "en",
            name: "English",
            flag: "🇺🇸",
            direction: "ltr",
          })
        }
        data-testid="source-change"
      >
        Change Source
      </button>
      <button
        onClick={() =>
          onTargetLanguageChange({
            code: "tlh",
            name: "Klingon",
            flag: "🖖",
            direction: "ltr",
          })
        }
        data-testid="target-change"
      >
        Change Target
      </button>
    </div>
  ),
}));

vi.mock("./TranslationPanels", () => ({
  default: ({
    onInputChange,
    onPlaySourceAudio,
    onPlayTargetAudio,
    onClearInput,
    inputText,
    outputText,
    isTranslating,
    isPlaying,
    isSpeechSupported,
  }: {
    onInputChange: (text: string) => void;
    onPlaySourceAudio: () => void;
    onPlayTargetAudio: () => void;
    onClearInput: () => void;
    inputText: string;
    outputText: string;
    isTranslating: boolean;
    isPlaying: boolean;
    isSpeechSupported: boolean;
  }) => (
    <div data-testid="translation-panels">
      <input
        data-testid="input-text"
        value={inputText}
        onChange={(e) => onInputChange(e.target.value)}
      />
      <div data-testid="output-text">{outputText}</div>
      <button
        onClick={onPlaySourceAudio}
        data-testid="play-source"
        disabled={isPlaying}
      >
        Play Source {isSpeechSupported ? "(Supported)" : "(Not Supported)"}
      </button>
      <button
        onClick={onPlayTargetAudio}
        data-testid="play-target"
        disabled={isPlaying}
      >
        Play Target
      </button>
      <button onClick={onClearInput} data-testid="clear-input">
        Clear
      </button>
      {isTranslating && <div data-testid="translating">Translating...</div>}
    </div>
  ),
}));

vi.mock("./TranslationControls", () => ({
  default: ({
    onSwapLanguages,
    onTranslate,
    isTranslating,
    canTranslate,
  }: {
    onSwapLanguages: () => void;
    onTranslate: () => void;
    isTranslating: boolean;
    canTranslate: boolean;
  }) => (
    <div data-testid="translation-controls">
      <button onClick={onSwapLanguages} data-testid="controls-swap">
        Swap Languages
      </button>
      <button
        onClick={onTranslate}
        data-testid="translate-button"
        disabled={isTranslating || !canTranslate}
      >
        {isTranslating ? "Translating..." : "Translate"}
      </button>
    </div>
  ),
}));

vi.mock("./ErrorDisplay", () => ({
  default: ({
    error,
    onDismiss,
    onRetry,
  }: {
    error: string;
    onDismiss: () => void;
    onRetry: () => void;
  }) => (
    <div data-testid="error-display">
      <div data-testid="error-message">{error}</div>
      <button onClick={onDismiss} data-testid="dismiss-error">
        Dismiss
      </button>
      <button onClick={onRetry} data-testid="retry-error">
        Retry
      </button>
    </div>
  ),
}));

vi.mock("./TranslatorFooter", () => ({
  default: () => <div data-testid="translator-footer">Footer</div>,
}));

// Test utilities
const mockLanguages: LanguageOption[] = [
  { code: "en", name: "English", flag: "🇺🇸", direction: "ltr" },
  { code: "tlh", name: "Klingon", flag: "🖖", direction: "ltr" },
];

const mockTranslationService = {
  translate: vi.fn(),
};

const mockSpeechService = {
  speak: vi.fn(),
  isSupported: vi.fn(),
  isLanguageSupported: vi.fn(),
};

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={starTrekThemes.tos}>{component}</ThemeProvider>,
  );
};

describe("MainTranslationContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockTranslationService.translate.mockResolvedValue("Translated text");
    mockSpeechService.speak.mockResolvedValue(undefined);
    mockSpeechService.isSupported.mockReturnValue(true);
    mockSpeechService.isLanguageSupported.mockReturnValue(true);
  });

  describe("Component Rendering", () => {
    it("renders without crashing", () => {
      renderWithTheme(
        <MainTranslationContent
          languages={mockLanguages}
          translationService={mockTranslationService}
        />,
      );

      expect(screen.getByTestId("main-header-panel")).toBeInTheDocument();
      expect(screen.getByTestId("translation-panels")).toBeInTheDocument();
      expect(screen.getByTestId("translation-controls")).toBeInTheDocument();
      expect(screen.getByTestId("translator-footer")).toBeInTheDocument();
    });

    it("renders with custom initial languages", () => {
      const initialSource = mockLanguages[0]; // English
      const initialTarget = mockLanguages[1]; // Klingon

      renderWithTheme(
        <MainTranslationContent
          languages={mockLanguages}
          translationService={mockTranslationService}
          initialSourceLanguage={initialSource}
          initialTargetLanguage={initialTarget}
        />,
      );

      expect(screen.getByTestId("main-header-panel")).toBeInTheDocument();
    });

    it("renders with speech service", () => {
      renderWithTheme(
        <MainTranslationContent
          languages={mockLanguages}
          translationService={mockTranslationService}
          speechService={mockSpeechService}
        />,
      );

      expect(screen.getByText("Play Source (Supported)")).toBeInTheDocument();
    });

    it("renders without speech service", () => {
      renderWithTheme(
        <MainTranslationContent
          languages={mockLanguages}
          translationService={mockTranslationService}
        />,
      );

      expect(
        screen.getByText("Play Source (Not Supported)"),
      ).toBeInTheDocument();
    });
  });

  describe("Language Management", () => {
    it("handles language swapping", () => {
      renderWithTheme(
        <MainTranslationContent
          languages={mockLanguages}
          translationService={mockTranslationService}
        />,
      );

      // Add some input text first
      const inputElement = screen.getByTestId("input-text");
      fireEvent.change(inputElement, { target: { value: "Hello" } });

      // Mock some output text by triggering translation
      mockTranslationService.translate.mockResolvedValueOnce("nuqneH");

      // Trigger translation to set output
      const translateButton = screen.getByTestId("translate-button");
      fireEvent.click(translateButton);

      // Now swap languages
      const swapButton = screen.getByTestId("swap-button");
      fireEvent.click(swapButton);

      // Verify swap occurred (input should now be empty since we swapped)
      expect(inputElement).toHaveValue("");
    });

    it("handles source language change", () => {
      renderWithTheme(
        <MainTranslationContent
          languages={mockLanguages}
          translationService={mockTranslationService}
        />,
      );

      const changeSourceButton = screen.getByTestId("source-change");
      fireEvent.click(changeSourceButton);

      // Component should re-render without errors
      expect(screen.getByTestId("main-header-panel")).toBeInTheDocument();
    });

    it("handles target language change", () => {
      renderWithTheme(
        <MainTranslationContent
          languages={mockLanguages}
          translationService={mockTranslationService}
        />,
      );

      const changeTargetButton = screen.getByTestId("target-change");
      fireEvent.click(changeTargetButton);

      // Component should re-render without errors
      expect(screen.getByTestId("main-header-panel")).toBeInTheDocument();
    });
  });

  describe("Text Management", () => {
    it("handles input text changes", () => {
      renderWithTheme(
        <MainTranslationContent
          languages={mockLanguages}
          translationService={mockTranslationService}
        />,
      );

      const inputElement = screen.getByTestId("input-text");
      fireEvent.change(inputElement, { target: { value: "Hello world" } });

      expect(inputElement).toHaveValue("Hello world");
    });

    it("clears output when input is cleared", async () => {
      renderWithTheme(
        <MainTranslationContent
          languages={mockLanguages}
          translationService={mockTranslationService}
        />,
      );

      // Add input and translate
      const inputElement = screen.getByTestId("input-text");
      fireEvent.change(inputElement, { target: { value: "Hello" } });

      const translateButton = screen.getByTestId("translate-button");
      fireEvent.click(translateButton);

      await waitFor(() => {
        expect(screen.getByTestId("output-text")).toHaveTextContent(
          "Translated text",
        );
      });

      // Clear input
      const clearButton = screen.getByTestId("clear-input");
      fireEvent.click(clearButton);

      expect(inputElement).toHaveValue("");
      expect(screen.getByTestId("output-text")).toHaveTextContent("");
    });
  });

  describe("Translation Functionality", () => {
    it("handles successful translation", async () => {
      mockTranslationService.translate.mockResolvedValueOnce("nuqneH");

      renderWithTheme(
        <MainTranslationContent
          languages={mockLanguages}
          translationService={mockTranslationService}
        />,
      );

      const inputElement = screen.getByTestId("input-text");
      fireEvent.change(inputElement, { target: { value: "Hello" } });

      const translateButton = screen.getByTestId("translate-button");
      fireEvent.click(translateButton);

      expect(screen.getByTestId("translating")).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByTestId("output-text")).toHaveTextContent("nuqneH");
      });

      expect(mockTranslationService.translate).toHaveBeenCalledWith(
        "Hello",
        "en",
        "tlh",
      );
    });

    it("handles translation errors", async () => {
      const errorMessage = "Translation service unavailable";
      mockTranslationService.translate.mockRejectedValueOnce(
        new Error(errorMessage),
      );

      renderWithTheme(
        <MainTranslationContent
          languages={mockLanguages}
          translationService={mockTranslationService}
        />,
      );

      const inputElement = screen.getByTestId("input-text");
      fireEvent.change(inputElement, { target: { value: "Hello" } });

      const translateButton = screen.getByTestId("translate-button");
      fireEvent.click(translateButton);

      await waitFor(() => {
        expect(screen.getByTestId("error-display")).toBeInTheDocument();
      });

      expect(screen.getByTestId("error-message")).toHaveTextContent(
        errorMessage,
      );
    });

    it("handles generic translation errors", async () => {
      mockTranslationService.translate.mockRejectedValueOnce("Generic error");

      renderWithTheme(
        <MainTranslationContent
          languages={mockLanguages}
          translationService={mockTranslationService}
        />,
      );

      const inputElement = screen.getByTestId("input-text");
      fireEvent.change(inputElement, { target: { value: "Hello" } });

      const translateButton = screen.getByTestId("translate-button");
      fireEvent.click(translateButton);

      await waitFor(() => {
        expect(screen.getByTestId("error-display")).toBeInTheDocument();
      });

      expect(screen.getByTestId("error-message")).toHaveTextContent(
        "Translation failed",
      );
    });

    it("does not translate empty input", () => {
      renderWithTheme(
        <MainTranslationContent
          languages={mockLanguages}
          translationService={mockTranslationService}
        />,
      );

      const translateButton = screen.getByTestId("translate-button");
      fireEvent.click(translateButton);

      expect(mockTranslationService.translate).not.toHaveBeenCalled();
    });
  });

  describe("Speech Synthesis", () => {
    it("handles successful source audio playback", async () => {
      renderWithTheme(
        <MainTranslationContent
          languages={mockLanguages}
          translationService={mockTranslationService}
          speechService={mockSpeechService}
        />,
      );

      const inputElement = screen.getByTestId("input-text");
      fireEvent.change(inputElement, { target: { value: "Hello" } });

      const playSourceButton = screen.getByTestId("play-source");
      fireEvent.click(playSourceButton);

      await waitFor(() => {
        expect(mockSpeechService.speak).toHaveBeenCalledWith("Hello", "en");
      });
    });

    it("handles successful target audio playback", async () => {
      mockTranslationService.translate.mockResolvedValueOnce("nuqneH");

      renderWithTheme(
        <MainTranslationContent
          languages={mockLanguages}
          translationService={mockTranslationService}
          speechService={mockSpeechService}
        />,
      );

      // First translate to get output text
      const inputElement = screen.getByTestId("input-text");
      fireEvent.change(inputElement, { target: { value: "Hello" } });

      const translateButton = screen.getByTestId("translate-button");
      fireEvent.click(translateButton);

      await waitFor(() => {
        expect(screen.getByTestId("output-text")).toHaveTextContent("nuqneH");
      });

      // Now play target audio
      const playTargetButton = screen.getByTestId("play-target");
      fireEvent.click(playTargetButton);

      await waitFor(() => {
        expect(mockSpeechService.speak).toHaveBeenCalledWith("nuqneH", "tlh");
      });
    });

    it("handles speech synthesis errors for source", async () => {
      const errorMessage = "Speech synthesis failed";
      mockSpeechService.speak.mockRejectedValueOnce(new Error(errorMessage));

      renderWithTheme(
        <MainTranslationContent
          languages={mockLanguages}
          translationService={mockTranslationService}
          speechService={mockSpeechService}
        />,
      );

      const inputElement = screen.getByTestId("input-text");
      fireEvent.change(inputElement, { target: { value: "Hello" } });

      const playSourceButton = screen.getByTestId("play-source");
      fireEvent.click(playSourceButton);

      await waitFor(() => {
        expect(screen.getByTestId("error-display")).toBeInTheDocument();
      });

      expect(screen.getByTestId("error-message")).toHaveTextContent(
        errorMessage,
      );
    });

    it("handles speech synthesis errors for target", async () => {
      const errorMessage = "Speech synthesis failed";
      mockSpeechService.speak.mockRejectedValueOnce(new Error(errorMessage));
      mockTranslationService.translate.mockResolvedValueOnce("nuqneH");

      renderWithTheme(
        <MainTranslationContent
          languages={mockLanguages}
          translationService={mockTranslationService}
          speechService={mockSpeechService}
        />,
      );

      // First translate to get output text
      const inputElement = screen.getByTestId("input-text");
      fireEvent.change(inputElement, { target: { value: "Hello" } });

      const translateButton = screen.getByTestId("translate-button");
      fireEvent.click(translateButton);

      await waitFor(() => {
        expect(screen.getByTestId("output-text")).toHaveTextContent("nuqneH");
      });

      // Now try to play target audio which will fail
      const playTargetButton = screen.getByTestId("play-target");
      fireEvent.click(playTargetButton);

      await waitFor(() => {
        expect(screen.getByTestId("error-display")).toBeInTheDocument();
      });

      expect(screen.getByTestId("error-message")).toHaveTextContent(
        errorMessage,
      );
    });

    it("handles generic speech synthesis errors", async () => {
      mockSpeechService.speak.mockRejectedValueOnce("Generic error");

      renderWithTheme(
        <MainTranslationContent
          languages={mockLanguages}
          translationService={mockTranslationService}
          speechService={mockSpeechService}
        />,
      );

      const inputElement = screen.getByTestId("input-text");
      fireEvent.change(inputElement, { target: { value: "Hello" } });

      const playSourceButton = screen.getByTestId("play-source");
      fireEvent.click(playSourceButton);

      await waitFor(() => {
        expect(screen.getByTestId("error-display")).toBeInTheDocument();
      });

      expect(screen.getByTestId("error-message")).toHaveTextContent(
        "Speech synthesis failed",
      );
    });

    it("does not play audio when language not supported", async () => {
      mockSpeechService.isLanguageSupported.mockReturnValue(false);

      renderWithTheme(
        <MainTranslationContent
          languages={mockLanguages}
          translationService={mockTranslationService}
          speechService={mockSpeechService}
        />,
      );

      const inputElement = screen.getByTestId("input-text");
      fireEvent.change(inputElement, { target: { value: "Hello" } });

      const playSourceButton = screen.getByTestId("play-source");
      fireEvent.click(playSourceButton);

      await waitFor(() => {
        expect(screen.getByTestId("error-display")).toBeInTheDocument();
      });

      expect(screen.getByTestId("error-message")).toHaveTextContent(
        "Speech synthesis not supported for this language",
      );
      expect(mockSpeechService.speak).not.toHaveBeenCalled();
    });

    it("does not play audio when already playing", () => {
      renderWithTheme(
        <MainTranslationContent
          languages={mockLanguages}
          translationService={mockTranslationService}
          speechService={mockSpeechService}
        />,
      );

      const inputElement = screen.getByTestId("input-text");
      fireEvent.change(inputElement, { target: { value: "Hello" } });

      const playSourceButton = screen.getByTestId("play-source");

      // First click should work
      fireEvent.click(playSourceButton);

      // Second immediate click should be ignored (button should be disabled)
      fireEvent.click(playSourceButton);

      expect(mockSpeechService.speak).toHaveBeenCalledTimes(1);
    });

    it("does not play audio for empty text", () => {
      renderWithTheme(
        <MainTranslationContent
          languages={mockLanguages}
          translationService={mockTranslationService}
          speechService={mockSpeechService}
        />,
      );

      const playSourceButton = screen.getByTestId("play-source");
      fireEvent.click(playSourceButton);

      expect(mockSpeechService.speak).not.toHaveBeenCalled();
    });
  });

  describe("Error Handling", () => {
    it("dismisses errors when dismiss button is clicked", async () => {
      mockTranslationService.translate.mockRejectedValueOnce(
        new Error("Test error"),
      );

      renderWithTheme(
        <MainTranslationContent
          languages={mockLanguages}
          translationService={mockTranslationService}
        />,
      );

      // Trigger error
      const inputElement = screen.getByTestId("input-text");
      fireEvent.change(inputElement, { target: { value: "Hello" } });

      const translateButton = screen.getByTestId("translate-button");
      fireEvent.click(translateButton);

      await waitFor(() => {
        expect(screen.getByTestId("error-display")).toBeInTheDocument();
      });

      // Dismiss error
      const dismissButton = screen.getByTestId("dismiss-error");
      fireEvent.click(dismissButton);

      expect(screen.queryByTestId("error-display")).not.toBeInTheDocument();
    });

    it("retries translation when retry button is clicked", async () => {
      mockTranslationService.translate
        .mockRejectedValueOnce(new Error("Test error"))
        .mockResolvedValueOnce("Success");

      renderWithTheme(
        <MainTranslationContent
          languages={mockLanguages}
          translationService={mockTranslationService}
        />,
      );

      // Trigger error
      const inputElement = screen.getByTestId("input-text");
      fireEvent.change(inputElement, { target: { value: "Hello" } });

      const translateButton = screen.getByTestId("translate-button");
      fireEvent.click(translateButton);

      await waitFor(() => {
        expect(screen.getByTestId("error-display")).toBeInTheDocument();
      });

      // Retry
      const retryButton = screen.getByTestId("retry-error");
      fireEvent.click(retryButton);

      await waitFor(() => {
        expect(screen.getByTestId("output-text")).toHaveTextContent("Success");
      });

      expect(mockTranslationService.translate).toHaveBeenCalledTimes(2);
    });
  });

  describe("Animation and Timing", () => {
    it("accepts custom animation delay", () => {
      renderWithTheme(
        <MainTranslationContent
          languages={mockLanguages}
          translationService={mockTranslationService}
          animationDelay={0.5}
        />,
      );

      expect(screen.getByTestId("main-header-panel")).toBeInTheDocument();
    });
  });
});
