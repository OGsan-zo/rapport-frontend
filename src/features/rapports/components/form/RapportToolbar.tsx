import React from "react";
import { PeriodeSelect } from "@/features/config/components/PeriodeSelect";
import { TypeCalendrierSelect } from "@/features/config/components/TypeCalendrierSelect";

interface RapportToolbarProps {
  selectedTypeId: string;
  onTypeChange: (val: string) => void;
  periodeValue: string;
  onPeriodeChange: (val: string) => void;
  isPdfGenerating: boolean;
  onPreviewPdf: () => void;
  isSubmitting: boolean;
}

export const RapportToolbar = ({
  selectedTypeId,
  onTypeChange,
  periodeValue,
  onPeriodeChange,
  isPdfGenerating,
  onPreviewPdf,
  isSubmitting,
}: RapportToolbarProps) => {
  return (
    <div className="sticky top-0 bg-white/90 backdrop-blur-md z-30 py-6 mb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-4 sm:px-0">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Rapport Hebdomadaire</h1>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Consolidation des activités</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Select Type */}
        <div className="flex items-center gap-2 px-3 border-r border-slate-200">
          <span className="text-[9px] font-bold uppercase text-slate-400">Type :</span>
          <TypeCalendrierSelect
            value={selectedTypeId}
            onValueChange={onTypeChange}
            className="min-w-[160px] border-none bg-transparent shadow-none focus:ring-0"
          />
        </div>

        {/* Select Période */}
        <div className="bg-slate-50 p-1 rounded-xl border border-slate-200 flex items-center gap-2">
          <span className="text-[9px] font-black uppercase px-3 text-slate-500">Période :</span>
          <PeriodeSelect
            value={periodeValue}
            onValueChange={onPeriodeChange}
            typeCalendrierId={selectedTypeId}
            isInsert={true} 
            className="w-[260px] border-none bg-transparent focus:ring-0 shadow-none"
          />
        </div>

        {/* Boutons d'action */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isPdfGenerating}
            onClick={onPreviewPdf}
            className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-50 transition-all disabled:opacity-50"
          >
            {isPdfGenerating ? "Génération..." : "Aperçu PDF"}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 disabled:opacity-50"
          >
            {isSubmitting ? "Traitement..." : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
};