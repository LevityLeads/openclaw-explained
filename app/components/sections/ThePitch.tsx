"use client";

import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import GlossaryTerm from "../GlossaryTerm";

const messages = [
  { from: "user", text: "Hey, what's on my calendar today?", app: "WhatsApp" },
  { from: "ai", text: "You've got a standup at 10am, lunch with Sarah at 1pm, and a dentist at 4pm. Want me to cancel the dentist? 😬" },
  { from: "user", text: "Reschedule it to Friday", app: "Telegram" },
  { from: "ai", text: "Done! Moved to Friday 4pm. I also emailed the dentist's office to confirm." },
];

function PhoneMockup({ app, children }: { app: string; children: React.ReactNode }) {
  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="rounded-[2rem] border border-white/10 bg-card p-2 shadow-2xl shadow-black/30">
        <div className="rounded-[1.5rem] bg-dark overflow-hidden">
          <div className="bg-white/5 px-4 py-2.5 flex items-center gap-2 border-b border-white/5">
            <div className="w-2 h-2 rounded-full bg-teal" />
            <span className="text-xs text-gray-400 font-medium">{app}</span>
            <span className="text-xs text-gray-600 ml-auto">OpenClaw Agent</span>
          </div>
          <div className="p-4 space-y-3 min-h-[280px]">{children}</div>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ from, text, delay }: { from: string; text: string; delay: number }) {
  const isUser = from === "user";
  return (
    <motion.div
      initial={{ opacity: 0, x: isUser ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isUser ? "bg-teal/20 text-teal rounded-br-md" : "bg-white/5 text-gray-200 rounded-bl-md"
        }`}
      >
        {text}
      </div>
    </motion.div>
  );
}

export default function ThePitch() {
  return (
    <SectionWrapper
      id="pitch"
      number="01"
      title="The 30-Second Pitch"
      subtitle="You message your AI from any app. It messages back."
    >
      {(isSimple) => (
        <div className="space-y-10">
          {isSimple ? (
            <p className="text-gray-400 text-lg leading-relaxed">
              Imagine texting an AI assistant that works across <em className="text-gray-300 not-italic">all</em> your messaging apps — WhatsApp, Telegram,
              Discord, Slack, Signal, iMessage. You don&apos;t need a special app. Just message it wherever you already
              are. It reads your messages, thinks, acts, and replies. That&apos;s{" "}
              <span className="text-teal font-semibold">OpenClaw</span>.
            </p>
          ) : (
            <p className="text-gray-400 text-lg leading-relaxed">
              OpenClaw&apos;s <GlossaryTerm term="gateway">Gateway</GlossaryTerm> connects to messaging platforms via
              protocol-specific adapters (<GlossaryTerm term="baileys">Baileys</GlossaryTerm> for WhatsApp,{" "}
              <GlossaryTerm term="grammy">grammY</GlossaryTerm> for Telegram, native APIs for Discord/Slack/Signal).
              Each incoming message is routed via <GlossaryTerm term="binding">bindings</GlossaryTerm> to the
              appropriate <GlossaryTerm term="agent">agent</GlossaryTerm>{" "}
              <GlossaryTerm term="session">session</GlossaryTerm>, which runs the full{" "}
              <GlossaryTerm term="agent loop">agent loop</GlossaryTerm>.
            </p>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            <PhoneMockup app="WhatsApp">
              {messages.slice(0, 2).map((m, i) => (
                <ChatBubble key={i} from={m.from} text={m.text} delay={i * 0.5} />
              ))}
            </PhoneMockup>
            <PhoneMockup app="Telegram">
              {messages.slice(2).map((m, i) => (
                <ChatBubble key={i} from={m.from} text={m.text} delay={i * 0.5 + 0.3} />
              ))}
            </PhoneMockup>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-center text-gray-600 text-sm"
          >
            Same AI. Different apps. One conversation.
          </motion.div>
        </div>
      )}
    </SectionWrapper>
  );
}
