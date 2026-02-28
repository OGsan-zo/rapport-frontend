import { ApiRapport } from "../../types";

export interface SupervisionToolbarActionsProps {
    hasFilters: boolean;
    onClearFilters: () => void;
}

export interface SupervisionTableProps {
    rapports: ApiRapport[];
    isLoading: boolean;
    generatingId: number | null;
    onPdfClick: (rapport: ApiRapport) => void;
}

export interface SupervisionToolbarProps {
    selectedTypeId: string;
    setSelectedTypeId: (val: string) => void;
    selectedPeriodId: string;
    setSelectedPeriodId: (val: string) => void;
    entiteFilter: string;
    setEntiteFilter: (val: string) => void;
    entites: string[];
    calendrierResult: any;
}