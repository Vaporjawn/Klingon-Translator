/**
 * @fileoverview Typography Configuration for Star Trek Theme
 *
 * Defines comprehensive typography settings inspired by LCARS (Library Computer Access
 * and Retrieval System) interfaces and Star Trek display systems. Uses Orbitron font
 * for futuristic, technological feel with appropriate weights and spacing.
 *
 * @author Klingon Translator Team
 * @version 1.0.0
 */

/**
 * Primary font stack with fallbacks
 *
 * Orbitron provides the futuristic, technological aesthetic reminiscent of
 * LCARS displays. Fallbacks ensure compatibility across all devices.
 */
const STAR_TREK_FONT_FAMILY =
  '"Orbitron", "Roboto", "Helvetica", "Arial", sans-serif';

/**
 * Base letter spacing for enhanced readability in futuristic interfaces
 *
 * Slightly increased spacing improves legibility for the Orbitron font
 * and creates the characteristic LCARS display appearance.
 */
const BASE_LETTER_SPACING = "0.02em";

/**
 * Enhanced letter spacing for headings and prominent text
 *
 * Larger spacing creates hierarchy and mimics the spaced appearance
 * of Star Trek computer displays and console readouts.
 */
const HEADING_LETTER_SPACING = "0.05em";

/**
 * Maximum letter spacing for titles and major headings
 *
 * Creates dramatic, authoritative appearance suitable for
 * main titles and important system messages.
 */
const TITLE_LETTER_SPACING = "0.1em";

/**
 * Star Trek Typography Configuration
 *
 * Comprehensive typography system inspired by LCARS interfaces and
 * Star Trek display systems. Emphasizes clarity, hierarchy, and
 * futuristic aesthetic while maintaining excellent readability.
 *
 * @example
 * ```typescript
 * import { starTrekTypography } from './starTrekTypography';
 *
 * const theme = createTheme({
 *   typography: starTrekTypography,
 * });
 *
 * // Results in LCARS-style typography throughout the application
 * ```
 */
export const starTrekTypography = {
  /**
   * Base font family with Orbitron primary and comprehensive fallbacks
   *
   * Ensures consistent futuristic appearance across all text elements
   * while providing reliable fallback options for compatibility.
   */
  fontFamily: STAR_TREK_FONT_FAMILY,

  /**
   * Main heading (h1) - Primary titles and major section headers
   *
   * Bold, prominent styling suitable for main application titles,
   * major section headers, and important system announcements.
   * Uses uppercase transformation for LCARS-style display appearance.
   *
   * @example
   * ```tsx
   * <Typography variant="h1">KLINGON TRANSLATOR</Typography>
   * // Large, bold, spaced title perfect for main application header
   * ```
   */
  h1: {
    fontWeight: 700,
    fontSize: "2.5rem",
    letterSpacing: TITLE_LETTER_SPACING,
    textTransform: "uppercase" as const,
    lineHeight: 1.2,
  },

  /**
   * Secondary heading (h2) - Section titles and subsystem headers
   *
   * Strong hierarchy styling for major content sections,
   * subsystem titles, and important categorical divisions.
   *
   * @example
   * ```tsx
   * <Typography variant="h2">Translation Engine</Typography>
   * // Clear section division with appropriate visual weight
   * ```
   */
  h2: {
    fontWeight: 600,
    fontSize: "2rem",
    letterSpacing: HEADING_LETTER_SPACING,
    lineHeight: 1.3,
  },

  /**
   * Tertiary heading (h3) - Subsection titles and component headers
   *
   * Medium prominence for subsections, component titles,
   * and secondary organizational elements.
   *
   * @example
   * ```tsx
   * <Typography variant="h3">Voice Settings</Typography>
   * // Balanced weight for component or subsection organization
   * ```
   */
  h3: {
    fontWeight: 600,
    fontSize: "1.5rem",
    letterSpacing: HEADING_LETTER_SPACING,
    lineHeight: 1.4,
  },

  /**
   * Quaternary heading (h4) - Minor section titles and labels
   *
   * Subtle prominence for minor sections, form labels,
   * and secondary informational headings.
   *
   * @example
   * ```tsx
   * <Typography variant="h4">Audio Output</Typography>
   * // Clean, readable heading for smaller content sections
   * ```
   */
  h4: {
    fontWeight: 500,
    fontSize: "1.25rem",
    letterSpacing: "0.03em",
    lineHeight: 1.4,
  },

  /**
   * Small heading (h5) - Control labels and minor headings
   *
   * Light prominence for control panel labels, settings groups,
   * and tertiary organizational elements.
   *
   * @example
   * ```tsx
   * <Typography variant="h5">Language Selection</Typography>
   * // Appropriate for control labels and minor section divisions
   * ```
   */
  h5: {
    fontWeight: 500,
    fontSize: "1.1rem",
    letterSpacing: BASE_LETTER_SPACING,
    lineHeight: 1.5,
  },

  /**
   * Smallest heading (h6) - Field labels and micro-headings
   *
   * Minimal prominence for individual field labels, status indicators,
   * and fine-grained content organization.
   *
   * @example
   * ```tsx
   * <Typography variant="h6">Voice Rate</Typography>
   * // Perfect for individual control labels and status text
   * ```
   */
  h6: {
    fontWeight: 500,
    fontSize: "1rem",
    letterSpacing: BASE_LETTER_SPACING,
    lineHeight: 1.5,
  },

  /**
   * Primary body text (body1) - Main content and descriptions
   *
   * Standard readable text for main content, descriptions,
   * help text, and general informational content.
   * Optimized line height for comfortable reading.
   *
   * @example
   * ```tsx
   * <Typography variant="body1">
   *   The Klingon language translator uses advanced algorithms...
   * </Typography>
   * // Comfortable, readable text for main content areas
   * ```
   */
  body1: {
    fontSize: "1rem",
    lineHeight: 1.6,
    fontWeight: 400,
  },

  /**
   * Secondary body text (body2) - Supporting text and captions
   *
   * Slightly smaller text for supporting information, captions,
   * secondary descriptions, and supplementary content.
   *
   * @example
   * ```tsx
   * <Typography variant="body2">
   *   Translation accuracy depends on context and dialect
   * </Typography>
   * // Ideal for captions, help text, and secondary information
   * ```
   */
  body2: {
    fontSize: "0.875rem",
    lineHeight: 1.5,
    fontWeight: 400,
  },

  /**
   * Button text styling - Interactive elements and calls-to-action
   *
   * Bold, spaced styling for buttons, links, and interactive elements.
   * Uppercase transformation creates commanding, action-oriented appearance
   * suitable for Star Trek interface aesthetic.
   *
   * @example
   * ```tsx
   * <Button variant="contained">
   *   TRANSLATE TEXT
   * </Button>
   * // Bold, uppercase button text with proper spacing
   * ```
   */
  button: {
    fontWeight: 600,
    letterSpacing: HEADING_LETTER_SPACING,
    textTransform: "uppercase" as const,
    fontSize: "0.875rem",
  },

  /**
   * Caption text - Fine print and supplementary information
   *
   * Small, subtle text for timestamps, metadata, copyright notices,
   * and other fine print information that supports main content.
   *
   * @example
   * ```tsx
   * <Typography variant="caption">
   *   Last updated: Stardate 2024.1234
   * </Typography>
   * // Small, unobtrusive text for metadata and timestamps
   * ```
   */
  caption: {
    fontSize: "0.75rem",
    lineHeight: 1.4,
    fontWeight: 400,
    letterSpacing: "0.01em",
  },

  /**
   * Overline text - Labels and category indicators
   *
   * Small, uppercase text for category labels, section indicators,
   * and organizational elements that precede main content.
   *
   * @example
   * ```tsx
   * <Typography variant="overline">
   *   SYSTEM STATUS
   * </Typography>
   * // Small, uppercase labels for categories and sections
   * ```
   */
  overline: {
    fontSize: "0.75rem",
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    lineHeight: 1.4,
  },
};

/**
 * Typography utility functions for consistent text styling
 */
export const typographyUtils = {
  /**
   * Creates LCARS-style display text with enhanced spacing
   *
   * @param fontSize - Font size in rem units
   * @param fontWeight - Font weight (300-900)
   * @returns CSS properties for LCARS-style text
   *
   * @example
   * ```typescript
   * const displayStyle = typographyUtils.createDisplayText('1.5rem', 600);
   * // Returns properly spaced, LCARS-style text properties
   * ```
   */
  createDisplayText: (fontSize: string, fontWeight: number = 500) => ({
    fontFamily: STAR_TREK_FONT_FAMILY,
    fontSize,
    fontWeight,
    letterSpacing: HEADING_LETTER_SPACING,
    textTransform: "uppercase" as const,
  }),

  /**
   * Creates readable body text with optimal line spacing
   *
   * @param fontSize - Font size in rem units
   * @returns CSS properties for readable body text
   *
   * @example
   * ```typescript
   * const bodyStyle = typographyUtils.createBodyText('0.875rem');
   * // Returns well-spaced, readable text properties
   * ```
   */
  createBodyText: (fontSize: string) => ({
    fontFamily: STAR_TREK_FONT_FAMILY,
    fontSize,
    lineHeight: 1.6,
    fontWeight: 400,
  }),
};
