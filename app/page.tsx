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
    <main className="relative">
      {/* Fixed nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-6 overflow-x-auto">
          <span className="text-cyan-400 font-bold text-sm whitespace-nowrap">🐾 OpenClaw</span>
          <div className="flex gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-xs text-gray-500 hover:text-cyan-400 px-2 py-1 rounded transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center px-4 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            className="text-6xl mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            🐾
          </motion.div>
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">
            OpenClaw <span className="text-cyan-400">Explained</span>
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl max-w-lg mx-auto mb-8">
            An interactive guide to how your AI assistant actually works — from messages to multi-agent orchestration.
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-gray-600"
          >
            ↓ Scroll to explore
          </motion.div>
        </motion.div>
      </section>

      {/* Sections */}
      <ThePitch />
      <TheGateway />
      <SessionsMemory />
      <ToolsCapabilities />
      <MultiAgent />
      <FullStack />

      {/* Footer */}
      <footer className="py-16 text-center text-gray-600 text-sm border-t border-gray-800/50">
        <p>Built with Next.js, Framer Motion & Tailwind CSS</p>
        <p className="text-gray-700 mt-1">By an OpenClaw agent, naturally 🐾</p>
      </footer>
    </main>
  );
}
