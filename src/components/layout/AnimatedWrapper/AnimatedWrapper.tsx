/**
 * @fileoverview Animated Content Wrapper Component
 *
 * Provides consistent entry animations for main content using Framer Motion.
 * Implements Star Trek inspired smooth animations with proper easing curves.
 *
 * @author vaporjawn
 * @version 1.0.0
 *
 * @example
 * ```tsx
 * import AnimatedWrapper from './components/layout/AnimatedWrapper';
 * import TranslatorInterface from './components/TranslatorInterface';
 *
 * function MainContent() {
 *   return (
 *     <AnimatedWrapper>
 *       <TranslatorInterface />
 *     </AnimatedWrapper>
 *   );
 * }
 * ```
 */

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Props for the AnimatedWrapper component
 */
interface AnimatedWrapperProps {
  /** Child components to animate */
  children: ReactNode;
  /** Animation duration in seconds (default: 0.8) */
  duration?: number;
  /** Custom delay before animation starts (default: 0) */
  delay?: number;
}

/**
 * Animated wrapper component that provides:
 * - Smooth fade-in animation with scale and vertical movement
 * - Star Trek inspired easing curves for cinematic feel
 * - Configurable animation timing and delays
 * - Full-size container with centered content
 * - Proper z-index for content layering
 *
 * Animation sequence:
 * 1. Initial state: opacity 0, slightly below center, scaled down
 * 2. Final state: opacity 1, centered position, full scale
 * 3. Easing: Custom cubic-bezier for smooth, professional motion
 *
 * @param props - Component props
 * @returns JSX element with animated content
 */
const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  children,
  duration = 0.8,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.23, 1, 0.32, 1], // Custom easing curve for smooth animation
      }}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedWrapper;
