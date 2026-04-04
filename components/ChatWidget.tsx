"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Zap, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatWidgetProps {
  jobContext?: string;
  variant?: "floating" | "sidebar";
}

export function ChatWidget({ jobContext, variant = "floating" }: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey! I'm VoltSpec AI — I can help with NEC code questions, Austin Energy requirements, material sizing, and more. What do you need? ⚡\n\n⚠️ I'm a reference tool only — always verify with your AHJ.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, context: jobContext }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || data.error || "Sorry, something went wrong." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error. Check your network and try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const chatPanel = (
    <div className="bg-[hsl(222,47%,9%)] border border-[hsl(217,33%,22%)] rounded-xl shadow-2xl shadow-black/60 flex flex-col overflow-hidden"
      style={{ height: "380px" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 bg-[hsl(222,47%,11%)] border-b border-[hsl(217,33%,20%)]">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
          <span className="font-semibold text-white text-xs">VoltSpec AI</span>
          {jobContext && (
            <span className="text-xs text-gray-500 truncate max-w-[100px]">· {jobContext}</span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(false)}
          className="h-6 w-6 text-gray-500 hover:text-white"
        >
          <X className="w-3.5 h-3.5" />
        </Button>
      </div>
      {/* Disclaimer */}
      <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-900/20 border-b border-amber-900/30 text-amber-400 text-xs">
        <AlertTriangle className="w-3 h-3 shrink-0" />
        Reference only — verify with AHJ
      </div>
      {/* Messages */}
      <ScrollArea className="flex-1 px-3 py-2">
        <div className="space-y-2">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-yellow-400 text-gray-900 font-medium"
                  : "bg-[hsl(217,33%,16%)] text-gray-200"
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-[hsl(217,33%,16%)] text-gray-400 rounded-xl px-3 py-2 text-sm">
                <span className="flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce [animation-delay:300ms]" />
                </span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>
      {/* Input */}
      <div className="px-3 py-2 border-t border-[hsl(217,33%,20%)] flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a code question…"
          rows={1}
          className="resize-none text-xs bg-[hsl(217,33%,13%)] border-[hsl(217,33%,22%)] text-white placeholder-gray-600 focus:ring-yellow-400 focus:border-yellow-400 min-h-[34px] max-h-[80px]"
        />
        <Button
          onClick={sendMessage}
          disabled={!input.trim() || loading}
          size="icon"
          className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 shrink-0 disabled:opacity-40 h-[34px] w-[34px]"
        >
          <Send className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );

  // ── SIDEBAR VARIANT ──────────────────────────────────────────────────────
  if (variant === "sidebar") {
    return (
      <div className="no-print flex flex-col gap-2">
        <Button
          onClick={() => setOpen(!open)}
          className={`w-full h-10 font-semibold text-sm transition-colors duration-150 ${
            open
              ? "bg-yellow-400/20 text-yellow-400 border border-yellow-400/40 hover:bg-yellow-400/30"
              : "bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-gray-900"
          }`}
        >
          {open ? (
            <><X className="w-4 h-4 mr-2" />Close AI Chat</>
          ) : (
            <><Zap className="w-4 h-4 mr-2 fill-gray-900" />Ask VoltSpec AI</>
          )}
        </Button>
        {open && chatPanel}
      </div>
    );
  }

  // ── FLOATING VARIANT (legacy, not used) ─────────────────────────────────
  return (
    <div className="no-print fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-80 sm:w-96 h-[500px] bg-[hsl(222,47%,9%)] border border-[hsl(217,33%,22%)] rounded-2xl shadow-2xl shadow-black/60 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-[hsl(222,47%,11%)] border-b border-[hsl(217,33%,20%)]">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold text-white text-sm">VoltSpec AI</span>
              {jobContext && (
                <span className="text-xs text-gray-500 truncate max-w-[140px]">· {jobContext}</span>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="h-7 w-7 text-gray-500 hover:text-white">
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-900/20 border-b border-amber-900/30 text-amber-400 text-xs">
            <AlertTriangle className="w-3 h-3 shrink-0" />
            Reference only — verify with AHJ
          </div>
          <ScrollArea className="flex-1 px-4 py-3">
            <div className="space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${msg.role === "user" ? "bg-yellow-400 text-gray-900 font-medium" : "bg-[hsl(217,33%,16%)] text-gray-200"}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[hsl(217,33%,16%)] text-gray-400 rounded-xl px-3 py-2 text-sm">
                    <span className="flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce [animation-delay:300ms]" />
                    </span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </ScrollArea>
          <div className="px-3 py-3 border-t border-[hsl(217,33%,20%)] flex gap-2">
            <Textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ask a code question…" rows={1} className="resize-none text-sm bg-[hsl(217,33%,13%)] border-[hsl(217,33%,22%)] text-white placeholder-gray-600 focus:ring-yellow-400 focus:border-yellow-400 min-h-[38px] max-h-[100px]" />
            <Button onClick={sendMessage} disabled={!input.trim() || loading} size="icon" className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 shrink-0 disabled:opacity-40">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
      <Button onClick={() => setOpen(!open)} aria-label="Open AI chat" className="w-14 h-14 rounded-full bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-gray-900 shadow-lg shadow-yellow-400/30 transition-colors duration-150">
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6 fill-gray-900" />}
      </Button>
    </div>
  );
}
