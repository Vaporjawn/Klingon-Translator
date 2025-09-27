/**
 * @fileoverview Theme Provider Component
 *
 * Wraps the application with Material-UI ThemeProvider and global CSS reset.
 * Configures the Star Trek themed Material-UI design system.
 *
 * @author vaporjawn
 * @version 1.0.0
 *
 * @example
 * ```tsx
 * import AppThemeProvider from './components/providers/AppThemeProvider';
 * import AppContent from './components/AppContent';
 *
 * function App() {
 *   return (
 *     <AppThemeProvider>
 *       <AppContent />
 *     </AppThemeProvider>
 *   );
 * }
 * ```
 */

import { ThemeProvider, CssBaseline } from "@mui/material";
import type { ReactNode } from "react";
import { createStarTrekTheme } from "../../../theme/starTrekTheme/starTrekTheme";

/**
 * Props for the AppThemeProvider component
 */
interface AppThemeProviderProps {
  /** Child components to render with theme context */
  children: ReactNode;
  /** Star Trek theme variant to use (default: 'tng') */
  themeVariant?: "tos" | "tng" | "ds9" | "voy" | "disco";
}

/**
 * Application theme provider component that:
 * - Applies Material-UI ThemeProvider with Star Trek theme
 * - Includes CssBaseline for consistent cross-browser styling
 * - Supports multiple Star Trek theme variants
 * - Provides theme context to all child components
 *
 * Features:
 * - TNG (The Next Generation) theme as default
 * - Multiple Star Trek series themes: TOS, TNG, DS9, VOY, DISCO
 * - Global CSS reset and normalization
 * - Consistent Material-UI component styling
 *
 * Theme includes:
 * - Star Trek color palettes (primary, secondary, accent colors)
 * - Custom typography with sci-fi styling
 * - Component overrides for Star Trek aesthetic
 * - Dark theme optimized for space/futuristic interfaces
 *
 * @param props - Component props
 * @returns JSX element providing theme context
 */
const AppThemeProvider: React.FC<AppThemeProviderProps> = ({
  children,
  themeVariant = "tng",
}) => {
  // Create the Star Trek theme based on selected variant
  const theme = createStarTrekTheme(themeVariant);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppThemeProvider;
