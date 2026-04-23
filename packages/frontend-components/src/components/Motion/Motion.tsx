'use client';

import { motion, type HTMLMotionProps } from 'motion/react';
import type { ReactNode } from 'react';

const SPRING = { type: 'spring', stiffness: 170, damping: 24, mass: 0.5 } as const;

interface FadeUpProps extends HTMLMotionProps<'div'> {
  delay?: number;
  y?: number;
  children: ReactNode;
}

/** Quiet scroll-in: small distance, quick spring. */
export function FadeUp({ delay = 0, y = 12, children, ...rest }: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ ...SPRING, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps extends HTMLMotionProps<'div'> {
  stagger?: number;
  children: ReactNode;
}

/** Wrap a list of children to stagger their entrance. Wrap each child in <StaggerItem>. */
export function Stagger({ stagger = 0.06, children, ...rest }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: stagger } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
}

export function StaggerItem({ children, ...rest }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        shown: { opacity: 1, y: 0, transition: SPRING },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Press / tap feedback — scale down slightly on interaction. */
export function Pressable({ children, ...rest }: HTMLMotionProps<'div'>) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
