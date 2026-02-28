"use client";

import React, { useState, useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

// Imports séparés
import { rapportSchema , RapportFormValues } from "../../types/rapport";
import { RapportToolbar } from "./rapports/RapportToolbar";
import { LigneActivite } from "./LigneActivite";
import { RapportView } from "../vision/RapportView";
import { ApiRapport } from "../../types";
import { usePdfExport } from "../../hooks/usePdfExport";
import { usePeriodes } from "@/features/config/hooks/usePeriodes";

export const ConsolidationForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTypeId, setSelectedTypeId] = useState<string>("");
  const { exportToPdf, isGenerating: isPdfGenerating } = usePdfExport();

  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm<RapportFormValues>({
    resolver: zodResolver(rapportSchema),
    defaultValues: {
      idCalendrier: undefined,
      lignes: [{ titre: "", effets: [{ value: "" }], impacts: [{ value: "" }], statut: "TERMINE" }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "lignes" });
  const calendrierResult = usePeriodes(true);
  const watchedValues = watch();


  const rapportPreview = useMemo<ApiRapport>(() => {
    return {
      
      id: 0,
      idCalendrier: watchedValues.idCalendrier,
      calendrier: { id: watchedValues.idCalendrier || 1, dateDebut: "2026-01-01", dateFin: "2026-01-07", typeCalendrier: { name: "Rapport" } },
      user: { id: 0, email: "utilisateur@system.mg", entite: "VOTRE DIRECTION", role: "Admin" },
      activites: watchedValues.lignes.map(l => ({
        name: l.titre,
        effectsImpacts: [{ 
          effect: l.effets?.map(e => e.value).filter(v => v.trim() !== "").join("\n") || "", 
          impact: l.impacts?.map(i => i.value).filter(v => v.trim() !== "").join("\n") || "" 
        }]
      })),
    };
  }, [watchedValues]);

  const onSubmit = async (data: RapportFormValues) => {
    setIsSubmitting(true);
    try {
      const formattedPayload = {
        idCalendrier: data.idCalendrier,
        activites: data.lignes.map((ligne) => ({
          activite: ligne.titre,
          effects: ligne.effets.filter(e => e.value.trim() !== "").map(e => ({ name: e.value.trim() })),
          impacts: ligne.impacts.filter(i => i.value.trim() !== "").map(i => ({ name: i.value.trim() })),
        })),
      };

      console.log("Payload :", formattedPayload);
      alert("Rapport enregistré avec succès !");
    } catch (err) {
      console.error("Erreur :", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // L'ajout du <form> permet au bouton "Enregistrer" du composant enfant de déclencher le onSubmit
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 max-w-6xl mx-auto pb-20">
      
      <RapportToolbar 
        selectedTypeId={selectedTypeId}
        onTypeChange={(val) => {
          setSelectedTypeId(val);
          setValue("idCalendrier", undefined as any);
        }}
        periodeValue={watchedValues.idCalendrier?.toString() || ""}
        onPeriodeChange={(val) => setValue("idCalendrier", Number(val), { shouldValidate: true })}
        isPdfGenerating={isPdfGenerating}
        onPreviewPdf={() => exportToPdf("pdf-render-zone", "Apercu_Rapport.pdf")}
        isSubmitting={isSubmitting}
        calendrierResult={calendrierResult}
      />

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            <div className="grid grid-cols-[70px_1fr_1.5fr_1.5fr_70px] bg-slate-50/80 border-b border-slate-200">
              <div className="p-4 text-[10px] font-black text-slate-400 text-center tracking-widest uppercase">#</div>
              <div className="p-4 text-[10px] font-black text-slate-600 tracking-widest uppercase border-l border-slate-200/50">Titre de l'activité</div>
              <div className="p-4 text-[10px] font-black text-slate-600 tracking-widest uppercase border-l border-slate-200/50">Effets</div>
              <div className="p-4 text-[10px] font-black text-slate-600 tracking-widest uppercase border-l border-slate-200/50">Impacts</div>
              <div className="p-4 border-l border-slate-200/50" />
            </div>

            <div className="divide-y divide-slate-100">
              {fields.map((field, index) => (
                <LigneActivite
                  key={field.id}
                  control={control}
                  register={register}
                  index={index}
                  remove={remove}
                  canRemove={fields.length > 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => append({ titre: "", effets: [{ value: "" }], impacts: [{ value: "" }], statut: "TERMINE" })}
        className="w-full py-10 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 hover:border-slate-900 hover:bg-slate-50 transition-all flex flex-col items-center justify-center gap-2 group"
      >
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors">
          <span className="text-xl font-light">+</span>
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Ajouter une activité</span>
      </button>

      {/* Rendu PDF caché */}
      <div className="fixed left-[-9999px] top-0 pointer-events-none opacity-0">
        <div id="pdf-render-zone" className="w-[1000px]">
          <RapportView rapport={rapportPreview} />
        </div>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[10px] font-bold uppercase tracking-widest text-center">
          Veuillez remplir tous les champs obligatoires (Titre, Effets, Impacts et Période).
        </div>
      )}
    </form>
  );
};