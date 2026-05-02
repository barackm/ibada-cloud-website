"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

// ---------------------------------------------------------------------------
// FadeIn — on-mount entrance (hero, above the fold)
// ---------------------------------------------------------------------------
export function FadeIn({
  children,
  delay = 0,
  duration = 0.52,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// InView — scroll-triggered fade-up (sections)
// ---------------------------------------------------------------------------
export function InView({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-72px 0px" }}
      transition={{ duration: 0.52, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// InViewList / InViewListItem — staggered scroll-triggered list (cards)
// ---------------------------------------------------------------------------
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const itemVariants = (reduced: boolean | null): Variants => ({
  hidden: { opacity: 0, y: reduced ? 0 : 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
});

export function InViewList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-72px 0px" }}
      className={className}
    >
      {children}
    </motion.ul>
  );
}

export function InViewListItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.li variants={itemVariants(reduced)} className={className}>
      {children}
    </motion.li>
  );
}

// ---------------------------------------------------------------------------
// InViewGrid / InViewGridItem — same stagger but renders div (pricing grid)
// ---------------------------------------------------------------------------
export function InViewGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-72px 0px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function InViewGridItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div variants={itemVariants(reduced)} className={className}>
      {children}
    </motion.div>
  );
}
