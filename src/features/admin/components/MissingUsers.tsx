"use client";

import React, { useEffect, useState } from "react";
import { adminService } from "../services/adminService";
import { User } from "../../auth/types";
import { SelectPeriode } from "../../common/components/SelectPeriode";

export const MissingUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPeriodId, setSelectedPeriodId] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (selectedPeriodId === undefined) return;

        const fetch = async () => {
            setIsLoading(true);
            try {
                const data = await adminService.getMissingUsers("any", "any");
                setUsers(data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetch();
    }, [selectedPeriodId]);

    return (
        <div className="space-y-10">
            <div className="sticky top-0 bg-white/80 backdrop-blur-md z-30 py-8 mb-4 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 transition-all">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">Agents Manquants</h1>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-1">Surveillance des transmissions de rapports</p>
                </div>

                <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-100 flex items-center gap-3">
                    <span className="text-[9px] font-bold uppercase px-3 text-slate-400">Période :</span>
                    <SelectPeriode
                        currentId={selectedPeriodId}
                        onSelect={setSelectedPeriodId}
                        className="min-w-[320px]"
                    />
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
                            users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-5 text-sm font-bold text-slate-900 border-r border-slate-100">{user.nom}</td>
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
