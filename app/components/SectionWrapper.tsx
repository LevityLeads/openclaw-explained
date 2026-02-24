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
    <section id={id} ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-3">
            <span className="text-teal font-mono text-sm font-medium">{number}</span>
            <div className="h-px flex-1 bg-gradient-to-r from-teal/30 to-transparent" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-3 tracking-tight">{title}</h2>
          <p className="text-gray-400 text-lg mb-8">{subtitle}</p>

          <div className="flex items-center gap-3 mb-10">
            <span className="text-xs text-gray-600 uppercase tracking-widest font-medium">Explain like I&apos;m...</span>
            <button
              onClick={() => setIsSimple(true)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                isSimple
                  ? "bg-teal/15 text-teal border border-teal/30 shadow-[0_0_12px_rgba(92,229,213,0.1)]"
                  : "text-gray-500 hover:text-gray-300 border border-transparent hover:border-white/10"
              }`}
            >
              🧒 A beginner
            </button>
            <button
              onClick={() => setIsSimple(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                !isSimple
                  ? "bg-blue-500/15 text-blue-400 border border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.1)]"
                  : "text-gray-500 hover:text-gray-300 border border-transparent hover:border-white/10"
              }`}
            >
              🧑‍💻 Technical
            </button>
          </div>

          {children(isSimple)}
        </motion.div>
      </div>
    </section>
  );
}
