import React from "react";
import { SupervisionToolbarActionsProps } from "@/features/rapports/types/supervision/supervisionType";

export const SupervisionToolbarActions: React.FC<SupervisionToolbarActionsProps> = ({
    hasFilters,
    onClearFilters,
}) => {
    // Si aucun filtre n'est actif, on n'affiche pas le bouton
    if (!hasFilters) return null;

    return (
        <button
            onClick={onClearFilters}
            className="text-[10px] font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest px-2 transition-colors"
        >
            Effacer
        </button>
    );
};