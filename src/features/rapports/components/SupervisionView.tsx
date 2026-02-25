"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { rapportService } from "../services/rapportService";
import { RapportConsolide } from "../types";
import { usePdfExport } from "../hooks/usePdfExport";
import { RapportView } from "./RapportView";

/**
 * Vue Supervision — tableau de tous les rapports avec filtres semaine et entité.
 * Réservée aux utilisateurs avec rôle ADMIN ou MANAGER.
 */
export const SupervisionView: React.FC = () => {
    const [rapports, setRapports] = useState<RapportConsolide[]>([]);
    const [filtered, setFiltered] = useState<RapportConsolide[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [semaineFilter, setSemaineFilter] = useState("");
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

        if (semaineFilter) {
            result = result.filter(
                (r) => r.dateDebut <= semaineFilter && r.dateFin >= semaineFilter
            );
        }

        if (entiteFilter) {
            result = result.filter((r) => r.entiteId === entiteFilter);
        }

        setFiltered(result);
    }, [semaineFilter, entiteFilter, rapports]);

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
        <div className="space-y-6">
            {/* Filtres */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        Filtrer par semaine (date comprise)
                    </label>
                    <input
                        type="date"
                        value={semaineFilter}
                        onChange={(e) => setSemaineFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-400 rounded text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        Filtrer par entité
                    </label>
                    <select
                        value={entiteFilter}
                        onChange={(e) => setEntiteFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-400 rounded text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        <option value="">Toutes les entités</option>
                        {entites.map((e) => (
                            <option key={e.id} value={e.id}>{e.nom}</option>
                        ))}
                    </select>
                </div>
                {(semaineFilter || entiteFilter) && (
                    <div className="flex items-end">
                        <button
                            onClick={() => { setSemaineFilter(""); setEntiteFilter(""); }}
                            className="px-4 py-2 border border-gray-400 rounded text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            Réinitialiser
                        </button>
                    </div>
                )}
            </div>

            {/* Compteur */}
            <p className="text-sm text-gray-500">
                <span className="font-bold text-gray-800">{filtered.length}</span> rapport{filtered.length !== 1 ? "s" : ""} affiché{filtered.length !== 1 ? "s" : ""}
            </p>

            {/* Tableau */}
            <div className="bg-white border border-gray-400 rounded-lg overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 border-b border-gray-400">
                            <th className="px-6 py-3 text-xs font-bold uppercase text-gray-600 tracking-wider border-r border-gray-300">Entité</th>
                            <th className="px-6 py-3 text-xs font-bold uppercase text-gray-600 tracking-wider border-r border-gray-300">Période</th>
                            <th className="px-6 py-3 text-xs font-bold uppercase text-gray-600 tracking-wider border-r border-gray-300">Créé le</th>
                            <th className="px-6 py-3 text-xs font-bold uppercase text-gray-600 tracking-wider border-r border-gray-300">Statut</th>
                            <th className="px-6 py-3 text-xs font-bold uppercase text-gray-600 tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                        {isLoading ? (
                            Array(4).fill(0).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td colSpan={5} className="px-6 py-4">
                                        <div className="h-4 bg-gray-100 rounded w-3/4" />
                                    </td>
                                </tr>
                            ))
                        ) : filtered.length > 0 ? (
                            filtered.map((rapport) => (
                                <tr key={rapport.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 border-r border-gray-200">
                                        {rapport.entiteNom}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700 border-r border-gray-200">
                                        {formatDate(rapport.dateDebut)} → {formatDate(rapport.dateFin)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 border-r border-gray-200">
                                        {formatDate(rapport.dateCreation)}
                                    </td>
                                    <td className="px-6 py-4 border-r border-gray-200">
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${statusClasses[rapport.status] || "text-gray-600 bg-gray-50 border border-gray-300"}`}>
                                            {rapport.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handlePdfClick(rapport)}
                                            disabled={generatingId === rapport.id}
                                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white text-xs font-bold rounded transition-colors shadow-sm disabled:opacity-50"
                                        >
                                            {generatingId === rapport.id ? (
                                                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            )}
                                            Visualiser
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-16 text-center text-gray-400 text-sm">
                                    Aucun rapport ne correspond aux filtres sélectionnés.
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
