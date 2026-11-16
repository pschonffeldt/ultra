"use client";

import { useChat } from "ai/react";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

type BusinessType = "restaurant" | "dental" | "realestate";

const BUSINESS_META: Record<
  BusinessType,
  {
    name: string;
    tagline: string;
    color: string;
    accent: string;
    suggestions: string[];
    hero: string;
  }
> = {
  restaurant: {
    name: "La Trattoria Miraflores",
    tagline: "Cocina italiana en el corazón de Miraflores",
    color: "bg-amber-700",
    accent: "amber",
    suggestions: ["¿Cuál es su horario?", "¿Aceptan reservas?", "¿Tienen opciones veganas?"],
    hero: "🍝",
  },
  dental: {
    name: "Clínica Dental Sonrisa",
    tagline: "Cuidado dental moderno para toda la familia",
    color: "bg-blue-600",
    accent: "blue",
    suggestions: ["¿Aceptan seguros?", "Quiero una cita", "¿Hacen blanqueamiento?"],
    hero: "🦷",
  },
  realestate: {
    name: "Inmobiliaria Premier",
    tagline: "Tu departamento ideal en Miraflores y San Isidro",
    color: "bg-emerald-700",
    accent: "emerald",
    suggestions: ["Quiero comprar un depa", "¿Cuánto vale mi propiedad?", "¿Qué zonas manejan?"],
    hero: "🏡",
  },
};

const ACCENT_CLASSES: Record<string, { btn: string; bubble: string; border: string }> = {
  amber: {
    btn: "bg-amber-700 hover:bg-amber-800",
    bubble: "bg-amber-700",
    border: "border-amber-700",
  },
  blue: {
    btn: "bg-blue-600 hover:bg-blue-700",
    bubble: "bg-blue-600",
    border: "border-blue-600",
  },
  emerald: {
    btn: "bg-emerald-700 hover:bg-emerald-800",
    bubble: "bg-emerald-700",
    border: "border-emerald-700",
  },
};

export default function ChatWidget({ businessType }: { businessType: BusinessType }) {
  const [open, setOpen] = useState(false);
  const meta = BUSINESS_META[businessType];
  const accent = ACCENT_CLASSES[meta.accent];
  const bottomRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages, setInput } =
    useChat({
      api: "/api/chat",
      body: { businessType },
    });

  useEffect(() => {
    setMessages([]);
  }, [businessType, setMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendSuggestion = (text: string) => {
    setInput(text);
    setTimeout(() => {
      const form = document.getElementById("chat-form") as HTMLFormElement;
      form?.requestSubmit();
    }, 50);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full ${accent.btn} text-white shadow-xl flex items-center justify-center text-2xl transition-all duration-200 hover:scale-110`}
        aria-label="Open chat"
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[520px] flex flex-col rounded-2xl shadow-2xl border border-gray-200 bg-white overflow-hidden">
          {/* Header */}
          <div className={`${meta.color} text-white px-4 py-3 flex items-center gap-3`}>
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg">
              {meta.hero}
            </div>
            <div>
              <p className="font-semibold text-sm leading-tight">{meta.name}</p>
              <p className="text-xs text-white/80">Asistente Virtual · En línea</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[260px] max-h-[320px] bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center pt-4">
                <p className="text-gray-500 text-sm mb-4">
                  ¡Hola! ¿En qué te puedo ayudar?
                </p>
                <div className="flex flex-col gap-2">
                  {meta.suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendSuggestion(s)}
                      className={`text-sm border ${accent.border} text-gray-700 rounded-full px-3 py-1.5 hover:bg-gray-100 transition-colors`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    m.role === "user"
                      ? `${accent.bubble} text-white rounded-br-sm`
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm"
                  }`}
                >
                  {m.role === "user" ? (
                    m.content
                  ) : (
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                        ul: ({ children }) => <ul className="list-disc pl-4 mb-1">{children}</ul>,
                        li: ({ children }) => <li className="mb-0.5">{children}</li>,
                      }}
                    >
                      {m.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-3 py-2 shadow-sm">
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form
            id="chat-form"
            onSubmit={handleSubmit}
            className="border-t border-gray-200 px-3 py-2 flex gap-2 bg-white"
          >
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Escribe tu mensaje..."
              className="flex-1 text-sm text-gray-900 bg-gray-100 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-gray-300"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`${accent.btn} text-white rounded-full w-9 h-9 flex items-center justify-center disabled:opacity-40 transition-colors`}
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}
