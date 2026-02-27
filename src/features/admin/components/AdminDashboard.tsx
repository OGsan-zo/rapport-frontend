"use client";

import React, { useEffect, useState } from "react";
import { adminService, AdminStats } from "../services/adminService";
import { periodeService as configPeriodeService } from "@/features/config/services/periodeService";
import { TypeCalendrierSelect } from "@/features/config/components/TypeCalendrierSelect";
import { PeriodeSelect } from "@/features/config/components/PeriodeSelect";
import { User } from "../../auth/types";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useAdminPilotage } from "../context/AdminPilotageContext";

export const AdminDashboard = () => {
    const router = useRouter();
    const {
        selectedTypeId,
        setSelectedTypeId,
        selectedPeriodId,
        setSelectedPeriodId
    } = useAdminPilotage();

    const [stats, setStats] = useState<AdminStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        // Chargement initial ou si les filtres sont vides, on n'affiche pas les stats
        if (!selectedPeriodId || !selectedTypeId) {
            setStats(null);
            setIsLoading(false);
            return;
        }

        const fetchData = async () => {
            setIsRefreshing(true);
            try {
                // 1. Récupérer les stats globales
                const statsData = await adminService.getStats(
                    "any",
                    "any",
                    Number(selectedTypeId)
                );

                // 2. Récupérer le nombre réel de retardataires pour synchroniser le chiffre rouge
                const missing = await configPeriodeService.getLateUsers(selectedPeriodId);

                // 3. Fusionner les données : Total (stats globales), Retards (réel), OK (différence)
                const total = statsData.totalUsers;
                const lateCount = missing.length;
                const okCount = Math.max(0, total - lateCount);

                setStats({
                    totalUsers: total,
                    reportsReceived: okCount,
                    missingUsers: lateCount
                });

            } catch (err) {
                console.error("Erreur fetchData Dashboard:", err);
            } finally {
                setIsRefreshing(false);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [selectedPeriodId, selectedTypeId]);

    const handleRedirect = () => {
        if (selectedPeriodId) {
            router.push(`/admin/manquants`); // Navigation invisible via context
        }
    };

    const StatCard = ({ title, value, sub, color, isLate }: any) => (
        <div className={`bg-white border border-slate-200 rounded-xl p-8 shadow-sm flex flex-col gap-3 transition-all duration-500 overflow-hidden relative group hover:border-blue-200 ${isRefreshing ? "opacity-40 scale-[0.98] blur-[1px]" : "opacity-100 scale-100 blur-0"}`}>
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-[0.03] -mr-12 -mt-12 rounded-full transition-transform duration-700 group-hover:scale-110`}></div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{title}</p>
            <div className="flex items-baseline gap-2">
                <span className={`text-5xl font-black tracking-tighter ${isLate ? "text-red-500" : "text-slate-900"}`}>
                    {value}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{sub}</span>
            </div>
        </div>
    );

    return (
        <div className="space-y-12 pb-20">
            {/* Design aligné sur MissingUsers.tsx */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-md z-30 py-8 mb-4 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">Pilotage Institutionnel</h1>
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

            {/* Statistiques */}
            {!stats && !isLoading ? (
                <div className="py-20 text-center space-y-4 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-100 mx-auto max-w-4xl">
                    <div className="text-slate-300">
                        <svg className="w-12 h-12 mx-auto opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Veuillez sélectionner une période pour analyser les transmissions</p>
                </div>
            ) : isLoading || (isRefreshing && !stats) ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-32 bg-slate-50 rounded-xl animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <StatCard
                            title="Total Agents"
                            value={stats?.totalUsers}
                            sub="Inscrits"
                            color="from-blue-500 to-indigo-500" // Bleu
                        />
                        <StatCard
                            title="Rapports Reçus"
                            value={stats?.reportsReceived}
                            sub="Transmis"
                            color="from-emerald-500 to-teal-500" // Vert
                        />
                        <StatCard
                            title="Manquants"
                            value={stats?.missingUsers}
                            sub="Retard"
                            color="from-red-500 to-rose-600" // Rouge
                            isLate={true}
                        />
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-slate-200">
                        <div className="space-y-2">
                            <h2 className="text-xl font-bold text-white tracking-tighter uppercase">Action Requise</h2>
                            <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-lg">Identifiez et notifiez les entités en retard pour assurer la consolidation des rapports dans les délais.</p>
                        </div>
                        <button
                            onClick={handleRedirect}
                            disabled={!selectedPeriodId}
                            className="px-10 py-4 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-500 transition-all shadow-xl shadow-red-500/20 active:scale-95 whitespace-nowrap disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed"
                        >
                            Relancer les manquants
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
