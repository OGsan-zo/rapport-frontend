"use client";

import React from "react";
import { SupervisionToolbarActionsProps } from "@/features/rapports/types/supervision/supervisionType";

export const SupervisionToolbarActions: React.FC<SupervisionToolbarActionsProps> = ({
    hasFilters,
    onClearFilters,
    onConsulter,
    onExportWord,
    isGenerating,
}) => {
    return (
        <div className="flex items-center gap-4">
            {/* Bouton de consultation globale (PDF) */}
            <div className="flex items-center gap-2 border-r border-slate-200 pr-4 mr-2">
                <button
                    onClick={onConsulter}
                    disabled={isGenerating}
                    className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all border border-rose-100 shadow-sm shadow-rose-100/50 disabled:opacity-50"
                >
                    {isGenerating ? (
                        <div className="w-3 h-3 border-2 border-rose-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <span>📕</span>
                    )}
                    <span>PDF</span>
                </button>

                {/* Nouveau bouton Word */}
                <button
                    onClick={onExportWord}
                    disabled={isGenerating}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all border border-blue-100 shadow-sm shadow-blue-100/50 disabled:opacity-50"
                >
                    {isGenerating ? (
                        <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <span>📄</span>
                    )}
                    <span>Word</span>
                </button>

                {/* Bouton Historique */}
                <button
                    onClick={() => { }} // Sera géré via SupervisionView ou prop si nécessaire
                    className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 hover:bg-slate-100 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all border border-slate-100 shadow-sm shadow-slate-100/50"
                >
                    <span>🕒</span>
                    <span>Historique</span>
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