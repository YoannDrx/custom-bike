"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({
  items,
  tone = "dark",
}: {
  items: FaqItem[];
  tone?: "dark" | "light";
}) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-stack">
      {items.map((item, index) => {
        const open = openIndex === index;

        return (
          <motion.div
            key={item.question}
            className={`faq-item ${tone === "light" ? "faq-item-light" : ""}`}
            whileHover={{ x: tone === "light" ? 0 : 4 }}
          >
            <button
              type="button"
              className="faq-trigger"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? -1 : index)}
            >
              <span>{item.question}</span>
              <span className={`faq-plus ${open ? "faq-plus-open" : ""}`}>+</span>
            </button>

            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="faq-answer">{item.answer}</div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
