"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { rapportService } from "@/features/rapports/services/rapportService";
import { RapportConsolide } from "@/features/rapports/types";
import { usePdfExport } from "@/features/rapports/hooks/usePdfExport";
import { RapportView } from "@/features/rapports/components/RapportView";

/**
 * Page "Mes Rapports" — liste des rapports de l'utilisateur connecté.
 */
export default function DashboardPage() {
    const [rapports, setRapports] = useState<RapportConsolide[]>([]);
    const [filtered, setFiltered] = useState<RapportConsolide[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dateFilter, setDateFilter] = useState("");

    // PDF Generation State
    const { exportToPdf, isGenerating } = usePdfExport();
    const [selectedForPdf, setSelectedForPdf] = useState<RapportConsolide | null>(null);
    const [generatingId, setGeneratingId] = useState<string | null>(null);

    const handlePdfClick = async (rapport: RapportConsolide) => {
        setGeneratingId(rapport.id);
        setSelectedForPdf(rapport);
        // Delay for hidden component to mount
        setTimeout(() => {
            exportToPdf("rapport-a4-container", `Rapport_MESUPRES_${new Date(rapport.dateDebut).getFullYear()}.pdf`)
                .finally(() => {
                    setGeneratingId(null);
                    setSelectedForPdf(null);
                });
        }, 500);
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await rapportService.getRapports();
                setRapports(data);
                setFiltered(data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetch();
    }, []);

    useEffect(() => {
        const result = dateFilter === ""
            ? rapports
            : rapports.filter((r) => r.dateDebut.includes(dateFilter) || r.dateFin.includes(dateFilter));
        setFiltered(result);
    }, [dateFilter, rapports]);

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
    };

    const statusClasses: Record<string, string> = {
        VALIDE: "text-green-800 bg-green-50 border border-green-300",
        TRANSMIS: "text-blue-800 bg-blue-50 border border-blue-300",
        BROUILLON: "text-amber-800 bg-amber-50 border border-amber-300",
    };

    return (
        <div className="space-y-6">
            {/* En-tête */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Mes Rapports</h1>
                    <p className="text-sm text-gray-500 mt-1">Historique de vos rapports hebdomadaires</p>
                </div>
                <Link
                    href="/dashboard/nouveau"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-black text-white text-sm font-semibold rounded transition-colors shadow-sm"
                >
                    <span>+</span> Nouveau Rapport
                </Link>
            </div>

            {/* Filtre */}
            <div className="relative max-w-xs">
                <input
                    type="text"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    placeholder="Filtrer par date…"
                    className="w-full px-4 py-2 border border-gray-400 rounded text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            {/* Tableau */}
            <div className="bg-white border border-gray-400 rounded-lg overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 border-b border-gray-400">
                            <th className="px-6 py-3 text-xs font-bold uppercase text-gray-600 tracking-wider border-r border-gray-300">Période</th>
                            <th className="px-6 py-3 text-xs font-bold uppercase text-gray-600 tracking-wider border-r border-gray-300">Entité</th>
                            <th className="px-6 py-3 text-xs font-bold uppercase text-gray-600 tracking-wider border-r border-gray-300">Statut</th>
                            <th className="px-6 py-3 text-xs font-bold uppercase text-gray-600 tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                        {isLoading ? (
                            Array(4).fill(0).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td colSpan={4} className="px-6 py-4">
                                        <div className="h-4 bg-gray-100 rounded w-2/3" />
                                    </td>
                                </tr>
                            ))
                        ) : filtered.length > 0 ? (
                            filtered.map((rapport) => (
                                <tr key={rapport.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-semibold text-sm text-gray-900 border-r border-gray-200">
                                        Du {formatDate(rapport.dateDebut)} au {formatDate(rapport.dateFin)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700 border-r border-gray-200">
                                        {rapport.entiteNom}
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
                                <td colSpan={4} className="px-6 py-16 text-center text-gray-400 text-sm">
                                    Aucun rapport trouvé.
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
}
