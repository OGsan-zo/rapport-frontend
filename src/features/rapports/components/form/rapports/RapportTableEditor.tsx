"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { ApiRapport } from "@/features/rapports/types";
import { LigneActiviteEditor } from "../utils/LigneActiviteEditor";
import { rapportService } from "@/features/rapports/services/rapportService";
import { toast } from "react-hot-toast";
import { ObjectifSpecifique } from "@/features/admin/type/objectifSpecifique/objectifSpecifiqueSchema";
import { LogiqueIntervention } from "@/features/admin/type/logiqueIntervention/logiqueInterventionSchema";
import { objectifSpecifiqueService } from "@/features/admin/services/objectifSpecifiqueService";
import { logiqueInterventionService } from "@/features/admin/services/logiqueInterventionService";

interface RapportTableEditorProps {
  rapport: ApiRapport;
  onSuccess?: (idPrecedent: number, updatedRapport: ApiRapport) => void;
}

export const RapportTableEditor: React.FC<RapportTableEditorProps> = ({ rapport, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [objectifSpecifiques, setObjectifSpecifiques] = useState<ObjectifSpecifique[]>([]);
  const [logiqueInterventions, setLogiqueInterventions] = useState<LogiqueIntervention[]>([]);

  const fetchItems = useCallback(async () => {
    try {
      const [OS, LI] = await Promise.all([
        objectifSpecifiqueService.getAll(),
        logiqueInterventionService.getAll(),
      ]);
      setObjectifSpecifiques(OS);
      setLogiqueInterventions(LI);
    } catch {
      toast.error("Erreur lors du chargement des objectifs spécifiques");
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // 1. DÉTECTION DU TYPE DE CALENDRIER (Ajuste "type" ou "name" selon ton API)
  const isTrimestriel = rapport?.calendrier?.typeCalendrier?.id === 3;

  // 2. DÉFINITION DE LA LIGNE PAR DÉFAUT SELON LE TYPE
  const defaultLine = isTrimestriel
    ? {
        titre: "",
        effects: [{ value: "" }],
        impacts: [{ value: "" }],
        produits: [{ value: "" }],
        cibles: [{ value: "" }],
        previsions: [{ value: "" }],
        realisations: [{ value: "" }],
        taux: [{ value: "" }],
        observations: [{ value: "" }]
      }
    : { titre: "", effects: [{ value: "" }], impacts: [{ value: "" }] };

  // Initialisation du formulaire
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      lignes: [defaultLine]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "lignes"
  });

  // 3. REMPLISSAGE AUTOMATIQUE ADAPTÉ AU TRIMESTRIEL
  useEffect(() => {
    if (rapport && rapport.activites) {
      const formattedData = rapport.activites.map((act) => ({
        titre: act.activite.name,
        effects: act.effects?.length ? act.effects.map(e => ({ value: e.name })) : [{ value: "" }],
        impacts: act.impacts?.length ? act.impacts.map(i => ({ value: i.name })) : [{ value: "" }],
        // Remplissage des champs trimestriels (avec fallback s'ils sont vides)
        produits: act.produits?.length ? act.produits.map(p => ({ value: p.name })) : [{ value: "" }],
        cibles: act.cibles?.length ? act.cibles.map(c => ({ value: c.name })) : [{ value: "" }],
        previsions: act.previsions?.length ? act.previsions.map(p => ({ value: p.name })) : [{ value: "" }],
        realisations: act.realisations?.length ? act.realisations.map(r => ({ value: r.name })) : [{ value: "" }],
        taux: act.taux?.length ? act.taux.map(t => ({ value: t.name })) : [{ value: "" }],
        observations: act.observations?.length ? act.observations.map(o => ({ value: o.name })) : [{ value: "" }]
      }));
      reset({ lignes: formattedData });
    }
  }, [rapport, reset, isTrimestriel]);

  // LOGIQUE DE SOUMISSION
  const onSubmit = async (data: any) => {
    if (!rapport.id) {
      toast.error("ID rapport manquant");
      return;
    }

    setIsSubmitting(true);
    try {
      // 4. FORMATAGE DU PAYLOAD POUR L'API
      const activitesFormatted = data.lignes.map((l: any) => {
        const baseAct = {
          activite: { name: l.titre },
          effects: l.effects.filter((e: any) => e.value.trim() !== "").map((e: any) => ({ name: e.value })),
          impacts: l.impacts.filter((i: any) => i.value.trim() !== "").map((i: any) => ({ name: i.value }))
        };

        if (isTrimestriel) {
          return {
            ...baseAct,
            produits: l.produits?.filter((x: any) => x.value.trim() !== "").map((x: any) => ({ name: x.value })) || [],
            cibles: l.cibles?.filter((x: any) => x.value.trim() !== "").map((x: any) => ({ name: x.value })) || [],
            previsions: l.previsions?.filter((x: any) => x.value.trim() !== "").map((x: any) => ({ name: x.value })) || [],
            realisations: l.realisations?.filter((x: any) => x.value.trim() !== "").map((x: any) => ({ name: x.value })) || [],
            taux: l.taux?.filter((x: any) => x.value.trim() !== "").map((x: any) => ({ name: x.value })) || [],
            observations: l.observations?.filter((x: any) => x.value.trim() !== "").map((x: any) => ({ name: x.value })) || []
          };
        }

        return baseAct;
      });

      const payload: ApiRapport = {
        ...rapport,
        idCalendrier: rapport.calendrier.id,
        activites: activitesFormatted
      };

      const dataResponse = await rapportService.updateRapport(rapport.id, payload);
      toast.success("Rapport mis à jour avec succès");
      
      if (onSuccess) {
        onSuccess(rapport.id, dataResponse);
      }
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la mise à jour");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 5. CONFIGURATION DES EN-TÊTES ET DE LA GRILLE
  const headers = isTrimestriel 
    ? ["#", "Action", "Activité", "Activité PTA", "Produit", "Cible", "Prévision", "Réalisation", "Taux de réalisation", "Observation", ""]
    : ["#", "Titre de l'activité", "Effets", "Impacts", ""];

  const gridLayout = isTrimestriel 
    ? "grid-cols-[50px_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_50px]" 
    : "grid-cols-[70px_1fr_1fr_1fr_70px]";

  return (
    <form onSubmit={handleSubmit(onSubmit, (errors) => console.log("Erreurs Formulaire:", errors))} className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          {/* 6. LARGEUR DYNAMIQUE (1800px pour Trimestriel) */}
          <div className={isTrimestriel ? "min-w-[1800px]" : "min-w-[1000px]"}>
            
            {/* Header généré dynamiquement */}
            <div className={`grid ${gridLayout} bg-slate-50/80 border-b border-slate-200 items-stretch`}>
              {headers.map((header, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 text-[10px] font-black tracking-widest uppercase flex items-center ${
                    idx === 0 || idx === headers.length - 1 
                      ? "justify-center text-slate-400" 
                      : "text-slate-600 border-l border-slate-200/50"
                  }`}
                >
                  {header}
                </div>
              ))}
            </div>

            {/* Body */}
            <div className="divide-y divide-slate-100 flex flex-col gap-6 py-4 bg-slate-50/30">
              {fields.map((field, index) => (
                <LigneActiviteEditor
                  key={field.id}
                  control={control}
                  register={register}
                  index={index}
                  remove={remove}
                  canRemove={fields.length > 1}
                  isTrimestriel={isTrimestriel}
                  objectifSpecifiques={objectifSpecifiques}
                  logiqueInterventions={logiqueInterventions}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Bouton Ajouter Activité qui utilise la bonne ligne par défaut */}
        <button
          type="button"
          onClick={() => append(defaultLine)}
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