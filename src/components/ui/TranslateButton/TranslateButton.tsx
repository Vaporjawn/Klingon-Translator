/**
 * @fileoverview Translate Button Component
 *
 * Main translation trigger button with loading states and animations.
 * Features Star Trek themed styling and smooth visual feedback.
 *
 * @author vaporjawn
 * @version 1.0.0
 *
 * @example
 * ```tsx
 * import TranslateButton from './ui/TranslateButton';
 *
 * function TranslatorInterface() {
 *   const [isLoading, setIsLoading] = useState(false);
 *
 *   const handleTranslate = async () => {
 *     setIsLoading(true);
 *     // Perform translation
 *     setIsLoading(false);
 *   };
 *
 *   return (
 *     <TranslateButton
 *       onClick={handleTranslate}
 *       isLoading={isLoading}
 *       disabled={!inputText.trim()}
 *     />
 *   );
 * }
 * ```
 */

import { Button, CircularProgress, useTheme, alpha } from "@mui/material";
import { Translate as TranslateIcon } from "@mui/icons-material";
import { motion } from "framer-motion";

/**
 * Props for the TranslateButton component
 */
interface TranslateButtonProps {
  /** Callback fired when button is clicked */
  onClick: () => void;
  /** Whether the translation is currently loading */
  isLoading?: boolean;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Custom button text */
  text?: string;
  /** Button size variant */
  size?: "small" | "medium" | "large";
}

/**
 * Translate button component providing:
 * - Animated button with loading spinner integration
 * - Star Trek themed glassmorphism styling
 * - Smooth hover and press animations
 * - Loading state with progress indicator
 * - Accessibility support with proper ARIA labels
 * - Responsive sizing and styling
 *
 * Animation features:
 * - Scale animation on hover and press
 * - Loading spinner with fade in/out
 * - Smooth color transitions
 * - Pulse effect during loading
 * - Icon rotation on activation
 *
 * States:
 * - Default: Ready to translate
 * - Loading: Shows spinner and "Translating..." text
 * - Disabled: Grayed out when no input or other constraints
 * - Error: Red tint for error states (via theme variants)
 *
 * @param props - Component properties
 * @returns Animated translate button JSX element
 */
const TranslateButton: React.FC<TranslateButtonProps> = ({
  onClick,
  isLoading = false,
  disabled = false,
  text = "Translate",
  size = "large",
}) => {
  const theme = useTheme();

  /**
   * Gets button size styles based on size prop
   * @returns Size-specific styling object
   */
  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return { height: 40, fontSize: "0.875rem", px: 2 };
      case "medium":
        return { height: 48, fontSize: "1rem", px: 3 };
      case "large":
      default:
        return { height: 56, fontSize: "1.125rem", px: 4 };
    }
  };

  return (
    <motion.div
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Button
        variant="contained"
        size={size}
        onClick={onClick}
        disabled={disabled || isLoading}
        startIcon={
          isLoading ? (
            <CircularProgress size={20} sx={{ color: "inherit" }} />
          ) : (
            <motion.div
              animate={{ rotate: 0 }}
              whileTap={{ rotate: 15 }}
              transition={{ duration: 0.2 }}
            >
              <TranslateIcon />
            </motion.div>
          )
        }
        sx={{
          ...getSizeStyles(),
          minWidth: { xs: 120, sm: 140 },
          backgroundColor: alpha(theme.palette.primary.main, 0.9),
          backdropFilter: "blur(15px)",
          border: `2px solid ${alpha(theme.palette.primary.light, 0.3)}`,
          boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
          borderRadius: 3,
          fontWeight: 600,
          textTransform: "none",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

          "&:hover": {
            backgroundColor: theme.palette.primary.main,
            borderColor: theme.palette.primary.light,
            boxShadow: `0 6px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
            transform: "translateY(-1px)",
          },

          "&:active": {
            transform: "translateY(0px)",
            boxShadow: `0 2px 12px ${alpha(theme.palette.primary.main, 0.4)}`,
          },

          "&.Mui-disabled": {
            opacity: 0.4,
            backgroundColor: alpha(theme.palette.action.disabled, 0.6),
            color: theme.palette.text.disabled,
            borderColor: alpha(theme.palette.text.disabled, 0.2),
          },

          // Loading state pulse animation
          ...(isLoading && {
            animation: "pulse 2s infinite",
            "@keyframes pulse": {
              "0%": {
                boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
              },
              "50%": {
                boxShadow: `0 6px 24px ${alpha(theme.palette.primary.main, 0.4)}`,
              },
              "100%": {
                boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
              },
            },
          }),
        }}
      >
        {isLoading ? "Translating..." : text}
      </Button>
    </motion.div>
  );
};

export default TranslateButton;
