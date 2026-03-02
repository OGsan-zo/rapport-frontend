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
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 w-full">
      {/* Select Type */}
      <div className="flex flex-col gap-1 w-full lg:w-auto lg:border-r lg:border-slate-200 lg:pr-4">
        <span className="text-[9px] font-bold uppercase text-slate-400 tracking-widest">
          Type de calendrier
        </span>
        <TypeCalendrierSelect
          value={selectedTypeId}
          onValueChange={onTypeChange}
          className="w-full border-none bg-transparent shadow-none focus:ring-0"
        />
      </div>

      {/* Select Période */}
      <div className="flex flex-col gap-1 w-full lg:w-auto">
        <span className="text-[9px] font-bold uppercase text-slate-400 tracking-widest">
          Période
        </span>
        <div className="bg-slate-50 px-3 py-1 rounded-xl border border-slate-200 w-full">
          <PeriodeSelect
            value={periodeValue}
            onValueChange={onPeriodeChange}
            typeCalendrierId={selectedTypeId}
            calendrierResult={calendrierResult}
            className="w-full border-none bg-transparent focus:ring-0 shadow-none"
          />
        </div>
      </div>
    </div>
  );
};