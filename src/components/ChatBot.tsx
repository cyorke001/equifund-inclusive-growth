import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Loader2, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };

const starterPrompts = [
  { key: "chat.starter1", fallback: "What funding options fit my business?" },
  { key: "chat.starter2", fallback: "What does my readiness score mean?" },
  { key: "chat.starter3", fallback: "How do lenders review applications?" },
  { key: "chat.starter4", fallback: "What documents do I need?" },
];

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { profile } = useAuth();
  const { t, language } = useLanguage();

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "assistant", content: t("chat.greeting") }]);
    }
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Msg = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: {
          messages: newMessages.slice(1), // skip greeting
          userType: profile?.user_type || "entrepreneur",
          language,
        },
      });
      if (error) throw error;
      setMessages(prev => [...prev, { role: "assistant", content: data?.reply || "Sorry, I couldn't process that." }]);
    } catch (e) {
      console.error("Chat error:", e);
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const showStarters = messages.length <= 1 && !loading;

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-elevated hover:bg-secondary/90 transition-colors"
            aria-label={t("chat.title")}
          >
            <MessageSquare className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex h-[520px] w-[400px] max-w-[calc(100vw-2rem)] flex-col rounded-2xl border border-border bg-card shadow-elevated overflow-hidden"
            role="dialog"
            aria-label={t("chat.title")}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-primary px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/15">
                  <Bot className="h-4.5 w-4.5 text-primary-foreground" />
                </div>
                <div>
                  <span className="font-heading font-semibold text-primary-foreground text-sm block">{t("chat.title")}</span>
                  <span className="text-[10px] text-primary-foreground/60">Online</span>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-lg p-1.5 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors" aria-label="Close chat">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-background/50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary/15 mt-0.5">
                      <Bot className="h-3.5 w-3.5 text-secondary" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-card border border-border text-foreground shadow-soft rounded-bl-md"
                  }`}>
                    {msg.role === "assistant" ? (
                      <div className="chat-prose">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 mt-0.5">
                      <User className="h-3.5 w-3.5 text-primary" />
                    </div>
                  )}
                </div>
              ))}

              {/* Starter Prompts */}
              {showStarters && (
                <div className="space-y-2 pt-1">
                  {starterPrompts.map((sp, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(t(sp.key) || sp.fallback)}
                      className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-left text-xs font-medium text-foreground hover:bg-muted hover:border-primary/30 transition-colors shadow-soft"
                    >
                      {t(sp.key) || sp.fallback}
                    </button>
                  ))}
                </div>
              )}

              {loading && (
                <div className="flex gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary/15">
                    <Bot className="h-3.5 w-3.5 text-secondary" />
                  </div>
                  <div className="rounded-2xl rounded-bl-md bg-card border border-border px-4 py-3 shadow-soft">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-border bg-card px-3 py-3">
              <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t("chat.placeholder")}
                  className="flex-1 rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  disabled={loading}
                  aria-label="Type your message"
                />
                <Button type="submit" size="icon" disabled={loading || !input.trim()} className="h-10 w-10 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
