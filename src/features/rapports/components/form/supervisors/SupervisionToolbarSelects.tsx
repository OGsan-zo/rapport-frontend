import React from "react";
import { TypeCalendrierSelect } from "@/features/config/components/TypeCalendrierSelect";
import { PeriodeSelect } from "@/features/config/components/PeriodeSelect";

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
        </>
    );
};