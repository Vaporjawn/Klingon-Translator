/**
 * @fileoverview Language Selector Panel Component
 *
 * Contains language selection dropdowns and swap button in a styled panel.
 * Features glassmorphism design and responsive layout.
 *
 * @author vaporjawn
 * @version 1.0.0
 *
 * @example
 * Basic usage:
 * <LanguageSelectorPanel
 *   sourceLanguage={sourceLanguage}
 *   targetLanguage={targetLanguage}
 *   onSourceChange={setSourceLanguage}
 *   onTargetChange={setTargetLanguage}
 *   onSwap={swapLanguages}
 *   languageOptions={languageOptions}
 * />
 */

import { Box, Paper, useTheme, alpha } from "@mui/material";
import { motion } from "framer-motion";
import { useTranslation as useI18n } from "react-i18next";
import LanguageSelect from "../LanguageSelect/LanguageSelect";
import LanguageSwapButton from "../LanguageSwapButton/LanguageSwapButton";
import type { LanguageOption } from "../../../types/index/index";

/**
 * Props for the LanguageSelectorPanel component
 */
interface LanguageSelectorPanelProps {
  /** Currently selected source language */
  sourceLanguage: LanguageOption;
  /** Currently selected target language */
  targetLanguage: LanguageOption;
  /** Available language options */
  languageOptions: LanguageOption[];
  /** Callback for source language change */
  onSourceChange: (language: LanguageOption) => void;
  /** Callback for target language change */
  onTargetChange: (language: LanguageOption) => void;
  /** Callback for swapping languages */
  onSwap: () => void;
  /** Whether the selector is disabled */
  disabled?: boolean;
  /** Animation delay for entrance */
  animationDelay?: number;
}

/**
 * Language selector panel component providing:
 * - Styled panel container with glassmorphism effect
 * - Source and target language selection dropdowns
 * - Animated swap button between selectors
 * - Responsive layout that adapts to screen size
 * - Star Trek themed styling and colors
 * - Smooth entrance animations
 *
 * Layout features:
 * - Horizontal layout on desktop
 * - Wrapping layout on mobile devices
 * - Centered alignment and spacing
 * - Consistent sizing across breakpoints
 * - Glassmorphism background effects
 *
 * Interactive features:
 * - Language dropdown selection
 * - Animated swap functionality
 * - Hover effects and transitions
 * - Disabled state support
 * - Keyboard accessibility
 *
 * @param props - Component properties
 * @returns Language selector panel JSX element
 */
const LanguageSelectorPanel: React.FC<LanguageSelectorPanelProps> = ({
  sourceLanguage,
  targetLanguage,
  languageOptions,
  onSourceChange,
  onTargetChange,
  onSwap,
  disabled = false,
  animationDelay = 0.3,
}) => {
  const theme = useTheme();
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: animationDelay }}
    >
      <Paper
        elevation={4}
        sx={{
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.default, 0.6)})`,
          backdropFilter: "blur(20px)",
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          borderRadius: 3,
          p: { xs: 2, md: 3 },
          mb: { xs: 3, md: 4 },
          mx: "auto",
          width: "fit-content",
          minWidth: { xs: "320px", sm: "400px", md: "500px" },
          boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

          "&:hover": {
            boxShadow: `0 12px 48px ${alpha(theme.palette.primary.main, 0.15)}`,
            borderColor: alpha(theme.palette.primary.main, 0.2),
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 2, md: 3 },
            flexWrap: { xs: "wrap", sm: "nowrap" },

            // Ensure consistent sizing for child elements
            "& > *": {
              flex: { xs: "1 1 auto", sm: "0 1 auto" },
            },
          }}
        >
          {/* Source Language Selector */}
          <LanguageSelect
            value={sourceLanguage}
            onChange={onSourceChange}
            label={t("language_selector.from")}
            options={languageOptions}
          />

          {/* Language Swap Button */}
          <LanguageSwapButton
            onClick={onSwap}
            disabled={disabled}
            tooltip={t(
              "language_selector.swap_tooltip",
              "Swap source and target languages",
            )}
          />

          {/* Target Language Selector */}
          <LanguageSelect
            value={targetLanguage}
            onChange={onTargetChange}
            label={t("language_selector.to")}
            options={languageOptions}
          />
        </Box>
      </Paper>
    </motion.div>
  );
};

export default LanguageSelectorPanel;
