"use client";

import React from "react";
import { APP_CONSTANTS, IMAGES } from "@/config/constants";

interface RapportHeaderProps { }

export const RapportHeader: React.FC<RapportHeaderProps> = () => {
    return (
        <div className="w-full flex items-center mb-14" style={{ gap: "0" }}>

            {/* GAUCHE : Logo Repoblika */}
            <div className="flex-1 flex justify-start items-center">
                <img
                    src={IMAGES.LOGO_REPOBLIKA}
                    alt="Logo Repoblikan'i Madagasikara"
                    crossOrigin="anonymous"
                    className="w-24 h-auto object-contain"
                />
            </div>

            {/* CENTRE : Bloc texte institutionnel centré */}
            <div className="flex-1 flex flex-col items-center text-center gap-1">
                <p
                    className="text-[10px] font-black uppercase leading-tight tracking-wide"
                    style={{ color: "#0f172a" }}
                >
                    Repoblikan&apos;i Madagasikara
                </p>
                <p
                    className="text-[8px] font-medium italic"
                    style={{ color: "#64748b" }}
                >
                    Fitiavana — Tanindrazana — Fandrosoana
                </p>

                <div style={{ height: "6px" }} />

                <p
                    className="text-[9px] font-black uppercase leading-snug tracking-wide"
                    style={{ color: "#0f172a" }}
                >
                    Ministère de l&apos;Enseignement Supérieur
                </p>
                <p
                    className="text-[9px] font-black uppercase leading-snug tracking-wide"
                    style={{ color: "#0f172a" }}
                >
                    et de la Recherche Scientifique
                </p>
            </div>

            {/* DROITE : Logo MESUPRES */}
            <div className="flex-1 flex justify-end items-center">
                <img
                    src={IMAGES.LOGO_MESUPRES}
                    alt={`Logo ${APP_CONSTANTS.ministryName}`}
                    crossOrigin="anonymous"
                    className="w-24 h-auto object-contain"
                />
            </div>

        </div>
    );
};
