import React from "react";
import { formatLongDate } from "@/features/common/utils/dateUtils";
import { AppTableSkeleton } from "@/features/common/components/ui/AppTableSkeleton";
import { CalendarPeriod } from "@/features/rapports/types/calendrier/calendrierType";

interface PeriodListProps {
    periods: CalendarPeriod[];
    isLoading: boolean;
    filterStart: string;
    filterEnd: string;
    onFilterChange: (start: string, end: string) => void;
}

export const PeriodList = ({ periods, isLoading, filterStart, filterEnd, onFilterChange }: PeriodListProps) => {
    return (
        <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-wrap items-end gap-4 shadow-sm">
                <div className="flex-1 min-w-[150px] space-y-2">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">Filtrer du</label>
                    <input type="date" value={filterStart} onChange={(e) => onFilterChange(e.target.value, filterEnd)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium outline-none focus:ring-1 focus:ring-slate-900" />
                </div>
                <div className="flex-1 min-w-[150px] space-y-2">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">Au</label>
                    <input type="date" value={filterEnd} onChange={(e) => onFilterChange(filterStart, e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium outline-none focus:ring-1 focus:ring-slate-900" />
                </div>
                <button onClick={() => onFilterChange("", "")} className="px-4 py-2 text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600">Réinitialiser</button>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto overflow-y-auto max-h-[500px]">
                    <table className="w-full border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
                            <tr><th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 text-left">Périodes enregistrées</th></tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr><td><AppTableSkeleton rows={6} cols={1} /></td></tr>
                            ) : periods.length > 0 ? (
                                periods.map((p) => (
                                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-4 text-sm text-slate-700">
                                            <div className="flex items-center gap-2">
                                                <span className="h-1.5 w-1.5 rounded-full bg-slate-900"></span>
                                                Semaine du <span className="font-bold">{formatLongDate(p.dateDebut)}</span> au <span className="font-bold">{formatLongDate(p.dateFin)}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td className="p-12 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">Aucune période trouvée</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};