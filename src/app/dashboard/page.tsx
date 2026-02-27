"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { rapportService } from "@/features/rapports/services/rapportService";
import { ApiRapport } from "@/features/rapports/types"; // Changement ici
import { usePdfExport } from "@/features/rapports/hooks/usePdfExport";
import { RapportView } from "@/features/rapports/components/RapportView";
import { PeriodeSelect } from "@/features/config/components/PeriodeSelect";

export default function DashboardPage() {
    const [rapports, setRapports] = useState<ApiRapport[]>([]);
    const [filtered, setFiltered] = useState<ApiRapport[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPeriodId, setSelectedPeriodId] = useState<string>("");

    const { exportToPdf } = usePdfExport();
    const [selectedForPdf, setSelectedForPdf] = useState<ApiRapport | null>(null);
    const [generatingId, setGeneratingId] = useState<number | null>(null);

    const handlePdfClick = async (rapport: ApiRapport) => {
        let idRp = 0;
        if (rapport.id !== undefined) {
            idRp = rapport.id;
        }
        setGeneratingId(idRp);
        setSelectedForPdf(rapport);

        setTimeout(() => {
            // Utilisation de la date du calendrier liée au rapport
            const year = new Date(rapport.calendrier.dateDebut).getFullYear();
            exportToPdf("rapport-a4-container", `Rapport_H${year}_ID${rapport.id}.pdf`)
                .finally(() => {
                    setGeneratingId(null);
                    setSelectedForPdf(null);
                });
        }, 500);
    };

    useEffect(() => {
        const fetchRapports = async () => {
            try {
                const data = await rapportService.getRapports();
                setRapports(data);
                setFiltered(data);
            } catch (err) {
                console.error("Erreur lors de la récupération des rapports:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRapports();
    }, []);

    useEffect(() => {
        if (!selectedPeriodId) {
            setFiltered(rapports);
            return;
        }
        // Filtrage par l'ID du calendrier
        const filteredData = rapports.filter(r => r.calendrier.id === Number(selectedPeriodId));
        setFiltered(filteredData);
    }, [selectedPeriodId, rapports]);

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "N/A";
        const d = new Date(dateStr);
        return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
    };

    const statusClasses: Record<string, string> = {
        VALIDE: "text-green-800 bg-green-50 border border-green-300",
        TRANSMIS: "text-blue-800 bg-blue-50 border border-blue-300",
        BROUILLON: "text-amber-800 bg-amber-50 border border-amber-300",
    };

    return (
        <div className="space-y-10 pb-20 px-4 md:px-0 max-w-7xl mx-auto">
            {/* Header Archive */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-md z-30 py-8 mb-4 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 transition-all">
                <div className="space-y-1">
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Mes Rapports</h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Archives et suivi des soumissions</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
                    <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-100 flex items-center gap-3 w-full sm:w-auto">
                        <span className="text-[9px] font-bold uppercase px-3 text-slate-400">Filtrer :</span>
                        <PeriodeSelect
                            value={selectedPeriodId}
                            onValueChange={setSelectedPeriodId}
                            className="w-full sm:w-[280px]"
                        />
                    </div>
                    <Link
                        href="/dashboard/nouveau"
                        className="w-full sm:w-auto text-center px-8 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                    >
                        Nouveau
                    </Link>
                </div>
            </div>

            {/* Table des rapports */}
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
                                        <td colSpan={4} className="px-6 py-8"><div className="h-4 bg-slate-100 rounded w-3/4" /></td>
                                    </tr>
                                ))
                            ) : filtered.length > 0 ? (
                                filtered.map((rapport) => (
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

                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handlePdfClick(rapport)}
                                                disabled={generatingId === rapport.id}
                                                className="inline-flex items-center gap-2 px-5 py-2 bg-white border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-lg hover:border-slate-900 hover:text-slate-900 transition-all disabled:opacity-50"
                                            >
                                                {generatingId === rapport.id ? "Chargement..." : "Consulter (PDF)"}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-24 text-center">
                                        <div className="text-slate-300 text-[10px] font-black uppercase tracking-[0.2em]">
                                            Aucun rapport trouvé pour cette sélection
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Zone de rendu PDF masquée */}
            {selectedForPdf && (
                <div className="fixed left-[-9999px] top-0 pointer-events-none opacity-0">
                    <div id="rapport-a4-container">
                        <RapportView rapport={selectedForPdf} />
                    </div>
                </div>
            )}
        </div>
    );
}