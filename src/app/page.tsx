import Link from "next/link";

/**
 * Page d'accueil du système de rapports.
 * Design premium et épuré.
 */
export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white relative overflow-hidden">
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-50 rounded-full blur-[120px] opacity-60 translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-teal-50 rounded-full blur-[120px] opacity-60 -translate-x-1/4 translate-y-1/4"></div>
      </div>

      <div className="max-w-4xl px-4 text-center space-y-12">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight">
            Système de Rapports <span className="text-blue-600">Hebdomadaires</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Plateforme centralisée pour la consolidation, la visualisation et le suivi des activités hebdomadaires de votre entité.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-200 transition-all hover:-translate-y-1 text-center"
          >
            Se connecter
          </Link>
          <Link
            href="/signup"
            className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-2xl shadow-sm hover:bg-slate-50 transition-all hover:-translate-y-1 text-center"
          >
            Créer un compte
          </Link>
        </div>

        <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6 bg-white/50 backdrop-blur-sm border border-slate-100 rounded-3xl">
            <h3 className="font-bold text-slate-900 mb-2">Consolidation Rapide</h3>
            <p className="text-sm text-slate-500">Saisissez vos activités par puces et générez vos rapports en quelques clics.</p>
          </div>
          <div className="p-6 bg-white/50 backdrop-blur-sm border border-slate-100 rounded-3xl">
            <h3 className="font-bold text-slate-900 mb-2">Export PDF Premium</h3>
            <p className="text-sm text-slate-500">Visualisez et téléchargez vos rapports consolidés au format PDF professionnel.</p>
          </div>
          <div className="p-6 bg-white/50 backdrop-blur-sm border border-slate-100 rounded-3xl">
            <h3 className="font-bold text-slate-900 mb-2">Suivi Historique</h3>
            <p className="text-sm text-slate-500">Gardez une trace de tous vos rapports passés avec un filtrage par semaine.</p>
          </div>
        </div>
      </div>

      <footer className="absolute bottom-8 text-slate-400 text-sm">
        © {new Date().getFullYear()} Rapport Hebdomadaire. Tous droits réservés.
      </footer>
    </main>
  );
}
