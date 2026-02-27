"use client";

import React, { useEffect, useState } from "react";
import { adminService, CalendarPeriod } from "../services/adminService";
import { TypeCalendrierSelect } from "@/features/config/components/TypeCalendrierSelect";

export const PeriodForm = () => {
    const [periods, setPeriods] = useState<CalendarPeriod[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newPeriod, setNewPeriod] = useState({ debut: "", fin: "", typeCalendrierId: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

    const fetchPeriods = async () => {
        setIsLoading(true);
        try {
            const data = await adminService.getPeriods();
            setPeriods(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPeriods();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFeedback(null);

        if (!newPeriod.debut || !newPeriod.fin || !newPeriod.typeCalendrierId) {
            setFeedback({
                type: "error",
                message: "Veuillez remplir tous les champs, y compris le type de calendrier."
            });
            return;
        }

        setIsSubmitting(true);
        try {
            await adminService.createPeriod(
                newPeriod.debut,
                newPeriod.fin,
                Number(newPeriod.typeCalendrierId)
            );
            setNewPeriod({ debut: "", fin: "", typeCalendrierId: "" });
            setFeedback({ type: "success", message: "Période créée avec succès !" });
            fetchPeriods();

            // Masquer le message de succès après 3 secondes
            setTimeout(() => setFeedback(null), 3000);
        } catch (err: any) {
            setFeedback({
                type: "error",
                message: err.message || "Une erreur est survenue lors de la création."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Formulaire - Clean */}
            <div className="lg:col-span-1 space-y-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">Calendrier</h1>
                    <p className="text-slate-400 text-[11px] font-medium uppercase tracking-widest mt-2 px-1 border-l-2 border-slate-900">Configuration des périodes</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm shadow-slate-100 space-y-8">
                    {feedback && (
                        <div className={`p-4 rounded-lg text-xs font-bold uppercase tracking-widest border ${feedback.type === "success"
                            ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                            : "bg-rose-50 border-rose-100 text-rose-500"
                            }`}>
                            {feedback.message}
                        </div>
                    )}

                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Date de début</label>
                        <input
                            type="date"
                            required
                            value={newPeriod.debut}
                            onChange={(e) => setNewPeriod({ ...newPeriod, debut: e.target.value })}
                            className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm font-medium focus:ring-1 focus:ring-slate-900 outline-none transition-all text-slate-700 bg-slate-50/30"
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Date de fin</label>
                        <input
                            type="date"
                            required
                            value={newPeriod.fin}
                            onChange={(e) => setNewPeriod({ ...newPeriod, fin: e.target.value })}
                            className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm font-medium focus:ring-1 focus:ring-slate-900 outline-none transition-all text-slate-700 bg-slate-50/30"
                        />
                    </div>

                    <div className="space-y-3">
                        <TypeCalendrierSelect
                            value={newPeriod.typeCalendrierId}
                            onValueChange={(val) => setNewPeriod({ ...newPeriod, typeCalendrierId: val })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 bg-slate-900 text-white font-bold text-[10px] uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-all shadow-md shadow-slate-200 active:scale-95 disabled:opacity-50"
                    >
                        {isSubmitting ? "Enregistrement..." : "Créer la période"}
                    </button>
                </form>
            </div>

            {/* Liste des périodes - Modernized */}
            <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-0.5 w-4 bg-slate-900"></div>
                    <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Semaines Institutionnelles</h3>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm shadow-slate-100">
                    <table className="w-full border-collapse">
                        <thead className="bg-slate-50/50 border-b border-slate-200 text-left">
                            <tr>
                                <th className="p-4 text-[10px] font-bold uppercase border-r border-slate-200/50 tracking-widest text-slate-400 w-16 text-center">ID</th>
                                <th className="p-4 text-[10px] font-bold uppercase border-r border-slate-200/50 tracking-widest text-slate-500">Période Institutionnelle</th>
                                <th className="p-4 text-[10px] font-bold uppercase border-r border-slate-200/50 tracking-widest text-slate-500">Type</th>
                                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 text-center">Statut</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr><td colSpan={4} className="p-12 text-center text-slate-300 italic animate-pulse uppercase text-[10px] tracking-widest">Récupération des données...</td></tr>
                            ) : (
                                periods.map((p: CalendarPeriod) => (
                                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-4 text-[10px] font-bold text-slate-300 border-r border-slate-100 text-center">#{String(p.id).padStart(3, '0')}</td>
                                        <td className="p-4 text-sm text-slate-700 font-bold border-r border-slate-100">
                                            Semaine du {new Date(p.dateDebut).toLocaleDateString()} au {new Date(p.dateFin).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-[10px] font-bold text-slate-500 border-r border-slate-100 uppercase tracking-wide">
                                            {p.typeCalendrierName || "Standard"}
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-bold uppercase tracking-widest border border-emerald-100 rounded-md">Activée</span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
