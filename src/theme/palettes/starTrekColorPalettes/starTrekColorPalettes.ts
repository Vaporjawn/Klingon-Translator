/**
 * @fileoverview Star Trek Color Palettes
 *
 * Comprehensive collection of color schemes inspired by different Star Trek series.
 * Each palette contains primary, secondary, accent, background, surface, and text colors
 * that capture the visual essence of their respective series.
 *
 * @author Klingon Translator Team
 * @version 1.0.0
 */

/**
 * Represents a complete color palette for a Star Trek series theme
 *
 * @interface StarTrekColorPalette
 * @property {string} primary - Main brand color (command/department color)
 * @property {string} secondary - Secondary accent color (science/operations)
 * @property {string} accent - Tertiary accent color (engineering/special)
 * @property {string} background - Main background color (space/viewport)
 * @property {string} surface - Card/panel surface color (console panels)
 * @property {string} text - Primary text color (LCARS display text)
 */
export interface StarTrekColorPalette {
  /** Main brand color representing command or primary department */
  primary: string;
  /** Secondary accent color for science or operations elements */
  secondary: string;
  /** Tertiary accent color for engineering or special highlights */
  accent: string;
  /** Deep background color reminiscent of space or starship interiors */
  background: string;
  /** Console panel and surface color for UI elements */
  surface: string;
  /** High contrast text color for optimal readability */
  text: string;
}

/**
 * The Original Series (TOS) Color Palette
 *
 * Inspired by the classic 1960s Star Trek series with bold primary colors
 * representing the traditional command gold, science blue, and engineering red.
 *
 * @example
 * ```typescript
 * const tosTheme = createStarTrekTheme('tos');
 * // Uses warm gold command colors with classic blue science accents
 * ```
 */
export const tosColorPalette: StarTrekColorPalette = {
  /** Classic command division gold from Kirk's era */
  primary: "#FFD700",
  /** Science division blue from Spock's uniform */
  secondary: "#1E88E5",
  /** Engineering division red from Scotty's uniform */
  accent: "#F44336",
  /** Deep space black for main backgrounds */
  background: "#0D1B2A",
  /** Console panel dark blue-gray */
  surface: "#1B263B",
  /** Bright white for maximum contrast and readability */
  text: "#FFFFFF",
};

/**
 * The Next Generation (TNG) Color Palette
 *
 * Based on the 1980s-1990s series with the updated uniform colors where
 * command wore red, operations wore gold, and sciences wore blue.
 *
 * @example
 * ```typescript
 * const tngTheme = createStarTrekTheme('tng');
 * // Uses Picard-era command red with modern accent colors
 * ```
 */
export const tngColorPalette: StarTrekColorPalette = {
  /** Command division red from Picard's era */
  primary: "#FF6B35",
  /** Modern teal accent inspired by LCARS interfaces */
  secondary: "#4ECDC4",
  /** Operations division gold for accent elements */
  accent: "#FFE66D",
  /** Deep purple-black reminiscent of Galaxy-class interiors */
  background: "#0F0F23",
  /** Darker surface color for sophisticated panel design */
  surface: "#1A1A2E",
  /** Softer white with slight warmth for better eye comfort */
  text: "#E3E3E3",
};

/**
 * Deep Space Nine (DS9) Color Palette
 *
 * Warmer, more complex palette reflecting the station's Bajoran and
 * Cardassian influences, with richer golds and deeper accent colors.
 *
 * @example
 * ```typescript
 * const ds9Theme = createStarTrekTheme('ds9');
 * // Uses Bajoran-inspired golds with Dominion War era styling
 * ```
 */
export const ds9ColorPalette: StarTrekColorPalette = {
  /** Warm Bajoran gold reflecting the station's spiritual significance */
  primary: "#D4A574",
  /** Deep Dominion purple representing the wartime era complexity */
  secondary: "#7209B7",
  /** Cardassian red accent for dramatic tension elements */
  accent: "#FF6B6B",
  /** Space station deep blue reminiscent of the wormhole */
  background: "#16213E",
  /** Richer surface blue for Cardassian-designed panels */
  surface: "#0F3460",
  /** Clean white with slight warmth for extended viewing */
  text: "#F0F0F0",
};

/**
 * Voyager (VOY) Color Palette
 *
 * Lighter, more hopeful palette reflecting the ship's journey through
 * unknown space, with warmer tones and Delta Quadrant influences.
 *
 * @example
 * ```typescript
 * const voyTheme = createStarTrekTheme('voy');
 * // Uses Janeway-era colors with Delta Quadrant exploration themes
 * ```
 */
export const voyColorPalette: StarTrekColorPalette = {
  /** Voyager command red with softer, more approachable tone */
  primary: "#FF8A80",
  /** Delta Quadrant green representing hope and growth */
  secondary: "#81C784",
  /** Borg-influenced orange for technological elements */
  accent: "#FFB74D",
  /** Deep space purple-black for long-range exploration feel */
  background: "#1A1A2E",
  /** Mid-tone surface color balancing comfort and professionalism */
  surface: "#16213E",
  /** Pure white for clarity during long-distance missions */
  text: "#FFFFFF",
};

/**
 * Discovery (DISCO) Color Palette
 *
 * Modern, high-contrast palette with bold blues and dramatic accents,
 * reflecting the contemporary visual style and advanced technology.
 *
 * @example
 * ```typescript
 * const discoTheme = createStarTrekTheme('disco');
 * // Uses modern Discovery blue with contemporary accent colors
 * ```
 */
export const discoColorPalette: StarTrekColorPalette = {
  /** Distinctive Discovery blue representing advanced 32nd century tech */
  primary: "#00D4FF",
  /** Vibrant pink accent for modern, bold design elements */
  secondary: "#FF4081",
  /** Bright gold for important highlights and call-to-action elements */
  accent: "#FFC107",
  /** Pure black for maximum contrast and modern aesthetic */
  background: "#000000",
  /** Dark gray surface for sleek, contemporary panel design */
  surface: "#121212",
  /** Pure white for optimal readability and modern clarity */
  text: "#FFFFFF",
};

/**
 * Complete collection of all Star Trek color palettes
 *
 * Organized by series abbreviation for easy theme switching and
 * consistent access throughout the application.
 *
 * @example
 * ```typescript
 * // Access any palette directly
 * const palette = starTrekColorPalettes.tng;
 *
 * // Iterate through all available palettes
 * Object.keys(starTrekColorPalettes).forEach(series => {
 *   console.log(`${series}: ${starTrekColorPalettes[series].primary}`);
 * });
 * ```
 */
export const starTrekColorPalettes = {
  /** The Original Series (1966-1969) */
  tos: tosColorPalette,
  /** The Next Generation (1987-1994) */
  tng: tngColorPalette,
  /** Deep Space Nine (1993-1999) */
  ds9: ds9ColorPalette,
  /** Voyager (1995-2001) */
  voy: voyColorPalette,
  /** Discovery (2017-present) */
  disco: discoColorPalette,
} as const;

/**
 * Type representing all available Star Trek series theme variants
 *
 * @example
 * ```typescript
 * const getRandomTheme = (): StarTrekVariant => {
 *   const variants: StarTrekVariant[] = ['tos', 'tng', 'ds9', 'voy', 'disco'];
 *   return variants[Math.floor(Math.random() * variants.length)];
 * };
 * ```
 */
export type StarTrekVariant = keyof typeof starTrekColorPalettes;
