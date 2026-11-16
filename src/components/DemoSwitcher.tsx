"use client";

import { useState } from "react";
import ChatWidget from "./ChatWidget";

type BusinessType = "restaurant" | "dental" | "realestate";

const BUSINESSES: { type: BusinessType; label: string; emoji: string }[] = [
  { type: "restaurant", label: "Restaurante", emoji: "🍝" },
  { type: "dental", label: "Clínica Dental", emoji: "🦷" },
  { type: "realestate", label: "Inmobiliaria", emoji: "🏡" },
];

const HERO_CONTENT: Record<
  BusinessType,
  { name: string; tagline: string; desc: string; bg: string; cta: string }
> = {
  restaurant: {
    name: "La Trattoria Miraflores",
    tagline: "Cocina italiana auténtica",
    desc: "Pastas artesanales, pizza al horno de leña y mariscos frescos en el corazón de Miraflores. Abierto los 7 días.",
    bg: "from-amber-900 to-amber-700",
    cta: "Hacer una Reserva",
  },
  dental: {
    name: "Clínica Dental Sonrisa",
    tagline: "Odontología moderna y sin dolor",
    desc: "Atención dental completa para toda la familia en Miraflores. Nuevos pacientes bienvenidos. Aceptamos seguros.",
    bg: "from-blue-900 to-blue-600",
    cta: "Agendar una Cita",
  },
  realestate: {
    name: "Inmobiliaria Premier",
    tagline: "Encuentra tu departamento ideal",
    desc: "15 años de experiencia en Miraflores, San Isidro y Barranco. 38 propiedades activas desde $80,000.",
    bg: "from-emerald-900 to-emerald-700",
    cta: "Tasación Gratuita",
  },
};

export default function DemoSwitcher() {
  const [business, setBusiness] = useState<BusinessType>("restaurant");
  const hero = HERO_CONTENT[business];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Demo banner */}
      <div className="bg-gray-900 text-white text-center text-xs py-2 px-4">
        <span className="text-gray-400">DEMO EN VIVO — </span>
        Cambia el tipo de negocio para mostrar adaptabilidad →
        <span className="ml-3 inline-flex gap-2">
          {BUSINESSES.map((b) => (
            <button
              key={b.type}
              onClick={() => setBusiness(b.type)}
              className={`px-3 py-0.5 rounded-full text-xs font-medium transition-colors ${
                business === b.type
                  ? "bg-white text-gray-900"
                  : "text-gray-400 hover:text-white border border-gray-600"
              }`}
            >
              {b.emoji} {b.label}
            </button>
          ))}
        </span>
      </div>

      {/* Fake business website */}
      <div className={`bg-gradient-to-br ${hero.bg} text-white`}>
        {/* Fake nav */}
        <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-bold text-xl">{hero.name}</span>
          <div className="hidden sm:flex gap-6 text-sm text-white/80">
            <span className="cursor-default">Nosotros</span>
            <span className="cursor-default">Servicios</span>
            <span className="cursor-default">Galería</span>
            <span className="cursor-default">Contacto</span>
          </div>
        </nav>

        {/* Hero section */}
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <p className="text-white/60 text-sm uppercase tracking-widest mb-3">{hero.tagline}</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{hero.name}</h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">{hero.desc}</p>
          <button className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-full text-sm hover:bg-gray-100 transition-colors">
            {hero.cta}
          </button>
        </div>
      </div>

      {/* Fake content section */}
      <div className="max-w-5xl mx-auto px-6 py-16 grid sm:grid-cols-3 gap-6">
        {[
          { icon: "⭐", title: "Mejor Valorado", desc: "4.9 estrellas en más de 200 reseñas" },
          { icon: "⚡", title: "Respuesta Inmediata", desc: "Asistente disponible las 24 horas" },
          { icon: "🤝", title: "De Confianza", desc: "Sirviendo a Miraflores desde 2010" },
        ].map((f) => (
          <div key={f.title} className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="text-3xl mb-2">{f.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Chat widget */}
      <ChatWidget businessType={business} />
    </div>
  );
}
