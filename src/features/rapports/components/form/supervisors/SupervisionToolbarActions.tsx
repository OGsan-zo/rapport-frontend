"use client";

import React from "react";
import { SupervisionToolbarActionsProps } from "@/features/rapports/types/supervision/supervisionType";

export const SupervisionToolbarActions: React.FC<SupervisionToolbarActionsProps> = ({
    hasFilters,
    onClearFilters,
    onConsulter,
    isGenerating,
}) => {
    return (
        <div className="flex items-center gap-4">
            {/* Bouton de consultation globale */}
            <div className="border-r border-slate-200 pr-4 mr-2">
                <button
                    onClick={onConsulter}
                    disabled={isGenerating}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all border border-indigo-100 shadow-sm shadow-indigo-100/50 disabled:opacity-50"
                >
                    {isGenerating ? (
                        <div className="w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <span>👁️</span>
                    )}
                    <span>Consulter la sélection</span>
                </button>
            </div>

            {/* Bouton Effacer (affiché seulement si filtre actif) */}
            {hasFilters && (
                <button
                    onClick={onClearFilters}
                    className="text-[10px] font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest px-2 transition-colors"
                >
                    Effacer
                </button>
            )}
        </div>
    );
};