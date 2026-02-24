"use client";

import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import GlossaryTerm from "../GlossaryTerm";

interface TreeNode {
  label: string;
  color: string;
  children?: TreeNode[];
}

const tree: TreeNode = {
  label: "Main Agent",
  color: "#5CE5D5",
  children: [
    {
      label: "Build Website",
      color: "#3b82f6",
      children: [
        { label: "Design System", color: "#8b5cf6" },
        { label: "Components", color: "#8b5cf6" },
      ],
    },
    {
      label: "Research API",
      color: "#3b82f6",
      children: [
        { label: "Read Docs", color: "#8b5cf6" },
        { label: "Test Endpoints", color: "#8b5cf6" },
      ],
    },
    {
      label: "Draft Email",
      color: "#3b82f6",
    },
  ],
};

function TreeVisualization() {
  const nodeW = 110, nodeH = 32, gapX = 130, gapY = 80;
  const svgW = 580, svgH = 300;

  type Pos = { x: number; y: number; label: string; color: string; parentX?: number; parentY?: number };
  const nodes: Pos[] = [];

  const rootX = svgW / 2, rootY = 40;
  nodes.push({ x: rootX, y: rootY, label: tree.label, color: tree.color });

  if (tree.children) {
    const l1Count = tree.children.length;
    const l1Start = rootX - ((l1Count - 1) * gapX) / 2;

    tree.children.forEach((child, i) => {
      const cx = l1Start + i * gapX;
      const cy = rootY + gapY;
      nodes.push({ x: cx, y: cy, label: child.label, color: child.color, parentX: rootX, parentY: rootY });

      if (child.children) {
        const l2Count = child.children.length;
        const l2Start = cx - ((l2Count - 1) * 70) / 2;
        child.children.forEach((gc, j) => {
          nodes.push({
            x: l2Start + j * 70, y: cy + gapY,
            label: gc.label, color: gc.color, parentX: cx, parentY: cy,
          });
        });
      }
    });
  }

  return (
    <div className="flex justify-center overflow-x-auto">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-xl">
        {nodes.filter(n => n.parentX !== undefined).map((n, i) => (
          <motion.line
            key={`line-${i}`}
            x1={n.parentX} y1={(n.parentY ?? 0) + nodeH / 2}
            x2={n.x} y2={n.y - nodeH / 2 + 4}
            stroke={n.color} strokeWidth={1} opacity={0.3}
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.g
            key={`node-${i}`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <rect
              x={n.x - nodeW / 2} y={n.y - nodeH / 2}
              width={nodeW} height={nodeH} rx={12}
              fill={n.color + "10"} stroke={n.color} strokeWidth={1}
            />
            <text
              x={n.x} y={n.y + 4} textAnchor="middle"
              fill="#e5e7eb" fontSize={10} fontWeight={500}
            >
              {n.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

export default function MultiAgent() {
  return (
    <SectionWrapper
      id="multi-agent"
      number="05"
      title="Multi-Agent"
      subtitle="One agent spawns others. Work fans out, results flow back."
    >
      {(isSimple) => (
        <div className="space-y-10">
          {isSimple ? (
            <p className="text-gray-400 text-lg leading-relaxed">
              When a task is too big or too slow for one AI, the main{" "}
              <GlossaryTerm term="agent">agent</GlossaryTerm> can create{" "}
              <GlossaryTerm term="sub-agent">sub-agents</GlossaryTerm> — helpers that work on specific pieces
              in parallel. It&apos;s like a manager delegating tasks to a team. When they finish, the results flow
              back. Sometimes finished sub-agents linger as{" "}
              <GlossaryTerm term="zombie children">zombie children</GlossaryTerm> until they&apos;re cleaned up.
            </p>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-400 leading-relaxed">
                Each <GlossaryTerm term="agent">agent</GlossaryTerm> has its own{" "}
                <GlossaryTerm term="workspace">workspace</GlossaryTerm>, state directory, and{" "}
                <GlossaryTerm term="session">session</GlossaryTerm> store.{" "}
                <GlossaryTerm term="auth profile">Auth profiles</GlossaryTerm> are per-agent.{" "}
                <GlossaryTerm term="binding">Bindings</GlossaryTerm> route messages with priority: peer match &gt;
                guildId &gt; accountId &gt; channel &gt; fallback.
              </p>
              <div className="bg-card border border-white/5 rounded-2xl p-5 font-mono text-sm text-gray-400">
                <div className="text-gray-600 mb-2"># Binding priority</div>
                <div>1. <span className="text-teal">peer match</span> → exact user/chat match</div>
                <div>2. <span className="text-blue-400">guildId</span> → server/group match</div>
                <div>3. <span className="text-purple-400">accountId</span> → account-level match</div>
                <div>4. <span className="text-yellow-400">channel</span> → platform match</div>
                <div>5. <span className="text-gray-600">fallback</span> → catch-all</div>
              </div>
            </div>
          )}

          <TreeVisualization />
        </div>
      )}
    </SectionWrapper>
  );
}
