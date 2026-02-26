"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { rapportService } from "@/features/rapports/services/rapportService";
import { RapportConsolide } from "@/features/rapports/types";
import { usePdfExport } from "@/features/rapports/hooks/usePdfExport";
import { RapportView } from "@/features/rapports/components/RapportView";
import { SelectPeriode } from "@/features/common/components/SelectPeriode";

export default function DashboardPage() {
    const [rapports, setRapports] = useState<RapportConsolide[]>([]);
    const [filtered, setFiltered] = useState<RapportConsolide[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPeriodId, setSelectedPeriodId] = useState<number | undefined>(undefined);

    const { exportToPdf } = usePdfExport();
    const [selectedForPdf, setSelectedForPdf] = useState<RapportConsolide | null>(null);
    // On change le type de generatingId pour accepter number | null
    const [generatingId, setGeneratingId] = useState<number | null>(null);

    const handlePdfClick = async (rapport: RapportConsolide) => {
        setGeneratingId(rapport.id);
        setSelectedForPdf(rapport);
        
        setTimeout(() => {
            // Accès via rapport.calendrier.dateDebut
            const year = new Date(rapport.calendrier.dateDebut).getFullYear();
            exportToPdf("rapport-a4-container", `Rapport_MESUPRES_${year}.pdf`)
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
                // Assurez-vous que votre service renvoie bien le tableau "data" du JSON
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
<<<<<<< HEAD
        const result = dateFilter === ""
            ? rapports
            : rapports.filter((r) => 
                r.calendrier.dateDebut.includes(dateFilter) || 
                r.calendrier.dateFin.includes(dateFilter)
            );
        setFiltered(result);
    }, [dateFilter, rapports]);
=======
        if (selectedPeriodId === undefined) {
            setFiltered(rapports);
            return;
        }
        // Pour les données réelles on devrait filtrer par idCalendrier
        // Ici on simule ou on filtre sur les rapports existants
        setFiltered(rapports);
    }, [selectedPeriodId, rapports]);
>>>>>>> baf3d479b8433c07503f531cfa100c7626d50014

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
    };

    // Note: Le JSON fourni ne contient pas de champ "status", 
    // assurez-vous qu'il soit bien présent dans la réponse API réelle.
    const statusClasses: Record<string, string> = {
        VALIDE: "text-green-800 bg-green-50 border border-green-300",
        TRANSMIS: "text-blue-800 bg-blue-50 border border-blue-300",
        BROUILLON: "text-amber-800 bg-amber-50 border border-amber-300",
    };

    return (
<<<<<<< HEAD
        <div className="space-y-6">
            {/* En-tête et Filtre inchangés */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Mes Rapports</h1>
                    <p className="text-sm text-gray-500 mt-1">Historique de vos rapports hebdomadaires</p>
=======
        <div className="space-y-10 pb-20">
            {/* Header Archive - Clean & Integrated */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-md z-30 py-8 mb-4 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 transition-all">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">Mes Rapports</h1>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-1">Consultation des archives de service</p>
                </div>

                <div className="flex items-center gap-6">
                    <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-100 flex items-center gap-3">
                        <span className="text-[9px] font-bold uppercase px-3 text-slate-400">Semaine :</span>
                        <SelectPeriode
                            currentId={selectedPeriodId}
                            onSelect={setSelectedPeriodId}
                            className="w-[280px]"
                        />
                    </div>
                    <Link
                        href="/dashboard/nouveau"
                        className="px-6 py-2 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-all shadow-sm shadow-slate-200"
                    >
                        Nouveau
                    </Link>
>>>>>>> baf3d479b8433c07503f531cfa100c7626d50014
                </div>
            </div>

<<<<<<< HEAD
            <div className="relative max-w-xs">
                <input
                    type="text"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    placeholder="Filtrer par date…"
                    className="w-full px-4 py-2 border border-gray-400 rounded text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="bg-white border border-gray-400 rounded-lg overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 border-b border-gray-400">
                            <th className="px-6 py-3 text-xs font-bold uppercase text-gray-600 tracking-wider border-r border-gray-300">Période</th>
                            <th className="px-6 py-3 text-xs font-bold uppercase text-gray-600 tracking-wider border-r border-gray-300">Entité</th>
                            <th className="px-6 py-3 text-xs font-bold uppercase text-gray-600 tracking-wider text-right">Action</th>
=======
            {/* Table "Canevas" - Modernized */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm shadow-slate-100">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-200">
                            <th className="px-6 py-5 text-[10px] font-bold uppercase text-slate-500 tracking-wider border-r border-slate-200/50">Période du Rapport</th>
                            <th className="px-6 py-5 text-[10px] font-bold uppercase text-slate-500 tracking-wider border-r border-slate-200/50">Entité Émettrice</th>
                            <th className="px-6 py-5 text-[10px] font-bold uppercase text-slate-500 tracking-wider border-r border-slate-200/50 text-center">État</th>
                            <th className="px-6 py-5 text-[10px] font-bold uppercase text-slate-500 tracking-wider text-right">Action</th>
>>>>>>> baf3d479b8433c07503f531cfa100c7626d50014
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {isLoading ? (
                            Array(4).fill(0).map((_, i) => (
                                <tr key={i} className="animate-pulse">
<<<<<<< HEAD
                                    <td colSpan={4} className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-2/3" /></td>
=======
                                    <td colSpan={4} className="px-6 py-6 border-r border-slate-100/50">
                                        <div className="h-4 bg-slate-50 w-2/3 rounded" />
                                    </td>
>>>>>>> baf3d479b8433c07503f531cfa100c7626d50014
                                </tr>
                            ))
                        ) : filtered.length > 0 ? (
                            filtered.map((rapport) => (
<<<<<<< HEAD
                                <tr key={rapport.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-semibold text-sm text-gray-900 border-r border-gray-200">
                                        {/* Correction accès dates */}
                                        Du {formatDate(rapport.calendrier.dateDebut)} au {formatDate(rapport.calendrier.dateFin)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700 border-r border-gray-200">
                                        {/* Correction accès entité */}
                                        {rapport.user.entite}
=======
                                <tr key={rapport.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-5 font-bold text-sm text-slate-900 border-r border-slate-100">
                                        Du {formatDate(rapport.dateDebut)} au {formatDate(rapport.dateFin)}
                                    </td>
                                    <td className="px-6 py-4 text-[11px] font-medium text-slate-500 border-r border-slate-100 uppercase tracking-wider">
                                        {rapport.entiteNom}
                                    </td>
                                    <td className="px-6 py-4 border-r border-slate-100 text-center">
                                        <span className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-md border ${statusClasses[rapport.status] || "text-slate-500 bg-slate-50 border-slate-200"}`}>
                                            {rapport.status}
                                        </span>
>>>>>>> baf3d479b8433c07503f531cfa100c7626d50014
                                    </td>
                            
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handlePdfClick(rapport)}
                                            disabled={generatingId === rapport.id}
                                            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-widest rounded-lg hover:border-slate-900 hover:text-slate-900 transition-all disabled:opacity-50"
                                        >
<<<<<<< HEAD
                                            {generatingId === rapport.id ? (
                                                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <span>Visualiser</span>
                                            )}
=======
                                            {generatingId === rapport.id ? "..." : "Consulter"}
>>>>>>> baf3d479b8433c07503f531cfa100c7626d50014
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
<<<<<<< HEAD
                                <td colSpan={4} className="px-6 py-16 text-center text-gray-400 text-sm">Aucun rapport trouvé.</td>
=======
                                <td colSpan={4} className="px-6 py-20 text-center text-slate-400 text-[10px] font-medium uppercase tracking-widest">
                                    Aucun rapport archivé.
                                </td>
>>>>>>> baf3d479b8433c07503f531cfa100c7626d50014
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {selectedForPdf && (
                <div className="fixed left-[-9999px] top-0 pointer-events-none opacity-0 overflow-hidden">
                    <RapportView rapport={selectedForPdf} />
                </div>
            )}
        </div>
    );
}