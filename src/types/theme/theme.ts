/**
 * @fileoverview Theme System Types
 *
 * Type definitions for the comprehensive Star Trek LCARS-inspired theming
 * system, including color palettes, typography configurations, component
 * styling, and theme factory utilities with multi-series support.
 *
 * @author Klingon Translator Team
 * @version 1.0.0
 */

import type { Theme } from "@mui/material/styles";

/**
 * Star Trek series identifiers for theme variants
 *
 * Enumeration of supported Star Trek series for themed
 * visual experiences. Each series has unique color palettes
 * and styling characteristics inspired by their aesthetics.
 *
 * @example
 * ```typescript
 * const series: ThemeSeriesId = 'tng';
 * // The Next Generation red/teal/gold theme
 * ```
 */
export type ThemeSeriesId = "tos" | "tng" | "ds9" | "voy" | "disco";

/**
 * Theme mode options for light/dark appearance
 *
 * Controls the overall brightness and contrast of the
 * theme while maintaining the Star Trek aesthetic and
 * ensuring proper accessibility standards.
 *
 * @example
 * ```typescript
 * const mode: ThemeModeId = 'dark';
 * // Dark theme with LCARS-style dark backgrounds
 * ```
 */
export type ThemeModeId = "light" | "dark";

/**
 * Complete Star Trek color palette for a specific series
 *
 * Comprehensive color system including primary/secondary colors,
 * status indicators, backgrounds, and accessibility-compliant
 * variations for complete theming coverage.
 *
 * @interface StarTrekColorPalette
 * @property {string} name - Human-readable series name
 * @property {object} primary - Primary brand colors for the series
 * @property {object} secondary - Secondary accent colors
 * @property {object} background - Background color variations
 * @property {object} surface - Surface and panel colors
 * @property {object} status - Status indicator colors (success/error/warning)
 * @property {object} text - Text colors with contrast compliance
 *
 * @example
 * ```typescript
 * const tngPalette: StarTrekColorPalette = {
 *   name: 'The Next Generation',
 *   primary: {
 *     main: '#FF6600',     // Command Red
 *     light: '#FF8833',
 *     dark: '#CC5200',
 *     contrastText: '#FFFFFF'
 *   },
 *   // ... additional color definitions
 * };
 * ```
 */
export interface StarTrekColorPalette {
  /** Human-readable name of the Star Trek series */
  name: string;

  /** Primary brand colors for the series */
  primary: {
    /** Main primary color */
    main: string;
    /** Lighter variant of primary color */
    light: string;
    /** Darker variant of primary color */
    dark: string;
    /** Text color with sufficient contrast on primary */
    contrastText: string;
  };

  /** Secondary accent colors */
  secondary: {
    /** Main secondary color */
    main: string;
    /** Lighter variant of secondary color */
    light: string;
    /** Darker variant of secondary color */
    dark: string;
    /** Text color with sufficient contrast on secondary */
    contrastText: string;
  };

  /** Background color system */
  background: {
    /** Default page background */
    default: string;
    /** Paper/card background */
    paper: string;
    /** Glassmorphism overlay background */
    glass: string;
  };

  /** Surface and panel colors */
  surface: {
    /** Primary surface color */
    primary: string;
    /** Secondary surface color */
    secondary: string;
    /** Elevated surface color */
    elevated: string;
  };

  /** Status indicator colors */
  status: {
    /** Success state color */
    success: string;
    /** Error state color */
    error: string;
    /** Warning state color */
    warning: string;
    /** Information state color */
    info: string;
  };

  /** Text color system with accessibility compliance */
  text: {
    /** Primary text color */
    primary: string;
    /** Secondary text color */
    secondary: string;
    /** Disabled text color */
    disabled: string;
    /** Hint text color */
    hint: string;
  };
}

/**
 * Typography configuration for LCARS-style text rendering
 *
 * Comprehensive typography system based on LCARS interface
 * design principles, using Orbitron font family with proper
 * sizing, spacing, and weight variations for hierarchical content.
 *
 * @interface StarTrekTypography
 * @property {object} fontFamily - Font stack with fallbacks
 * @property {object} variants - Typography variant definitions
 * @property {object} spacing - Letter and line spacing rules
 *
 * @example
 * ```typescript
 * const typography: StarTrekTypography = {
 *   fontFamily: {
 *     primary: '"Orbitron", "Roboto", "Arial", sans-serif',
 *     monospace: '"Courier New", "Monaco", monospace'
 *   },
 *   variants: {
 *     h1: { fontSize: '3rem', fontWeight: 700 }
 *   }
 * };
 * ```
 */
export interface StarTrekTypography {
  /** Font family definitions with fallbacks */
  fontFamily: {
    /** Primary display font (Orbitron for LCARS feel) */
    primary: string;
    /** Monospace font for code and data display */
    monospace: string;
  };

  /** Typography variant definitions */
  variants: {
    /** Heading level 1 - largest display text */
    h1: {
      fontSize: string;
      fontWeight: number;
      lineHeight: number;
      letterSpacing: string;
    };
    /** Heading level 2 - section headers */
    h2: {
      fontSize: string;
      fontWeight: number;
      lineHeight: number;
      letterSpacing: string;
    };
    /** Heading level 3 - subsection headers */
    h3: {
      fontSize: string;
      fontWeight: number;
      lineHeight: number;
      letterSpacing: string;
    };
    /** Body text - primary content text */
    body1: {
      fontSize: string;
      fontWeight: number;
      lineHeight: number;
      letterSpacing: string;
    };
    /** Body text - secondary content text */
    body2: {
      fontSize: string;
      fontWeight: number;
      lineHeight: number;
      letterSpacing: string;
    };
    /** Button text styling */
    button: {
      fontSize: string;
      fontWeight: number;
      lineHeight: number;
      letterSpacing: string;
      textTransform: string;
    };
    /** Caption text for small labels */
    caption: {
      fontSize: string;
      fontWeight: number;
      lineHeight: number;
      letterSpacing: string;
    };
  };

  /** Spacing and layout rules */
  spacing: {
    /** Standard letter spacing for readability */
    letterSpacing: {
      normal: string;
      wide: string;
      wider: string;
    };
    /** Line height ratios for different content types */
    lineHeight: {
      tight: number;
      normal: number;
      loose: number;
    };
  };
}

/**
 * Component styling overrides for Material-UI components
 *
 * Comprehensive component theming to create LCARS-style
 * interface elements with glassmorphism effects, proper
 * spacing, and Star Trek aesthetic consistency.
 *
 * @interface StarTrekComponentStyles
 * @property {object} button - Button component styling variations
 * @property {object} card - Card component styling with glassmorphism
 * @property {object} input - Input field styling with LCARS borders
 * @property {object} effects - Special visual effects definitions
 *
 * @example
 * ```typescript
 * const components: StarTrekComponentStyles = {
 *   button: {
 *     primary: {
 *       background: 'linear-gradient(45deg, #FF6600 30%, #FF8833 90%)',
 *       borderRadius: '24px'
 *     }
 *   }
 * };
 * ```
 */
export interface StarTrekComponentStyles {
  /** Button styling variations */
  button: {
    /** Primary button styling */
    primary: {
      background: string;
      borderRadius: string;
      padding: string;
      boxShadow: string;
      transition: string;
      "&:hover": {
        background: string;
        boxShadow: string;
        transform: string;
      };
    };
    /** Secondary button styling */
    secondary: {
      background: string;
      borderRadius: string;
      padding: string;
      border: string;
      transition: string;
      "&:hover": {
        background: string;
        borderColor: string;
      };
    };
  };

  /** Card component styling with glassmorphism */
  card: {
    /** Default card styling */
    default: {
      background: string;
      backdropFilter: string;
      borderRadius: string;
      border: string;
      boxShadow: string;
      padding: string;
    };
    /** Elevated card styling */
    elevated: {
      background: string;
      backdropFilter: string;
      borderRadius: string;
      border: string;
      boxShadow: string;
      padding: string;
    };
  };

  /** Input field styling with LCARS aesthetics */
  input: {
    /** Standard text input styling */
    standard: {
      background: string;
      borderRadius: string;
      border: string;
      padding: string;
      fontSize: string;
      "&:focus": {
        borderColor: string;
        boxShadow: string;
      };
    };
  };

  /** Special visual effects */
  effects: {
    /** Glassmorphism background effect */
    glassmorphism: {
      background: string;
      backdropFilter: string;
      border: string;
    };
    /** Glow effect for interactive elements */
    glow: {
      boxShadow: string;
      transition: string;
    };
    /** Gradient background variations */
    gradients: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
}

/**
 * Complete theme configuration combining all styling aspects
 *
 * Unified theme object that combines colors, typography, and
 * component styling into a complete Material-UI theme with
 * Star Trek LCARS aesthetic and accessibility compliance.
 *
 * @interface StarTrekThemeConfig
 * @property {ThemeSeriesId} series - Star Trek series identifier
 * @property {ThemeModeId} mode - Light or dark theme mode
 * @property {StarTrekColorPalette} colors - Complete color system
 * @property {StarTrekTypography} typography - Typography configuration
 * @property {StarTrekComponentStyles} components - Component styling
 * @property {Theme} materialTheme - Generated Material-UI theme object
 *
 * @example
 * ```typescript
 * const themeConfig: StarTrekThemeConfig = {
 *   series: 'tng',
 *   mode: 'dark',
 *   colors: tngColorPalette,
 *   typography: lcarsTypography,
 *   components: starTrekComponents,
 *   materialTheme: generatedMuiTheme
 * };
 * ```
 */
export interface StarTrekThemeConfig {
  /** Star Trek series identifier for this theme */
  series: ThemeSeriesId;

  /** Theme mode (light or dark) */
  mode: ThemeModeId;

  /** Complete color palette for the series */
  colors: StarTrekColorPalette;

  /** Typography configuration with LCARS styling */
  typography: StarTrekTypography;

  /** Component styling overrides */
  components: StarTrekComponentStyles;

  /** Generated Material-UI theme object */
  materialTheme: Theme;
}

/**
 * Theme factory configuration options
 *
 * Configuration object passed to theme factory functions
 * to customize theme generation with specific preferences
 * and override default styling behavior.
 *
 * @interface ThemeFactoryOptions
 * @property {boolean} [enableGlassmorphism] - Enable glassmorphism effects
 * @property {boolean} [enableAnimations] - Enable UI animations
 * @property {number} [contrastLevel] - Accessibility contrast level (1-3)
 * @property {object} [customColors] - Custom color overrides
 *
 * @example
 * ```typescript
 * const options: ThemeFactoryOptions = {
 *   enableGlassmorphism: true,
 *   enableAnimations: false, // For reduced motion
 *   contrastLevel: 2,
 *   customColors: {
 *     primary: { main: '#FF0000' } // Custom red override
 *   }
 * };
 * ```
 */
export interface ThemeFactoryOptions {
  /**
   * Enable glassmorphism visual effects
   *
   * Controls whether translucent background effects
   * and backdrop blur are applied to interface elements.
   */
  enableGlassmorphism?: boolean;

  /**
   * Enable UI animations and transitions
   *
   * Controls motion effects for better accessibility
   * support (respects prefers-reduced-motion).
   */
  enableAnimations?: boolean;

  /**
   * Accessibility contrast enhancement level
   *
   * Increases color contrast ratios: 1 (standard),
   * 2 (enhanced), 3 (maximum) for better visibility.
   */
  contrastLevel?: 1 | 2 | 3;

  /**
   * Custom color overrides
   *
   * Allows partial override of palette colors
   * while maintaining theme consistency and accessibility.
   */
  customColors?: {
    primary?: Partial<StarTrekColorPalette["primary"]>;
    secondary?: Partial<StarTrekColorPalette["secondary"]>;
    background?: Partial<StarTrekColorPalette["background"]>;
  };
}

/**
 * Theme system utilities and type guards
 */
export const themeTypeUtils = {
  /**
   * Validates if a string is a valid ThemeSeriesId
   *
   * @param value - String to validate
   * @returns True if string is a valid ThemeSeriesId
   *
   * @example
   * ```typescript
   * const isValid = themeTypeUtils.isThemeSeriesId('tng'); // true
   * const isInvalid = themeTypeUtils.isThemeSeriesId('invalid'); // false
   * ```
   */
  isThemeSeriesId: (value: string): value is ThemeSeriesId => {
    return ["tos", "tng", "ds9", "voy", "disco"].includes(value);
  },

  /**
   * Validates if a string is a valid ThemeModeId
   *
   * @param value - String to validate
   * @returns True if string is a valid ThemeModeId
   *
   * @example
   * ```typescript
   * const isValid = themeTypeUtils.isThemeModeId('dark'); // true
   * ```
   */
  isThemeModeId: (value: string): value is ThemeModeId => {
    return ["light", "dark"].includes(value);
  },

  /**
   * Validates if an object is a valid StarTrekColorPalette
   *
   * @param obj - Object to validate
   * @returns True if object matches StarTrekColorPalette interface
   *
   * @example
   * ```typescript
   * const isValid = themeTypeUtils.isStarTrekColorPalette(paletteObj);
   * if (isValid) {
   *   console.log(paletteObj.primary.main);
   * }
   * ```
   */
  isStarTrekColorPalette: (obj: unknown): obj is StarTrekColorPalette => {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "name" in obj &&
      "primary" in obj &&
      "secondary" in obj &&
      "background" in obj &&
      typeof (obj as StarTrekColorPalette).name === "string"
    );
  },

  /**
   * Creates default ThemeFactoryOptions
   *
   * @param overrides - Optional partial overrides
   * @returns Complete ThemeFactoryOptions with defaults
   *
   * @example
   * ```typescript
   * const options = themeTypeUtils.createDefaultOptions({
   *   enableGlassmorphism: false
   * });
   * ```
   */
  createDefaultOptions: (
    overrides?: Partial<ThemeFactoryOptions>,
  ): ThemeFactoryOptions => ({
    enableGlassmorphism: true,
    enableAnimations: true,
    contrastLevel: 1,
    customColors: {},
    ...overrides,
  }),

  /**
   * Extracts series name from ThemeSeriesId
   *
   * @param series - Theme series identifier
   * @returns Human-readable series name
   *
   * @example
   * ```typescript
   * const name = themeTypeUtils.getSeriesName('tng'); // 'The Next Generation'
   * ```
   */
  getSeriesName: (series: ThemeSeriesId): string => {
    const seriesNames: Record<ThemeSeriesId, string> = {
      tos: "The Original Series",
      tng: "The Next Generation",
      ds9: "Deep Space Nine",
      voy: "Voyager",
      disco: "Discovery",
    };
    return seriesNames[series];
  },
};
