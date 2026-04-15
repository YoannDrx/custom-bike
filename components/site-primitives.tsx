"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

export function Reveal({
  children,
  className,
  delay = 0,
  amount = 0.22,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
  direction?: "up" | "left" | "right";
}) {
  const initial =
    direction === "left"
      ? { opacity: 0, x: -42, filter: "blur(14px)" }
      : direction === "right"
        ? { opacity: 0, x: 42, filter: "blur(14px)" }
        : { opacity: 0, y: 36, filter: "blur(14px)" };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.82, delay, ease: [0.22, 1, 0.36, 1] }}
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
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={`eyebrow-tag ${tone === "light" ? "eyebrow-tag-light" : "eyebrow-tag-dark"}`}
    >
      <span className="eyebrow-dot" />
      <span>{children}</span>
    </div>
  );
}

export function ButtonLink({
  href,
  label,
  variant = "dark",
  external = false,
  className,
}: {
  href: string;
  label: string;
  variant?: "dark" | "light" | "ghost";
  external?: boolean;
  className?: string;
}) {
  const style =
    variant === "light"
      ? "button-premium button-premium-light"
      : variant === "ghost"
        ? "button-premium button-premium-ghost"
        : "button-premium button-premium-dark";

  const buttonContent = (
    <>
      <span>{label}</span>
      <span className="button-premium-mark" />
    </>
  );

  const isExternal =
    external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  if (!isExternal) {
    return (
      <motion.span whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.985 }}>
        <Link href={href} className={className ? `${style} ${className}` : style}>
          {buttonContent}
        </Link>
      </motion.span>
    );
  }

  return (
    <motion.a
      href={href}
      target={external || href.startsWith("http") ? "_blank" : undefined}
      rel={external || href.startsWith("http") ? "noreferrer" : undefined}
      className={className ? `${style} ${className}` : style}
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
    >
      {buttonContent}
    </motion.a>
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

  useEffect(() => {
    const currentWord = words[wordIndex];
    const speed = deleting ? 36 : 62;

    const timer = window.setTimeout(() => {
      if (!deleting) {
        const nextValue = currentWord.slice(0, displayed.length + 1);
        setDisplayed(nextValue);

        if (nextValue === currentWord) {
          window.setTimeout(() => setDeleting(true), 900);
        }
      } else {
        const nextValue = currentWord.slice(0, Math.max(displayed.length - 1, 0));
        setDisplayed(nextValue);

        if (nextValue.length === 0) {
          setDeleting(false);
          setWordIndex((current) => (current + 1) % words.length);
        }
      }
    }, speed);

    return () => window.clearTimeout(timer);
  }, [deleting, displayed, wordIndex, words]);

  return (
    <span className={className}>
      {displayed}
      <span className="type-caret">|</span>
    </span>
  );
}

export function Stars() {
  return (
    <div className="flex gap-1 text-[#d69a41]">
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index}>*</span>
      ))}
    </div>
  );
}
