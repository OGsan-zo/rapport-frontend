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