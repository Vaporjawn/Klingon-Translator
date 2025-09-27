/**
 * @fileoverview Comprehensive tests for useTranslation hook
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTranslation, useSpeech } from "./useTranslation";

// Mock the services
vi.mock("../../services/translationService/translationService", () => ({
  translationService: {
    translate: vi.fn().mockResolvedValue({
      output: "nuqneH",
      confidence: 0.9,
      alternatives: [],
    }),
  },
  languageOptions: [
    { code: "en", name: "English", flag: "🇺🇸", direction: "ltr" },
    { code: "tlh", name: "Klingon", flag: "🖖", direction: "ltr" },
  ],
}));

vi.mock("../../services/speechService/speechService", () => ({
  speechService: {
    playTranslationSound: vi.fn(),
    playSuccessSound: vi.fn(),
    speak: vi.fn().mockResolvedValue(undefined),
    stopSpeaking: vi.fn(),
    isSupported: vi.fn().mockReturnValue(true),
  },
}));

describe("useTranslation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should initialize with default state", () => {
    const { result } = renderHook(() => useTranslation());

    expect(result.current.inputText).toBe("");
    expect(result.current.outputText).toBe("");
    expect(result.current.isTranslating).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.history).toEqual([]);
    expect(result.current.sourceLanguage.code).toBe("en");
    expect(result.current.targetLanguage.code).toBe("tlh");
  });

  it("should set source language", () => {
    const { result } = renderHook(() => useTranslation());
    const newLanguage = {
      code: "tlh" as const,
      name: "Klingon",
      flag: "🖖",
      direction: "ltr" as const,
    };

    act(() => {
      result.current.setSourceLanguage(newLanguage);
    });

    expect(result.current.sourceLanguage).toBe(newLanguage);
    expect(result.current.error).toBe(null);
  });

  it("should set target language", () => {
    const { result } = renderHook(() => useTranslation());
    const newLanguage = {
      code: "en" as const,
      name: "English",
      flag: "🇺🇸",
      direction: "ltr" as const,
    };

    act(() => {
      result.current.setTargetLanguage(newLanguage);
    });

    expect(result.current.targetLanguage).toBe(newLanguage);
    expect(result.current.error).toBe(null);
  });

  it("should swap languages", () => {
    const { result } = renderHook(() => useTranslation());

    // Set some initial text
    act(() => {
      result.current.setInputText("Hello");
    });

    act(() => {
      vi.advanceTimersByTime(600); // Wait for auto-translate
    });

    act(() => {
      result.current.swapLanguages();
    });

    expect(result.current.sourceLanguage.code).toBe("tlh");
    expect(result.current.targetLanguage.code).toBe("en");
  });

  it("should set input text", () => {
    const { result } = renderHook(() => useTranslation());

    act(() => {
      result.current.setInputText("Hello world");
    });

    expect(result.current.inputText).toBe("Hello world");
    expect(result.current.error).toBe(null);
  });

  it("should translate text successfully", async () => {
    const { result } = renderHook(() => useTranslation());

    act(() => {
      result.current.setInputText("Hello");
    });

    await act(async () => {
      await result.current.translate();
    });

    expect(result.current.outputText).toBe("nuqneH");
    expect(result.current.isTranslating).toBe(false);
    expect(result.current.history).toHaveLength(1);
    expect(result.current.history[0].query).toBe("Hello");
  });

  it("should handle empty input text", async () => {
    const { result } = renderHook(() => useTranslation());

    await act(async () => {
      await result.current.translate("");
    });

    expect(result.current.outputText).toBe("");
    expect(result.current.error).toBe(null);
  });

  it("should handle translation errors", async () => {
    // Mock a failed translation
    const { translationService } = await import(
      "../../services/translationService/translationService"
    );
    vi.mocked(translationService.translate).mockRejectedValueOnce(
      new Error("Translation failed"),
    );

    const { result } = renderHook(() => useTranslation());

    act(() => {
      result.current.setInputText("Hello");
    });

    await act(async () => {
      await result.current.translate();
    });

    expect(result.current.error).toBe("Translation failed");
    expect(result.current.isTranslating).toBe(false);
  });

  it("should auto-translate after input delay", async () => {
    const { result } = renderHook(() => useTranslation());

    act(() => {
      result.current.setInputText("hello");
    });

    // Fast-forward the timer
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Wait for the async operation and state update
    await act(async () => {
      await vi.runOnlyPendingTimersAsync();
    });

    expect(result.current.outputText).toBe("nuqneH");
  });

  it("should clear output for empty input", () => {
    const { result } = renderHook(() => useTranslation());

    act(() => {
      result.current.setInputText("Hello");
    });

    act(() => {
      result.current.setInputText("");
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current.outputText).toBe("");
  });

  it("should limit history to 20 entries", async () => {
    const { result } = renderHook(() => useTranslation());

    // Add 25 translations to history
    for (let i = 0; i < 25; i++) {
      act(() => {
        result.current.setInputText(`Hello ${i}`);
      });

      await act(async () => {
        await result.current.translate();
      });
    }

    expect(result.current.history).toHaveLength(20);
  });

  it("should play sounds during translation", async () => {
    const { speechService } = await import(
      "../../services/speechService/speechService"
    );
    const { result } = renderHook(() => useTranslation());

    act(() => {
      result.current.setInputText("Hello");
    });

    await act(async () => {
      await result.current.translate();
    });

    expect(speechService.playTranslationSound).toHaveBeenCalled();
    expect(speechService.playSuccessSound).toHaveBeenCalled();
  });
});

describe("useSpeech", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with correct state", () => {
    const { result } = renderHook(() => useSpeech());

    expect(result.current.isPlaying).toBe(false);
    expect(result.current.isSupported).toBe(true);
  });

  it("should speak text successfully", async () => {
    const { result } = renderHook(() => useSpeech());

    await act(async () => {
      await result.current.speak("Hello world", "en");
    });

    const { speechService } = await import(
      "../../services/speechService/speechService"
    );
    expect(speechService.speak).toHaveBeenCalledWith("Hello world", "en");
  });

  it("should handle empty text", async () => {
    const { result } = renderHook(() => useSpeech());

    await act(async () => {
      await result.current.speak("", "en");
    });

    const { speechService } = await import(
      "../../services/speechService/speechService"
    );
    expect(speechService.speak).not.toHaveBeenCalled();
  });

  it("should handle speech errors gracefully", async () => {
    const { speechService } = await import(
      "../../services/speechService/speechService"
    );
    vi.mocked(speechService.speak).mockRejectedValueOnce(
      new Error("Speech failed"),
    );

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { result } = renderHook(() => useSpeech());

    await act(async () => {
      await result.current.speak("Hello world", "en");
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "Speech failed:",
      expect.any(Error),
    );
    expect(result.current.isPlaying).toBe(false);

    consoleSpy.mockRestore();
  });

  it("should stop speaking", () => {
    const { result } = renderHook(() => useSpeech());

    act(() => {
      result.current.stopSpeaking();
    });

    expect(result.current.isPlaying).toBe(false);
  });

  it("should not speak when unsupported", async () => {
    // Mock speech as unsupported
    const { speechService } = await import(
      "../../services/speechService/speechService"
    );
    vi.mocked(speechService.isSupported).mockReturnValue(false);

    const { result } = renderHook(() => useSpeech());

    await act(async () => {
      await result.current.speak("Hello world", "en");
    });

    expect(speechService.speak).not.toHaveBeenCalled();
  });

  it("should complete speaking cycle", async () => {
    const { result } = renderHook(() => useSpeech());

    // Start speaking - the state should transition properly
    await act(async () => {
      await result.current.speak("Hello world", "en");
    });

    // After completion, should not be playing
    expect(result.current.isPlaying).toBe(false);
  });
});
