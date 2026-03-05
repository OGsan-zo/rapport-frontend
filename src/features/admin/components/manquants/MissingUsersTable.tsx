import React from "react";
import { User } from "@/features/auth/types";
import { MissingUsersTableProps } from "@/features/rapports/types/admin/manquants/adminManquants";
import { AppTableSkeleton } from "@/features/common/components/ui/AppTableSkeleton";

export const MissingUsersTable: React.FC<MissingUsersTableProps> = ({ users, isLoading }) => {
    return (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm shadow-slate-100">
            {isLoading ? (
                <AppTableSkeleton rows={8} cols={3} />
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead className="bg-slate-50/50 border-b border-slate-200 text-left">
                            <tr>
                                <th className="p-5 text-[10px] font-bold uppercase border-r border-slate-200/50 tracking-wider text-slate-500">Nom de l'Agent</th>
                                <th className="p-5 text-[10px] font-bold uppercase border-r border-slate-200/50 tracking-wider text-slate-500">Email Professionnel</th>
                                <th className="p-5 text-[10px] font-bold uppercase tracking-wider text-slate-500">Rôle</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.length === 0 ? (
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
            )}
        </div>
    );
};