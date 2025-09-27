/**
 * @fileoverview Main Star Trek Theme Factory
 *
 * Central theme creation factory that combines palettes, typography, and component
 * overrides to create comprehensive Star Trek-inspired Material-UI themes.
 * Supports all major Star Trek series variants with consistent API.
 *
 * @author Klingon Translator Team
 * @version 1.0.0
 */

import { createTheme, type Theme } from "@mui/material/styles";
import {
  starTrekColorPalettes,
  type StarTrekVariant,
  type StarTrekColorPalette,
} from "../palettes/starTrekColorPalettes/starTrekColorPalettes";
import { starTrekTypography } from "../typography/starTrekTypography/starTrekTypography";
import { createStarTrekComponents } from "../components/starTrekComponents/starTrekComponents";

/**
 * Default theme variant when none specified
 *
 * The Next Generation (TNG) provides the most balanced and widely
 * recognized Star Trek aesthetic, making it ideal as the default.
 */
const DEFAULT_VARIANT: StarTrekVariant = "tng";

/**
 * Standard border radius used throughout the theme
 *
 * Provides consistent rounded corners across components while
 * maintaining the technological aesthetic of LCARS interfaces.
 */
const THEME_BORDER_RADIUS = 8;

/**
 * Creates comprehensive Material-UI palette configuration
 *
 * Converts Star Trek color palette into Material-UI palette structure
 * with appropriate contrast ratios and accessibility considerations.
 *
 * @param colors - Star Trek color palette for theme variant
 * @returns Material-UI palette configuration object
 *
 * @example
 * ```typescript
 * const palette = createThemePalette(tngColorPalette);
 * // Returns complete Material-UI palette with TNG colors
 * ```
 */
const createThemePalette = (colors: StarTrekColorPalette) => ({
  /**
   * Dark mode configuration for Star Trek aesthetic
   *
   * All Star Trek themes use dark mode to simulate the
   * space environment and LCARS interface styling.
   */
  mode: "dark" as const,

  /**
   * Primary color configuration
   *
   * Main brand color representing command division or
   * primary interactive elements throughout the interface.
   */
  primary: {
    main: colors.primary,
    contrastText: colors.text,
    light: `${colors.primary}CC`, // 80% opacity for lighter variant
    dark: `${colors.primary}80`, // 50% opacity for darker variant
  },

  /**
   * Secondary color configuration
   *
   * Accent color for secondary actions, science division
   * elements, and complementary interface components.
   */
  secondary: {
    main: colors.secondary,
    contrastText: colors.text,
    light: `${colors.secondary}CC`, // 80% opacity
    dark: `${colors.secondary}80`, // 50% opacity
  },

  /**
   * Background color configuration
   *
   * Defines default and paper backgrounds for consistent
   * depth hierarchy and visual organization.
   */
  background: {
    default: colors.background,
    paper: colors.surface,
  },

  /**
   * Text color configuration
   *
   * Primary and secondary text colors with appropriate
   * contrast ratios for accessibility compliance.
   */
  text: {
    primary: colors.text,
    secondary: `${colors.text}CC`, // 80% opacity for secondary text
    disabled: `${colors.text}60`, // 40% opacity for disabled text
  },

  /**
   * Divider color for borders and separators
   *
   * Subtle divider color that provides definition without
   * overwhelming the interface design.
   */
  divider: `${colors.text}33`, // 20% opacity for subtle separation

  /**
   * Error color using accent color
   *
   * Uses the accent color (typically red) for error states,
   * warnings, and critical notifications.
   */
  error: {
    main: colors.accent,
    contrastText: colors.text,
  },

  /**
   * Warning color derived from primary palette
   *
   * Uses primary color with reduced intensity for
   * warning states and cautionary notifications.
   */
  warning: {
    main: `${colors.primary}E6`, // 90% opacity
    contrastText: colors.text,
  },

  /**
   * Info color using secondary palette
   *
   * Uses secondary color for informational messages
   * and neutral notifications.
   */
  info: {
    main: colors.secondary,
    contrastText: colors.text,
  },

  /**
   * Success color derived from secondary palette
   *
   * Uses secondary color with slight adjustment for
   * success states and positive feedback.
   */
  success: {
    main: `${colors.secondary}D9`, // 85% opacity
    contrastText: colors.text,
  },
});

/**
 * Creates comprehensive Star Trek Material-UI theme
 *
 * Factory function that combines color palettes, typography, component overrides,
 * and shape configuration to create a complete theme for any Star Trek series
 * variant. Provides consistent API across all theme variations.
 *
 * @param variant - Star Trek series variant ('tos', 'tng', 'ds9', 'voy', 'disco')
 * @returns Complete Material-UI Theme object with Star Trek styling
 *
 * @example
 * ```typescript
 * // Create TNG theme (default)
 * const tngTheme = createStarTrekTheme();
 *
 * // Create specific series theme
 * const ds9Theme = createStarTrekTheme('ds9');
 * const voyTheme = createStarTrekTheme('voy');
 *
 * // Use with Material-UI ThemeProvider
 * <ThemeProvider theme={tngTheme}>
 *   <App />
 * </ThemeProvider>
 * ```
 *
 * @example
 * ```typescript
 * // Access theme properties
 * const theme = createStarTrekTheme('disco');
 * console.log(theme.palette.primary.main); // '#00D4FF' (Discovery blue)
 * console.log(theme.typography.h1.fontFamily); // Orbitron font stack
 *
 * // Use in styled components
 * const StyledButton = styled(Button)(({ theme }) => ({
 *   background: theme.palette.primary.main,
 *   color: theme.palette.primary.contrastText,
 * }));
 * ```
 */
export const createStarTrekTheme = (
  variant: StarTrekVariant = DEFAULT_VARIANT,
): Theme => {
  // Get color palette for the specified variant
  const colors = starTrekColorPalettes[variant];

  // Create the base theme with palette and typography
  const baseTheme = createTheme({
    palette: createThemePalette(colors),
    typography: starTrekTypography,
    shape: {
      borderRadius: THEME_BORDER_RADIUS,
    },
  });

  // Create enhanced theme with component overrides
  const enhancedTheme = createTheme({
    ...baseTheme,
    components: createStarTrekComponents(colors),
  });

  return enhancedTheme;
};

/**
 * Pre-configured themes for each Star Trek series
 *
 * Ready-to-use theme instances for all supported Star Trek variants.
 * These can be imported directly for immediate use without calling
 * the factory function.
 *
 * @example
 * ```typescript
 * import { tngTheme, ds9Theme } from './starTrekTheme';
 *
 * // Use pre-configured theme
 * <ThemeProvider theme={tngTheme}>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export const starTrekThemes = {
  /** The Original Series (1966-1969) theme with classic gold command colors */
  tos: createStarTrekTheme("tos"),

  /** The Next Generation (1987-1994) theme with red command and LCARS styling */
  tng: createStarTrekTheme("tng"),

  /** Deep Space Nine (1993-1999) theme with Bajoran gold and wartime complexity */
  ds9: createStarTrekTheme("ds9"),

  /** Voyager (1995-2001) theme with Delta Quadrant exploration colors */
  voy: createStarTrekTheme("voy"),

  /** Discovery (2017-present) theme with modern blue and contemporary styling */
  disco: createStarTrekTheme("disco"),
} as const;

/**
 * Default theme export (TNG variant)
 *
 * Provides immediate access to the default theme without requiring
 * function calls. Uses TNG styling as the most recognizable and
 * balanced Star Trek aesthetic.
 */
export const defaultStarTrekTheme = starTrekThemes.tng;

/**
 * Theme utility functions for advanced usage
 */
export const themeUtils = {
  /**
   * Gets color palette for specified variant without creating full theme
   *
   * @param variant - Star Trek series variant
   * @returns Color palette object for the variant
   *
   * @example
   * ```typescript
   * const ds9Colors = themeUtils.getColorPalette('ds9');
   * console.log(ds9Colors.primary); // '#D4A574' (Bajoran gold)
   * ```
   */
  getColorPalette: (variant: StarTrekVariant): StarTrekColorPalette => {
    return starTrekColorPalettes[variant];
  },

  /**
   * Lists all available theme variants
   *
   * @returns Array of available Star Trek series variants
   *
   * @example
   * ```typescript
   * const variants = themeUtils.getAvailableVariants();
   * console.log(variants); // ['tos', 'tng', 'ds9', 'voy', 'disco']
   * ```
   */
  getAvailableVariants: (): StarTrekVariant[] => {
    return Object.keys(starTrekColorPalettes) as StarTrekVariant[];
  },

  /**
   * Validates if a variant exists
   *
   * @param variant - Variant string to validate
   * @returns True if variant exists, false otherwise
   *
   * @example
   * ```typescript
   * const isValid = themeUtils.isValidVariant('tng'); // true
   * const isInvalid = themeUtils.isValidVariant('invalid'); // false
   * ```
   */
  isValidVariant: (variant: string): variant is StarTrekVariant => {
    return variant in starTrekColorPalettes;
  },

  /**
   * Creates theme with custom color overrides
   *
   * @param variant - Base Star Trek variant
   * @param overrides - Color overrides to apply
   * @returns Custom theme with overrides applied
   *
   * @example
   * ```typescript
   * const customTheme = themeUtils.createCustomTheme('tng', {
   *   primary: '#FF0000', // Override primary color to red
   * });
   * ```
   */
  createCustomTheme: (
    variant: StarTrekVariant,
    overrides: Partial<StarTrekColorPalette>,
  ): Theme => {
    const baseColors = starTrekColorPalettes[variant];
    const customColors = { ...baseColors, ...overrides };

    const customTheme = createTheme({
      palette: createThemePalette(customColors),
      typography: starTrekTypography,
      shape: { borderRadius: THEME_BORDER_RADIUS },
    });

    return createTheme({
      ...customTheme,
      components: createStarTrekComponents(customColors),
    });
  },
};

/**
 * Re-export types and palettes for external use
 */
export type { StarTrekVariant, StarTrekColorPalette };
export { starTrekColorPalettes };
