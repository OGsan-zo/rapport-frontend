import React, { useEffect, useState } from "react";
import { User } from "../../auth/types";
import { periodeService as configPeriodeService } from "@/features/config/services/periodeService";
import { useAdminPilotage } from "../context/AdminPilotageContext";
import { usePeriodes } from "@/features/config/hooks/usePeriodes";
import toast from "react-hot-toast";

// Sous-composants
import { MissingUsersToolbar } from "./manquants/MissingUsersToolbar";
import { MissingUsersTable } from "./manquants/MissingUsersTable";

export const MissingUsers = () => {
    const {
        selectedTypeId,
        setSelectedTypeId,
        selectedPeriodId,
        setSelectedPeriodId
    } = useAdminPilotage();

    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Nécessaire pour notre composant ToolbarSelects unifié
    const calendrierResult = usePeriodes(false);

    useEffect(() => {
        if (!selectedPeriodId) {
            setUsers([]);
            setIsLoading(false);
            return;
        }

        const fetchMissing = async () => {
            setIsLoading(true);
            try {
                const data = await configPeriodeService.getLateUsers(selectedPeriodId);
                
                setUsers(data);
            } catch (err) {
                // console.error("Erreur MissingUsers:", err);
                toast.error("Erreur lors du chargement des retardataires");
            } finally {
                setIsLoading(false);
            }
        };
        fetchMissing();
    }, [selectedPeriodId, selectedTypeId]);

    return (
        <div className="space-y-10">
            {/* 1. En-tête (Filtres et Titre) */}
            <MissingUsersToolbar 
                selectedTypeId={selectedTypeId}
                setSelectedTypeId={setSelectedTypeId}
                selectedPeriodId={selectedPeriodId}
                setSelectedPeriodId={setSelectedPeriodId}
                calendrierResult={calendrierResult}
            />

            {/* 2. Tableau des retardataires */}
            <MissingUsersTable 
                users={users} 
                isLoading={isLoading} 
            />

            {/* 3. Pied de page / Note d'information */}
            <div className="p-6 border border-slate-100 rounded-xl bg-slate-50/30">
                <p className="text-[10px] text-slate-400 italic leading-relaxed">
                    * Cette liste est générée automatiquement à partir du calendrier institutionnel. Les agents affichés n'ont soumis aucun rapport validé pour la période sélectionnée.
                </p>
            </div>
        </div>
    );
};