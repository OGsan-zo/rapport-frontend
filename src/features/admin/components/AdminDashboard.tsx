"use client";

import React, { useEffect, useState } from "react";
import { adminService, AdminStats } from "../services/adminService";
import { SelectPeriode } from "../../common/components/SelectPeriode";
import Link from "next/link";

export const AdminDashboard = () => {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [selectedPeriodId, setSelectedPeriodId] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (selectedPeriodId === undefined) return;

        const fetchStats = async () => {
            setIsRefreshing(true);
            try {
                const data = await adminService.getStats("any", "any");
                setStats(data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsRefreshing(false);
                setIsLoading(false);
            }
        };
        fetchStats();
    }, [selectedPeriodId]);

    const StatCard = ({ title, value, sub, color }: any) => (
        <div className={`bg-white border border-slate-200 rounded-xl p-8 shadow-sm flex flex-col gap-3 transition-all duration-500 overflow-hidden relative group hover:border-blue-200 ${isRefreshing ? "opacity-40 scale-[0.98] blur-[1px]" : "opacity-100 scale-100 blur-0"}`}>
            <h3 className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{title}</h3>
            <p className={`text-4xl font-bold tracking-tighter ${color}`}>{value}</p>
            <p className="text-[10px] text-slate-400 font-medium uppercase">{sub}</p>
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full translate-x-12 -translate-y-12 group-hover:bg-blue-50 transition-colors -z-10" />
        </div>
    );

    return (
        <div className="space-y-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-slate-100">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">Pilotage Admin</h1>
                    <p className="text-slate-400 text-[11px] font-medium uppercase tracking-widest mt-2 px-1 border-l-2 border-slate-900">Suivi de la conformité institutionnelle</p>
                </div>

                <SelectPeriode
                    currentId={selectedPeriodId}
                    onSelect={setSelectedPeriodId}
                    className="min-w-[320px]"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard
                    title="Total Agents"
                    value={stats?.totalUsers || 0}
                    sub="Effectif total recensé"
                    color="text-slate-900"
                />
                <StatCard
                    title="Rapports Reçus"
                    value={stats?.reportsReceived || 0}
                    sub="Transmissions validées"
                    color="text-blue-600"
                />
                <StatCard
                    title="Retardataires"
                    value={stats?.missingUsers || 0}
                    sub="Action requise"
                    color="text-rose-500"
                />
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm shadow-slate-50">
                <div className="space-y-2">
                    <h2 className="text-xl font-bold text-slate-900 tracking-tighter uppercase">Analyse des manquants</h2>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-lg">Identifiez les agents n'ayant pas encore soumis leur rapport hebdomadaire.</p>
                </div>
                <Link
                    href="/admin/manquants"
                    className="px-8 py-3.5 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95 whitespace-nowrap"
                >
                    Consulter la liste
                </Link>
            </div>
        </div>
    );
};
