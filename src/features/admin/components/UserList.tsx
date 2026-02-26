"use client";

import React, { useEffect, useState } from "react";
import { User } from "@/features/auth/types";
import { authService } from "@/features/auth/services/authService";

interface UserListProps {
    onAddUser: () => void;
    refreshKey: number;
}

export const UserList: React.FC<UserListProps> = ({ onAddUser, refreshKey }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const data = await authService.getUsers();
                setUsers(data);
            } catch (error) {
                console.error("Erreur chargement utilisateurs", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, [refreshKey]);

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Comptes Utilisateurs</h2>
                    <p className="text-sm text-slate-500 mt-1">Liste des agents et administrateurs enregistrés.</p>
                </div>
                <button
                    onClick={onAddUser}
                    className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded transition-all shadow-sm flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Ajouter un utilisateur
                </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-4 font-bold text-slate-900 uppercase tracking-widest text-[10px]">Nom</th>
                            <th className="px-6 py-4 font-bold text-slate-900 uppercase tracking-widest text-[10px]">Email</th>
                            <th className="px-6 py-4 font-bold text-slate-900 uppercase tracking-widest text-[10px]">Rôle</th>
                            <th className="px-6 py-4 font-bold text-slate-900 uppercase tracking-widest text-[10px] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-semibold text-slate-900">{user.nom}</span>
                                </td>
                                <td className="px-6 py-4 text-slate-600 font-medium">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${user.role === 'ADMIN' ? 'bg-purple-50 text-purple-700' :
                                            user.role === 'DIRECTEUR' ? 'bg-blue-50 text-blue-700' :
                                                'bg-slate-100 text-slate-600'
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-slate-900 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
