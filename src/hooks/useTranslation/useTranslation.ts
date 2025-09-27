import { useState, useCallback, useEffect } from "react";
import {
  translationService,
  languageOptions,
} from "../../services/translationService/translationService";
import { speechService } from "../../services/speechService/speechService";
import type {
  LanguageOption,
  TranslationState,
  TranslationHistoryEntry,
} from "../../types/index/index";

export const useTranslation = () => {
  const [state, setState] = useState<TranslationState>({
    currentInput: "",
    currentResult: null,
    status: "idle",
    error: null,
    history: [],
    favorites: [],
    sourceLanguage: languageOptions[0], // English
    targetLanguage: languageOptions[1], // Klingon
    inputText: "",
    outputText: "",
    isTranslating: false,
  });

  const setSourceLanguage = useCallback((language: LanguageOption) => {
    setState((prev) => ({
      ...prev,
      sourceLanguage: language,
      error: null,
    }));
  }, []);

  const setTargetLanguage = useCallback((language: LanguageOption) => {
    setState((prev) => ({
      ...prev,
      targetLanguage: language,
      error: null,
    }));
  }, []);

  const swapLanguages = useCallback(() => {
    setState((prev) => ({
      ...prev,
      sourceLanguage: prev.targetLanguage,
      targetLanguage: prev.sourceLanguage,
      inputText: prev.outputText,
      outputText: prev.inputText,
      error: null,
    }));
  }, []);

  const setInputText = useCallback((text: string) => {
    setState((prev) => ({
      ...prev,
      inputText: text,
      error: null,
    }));
  }, []);

  const translate = useCallback(
    async (text?: string) => {
      const textToTranslate = text || state.inputText;

      if (!textToTranslate.trim()) {
        setState((prev) => ({ ...prev, outputText: "", error: null }));
        return;
      }

      setState((prev) => ({ ...prev, isTranslating: true, error: null }));

      try {
        // Play translation sound effect
        speechService.playTranslationSound();

        const result = await translationService.translate({
          text: textToTranslate,
          fromLanguage:
            state.sourceLanguage.code === "en" ? "english" : "klingon",
          toLanguage:
            state.targetLanguage.code === "en" ? "english" : "klingon",
        });

        const historyEntry: TranslationHistoryEntry = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          query: textToTranslate,
          result,
          timestamp: new Date(),
          isFavorite: false,
        };

        setState((prev) => ({
          ...prev,
          outputText: result.output,
          isTranslating: false,
          history: [historyEntry, ...prev.history.slice(0, 19)], // Keep last 20 translations
        }));

        // Play success sound if translation was successful
        if (result.confidence > 0.5) {
          speechService.playSuccessSound();
        }
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isTranslating: false,
          error: error instanceof Error ? error.message : "Translation failed",
        }));
      }
    },
    [state.inputText, state.sourceLanguage, state.targetLanguage],
  );

  // Auto-translate after a short delay when input changes
  useEffect(() => {
    if (!state.inputText.trim()) {
      setState((prev) => ({ ...prev, outputText: "" }));
      return;
    }

    const timeoutId = setTimeout(() => {
      translate();
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [state.inputText, translate]);

  return {
    ...state,
    setSourceLanguage,
    setTargetLanguage,
    swapLanguages,
    setInputText,
    translate,
    languageOptions,
  };
};

export const useSpeech = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported] = useState(speechService.isSupported());

  const speak = useCallback(
    async (text: string, language: "en" | "tlh" = "en") => {
      if (!text.trim() || !isSupported) return;

      setIsPlaying(true);
      try {
        await speechService.speak(text, language);
      } catch (error) {
        console.error("Speech failed:", error);
      } finally {
        setIsPlaying(false);
      }
    },
    [isSupported],
  );

  const stopSpeaking = useCallback(() => {
    speechService.stopSpeaking();
    setIsPlaying(false);
  }, []);

  return {
    speak,
    stopSpeaking,
    isPlaying,
    isSupported,
  };
};
