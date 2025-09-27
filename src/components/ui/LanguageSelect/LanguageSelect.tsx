/**
 * @fileoverview Language Selector Component
 *
 * Provides a styled Material-UI Select component for choosing translation languages.
 * Features Star Trek themed styling with glassmorphism effects.
 *
 * @author vaporjawn
 * @version 1.0.0
 *
 * @example
 * ```tsx
 * import LanguageSelect from './ui/LanguageSelect';
 *
 * function TranslationPanel() {
 *   const [language, setLanguage] = useState(languageOptions[0]);
 *
 *   return (
 *     <LanguageSelect
 *       value={language}
 *       onChange={setLanguage}
 *       label="From"
 *       options={languageOptions}
 *     />
 *   );
 * }
 * ```
 */

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  alpha,
} from "@mui/material";
import type { LanguageOption } from "../../../types/index/index";

/**
 * Props for the LanguageSelect component
 */
interface LanguageSelectProps {
  /** Currently selected language option */
  value: LanguageOption;
  /** Callback fired when selection changes */
  onChange: (language: LanguageOption) => void;
  /** Label displayed above the select input */
  label: string;
  /** Available language options */
  options: LanguageOption[];
  /** Optional additional styling */
  sx?: object;
}

/**
 * Language selection component with:
 * - Star Trek themed glassmorphism styling
 * - Smooth hover and focus transitions
 * - Responsive width adjustments
 * - Accessibility-compliant labeling
 * - Custom dropdown animation effects
 *
 * Styling features:
 * - Semi-transparent background with blur effect
 * - Glowing border on hover/focus states
 * - Smooth cubic-bezier transitions
 * - Theme-aware color integration
 * - Mobile-responsive sizing
 *
 * @param props - Component properties
 * @returns Styled language selector JSX element
 */
const LanguageSelect: React.FC<LanguageSelectProps> = ({
  value,
  onChange,
  label,
  options,
  sx = {},
}) => {
  const theme = useTheme();

  return (
    <FormControl
      size="medium"
      sx={{
        minWidth: { xs: 140, sm: 160, md: 180 },
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          borderColor: alpha(theme.palette.primary.main, 0.3),
          backgroundColor: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: "blur(10px)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            borderColor: alpha(theme.palette.primary.main, 0.7),
            backgroundColor: alpha(theme.palette.background.paper, 0.9),
            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
          },
          "&.Mui-focused": {
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.background.paper,
            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
          },
        },
        ...sx,
      }}
    >
      <InputLabel
        sx={{
          color: theme.palette.text.primary,
          fontWeight: 500,
          "&.Mui-focused": {
            color: theme.palette.primary.main,
          },
        }}
      >
        {label}
      </InputLabel>
      <Select
        value={value.code}
        onChange={(e) => {
          const selectedOption = options.find(
            (opt) => opt.code === e.target.value,
          );
          if (selectedOption) {
            onChange(selectedOption);
          }
        }}
        label={label}
        sx={{
          "& .MuiSelect-select": {
            padding: "12px 14px",
            fontWeight: 500,
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.code}
            value={option.code}
            sx={{
              fontSize: "0.95rem",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              },
              "&.Mui-selected": {
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.3),
                },
              },
            }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelect;
