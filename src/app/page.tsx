import Link from "next/link";
import { IMAGES } from "@/config/constants";

/**
 * Page d'accueil - Modèle Landing Page SaaS / Tech.
 * Structure épurée, aérée et professionnelle.
 */
export default function HomePage() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">

      {/* Header Discret */}
      <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <img src={IMAGES.LOGO_REPOBLIKA} alt="Logo" className="h-10 w-auto mix-blend-multiply" />
            <div className="h-6 w-[1px] bg-slate-200" />
            <img src={IMAGES.LOGO_MESUPRES} alt="Logo" className="h-10 w-auto mix-blend-multiply" />
          </div>

          <Link
            href="/login"
            className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors uppercase tracking-widest"
          >
            Se connecter
          </Link>
        </div>
      </header>

      {/* Section Hero - 2 Colonnes */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Colonne Gauche - Texte & Action */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.3em]">
                Plateforme Officielle
              </span>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.1]">
                Centralisez vos <br />
                <span className="text-slate-400">Rapports Hebdomadaires</span>
              </h1>
              <p className="text-lg text-slate-500 max-w-lg leading-relaxed font-medium">
                Une solution moderne pour la collecte et le suivi des activités du MESUPRES.
              </p>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <Link
                href="/login"
                className="px-10 py-5 bg-slate-900 hover:bg-black text-white font-bold text-sm uppercase tracking-widest rounded-full transition-all shadow-xl shadow-slate-200 hover:scale-105 active:scale-95"
              >
                Se connecter
              </Link>
            </div>
          </div>

          {/* Colonne Droite - Illustration */}
          <div className="relative animate-fade-in delay-200">
            <div className="absolute -inset-4 bg-blue-50 rounded-[40px] -rotate-2 -z-10 opacity-50"></div>
            <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-2xl shadow-slate-100 overflow-hidden relative group">
              {/* Simulation Interface */}
              <div className="aspect-[4/3] bg-slate-50 rounded-2xl flex flex-col p-6 gap-4 overflow-hidden border border-slate-100">
                <div className="h-8 w-1/3 bg-white border border-slate-200 rounded-lg shadow-sm" />
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-16 bg-white border border-slate-200 rounded-xl shadow-sm" />
                  <div className="h-16 bg-white border border-slate-200 rounded-xl shadow-sm" />
                  <div className="h-16 bg-white border border-slate-200 rounded-xl shadow-sm" />
                </div>
                <div className="h-32 bg-white border border-slate-200 rounded-xl shadow-sm mt-2" />
                <div className="flex justify-end gap-2 mt-auto">
                  <div className="h-8 w-20 bg-slate-100 rounded-lg" />
                  <div className="h-8 w-24 bg-slate-900 rounded-lg" />
                </div>
              </div>
              {/* Effet vitré interactif */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </section>

      {/* Section Info - 3 Blocs */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Bloc 1 */}
            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Centralisation</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                Regroupez tous vos rapports d&apos;activités sur une interface unique et sécurisée.
              </p>
            </div>

            {/* Bloc 2 */}
            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Rapidité</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                Saisie optimisée et exportation automatique en PDF pour un gain de temps maximal.
              </p>
            </div>

            {/* Bloc 3 */}
            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.040L3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622l-1.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Conformité</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                Respect des standards administratifs et archivage pérenne des données.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Institutionnel */}
      <footer className="py-12 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-[10px] uppercase tracking-[0.4em] font-medium font-sans">
          © {currentYear} — DSINT-MESUPRES
        </p>
      </footer>

    </main>
  );
}
