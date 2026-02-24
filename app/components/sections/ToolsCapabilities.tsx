"use client";

import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import GlossaryTerm from "../GlossaryTerm";

const tools = [
  { name: "exec (shell)", icon: "⚡", desc: "Runs terminal commands, just like you would in a command line. Install packages, run scripts, deploy code, manage git. This is how the AI actually does things on the computer.", example: 'exec("npm install framer-motion")' },
  { name: "read / write / edit", icon: "📄", desc: "Reads, creates, and edits files. The AI can look at your code, write new files, or make precise changes to existing ones. It sees the file system like a developer would.", example: 'read("package.json")' },
  { name: "web_search", icon: "🔍", desc: "Searches the internet using Brave Search. The AI can research topics, find documentation, check current information, all without you having to paste links.", example: 'web_search("next.js 15 docs")' },
  { name: "web_fetch", icon: "🌐", desc: "Fetches a webpage and extracts the readable content as text. Like opening a URL and reading it, but the AI gets clean markdown instead of raw HTML.", example: 'web_fetch("https://docs.example.com")' },
  { name: "browser", icon: "🖥️", desc: "Controls a real web browser: click buttons, fill forms, take screenshots, navigate pages. Uses Chrome DevTools Protocol (CDP) to automate anything you could do manually.", example: 'browser.navigate("https://...")' },
  { name: "message", icon: "💬", desc: "Sends messages to your connected chat platforms (Discord, Telegram, WhatsApp, etc). Can also create polls, react to messages, manage channels.", example: 'message.send({ target: "#general" })' },
  { name: "nodes", icon: "📱", desc: "Controls paired devices like your phone or other computers. Can take photos, record screens, get location, run commands remotely. Your devices become the AI's hands.", example: 'nodes.camera_snap({ facing: "front" })' },
  { name: "canvas", icon: "🎨", desc: "Presents interactive HTML pages that the AI can edit in real-time. Think of it as a live preview window the AI can paint on.", example: 'canvas.present({ url: "..." })' },
  { name: "cron", icon: "⏰", desc: "Schedules tasks to run later or on a repeating schedule. Set reminders, run daily reports, check inboxes every hour. The AI's alarm clock.", example: 'cron.add({ schedule: "every 30m" })' },
  { name: "memory_search", icon: "🧠", desc: "Searches through the AI's memory files to recall past conversations, decisions, and context. This is how the AI remembers things across sessions.", example: 'memory_search("GoTyme proposal")' },
  { name: "sessions_spawn", icon: "🔀", desc: "Creates a new sub-agent to handle a task in parallel. Like hiring a specialist contractor. The sub-agent reports back when done.", example: 'sessions_spawn({ task: "Build website" })' },
  { name: "image", icon: "👁️", desc: "Analyzes images using a vision model. Can read screenshots, understand diagrams, describe photos, or extract text from images.", example: 'image({ path: "screenshot.png" })' },
];

const sandboxModes = [
  { mode: "off", desc: "No sandboxing — tools run directly", risk: "⚠️" },
  { mode: "non-main", desc: "Only sandbox sub-agents", risk: "🔶" },
  { mode: "all", desc: "Everything runs in containers", risk: "✅" },
];

function ToolCallExample() {
  return (
    <div className="bg-card border border-white/5 rounded-2xl overflow-hidden">
      <div className="px-5 py-3 bg-white/[0.02] border-b border-white/5 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-yellow-500" />
        <span className="text-xs text-gray-500 font-mono">Tool Execution Flow</span>
      </div>
      <div className="p-5 font-mono text-sm space-y-2">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <span className="text-yellow-500">▶ tool_start</span>
          <span className="text-gray-500"> web_search</span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="pl-4 text-gray-600">
          query: &quot;framer motion scroll animations&quot;
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }}>
          <span className="text-blue-400">⟳ tool_update</span>
          <span className="text-gray-500"> 5 results found</span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.1 }}>
          <span className="text-teal">✓ tool_end</span>
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
        <div className="space-y-10">
          {isSimple ? (
            <p className="text-gray-400 text-lg leading-relaxed">
              Your AI isn&apos;t just a chatbot — it has <GlossaryTerm term="tool">tools</GlossaryTerm>. It can run
              code, search the web, control a browser, read and write files, send messages, and even take photos with
              your phone. Each tool runs inside a safe{" "}
              <GlossaryTerm term="sandbox">sandbox</GlossaryTerm> so it can&apos;t accidentally break anything.
            </p>
          ) : (
            <p className="text-gray-400 leading-relaxed">
              <GlossaryTerm term="tool">Tools</GlossaryTerm> are executable capabilities with{" "}
              <GlossaryTerm term="streaming">streamed</GlossaryTerm> events (start/update/end). They run in Docker{" "}
              <GlossaryTerm term="sandbox">sandboxes</GlossaryTerm> with configurable scope (session/agent/shared)
              and network access (default: none). <GlossaryTerm term="cdp">CDP</GlossaryTerm> enables browser
              automation.
            </p>
          )}

          {/* Tool cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="glow-card bg-card border border-white/5 rounded-2xl p-5 hover:border-teal/20 transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{tool.icon}</span>
                  <span className="text-white font-medium text-sm">{tool.name}</span>
                </div>
                <div className="text-gray-400 text-sm leading-relaxed mb-3">{tool.desc}</div>
                <code className="text-teal/40 text-[10px] group-hover:text-teal/70 transition-colors break-all">
                  {tool.example}
                </code>
              </motion.div>
            ))}
          </div>

          <ToolCallExample />

          {/* Sandbox modes */}
          {!isSimple && (
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Sandbox Modes</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {sandboxModes.map((s) => (
                  <div key={s.mode} className="bg-card border border-white/5 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span>{s.risk}</span>
                      <code className="text-teal text-sm font-medium">{s.mode}</code>
                    </div>
                    <p className="text-gray-500 text-sm">{s.desc}</p>
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
