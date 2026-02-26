"use client";

import React, { useEffect, useState } from "react";
import { adminService, CalendarPeriod } from "../../admin/services/adminService";

interface SelectPeriodeProps {
    onSelect: (id: number) => void;
    currentId?: number;
    className?: string;
}

export const SelectPeriode: React.FC<SelectPeriodeProps> = ({ onSelect, currentId, className = "" }) => {
    const [periods, setPeriods] = useState<CalendarPeriod[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await adminService.getPeriods();
                setPeriods(data);
                // Si aucun ID n'est fourni, on sélectionne la dernière période par défaut
                if (!currentId && data.length > 0) {
                    onSelect(data[0].id);
                }
            } catch (err) {
                console.error("Erreur chargement périodes", err);
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, []);

    if (isLoading) {
        return (
            <div className={`h-11 w-64 bg-gray-100 animate-pulse rounded border border-gray-200 ${className}`} />
        );
    }

    return (
        <div className={`relative ${className}`}>
            <label className="absolute -top-2 left-3 px-1.5 bg-white text-[9px] font-bold text-slate-300 uppercase tracking-widest z-10 transition-colors">
                Période
            </label>
            <select
                value={currentId || ""}
                onChange={(e) => onSelect(Number(e.target.value))}
                className="w-full bg-white border border-slate-200 rounded-md px-4 py-2.5 text-xs font-medium text-slate-700 focus:border-blue-300 focus:ring-4 focus:ring-blue-50/50 outline-none cursor-pointer appearance-none hover:bg-slate-50/50 transition-all shadow-sm"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23cbd5e1\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
            >
                {periods.map((p) => (
                    <option key={p.id} value={p.id}>
                        Semaine du {new Date(p.dateDebut).toLocaleDateString()} au {new Date(p.dateFin).toLocaleDateString()}
                    </option>
                ))}
            </select>
        </div>
    );
};
