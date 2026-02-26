import Link from "next/link";
import { IMAGES } from "@/features/common/constants";

/**
 * Page d'accueil du système de rapports.
 * Design Inspiration Spotify - Immersif et Minimaliste.
 */
export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Background Image - Plein Écran */}
      <div
        className="absolute inset-0 bg-cover bg-center -z-20"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop")',
        }}
      />

      {/* Overlay Sombre pour lisibilité */}
      <div className="absolute inset-0 bg-black/50 -z-10" />

      {/* Header avec Logos Institutionnels */}
      <header className="absolute top-0 left-0 w-full p-8 flex items-center justify-center gap-12 z-10">
        <div className="flex items-center gap-8 bg-white/10 backdrop-blur-md px-10 py-4 rounded-full border border-white/10">
          <img src={IMAGES.LOGO_REPOBLIKA} alt="Logo Madagascar" className="h-10 w-auto mix-blend-screen brightness-200" />
          <div className="h-6 w-[1px] bg-white/20" />
          <img src={IMAGES.LOGO_MESUPRES} alt="Logo MESUPRES" className="h-10 w-auto mix-blend-screen" />
          <div className="h-6 w-[1px] bg-white/20" />
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 flex items-center justify-center bg-white/90 rounded-lg p-1">
              <span className="text-[10px] font-bold text-black leading-none text-center">ESPA</span>
            </div>
            <div className="h-10 w-10 flex items-center justify-center bg-white/90 rounded-lg p-1">
              <span className="text-[10px] font-bold text-black leading-none text-center">DSINT</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl px-6 text-center space-y-12 animate-fade-in">
        {/* Hero Section */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-tight">
            Portail de Centralisation <br />
            <span className="text-white/90">des Rapports Hebdomadaires</span>
          </h1>

          <div className="space-y-1">
            <p className="text-lg md:text-xl text-white/70 font-medium uppercase tracking-[0.2em]">
              Direction des Systèmes d&apos;Information
            </p>
            <p className="text-sm md:text-base text-white/50 font-medium uppercase tracking-[0.3em]">
              et du Numérique Technologique
            </p>
          </div>
        </div>

        {/* Bouton d'Action Unique - Style Spotify */}
        <div className="flex justify-center pt-8">
          <Link
            href="/login"
            className="px-12 py-5 bg-white hover:bg-slate-100 text-black font-bold text-sm uppercase tracking-[0.2em] rounded-full transition-all hover:scale-105 active:scale-95 shadow-2xl"
          >
            Se connecter
          </Link>
        </div>
      </div>

      {/* Pied de page institutionnel discret */}
      <footer className="absolute bottom-10 w-full text-center px-6">
        <p className="text-white/30 text-[10px] uppercase tracking-[0.4em] font-medium">
          © 2026 — Ministère de l&apos;Enseignement Supérieur (MESUPRES)
        </p>
      </footer>
    </main>
  );
}
