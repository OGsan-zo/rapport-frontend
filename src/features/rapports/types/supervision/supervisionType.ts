import { ApiRapport } from "../../types";

export interface SupervisionToolbarActionsProps {
    hasFilters: boolean;
    onClearFilters: () => void;
    rapports: ApiRapport[];
    entiteFilter: string;
    onConsulter: () => void;
    isGenerating: boolean;
}

export interface SupervisionTableProps {
    rapports: ApiRapport[];
    isLoading: boolean;
    generatingId: number | string | null;
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
    rapports: ApiRapport[];
    onConsulter: () => void;
    isGenerating: boolean;
}