import React, { useEffect, useState } from "react";
import { User } from "../../auth/types";
import { PeriodeSelect } from "@/features/config/components/PeriodeSelect";
import { periodeService as configPeriodeService } from "@/features/config/services/periodeService";
import { TypeCalendrierSelect } from "@/features/config/components/TypeCalendrierSelect";
import { useAdminPilotage } from "../context/AdminPilotageContext";

export const MissingUsers = () => {
    const {
        selectedTypeId,
        setSelectedTypeId,
        selectedPeriodId,
        setSelectedPeriodId
    } = useAdminPilotage();

    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!selectedPeriodId || !selectedTypeId) {
            setUsers([]);
            setIsLoading(false);
            return;
        }

        const fetchMissing = async () => {
            setIsLoading(true);
            try {
                // Utilisation de la nouvelle API centralisée
                const data = await configPeriodeService.getLateUsers(selectedPeriodId);
                setUsers(data);
            } catch (err) {
                console.error("Erreur MissingUsers:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMissing();
    }, [selectedPeriodId, selectedTypeId]);

    return (
        <div className="space-y-10">
            {/* Design aligné sur le Dashboard - Header Miroir */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-md z-30 py-8 mb-4 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">Agents Manquants</h1>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-1">Surveillance des transmissions de rapports</p>
                </div>

                <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                    <div className="flex items-center gap-2 px-3 border-r border-slate-200">
                        <span className="text-[9px] font-bold uppercase text-slate-400">Type :</span>
                        <TypeCalendrierSelect
                            value={selectedTypeId}
                            onValueChange={setSelectedTypeId}
                            className="min-w-[160px] border-none bg-transparent shadow-none focus:ring-0"
                        />
                    </div>
                    <div className="flex items-center gap-2 px-3">
                        <span className="text-[9px] font-bold uppercase text-slate-400">Période :</span>
                        <PeriodeSelect
                            value={selectedPeriodId}
                            onValueChange={setSelectedPeriodId}
                            typeCalendrierId={selectedTypeId}
                            className="min-w-[280px] border-none bg-transparent shadow-none focus:ring-0"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm shadow-slate-100">
                <table className="w-full border-collapse">
                    <thead className="bg-slate-50/50 border-b border-slate-200 text-left">
                        <tr>
                            <th className="p-5 text-[10px] font-bold uppercase border-r border-slate-200/50 tracking-wider text-slate-500">Nom de l'Agent</th>
                            <th className="p-5 text-[10px] font-bold uppercase border-r border-slate-200/50 tracking-wider text-slate-500">Email Professionnel</th>
                            <th className="p-5 text-[10px] font-bold uppercase tracking-wider text-slate-500">Rôle</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {isLoading ? (
                            <tr>
                                <td colSpan={3} className="p-20 text-center text-slate-300 animate-pulse italic uppercase text-[10px] tracking-widest">
                                    Récupération des données en cours...
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="p-20 text-center text-slate-400 font-medium italic">
                                    Aucun retardataire détecté pour cette période.
                                </td>
                            </tr>
                        ) : (
                            users.map((user: User) => (
                                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-5 text-sm font-bold text-slate-900 border-r border-slate-100">{user.entite}</td>
                                    <td className="p-5 text-sm font-medium text-slate-400 border-r border-slate-100 italic">{user.email}</td>
                                    <td className="p-5 text-[9px] font-bold text-slate-300 uppercase tracking-widest">{user.role}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="p-6 border border-slate-100 rounded-xl bg-slate-50/30">
                <p className="text-[10px] text-slate-400 italic leading-relaxed">
                    * Cette liste est générée automatiquement à partir du calendrier institutionnel. Les agents affichés n'ont soumis aucun rapport validé pour la période sélectionnée.
                </p>
            </div>
        </div>
    );
};
