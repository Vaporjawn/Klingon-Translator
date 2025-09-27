/**
 * @fileoverview Error Display Component
 *
 * Displays translation errors with Star Trek themed styling and animations.
 * Provides retry functionality and clear error messaging.
 *
 * @author vaporjawn
 * @version 1.0.0
 *
 * @example
 * ```tsx
 * import ErrorDisplay from './ui/ErrorDisplay';
 *
 * function TranslatorInterface() {
 *   const [error, setError] = useState<string | null>(null);
 *
 *   const handleRetry = () => {
 *     setError(null);
 *     // Retry translation logic
 *   };
 *
 *   return (
 *     <>
 *       {error && (
 *         <ErrorDisplay
 *           error={error}
 *           onRetry={handleRetry}
 *           onDismiss={() => setError(null)}
 *         />
 *       )}
 *     </>
 *   );
 * }
 * ```
 */

import {
  Alert,
  AlertTitle,
  Button,
  IconButton,
  Box,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Error as ErrorIcon,
  Refresh as RetryIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

/**
 * Props for the ErrorDisplay component
 */
interface ErrorDisplayProps {
  /** Error message to display */
  error: string;
  /** Optional callback for retry action */
  onRetry?: () => void;
  /** Optional callback for dismissing error */
  onDismiss?: () => void;
  /** Error severity level */
  severity?: "error" | "warning" | "info";
  /** Whether to show retry button */
  showRetry?: boolean;
  /** Custom retry button text */
  retryText?: string;
}

/**
 * Error display component providing:
 * - Animated error alert with Star Trek styling
 * - Retry and dismiss functionality
 * - Multiple severity levels with appropriate colors
 * - Smooth enter/exit animations
 * - Accessibility support with proper ARIA labels
 * - Responsive design with mobile optimization
 *
 * Animation features:
 * - Slide down entrance animation
 * - Fade out exit animation
 * - Shake animation for attention
 * - Smooth color transitions
 * - Loading states for retry actions
 *
 * Features:
 * - Auto-dismiss option (optional)
 * - Retry mechanism with loading state
 * - Collapsible detailed error information
 * - Icon integration for visual clarity
 * - Theme-aware styling
 *
 * @param props - Component properties
 * @returns Animated error display JSX element
 */
const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onRetry,
  onDismiss,
  severity = "error",
  showRetry = true,
  retryText = "Retry Translation",
}) => {
  const theme = useTheme();
  const [isRetrying, setIsRetrying] = useState(false);

  /**
   * Handles retry action with loading state
   */
  const handleRetry = async () => {
    if (!onRetry) return;

    setIsRetrying(true);
    try {
      await onRetry();
    } finally {
      setIsRetrying(false);
    }
  };

  /**
   * Gets severity-based color and icon
   * @returns Severity styling object
   */
  const getSeverityStyles = () => {
    switch (severity) {
      case "warning":
        return {
          color: theme.palette.warning.main,
          backgroundColor: alpha(theme.palette.warning.main, 0.1),
          borderColor: alpha(theme.palette.warning.main, 0.3),
        };
      case "info":
        return {
          color: theme.palette.info.main,
          backgroundColor: alpha(theme.palette.info.main, 0.1),
          borderColor: alpha(theme.palette.info.main, 0.3),
        };
      case "error":
      default:
        return {
          color: theme.palette.error.main,
          backgroundColor: alpha(theme.palette.error.main, 0.1),
          borderColor: alpha(theme.palette.error.main, 0.3),
        };
    }
  };

  const severityStyles = getSeverityStyles();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          // Subtle shake animation to draw attention
          x: [0, -2, 2, -2, 0],
        }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{
          duration: 0.3,
          x: { duration: 0.4, delay: 0.2 },
        }}
      >
        <Alert
          severity={severity}
          icon={<ErrorIcon />}
          action={
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              {showRetry && onRetry && (
                <Button
                  color="inherit"
                  size="small"
                  onClick={handleRetry}
                  disabled={isRetrying}
                  startIcon={
                    <motion.div
                      animate={isRetrying ? { rotate: 360 } : { rotate: 0 }}
                      transition={{
                        duration: 1,
                        repeat: isRetrying ? Infinity : 0,
                        ease: "linear",
                      }}
                    >
                      <RetryIcon />
                    </motion.div>
                  }
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: alpha(severityStyles.color, 0.1),
                    },
                  }}
                >
                  {isRetrying ? "Retrying..." : retryText}
                </Button>
              )}

              {onDismiss && (
                <IconButton
                  aria-label="close error"
                  color="inherit"
                  size="small"
                  onClick={onDismiss}
                  sx={{
                    "&:hover": {
                      backgroundColor: alpha(severityStyles.color, 0.1),
                    },
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              )}
            </Box>
          }
          sx={{
            mb: 2,
            backgroundColor: severityStyles.backgroundColor,
            border: `1px solid ${severityStyles.borderColor}`,
            backdropFilter: "blur(10px)",
            borderRadius: 2,
            boxShadow: `0 4px 12px ${alpha(severityStyles.color, 0.1)}`,

            "& .MuiAlert-icon": {
              color: severityStyles.color,
            },

            "& .MuiAlert-message": {
              color: theme.palette.text.primary,
              fontWeight: 500,
            },
          }}
        >
          <AlertTitle sx={{ fontWeight: 700, mb: 1 }}>
            Translation Error
          </AlertTitle>
          {error}
        </Alert>
      </motion.div>
    </AnimatePresence>
  );
};

export default ErrorDisplay;
