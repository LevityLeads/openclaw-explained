"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface SectionWrapperProps {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  children: (isSimple: boolean) => React.ReactNode;
}

export default function SectionWrapper({ id, number, title, subtitle, children }: SectionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSimple, setIsSimple] = useState(true);

  return (
    <section id={id} ref={ref} className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center gap-4 mb-2">
          <span className="text-cyan-500 font-mono text-sm">{number}</span>
          <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">{title}</h2>
        <p className="text-gray-400 text-lg mb-6">{subtitle}</p>

        <div className="flex items-center gap-3 mb-8">
          <span className="text-xs text-gray-500 uppercase tracking-wider">Explain like I&apos;m...</span>
          <button
            onClick={() => setIsSimple(true)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              isSimple ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            🧒 A beginner
          </button>
          <button
            onClick={() => setIsSimple(false)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              !isSimple ? "bg-blue-500/20 text-blue-400 border border-blue-500/40" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            🧑‍💻 Technical
          </button>
        </div>

        {children(isSimple)}
      </motion.div>
    </section>
  );
}
