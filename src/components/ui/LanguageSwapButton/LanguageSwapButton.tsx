/**
 * @fileoverview Language Swap Button Component
 *
 * Provides an animated button to swap source and target languages.
 * Features Star Trek themed styling with smooth rotation animation.
 *
 * @author vaporjawn
 * @version 1.0.0
 *
 * @example
 * ```tsx
 * import LanguageSwapButton from './ui/LanguageSwapButton';
 *
 * function LanguageSelector() {
 *   const handleSwap = () => {
 *     // Swap source and target languages
 *   };
 *
 *   return (
 *     <LanguageSwapButton
 *       onClick={handleSwap}
 *       disabled={isTranslating}
 *     />
 *   );
 * }
 * ```
 */

import { IconButton, useTheme, alpha, Tooltip } from "@mui/material";
import { SwapHoriz as SwapIcon } from "@mui/icons-material";
import { motion } from "framer-motion";

/**
 * Props for the LanguageSwapButton component
 */
interface LanguageSwapButtonProps {
  /** Callback fired when button is clicked */
  onClick: () => void;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Optional tooltip text */
  tooltip?: string;
}

/**
 * Language swap button component providing:
 * - Animated swap icon with rotation effect on click
 * - Star Trek themed glassmorphism styling
 * - Smooth hover and press animations
 * - Accessibility support with proper ARIA labels
 * - Visual feedback for disabled state
 *
 * Animation features:
 * - Icon rotates 180 degrees on each click
 * - Smooth scale transition on hover
 * - Pulse effect on press
 * - Disabled state with reduced opacity
 *
 * Styling:
 * - Semi-transparent background with blur effect
 * - Glowing border with theme colors
 * - Responsive size adjustments
 * - Smooth cubic-bezier transitions
 *
 * @param props - Component properties
 * @returns Animated swap button JSX element
 */
const LanguageSwapButton: React.FC<LanguageSwapButtonProps> = ({
  onClick,
  disabled = false,
  tooltip = "Swap languages",
}) => {
  const theme = useTheme();

  return (
    <Tooltip title={tooltip}>
      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.1 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <IconButton
          onClick={onClick}
          disabled={disabled}
          size="large"
          sx={{
            width: { xs: 48, sm: 56 },
            height: { xs: 48, sm: 56 },
            backgroundColor: alpha(theme.palette.background.paper, 0.9),
            backdropFilter: "blur(15px)",
            border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
            boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.1)}`,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              borderColor: theme.palette.primary.main,
              boxShadow: `0 6px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
              transform: "translateY(-2px)",
            },

            "&:active": {
              transform: "translateY(0px)",
              boxShadow: `0 2px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
            },

            "&.Mui-disabled": {
              opacity: 0.4,
              backgroundColor: alpha(theme.palette.background.paper, 0.6),
              borderColor: alpha(theme.palette.text.disabled, 0.2),
            },
          }}
        >
          <motion.div
            animate={{ rotate: 0 }}
            whileTap={{ rotate: 180 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <SwapIcon
              sx={{
                fontSize: { xs: 20, sm: 24 },
                color: disabled
                  ? theme.palette.text.disabled
                  : theme.palette.primary.main,
              }}
            />
          </motion.div>
        </IconButton>
      </motion.div>
    </Tooltip>
  );
};

export default LanguageSwapButton;
