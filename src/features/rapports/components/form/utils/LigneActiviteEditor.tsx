import React from "react";
import { useFieldArray, Control, UseFormRegister } from "react-hook-form";

interface LigneActiviteProps {
  control: any; // Idéalement définir le type du formulaire
  register: any;
  index: number;
  remove: (index: number) => void;
  canRemove: boolean;
}

export const LigneActiviteEditor = ({ control, register, index, remove, canRemove }: LigneActiviteProps) => {
  // Gestion dynamique des effets à l'intérieur de cette ligne
  const { fields: effectsFields, append: appendEffect, remove: removeEffect } = useFieldArray({
    control,
    name: `lignes.${index}.effects`,
  });

  // Gestion dynamique des impacts à l'intérieur de cette ligne
  const { fields: impactsFields, append: appendImpact, remove: removeImpact } = useFieldArray({
    control,
    name: `lignes.${index}.impacts`,
  });

  return (
    <div className="grid grid-cols-[70px_1fr_1.5fr_1.5fr_70px] group/row transition-colors hover:bg-slate-50/30">
      {/* Index */}
      <div className="flex items-center justify-center text-xs font-black text-slate-300 bg-slate-50/20">
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Titre Activité */}
      <div className="border-l border-slate-100 p-2">
        <textarea
          {...register(`lignes.${index}.titre`)}
          className="w-full p-3 text-sm font-bold text-slate-800 bg-transparent border-none focus:ring-0 resize-none min-h-[120px] placeholder:text-slate-200"
          placeholder="Nom de l'activité..."
        />
      </div>

      {/* Effets */}
      <div className="border-l border-slate-100 p-3 space-y-2">
        {effectsFields.map((field, i) => (
          <div key={field.id} className="flex items-start gap-2 bg-white p-2 border border-slate-200 rounded-lg shadow-sm">
            <textarea
              {...register(`lignes.${index}.effects.${i}.value`)}
              className="w-full text-sm text-slate-600 bg-transparent border-none focus:ring-0 resize-none min-h-[60px] p-0 placeholder:text-slate-300"
              placeholder={`Effet ${i + 1}...`}
            />
            <button
              type="button"
              onClick={() => removeEffect(i)}
              className="mt-1 text-slate-300 hover:text-red-500 transition-colors"
            >✕</button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendEffect({ value: "" })}
          className="w-full py-2 mt-2 border border-dashed border-slate-300 rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all"
        >+ Ajouter un effet</button>
      </div>

      {/* Impacts */}
      <div className="border-l border-slate-100 p-3 space-y-2">
        {impactsFields.map((field, i) => (
          <div key={field.id} className="flex items-start gap-2 bg-white p-2 border border-slate-200 rounded-lg shadow-sm">
            <textarea
              {...register(`lignes.${index}.impacts.${i}.value`)}
              className="w-full text-sm text-slate-600 bg-transparent border-none focus:ring-0 resize-none min-h-[60px] p-0 placeholder:text-slate-300"
              placeholder={`Impact ${i + 1}...`}
            />
            <button
              type="button"
              onClick={() => removeImpact(i)}
              className="mt-1 text-slate-300 hover:text-red-500 transition-colors"
            >✕</button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendImpact({ value: "" })}
          className="w-full py-2 mt-2 border border-dashed border-slate-300 rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all"
        >+ Ajouter un impact</button>
      </div>

    <div className="border-l border-slate-100 flex items-center justify-center">
      <button
        type="button"
        onClick={() => remove(index)}
        disabled={!canRemove}
        className="
          p-2.5
          rounded-full
          transition-all
          
          text-red-300 bg-red-50 opacity-100
          
          md:text-slate-300 md:bg-transparent md:opacity-0
          md:hover:text-red-500 md:hover:bg-red-50
          md:group-hover/row:opacity-100
          
          disabled:invisible
        "
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>

    </div>
  );
};