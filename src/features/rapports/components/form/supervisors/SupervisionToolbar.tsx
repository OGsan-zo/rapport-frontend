import React from "react";
import { TypeCalendrierSelect } from "@/features/config/components/TypeCalendrierSelect";
import { PeriodeSelect } from "@/features/config/components/PeriodeSelect";
import { ToolbarTitle } from "../utils/ToolbarTitle"; // Votre nouveau composant !

interface SupervisionToolbarProps {
    selectedTypeId: string;
    setSelectedTypeId: (val: string) => void;
    selectedPeriodId: string;
    setSelectedPeriodId: (val: string) => void;
    entiteFilter: string;
    setEntiteFilter: (val: string) => void;
    entites: string[];
    calendrierResult: any; // Idéalement, typez ceci avec UsePeriodesResult
}

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
    return (
        <div className="sticky top-0 bg-white/80 backdrop-blur-md z-30 py-8 mb-4 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Utilisation de notre composant réutilisable */}
            <ToolbarTitle 
                title="Supervision" 
                description="Pilotage inter-entités" 
            />

            <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Select Type */}
                    <div className="flex items-center gap-2 px-3 border-r border-slate-200">
                        <span className="text-[9px] font-bold uppercase text-slate-400">Type :</span>
                        <TypeCalendrierSelect
                            value={selectedTypeId}
                            onValueChange={(val) => {
                                setSelectedTypeId(val);
                                setSelectedPeriodId(""); // On réinitialise la période
                            }}
                            className="min-w-[160px] border-none bg-transparent shadow-none focus:ring-0"
                        />
                    </div>
                    
                    {/* Select Semaine */}
                    <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-100 flex items-center gap-3">
                        <span className="text-[9px] font-bold uppercase px-3 text-slate-400 border-r border-slate-200">Semaine :</span>
                        <PeriodeSelect
                            value={selectedPeriodId}
                            onValueChange={setSelectedPeriodId}
                            calendrierResult={calendrierResult}
                            typeCalendrierId={selectedTypeId}
                            className="w-[280px]"
                        />
                    </div>

                    {/* Select Entité */}
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

                    {/* Bouton Effacer */}
                    {(selectedPeriodId || entiteFilter) && (
                        <button
                            onClick={() => { setSelectedPeriodId(""); setEntiteFilter(""); }}
                            className="text-[10px] font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest px-2"
                        >
                            Effacer
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};