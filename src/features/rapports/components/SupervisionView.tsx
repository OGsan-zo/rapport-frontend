"use client";

import React, { useState, useEffect, useMemo } from "react";
import { rapportService } from "../services/rapportService";
import { RapportConsolide } from "../types";
import { usePdfExport } from "../hooks/usePdfExport";
import { RapportView } from "./RapportView";

/**
 * Vue Supervision — tableau de tous les rapports avec filtres.
 */
export const SupervisionView: React.FC = () => {
    const [rapports, setRapports] = useState<RapportConsolide[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [semaineFilter, setSemaineFilter] = useState("");
    const [entiteFilter, setEntiteFilter] = useState("");

    // PDF Generation State
    const { exportToPdf } = usePdfExport();
    const [selectedForPdf, setSelectedForPdf] = useState<RapportConsolide | null>(null);
    const [generatingId, setGeneratingId] = useState<number | null>(null);

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

    // Extraction des entités uniques pour le filtre (mémorisée pour la performance)
    const entites = useMemo(() => {
        const unique = new Map();
        rapports.forEach(r => {
            unique.set(r.user.entite, r.user.entite);
        });
        return Array.from(unique.values()).sort();
    }, [rapports]);

    // Filtrage mémorisé
    const filtered = useMemo(() => {
        return rapports.filter((r) => {
            const matchesEntite = entiteFilter === "" || r.user.entite === entiteFilter;
            
            // Pour la semaine, on vérifie si la date choisie est incluse dans l'intervalle
            const matchesSemaine = semaineFilter === "" || (
                semaineFilter >= r.calendrier.dateDebut && 
                semaineFilter <= r.calendrier.dateFin
            );

            return matchesEntite && matchesSemaine;
        });
    }, [rapports, entiteFilter, semaineFilter]);

    const handlePdfClick = async (rapport: RapportConsolide) => {
        setGeneratingId(rapport.id);
        setSelectedForPdf(rapport);
        
        // Délai pour laisser le temps au DOM "caché" de se rendre proprement
        setTimeout(async () => {
            try {
                const fileName = `Rapport_${rapport.user.entite.replace(/\s+/g, '_')}_Semaine_${rapport.calendrier.dateDebut}.pdf`;
                await exportToPdf("rapport-a4-container", fileName);
            } finally {
                setGeneratingId(null);
                setSelectedForPdf(null);
            }
        }, 600);
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
    };

    const statusClasses: Record<string, string> = {
        VALIDE: "text-green-800 bg-green-50 border border-green-300",
        TRANSMIS: "text-blue-800 bg-blue-50 border border-blue-300",
        BROUILLON: "text-amber-800 bg-amber-50 border border-amber-300",
    };

    return (
        <div className="space-y-6">
            {/* Barre de Filtres */}
            <div className="flex flex-col md:flex-row gap-4 bg-white border border-gray-300 rounded-lg p-5 shadow-sm">
                <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-[11px] font-bold text-gray-500 uppercase">Semaine du rapport</label>
                    <input
                        type="date"
                        value={semaineFilter}
                        onChange={(e) => setSemaineFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
                
                <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-[11px] font-bold text-gray-500 uppercase">Entité / Direction</label>
                    <select
                        value={entiteFilter}
                        onChange={(e) => setEntiteFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Toutes les entités</option>
                        {entites.map((nom) => (
                            <option key={nom} value={nom}>{nom}</option>
                        ))}
                    </select>
                </div>

                {(semaineFilter || entiteFilter) && (
                    <div className="flex items-end">
                        <button
                            onClick={() => { setSemaineFilter(""); setEntiteFilter(""); }}
                            className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors font-medium"
                        >
                            Effacer les filtres
                        </button>
                    </div>
                )}
            </div>

            {/* Statistiques rapides */}
            <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                    <span className="font-bold text-gray-900">{filtered.length}</span> rapport(s) trouvé(s)
                </p>
            </div>

            {/* Tableau des Rapports */}
            <div className="bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-300">
                        <tr>
                            <th className="px-6 py-4 text-[11px] font-bold uppercase text-gray-500">Entité</th>
                            <th className="px-6 py-4 text-[11px] font-bold uppercase text-gray-500">Période</th>
                            <th className="px-6 py-4 text-[11px] font-bold uppercase text-gray-500">Statut</th>
                            <th className="px-6 py-4 text-[11px] font-bold uppercase text-gray-500 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {isLoading ? (
                            Array(3).fill(0).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td colSpan={4} className="px-6 py-8"><div className="h-4 bg-gray-100 rounded w-full" /></td>
                                </tr>
                            ))
                        ) : filtered.map((rapport) => (
                            <tr key={rapport.id} className="hover:bg-blue-50/30 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="text-sm font-bold text-gray-900">{rapport.user.entite}</div>
                                    <div className="text-xs text-gray-500">{rapport.user.email}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    Du {formatDate(rapport.calendrier.dateDebut)} au {formatDate(rapport.calendrier.dateFin)}
                                </td>
                               
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => handlePdfClick(rapport)}
                                        disabled={generatingId === rapport.id}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all shadow-sm disabled:opacity-50"
                                    >
                                        {generatingId === rapport.id ? (
                                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                        )}
                                        {generatingId === rapport.id ? "Génération..." : "Générer PDF"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!isLoading && filtered.length === 0 && (
                    <div className="py-20 text-center text-gray-400">
                        <p>Aucun rapport trouvé pour ces critères.</p>
                    </div>
                )}
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