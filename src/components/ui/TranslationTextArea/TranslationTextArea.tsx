/**
 * @fileoverview Translation Text Area Component
 *
 * Provides a styled text input/output area for translation content.
 * Supports both input and read-only output modes with audio playback.
 *
 * @author vaporjawn
 * @version 1.0.0
 *
 * @example
 * ```tsx
 * import TranslationTextArea from './ui/TranslationTextArea';
 *
 * function TranslationPanel() {
 *   const [text, setText] = useState('');
 *
 *   return (
 *     <TranslationTextArea
 *       value={text}
 *       onChange={setText}
 *       placeholder="Enter text to translate..."
 *       onPlayAudio={() => speak(text)}
 *       onClear={() => setText('')}
 *       isInput={true}
 *     />
 *   );
 * }
 * ```
 */

import {
  TextField,
  IconButton,
  Box,
  useTheme,
  alpha,
  Tooltip,
} from "@mui/material";
import {
  VolumeUp as VolumeIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";

/**
 * Props for the TranslationTextArea component
 */
interface TranslationTextAreaProps {
  /** Current text value */
  value: string;
  /** Callback fired when text changes (only for input mode) */
  onChange?: (text: string) => void;
  /** Placeholder text when empty */
  placeholder: string;
  /** Callback fired when audio button is clicked */
  onPlayAudio?: () => void;
  /** Callback fired when clear button is clicked */
  onClear?: () => void;
  /** Whether this is an input field (true) or output display (false) */
  isInput: boolean;
  /** Whether audio playback is currently active */
  isPlaying?: boolean;
  /** Whether audio functionality is supported */
  audioSupported?: boolean;
  /** Optional error state */
  error?: boolean;
  /** Optional helper text */
  helperText?: string;
}

/**
 * Translation text area component providing:
 * - Multi-line text input/display with glassmorphism styling
 * - Audio playback button with visual feedback
 * - Clear button for input fields
 * - Responsive height adjustments
 * - Star Trek themed styling with smooth animations
 * - Accessibility support with proper ARIA labels
 *
 * Features:
 * - Auto-resizing text area (4-8 rows)
 * - Smooth hover and focus transitions
 * - Floating action buttons for controls
 * - Visual feedback for audio playback state
 * - Conditional controls based on input/output mode
 *
 * @param props - Component properties
 * @returns Styled text area JSX element
 */
const TranslationTextArea: React.FC<TranslationTextAreaProps> = ({
  value,
  onChange,
  placeholder,
  onPlayAudio,
  onClear,
  isInput,
  isPlaying = false,
  audioSupported = true,
  error = false,
  helperText,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <TextField
        multiline
        rows={4}
        maxRows={8}
        fullWidth
        value={value}
        onChange={isInput ? (e) => onChange?.(e.target.value) : undefined}
        placeholder={placeholder}
        InputProps={{
          readOnly: !isInput,
          sx: {
            fontSize: "1.1rem",
            lineHeight: 1.6,
            padding: 2,
            minHeight: 120,
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: "blur(10px)",
            border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            borderRadius: 2,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              backgroundColor: alpha(theme.palette.background.paper, 0.9),
              borderColor: alpha(theme.palette.primary.main, 0.4),
              boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.1)}`,
            },
            "&.Mui-focused": {
              backgroundColor: theme.palette.background.paper,
              borderColor: theme.palette.primary.main,
              boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
            },
            "& .MuiInputBase-input": {
              color: theme.palette.text.primary,
              "&::placeholder": {
                color: alpha(theme.palette.text.secondary, 0.7),
                opacity: 1,
              },
            },
          },
        }}
        error={error}
        helperText={helperText}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
      />

      {/* Control buttons */}
      {(value.trim() || isInput) && (
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            display: "flex",
            gap: 1,
          }}
        >
          {/* Audio playback button */}
          {value.trim() && audioSupported && (
            <Tooltip title="Play audio">
              <IconButton
                onClick={onPlayAudio}
                disabled={isPlaying}
                size="small"
                sx={{
                  backgroundColor: alpha(theme.palette.background.paper, 0.9),
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                  color: isPlaying
                    ? theme.palette.secondary.main
                    : theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    borderColor: theme.palette.primary.main,
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <VolumeIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          {/* Clear button for input fields */}
          {isInput && value.trim() && (
            <Tooltip title="Clear text">
              <IconButton
                onClick={onClear}
                size="small"
                sx={{
                  backgroundColor: alpha(theme.palette.background.paper, 0.9),
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${alpha(theme.palette.error.main, 0.3)}`,
                  color: theme.palette.error.main,
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.error.main, 0.1),
                    borderColor: theme.palette.error.main,
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      )}
    </Box>
  );
};

export default TranslationTextArea;
