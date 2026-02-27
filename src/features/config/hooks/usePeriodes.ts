import { useState, useEffect, useMemo } from "react";
import { periodeService } from "../services/periodeService";
import { CalendarPeriod } from "../types";

export const usePeriodes = (selectedTypeId?: string | number,isInsert: boolean= false) => {
    const [data, setData] = useState<CalendarPeriod[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPeriods = async () => {
        setIsLoading(true);
        setError(null);
        try {
            var periods: CalendarPeriod[] = [];
            if (isInsert) {
                periods = await periodeService.getPeriodsUtilisateur();
            }
            else {
                periods = await periodeService.getPeriods();
            }
            setData(periods);
        } catch (err: any) {
            setError(err.message || "Erreur lors du chargement des périodes");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPeriods();
    }, []);

    const filteredData = useMemo(() => {
        if (!selectedTypeId || selectedTypeId === "") return data;

        const typeId = Number(selectedTypeId);
        return data.filter(p => {
            // Règle stricte demandée : vérifier l'ID dans l'objet typeCalendrier
            return p.typeCalendrier?.id === typeId;
        });
    }, [data, selectedTypeId]);

    return {
        data: filteredData,
        rawData: data,
        isLoading,
        error,
        refetch: fetchPeriods
    };
};
