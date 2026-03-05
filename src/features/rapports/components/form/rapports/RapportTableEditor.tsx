"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { ApiRapport } from "@/features/rapports/types"; // Ajustez l'import
import { LigneActiviteEditor } from "../utils/LigneActiviteEditor";
import { rapportService } from "@/features/rapports/services/rapportService";


import { toast } from "react-hot-toast"; // Ou votre système de notification

interface RapportTableEditorProps {
  rapport: ApiRapport; // Obligatoire pour avoir l'ID du calendrier
  onSuccess?: (idPrecedent: number,updatedRapport: ApiRapport) => void;
}

export const RapportTableEditor: React.FC<RapportTableEditorProps> = ({ rapport, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialisation du formulaire
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      lignes: [{ titre: "", effects: [{ value: "" }], impacts: [{ value: "" }] }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "lignes"
  });

  // Remplissage automatique
  useEffect(() => {
    if (rapport && rapport.activites) {
      const formattedData = rapport.activites.map((act) => ({
        titre: act.activite.name,
        effects: act.effects.map(e => ({ value: e.name })),
        impacts: act.impacts.map(i => ({ value: i.name }))
      }));
      reset({ lignes: formattedData });
    }
  }, [rapport, reset]);

  // LOGIQUE DE SOUMISSION
  const onSubmit = async (data: any) => {

    if (!rapport.id) {
      toast.error("ID rapport manquant");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Re-formater les données pour l'API
      const payload: ApiRapport = {
        ...rapport,
        idCalendrier: rapport.calendrier.id, // Utilisation de l'ID passé depuis le dashboard
        activites: data.lignes.map((l: any) => ({
          activite: { name: l.titre },
          effects: l.effects.filter((e: any) => e.value.trim() !== "").map((e: any) => ({ name: e.value })),
          impacts: l.impacts.filter((i: any) => i.value.trim() !== "").map((i: any) => ({ name: i.value }))
        }))
      };
      // console.log("Payload envoyé:", payload);
      // 2. Appel au service
      const dataResponse = await rapportService.updateRapport(rapport.id, payload);
      toast.success("Rapport mis à jour avec succès");
      if (onSuccess) {
        // Si votre API renvoie le rapport mis à jour, on l'utilise, sinon on passe le payload
        onSuccess(rapport.id,dataResponse);
      }
    } catch (error: any) {
      //   console.error(error);
      toast.error(error.message || "Erreur lors de la mise à jour");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (errors) => console.log("Erreurs Formulaire:", errors))}
      className="space-y-6"
    >
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            {/* Header */}
            <div className="grid grid-cols-[70px_1fr_1.5fr_1.5fr_70px] bg-slate-50/80 border-b border-slate-200">
              <div className="p-4 text-[10px] font-black text-slate-400 text-center tracking-widest uppercase">#</div>
              <div className="p-4 text-[10px] font-black text-slate-600 tracking-widest uppercase border-l border-slate-200/50">Titre de l'activité</div>
              <div className="p-4 text-[10px] font-black text-slate-600 tracking-widest uppercase border-l border-slate-200/50">Effets</div>
              <div className="p-4 text-[10px] font-black text-slate-600 tracking-widest uppercase border-l border-slate-200/50">Impacts</div>
              <div className="p-4 border-l border-slate-200/50" />
            </div>

            {/* Body */}
            <div className="divide-y divide-slate-100">
              {fields.map((field, index) => (
                <LigneActiviteEditor
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

      <div className="flex flex-col gap-4">
        {/* Bouton Ajouter Activité */}
        <button
          type="button"
          onClick={() => append({ titre: "", effects: [{ value: "" }], impacts: [{ value: "" }] })}
          className="w-full py-6 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 hover:border-slate-900 hover:bg-slate-50 transition-all flex flex-col items-center justify-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors">
            <span className="text-lg">+</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Ajouter une ligne</span>
        </button>

        {/* Bouton ENREGISTRER FINAL */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-10 py-4 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-200"
          >
            {isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
          </button>
        </div>
      </div>
    </form>
  );
};