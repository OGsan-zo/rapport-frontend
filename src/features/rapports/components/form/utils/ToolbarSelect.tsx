import React from "react";
import { PeriodeSelect } from "@/features/config/components/PeriodeSelect";
import { TypeCalendrierSelect } from "@/features/config/components/TypeCalendrierSelect";
import { ToolbarSelectsProps } from "@/features/rapports/types/utils/utilsType";

export const ToolbarSelects = ({
  selectedTypeId,
  onTypeChange,
  periodeValue,
  onPeriodeChange,
  calendrierResult,
}: ToolbarSelectsProps) => {
  return (
    <>
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
          calendrierResult={calendrierResult}
          className="w-[260px] border-none bg-transparent focus:ring-0 shadow-none"
        />
      </div>
    </>
  );
};