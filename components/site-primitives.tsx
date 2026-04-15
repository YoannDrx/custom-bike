"use client";

import type { ReactNode } from "react";
import { useEffect, useEffectEvent, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

export function Reveal({
  children,
  className,
  delay = 0,
  amount = 0.24,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
  direction?: "up" | "left" | "right";
}) {
  const reduceMotion = useReducedMotion();
  const initial =
    direction === "left"
      ? { opacity: 0, x: -42, filter: "blur(10px)" }
      : direction === "right"
        ? { opacity: 0, x: 42, filter: "blur(10px)" }
        : { opacity: 0, y: 36, filter: "blur(10px)" };

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 0 } : initial}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{
        duration: reduceMotion ? 0.18 : 0.72,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function HoverTile({
  children,
  className,
  lift = 8,
  tilt = 0,
}: {
  children: ReactNode;
  className?: string;
  lift?: number;
  tilt?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -lift,
              x: tilt === 0 ? 0 : tilt > 0 ? 2 : -2,
              rotate: tilt,
            }
      }
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 230, damping: 18 }}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({
  children,
  tone = "dark",
}: {
  children: ReactNode;
  tone?: "dark" | "light" | "accent";
}) {
  const toneClass =
    tone === "light"
      ? "eyebrow-tag eyebrow-tag-light"
      : tone === "accent"
        ? "eyebrow-tag eyebrow-tag-accent"
        : "eyebrow-tag eyebrow-tag-dark";

  return (
    <div className={toneClass}>
      <span className="eyebrow-dot" />
      <span>{children}</span>
    </div>
  );
}

export function ButtonLink({
  href,
  label,
  variant = "primary",
  external = false,
  className,
}: {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "dark" | "ghost";
  external?: boolean;
  className?: string;
}) {
  const variantClass =
    variant === "secondary"
      ? "neo-button neo-button-secondary"
      : variant === "dark"
        ? "neo-button neo-button-dark"
        : variant === "ghost"
          ? "neo-button neo-button-ghost"
          : "neo-button neo-button-primary";

  const mergedClass = className ? `${variantClass} ${className}` : variantClass;
  const content = (
    <>
      <span>{label}</span>
      <span className="neo-button-mark" />
    </>
  );
  const isExternal =
    external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  if (!isExternal) {
    return (
      <HoverTile lift={6}>
        <Link href={href} className={mergedClass}>
          {content}
        </Link>
      </HoverTile>
    );
  }

  return (
    <HoverTile lift={6}>
      <a
        href={href}
        target={external || href.startsWith("http") ? "_blank" : undefined}
        rel={external || href.startsWith("http") ? "noreferrer" : undefined}
        className={mergedClass}
      >
        {content}
      </a>
    </HoverTile>
  );
}

export function TypewriterText({
  words,
  className,
}: {
  words: string[];
  className?: string;
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const reduceMotion = useReducedMotion();

  const tick = useEffectEvent(() => {
    const currentWord = words[wordIndex] ?? "";

    if (reduceMotion) {
      setDisplayed(currentWord);
      return;
    }

    if (!deleting) {
      const next = currentWord.slice(0, displayed.length + 1);
      setDisplayed(next);

      if (next === currentWord) {
        window.setTimeout(() => setDeleting(true), 950);
      }

      return;
    }

    const next = currentWord.slice(0, Math.max(displayed.length - 1, 0));
    setDisplayed(next);

    if (next.length === 0) {
      setDeleting(false);
      setWordIndex((current) => (current + 1) % words.length);
    }
  });

  useEffect(() => {
    if (words.length === 0) {
      return;
    }

    if (reduceMotion) {
      return;
    }

    const speed = deleting ? 35 : 65;
    const timer = window.setTimeout(() => tick(), speed);

    return () => window.clearTimeout(timer);
  }, [deleting, displayed.length, reduceMotion, wordIndex, words]);

  const visibleText = reduceMotion ? (words[wordIndex] ?? "") : displayed;

  return (
    <span className={className}>
      {visibleText}
      <span className="ml-1 inline-block animate-pulse">|</span>
    </span>
  );
}
