import React from "react";
import { useFieldArray, Control, UseFormRegister } from "react-hook-form";
import { RapportFormValues } from "../../types/rapportType";

interface LigneActiviteProps {
  control: Control<RapportFormValues>;
  register: UseFormRegister<RapportFormValues>;
  index: number;
  remove: (index: number) => void;
  canRemove: boolean;
}

export const LigneActivite = ({ control, register, index, remove, canRemove }: LigneActiviteProps) => {
  const { fields: effetsFields, append: appendEffet, remove: removeEffet } = useFieldArray({
    control,
    name: `lignes.${index}.effets`,
  });

  const { fields: impactsFields, append: appendImpact, remove: removeImpact } = useFieldArray({
    control,
    name: `lignes.${index}.impacts`,
  });

  return (
    <div className="grid grid-cols-[70px_1fr_1.5fr_1.5fr_70px] group/row transition-colors hover:bg-slate-50/30">
      <div className="flex items-center justify-center text-xs font-black text-slate-300 bg-slate-50/20">
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className="border-l border-slate-100 p-2">
        <textarea
          {...register(`lignes.${index}.titre`)}
          className="w-full p-3 text-sm font-bold text-slate-800 bg-transparent border-none focus:ring-0 resize-none min-h-[120px] placeholder:text-slate-200"
          placeholder="Nom de l'activité..."
        />
      </div>

      {/* Liste des Effets */}
      <div className="border-l border-slate-100 p-3 space-y-2">
        {effetsFields.map((field, i) => (
          <div key={field.id} className="flex items-start gap-2 bg-white p-2 border border-slate-200 rounded-lg shadow-sm">
            <textarea
              {...register(`lignes.${index}.effets.${i}.value`)}
              className="w-full text-sm text-slate-600 bg-transparent border-none focus:ring-0 resize-none min-h-[60px] p-0 placeholder:text-slate-300"
              placeholder={`Effet ${i + 1}...`}
            />
            <button
              type="button"
              onClick={() => removeEffet(i)}
              disabled={effetsFields.length === 1}
              className="mt-1 text-slate-300 hover:text-red-500 disabled:opacity-0 transition-colors"
            >✕</button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendEffet({ value: "" })}
          className="w-full py-2 mt-2 border border-dashed border-slate-300 rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all"
        >+ Ajouter un effet</button>
      </div>

      {/* Liste des Impacts */}
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
              disabled={impactsFields.length === 1}
              className="mt-1 text-slate-300 hover:text-red-500 disabled:opacity-0 transition-colors"
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
          className="p-2.5 text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover/row:opacity-100 disabled:invisible"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};