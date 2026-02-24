"use client";

import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import GlossaryTerm from "../GlossaryTerm";

const layers = [
  { label: "Messaging Platforms", items: ["WhatsApp", "Telegram", "Discord", "Slack", "Signal", "iMessage", "WebChat"], color: "#5CE5D5", icon: "💬" },
  { label: "Gateway", items: ["Message routing", "WebSocket :18789", "Canvas :18793", "Adapter layer"], color: "#3b82f6", icon: "🌐" },
  { label: "Agent Layer", items: ["Agent loop", "Session management", "Binding resolution", "Multi-agent orchestration"], color: "#8b5cf6", icon: "🤖" },
  { label: "Intelligence", items: ["LLM inference", "Context assembly", "Skills injection", "Streaming responses"], color: "#a855f7", icon: "🧠" },
  { label: "Tools & Execution", items: ["Shell exec", "Browser (CDP)", "File I/O", "Web search", "Device nodes", "Canvas"], color: "#f59e0b", icon: "⚡" },
  { label: "Persistence", items: ["MEMORY.md", "Daily logs", "Session store", "Heartbeat state", "Workspace files"], color: "#10b981", icon: "💾" },
  { label: "Infrastructure", items: ["Docker sandboxes", "Node connections", "Auth profiles", "Compaction engine"], color: "#ef4444", icon: "🏗️" },
];

export default function FullStack() {
  return (
    <SectionWrapper
      id="full-stack"
      number="06"
      title="The Full Stack"
      subtitle="Everything connected. The complete picture."
    >
      {(isSimple) => (
        <div className="space-y-10">
          {isSimple ? (
            <p className="text-gray-400 text-lg leading-relaxed">
              Here&apos;s the full picture: messages come in from your apps, flow through the{" "}
              <GlossaryTerm term="gateway">Gateway</GlossaryTerm>, get routed to an{" "}
              <GlossaryTerm term="agent">agent</GlossaryTerm>, which thinks and acts using{" "}
              <GlossaryTerm term="tool">tools</GlossaryTerm>, then replies back through the same path. Everything is
              persisted, sandboxed, and orchestrated by the <GlossaryTerm term="agent loop">agent loop</GlossaryTerm>.
            </p>
          ) : (
            <p className="text-gray-400 leading-relaxed">
              The full architecture: messaging adapters → <GlossaryTerm term="gateway">Gateway</GlossaryTerm> (
              <GlossaryTerm term="websocket">WebSocket</GlossaryTerm> control plane) →{" "}
              <GlossaryTerm term="binding">binding</GlossaryTerm> resolution →{" "}
              <GlossaryTerm term="session">session</GlossaryTerm> lane →{" "}
              <GlossaryTerm term="agent loop">agent loop</GlossaryTerm> (intake → context assembly →{" "}
              <GlossaryTerm term="skills">skills</GlossaryTerm> injection → inference →{" "}
              <GlossaryTerm term="tool">tool</GlossaryTerm> execution →{" "}
              <GlossaryTerm term="streaming">streaming</GlossaryTerm> → persistence) →{" "}
              <GlossaryTerm term="compaction">compaction</GlossaryTerm> on overflow.
            </p>
          )}

          <div className="space-y-3">
            {layers.map((layer, i) => (
              <motion.div
                key={layer.label}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="bg-card border border-white/5 rounded-2xl p-5 hover:scale-[1.005] transition-transform"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">{layer.icon}</span>
                  <span className="font-semibold text-white">{layer.label}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {layer.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-3 py-1 rounded-full border"
                      style={{ borderColor: layer.color + "30", color: layer.color, backgroundColor: layer.color + "08" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <motion.div
              className="flex flex-col items-center gap-1 text-gray-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {["↓ Messages in", "↓ Route & assemble", "↓ Think & decide", "↓ Execute tools", "↓ Persist & reply", "↑ Response out"].map((label, i) => (
                <motion.div
                  key={label}
                  className="text-xs font-mono"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + i * 0.15 }}
                >
                  {label}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}
