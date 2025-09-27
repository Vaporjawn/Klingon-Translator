/**
 * @fileoverview Material-UI Component Overrides for Star Trek Theme
 *
 * Comprehensive component styling overrides that create the distinctive Star Trek
 * LCARS (Library Computer Access and Retrieval System) interface aesthetic.
 * Includes glassmorphism effects, gradient backgrounds, and futuristic styling.
 *
 * @author Klingon Translator Team
 * @version 1.0.0
 */

import type { Components, Theme } from "@mui/material/styles";
import type { StarTrekColorPalette } from "../../palettes/starTrekColorPalettes/starTrekColorPalettes";

/**
 * Standard border radius for buttons and interactive elements
 *
 * Provides consistent rounded corners that balance modern design
 * with the technological aesthetic of Star Trek interfaces.
 */
const BUTTON_BORDER_RADIUS = 20;

/**
 * Standard border radius for cards and panels
 *
 * Larger radius creates softer, more approachable panel appearance
 * while maintaining the futuristic design language.
 */
const CARD_BORDER_RADIUS = 16;

/**
 * Standard border radius for input fields
 *
 * Medium radius balances approachability with technical precision
 * for form inputs and interactive controls.
 */
const INPUT_BORDER_RADIUS = 12;

/**
 * Standard transition timing for smooth animations
 *
 * Cubic bezier easing provides smooth, natural animation transitions
 * that enhance the user experience without being distracting.
 */
const SMOOTH_TRANSITION = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";

/**
 * Creates glassmorphism background effect with blur and transparency
 *
 * @param baseColor - Base color for the glass effect
 * @param opacity - Opacity level (0-1) for transparency
 * @returns CSS properties for glassmorphism effect
 *
 * @example
 * ```typescript
 * const glassEffect = createGlassmorphismBackground('#1A1A2E', 0.8);
 * // Returns glassmorphism styling with blur and transparency
 * ```
 */
const createGlassmorphismBackground = (
  baseColor: string,
  opacity: number = 0.8,
) => ({
  background: `linear-gradient(135deg, ${baseColor}, ${baseColor}${Math.round(
    opacity * 255,
  )
    .toString(16)
    .padStart(2, "0")})`,
  backdropFilter: "blur(15px)",
  WebkitBackdropFilter: "blur(15px)", // Safari support
});

/**
 * Creates gradient background for buttons and interactive elements
 *
 * @param primaryColor - Primary gradient color
 * @param secondaryColor - Secondary gradient color
 * @param angle - Gradient angle in degrees (default: 45)
 * @returns CSS linear gradient string
 *
 * @example
 * ```typescript
 * const buttonGradient = createGradientBackground('#FF6B35', '#4ECDC4', 45);
 * // Returns "linear-gradient(45deg, #FF6B35, #4ECDC4)"
 * ```
 */
const createGradientBackground = (
  primaryColor: string,
  secondaryColor: string,
  angle: number = 45,
) => `linear-gradient(${angle}deg, ${primaryColor}, ${secondaryColor})`;

/**
 * Creates glow effect for focused or hovered elements
 *
 * @param color - Base color for the glow
 * @param intensity - Glow intensity (0-1, default: 0.4)
 * @returns CSS box-shadow for glow effect
 *
 * @example
 * ```typescript
 * const focusGlow = createGlowEffect('#4ECDC4', 0.6);
 * // Returns box-shadow with colored glow effect
 * ```
 */
const createGlowEffect = (color: string, intensity: number = 0.4) => {
  const alpha = Math.round(intensity * 255)
    .toString(16)
    .padStart(2, "0");
  return `0 0 10px ${color}${alpha}`;
};

/**
 * Creates Material-UI component overrides for Star Trek theme
 *
 * Applies comprehensive styling to all Material-UI components to achieve
 * the distinctive LCARS interface aesthetic with glassmorphism effects,
 * gradient backgrounds, and futuristic styling patterns.
 *
 * @param colors - Star Trek color palette for the current theme variant
 * @returns Material-UI Components configuration object
 *
 * @example
 * ```typescript
 * import { tngColorPalette } from '../palettes/starTrekColorPalettes';
 *
 * const components = createStarTrekComponents(tngColorPalette);
 * const theme = createTheme({ components });
 * // Applies TNG-style theming to all Material-UI components
 * ```
 */
export const createStarTrekComponents = (
  colors: StarTrekColorPalette,
): Components<Theme> => ({
  /**
   * Button Component Overrides
   *
   * Creates distinctive Star Trek-style buttons with gradient backgrounds,
   * smooth animations, and hover effects that simulate LCARS interface buttons.
   *
   * Features:
   * - Gradient backgrounds using theme colors
   * - Smooth hover animations with color transitions
   * - Subtle elevation changes on interaction
   * - Glow effects on hover for enhanced feedback
   * - Rounded corners for modern appearance
   */
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: BUTTON_BORDER_RADIUS,
        textTransform: "uppercase",
        fontWeight: 600,
        padding: "10px 24px",
        background: createGradientBackground(colors.primary, colors.secondary),
        transition: SMOOTH_TRANSITION,

        /**
         * Hover state with color rotation and elevation
         *
         * Rotates through theme colors and adds elevation with glow effect
         * to provide clear interactive feedback to users.
         */
        "&:hover": {
          background: createGradientBackground(colors.secondary, colors.accent),
          transform: "translateY(-1px)",
          boxShadow: `0 4px 20px ${colors.primary}40, ${createGlowEffect(colors.primary, 0.3)}`,
        },

        /**
         * Active state for pressed buttons
         *
         * Slightly depressed appearance with reduced glow effect
         * provides tactile feedback for button activation.
         */
        "&:active": {
          transform: "translateY(0)",
          boxShadow: `0 2px 10px ${colors.primary}30`,
        },

        /**
         * Disabled state styling
         *
         * Muted colors and reduced opacity indicate non-interactive state
         * while maintaining visual consistency with theme.
         */
        "&.Mui-disabled": {
          background: `${colors.surface}60`,
          color: `${colors.text}40`,
          cursor: "not-allowed",
        },
      },
    },
  },

  /**
   * Paper Component Overrides
   *
   * Creates glassmorphism panel effect for cards, dialogs, and containers.
   * Provides depth and visual hierarchy through subtle transparency and blur.
   *
   * Features:
   * - Glassmorphism background with blur effect
   * - Subtle borders using theme colors
   * - Soft drop shadows for depth
   * - Responsive hover effects for interactive papers
   */
  MuiPaper: {
    styleOverrides: {
      root: {
        ...createGlassmorphismBackground(colors.surface, 0.9),
        border: `1px solid ${colors.primary}30`,
        boxShadow: `0 8px 32px ${colors.primary}20`,
        transition: SMOOTH_TRANSITION,

        /**
         * Hover effect for interactive papers
         *
         * Enhances border visibility and shadow depth when hoverable
         * papers are interacted with (cards, clickable panels).
         */
        "&:hover": {
          border: `1px solid ${colors.primary}50`,
          boxShadow: `0 12px 40px ${colors.primary}30`,
        },
      },
    },
  },

  /**
   * TextField Component Overrides
   *
   * Styles input fields to match LCARS console interface aesthetic
   * with glassmorphism backgrounds and color-coded focus states.
   *
   * Features:
   * - Semi-transparent backgrounds for depth
   * - Color-coded borders that respond to interaction states
   * - Glow effects on focus for clear visual feedback
   * - Smooth transitions between states
   */
  MuiTextField: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": {
          background: `${colors.surface}80`,
          borderRadius: INPUT_BORDER_RADIUS,
          transition: SMOOTH_TRANSITION,

          /**
           * Default border state
           *
           * Subtle border using primary color with reduced opacity
           * provides definition without overwhelming the interface.
           */
          "& fieldset": {
            borderColor: `${colors.primary}60`,
            transition: SMOOTH_TRANSITION,
          },

          /**
           * Hover border state
           *
           * Increased opacity on hover indicates interactive capability
           * and prepares user for focus interaction.
           */
          "&:hover fieldset": {
            borderColor: colors.primary,
          },

          /**
           * Focused border state with glow effect
           *
           * Uses secondary color for focus to create clear hierarchy
           * and adds glow effect for enhanced visual feedback.
           */
          "&.Mui-focused fieldset": {
            borderColor: colors.secondary,
            boxShadow: createGlowEffect(colors.secondary, 0.4),
          },

          /**
           * Error state styling
           *
           * Uses accent color (typically red) for error indication
           * with appropriate glow effect for attention.
           */
          "&.Mui-error fieldset": {
            borderColor: colors.accent,
            boxShadow: createGlowEffect(colors.accent, 0.3),
          },
        },

        /**
         * Input text styling
         *
         * Ensures text color matches theme and maintains readability
         * across all input states and background combinations.
         */
        "& .MuiInputBase-input": {
          color: colors.text,
        },

        /**
         * Label styling for consistency
         *
         * Matches label colors to theme palette and provides
         * smooth color transitions during focus states.
         */
        "& .MuiInputLabel-root": {
          color: `${colors.text}80`,
          "&.Mui-focused": {
            color: colors.secondary,
          },
        },
      },
    },
  },

  /**
   * Card Component Overrides
   *
   * Enhanced panel styling with glassmorphism effects and interactive states.
   * Creates sophisticated container elements for content organization.
   *
   * Features:
   * - Enhanced glassmorphism with stronger blur effects
   * - Interactive hover states with border and shadow changes
   * - Larger border radius for softer appearance
   * - Smooth animations for all state transitions
   */
  MuiCard: {
    styleOverrides: {
      root: {
        ...createGlassmorphismBackground(colors.surface, 0.95),
        border: `1px solid ${colors.primary}40`,
        borderRadius: CARD_BORDER_RADIUS,
        transition: SMOOTH_TRANSITION,

        /**
         * Enhanced hover state for cards
         *
         * Stronger visual feedback for interactive cards with
         * enhanced border visibility and deeper shadows.
         */
        "&:hover": {
          border: `1px solid ${colors.primary}80`,
          boxShadow: `0 12px 40px ${colors.primary}25`,
          transform: "translateY(-2px)",
        },

        /**
         * Clickable card styling
         *
         * Adds cursor pointer and additional interactive feedback
         * for cards that function as buttons or navigation elements.
         */
        "&.MuiCard-clickable": {
          cursor: "pointer",
          "&:active": {
            transform: "translateY(0)",
            boxShadow: `0 6px 20px ${colors.primary}30`,
          },
        },
      },
    },
  },

  /**
   * AppBar Component Overrides
   *
   * Creates sophisticated application header with gradient background
   * and glassmorphism effects suitable for Star Trek interface aesthetic.
   *
   * Features:
   * - Horizontal gradient from background to surface colors
   * - Strong blur effect for content separation
   * - Subtle bottom border for definition
   * - Maintains transparency while ensuring readability
   */
  MuiAppBar: {
    styleOverrides: {
      root: {
        background: `linear-gradient(90deg, ${colors.background}, ${colors.surface})`,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)", // Safari support
        borderBottom: `1px solid ${colors.primary}30`,
        boxShadow: `0 2px 20px ${colors.background}60`,
      },
    },
  },

  /**
   * Dialog Component Overrides
   *
   * Enhanced modal styling with strong glassmorphism effects
   * and appropriate backdrop styling for modal interactions.
   *
   * Features:
   * - Enhanced glassmorphism for modal prominence
   * - Larger border radius for softer appearance
   * - Stronger borders and shadows for definition
   * - Backdrop blur for content separation
   */
  MuiDialog: {
    styleOverrides: {
      paper: {
        ...createGlassmorphismBackground(colors.surface, 0.95),
        border: `2px solid ${colors.primary}60`,
        borderRadius: CARD_BORDER_RADIUS,
        boxShadow: `0 20px 60px ${colors.background}80`,
        backdropFilter: "blur(25px)",
        WebkitBackdropFilter: "blur(25px)", // Safari support
      },
    },
  },

  /**
   * Backdrop Component Overrides
   *
   * Creates sophisticated backdrop effects for modals and overlays
   * with appropriate blur and opacity for content separation.
   */
  MuiBackdrop: {
    styleOverrides: {
      root: {
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)", // Safari support
        backgroundColor: `${colors.background}70`,
      },
    },
  },
});

/**
 * Component override utilities for custom implementations
 */
export const componentUtils = {
  /**
   * Creates custom button variant with specific colors
   *
   * @param primaryColor - Primary button color
   * @param secondaryColor - Secondary/hover color
   * @param textColor - Text color for contrast
   * @returns Button style overrides
   *
   * @example
   * ```typescript
   * const dangerButton = componentUtils.createCustomButton('#F44336', '#D32F2F', '#FFFFFF');
   * // Creates red danger button with appropriate hover states
   * ```
   */
  createCustomButton: (
    primaryColor: string,
    secondaryColor: string,
    textColor: string,
  ) => ({
    background: createGradientBackground(primaryColor, secondaryColor),
    color: textColor,
    "&:hover": {
      background: createGradientBackground(secondaryColor, primaryColor),
      boxShadow: createGlowEffect(primaryColor, 0.4),
    },
  }),

  /**
   * Creates custom card styling with specific background
   *
   * @param backgroundColor - Card background color
   * @param borderColor - Card border color
   * @param glowColor - Glow effect color for hover
   * @returns Card style overrides
   *
   * @example
   * ```typescript
   * const alertCard = componentUtils.createCustomCard('#1A1A2E', '#FF6B35', '#FF6B35');
   * // Creates alert-style card with orange accents
   * ```
   */
  createCustomCard: (
    backgroundColor: string,
    borderColor: string,
    glowColor: string,
  ) => ({
    ...createGlassmorphismBackground(backgroundColor, 0.9),
    border: `1px solid ${borderColor}40`,
    "&:hover": {
      border: `1px solid ${borderColor}80`,
      boxShadow: `0 12px 40px ${glowColor}25`,
    },
  }),
};
