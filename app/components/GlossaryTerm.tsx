"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { glossary } from "../data/glossary";

interface GlossaryTermProps {
  term: string;
  children?: React.ReactNode;
}

export default function GlossaryTerm({ term, children }: GlossaryTermProps) {
  const [show, setShow] = useState(false);
  const [above, setAbove] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const entry = glossary[term.toLowerCase()];
  if (!entry) return <span>{children ?? term}</span>;

  useEffect(() => {
    if (show && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setAbove(rect.top > 200);
    }
  }, [show]);

  return (
    <span
      ref={ref}
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onTouchStart={() => setShow(!show)}
    >
      <span className="text-teal border-b border-dotted border-teal/40 cursor-help hover:border-teal/70 transition-colors">
        {children ?? entry.term}
      </span>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: above ? 5 : -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 w-80 p-4 rounded-2xl bg-card border border-white/10 shadow-2xl shadow-black/50 text-sm left-1/2 -translate-x-1/2 ${
              above ? "bottom-full mb-2" : "top-full mt-2"
            }`}
          >
            <div className="font-semibold text-teal mb-1.5 text-xs uppercase tracking-wider">{entry.term}</div>
            <div className="text-gray-300 leading-relaxed">{entry.simple}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
