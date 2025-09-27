/**
 * @fileoverview Translation Panels Component
 *
 * Contains both input and output translation panels in a responsive grid layout.
 * Features glassmorphism design and animated loading states.
 *
 * @author vaporjawn
 * @version 1.0.0
 *
 * @example
 * Basic usage:
 * <TranslationPanels
 *   sourceLanguage={sourceLanguage}
 *   targetLanguage={targetLanguage}
 *   inputText={inputText}
 *   outputText={outputText}
 *   onInputChange={setInputText}
 *   isTranslating={isTranslating}
 * />
 */

import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  useTheme,
  alpha,
  CircularProgress,
} from "@mui/material";
import {
  VolumeUp as VolumeIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation as useI18n } from "react-i18next";
import type { LanguageOption } from "../../../types/index/index";

/**
 * Props for the TranslationPanels component
 */
interface TranslationPanelsProps {
  /** Source language information */
  sourceLanguage: LanguageOption;
  /** Target language information */
  targetLanguage: LanguageOption;
  /** Current input text */
  inputText: string;
  /** Current output text */
  outputText: string;
  /** Callback for input text changes */
  onInputChange: (text: string) => void;
  /** Whether translation is in progress */
  isTranslating?: boolean;
  /** Whether speech synthesis is supported */
  isSpeechSupported?: boolean;
  /** Whether audio is currently playing */
  isPlaying?: boolean;
  /** Callback for playing source audio */
  onPlaySourceAudio?: () => void;
  /** Callback for playing target audio */
  onPlayTargetAudio?: () => void;
  /** Callback for clearing input */
  onClearInput?: () => void;
  /** Animation delay */
  animationDelay?: number;
}

/**
 * Translation panels component providing:
 * - Input and output text areas in responsive grid layout
 * - Audio playback controls for supported languages
 * - Clear input functionality
 * - Loading states with animated indicators
 * - Star Trek themed glassmorphism styling
 * - Smooth animations and transitions
 *
 * Layout features:
 * - Single column on mobile, two columns on desktop
 * - Responsive sizing and spacing
 * - Consistent panel styling
 * - Proper text area sizing
 * - Centered alignment
 *
 * Interactive features:
 * - Text input with placeholder
 * - Audio playback buttons
 * - Clear input button
 * - Loading overlay during translation
 * - Smooth hover effects
 *
 * @param props - Component properties
 * @returns Translation panels JSX element
 */
const TranslationPanels: React.FC<TranslationPanelsProps> = ({
  sourceLanguage,
  targetLanguage,
  inputText,
  outputText,
  onInputChange,
  isTranslating = false,
  isSpeechSupported = false,
  isPlaying = false,
  onPlaySourceAudio,
  onPlayTargetAudio,
  onClearInput,
  animationDelay = 0.5,
}) => {
  const theme = useTheme();
  const { t } = useI18n();

  /**
   * Common styles for text areas
   */
  const textAreaStyles = {
    width: "100%",
    minHeight: { xs: "180px", md: "220px" },
    "& .MuiOutlinedInput-root": {
      minHeight: { xs: "180px", md: "220px" },
      alignItems: "flex-start",
      padding: theme.spacing(2.5),
      fontSize: { xs: "1rem", md: "1.1rem" },
      lineHeight: 1.7,
      borderRadius: 2,
      borderColor: alpha(theme.palette.primary.main, 0.2),
      backgroundColor: alpha(theme.palette.background.paper, 0.7),
      backdropFilter: "blur(10px)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      "&:hover": {
        borderColor: alpha(theme.palette.primary.main, 0.5),
        backgroundColor: alpha(theme.palette.background.paper, 0.9),
      },
      "&.Mui-focused": {
        borderColor: theme.palette.primary.main,
        borderWidth: "2px",
        boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.25)}`,
        backgroundColor: alpha(theme.palette.background.paper, 0.95),
      },
    },
    "& .MuiOutlinedInput-input": {
      minHeight: { xs: "140px !important", md: "180px !important" },
      padding: 0,
      "&::placeholder": {
        color: alpha(theme.palette.text.secondary, 0.6),
        opacity: 1,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: animationDelay }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
          gap: { xs: 3, md: 4 },
          mb: { xs: 3, md: 4 },
          width: "100%",
          maxWidth: "1400px",
          justifyItems: "center",
        }}
      >
        {/* Input Panel */}
        <Paper
          elevation={8}
          sx={{
            p: 3,
            width: { xs: "100%", sm: "90%", md: "85%", lg: "auto" },
            maxWidth: { xs: "none", lg: "600px" },
            minWidth: { lg: "500px" },
            background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.default, 0.9)})`,
            backdropFilter: "blur(10px)",
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              borderRadius: "4px 4px 0 0",
            },
          }}
        >
          {/* Input Panel Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <span>{sourceLanguage.flag}</span>
              {sourceLanguage.name}
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              {/* Audio Play Button */}
              {isSpeechSupported && inputText.trim() && onPlaySourceAudio && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconButton
                    size="small"
                    onClick={onPlaySourceAudio}
                    disabled={isPlaying}
                    sx={{
                      color: theme.palette.primary.main,
                      "&:hover": {
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                      },
                    }}
                  >
                    <VolumeIcon fontSize="small" />
                  </IconButton>
                </motion.div>
              )}

              {/* Clear Input Button */}
              {inputText.trim() && onClearInput && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconButton
                    size="small"
                    onClick={onClearInput}
                    sx={{
                      color: theme.palette.text.secondary,
                      "&:hover": {
                        bgcolor: alpha(theme.palette.error.main, 0.1),
                        color: theme.palette.error.main,
                      },
                    }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </motion.div>
              )}
            </Box>
          </Box>

          {/* Input Text Area */}
          <TextField
            multiline
            placeholder={t("input_placeholder")}
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            sx={textAreaStyles}
          />
        </Paper>

        {/* Output Panel */}
        <Paper
          elevation={8}
          sx={{
            p: 3,
            width: { xs: "100%", sm: "90%", md: "85%", lg: "auto" },
            maxWidth: { xs: "none", lg: "600px" },
            minWidth: { lg: "500px" },
            background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.default, 0.9)})`,
            backdropFilter: "blur(10px)",
            border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
              borderRadius: "4px 4px 0 0",
            },
          }}
        >
          {/* Output Panel Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <span>{targetLanguage.flag}</span>
              {targetLanguage.name}
            </Typography>

            {/* Audio Play Button for Output */}
            {isSpeechSupported && outputText.trim() && onPlayTargetAudio && (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <IconButton
                  size="small"
                  onClick={onPlayTargetAudio}
                  disabled={isPlaying}
                  sx={{
                    color: theme.palette.secondary.main,
                    "&:hover": {
                      bgcolor: alpha(theme.palette.secondary.main, 0.1),
                    },
                  }}
                >
                  <VolumeIcon fontSize="small" />
                </IconButton>
              </motion.div>
            )}
          </Box>

          {/* Output Text Area Container */}
          <Box sx={{ position: "relative", minHeight: "200px" }}>
            <TextField
              multiline
              placeholder={t("output_placeholder")}
              value={outputText}
              InputProps={{ readOnly: true }}
              sx={{
                ...textAreaStyles,
                "& .MuiOutlinedInput-root": {
                  ...textAreaStyles["& .MuiOutlinedInput-root"],
                  bgcolor: alpha(theme.palette.background.default, 0.3),
                },
              }}
            />

            {/* Loading Overlay */}
            <AnimatePresence>
              {isTranslating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 16,
                    zIndex: 10,
                  }}
                >
                  <CircularProgress
                    size={40}
                    sx={{
                      color: theme.palette.primary.main,
                      "& .MuiCircularProgress-circle": {
                        filter: `drop-shadow(0 0 6px ${alpha(theme.palette.primary.main, 0.6)})`,
                      },
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontStyle: "italic",
                    }}
                  >
                    {t("translation.translating")}
                  </Typography>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Paper>
      </Box>
    </motion.div>
  );
};

export default TranslationPanels;
