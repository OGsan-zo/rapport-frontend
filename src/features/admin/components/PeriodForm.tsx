"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { periodeService } from "@/features/config/services/periodeService";
import { CalendarPeriod } from "@/features/rapports/types/calendrier/calendrierType";
import { TypeCalendrierSelect } from "@/features/config/components/TypeCalendrierSelect";
import { AppTableSkeleton } from "@/features/common/components/ui/AppTableSkeleton";

const periodSchema = z.object({
    debut: z.string().min(1, "La date de début est requise"),
    fin: z.string().min(1, "La date de fin est requise"),
    typeCalendrierId: z.string().min(1, "Le type de calendrier est requis"),
}).refine((data) => new Date(data.debut).getTime() < new Date(data.fin).getTime(), {
    message: "Attention : La date de fin doit être strictement après la date de début. Veuillez corriger les dates pour pouvoir valider.",
    path: ["fin"],
});

type PeriodFormValues = z.infer<typeof periodSchema>;

export const PeriodForm = () => {
    const [periods, setPeriods] = useState<CalendarPeriod[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

    /**
 * Formate une date en : "DD Mois YYYY" (ex: 01 Janvier 2026)
 */
    const formatLongDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }).replace(/^\w/, (c) => c.toUpperCase()); // Optionnel : met la première lettre du mois en majuscule
    };

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        trigger,
        formState: { errors, isSubmitting, isValid, isDirty }
    } = useForm<PeriodFormValues>({
        resolver: zodResolver(periodSchema),
        defaultValues: {
            debut: "",
            fin: "",
            typeCalendrierId: ""
        },
        mode: "onChange"
    });

    const typeCalendrierId = watch("typeCalendrierId");

    const fetchPeriods = async () => {
        setIsLoading(true);
        try {
            const data = await periodeService.getPeriods();
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

    const onSubmit = async (data: PeriodFormValues) => {
        setFeedback(null);
        try {
            await periodeService.createPeriod(
                data.debut,
                data.fin,
                Number(data.typeCalendrierId)
            );
            reset();
            setFeedback({ type: "success", message: "Période créée avec succès !" });
            fetchPeriods();

            setTimeout(() => setFeedback(null), 3000);
        } catch (err: any) {
            setFeedback({
                type: "error",
                message: err.message || "Une erreur est survenue lors de la création."
            });
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">Calendrier</h1>
                    <p className="text-slate-400 text-[11px] font-medium uppercase tracking-widest mt-2 px-1 border-l-2 border-slate-900">Configuration des périodes</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm shadow-slate-100 space-y-8">
                    {feedback && (
                        <div className={`p-4 rounded-lg text-xs font-bold uppercase tracking-widest border ${feedback.type === "success"
                            ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                            : "bg-rose-50 border-rose-100 text-rose-500"
                            }`}>
                            {feedback.message}
                        </div>
                    )}

                    {/* Bloc d'alerte spécifique demandé par l'utilisateur */}
                    {errors.fin && (
                        <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 flex items-center gap-2 text-red-600 font-bold">
                            <span>⚠️</span>
                            <p className="text-sm">
                                Attention : La date de fin doit être strictement après la date de début.
                                Veuillez corriger les dates pour pouvoir valider.
                            </p>
                        </div>
                    )}

                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Date de début</label>
                        <input
                            type="date"
                            {...register("debut", { onChange: () => trigger("fin") })}
                            className={`w-full border rounded-lg px-4 py-3 text-sm font-medium focus:ring-1 focus:ring-slate-900 outline-none transition-all text-slate-700 bg-slate-50/30 ${errors.fin ? "border-red-500 bg-red-50" : "border-slate-200"
                                }`}
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Date de fin</label>
                        <input
                            type="date"
                            {...register("fin")}
                            className={`w-full border rounded-lg px-4 py-3 text-sm font-medium focus:ring-1 focus:ring-slate-900 outline-none transition-all text-slate-700 bg-slate-50/30 ${errors.fin ? "border-red-500 bg-red-50" : "border-slate-200"
                                }`}
                        />
                    </div>

                    <div className="space-y-3">
                        <TypeCalendrierSelect
                            value={typeCalendrierId}
                            onValueChange={(val) => setValue("typeCalendrierId", val, { shouldValidate: true })}
                        />
                        {errors.typeCalendrierId && <p className="text-[9px] font-bold text-rose-500 uppercase tracking-tighter ml-1">{errors.typeCalendrierId.message}</p>}
                    </div>

                    <div className="space-y-4">
                        <button
                            type="submit"
                            disabled={isSubmitting || !isValid}
                            className="w-full py-3.5 bg-slate-900 text-white font-bold text-[10px] uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-all shadow-md shadow-slate-200 active:scale-95 disabled:opacity-50 group relative"
                        >
                            {isSubmitting ? "Enregistrement..." : "Créer la période"}
                        </button>

                        {(!isValid && isDirty) && (
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center animate-pulse">
                                Veuillez corriger les erreurs de dates avant de valider
                            </p>
                        )}
                    </div>
                </form>
            </div>

            <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-0.5 w-4 bg-slate-900"></div>
                    <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Semaines</h3>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm shadow-slate-100">
                    <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
                        <table className="w-full border-collapse">
                            <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
                                <tr>
                                    {/* text-center ajouté ici */}
                                    <th className="p-4 text-[10px] font-bold uppercase border-r border-slate-200/50 tracking-widest text-slate-500 text-center">
                                        Période
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={1} className="p-0">
                                            <AppTableSkeleton rows={8} cols={1} className="border-0 shadow-none rounded-none" />
                                        </td>
                                    </tr>
                                ) : (
                                    periods.map((p: CalendarPeriod) => (
                                        <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                                            {/* text-center ajouté ici */}
                                            <td className="p-4 text-sm text-slate-700 font-medium text-left border-r border-slate-100">
                                                {/* justify-center pour centrer le contenu du flex */}
                                                <div className="flex items-center justify-left gap-2">
                                                    <span className="text-slate-600">
                                                        Semaine du <span className="font-bold">{formatLongDate(p.dateDebut)}</span> au <span className="font-bold">{formatLongDate(p.dateFin)}</span>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
