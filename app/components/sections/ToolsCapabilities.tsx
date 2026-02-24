"use client";

import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import GlossaryTerm from "../GlossaryTerm";

const tools = [
  { name: "exec", icon: "⚡", desc: "Run shell commands", example: 'exec("npm install framer-motion")' },
  { name: "read/write", icon: "📄", desc: "Read & write files", example: 'read("package.json")' },
  { name: "web_search", icon: "🔍", desc: "Search the web", example: 'web_search("next.js 15 docs")' },
  { name: "web_fetch", icon: "🌐", desc: "Fetch & extract pages", example: 'web_fetch("https://docs.example.com")' },
  { name: "browser", icon: "🖥️", desc: "Control a browser via CDP", example: 'browser.navigate("https://...")' },
  { name: "message", icon: "💬", desc: "Send messages", example: 'message.send({ target: "#general" })' },
  { name: "nodes", icon: "📱", desc: "Control paired devices", example: 'nodes.camera_snap({ facing: "front" })' },
  { name: "canvas", icon: "🎨", desc: "Present live HTML", example: 'canvas.present({ url: "..." })' },
];

const sandboxModes = [
  { mode: "off", desc: "No sandboxing — tools run directly", risk: "⚠️" },
  { mode: "non-main", desc: "Only sandbox sub-agents", risk: "🔶" },
  { mode: "all", desc: "Everything runs in containers", risk: "✅" },
];

function ToolCallExample() {
  return (
    <div className="bg-gray-900/80 border border-gray-800 rounded-lg overflow-hidden">
      <div className="px-4 py-2 bg-gray-800/50 border-b border-gray-800 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-yellow-500" />
        <span className="text-xs text-gray-400 font-mono">Tool Execution Flow</span>
      </div>
      <div className="p-4 font-mono text-sm space-y-2">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <span className="text-yellow-500">▶ tool_start</span>
          <span className="text-gray-500"> web_search</span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="pl-4 text-gray-500">
          query: &quot;framer motion scroll animations&quot;
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }}>
          <span className="text-blue-400">⟳ tool_update</span>
          <span className="text-gray-500"> 5 results found</span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.1 }}>
          <span className="text-green-500">✓ tool_end</span>
          <span className="text-gray-500"> 340ms</span>
        </motion.div>
      </div>
    </div>
  );
}

export default function ToolsCapabilities() {
  return (
    <SectionWrapper
      id="tools"
      number="04"
      title="Tools & Capabilities"
      subtitle="The agent can DO things — not just talk about them."
    >
      {(isSimple) => (
        <div className="space-y-8">
          {isSimple ? (
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              Your AI isn&apos;t just a chatbot — it has <GlossaryTerm term="tool">tools</GlossaryTerm>. It can run
              code, search the web, control a browser, read and write files, send messages, and even take photos with
              your phone. Each tool runs inside a safe{" "}
              <GlossaryTerm term="sandbox">sandbox</GlossaryTerm> so it can&apos;t accidentally break anything.
            </p>
          ) : (
            <p className="text-gray-300 leading-relaxed max-w-2xl">
              <GlossaryTerm term="tool">Tools</GlossaryTerm> are executable capabilities with{" "}
              <GlossaryTerm term="streaming">streamed</GlossaryTerm> events (start/update/end). They run in Docker{" "}
              <GlossaryTerm term="sandbox">sandboxes</GlossaryTerm> with configurable scope (session/agent/shared)
              and network access (default: none). <GlossaryTerm term="cdp">CDP</GlossaryTerm> enables browser
              automation.
            </p>
          )}

          {/* Tool cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 hover:border-cyan-500/30 transition-all group"
              >
                <div className="text-2xl mb-2">{tool.icon}</div>
                <div className="text-white font-medium text-sm">{tool.name}</div>
                <div className="text-gray-500 text-xs mb-2">{tool.desc}</div>
                <code className="text-cyan-400/60 text-[10px] group-hover:text-cyan-400 transition-colors break-all">
                  {tool.example}
                </code>
              </motion.div>
            ))}
          </div>

          <ToolCallExample />

          {/* Sandbox modes */}
          {!isSimple && (
            <div>
              <h3 className="text-white font-semibold mb-3">Sandbox Modes</h3>
              <div className="grid sm:grid-cols-3 gap-3">
                {sandboxModes.map((s) => (
                  <div key={s.mode} className="bg-gray-900/50 border border-gray-800 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span>{s.risk}</span>
                      <code className="text-cyan-400 text-sm">{s.mode}</code>
                    </div>
                    <p className="text-gray-500 text-xs">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </SectionWrapper>
  );
}
