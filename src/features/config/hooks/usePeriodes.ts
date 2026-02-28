import { useState, useEffect } from "react";
import { periodeService } from "../services/periodeService"; 
import { CalendrierResult , CalendarPeriod} from "../../rapports/types/calendrier/calendrierType";
export const usePeriodes = (isInsert: boolean= false) => {
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
    const result: CalendrierResult = {
        data: data,
        isLoading: isLoading,
        error: error,
        refetch: fetchPeriods
    };

    // On retourne l'objet typé
    return result;
};
