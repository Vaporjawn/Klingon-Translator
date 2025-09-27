/**
 * @fileoverview Translator Footer Component
 *
 * Displays application footer with Star Trek branding and additional information.
 * Features glassmorphism styling and responsive design.
 *
 * @author vaporjawn
 * @version 1.0.0
 *
 * @example
 * Basic usage:
 * <TranslatorFooter showVersion={true} showCredits={true} />
 */

import {
  Box,
  Typography,
  Link,
  Divider,
  Stack,
  useTheme,
  alpha,
  Chip,
} from "@mui/material";
import {
  GitHub as GitHubIcon,
  Language as LanguageIcon,
  Favorite as HeartIcon,
} from "@mui/icons-material";

/**
 * Props for the TranslatorFooter component
 */
interface TranslatorFooterProps {
  /** Whether to show version information */
  showVersion?: boolean;
  /** Whether to show credits and links */
  showCredits?: boolean;
  /** Whether to show Star Trek theme attribution */
  showThemeInfo?: boolean;
  /** Custom footer text */
  customText?: string;
}

/**
 * Translator footer component providing:
 * - Application information and branding
 * - Star Trek theme attribution
 * - Version and credits display
 * - Links to external resources
 * - Glassmorphism styling consistent with app theme
 * - Responsive layout for mobile and desktop
 *
 * Design features:
 * - Semi-transparent background with blur effect
 * - Star Trek themed color scheme
 * - Smooth hover animations for interactive elements
 * - Proper spacing and typography hierarchy
 * - Icon integration for visual appeal
 *
 * Content sections:
 * - Version information (optional)
 * - Credits and attribution (optional)
 * - Star Trek theme info (optional)
 * - External links (GitHub, etc.)
 * - Copyright and legal information
 *
 * @param props - Component properties
 * @returns Footer JSX element
 */
const TranslatorFooter: React.FC<TranslatorFooterProps> = ({
  showVersion = true,
  showCredits = true,
  showThemeInfo = true,
  customText,
}) => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        p: { xs: 2, sm: 3 },
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: "blur(15px)",
        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
        borderRadius: 2,
        boxShadow: `0 -2px 16px ${alpha(theme.palette.primary.main, 0.05)}`,
      }}
    >
      <Stack
        spacing={2}
        divider={<Divider sx={{ opacity: 0.3 }} />}
        alignItems="center"
      >
        {/* Main Footer Content */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          {/* App Info Section */}
          <Stack direction="row" spacing={1} alignItems="center">
            <LanguageIcon
              sx={{
                color: theme.palette.primary.main,
                fontSize: { xs: 20, sm: 24 },
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
                fontSize: { xs: "1rem", sm: "1.25rem" },
              }}
            >
              Klingon Translator
            </Typography>

            {showVersion && (
              <Chip
                label="v1.0.0"
                size="small"
                sx={{
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                }}
              />
            )}
          </Stack>

          {/* External Links */}
          {showCredits && (
            <Stack direction="row" spacing={2} alignItems="center">
              <Link
                href="https://github.com/vaporjawn/klingon-translator"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: theme.palette.text.secondary,
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: theme.palette.primary.main,
                    transform: "translateY(-1px)",
                  },
                }}
              >
                <GitHubIcon fontSize="small" />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  GitHub
                </Typography>
              </Link>
            </Stack>
          )}
        </Stack>

        {/* Star Trek Theme Attribution */}
        {showThemeInfo && (
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontStyle: "italic",
                mb: 2,
              }}
            >
              Inspired by the Star Trek universe and Klingon culture
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="center"
              sx={{ mb: 2 }}
            >
              <Typography variant="caption" color="text.secondary">
                Made with
              </Typography>
              <HeartIcon
                sx={{
                  fontSize: 16,
                  color: theme.palette.error.main,
                  animation: "pulse 2s infinite",
                }}
              />
              <Typography variant="caption" color="text.secondary">
                for Star Trek fans
              </Typography>
            </Stack>

            {/* Technologies Used */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems="center"
              justifyContent="center"
              sx={{ mb: 1 }}
            >
              <Typography variant="caption" color="text.secondary">
                Built with:
              </Typography>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                flexWrap="wrap"
                justifyContent="center"
              >
                <Link
                  href="https://react.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "#61DAFB",
                    textDecoration: "none",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "#21A1C4",
                      textShadow: "0 0 8px rgba(97, 218, 251, 0.4)",
                    },
                  }}
                >
                  React
                </Link>
                <Typography variant="caption" color="text.disabled">
                  •
                </Typography>
                <Link
                  href="https://www.typescriptlang.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "#3178C6",
                    textDecoration: "none",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "#1E5A8A",
                      textShadow: "0 0 8px rgba(49, 120, 198, 0.4)",
                    },
                  }}
                >
                  TypeScript
                </Link>
                <Typography variant="caption" color="text.disabled">
                  •
                </Typography>
                <Link
                  href="https://mui.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "#0081CB",
                    textDecoration: "none",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "#005A9F",
                      textShadow: "0 0 8px rgba(0, 129, 203, 0.4)",
                    },
                  }}
                >
                  Material-UI
                </Link>
              </Stack>
            </Stack>
          </Box>
        )}

        {/* Custom Text or Copyright */}
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.disabled,
              fontSize: "0.75rem",
            }}
          >
            {customText ||
              `© ${new Date().getFullYear()} Klingon Translator. Built for the Star Trek community.`}
          </Typography>
        </Box>
      </Stack>

      {/* Pulse animation for heart icon */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </Box>
  );
};

export default TranslatorFooter;
