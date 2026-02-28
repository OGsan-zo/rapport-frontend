"use client";

import React, { useState, useEffect, useMemo } from "react";
import { rapportService } from "../../services/rapportService";
import { ApiRapport } from "../../types"; 
import { usePdfExport } from "../../hooks/usePdfExport";
import { RapportView } from "./RapportView";
import { PeriodeSelect } from "@/features/config/components/PeriodeSelect";
import { TypeCalendrierSelect } from "@/features/config/components/TypeCalendrierSelect";
import { usePeriodes } from "@/features/config/hooks/usePeriodes";

/**
 * Vue Supervision — tableau de tous les rapports avec filtres.
 */
export const SupervisionView: React.FC = () => {
    const [rapports, setRapports] = useState<ApiRapport[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedTypeId, setSelectedTypeId] = useState<string>("");
    const [selectedPeriodId, setSelectedPeriodId] = useState<string>("");
    const [entiteFilter, setEntiteFilter] = useState("");

    // PDF Generation State
    const { exportToPdf } = usePdfExport();
    const [selectedForPdf, setSelectedForPdf] = useState<ApiRapport | null>(null);
    const [generatingId, setGeneratingId] = useState<number | null>(null);
    
    // 1. CORRECTION : Appel correct du hook (selectedTypeId en 1er argument)
    const calendrierResult = usePeriodes(false);

    // Chargement initial
    useEffect(() => {
        const load = async () => {
            try {
                const data = await rapportService.getAllRapports();
                setRapports(data);
            } catch (err) {
                console.error("Erreur lors du chargement des rapports:", err);
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, []);

    // Extraction des entités uniques pour le filtre
    const entites = useMemo(() => {
        const unique = new Map();
        rapports.forEach(r => {
            if (r.user?.entite) {
                unique.set(r.user.entite, r.user.entite);
            }
        });
        return Array.from(unique.values()).sort();
    }, [rapports]);

    // Logique de filtrage
    const filtered = useMemo(() => {
        return rapports.filter((r) => {
            const matchesEntite = entiteFilter === "" || r.user?.entite === entiteFilter;
            // 2. CORRECTION : Il faut comparer avec r.calendrier.id, et pas r.id (qui est l'ID du rapport)
            const matchesSemaine = !selectedPeriodId || r.calendrier?.id === Number(selectedPeriodId);
            
            return matchesEntite && matchesSemaine;
        });
    }, [rapports, entiteFilter, selectedPeriodId]);

    const handlePdfClick = async (rapport: ApiRapport) => {
        let idFichier = rapport.id || 0;
        
        setGeneratingId(idFichier);
        setSelectedForPdf(rapport);

        // Petit délai pour laisser React injecter le composant RapportView dans le DOM masqué
        setTimeout(async () => {
            try {
                await exportToPdf("rapport-a4-container", `Rapport_${rapport.user?.entite || 'Entite'}_${idFichier}.pdf`);
            } finally {
                setGeneratingId(null);
                setSelectedForPdf(null);
            }
        }, 500);
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "N/A";
        return new Date(dateStr).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
    };

    const statusClasses: Record<string, string> = {
        VALIDE: "text-green-800 bg-green-50 border border-green-300",
        TRANSMIS: "text-blue-800 bg-blue-50 border border-blue-300",
        BROUILLON: "text-amber-800 bg-amber-50 border border-amber-300",
    };

    return (
        <div className="space-y-10 pb-20">
            {/* Toolbar Supervision */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-md z-30 py-8 mb-4 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">Supervision</h1>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-1">Pilotage inter-entités</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        {/* Select Type */}
                        <div className="flex items-center gap-2 px-3 border-r border-slate-200">
                            <span className="text-[9px] font-bold uppercase text-slate-400">Type :</span>
                            <TypeCalendrierSelect
                                value={selectedTypeId}
                                onValueChange={(val) => {
                                    setSelectedTypeId(val);
                                    setSelectedPeriodId(""); // On réinitialise la période si on change de type
                                }}
                                className="min-w-[160px] border-none bg-transparent shadow-none focus:ring-0"
                            />
                        </div>
                        
                        <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-100 flex items-center gap-3">
                            <span className="text-[9px] font-bold uppercase px-3 text-slate-400 border-r border-slate-200">Semaine :</span>
                            <PeriodeSelect
                                value={selectedPeriodId}
                                onValueChange={setSelectedPeriodId}
                                // 3. CORRECTION : On utilise la bonne prop (periodeState) comme vu précédemment
                                calendrierResult={calendrierResult}
                                typeCalendrierId={selectedTypeId}
                                className="w-[280px]"
                            />
                        </div>

                        <div className="relative min-w-[240px]">
                            <select
                                value={entiteFilter}
                                onChange={(e) => setEntiteFilter(e.target.value)}
                                className="w-full bg-white border border-slate-200 px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg outline-none cursor-pointer text-slate-600"
                            >
                                <option value="">Tous les services</option>
                                {entites.map((entite) => (
                                    <option key={entite} value={entite}>{entite}</option>
                                ))}
                            </select>
                        </div>

                        {(selectedPeriodId || entiteFilter) && (
                            <button
                                onClick={() => { setSelectedPeriodId(""); setEntiteFilter(""); }}
                                className="text-[10px] font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest px-2"
                            >
                                Effacer
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Counter Section */}
            <div className="flex items-center gap-3">
                <div className="h-0.5 w-4 bg-slate-900"></div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                    Documents reçus : <span className="text-slate-900 font-extrabold text-xs">{filtered.length}</span>
                </p>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-200">
                            <th className="px-6 py-5 text-[10px] font-bold uppercase text-slate-500 tracking-wider">Entité Émettrice</th>
                            <th className="px-6 py-5 text-[10px] font-bold uppercase text-slate-500 tracking-wider">Période</th>
                            <th className="px-6 py-5 text-[10px] font-bold uppercase text-slate-500 tracking-wider text-center">État</th>
                            <th className="px-6 py-5 text-[10px] font-bold uppercase text-slate-500 tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {isLoading ? (
                            Array(4).fill(0).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td colSpan={4} className="px-6 py-6"><div className="h-4 bg-slate-50 w-3/4 rounded" /></td>
                                </tr>
                            ))
                        ) : filtered.length > 0 ? (
                            filtered.map((rapport) => {
                                // Par sécurité, on s'assure d'avoir un statut
                                const statut = (rapport as any).statut || "TRANSMIS";
                                
                                return (
                                <tr key={rapport.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-5">
                                        <div className="text-sm font-bold text-slate-900 uppercase">{rapport.user?.entite}</div>
                                        <div className="text-[10px] text-slate-400 lowercase">{rapport.user?.email}</div>
                                    </td>
                                    
                                    <td className="px-6 py-5 text-xs text-slate-500 italic">
                                        Du {formatDate(rapport.calendrier?.dateDebut)} au {formatDate(rapport.calendrier?.dateFin)}
                                    </td>

                                    {/* 4. CORRECTION : Ajout de la colonne État manquante */}
                                    <td className="px-6 py-5 text-center">
                                        <span className={`px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full ${statusClasses[statut] || statusClasses.TRANSMIS}`}>
                                            {statut}
                                        </span>
                                    </td>

                                    <td className="px-6 py-5 text-right">
                                        <button
                                            onClick={() => handlePdfClick(rapport)}
                                            disabled={generatingId !== null}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all disabled:opacity-50"
                                        >
                                            {generatingId === rapport.id ? (
                                                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            ) : "Consulter / PDF"}
                                        </button>
                                    </td>
                                </tr>
                            )})
                        ) : (
                            <tr>
                                <td colSpan={4} className="py-20 text-center text-slate-400 text-[10px] font-medium uppercase tracking-widest">
                                    Aucun rapport trouvé.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Rendu masqué pour capture PDF */}
            {selectedForPdf && (
                <div className="fixed left-[-9999px] top-0 pointer-events-none opacity-0">
                    <RapportView rapport={selectedForPdf} />
                </div>
            )}
        </div>
    );
};