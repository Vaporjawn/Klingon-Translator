/**
 * @fileoverview Main Application Component
 *
 * Root component for the Klingon Translator application.
 * Initializes internationalization and orchestrates the main app structure.
 *
 * @author vaporjawn
 * @version 1.0.0
 *
 * @example
 * ```tsx
 * import App from './App';
 *
 * // Rendered in main.tsx
 * createRoot(document.getElementById('root')!).render(
 *   <StrictMode>
 *     <App />
 *   </StrictMode>
 * );
 * ```
 */

// Initialize internationalization system
import "../i18n/i18n/i18n";

// Component imports
import AppThemeProvider from "../components/providers/AppThemeProvider/AppThemeProvider";
import AppLayout from "../components/layout/AppLayout/AppLayout";
import MainContent from "../components/MainContent/MainContent";

/**
 * Main application component that provides:
 * - Internationalization system initialization
 * - Star Trek themed Material-UI design system
 * - Full-screen layout with background imagery
 * - Animated content with smooth transitions
 * - Primary translator interface and controls
 *
 * Architecture:
 * 1. AppThemeProvider: Material-UI theme and CSS reset
 * 2. AppLayout: Full-screen layout with Star Trek background
 * 3. MainContent: Animated translator interface and controls
 *
 * The component uses a modular approach for maintainability:
 * - Theme management is isolated in AppThemeProvider
 * - Layout concerns are handled by AppLayout
 * - Content and animations are managed by MainContent
 *
 * @returns JSX element representing the complete application
 */
function App() {
  return (
    <AppThemeProvider>
      <AppLayout>
        <MainContent />
      </AppLayout>
    </AppThemeProvider>
  );
}

export default App;
