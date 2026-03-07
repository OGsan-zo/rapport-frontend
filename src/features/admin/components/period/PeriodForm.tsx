"use client";

import React, { useEffect, useState, useCallback } from "react";
import { periodeService } from "@/features/config/services/periodeService";
import { CalendarPeriod } from "@/features/rapports/types/calendrier/calendrierType";
import { PeriodCreateForm } from "./form/PeriodCreateForm";
import { PeriodList } from "./liste/PeriodList";
import { PeriodFormValues } from "@/features/admin/type/period/periodSchema";
import toast from "react-hot-toast";

export const PeriodForm = () => {
    const [periods, setPeriods] = useState<CalendarPeriod[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [filters, setFilters] = useState({ start: "", end: "" });

    const fetchPeriods = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await periodeService.getPeriods(filters.start || null, filters.end || null);
            setPeriods(data);
        } catch (err) {
            toast.error("Erreur lors du chargement des périodes");
        } finally {
            setIsLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchPeriods();
    }, [fetchPeriods]);

    const handleCreate = async (data: PeriodFormValues, resetForm: () => void) => {
        setFeedback(null);
        try {
            await periodeService.createPeriod(data.debut, data.fin, Number(data.typeCalendrierId));
            resetForm();
            setFeedback({ type: "success", message: "Période créée avec succès !" });
            fetchPeriods();
            setTimeout(() => setFeedback(null), 3000);
        } catch (err: any) {
            setFeedback({ type: "error", message: err.message || "Erreur de création" });
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">Calendrier</h1>
                    <p className="text-slate-400 text-[11px] font-medium uppercase tracking-widest mt-2 px-1 border-l-2 border-slate-900">Configuration</p>
                </div>
                <PeriodCreateForm onSubmit={handleCreate} feedback={feedback} />
            </div>

            <div className="lg:col-span-2">
                <PeriodList 
                    periods={periods} 
                    isLoading={isLoading} 
                    filterStart={filters.start} 
                    filterEnd={filters.end} 
                    onFilterChange={(start, end) => setFilters({ start, end })}
                />
            </div>
        </div>
    );
};