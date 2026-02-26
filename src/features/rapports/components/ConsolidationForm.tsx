"use client";

import React, { useState, useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

// Services et Types
import { rapportService } from "../services/rapportService";
import { ApiRapport } from "../types";
import { usePdfExport } from "../hooks/usePdfExport";

// Composants
import { RapportView } from "./RapportView";
import { SelectPeriode } from "../../common/components/SelectPeriode";

/**
 * Schéma de validation Zod
 * Note : statut est défini comme z.string() sans .optional() pour éviter l'erreur de type
 */
const consolidationSchema = z.object({
  idCalendrier: 1,
  dateDebut: z.string().optional(),
  dateFin: z.string().optional(),
  lignes: z.array(
    z.object({
      titre: z.string().min(1, "Le titre est requis"),
      description: z.string().min(1, "La description est requise"),
      impact: z.string().min(1, "L'impact est requis"),
      statut: z.string() // Strictement string pour matcher l'erreur TS
    })
  ).min(1),
});

type ConsolidationFormValues = z.infer<typeof consolidationSchema>;

export const ConsolidationForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { exportToPdf, isGenerating: isPdfGenerating } = usePdfExport();

  // Initialisation du formulaire
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ConsolidationFormValues>({
    resolver: zodResolver(consolidationSchema),
    defaultValues: {
      idCalendrier: undefined,
      lignes: [
        { titre: "", description: "", impact: "", statut: "TERMINE" }
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "lignes",
  });

  const watchedValues = watch();

  /**
   * Mapping pour l'aperçu PDF
   * Transforme les données du formulaire au format ApiRapport
   */
  const rapportPreview = useMemo<ApiRapport>(() => {
    return {
      id: 0,
      calendrier: {
        id: 1,
        dateDebut: watchedValues.dateDebut || "2026-01-01",
        dateFin: watchedValues.dateFin || "2026-01-07",
        typeCalendrier: {
          name: "Hebdomadaire"
        }
      },
      user: {
        id: 0,
        email: "utilisateur@system.mg",
        entite: "VOTRE DIRECTION",
        role: "Admin",
      },
      activites: [
            {
                name: "Déploiement de la nouvelle application de rapports",
                effectsImpacts: [
                    { effect: "Réduction du temps de traitement de 60%", impact: "Dématérialisation complète du processus de rapport" }
                ],
            },
        ],
    };
  }, [watchedValues]);

  const onSubmit = async (data: ConsolidationFormValues) => {
    setIsSubmitting(true);
    try {
      // Appel au service corrigé précédemment
      await rapportService.saveRapport(1, data.lignes);
      router.push("/dashboard");
    } catch (err) {
      console.error("Erreur submit:", err);
      alert("Erreur lors de l'enregistrement. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-20">
      {/* TOOLBAR STICKY */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md z-30 py-6 mb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-4 sm:px-0">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Rapport Hebdomadaire</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Consolidation des activités</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="bg-slate-50 p-1 rounded-xl border border-slate-200 flex items-center gap-2">
            <span className="text-[9px] font-black uppercase px-3 text-slate-500">Période :</span>
            <SelectPeriode
              currentId={watchedValues.idCalendrier}
              onSelect={(id) => setValue("idCalendrier", id, { shouldValidate: true })}
              className="w-[260px] border-none bg-transparent focus:ring-0 shadow-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isPdfGenerating}
              onClick={() => exportToPdf("pdf-render-zone", "Apercu_Rapport.pdf")}
              className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-50 transition-all disabled:opacity-50"
            >
              {isPdfGenerating ? "Génération..." : "Aperçu PDF"}
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="px-8 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 disabled:opacity-50"
            >
              {isSubmitting ? "Traitement..." : "Enregistrer"}
            </button>
          </div>
        </div>
      </div>

      {/* ZONE DE SAISIE */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            {/* Header de la Table */}
            <div className="grid grid-cols-[70px_1fr_1.5fr_1fr_70px] bg-slate-50/80 border-b border-slate-200">
              <div className="p-4 text-[10px] font-black text-slate-400 text-center uppercase tracking-widest">#</div>
              <div className="p-4 text-[10px] font-black text-slate-600 uppercase tracking-widest border-l border-slate-200/50">Titre</div>
              <div className="p-4 text-[10px] font-black text-slate-600 uppercase tracking-widest border-l border-slate-200/50">Description des activités</div>
              <div className="p-4 text-[10px] font-black text-slate-600 uppercase tracking-widest border-l border-slate-200/50">Impacts & Résultats</div>
              <div className="p-4 border-l border-slate-200/50" />
            </div>

            {/* Lignes du Formulaire */}
            <div className="divide-y divide-slate-100">
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-[70px_1fr_1.5fr_1fr_70px] group/row transition-colors hover:bg-slate-50/30">
                  <div className="flex items-center justify-center text-xs font-black text-slate-300 bg-slate-50/20">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="border-l border-slate-100 p-2">
                    <textarea
                      {...register(`lignes.${index}.titre`)}
                      className="w-full p-3 text-sm font-bold text-slate-800 bg-transparent border-none focus:ring-0 resize-none min-h-[100px] placeholder:text-slate-200"
                      placeholder="Ex: Maintenance serveurs..."
                    />
                  </div>

                  <div className="border-l border-slate-100 p-2">
                    <textarea
                      {...register(`lignes.${index}.description`)}
                      className="w-full p-3 text-sm text-slate-600 bg-transparent border-none focus:ring-0 resize-none min-h-[100px] placeholder:text-slate-200"
                      placeholder="Détails de l'intervention..."
                    />
                  </div>

                  <div className="border-l border-slate-100 p-2">
                    <textarea
                      {...register(`lignes.${index}.impact`)}
                      className="w-full p-3 text-sm text-slate-600 bg-transparent border-none focus:ring-0 resize-none min-h-[100px] placeholder:text-slate-200"
                      placeholder="Impact sur le service..."
                    />
                  </div>

                  <div className="border-l border-slate-100 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      disabled={fields.length === 1}
                      className="p-2.5 text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover/row:opacity-100 disabled:invisible"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOUTON AJOUTER */}
      <button
        type="button"
        onClick={() => append({ titre: "", description: "", impact: "", statut: "TERMINE" })}
        className="w-full py-10 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 hover:border-slate-900 hover:bg-slate-50 transition-all flex flex-col items-center justify-center gap-2 group"
      >
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors">
            <span className="text-xl font-light">+</span>
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Ajouter une activité</span>
      </button>

      {/* ZONE INVISIBLE POUR LE PDF */}
      <div className="fixed left-[-9999px] top-0 pointer-events-none opacity-0">
        <div id="pdf-render-zone" className="w-[1000px]">
          <RapportView rapport={rapportPreview} />
        </div>
      </div>
      
      {/* Affichage des erreurs de validation globales */}
      {Object.keys(errors).length > 0 && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[10px] font-bold uppercase tracking-widest text-center">
          Veuillez remplir tous les champs obligatoires avant de valider.
        </div>
      )}
    </div>
  );
};