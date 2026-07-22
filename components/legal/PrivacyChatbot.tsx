"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, Trash2, Shield, ArrowRight } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const QUICK_QUESTIONS = [
  { text: "What data do you collect?", query: "collect" },
  { text: "How is my data protected?", query: "secure" },
  { text: "Can I request data deletion?", query: "delete" },
  { text: "Do you use cookies?", query: "cookie" },
];

const BOT_RESPONSES: Record<string, string> = {
  delete: "Under our privacy policy, you have the right to request the deletion of your personal data. To initiate a data erasure request, please email our security team at support@betindia.com with your account details. We will process your request within 30 days.",
  collect: "We collect:\n• Account Details: Name, email address, phone number\n• Technical Data: IP address, browser type, operating system, device identifiers\n• Usage Metrics: Betting history, pages visited, gameplay stats\n• Communications: Customer support transcripts and emails.\n\nThis data is collected solely to provide services, verify identities, and comply with regulation.",
  secure: "We employ industry-leading security practices, including 256-bit SSL encryption for data in transit, multi-factor internal access controls, state-of-the-art firewalls, and regular security audits. Your personal and financial data is stored in secure, compliance-hardened environments.",
  cookie: "Yes, we use cookies to keep you logged in, save your preferences, and analyze site performance. Essential cookies run automatically, while performance/analytical cookies help us improve the platform. You can configure or disable cookies via your browser settings.",
  share: "We do NOT sell, rent, or trade your personal information to third-party marketing companies. We only share information with licensed payment gateways, identity verification systems, and regulatory authorities to ensure legal compliance and smooth operations under strict confidentiality.",
  contact: "If you have questions about this policy or your data rights, you can reach our Data Protection Officer and Privacy Team at support@betindia.com. Our support agents are active 24/7.",
  gdpr: "Depending on your region, you have rights to:\n• Access and request copies of your stored data\n• Rectify/correct inaccurate information\n• Request deletion of data ('Right to be Forgotten')\n• Restrict or object to processing.\n\nTo assert these rights, contact support@betindia.com.",
};

const getBotResponse = (query: string): string => {
  const q = query.toLowerCase().trim();
  if (q.includes("delete") || q.includes("erase") || q.includes("remove") || q.includes("forgotten") || q.includes("destroy")) {
    return BOT_RESPONSES.delete;
  }
  if (q.includes("collect") || q.includes("gather") || q.includes("track") || q.includes("what data") || q.includes("information") || q.includes("personal")) {
    return BOT_RESPONSES.collect;
  }
  if (q.includes("secure") || q.includes("protect") || q.includes("encrypt") || q.includes("safety") || q.includes("safe") || q.includes("hack")) {
    return BOT_RESPONSES.secure;
  }
  if (q.includes("cookie") || q.includes("cookies") || q.includes("tracking") || q.includes("pixels")) {
    return BOT_RESPONSES.cookie;
  }
  if (q.includes("share") || q.includes("sell") || q.includes("third party") || q.includes("advertis") || q.includes("vendor")) {
    return BOT_RESPONSES.share;
  }
  if (q.includes("contact") || q.includes("support") || q.includes("email") || q.includes("help") || q.includes("dpo")) {
    return BOT_RESPONSES.contact;
  }
  if (q.includes("gdpr") || q.includes("rights") || q.includes("legal") || q.includes("access") || q.includes("rectify") || q.includes("law")) {
    return BOT_RESPONSES.gdpr;
  }
  return "I'm the Privacy Assistant. I can help with topics like data collection, security measures, cookies, account deletion, and user rights. Try selecting a quick option or type a question with keywords like 'security', 'delete', or 'cookies'!";
};

export default function PrivacyChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        text: "Hello! I am the BetIndia Privacy Assistant. Ask me any questions you have about our data policies, cookies, security, or privacy rights.",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Math.random().toString(36).substring(7),
      text: textToSend,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate realistic bot reply delay
    setTimeout(() => {
      const responseText = getBotResponse(textToSend);
      const botMessage: Message = {
        id: Math.random().toString(36).substring(7),
        text: responseText,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      
      // If closed, notify user
      if (!isOpen) {
        setHasNewMessage(true);
      }
    }, 850);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(inputValue);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome-" + Date.now(),
        text: "Hello! I am the BetIndia Privacy Assistant. Ask me any questions you have about our data policies, cookies, security, or privacy rights.",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewMessage(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <div
        className={[
          "mb-4 w-[380px] h-[520px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-6rem)]",
          "rounded-[24px] border border-white/[0.08] bg-[#081425]/95 shadow-2xl backdrop-blur-xl",
          "flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right",
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-90 translate-y-4 pointer-events-none absolute",
        ].join(" ")}
      >
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#FF6B00]/15 via-[#0B1F3A] to-[#138808]/15 px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00]">
                <Bot size={20} strokeWidth={1.8} />
              </div>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#138808] border-2 border-[#050B18]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                Privacy Bot
                <span className="inline-flex items-center rounded-full bg-[#138808]/10 px-1.5 py-0.5 text-[9px] font-semibold text-[#138808] border border-[#138808]/20">
                  Online
                </span>
              </h3>
              <p className="text-[10px] text-slate-400">BetIndia Compliance Assistant</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={clearChat}
              title="Clear conversation"
              className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
            >
              <Trash2 size={15} />
            </button>
            <button
              onClick={toggleChat}
              title="Close chat"
              className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Subtle decoration borders */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FF6B00] via-transparent to-[#138808]" />
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={[
                "flex flex-col max-w-[82%] relative",
                msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start",
              ].join(" ")}
            >
              <div
                className={[
                  "rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line border",
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-[#FF6B00] to-[#e05e00] text-white border-[#FF6B00]/40 rounded-tr-none shadow-md shadow-[#FF6B00]/10"
                    : "bg-white/[0.05] text-slate-200 border-white/[0.06] rounded-tl-none",
                ].join(" ")}
              >
                {msg.text}
              </div>
              <span className="mt-1 text-[9px] text-slate-500 px-1">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex flex-col items-start max-w-[82%]">
              <div className="rounded-2xl rounded-tl-none px-4 py-3 bg-white/[0.05] border border-white/[0.06] flex items-center gap-1">
                <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions Tray */}
        <div className="px-5 pb-2 pt-1 border-t border-white/[0.04]">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Common Questions</p>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q.query}
                onClick={() => handleSend(q.text)}
                className="text-[11px] font-medium text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white border border-white/[0.06] rounded-xl px-2.5 py-1.5 transition-all"
              >
                {q.text}
              </button>
            ))}
          </div>
        </div>

        {/* Input Footer */}
        <form onSubmit={handleFormSubmit} className="p-4 border-t border-white/[0.06] bg-[#040D1A]/60 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask a privacy question..."
            className="flex-1 bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.06] border border-white/[0.08] focus:border-[#FF6B00]/40 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-all"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className={[
              "grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#FF6B00] text-white",
              "shadow-lg shadow-[#FF6B00]/15 hover:bg-[#FF8A00] active:scale-95 transition-all duration-200",
              "disabled:opacity-40 disabled:pointer-events-none",
            ].join(" ")}
          >
            <Send size={14} />
          </button>
        </form>
      </div>

      {/* Floating Trigger Button */}
      <button
        onClick={toggleChat}
        className={[
          "relative flex items-center justify-center h-14 w-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-[1.08] group",
          isOpen
            ? "bg-[#0B1F3A] border border-white/10 text-white"
            : "bg-[#FF6B00] text-white hover:bg-[#FF8A00] shadow-[#FF6B00]/25",
        ].join(" ")}
      >
        {/* Pulse rings */}
        {!isOpen && (
          <>
            <span className="absolute inset-0 rounded-full bg-[#FF6B00]/45 animate-ping opacity-60 pointer-events-none scale-105" />
            <span className="absolute -inset-1 rounded-full border border-[#FF6B00]/20 pointer-events-none animate-pulse" />
          </>
        )}

        {isOpen ? <X size={20} /> : <MessageSquare size={22} />}

        {/* Unread dot */}
        {hasNewMessage && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#138808] opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#138808] border-2 border-[#050B18] text-[8px] font-black text-white items-center justify-center">1</span>
          </span>
        )}

        {/* Floating tooltip label */}
        <span className="absolute right-16 scale-0 origin-right translate-x-2 opacity-0 group-hover:scale-100 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none bg-[#0B1F3A] border border-white/10 text-[11px] font-semibold text-slate-200 rounded-lg px-2.5 py-1.5 whitespace-nowrap shadow-lg shadow-black/30">
          Privacy Chatbot
        </span>
      </button>
    </div>
  );
}
