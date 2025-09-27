/**
 * @fileoverview App Layout Component
 *
 * Provides the main layout structure for the Klingon Translator application.
 * Handles full-screen viewport styling, background image management,
 * and Star Trek themed visual overlays.
 *
 * @author vaporjawn
 * @version 1.0.0
 *
 * @example
 * ```tsx
 * import AppLayout from './components/layout/AppLayout';
 * import MainContent from './components/MainContent';
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

import { Box, useTheme } from "@mui/material";
import type { ReactNode } from "react";
import backgroundImage from "../../../assets/background.jpg";

/**
 * Props for the AppLayout component
 */
interface AppLayoutProps {
  /** Child components to render within the layout */
  children: ReactNode;
}

/**
 * Main application layout component that provides:
 * - Full viewport dimensions (100vw x 100vh)
 * - Star Trek themed background image with dark overlay
 * - Responsive design with proper overflow handling
 * - Theme-aware color overlay for enhanced visual appeal
 * - Centered flex layout for child components
 *
 * Features:
 * - Fixed background attachment for parallax effect
 * - Gradient overlay to improve text readability
 * - Theme-integrated color gradients using Material-UI palette
 * - Proper z-index management for layered content
 *
 * @param props - Component props
 * @returns JSX element representing the app layout
 */
const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        // Full viewport dimensions
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",

        // Background image with dark overlay for readability
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",

        // Layout configuration
        position: "relative",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        margin: 0,
        padding: 0,
        pt: { xs: 2, md: 4 },

        // Star Trek themed color overlay using theme colors
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `
            linear-gradient(
              135deg,
              transparent 0%,
              ${theme.palette.primary.main}08 25%,
              transparent 50%,
              ${theme.palette.secondary.main}06 75%,
              transparent 100%
            )
          `,
          zIndex: -1,
          pointerEvents: "none",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default AppLayout;
