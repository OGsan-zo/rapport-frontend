"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { objectifSpecifiqueSchema, ObjectifSpecifiqueFormValues } from "@/features/admin/type/objectifSpecifique/objectifSpecifiqueSchema";

interface ObjectifSpecifiqueCreateFormProps {
    onSubmit: (data: ObjectifSpecifiqueFormValues, reset: () => void) => Promise<void>;
    feedback: { type: "success" | "error"; message: string } | null;
}

export const ObjectifSpecifiqueCreateForm = ({ onSubmit, feedback }: ObjectifSpecifiqueCreateFormProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isValid },
    } = useForm<ObjectifSpecifiqueFormValues>({
        resolver: zodResolver(objectifSpecifiqueSchema),
        defaultValues: { name: "" ,li: "", activitePta: "", produit: "", cible: ""},
        mode: "onChange",
    });

    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data, reset))} className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm space-y-6">
            {feedback && (
                <div className={`p-4 rounded-lg text-xs font-bold uppercase tracking-widest border ${feedback.type === "success" ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-rose-50 border-rose-100 text-rose-500"}`}>
                    {feedback.message}
                </div>
            )}

            <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Activité PTA</label>
                <input
                    type="text"
                    placeholder="Activité PTA"
                    {...register("name")}
                    className={`w-full border rounded-lg px-4 py-3 text-sm outline-none transition ${errors.activitePta ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50/30"}`}
                />
                {errors.name && <p className="text-[9px] text-red-500 font-bold uppercase">{errors.name.message}</p>}
            </div>

            <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Logique d'intervention</label>
                <input
                    type="text"
                    placeholder="Logique d'intervention"
                    {...register("li")}
                    className={`w-full border rounded-lg px-4 py-3 text-sm outline-none transition ${errors.li ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50/30"}`}
                />
                {errors.li && <p className="text-[9px] text-red-500 font-bold uppercase">{errors.li.message}</p>}
            </div>

            <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Activité PTA</label>
                <input
                    type="text"
                    placeholder="Activité PTA"
                    {...register("activitePta")}
                    className={`w-full border rounded-lg px-4 py-3 text-sm outline-none transition ${errors.activitePta ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50/30"}`}
                />
                {errors.activitePta && <p className="text-[9px] text-red-500 font-bold uppercase">{errors.activitePta.message}</p>}
            </div>

            <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Produit</label>
                <input
                    type="text"
                    placeholder="Produit"
                    {...register("produit")}
                    className={`w-full border rounded-lg px-4 py-3 text-sm outline-none transition ${errors.produit ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50/30"}`}
                />
                {errors.produit && <p className="text-[9px] text-red-500 font-bold uppercase">{errors.produit.message}</p>}
            </div>

            <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Cible</label>
                <input
                    type="text"
                    placeholder="Cible"
                    {...register("cible")}
                    className={`w-full border rounded-lg px-4 py-3 text-sm outline-none transition ${errors.cible ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50/30"}`}
                />
                {errors.cible && <p className="text-[9px] text-red-500 font-bold uppercase">{errors.cible.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="w-full py-3.5 bg-slate-900 text-white font-bold text-[10px] uppercase tracking-widest rounded-lg disabled:opacity-50 active:scale-[0.98] transition-transform"
            >
                {isSubmitting ? "Enregistrement..." : "Ajouter"}
            </button>
        </form>
    );
};
