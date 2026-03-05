"use client";

import React, { useState } from "react";
import { rechercheService } from "@/features/rapports/services/rechercheService";
import { ApiRapport } from "@/features/rapports/types";
import { formatLongDate } from "@/features/common/utils/dateUtils";
import { AppTableSkeleton } from "@/features/common/components/ui/AppTableSkeleton";
import { usePdfExport } from "@/features/rapports/hooks/usePdfExport";
import { RapportView } from "@/features/rapports/components/vision/RapportView";
import { APP_CONSTANTS } from "@/config/constants";

export default function RecherchePage() {
    const [selectedDate, setSelectedDate] = useState("");
    const [rapports, setRapports] = useState<ApiRapport[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // PDF Export — même logique que DashboardPage
    const { exportToPdf } = usePdfExport();
    const [selectedForPdf, setSelectedForPdf] = useState<ApiRapport | null>(null);
    const [generatingId, setGeneratingId] = useState<number | null>(null);

    const handlePdfClick = async (rapport: ApiRapport) => {
        const idRp = rapport.id !== undefined ? rapport.id : 0;
        setGeneratingId(idRp);
        setSelectedForPdf(rapport);
        setTimeout(() => {
            const year = new Date(rapport.calendrier.dateDebut).getFullYear();
            exportToPdf("rapport-a4-container", `Rapport_H${year}_ID${rapport.id}.pdf`)
                .finally(() => {
                    setGeneratingId(null);
                    setSelectedForPdf(null);
                });
        }, 500);
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDate) return;
        setIsLoading(true);
        setHasSearched(true);
        setError(null);
        try {
            const results = await rechercheService.searchRapportsByDate(selectedDate);
            setRapports(results);
        } catch (err: any) {
            console.error("Erreur lors de la recherche:", err);
            setError(err.message || "Une erreur est survenue lors de la recherche.");
            setRapports([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Même map de statuts que DashboardTable
    const statusClasses: Record<string, string> = {
        VALIDE: "text-green-800 bg-green-50 border-green-300",
        TRANSMIS: "text-blue-800 bg-blue-50 border-blue-300",
        "EN COURS": "text-amber-800 bg-amber-50 border-amber-300",
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "N/A";
        const d = new Date(dateStr);
        return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
    };

    return (
        <div className="space-y-10 pb-20 px-4 md:px-0 max-w-7xl mx-auto">

            {/* ── 1. En-tête ── */}
            <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-1 bg-slate-900 rounded-full" />
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight uppercase">
                        Recherche de rapports
                    </h1>
                </div>
                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em] ml-4">
                    Consulter les rapports par date spécifique
                </p>
            </div>

            {/* ── 2. Barre de recherche (remplace les KPIs du Dashboard) ── */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-end gap-6 max-w-2xl">
                    <div className="w-full space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                            Sélectionner une date
                        </label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all text-slate-700 bg-slate-50/30"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading || !selectedDate}
                        className="w-full md:w-48 py-4 bg-slate-900 text-white font-bold text-[10px] uppercase tracking-[0.2em] rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Recherche...
                            </span>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Rechercher
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* ── 3. Bandeau d'erreur ── */}
            {error && (
                <div className="flex items-center gap-3 px-5 py-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs font-bold uppercase tracking-wide">{error}</span>
                </div>
            )}

            {/* ── 4. Tableau des résultats — copie exacte du DashboardTable ── */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                {isLoading ? (
                    <AppTableSkeleton rows={5} cols={4} />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[700px]">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-200">
                                    <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Période</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Entité</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Statut</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {rapports.length > 0 ? (
                                    rapports.map((rapport) => (
                                        <tr key={rapport.id} className="hover:bg-slate-50/40 transition-colors">
                                            {/* Période */}
                                            <td className="px-6 py-5 border-r border-slate-100 text-center">
                                                <div className="text-sm font-black text-slate-900">
                                                    Du {formatDate(rapport.calendrier.dateDebut)}
                                                </div>
                                                <div className="text-[10px] font-medium text-slate-400 uppercase">
                                                    au {formatDate(rapport.calendrier.dateFin)}
                                                </div>
                                            </td>
                                            {/* Entité */}
                                            <td className="px-6 py-4 border-r border-slate-100 text-center">
                                                <span className="text-[11px] font-bold text-slate-600 uppercase">
                                                    {rapport.user.entite || "N/A"}
                                                </span>
                                            </td>
                                            {/* Statut */}
                                            <td className="px-6 py-4 border-r border-slate-100 text-center">
                                                <span className={`px-3 py-1 text-[9px] font-black uppercase rounded-md border ${statusClasses[rapport.statut || "EN COURS"]}`}>
                                                    {rapport.statut || "EN COURS"}
                                                </span>
                                            </td>
                                            {/* Actions */}
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => handlePdfClick(rapport)}
                                                    disabled={generatingId === rapport.id}
                                                    className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-[10px] font-black uppercase rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors"
                                                >
                                                    {generatingId === rapport.id ? "..." : "PDF"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="p-20 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-slate-900 font-bold text-sm tracking-tight">
                                                        {hasSearched ? "Aucun rapport trouvé pour cette date" : "Lancez une recherche ci-dessus"}
                                                    </p>
                                                    <p className="text-slate-400 text-[10px] uppercase font-medium tracking-widest">
                                                        {hasSearched ? "Essayez une autre date" : "Entrez une date pour commencer"}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Zone de rendu PDF masquée — identique au Dashboard */}
            {selectedForPdf && (
                <div className="fixed left-[-9999px] top-0 pointer-events-none opacity-0">
                    <div id="rapport-a4-container" style={{ width: "210mm" }}>
                        <RapportView data={[selectedForPdf]} isPrintMode={true} />
                    </div>
                </div>
            )}

            {/* ── 5. Footer centré, text-slate-900 ── */}
            <footer className="pt-4 pb-10 text-center border-t border-slate-100">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900" suppressHydrationWarning>
                    © {APP_CONSTANTS.copyright.startYear} – {new Date().getFullYear()} {APP_CONSTANTS.copyright.owner}
                </p>
            </footer>
        </div>
    );
}
