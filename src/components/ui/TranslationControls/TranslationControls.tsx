/**
 * @fileoverview Translation Controls Component
 *
 * Groups translation-related controls including swap and translate buttons.
 * Provides centralized control layout with responsive design.
 *
 * @author vaporjawn
 * @version 1.0.0
 *
 * @example
 * ```tsx
 * import TranslationControls from './ui/TranslationControls';
 *
 * function TranslatorInterface() {
 *   const [isTranslating, setIsTranslating] = useState(false);
 *   const [inputText, setInputText] = useState('');
 *
 *   const handleTranslate = () => {
 *     setIsTranslating(true);
 *     // Perform translation
 *   };
 *
 *   const handleSwapLanguages = () => {
 *     // Swap source and target languages
 *   };
 *
 *   return (
 *     <TranslationControls
 *       onTranslate={handleTranslate}
 *       onSwapLanguages={handleSwapLanguages}
 *       isTranslating={isTranslating}
 *       canTranslate={inputText.trim().length > 0}
 *     />
 *   );
 * }
 * ```
 */

import { Box, Stack, useTheme, alpha } from "@mui/material";
import LanguageSwapButton from "../LanguageSwapButton/LanguageSwapButton";
import TranslateButton from "../TranslateButton/TranslateButton";

/**
 * Props for the TranslationControls component
 */
interface TranslationControlsProps {
  /** Callback fired when translate button is clicked */
  onTranslate: () => void;
  /** Callback fired when swap languages button is clicked */
  onSwapLanguages: () => void;
  /** Whether translation is currently in progress */
  isTranslating?: boolean;
  /** Whether translation can be performed (e.g., has input text) */
  canTranslate?: boolean;
  /** Layout direction - horizontal or vertical */
  direction?: "row" | "column";
  /** Size variant for buttons */
  size?: "small" | "medium" | "large";
}

/**
 * Translation controls component providing:
 * - Centralized translation action controls
 * - Responsive layout with mobile optimization
 * - Star Trek themed styling consistent with app
 * - Proper spacing and alignment
 * - Accessibility support with keyboard navigation
 * - Loading states and visual feedback
 *
 * Layout features:
 * - Horizontal layout on desktop (row)
 * - Vertical layout on mobile (column)
 * - Proper spacing between controls
 * - Centered alignment for visual balance
 * - Consistent button sizing
 *
 * Functionality:
 * - Translate button with loading states
 * - Language swap with animation
 * - Proper disabled states
 * - Visual feedback for interactions
 * - Keyboard accessibility
 *
 * @param props - Component properties
 * @returns Translation controls JSX element
 */
const TranslationControls: React.FC<TranslationControlsProps> = ({
  onTranslate,
  onSwapLanguages,
  isTranslating = false,
  canTranslate = true,
  direction = "row",
  size = "large",
}) => {
  const theme = useTheme();

  /**
   * Gets responsive direction based on screen size
   * @returns Stack direction for current breakpoint
   */
  const getResponsiveDirection = () => {
    if (direction === "column") return "column";
    return { xs: "column" as const, sm: "row" as const };
  };

  /**
   * Gets spacing configuration for stack
   * @returns Spacing value based on direction and breakpoint
   */
  const getSpacing = () => {
    return direction === "column" ? 2 : { xs: 2, sm: 3 };
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: { xs: 2, sm: 3 },
        px: 2,
        backgroundColor: alpha(theme.palette.background.paper, 0.05),
        backdropFilter: "blur(5px)",
        borderRadius: 2,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        margin: { xs: "16px 0", sm: "24px 0" },
      }}
    >
      <Stack
        direction={getResponsiveDirection()}
        spacing={getSpacing()}
        alignItems="center"
        justifyContent="center"
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: "auto" },
        }}
      >
        {/* Language Swap Button */}
        <LanguageSwapButton
          onClick={onSwapLanguages}
          disabled={isTranslating}
          tooltip="Swap source and target languages"
        />

        {/* Translate Button */}
        <TranslateButton
          onClick={onTranslate}
          isLoading={isTranslating}
          disabled={!canTranslate || isTranslating}
          size={size}
          text="Translate to Klingon"
        />
      </Stack>
    </Box>
  );
};

export default TranslationControls;
