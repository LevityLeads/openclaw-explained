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
      <span className="text-cyan-400 border-b border-dotted border-cyan-400/50 cursor-help">
        {children ?? entry.term}
      </span>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: above ? 5 : -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 w-72 p-3 rounded-lg bg-gray-900 border border-cyan-500/30 shadow-lg shadow-cyan-500/10 text-sm text-gray-200 left-1/2 -translate-x-1/2 ${
              above ? "bottom-full mb-2" : "top-full mt-2"
            }`}
          >
            <div className="font-semibold text-cyan-400 mb-1">{entry.term}</div>
            <div className="text-gray-300 leading-relaxed">{entry.simple}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
