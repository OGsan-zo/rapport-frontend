import { User } from "@/features/auth/types";

export interface MissingUsersToolbarProps {
    selectedTypeId: string;
    setSelectedTypeId: (val: string) => void;
    selectedPeriodId: string;
    setSelectedPeriodId: (val: string) => void;
    calendrierResult?: any;
}

export interface MissingUsersTableProps {
    users: User[];
    isLoading: boolean;
}