/**
 * @fileoverview Main Translator Interface Component
 *
 * Simplified orchestration component that uses modular UI components for
 * the complete translation interface. Manages translation logic and state.
 *
 * @author vaporjawn
 * @version 2.0.0 - Refactored to modular architecture
 *
 * @example
 * Basic usage:
 * ```tsx
 * import TranslatorInterface from './components/TranslatorInterface';
 *
 * function App() {
 *   return <TranslatorInterface />;
 * }
 * ```
 *
 * The component automatically handles:
 * - Language selection and switching
 * - Text input and translation
 * - Speech synthesis integration
 * - Error handling and user feedback
 * - Responsive layout and animations
 */

import MainTranslationContent from "../ui/MainTranslationContent/MainTranslationContent";
import {
  useTranslation,
  useSpeech,
} from "../../hooks/useTranslation/useTranslation";

/**
 * Main translator interface component providing:
 * - Complete translation functionality through modular components
 * - Automatic service integration (translation and speech)
 * - State management through custom hooks
 * - Responsive design with Star Trek theming
 * - Error handling and user feedback
 * - Smooth animations and transitions
 *
 * Architecture:
 * - Uses MainTranslationContent for main UI orchestration
 * - Delegates state management to useTranslation hook
 * - Integrates speech synthesis through useSpeech hook
 * - Provides clean service interfaces for dependency injection
 *
 * This refactored version reduces the original 844 lines to under 100
 * while maintaining all functionality through modular components.
 *
 * @returns Main translator interface JSX element
 */
const TranslatorInterface: React.FC = () => {
  const { languageOptions } = useTranslation();
  const { speak, isSupported } = useSpeech();

  /**
   * Translation service implementation
   * Wraps the actual translation service for dependency injection
   */
  const translationService = {
    async translate(text: string, from: string, to: string): Promise<string> {
      // Import the actual translation service
      const { translateText } = await import(
        "../../services/translationService/translationService"
      );

      // Use the real translation service
      const result = translateText({
        text,
        fromLanguage: from,
        toLanguage: to,
      });

      // Return only the translated output, no formatting
      return result.output;
    },
  };

  /**
   * Speech synthesis service implementation
   * Wraps the speak hook function for service injection
   */
  const speechService = {
    async speak(text: string, language: string): Promise<void> {
      return speak(text, language === "tlh" ? "tlh" : "en");
    },
    isSupported(): boolean {
      return isSupported;
    },
    isLanguageSupported(language: string): boolean {
      // Check if the language is supported ('en' or 'tlh')
      return isSupported && (language === "en" || language === "tlh");
    },
  };

  return (
    <MainTranslationContent
      languages={languageOptions}
      translationService={translationService}
      speechService={speechService}
    />
  );
};

export default TranslatorInterface;
