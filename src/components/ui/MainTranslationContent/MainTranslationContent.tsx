/**
 * @fileoverview Main Translation Content Component
 *
 * Orchestrates the complete translation interface with header, controls, and panels.
 * Manages translation state and coordinates all user interactions.
 *
 * @author vaporjawn
 * @version 1.0.0
 *
 * @example
 * Basic usage:
 * <MainTranslationContent
 *   languages={availableLanguages}
 *   translationService={translationService}
 *   speechService={speechService}
 * />
 */

import { useState, useCallback, useEffect } from "react";
import { Box, Container, Fade } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import MainHeaderPanel from "../MainHeaderPanel/MainHeaderPanel";
import TranslationPanels from "../TranslationPanels/TranslationPanels";
import TranslationControls from "../TranslationControls/TranslationControls";
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";
import TranslatorFooter from "../TranslatorFooter/TranslatorFooter";
import type { LanguageOption } from "../../../types/index/index";

/**
 * Translation service interface for dependency injection
 */
interface TranslationService {
  translate(text: string, from: string, to: string): Promise<string>;
}

/**
 * Speech synthesis service interface
 */
interface SpeechService {
  speak(text: string, language: string): Promise<void>;
  isSupported(): boolean;
  isLanguageSupported(language: string): boolean;
}

/**
 * Props for the MainTranslationContent component
 */
interface MainTranslationContentProps {
  /** Available language options */
  languages: LanguageOption[];
  /** Translation service instance */
  translationService: TranslationService;
  /** Speech synthesis service */
  speechService?: SpeechService;
  /** Initial source language */
  initialSourceLanguage?: LanguageOption;
  /** Initial target language */
  initialTargetLanguage?: LanguageOption;
  /** Animation entrance delay */
  animationDelay?: number;
}

/**
 * Main translation content component providing:
 * - Complete translation interface orchestration
 * - State management for languages and text
 * - Translation and speech synthesis coordination
 * - Error handling and user feedback
 * - Responsive layout with animations
 * - Star Trek themed styling consistency
 *
 * State management:
 * - Source and target language selection
 * - Input and output text management
 * - Translation loading states
 * - Error state handling
 * - Audio playback status
 *
 * Features:
 * - Language swapping with animation
 * - Real-time text translation
 * - Speech synthesis integration
 * - Error recovery mechanisms
 * - Responsive design patterns
 *
 * @param props - Component properties
 * @returns Main translation content JSX element
 */
const MainTranslationContent: React.FC<MainTranslationContentProps> = ({
  languages,
  translationService,
  speechService,
  initialSourceLanguage,
  initialTargetLanguage,
  animationDelay = 0,
}) => {
  // Language selection state
  const [sourceLanguage, setSourceLanguage] = useState<LanguageOption>(
    initialSourceLanguage || languages[0],
  );
  const [targetLanguage, setTargetLanguage] = useState<LanguageOption>(
    initialTargetLanguage || languages[1],
  );

  // Text state
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");

  // Interaction state
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles language swapping with smooth animation
   */
  const handleLanguageSwap = useCallback(() => {
    const tempLanguage = sourceLanguage;
    const tempText = inputText;

    setSourceLanguage(targetLanguage);
    setTargetLanguage(tempLanguage);
    setInputText(outputText);
    setOutputText(tempText);
    setError(null);
  }, [sourceLanguage, targetLanguage, inputText, outputText]);

  /**
   * Handles translation request with error handling
   */
  const handleTranslate = useCallback(async () => {
    if (!inputText.trim()) return;

    setIsTranslating(true);
    setError(null);

    try {
      const result = await translationService.translate(
        inputText.trim(),
        sourceLanguage.code,
        targetLanguage.code,
      );
      setOutputText(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Translation failed";
      setError(errorMessage);
      console.error("Translation error:", err);
    } finally {
      setIsTranslating(false);
    }
  }, [inputText, sourceLanguage.code, targetLanguage.code, translationService]);

  /**
   * Handles speech synthesis for source text
   */
  const handlePlaySourceAudio = useCallback(async () => {
    if (!speechService || !inputText.trim() || isPlaying) return;

    if (!speechService.isLanguageSupported(sourceLanguage.code)) {
      setError("Speech synthesis not supported for this language");
      return;
    }

    setIsPlaying(true);
    setError(null);

    try {
      await speechService.speak(inputText.trim(), sourceLanguage.code);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Speech synthesis failed";
      setError(errorMessage);
      console.error("Speech synthesis error:", err);
    } finally {
      setIsPlaying(false);
    }
  }, [speechService, inputText, sourceLanguage.code, isPlaying]);

  /**
   * Handles speech synthesis for target text
   */
  const handlePlayTargetAudio = useCallback(async () => {
    if (!speechService || !outputText.trim() || isPlaying) return;

    if (!speechService.isLanguageSupported(targetLanguage.code)) {
      setError("Speech synthesis not supported for this language");
      return;
    }

    setIsPlaying(true);
    setError(null);

    try {
      await speechService.speak(outputText.trim(), targetLanguage.code);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Speech synthesis failed";
      setError(errorMessage);
      console.error("Speech synthesis error:", err);
    } finally {
      setIsPlaying(false);
    }
  }, [speechService, outputText, targetLanguage.code, isPlaying]);

  /**
   * Handles clearing input text
   */
  const handleClearInput = useCallback(() => {
    setInputText("");
    setOutputText("");
    setError(null);
  }, []);

  /**
   * Handles error dismissal
   */
  const handleDismissError = useCallback(() => {
    setError(null);
  }, []);

  // Clear output when input is cleared or languages change
  useEffect(() => {
    if (!inputText.trim()) {
      setOutputText("");
    }
  }, [inputText]);

  // Check speech synthesis support
  const isSpeechSupported = speechService?.isSupported() ?? false;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: animationDelay }}
    >
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          py: { xs: 2, md: 3 },
        }}
      >
        <Container maxWidth="xl">
          {/* Main Header with Language Controls */}
          <MainHeaderPanel
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
            languageOptions={languages}
            onSourceLanguageChange={setSourceLanguage}
            onTargetLanguageChange={setTargetLanguage}
            onLanguageSwap={handleLanguageSwap}
            animationDelay={animationDelay + 0.2}
          />

          {/* Error Display */}
          <AnimatePresence>
            {error && (
              <Fade in timeout={300}>
                <Box sx={{ mb: 3 }}>
                  <ErrorDisplay
                    error={error}
                    onDismiss={handleDismissError}
                    onRetry={handleTranslate}
                  />
                </Box>
              </Fade>
            )}
          </AnimatePresence>

          {/* Main Translation Content */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: { xs: 3, md: 4 },
              px: { xs: 1, md: 2 },
            }}
          >
            {/* Translation Panels */}
            <TranslationPanels
              sourceLanguage={sourceLanguage}
              targetLanguage={targetLanguage}
              inputText={inputText}
              outputText={outputText}
              onInputChange={setInputText}
              isTranslating={isTranslating}
              isSpeechSupported={isSpeechSupported}
              isPlaying={isPlaying}
              onPlaySourceAudio={handlePlaySourceAudio}
              onPlayTargetAudio={handlePlayTargetAudio}
              onClearInput={handleClearInput}
              animationDelay={animationDelay + 0.4}
            />

            {/* Translation Controls */}
            <TranslationControls
              onSwapLanguages={handleLanguageSwap}
              onTranslate={handleTranslate}
              isTranslating={isTranslating}
              canTranslate={inputText.trim().length > 0}
            />
          </Box>

          {/* Footer */}
          <TranslatorFooter />
        </Container>
      </Box>
    </motion.div>
  );
};

export default MainTranslationContent;
