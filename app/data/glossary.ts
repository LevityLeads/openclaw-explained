export interface GlossaryEntry {
  term: string;
  simple: string;
  technical: string;
}

export const glossary: Record<string, GlossaryEntry> = {
  gateway: {
    term: "Gateway",
    simple: "The brain of OpenClaw — one program that connects your AI to all your messaging apps at once.",
    technical: "A single long-lived process that owns all messaging surfaces (WhatsApp, Telegram, Discord, etc.) and routes messages to the appropriate agent session via WebSocket on 127.0.0.1:18789.",
  },
  agent: {
    term: "Agent",
    simple: "Your AI assistant. It reads messages, thinks about them, and responds — sometimes using tools to get things done.",
    technical: "An autonomous LLM-powered entity with its own workspace, state directory (agentDir), session store, and auth profiles. Runs the agent loop: intake → context assembly → model inference → tool execution → streaming replies → persistence.",
  },
  session: {
    term: "Session",
    simple: "A single conversation thread. Each chat you have with the AI is its own session with its own memory.",
    technical: "An isolated conversation with its own history. Key format: agent:<agentId>:<mainKey>. Sessions can be pruned and compacted. Runs serialized in a session lane.",
  },
  heartbeat: {
    term: "Heartbeat",
    simple: "A periodic check-in the AI does every 30 minutes — like an alarm clock that says 'anything I should be doing?'",
    technical: "Periodic agent turns in the main session (default: every 30m). Checks inboxes, calendars, runs maintenance. Returns HEARTBEAT_OK if nothing to report. State stored in memory/heartbeat-state.json.",
  },
  sandbox: {
    term: "Sandbox",
    simple: "A safe, isolated box where the AI runs code. It can't break your computer because it's locked inside a container.",
    technical: "Docker containers for tool execution. Modes: off, non-main, all. Scope: session (one container per session), agent, or shared. Default: no network access. Workspace access: none, ro, or rw.",
  },
  tool: {
    term: "Tool",
    simple: "Something the AI can actually do — like reading files, running code, searching the web, or sending messages.",
    technical: "Executable capabilities exposed to the agent. Tool events are streamed (start/update/end). Tools run in sandboxed Docker containers with configurable network and workspace access.",
  },
  "sub-agent": {
    term: "Sub-agent",
    simple: "A helper AI that the main AI creates to handle a specific task — like delegating work to a colleague.",
    technical: "A spawned agent instance for parallel task execution. Each sub-agent gets its own session. Main agent stays responsive while sub-agents work. Recommended: 1-2 for features, ~4 for cleanup.",
  },
  compaction: {
    term: "Compaction",
    simple: "When the conversation gets too long, the AI summarizes older messages to free up space — like taking notes instead of remembering every word.",
    technical: "Handles context overflow by summarizing older conversation history. Triggered when the context window approaches its limit. Preserves essential information while reducing token count.",
  },
  "context window": {
    term: "Context Window",
    simple: "The AI's short-term memory — how much of the conversation it can 'see' at once. Think of it as the AI's desk space.",
    technical: "The maximum number of tokens the LLM can process in a single inference call. Includes system prompt, conversation history, tool results, and skills. Managed via compaction when exceeded.",
  },
  binding: {
    term: "Binding",
    simple: "A rule that decides which AI agent handles which chat. Like a phone switchboard routing calls to the right person.",
    technical: "Message routing rules with priority: peer match > guildId > accountId > channel > fallback. Each binding maps incoming messages to a specific agent.",
  },
  node: {
    term: "Node",
    simple: "A device (like your Mac, iPhone, or Android) that connects to OpenClaw so the AI can see your screen, take photos, or run commands on it.",
    technical: "macOS/iOS/Android/headless clients that connect via WebSocket with role: node. Capabilities include camera, screen recording, location, and command execution.",
  },
  canvas: {
    term: "Canvas",
    simple: "A live webpage the AI can create and edit in real-time — like giving it a whiteboard it can draw on.",
    technical: "Host on port 18793 serving agent-editable HTML. Supports present/hide/navigate/eval/snapshot actions. Used for rich visual output and interactive UIs.",
  },
  websocket: {
    term: "WebSocket",
    simple: "A persistent two-way connection — like keeping a phone line open instead of hanging up and calling back each time.",
    technical: "The transport protocol for control-plane clients (127.0.0.1:18789) and node connections. Enables real-time bidirectional communication between gateway and clients.",
  },
  baileys: {
    term: "Baileys",
    simple: "The library OpenClaw uses to connect to WhatsApp — it speaks WhatsApp's language so the AI can send and receive messages there.",
    technical: "A TypeScript/JavaScript library for the WhatsApp Web multi-device API. Used by OpenClaw's gateway to interface with WhatsApp without the official Business API.",
  },
  grammy: {
    term: "grammY",
    simple: "The library OpenClaw uses to connect to Telegram — like Baileys but for Telegram.",
    technical: "A TypeScript framework for building Telegram bots. Used by OpenClaw's gateway to interface with the Telegram Bot API for message handling.",
  },
  cdp: {
    term: "CDP",
    simple: "Chrome DevTools Protocol — a way for the AI to control a web browser, like a puppet master with strings attached to Chrome.",
    technical: "Chrome DevTools Protocol. Enables programmatic browser automation — navigation, screenshots, DOM manipulation, and JavaScript evaluation. Used by the browser tool.",
  },
  "memory.md": {
    term: "MEMORY.md",
    simple: "The AI's long-term diary — important things it wants to remember across all conversations, curated over time.",
    technical: "Long-term memory file in the workspace root. Curated in main session only. Contains persistent knowledge, preferences, and important context that survives across sessions.",
  },
  "heartbeat.md": {
    term: "HEARTBEAT.md",
    simple: "A checklist the AI reads during each heartbeat to know what periodic tasks to perform.",
    technical: "Configuration file for heartbeat behavior. Defines periodic checks and maintenance tasks. Read during each heartbeat cycle alongside heartbeat-state.json.",
  },
  "system prompt": {
    term: "System Prompt",
    simple: "The AI's instruction manual — the rules and personality it follows, loaded fresh at the start of every turn.",
    technical: "Initial instructions assembled from AGENTS.md, SOUL.md, USER.md, TOOLS.md, memory files, and skills. Injected at context assembly phase of the agent loop.",
  },
  "agent loop": {
    term: "Agent Loop",
    simple: "The cycle the AI goes through for every message: read → think → act → reply → save. Rinse and repeat.",
    technical: "intake → context assembly → model inference → tool execution → streaming replies → persistence. Runs serialized per session (session lane) with optional global lane.",
  },
  "session key": {
    term: "Session Key",
    simple: "A unique ID for each conversation, like a file name for a chat thread.",
    technical: "Format: agent:<agentId>:<mainKey>. Uniquely identifies a session within the session store. Used for routing, persistence, and session lane serialization.",
  },
  workspace: {
    term: "Workspace",
    simple: "The AI's home folder — where it keeps all its files, projects, and notes.",
    technical: "The root directory for an agent's file operations. Each agent has its own workspace. Sandbox containers can mount it with none, ro, or rw access.",
  },
  "auth profile": {
    term: "Auth Profile",
    simple: "Saved login credentials the AI uses to access services — like a password manager for the AI.",
    technical: "Per-agent authentication configuration for external services. Enables agents to be fully isolated with different credentials, tools, and access levels.",
  },
  streaming: {
    term: "Streaming",
    simple: "The AI sends its response word-by-word as it thinks, instead of making you wait for the whole answer.",
    technical: "Real-time token delivery during model inference. Tool events are also streamed (start/update/end). Enables responsive UX during long operations.",
  },
  skills: {
    term: "Skills",
    simple: "Extra abilities you can plug into the AI — like apps on a phone. Each skill adds new knowledge or capabilities.",
    technical: "Loadable modules injected into the system prompt. Provide domain-specific knowledge, tool definitions, and behavioral instructions. Loaded during context assembly.",
  },
  "zombie children": {
    term: "Zombie Children",
    simple: "Sub-agents that finished their task but haven't been cleaned up yet — like completed to-do items still on the list.",
    technical: "Terminated sub-agent processes that remain in the process table. Need to be reaped by the parent agent to free resources and session state.",
  },
};

export const getGlossaryEntry = (key: string): GlossaryEntry | undefined => {
  return glossary[key.toLowerCase()];
};
