import React from "react";
import { ToolbarTitle } from "../utils/ToolbarTitle";
import { SupervisionToolbarSelects } from "./SupervisionToolbarSelects";
import { SupervisionToolbarActions } from "./SupervisionToolbarActions";
import { SupervisionToolbarProps } from "@/features/rapports/types/supervision/supervisionType";


export const SupervisionToolbar: React.FC<SupervisionToolbarProps> = ({
    selectedTypeId,
    setSelectedTypeId,
    selectedPeriodId,
    setSelectedPeriodId,
    entiteFilter,
    setEntiteFilter,
    entites,
    calendrierResult,
}) => {
    
    // Logique dérivée pour savoir si on doit afficher le bouton "Effacer"
    const hasFilters = Boolean(selectedPeriodId || entiteFilter);

    // Fonction encapsulée pour nettoyer les filtres
    const handleClearFilters = () => {
        setSelectedPeriodId("");
        setEntiteFilter("");
    };

    return (
        <div className="sticky top-0 bg-white/80 backdrop-blur-md z-30 py-8 mb-4 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* 1. Le Titre */}
            <ToolbarTitle 
                title="Supervision" 
                description="Pilotage inter-entités" 
            />

            <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    
                    {/* 2. Les Filtres (Selects) */}
                    <SupervisionToolbarSelects 
                        selectedTypeId={selectedTypeId}
                        setSelectedTypeId={setSelectedTypeId}
                        selectedPeriodId={selectedPeriodId}
                        setSelectedPeriodId={setSelectedPeriodId}
                        entiteFilter={entiteFilter}
                        setEntiteFilter={setEntiteFilter}
                        entites={entites}
                        calendrierResult={calendrierResult}
                    />

                    {/* 3. Les Actions (Boutons) */}
                    <SupervisionToolbarActions 
                        hasFilters={hasFilters}
                        onClearFilters={handleClearFilters}
                    />
                    
                </div>
            </div>
        </div>
    );
};