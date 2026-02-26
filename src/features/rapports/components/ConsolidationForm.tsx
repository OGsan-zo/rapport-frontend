"use client";

import React, { useState, useMemo, useRef, useEffect, memo } from "react";
import { useForm, useFieldArray, Control, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { rapportService } from "../services/rapportService";
import { useRouter } from "next/navigation";
import { RapportConsolide } from "../types";
import { usePdfExport } from "../hooks/usePdfExport";
import { RapportView } from "./RapportView";

// Schéma avec nettoyage automatique des entrées vides
const consolidationSchema = z.object({
    dateDebut: z.string().min(1, "Requis"),
    dateFin: z.string().min(1, "Requis"),
    lignes: z.array(z.object({
        activites: z.array(z.string()).transform(val => val.filter(v => v.trim() !== "")),
        effets: z.array(z.string()).transform(val => val.filter(v => v.trim() !== "")),
        impacts: z.array(z.string()).transform(val => val.filter(v => v.trim() !== "")),
    })).min(1, "Au moins une ligne est requise"),
});

type ConsolidationFormValues = z.infer<typeof consolidationSchema>;

const BulletTextarea = memo(({ register, name, onKeyDown, isLastCreated }: any) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const { ref, ...rest } = register(name);

    const adjustHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    useEffect(() => { 
        adjustHeight();
        // Focus auto uniquement si c'est la nouvelle puce qu'on vient de créer
        if (isLastCreated && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [isLastCreated]);

    return (
        <div className="flex items-start gap-1.5 w-full">
            <span className="text-blue-500 mt-2 text-[10px] shrink-0">•</span>
            <textarea
                {...rest}
                ref={(e) => {
                    ref(e);
                    textareaRef.current = e;
                }}
                onChange={(e) => {
                    rest.onChange(e); // Important pour RHF
                    adjustHeight();
                }}
                onKeyDown={onKeyDown}
                rows={1}
                className="w-full py-1.5 bg-transparent focus:bg-white border-none focus:ring-1 focus:ring-blue-100 outline-none text-xs transition-all resize-none overflow-hidden text-gray-800 placeholder:text-gray-300"
                placeholder="Saisir un détail..."
            />
        </div>
    );
});

BulletTextarea.displayName = "BulletTextarea";

const BulletCell = ({ control, register, index, fieldName }: any) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `lignes.${index}.${fieldName}`,
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
                const prev = textareas?.[bulletIndex - 1] as HTMLTextAreaElement;
                if (prev) {
                    prev.focus();
                    prev.setSelectionRange(prev.value.length, prev.value.length);
                }
            }, 0);
        }
    };

    return (
        <div ref={containerRef} className="flex flex-col gap-0 p-2 min-h-[60px] group/cell border-r border-gray-100 last:border-r-0">
            {fields.map((field, bulletIndex) => (
                <div key={field.id} className="relative group/bullet flex items-center">
                    <BulletTextarea
                        register={register}
                        name={`lignes.${index}.${fieldName}.${bulletIndex}`}
                        onKeyDown={(e: any) => handleKeyDown(e, bulletIndex)}
                        isLastCreated={bulletIndex === fields.length - 1 && bulletIndex !== 0}
                    />
                    {fields.length > 1 && (
                        <button
                            type="button"
                            onClick={() => remove(bulletIndex)}
                            className="opacity-0 group-hover/bullet:opacity-100 text-gray-300 hover:text-red-500 p-1 transition-all"
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round"/></svg>
                        </button>
                    )}
                </div>
            ))}
            <button
                type="button"
                onClick={() => append("")}
                className="self-start opacity-0 group-hover/cell:opacity-100 text-[10px] text-blue-600 font-bold ml-4 mt-1 hover:underline transition-opacity"
            >
                + Ajouter
            </button>
        </div>
    );
};

export const ConsolidationForm = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { exportToPdf, isGenerating: isPdfGenerating } = usePdfExport();

    const { register, handleSubmit, control, watch, formState: { errors } } = useForm<ConsolidationFormValues>({
        resolver: zodResolver(consolidationSchema),
        defaultValues: {
            dateDebut: new Date().toISOString().split("T")[0],
            dateFin: new Date().toISOString().split("T")[0],
            lignes: [{ activites: [""], effets: [""], impacts: [""] }],
        },
    });

    const { fields, append, remove } = useFieldArray({ control, name: "lignes" });
    const watchedValues = watch();

const rapportPreview = useMemo<RapportConsolide>(() => ({
    id: 0,
    calendrier: {
        dateDebut: watchedValues.dateDebut || "",
        dateFin: watchedValues.dateFin || "",
        typeCalendrier: { name: "HEBDO" },
    },
    dateCreation: new Date().toISOString(),
    // CORRECTION : Utilisez "user" si c'est ce que l'interface attend
    user: { 
        role: "Admin", 
        entite: "DIRECTION", 
        email: "admin@exemple.com" 
    },
    // CORRECTION : Si l'interface attend "lignes" ET "activites"
    lignes: watchedValues.lignes as any || [],
    activites: [], // Ajoutez un tableau vide ou mappez vos lignes ici si nécessaire
    status: "BROUILLON",
}), [watchedValues]);

    const onSubmit = async (data: ConsolidationFormValues) => {
        setIsSubmitting(true);
        try {
            // await rapportService.saveRapport(data);
            router.push("/dashboard/supervision");
            router.refresh();
        } catch (err) {
            alert("Erreur lors de l'enregistrement. Vérifiez votre connexion.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-20">
            {/* Header / Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm sticky top-2 z-20">
                <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 p-1 rounded-lg ${errors.dateDebut || errors.dateFin ? 'bg-red-50 ring-1 ring-red-200' : ''}`}>
                        <input type="date" {...register("dateDebut")} className="text-xs border-gray-300 rounded focus:ring-blue-500" />
                        <span className="text-gray-400 text-xs">au</span>
                        <input type="date" {...register("dateFin")} className="text-xs border-gray-300 rounded focus:ring-blue-500" />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => exportToPdf("preview-container", `Rapport_${watchedValues.dateDebut}.pdf`)}
                        disabled={isPdfGenerating}
                        className="px-4 py-2 text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-colors"
                    >
                        {isPdfGenerating ? "Génération..." : "Aperçu PDF"}
                    </button>
                    <button
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all disabled:bg-gray-400"
                    >
                        {isSubmitting ? "Envoi en cours..." : "Valider le rapport"}
                    </button>
                </div>
            </div>

            {/* Table de saisie */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="grid grid-cols-[40px_1fr_1fr_1fr_50px] bg-gray-50/80 border-b border-gray-200">
                    <div className="p-3 text-[10px] font-bold text-gray-400 text-center">#</div>
                    <div className="p-3 text-[10px] font-bold text-gray-500 uppercase">Activités</div>
                    <div className="p-3 text-[10px] font-bold text-gray-500 uppercase">Effets</div>
                    <div className="p-3 text-[10px] font-bold text-gray-500 uppercase">Impacts</div>
                    <div className="bg-gray-100/30" />
                </div>

                <div className="divide-y divide-gray-100">
                    {fields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-[40px_1fr_1fr_1fr_50px] group/row hover:bg-blue-50/10 transition-colors">
                            <div className="flex items-center justify-center bg-gray-50/30 border-r border-gray-100 text-[10px] font-bold text-gray-400">
                                {index + 1}
                            </div>
                            <BulletCell control={control} register={register} index={index} fieldName="activites" />
                            <BulletCell control={control} register={register} index={index} fieldName="effets" />
                            <BulletCell control={control} register={register} index={index} fieldName="impacts" />
                            <div className="flex items-center justify-center">
                                {fields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-all opacity-0 group-hover/row:opacity-100"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                type="button"
                onClick={() => append({ activites: [""], effets: [""], impacts: [""] })}
                className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:text-blue-500 hover:border-blue-200 hover:bg-blue-50/50 transition-all font-bold text-[11px] flex items-center justify-center gap-2 uppercase tracking-widest"
            >
                <span className="text-lg">+</span> Ajouter un groupe de lignes
            </button>

            {/* Hidden PDF Preview */}
            <div className="fixed left-[-9999px] top-0 pointer-events-none opacity-0 shadow-none">
                <RapportView rapport={rapportPreview} containerId="preview-container" />
            </div>
        </div>
    );
};