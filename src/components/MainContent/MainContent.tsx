/**
 * @fileoverview Main Application Content Component
 *
 * Orchestrates the main application content including the translator interface
 * and language switcher. Provides the primary user interface layout.
 *
 * @author vaporjawn
 * @version 1.0.0
 *
 * @example
 * ```tsx
 * import MainContent from './components/MainContent';
 * import AppLayout from './components/layout/AppLayout';
 *
 * function App() {
 *   return (
 *     <AppLayout>
 *       <MainContent />
 *     </AppLayout>
 *   );
 * }
 * ```
 */

import TranslatorInterface from "../TranslatorInterface/TranslatorInterface";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import AnimatedWrapper from "../layout/AnimatedWrapper/AnimatedWrapper";

/**
 * Main content component that provides:
 * - Primary translator interface with Google Translate-like UI
 * - Floating action button for language switching
 * - Smooth entry animations with Star Trek styling
 * - Responsive layout for different screen sizes
 *
 * Component structure:
 * 1. AnimatedWrapper: Provides smooth entry animations
 * 2. TranslatorInterface: Main translation functionality
 * 3. LanguageSwitcher: FAB for switching interface language
 *
 * The layout uses absolute positioning for the language switcher
 * to maintain a clean, uncluttered main interface while providing
 * easy access to language controls.
 *
 * @returns JSX element containing the main app content
 */
const MainContent: React.FC = () => {
  return (
    <>
      <AnimatedWrapper>
        <TranslatorInterface />
      </AnimatedWrapper>

      {/* Language Switcher FAB - positioned absolutely */}
      <LanguageSwitcher />
    </>
  );
};

export default MainContent;
