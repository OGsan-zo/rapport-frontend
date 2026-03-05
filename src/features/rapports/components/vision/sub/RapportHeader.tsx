"use client";

import React from "react";
import { APP_CONSTANTS, IMAGES } from "@/config/constants";

interface RapportHeaderProps {
}

export const RapportHeader: React.FC<RapportHeaderProps> = () => {
    return (
        <div className="w-full flex justify-between items-start mb-10">
            {/* Republic of Madagascar Logo & Text */}
            <div className="flex items-center gap-3">
                <img
                    src={IMAGES.LOGO_REPOBLIKA}
                    alt="Logo Madagascar"
                    className="w-14 h-auto object-contain"
                />
                <div className="flex flex-col">
                    <p className="text-[10px] font-black uppercase leading-tight" style={{ color: "#0f172a" }}>
                        Repoblikan'i Madagasikara
                    </p>
                    <p className="text-[9px] font-medium italic" style={{ color: "#64748b" }}>
                        Fitiavana — Tanindrazana — Fandrosoana
                    </p>
                </div>
            </div>

            {/* MESUPRES Logo & Text */}
            <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                    <p className="text-[14px] font-black uppercase tracking-tighter leading-none" style={{ color: "#0f172a" }}>
                        {APP_CONSTANTS.ministryName}
                    </p>
                    <p className="text-[8px] font-bold uppercase tracking-widest mt-0.5" style={{ color: "#94a3b8" }}>
                        Ministère
                    </p>
                </div>
                <img
                    src={IMAGES.LOGO_MESUPRES}
                    alt={`Logo ${APP_CONSTANTS.ministryName}`}
                    className="w-14 h-auto object-contain"
                />
            </div>
        </div>
    );
};
