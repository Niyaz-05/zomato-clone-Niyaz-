// Framer Motion animation variants and utilities

import { Variants } from 'framer-motion'

// Page transition animations
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const slideUpTransition: Variants = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -60 },
}

// Card animations with 3D tilt
export const card3D: Variants = {
  initial: { rotateY: 0, rotateX: 0, scale: 1 },
  hover: {
    rotateY: 5,
    rotateX: -5,
    scale: 1.02,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

export const cardHover: Variants = {
  initial: { scale: 1, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' },
  hover: {
    scale: 1.03,
    boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)',
    transition: { duration: 0.2 },
  },
}

// Button animations
export const buttonBounce: Variants = {
  initial: { scale: 1 },
  tap: { scale: 0.95 },
  success: {
    scale: [1, 1.2, 0.9, 1.1, 1],
    transition: { duration: 0.5 },
  },
}

// Heart favorite animation
export const heartPop: Variants = {
  initial: { scale: 1 },
  tap: { scale: 0.8 },
  liked: {
    scale: [1, 1.4, 0.9, 1.2, 1],
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

// Stagger children animations
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

// Fade in animations
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
}

export const fadeInScale: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
}

// Slide animations
export const slideInLeft: Variants = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 100, opacity: 0 },
}

export const slideInRight: Variants = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -100, opacity: 0 },
}

// Confetti animation for order success
export const confettiPiece: Variants = {
  initial: { y: -20, opacity: 1, rotate: 0 },
  animate: {
    y: [0, 100, 200, 300],
    x: [0, Math.random() * 200 - 100],
    rotate: [0, Math.random() * 360],
    opacity: [1, 1, 0.8, 0],
    transition: { duration: 2, ease: 'easeOut' },
  },
}

// Shimmer loading effect
export const shimmer: Variants = {
  initial: { backgroundPosition: '-200% 0' },
  animate: {
    backgroundPosition: '200% 0',
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

// Floating animation
export const floating: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Pulse animation
export const pulse: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Glow animation
export const glow: Variants = {
  initial: { boxShadow: '0 0 0 rgba(239, 68, 68, 0)' },
  animate: {
    boxShadow: [
      '0 0 20px rgba(239, 68, 68, 0.5)',
      '0 0 40px rgba(239, 68, 68, 0.8)',
      '0 0 20px rgba(239, 68, 68, 0.5)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Navbar scroll animation
export const navbarScroll = {
  top: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    backdropFilter: 'blur(0px)',
    boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
  },
  scrolled: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
}

// Parallax scroll effect utility
export const parallaxScroll = (scrollY: number, speed: number = 0.5) => {
  return scrollY * speed
}

// Spring configurations
export const springConfig = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
}

export const softSpring = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
}

export const bouncySpring = {
  type: 'spring',
  stiffness: 400,
  damping: 15,
}
