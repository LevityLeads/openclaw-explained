"use client";

import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import GlossaryTerm from "../GlossaryTerm";

const channels = [
  { name: "WhatsApp", icon: "💬", color: "#25D366", lib: "Baileys" },
  { name: "Telegram", icon: "✈️", color: "#26A5E4", lib: "grammY" },
  { name: "Discord", icon: "🎮", color: "#5865F2", lib: "discord.js" },
  { name: "Slack", icon: "💼", color: "#E01E5A", lib: "Bolt" },
  { name: "Signal", icon: "🔒", color: "#3A76F0", lib: "signal-cli" },
  { name: "iMessage", icon: "🍎", color: "#34C759", lib: "BlueBubbles" },
  { name: "WebChat", icon: "🌐", color: "#5CE5D5", lib: "Built-in" },
];

function HubVisualization() {
  const cx = 200, cy = 200, r = 150;
  return (
    <div className="flex justify-center">
      <svg viewBox="0 0 400 400" className="w-full max-w-md">
        <motion.circle
          cx={cx} cy={cy} r={40}
          fill="none" stroke="#5CE5D5" strokeWidth={1.5}
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.text
          x={cx} y={cy - 5} textAnchor="middle" fill="#5CE5D5" fontSize={11} fontWeight="bold"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        >
          Gateway
        </motion.text>
        <motion.text
          x={cx} y={cy + 10} textAnchor="middle" fill="#666666" fontSize={9}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        >
          :18789
        </motion.text>

        {channels.map((ch, i) => {
          const angle = (i / channels.length) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;
          return (
            <g key={ch.name}>
              <motion.line
                x1={cx} y1={cy} x2={x} y2={y}
                stroke={ch.color} strokeWidth={1} strokeDasharray="4 4" opacity={0.3}
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              />
              <motion.circle
                cx={x} cy={y} r={28} fill={ch.color + "10"} stroke={ch.color} strokeWidth={1}
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: 0.7 + i * 0.1, type: "spring" }}
              />
              <text x={x} y={y - 5} textAnchor="middle" fontSize={14}>{ch.icon}</text>
              <text x={x} y={y + 10} textAnchor="middle" fill="#e5e7eb" fontSize={8}>{ch.name}</text>
            </g>
          );
        })}

        {channels.map((ch, i) => {
          const angle = (i / channels.length) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;
          return (
            <motion.circle
              key={`pulse-${i}`}
              r={3} fill={ch.color}
              initial={{ cx: x, cy: y, opacity: 0 }}
              animate={{ cx: [x, cx], cy: [y, cy], opacity: [1, 0] }}
              transition={{ delay: 2 + i * 0.3, duration: 1.2, repeat: Infinity, repeatDelay: 4 }}
            />
          );
        })}
      </svg>
    </div>
  );
}

export default function TheGateway() {
  return (
    <SectionWrapper
      id="gateway"
      number="02"
      title="The Gateway"
      subtitle="One process to connect them all."
    >
      {(isSimple) => (
        <div className="space-y-10">
          {isSimple ? (
            <p className="text-gray-400 text-lg leading-relaxed">
              The <GlossaryTerm term="gateway">Gateway</GlossaryTerm> is the central hub. It&apos;s one program that
              stays running and connects to all your messaging apps simultaneously. When a message arrives on any
              platform, the Gateway catches it and hands it to your AI. When the AI replies, the Gateway sends it back
              through the right app.
            </p>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-400 leading-relaxed">
                The <GlossaryTerm term="gateway">Gateway</GlossaryTerm> is a single long-lived process. Control-plane
                clients connect via <GlossaryTerm term="websocket">WebSocket</GlossaryTerm> on{" "}
                <code className="text-teal bg-teal/10 px-1.5 py-0.5 rounded-md text-xs">127.0.0.1:18789</code>.{" "}
                <GlossaryTerm term="node">Nodes</GlossaryTerm> connect with{" "}
                <code className="text-teal bg-teal/10 px-1.5 py-0.5 rounded-md text-xs">role: node</code>.{" "}
                <GlossaryTerm term="canvas">Canvas</GlossaryTerm> is hosted on port 18793.
              </p>
              <div className="bg-card border border-white/5 rounded-2xl p-5 font-mono text-sm text-gray-400">
                <div className="text-gray-600 mb-2"># Gateway process</div>
                <div><span className="text-teal">WebSocket</span> control-plane → <span className="text-gray-300">127.0.0.1:18789</span></div>
                <div><span className="text-teal">Canvas</span> host → <span className="text-gray-300">127.0.0.1:18793</span></div>
                <div><span className="text-teal">Adapters</span> → Baileys, grammY, discord.js, Bolt...</div>
              </div>
            </div>
          )}

          <HubVisualization />
        </div>
      )}
    </SectionWrapper>
  );
}
