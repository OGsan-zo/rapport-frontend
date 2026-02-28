import React from "react";
import { ToolbarSelects } from "../utils/ToolbarSelect"; // Adaptez le chemin d'import selon votre structure

interface SupervisionToolbarSelectsProps {
    selectedTypeId: string;
    setSelectedTypeId: (val: string) => void;
    selectedPeriodId: string;
    setSelectedPeriodId: (val: string) => void;
    entiteFilter: string;
    setEntiteFilter: (val: string) => void;
    entites: string[];
    calendrierResult: any;
}

export const SupervisionToolbarSelects: React.FC<SupervisionToolbarSelectsProps> = ({
    selectedTypeId,
    setSelectedTypeId,
    selectedPeriodId,
    setSelectedPeriodId,
    entiteFilter,
    setEntiteFilter,
    entites,
    calendrierResult,
}) => {
    return (
        <>
            {/* 1. Composant générique pour Type et Période */}
            <ToolbarSelects
                selectedTypeId={selectedTypeId}
                onTypeChange={(val) => {
                    setSelectedTypeId(val);
                    setSelectedPeriodId(""); // On réinitialise la période lors du changement de type
                }}
                periodeValue={selectedPeriodId}
                onPeriodeChange={setSelectedPeriodId}
                calendrierResult={calendrierResult}
            />

            {/* 2. Select Entité (Spécifique à la vue Supervision) */}
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
        </>
    );
};