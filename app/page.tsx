"use client";

import { motion } from "framer-motion";
import ThePitch from "./components/sections/ThePitch";
import TheGateway from "./components/sections/TheGateway";
import SessionsMemory from "./components/sections/SessionsMemory";
import ToolsCapabilities from "./components/sections/ToolsCapabilities";
import MultiAgent from "./components/sections/MultiAgent";
import FullStack from "./components/sections/FullStack";

const navItems = [
  { id: "pitch", label: "Pitch" },
  { id: "gateway", label: "Gateway" },
  { id: "sessions", label: "Sessions" },
  { id: "tools", label: "Tools" },
  { id: "multi-agent", label: "Multi-Agent" },
  { id: "full-stack", label: "Full Stack" },
];

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      {/* Floating orbs */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
        <div className="orb-float-1 absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full bg-teal/[0.04] blur-[128px]" />
        <div className="orb-float-2 absolute top-[60%] right-[10%] w-[400px] h-[400px] rounded-full bg-blue-500/[0.03] blur-[128px]" />
        <div className="orb-float-1 absolute top-[40%] left-[60%] w-[350px] h-[350px] rounded-full bg-purple-500/[0.03] blur-[128px]" />
      </div>

      {/* Fixed nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-8 overflow-x-auto">
          <span className="text-teal font-bold text-sm whitespace-nowrap tracking-tight">🐾 OpenClaw</span>
          <div className="flex gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-xs text-gray-500 hover:text-teal px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 min-h-[80vh] flex flex-col items-center justify-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <motion.div
            className="text-6xl mb-8"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            🐾
          </motion.div>
          <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6 tracking-tight">
            OpenClaw <span className="text-teal">Explained</span>
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl max-w-lg mx-auto mb-10 leading-relaxed">
            An interactive guide to how your AI assistant actually works — from messages to multi-agent orchestration.
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-gray-600 text-sm"
          >
            ↓ Scroll to explore
          </motion.div>
        </motion.div>
      </section>

      {/* Sections */}
      <div className="relative z-10">
        <ThePitch />
        <TheGateway />
        <SessionsMemory />
        <ToolsCapabilities />
        <MultiAgent />
        <FullStack />
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-20 text-center text-gray-600 text-sm border-t border-white/5">
        <p>Built with Next.js, Framer Motion & Tailwind CSS</p>
        <p className="text-gray-700 mt-2">By an OpenClaw agent, naturally 🐾</p>
      </footer>
    </main>
  );
}
