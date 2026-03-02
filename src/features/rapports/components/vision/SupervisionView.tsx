"use client";

import React, { useState, useEffect, useMemo } from "react";
import { rapportService } from "../../services/rapportService";
import { ApiRapport } from "../../types"; 
import { usePdfExport } from "../../hooks/usePdfExport";
import { usePeriodes } from "@/features/config/hooks/usePeriodes";

// Imports des sous-composants
import { RapportView } from "./RapportView";
import { SupervisionToolbar } from "../form/supervisors/SupervisionToolbar";
import { SupervisionTable } from "../form/supervisors/SupervisionTable";

export const SupervisionView: React.FC = () => {
    // --- ÉTATS ---
    const [rapports, setRapports] = useState<ApiRapport[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedTypeId, setSelectedTypeId] = useState<string>("");
    const [selectedPeriodId, setSelectedPeriodId] = useState<string>("");
    const [entiteFilter, setEntiteFilter] = useState("");

    // PDF States
    const { exportToPdf } = usePdfExport();
    const [selectedForPdf, setSelectedForPdf] = useState<ApiRapport | null>(null);
    const [generatingId, setGeneratingId] = useState<number | null>(null);
    
    const calendrierResult = usePeriodes(false);

    // --- CHARGEMENT ---
    useEffect(() => {
        const load = async () => {
            try {
                const data = await rapportService.getAllRapports(Number(selectedPeriodId));
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
        return rapports;
    }, [rapports, selectedPeriodId]);

    // --- ACTIONS ---
    const handlePdfClick = async (rapport: ApiRapport) => {
        let idFichier = rapport.id || 0;
        setGeneratingId(idFichier);
        setSelectedForPdf(rapport);

        setTimeout(async () => {
            try {
                await exportToPdf("rapport-a4-container", `Rapport_${rapport.user?.entite || 'Entite'}_${idFichier}.pdf`);
            } finally {
                setGeneratingId(null);
                setSelectedForPdf(null);
            }
        }, 500);
    };

    return (
        <div className="space-y-10 pb-20">
            {/* 1. Barre d'outils avec filtres */}
            <SupervisionToolbar 
                selectedTypeId={selectedTypeId}
                setSelectedTypeId={setSelectedTypeId}
                selectedPeriodId={selectedPeriodId}
                setSelectedPeriodId={setSelectedPeriodId}
                entiteFilter={entiteFilter}
                setEntiteFilter={setEntiteFilter}
                entites={entites}
                calendrierResult={calendrierResult}
            />

            {/* 2. Compteur */}
            <div className="flex items-center gap-3">
                <div className="h-0.5 w-4 bg-slate-900"></div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                    Documents reçus : <span className="text-slate-900 font-extrabold text-xs">{filtered.length}</span>
                </p>
            </div>

            {/* 3. Tableau des rapports */}
            <SupervisionTable 
                rapports={filtered}
                isLoading={isLoading}
                generatingId={generatingId}
                onPdfClick={handlePdfClick}
            />

            {/* 4. Rendu masqué pour capture PDF */}
            {selectedForPdf && (
                <div className="fixed left-[-9999px] top-0 pointer-events-none opacity-0">
                    <RapportView rapport={selectedForPdf} />
                </div>
            )}
        </div>
    );
};