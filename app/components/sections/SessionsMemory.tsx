"use client";

import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import GlossaryTerm from "../GlossaryTerm";

const timelineEvents = [
  { time: "09:00", label: "Message received", type: "intake" },
  { time: "09:00", label: "Context assembled", type: "context" },
  { time: "09:01", label: "Model inference", type: "inference" },
  { time: "09:01", label: "Tool: read calendar", type: "tool" },
  { time: "09:02", label: "Reply streamed", type: "reply" },
  { time: "09:02", label: "Session persisted", type: "persist" },
  { time: "09:30", label: "Heartbeat check", type: "heartbeat" },
  { time: "09:30", label: "HEARTBEAT_OK", type: "persist" },
];

const memoryFiles = [
  { name: "MEMORY.md", desc: "Long-term curated knowledge", icon: "🧠", color: "teal" },
  { name: "memory/2026-02-24.md", desc: "Today's raw logs", icon: "📝", color: "blue" },
  { name: "HEARTBEAT.md", desc: "Periodic check config", icon: "💓", color: "purple" },
  { name: "heartbeat-state.json", desc: "Last heartbeat state", icon: "⚡", color: "yellow" },
];

export default function SessionsMemory() {
  return (
    <SectionWrapper
      id="sessions"
      number="03"
      title="Sessions & Memory"
      subtitle="Every conversation is a session. Every session remembers."
    >
      {(isSimple) => (
        <div className="space-y-12">
          {isSimple ? (
            <p className="text-gray-400 text-lg leading-relaxed">
              Each chat you have with the AI is a <GlossaryTerm term="session">session</GlossaryTerm> — a separate
              conversation with its own history. The AI also has different types of memory: a daily journal, a long-term
              diary (<GlossaryTerm term="memory.md">MEMORY.md</GlossaryTerm>), and periodic check-ins called{" "}
              <GlossaryTerm term="heartbeat">heartbeats</GlossaryTerm>. When conversations get too long, the AI uses{" "}
              <GlossaryTerm term="compaction">compaction</GlossaryTerm> to summarize and free up space in its{" "}
              <GlossaryTerm term="context window">context window</GlossaryTerm>.
            </p>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-400 leading-relaxed">
                Each <GlossaryTerm term="session">session</GlossaryTerm> is isolated with key format{" "}
                <code className="text-teal bg-teal/10 px-1.5 py-0.5 rounded-md text-xs">agent:&lt;agentId&gt;:&lt;mainKey&gt;</code>.
                The <GlossaryTerm term="agent loop">agent loop</GlossaryTerm> runs serialized per session (session lane)
                with an optional global lane. <GlossaryTerm term="compaction">Compaction</GlossaryTerm> triggers on
                context overflow.
              </p>
              <div className="bg-card border border-white/5 rounded-2xl p-5 font-mono text-sm text-gray-400">
                <div className="text-gray-600 mb-2"># Session key examples</div>
                <div>agent:<span className="text-teal">main</span>:<span className="text-blue-400">discord:channel:1234567890</span></div>
                <div>agent:<span className="text-teal">main</span>:<span className="text-blue-400">whatsapp:chat:27821234567</span></div>
                <div>agent:<span className="text-teal">main</span>:<span className="text-blue-400">subagent:a1b2c3d4</span></div>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-lg">Session Timeline</h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-white/5" />
              {timelineEvents.map((evt, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-4 mb-3 pl-2"
                >
                  <div className={`w-3 h-3 rounded-full z-10 ring-4 ring-dark ${
                    evt.type === "tool" ? "bg-yellow-500" :
                    evt.type === "heartbeat" ? "bg-purple-500" :
                    evt.type === "inference" ? "bg-blue-500" :
                    "bg-teal"
                  }`} />
                  <span className="text-gray-600 font-mono text-xs w-12">{evt.time}</span>
                  <span className="text-gray-300 text-sm">{evt.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Memory files */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-lg">Memory System</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {memoryFiles.map((file, i) => (
                <motion.div
                  key={file.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="glow-card bg-card border border-white/5 rounded-2xl p-5 hover:border-teal/20 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{file.icon}</span>
                    <code className="text-teal text-sm font-medium">{file.name}</code>
                  </div>
                  <p className="text-gray-500 text-sm">{file.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}
