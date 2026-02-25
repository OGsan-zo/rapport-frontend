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

// Schéma de validation
const consolidationSchema = z.object({
    dateDebut: z.string().min(1, "Date de début requise"),
    dateFin: z.string().min(1, "Date de fin requise"),
    lignes: z.array(z.object({
        activites: z.array(z.string().min(1)).min(1),
        effets: z.array(z.string().min(1)).min(1),
        impacts: z.array(z.string().min(1)).min(1),
    })).min(1),
});

type ConsolidationFormValues = z.infer<typeof consolidationSchema>;

/**
 * Textarea à hauteur automatique pour une puce individuelle.
 */
const BulletTextarea = ({ register, name, onKeyDown, onChange, isFirst }: any) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const { ref, onChange: rhfOnChange, ...rest } = register(name);

    const adjustHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    useEffect(() => { adjustHeight(); }, []);

    return (
        <div className="flex items-start gap-1.5">
            <span className="text-gray-400 mt-2 text-xs shrink-0">•</span>
            <textarea
                {...rest}
                ref={(e) => {
                    ref(e);
                    textareaRef.current = e;
                    if (isFirst && !e?.value) e?.focus();
                }}
                onChange={(e) => {
                    rhfOnChange(e);
                    if (onChange) onChange(e);
                    adjustHeight();
                }}
                onKeyDown={onKeyDown}
                rows={1}
                className="w-full py-1.5 bg-transparent focus:bg-white focus:ring-1 focus:ring-blue-400 outline-none text-xs transition-all resize-none overflow-hidden text-gray-800 placeholder:text-gray-300 border-none"
                placeholder="Saisir un détail…"
            />
        </div>
    );
};

/**
 * Cellule de puces pour une colonne du tableau.
 */
const BulletCell = ({ control, register, name, index, fieldName }: {
    control: Control<ConsolidationFormValues>,
    register: UseFormRegister<ConsolidationFormValues>,
    name?: string,
    index: number,
    fieldName: "activites" | "effets" | "impacts",
}) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `lignes.${index}.${fieldName}` as any,
    });

    const containerRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent, bulletIndex: number) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            append("");
        }
        if (e.key === "Backspace" && !(e.target as HTMLTextAreaElement).value && fields.length > 1) {
            e.preventDefault();
            remove(bulletIndex);
            setTimeout(() => {
                const textareas = containerRef.current?.querySelectorAll("textarea");
                const targetIndex = bulletIndex > 0 ? bulletIndex - 1 : 0;
                if (textareas?.[targetIndex]) {
                    (textareas[targetIndex] as HTMLTextAreaElement).focus();
                    const len = (textareas[targetIndex] as HTMLTextAreaElement).value.length;
                    (textareas[targetIndex] as HTMLTextAreaElement).setSelectionRange(len, len);
                }
            }, 0);
        }
    };

    return (
        <div ref={containerRef} className="flex flex-col gap-0.5 p-2 min-h-[50px] group/cell relative">
            {fields.map((field, bulletIndex) => (
                <div key={field.id} className="relative group/bullet">
                    <BulletTextarea
                        register={register}
                        name={`lignes.${index}.${fieldName}.${bulletIndex}`}
                        onKeyDown={(e: any) => handleKeyDown(e, bulletIndex)}
                        isFirst={bulletIndex === fields.length - 1 && !field.id}
                    />
                    {fields.length > 1 && (
                        <button
                            type="button"
                            onClick={() => remove(bulletIndex)}
                            className="absolute -right-1 top-1.5 opacity-0 group-hover/bullet:opacity-100 text-gray-300 hover:text-red-500 transition-all p-0.5"
                            title="Supprimer"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            ))}
            <button
                type="button"
                onClick={() => append("")}
                className="self-start opacity-0 group-hover/cell:opacity-100 text-[9px] font-semibold text-blue-500 hover:text-blue-700 transition-all ml-4 mt-1"
            >
                + Ajouter
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

    const { register, handleSubmit, control, watch } = useForm<ConsolidationFormValues>({
        resolver: zodResolver(consolidationSchema),
        defaultValues: {
            dateDebut: new Date().toISOString().split("T")[0],
            dateFin: new Date().toISOString().split("T")[0],
            lignes: [{ activites: [""], effets: [""], impacts: [""] }],
        },
    });

    const { fields, append, remove } = useFieldArray({ control, name: "lignes" });
    const [confirmDeleteIndex, setConfirmDeleteIndex] = useState<number | null>(null);

    const watchedValues = watch();

    const rapportPreview = useMemo<RapportConsolide>(() => ({
        id: "live-preview",
        dateDebut: watchedValues.dateDebut || "",
        dateFin: watchedValues.dateFin || "",
        dateCreation: new Date().toISOString().split("T")[0],
        entiteId: "1",
        entiteNom: "DSINT",
        lignes: watchedValues.lignes as any || [],
        status: "BROUILLON",
    }), [watchedValues]);

    const onSubmit = async (data: ConsolidationFormValues) => {
        setIsSubmitting(true);
        try {
            await rapportService.saveRapport(data);
            router.push("/dashboard");
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-5">
            {/* Barre d'outils */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-gray-300 rounded-lg p-5 shadow-sm">
                <div className="flex items-center gap-4">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">
                        Période :
                    </label>
                    <div className="flex items-center gap-2">
                        <input
                            {...register("dateDebut")}
                            type="date"
                            className="px-3 py-1.5 border border-gray-400 rounded text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-gray-400 text-sm">→</span>
                        <input
                            {...register("dateFin")}
                            type="date"
                            className="px-3 py-1.5 border border-gray-400 rounded text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        disabled={isPdfGenerating}
                        onClick={() => {
                            // On déclenche l'export directement sur l'ID du renderer caché
                            exportToPdf("rapport-a4-container-live", `Canevas_Rapport_${new Date().getFullYear()}.pdf`);
                        }}
                        className="px-4 py-2 border border-gray-400 rounded text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                    >
                        {isPdfGenerating ? (
                            <div className="w-3.5 h-3.5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                        Canevas
                    </button>
                    <button
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                        className="px-5 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded transition-colors shadow-sm disabled:opacity-50"
                    >
                        {isSubmitting ? "Envoi…" : "Valider"}
                    </button>
                </div>
            </div>

            {/* Grille de saisie */}
            <div className="bg-white border border-gray-400 rounded-lg overflow-hidden shadow-sm">
                <div className="min-w-[700px] overflow-x-auto">
                    {/* En-tête */}
                    <div className="grid grid-cols-[44px_1fr_1fr_1fr_52px] border-b border-gray-400 bg-gray-100">
                        <div className="p-3 text-xs font-bold uppercase text-gray-500 text-center border-r border-gray-400">#</div>
                        <div className="p-3 text-xs font-bold uppercase text-gray-700 border-r border-gray-400">Activités</div>
                        <div className="p-3 text-xs font-bold uppercase text-gray-700 border-r border-gray-400">Effets</div>
                        <div className="p-3 text-xs font-bold uppercase text-gray-700 border-r border-gray-400">Impacts</div>
                        <div className="p-3 bg-gray-50" />
                    </div>

                    {/* Lignes */}
                    <div className="divide-y divide-gray-300">
                        {fields.map((field, index) => (
                            <div
                                key={field.id}
                                className="grid grid-cols-[44px_1fr_1fr_1fr_52px] divide-x divide-gray-300 hover:bg-gray-50/50 transition-colors group/row"
                            >
                                <div className="flex items-center justify-center text-xs font-bold text-gray-400 bg-gray-50 border-r border-gray-300">
                                    {index + 1}
                                </div>
                                <BulletCell control={control} register={register} index={index} fieldName="activites" />
                                <BulletCell control={control} register={register} index={index} fieldName="effets" />
                                <BulletCell control={control} register={register} index={index} fieldName="impacts" />
                                <div className="flex items-center justify-center p-2 border-l border-gray-300">
                                    {fields.length > 1 && (
                                        <div className="relative">
                                            {confirmDeleteIndex === index ? (
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        type="button"
                                                        onClick={() => { remove(index); setConfirmDeleteIndex(null); }}
                                                        className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                                        title="Confirmer"
                                                    >
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setConfirmDeleteIndex(null)}
                                                        className="p-1.5 bg-gray-100 text-gray-500 rounded hover:bg-gray-200 transition-colors"
                                                        title="Annuler"
                                                    >
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => setConfirmDeleteIndex(index)}
                                                    className="p-1.5 text-gray-300 hover:text-red-500 transition-all hover:scale-110"
                                                    title="Supprimer la ligne"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bouton d'ajout */}
            <button
                type="button"
                onClick={() => append({ activites: [""], effets: [""], impacts: [""] })}
                className="w-full py-4 border border-dashed border-gray-400 rounded-lg text-gray-500 text-xs font-semibold uppercase hover:bg-gray-50 hover:border-gray-500 transition-all flex items-center justify-center gap-2"
            >
                <span className="text-base">+</span>
                Ajouter un groupe d'activités
            </button>
            {/* Hidden renderer for PDF capture (Live preview) */}
            <div className="fixed left-[-9999px] top-0 pointer-events-none opacity-0 overflow-hidden">
                <RapportView rapport={rapportPreview} containerId="rapport-a4-container-live" />
            </div>
        </div>
    );
};
