"use client";

import React, { useState, useEffect, useMemo } from "react";
import { rapportService } from "../../services/rapportService";
import { ApiRapport } from "../../types";
import { usePeriodes } from "@/features/config/hooks/usePeriodes";
import { usePdfExport } from "../../hooks/usePdfExport";
import { exportToWord } from "../../utils/exportUtils";

// Imports des sous-composants
import { RapportView } from "./RapportView";
import { SupervisionToolbar } from "../form/supervisors/SupervisionToolbar";
import { SupervisionTable } from "../form/supervisors/SupervisionTable";
import { useRapportHistorique } from "../../hooks/useRapportHistorique";
import { HistoriqueListView } from "./HistoriqueListView";
import { HistoriqueDetailView } from "./HistoriqueDetailView";
import { toast } from "react-hot-toast";

export const SupervisionView: React.FC = () => {
    // --- ÉTATS ---
    const [rapports, setRapports] = useState<ApiRapport[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [generatingId, setGeneratingId] = useState<number | string | null>(null);

    const [selectedTypeId, setSelectedTypeId] = useState<string>("");
    const [selectedPeriodId, setSelectedPeriodId] = useState<string>("");
    const [entiteFilter, setEntiteFilter] = useState("");

    // --- ÉTAT NAVIGATION HISTORIQUE ---
    const [viewMode, setViewMode] = useState<"LIST" | "HISTORY_LIST" | "HISTORY_DETAIL">("LIST");
    const [selectedHistoryRapport, setSelectedHistoryRapport] = useState<ApiRapport | null>(null);
    const { history, isLoading: isHistoryLoading, fetchHistory, clearHistory } = useRapportHistorique();

    // --- NOUVEL ÉTAT POUR LES POINTS ---
    const [isPdfMode, setIsPdfMode] = useState<boolean>(true);

    // Hook d'exportation
    const { exportToPdf, isGenerating } = usePdfExport();

    // Data for the hidden rendering zone
    const [selectedForPdf, setSelectedForPdf] = useState<ApiRapport[] | null>(null);

    const calendrierResult = usePeriodes(false);

    // --- AUTO-SELECTION DE LA PÉRIODE ---
    useEffect(() => {
        if (!selectedPeriodId && calendrierResult.data && calendrierResult.data.length > 0) {
            const firstId = calendrierResult.data[0].id;
            if (firstId) {
                // On sélectionne la première période (la plus récente normalement)
                setSelectedPeriodId(firstId.toString());
            }
        }
    }, [calendrierResult.data, selectedPeriodId]);

    // --- CHARGEMENT ---
    useEffect(() => {
        const idCal = Number(selectedPeriodId);
        if (!idCal || idCal <= 0) {
            setRapports([]);
            setIsLoading(false);
            return;
        }

        const load = async () => {
            setIsLoading(true);
            try {
                const data = await rapportService.getAllRapports(idCal);
                setRapports(data);
            } catch (err) {
                console.log("Erreur lors du chargement des rapports:", err);
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, [selectedPeriodId]);

    // --- LOGIQUE FILTRES ---
    const entites = useMemo(() => {
        const unique = new Map();
        rapports.forEach(r => {
            if (r.user?.entite) unique.set(r.user.entite, r.user.entite);
        });
        return Array.from(unique.values()).sort();
    }, [rapports]);

    const filtered = useMemo(() => {
        if (!entiteFilter) return rapports;
        return rapports.filter(r => r.user?.entite === entiteFilter);
    }, [rapports, entiteFilter]);

    // --- ACTIONS HISTORIQUE ---
    const handleOpenHistory = (rapport: ApiRapport) => {
        if (rapport.user?.id && rapport.idCalendrier) {
            fetchHistory(rapport.user.id, rapport.idCalendrier);
            setViewMode("HISTORY_LIST");
        } else {
            toast.error("Informations insuffisantes pour charger l'historique.");
        }
    };

    const handleSelectHistoryVersion = (version: ApiRapport) => {
        setSelectedHistoryRapport(version);
        setViewMode("HISTORY_DETAIL");
    };

    const handleBackFromHistoryList = () => {
        setViewMode("LIST");
        clearHistory();
    };

    const handleBackFromHistoryDetail = () => {
        setViewMode("HISTORY_LIST");
        setSelectedHistoryRapport(null);
    };

    // --- ACTIONS ---
    const handleConsulter = async (reports: ApiRapport[]) => {
        if (reports.length === 0) return;

        // On s'assure que le mode PDF est activé (avec points)
        setIsPdfMode(true);

        const id = reports.length === 1 ? (reports[0].id || "temp") : "consolidation";
        setGeneratingId(id);
        setSelectedForPdf(reports);

        setTimeout(async () => {
            const filename = reports.length > 1
                ? "Consolidation_Rapports.pdf"
                : `Rapport_${reports[0].user?.entite || "Inconnu"}.pdf`;

            await exportToPdf("rapport-a4-container", filename);

            setGeneratingId(null);
            setSelectedForPdf(null);
        }, 600);
    };

    const handleExportWord = async (reports: ApiRapport[]) => {
        if (reports.length === 0) return;

        // Désactivation des points pour l'export Word
        setIsPdfMode(false);

        const id = reports.length === 1 ? (reports[0].id || "temp-word") : "consolidation-word";
        setGeneratingId(id);
        setSelectedForPdf(reports);

        setTimeout(() => {
            const filename = reports.length > 1
                ? "Consolidation_Rapports.doc"
                : `Rapport_${reports[0].user?.entite || "Inconnu"}.doc`;

            exportToWord("rapport-a4-container", filename);

            setGeneratingId(null);
            setSelectedForPdf(null);
            // On peut remettre par défaut après l'export
            setIsPdfMode(true);
        }, 600);
    };

    return (
        <div className="space-y-10 pb-20">
            {/* 1. Barre d'outils */}
            <SupervisionToolbar
                selectedTypeId={selectedTypeId}
                setSelectedTypeId={setSelectedTypeId}
                selectedPeriodId={selectedPeriodId}
                setSelectedPeriodId={setSelectedPeriodId}
                entiteFilter={entiteFilter}
                setEntiteFilter={setEntiteFilter}
                entites={entites}
                calendrierResult={calendrierResult}
                rapports={filtered}
                onConsulter={() => handleConsulter(viewMode === "HISTORY_DETAIL" && selectedHistoryRapport ? [selectedHistoryRapport] : filtered)}
                onExportWord={() => handleExportWord(viewMode === "HISTORY_DETAIL" && selectedHistoryRapport ? [selectedHistoryRapport] : filtered)}
                isGenerating={isGenerating}
            />

            {/* 2. Contenu en fonction du mode de vue */}
            {viewMode === "LIST" && (
                <>
                    <div className="flex items-center gap-3">
                        <div className="h-0.5 w-4 bg-slate-900"></div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                            Documents reçus : <span className="text-slate-900 font-extrabold text-xs">{filtered.length}</span>
                        </p>
                    </div>

                    <SupervisionTable
                        rapports={filtered}
                        isLoading={isLoading}
                        generatingId={generatingId}
                        onPdfClick={(r) => handleConsulter([r])}
                        onHistoryClick={handleOpenHistory}
                    />
                </>
            )}

            {viewMode === "HISTORY_LIST" && (
                <HistoriqueListView
                    history={history}
                    isLoading={isHistoryLoading}
                    onSelectVersion={handleSelectHistoryVersion}
                    onBack={handleBackFromHistoryList}
                />
            )}

            {viewMode === "HISTORY_DETAIL" && selectedHistoryRapport && (
                <HistoriqueDetailView
                    rapport={selectedHistoryRapport}
                    onBack={handleBackFromHistoryDetail}
                />
            )}

            {/* 4. ZONE DE RENDU MASQUÉE */}
            {selectedForPdf && (
                <div className="fixed left-[-9999px] top-0 pointer-events-none opacity-0">
                    <div id="rapport-a4-container" style={{ width: "210mm" }}>
                        <RapportView
                            data={selectedForPdf}
                            isPrintMode={true}
                            isPdf={isPdfMode} // Transmission de l'argument ici
                        />
                    </div>
                </div>
            )}
        </div>
    );
};