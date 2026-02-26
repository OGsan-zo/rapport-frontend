"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { useForm, useFieldArray, Control, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { rapportService } from "../services/rapportService";
import { useRouter } from "next/navigation";
import { RapportConsolide } from "../types";
import { usePdfExport } from "../hooks/usePdfExport";
import { RapportView } from "./RapportView";
import { SelectPeriode } from "../../common/components/SelectPeriode";

// Schéma de validation
const consolidationSchema = z.object({
    idCalendrier: z.number().int().min(1, "ID Calendrier requis"),
    dateDebut: z.string(), // Uniquement pour l'UI
    dateFin: z.string(),   // Uniquement pour l'UI
    activites: z.array(z.object({
        entite: z.string().min(1, "Nom de l'activité requis"),
        effectsImpacts: z.array(z.object({
            effect: z.string().min(1, "Effet requis"),
            impact: z.string().min(1, "Impact requis"),
        })).min(1),
    })).min(1),
});

type ConsolidationFormValues = z.infer<typeof consolidationSchema>;

/**
 * Cellule de paires Effet/Impact pour une activité.
 */
const EffectsImpactsList = ({ control, register, activityIndex }: {
    control: Control<ConsolidationFormValues>,
    register: UseFormRegister<ConsolidationFormValues>,
    activityIndex: number,
}) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `activites.${activityIndex}.effectsImpacts` as any,
    });

    return (
        <div className="flex flex-col divide-y divide-slate-100 h-full">
            {fields.map((field, eiIndex) => (
                <div key={field.id} className="grid grid-cols-2 divide-x divide-slate-100 group/ei relative min-h-[100px]">
                    {/* Effet */}
                    <div className="p-0">
                        <textarea
                            {...register(`activites.${activityIndex}.effectsImpacts.${eiIndex}.effect` as any)}
                            rows={3}
                            className="w-full h-full p-4 text-xs font-medium bg-white focus:bg-white outline-none resize-none border-none text-slate-700 placeholder:text-slate-300"
                            placeholder="Saisir l'effet..."
                        />
                    </div>
                    {/* Impact */}
                    <div className="p-0 pr-8">
                        <textarea
                            {...register(`activites.${activityIndex}.effectsImpacts.${eiIndex}.impact` as any)}
                            rows={3}
                            className="w-full h-full p-4 text-xs font-medium bg-white focus:bg-white outline-none resize-none border-none text-slate-700 placeholder:text-slate-300"
                            placeholder="Saisir l'impact..."
                        />
                    </div>

                    {fields.length > 1 && (
                        <button
                            type="button"
                            onClick={() => remove(eiIndex)}
                            className="absolute right-1 top-2 opacity-0 group-hover/ei:opacity-100 text-slate-200 hover:text-red-400 transition-all"
                        >
                            <svg className="w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            ))}
            <button
                type="button"
                onClick={() => append({ effect: "", impact: "" })}
                className="py-3 text-[10px] font-bold text-slate-400 hover:text-slate-900 hover:bg-slate-50 uppercase tracking-widest border-t border-slate-100 bg-white transition-all"
            >
                + Ajouter Effet/Impact
            </button>
        </div>
    );
};

/**
 * Formulaire de consolidation Multi-Puces — design sobre et professionnel.
 */
export const ConsolidationForm = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { exportToPdf, isGenerating: isPdfGenerating } = usePdfExport();

    const { register, handleSubmit, control, watch, setValue } = useForm<ConsolidationFormValues>({
        resolver: zodResolver(consolidationSchema),
        defaultValues: {
            idCalendrier: 1,
            dateDebut: "",
            dateFin: "",
            activites: [
                {
                    entite: "",
                    effectsImpacts: [{ effect: "", impact: "" }]
                }
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({ control, name: "activites" });
    const [confirmDeleteIndex, setConfirmDeleteIndex] = useState<number | null>(null);

    const watchedValues = watch();

    const rapportPreview = useMemo<RapportConsolide>(() => ({
        id: "live-preview",
        dateDebut: watchedValues.dateDebut || "",
        dateFin: watchedValues.dateFin || "",
        dateCreation: new Date().toISOString().split("T")[0],
        entiteId: "1",
        entiteNom: "DSINT",
        lignes: watchedValues.activites?.map(a => ({
            name: a.entite,
            effectsImpacts: a.effectsImpacts
        })) as any || [],
        status: "BROUILLON",
    }), [watchedValues]);

    const onSubmit = async (data: ConsolidationFormValues) => {
        setIsSubmitting(true);
        try {
            // Envoi selon la structure exact demandée : { idCalendrier, activites: [...] }
            await rapportService.saveRapport(data.idCalendrier, data.activites);
            router.push("/dashboard");
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-10 max-w-6xl mx-auto pb-20">
            {/* Toolbar - Minimal & Clean */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-md z-30 py-8 mb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-8 transition-all">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">Nouveau Rapport</h1>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Saisie des activités hebdomadaires</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-100 flex items-center gap-3">
                        <span className="text-[9px] font-bold uppercase px-3 text-slate-400">Période :</span>
                        <SelectPeriode
                            currentId={watchedValues.idCalendrier}
                            onSelect={(id) => setValue("idCalendrier", id)}
                            className="w-[280px]"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            disabled={isPdfGenerating}
                            onClick={() => {
                                exportToPdf("rapport-a4-container-live", `Export_Rapport_${new Date().getFullYear()}.pdf`);
                            }}
                            className="px-5 py-2 bg-white border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-widest rounded-lg hover:border-slate-900 hover:text-slate-900 transition-all disabled:opacity-50"
                        >
                            {isPdfGenerating ? "..." : "PDF Preview"}
                        </button>
                        <button
                            onClick={handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                            className="px-8 py-2 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-all shadow-sm shadow-slate-200 disabled:opacity-50"
                        >
                            {isSubmitting ? "Envoi..." : "Valider"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid - Clean & Standardized */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm shadow-slate-100">
                <div className="min-w-[800px] overflow-x-auto">
                    {/* Header */}
                    <div className="grid grid-cols-[60px_1fr_1fr_1fr_80px] border-b border-slate-200 bg-slate-50/50">
                        <div className="p-4 text-[10px] font-bold uppercase text-slate-500 text-center border-r border-slate-200/50">#</div>
                        <div className="p-4 text-[10px] font-bold uppercase text-slate-500 border-r border-slate-200/50 tracking-wider">Activités du Service</div>
                        <div className="p-4 text-[10px] font-bold uppercase text-slate-500 border-r border-slate-200/50 tracking-wider text-center bg-[#CFE2F3]/20">Effets Attendus</div>
                        <div className="p-4 text-[10px] font-bold uppercase text-slate-500 border-r border-slate-200/50 tracking-wider text-center bg-[#EFE2F5]/20">Impacts Observés</div>
                        <div className="p-4 bg-white/20" />
                    </div>

                    {/* Rows */}
                    <div className="divide-y divide-slate-100">
                        {fields.map((field, index) => (
                            <div
                                key={field.id}
                                className="grid grid-cols-[60px_1fr_1fr_1fr_80px] divide-x divide-slate-100 group/row min-h-[140px]"
                            >
                                <div className="flex items-center justify-center text-xs font-bold text-slate-300 bg-slate-50/30 border-r border-slate-100">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                                <div className="p-0">
                                    <textarea
                                        {...register(`activites.${index}.entite` as any)}
                                        rows={5}
                                        className="w-full h-full p-5 text-sm font-medium border-none focus:ring-0 outline-none resize-none text-slate-800 bg-white placeholder:text-slate-200 transition-colors focus:bg-slate-50/10"
                                        placeholder="Décrire l'activité..."
                                    />
                                </div>
                                <div className="col-span-2 p-0">
                                    <EffectsImpactsList control={control} register={register} activityIndex={index} />
                                </div>
                                <div className="flex items-center justify-center bg-slate-50/10">
                                    {fields.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="p-3 text-slate-200 hover:text-red-400 transition-all rounded-full hover:bg-red-50"
                                            title="Supprimer la ligne"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add Button - Clean */}
            <button
                type="button"
                onClick={() => append({ entite: "", effectsImpacts: [{ effect: "", impact: "" }] })}
                className="w-full py-8 border-2 border-dashed border-slate-200 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:border-slate-900 hover:text-slate-900 hover:bg-slate-50 transition-all flex items-center justify-center gap-4 bg-white"
            >
                <span className="text-2xl font-light">+</span>
                Ajouter un groupe d'activités
            </button>
            {/* Hidden renderer for PDF capture (Live preview) */}
            <div className="fixed left-[-9999px] top-0 pointer-events-none opacity-0 overflow-hidden">
                <RapportView rapport={rapportPreview} containerId="rapport-a4-container-live" />
            </div>
        </div>
    );
};
