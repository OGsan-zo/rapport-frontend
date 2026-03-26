import React from "react";
import { Control, UseFormRegister, UseFieldArrayRemove } from "react-hook-form";
import { LigneActivite } from "./LigneActivite"; // Ajustez le chemin

interface TableauActivitesProps {
  fields: Record<"id", string>[];
  control: Control<any>;
  register: UseFormRegister<any>;
  remove: UseFieldArrayRemove;
  isTrimestriel?: boolean;
}

const TableauActivites: React.FC<TableauActivitesProps> = ({ 
  fields, 
  control, 
  register, 
  remove, 
  isTrimestriel = false 
}) => {
  
  const headers = isTrimestriel 
    ? ["#", "Action", "Activité", "Activité PTA", "Produit", "Cible", "Prévision", "Taux de réalisation", "Observation", ""]
    : ["#", "Titre de l'activité", "Effets", "Impacts", ""];

  // 1. CORRECTION DES COLONNES : Toutes les colonnes de texte sont maintenant à "1fr" (taille égale)
  const gridLayout = isTrimestriel 
    ? "grid-cols-[50px_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_50px]" 
    : "grid-cols-[70px_1fr_1fr_1fr_70px]";

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        {/* 2. CORRECTION DE L'ESPACE : Passage de 1400px à 1800px pour éviter l'écrasement */}
        <div className={isTrimestriel ? "min-w-[1800px]" : "min-w-[1000px]"}>
          
          {/* En-têtes dynamiques */}
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

          {/* Liste des lignes */}
          <div className="flex flex-col gap-6 py-4 bg-slate-50/30">
            {fields.map((field, index) => (
              <LigneActivite
                key={field.id}
                control={control}
                register={register}
                index={index}
                remove={remove}
                isTrimestriel={isTrimestriel}
                canRemove={fields.length > 1}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default TableauActivites;