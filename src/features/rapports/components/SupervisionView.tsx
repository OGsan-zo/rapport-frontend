"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { rapportService } from "../services/rapportService";
import { RapportConsolide } from "../types";
import { usePdfExport } from "../hooks/usePdfExport";
import { RapportView } from "./RapportView";
import { SelectPeriode } from "../../common/components/SelectPeriode";

/**
 * Vue Supervision — tableau de tous les rapports avec filtres semaine et entité.
 * Réservée aux utilisateurs avec rôle ADMIN ou MANAGER.
 */
export const SupervisionView: React.FC = () => {
    const [rapports, setRapports] = useState<RapportConsolide[]>([]);
    const [filtered, setFiltered] = useState<RapportConsolide[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedPeriodId, setSelectedPeriodId] = useState<number | undefined>(undefined);
    const [entiteFilter, setEntiteFilter] = useState("");

    // PDF Generation State
    const { exportToPdf } = usePdfExport();
    const [selectedForPdf, setSelectedForPdf] = useState<RapportConsolide | null>(null);
    const [generatingId, setGeneratingId] = useState<string | null>(null);

    const handlePdfClick = async (rapport: RapportConsolide) => {
        setGeneratingId(rapport.id);
        setSelectedForPdf(rapport);
        // Delay for hidden component to mount
        setTimeout(() => {
            exportToPdf("rapport-a4-container", `Rapport_MESUPRES_${new Date(rapport.dateDebut).getFullYear()}_${rapport.entiteNom}.pdf`)
                .finally(() => {
                    setGeneratingId(null);
                    setSelectedForPdf(null);
                });
        }, 500);
    };

    const entites = rapportService.getEntitesFromRapports();

    useEffect(() => {
        const load = async () => {
            try {
                const data = await rapportService.getAllRapports();
                setRapports(data);
                setFiltered(data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, []);

    // Filtrage côté client pour fluidité
    useEffect(() => {
        let result = [...rapports];

        if (selectedPeriodId) {
            // Dans un cas réel, filtrer par idCalendrier
            // Ici on simule ou on garde tout si mocké
        }

        if (entiteFilter) {
            result = result.filter((r) => r.entiteId === entiteFilter);
        }

        setFiltered(result);
    }, [selectedPeriodId, entiteFilter, rapports]);

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
    };

    const statusClasses: Record<string, string> = {
        VALIDE: "text-green-800 bg-green-50 border border-green-300",
        TRANSMIS: "text-blue-800 bg-blue-50 border border-blue-300",
        BROUILLON: "text-amber-800 bg-amber-50 border border-amber-300",
    };

    return (
        <div className="space-y-10 pb-20">
            {/* Toolbar Supervision - Clean & Professional */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-md z-30 py-8 mb-4 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 transition-all">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">Supervision</h1>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-1">Pilotage inter-entités ESPA / MESUPRES</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-100 flex items-center gap-3">
                        <span className="text-[9px] font-bold uppercase px-3 text-slate-400 border-r border-slate-200">Semaine :</span>
                        <SelectPeriode
                            currentId={selectedPeriodId}
                            onSelect={setSelectedPeriodId}
                            className="w-[280px]"
                        />
                    </div>

                    <div className="relative min-w-[240px]">
                        <select
                            value={entiteFilter}
                            onChange={(e) => setEntiteFilter(e.target.value)}
                            className="w-full bg-white border border-slate-200 px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg focus:ring-1 focus:ring-slate-900 outline-none cursor-pointer appearance-none hover:border-slate-400 transition-all text-slate-600"
                        >
                            <option value="">Tous les services</option>
                            {entites.map((e) => (
                                <option key={e.id} value={e.id}>{e.nom}</option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg className="w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                    </div>

                    {(selectedPeriodId || entiteFilter) && (
                        <button
                            onClick={() => { setSelectedPeriodId(undefined); setEntiteFilter(""); }}
                            className="text-[10px] font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest px-2 transition-colors"
                        >
                            Réinitialiser
                        </button>
                    )}
                </div>
            </div>

            {/* Counter Section */}
            <div className="flex items-center gap-3">
                <div className="h-0.5 w-4 bg-slate-900"></div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                    Documents reçus : <span className="text-slate-900 font-extrabold text-xs">{filtered.length}</span>
                </p>
            </div>

            {/* Table Supervision - Modernized */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm shadow-slate-100">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-200">
                            <th className="px-6 py-5 text-[10px] font-bold uppercase text-slate-500 tracking-wider border-r border-slate-200/50">Entité Émettrice</th>
                            <th className="px-6 py-5 text-[10px] font-bold uppercase text-slate-500 tracking-wider border-r border-slate-200/50">Période</th>
                            <th className="px-6 py-5 text-[10px] font-bold uppercase text-slate-500 tracking-wider border-r border-slate-200/50 text-center">État</th>
                            <th className="px-6 py-5 text-[10px] font-bold uppercase text-slate-500 tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {isLoading ? (
                            Array(4).fill(0).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td colSpan={5} className="px-6 py-6 border-r border-slate-100/50">
                                        <div className="h-4 bg-slate-50 w-3/4 rounded" />
                                    </td>
                                </tr>
                            ))
                        ) : filtered.length > 0 ? (
                            filtered.map((rapport) => (
                                <tr key={rapport.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-5 text-sm font-bold text-slate-900 border-r border-slate-100 uppercase tracking-tighter">
                                        {rapport.entiteNom}
                                    </td>
                                    <td className="px-6 py-5 text-xs font-medium text-slate-500 border-r border-slate-100 italic">
                                        Semaine du {formatDate(rapport.dateDebut)} au {formatDate(rapport.dateFin)}
                                    </td>
                                    <td className="px-6 py-5 border-r border-slate-100 text-center">
                                        <span className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider border rounded-md ${statusClasses[rapport.status] || "text-slate-500 bg-slate-50 border-slate-200"}`}>
                                            {rapport.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button
                                            onClick={() => handlePdfClick(rapport)}
                                            disabled={generatingId === rapport.id}
                                            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-widest rounded-lg hover:border-slate-900 hover:text-slate-900 transition-all disabled:opacity-50"
                                        >
                                            {generatingId === rapport.id ? "..." : "Consulter"}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-20 text-center text-slate-400 text-[10px] font-medium uppercase tracking-widest">
                                    Aucune archive disponible.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Hidden renderer for PDF capture */}
            {selectedForPdf && (
                <div className="fixed left-[-9999px] top-0 pointer-events-none opacity-0 overflow-hidden">
                    <RapportView rapport={selectedForPdf} />
                </div>
            )}
        </div>
    );
};
