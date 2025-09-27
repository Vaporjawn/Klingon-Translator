/**
 * @fileoverview Translator Header Component
 *
 * Displays the main application header with title, subtitle and branding.
 * Features animated gradients and Star Trek themed typography.
 *
 * @author vaporjawn
 * @version 1.0.0
 *
 * @example
 * Basic usage:
 * <TranslatorHeader />
 */

import { Box, Typography, Link, useTheme, alpha } from "@mui/material";
import { motion } from "framer-motion";
import { useTranslation as useI18n } from "react-i18next";

/**
 * Props for the TranslatorHeader component
 */
interface TranslatorHeaderProps {
  /** Whether to show the subtitle */
  showSubtitle?: boolean;
  /** Whether to show the credits */
  showCredits?: boolean;
  /** Custom animation delay */
  animationDelay?: number;
}

/**
 * Translator header component providing:
 * - Main application title with gradient text effect
 * - Subtitle with Star Trek theming
 * - Credit links to Star Trek and author
 * - Smooth entry animations with customizable timing
 * - Responsive typography that scales with screen size
 * - Accessibility support with semantic headings
 *
 * Typography features:
 * - Gradient text with primary/secondary colors
 * - Animated underline decoration
 * - Responsive font sizing across breakpoints
 * - Letter spacing optimization for display fonts
 * - Text shadow effects for depth
 *
 * Animation features:
 * - Fade up entrance animation
 * - Configurable animation timing and delays
 * - Smooth easing curves matching Star Trek aesthetics
 * - Hover effects on interactive elements
 *
 * @param props - Component properties
 * @returns Header JSX element with animations
 */
const TranslatorHeader: React.FC<TranslatorHeaderProps> = ({
  showSubtitle = true,
  showCredits = true,
  animationDelay = 0,
}) => {
  const theme = useTheme();
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
        delay: animationDelay,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          mb: { xs: 2, md: 3 },
          position: "relative",
          py: { xs: 1, md: 2 },
          mt: { xs: 30, md: 35 },
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Main Title */}
        <Typography
          variant="h2"
          component="h1"
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 50%, ${theme.palette.primary.light} 100%)`,
            backgroundSize: "200% 200%",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontWeight: "bold",
            fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.2rem" },
            textShadow: `0 0 40px ${alpha(theme.palette.primary.main, 0.4)}`,
            mb: 1,
            letterSpacing: "-0.01em",
            position: "relative",
            animation: "gradientShift 4s ease-in-out infinite alternate",

            // Animated underline decoration
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -8,
              left: "50%",
              transform: "translateX(-50%)",
              width: "120px",
              height: "2px",
              background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
              borderRadius: "1px",
            },

            "@keyframes gradientShift": {
              "0%": {
                backgroundPosition: "0% 50%",
              },
              "100%": {
                backgroundPosition: "100% 50%",
              },
            },
          }}
        >
          🖖 {t("app_title")}
        </Typography>

        {/* Subtitle */}
        {showSubtitle && (
          <Typography
            variant="h5"
            sx={{
              color: alpha(theme.palette.text.primary, 0.85),
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
              mt: 3,
            }}
          >
            {t("subtitle")}
          </Typography>
        )}

        {/* Credits Section */}
        {showCredits && (
          <>
            {/* Star Trek Attribution */}
            <Typography
              variant="body1"
              sx={{
                color: alpha(theme.palette.text.secondary, 0.7),
                mt: 1,
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              {t("footer.powered_by")}{" "}
              <Link
                href="https://www.startrek.com/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: alpha(theme.palette.primary.main, 0.9),
                  textDecoration: "none",
                  fontWeight: 500,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: theme.palette.primary.main,
                    textDecoration: "underline",
                    textShadow: `0 0 8px ${alpha(theme.palette.primary.main, 0.4)}`,
                  },
                }}
              >
                Star Trek
              </Link>{" "}
              technology
            </Typography>

            {/* Author Attribution */}
            <Typography
              variant="body2"
              sx={{
                color: alpha(theme.palette.text.secondary, 0.6),
                mt: 2,
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
                fontStyle: "italic",
              }}
            >
              {t("footer.made_by")}{" "}
              <Link
                href="https://github.com/vaporjawn"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: alpha(theme.palette.primary.main, 0.8),
                  textDecoration: "none",
                  fontWeight: 500,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: theme.palette.primary.main,
                    textDecoration: "underline",
                    transform: "translateY(-1px)",
                    textShadow: `0 0 6px ${alpha(theme.palette.primary.main, 0.3)}`,
                  },
                }}
              >
                vaporjawn
              </Link>
            </Typography>
          </>
        )}
      </Box>
    </motion.div>
  );
};

export default TranslatorHeader;
