"use client";

import React, { useState } from "react";
import { ApiRapport } from "@/features/rapports/types";
import { RapportTableEditor } from "@/features/rapports/components/form/rapports/RapportTableEditor"; // Importez votre éditeur
import { useRouter } from "next/navigation";


interface DashboardTableProps {
    rapports: ApiRapport[];
    isLoading: boolean;
    generatingId: number | null;
    onPdfClick: (rapport: ApiRapport) => void;
    activePeriodId: string;
}

export const DashboardTable: React.FC<DashboardTableProps> = ({
    rapports,
    isLoading,
    generatingId,
    onPdfClick,
    activePeriodId
}) => {
    // ÉTAT LOCAL : Rapport en cours d'édition
    const [editingRapport, setEditingRapport] = useState<ApiRapport | null>(null);
    const router = useRouter();
    const formatDate = (dateStr: string) => {
        if (!dateStr) return "N/A";
        const d = new Date(dateStr);
        return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
    };

    const statusClasses: Record<string, string> = {
        VALIDE: "text-green-800 bg-green-50 border-green-300",
        TRANSMIS: "text-blue-800 bg-blue-50 border-blue-300",
        "EN COURS": "text-amber-800 bg-amber-50 border-amber-300",
    };

    // --- VUE ÉDITION ---
    if (editingRapport) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setEditingRapport(null)}
                            className="p-2 hover:bg-white rounded-full transition-colors text-slate-500 hover:text-slate-900"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <div>
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Modification du rapport</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Période du {formatDate(editingRapport.calendrier.dateDebut)}</p>
                        </div>
                    </div>
                </div>

                {/* Utilisation de l'éditeur que nous avons créé précédemment */}
                <RapportTableEditor
                    rapport={editingRapport}
                    activePeriodId={activePeriodId} // Passage à l'éditeur
                    onSuccess={() => {
                        // setEditingRapport(null); // Ferme l'éditeur
                        // router.refresh();        // Rafraîchit les données serveur
                    }}
                />

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={() => setEditingRapport(null)}
                        className="px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-800 transition-all"
                    >
                        Annuler
                    </button>
                </div>
            </div>
        );
    }

    // --- VUE TABLEAU (Par défaut) ---
    return (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-200">
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-500 tracking-widest border-r border-slate-200/50">Période</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-500 tracking-widest border-r border-slate-200/50">Direction / Entité</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-500 tracking-widest border-r border-slate-200/50 text-center">Statut</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {isLoading ? (
                            Array(3).fill(0).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td colSpan={4} className="px-6 py-8"><div className="h-4 bg-slate-100 rounded w-3/4 mx-auto" /></td>
                                </tr>
                            ))
                        ) : rapports.length > 0 ? (
                            rapports.map((rapport) => {
                                const statutStyle = statusClasses[rapport.statut || "EN COURS"] || "text-slate-600 bg-slate-50 border-slate-200";

                                return (
                                    <tr key={rapport.id} className="hover:bg-slate-50/40 transition-colors group">
                                        <td className="px-6 py-5 border-r border-slate-100">
                                            <div className="text-sm font-black text-slate-900">
                                                Du {formatDate(rapport.calendrier.dateDebut)}
                                            </div>
                                            <div className="text-[10px] font-medium text-slate-400 uppercase">
                                                au {formatDate(rapport.calendrier.dateFin)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 border-r border-slate-100">
                                            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tighter">
                                                {rapport.user.entite || "Non spécifié"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 border-r border-slate-100 text-center">
                                            <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-md border ${statutStyle}`}>
                                                {rapport.statut || "EN COURS"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            {/* Bouton Modifier qui active l'état local */}
                                            <button
                                                onClick={() => setEditingRapport(rapport)}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-700 transition-all"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Modifier
                                            </button>

                                            <button
                                                onClick={() => onPdfClick(rapport)}
                                                disabled={generatingId === rapport.id}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-lg hover:border-slate-900 hover:text-slate-900 transition-all disabled:opacity-50"
                                            >
                                                {generatingId === rapport.id ? "..." : "PDF"}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-24 text-center">
                                    <div className="text-slate-300 text-[10px] font-black uppercase tracking-[0.2em]">
                                        Aucun rapport trouvé
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};