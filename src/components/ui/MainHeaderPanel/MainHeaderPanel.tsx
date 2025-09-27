/**
 * @fileoverview Main Header Panel Component
 *
 * Combines the translator header with language selector controls in a unified panel.
 * Features animated title, subtitle, and responsive layout with Star Trek theming.
 *
 * @author vaporjawn
 * @version 1.0.0
 *
 * @example
 * Basic usage:
 * <MainHeaderPanel
 *   sourceLanguage={sourceLanguage}
 *   targetLanguage={targetLanguage}
 *   languageOptions={languages}
 *   onSourceLanguageChange={setSourceLanguage}
 *   onTargetLanguageChange={setTargetLanguage}
 *   onLanguageSwap={handleSwap}
 * />
 */

import { Box, Container } from "@mui/material";
import { motion } from "framer-motion";
import TranslatorHeader from "../TranslatorHeader/TranslatorHeader";
import LanguageSelectorPanel from "../LanguageSelectorPanel/LanguageSelectorPanel";
import type { LanguageOption } from "../../../types/index/index";

/**
 * Props for the MainHeaderPanel component
 */
interface MainHeaderPanelProps {
  /** Currently selected source language */
  sourceLanguage: LanguageOption;
  /** Currently selected target language */
  targetLanguage: LanguageOption;
  /** Available language options */
  languageOptions: LanguageOption[];
  /** Callback for source language changes */
  onSourceLanguageChange: (language: LanguageOption) => void;
  /** Callback for target language changes */
  onTargetLanguageChange: (language: LanguageOption) => void;
  /** Callback for swapping languages */
  onLanguageSwap: () => void;
  /** Animation delay override */
  animationDelay?: number;
}

/**
 * Main header panel component providing:
 * - Application branding with animated title and subtitle
 * - Language selection controls with swap functionality
 * - Responsive layout optimized for all screen sizes
 * - Consistent spacing and alignment
 * - Star Trek themed gradient effects
 * - Smooth entry animations
 *
 * Layout structure:
 * - Container with responsive padding
 * - Centered content alignment
 * - Proper vertical spacing between sections
 * - Smooth transitions and animations
 *
 * Features:
 * - Animated header with gradient text effects
 * - Language selector panel with glassmorphism
 * - Responsive breakpoint handling
 * - Coordinated component animations
 * - Accessible navigation structure
 *
 * @param props - Component properties
 * @returns Main header panel JSX element
 */
const MainHeaderPanel: React.FC<MainHeaderPanelProps> = ({
  sourceLanguage,
  targetLanguage,
  languageOptions,
  onSourceLanguageChange,
  onTargetLanguageChange,
  onLanguageSwap,
  animationDelay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: animationDelay }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: { xs: 2, md: 3 },
            py: { xs: 1, md: 2 },
            px: { xs: 2, md: 0 },
            mt: { xs: 0, md: 0 },
          }}
        >
          {/* Application Header */}
          <TranslatorHeader animationDelay={animationDelay + 0.1} />

          {/* Language Selection Panel */}
          <LanguageSelectorPanel
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
            languageOptions={languageOptions}
            onSourceChange={onSourceLanguageChange}
            onTargetChange={onTargetLanguageChange}
            onSwap={onLanguageSwap}
            animationDelay={animationDelay + 0.3}
          />
        </Box>
      </Container>
    </motion.div>
  );
};

export default MainHeaderPanel;
