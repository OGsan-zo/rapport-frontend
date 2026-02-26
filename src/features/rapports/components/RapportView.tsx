"use client";

import React from "react";
import { RapportConsolide } from "../types";
import { IMAGES } from "@/features/common/constants";

interface RapportViewProps {
    rapport: RapportConsolide;
    scale?: number;
    containerId?: string;
}

export const RapportView: React.FC<RapportViewProps> = ({
    rapport,
    scale = 1,
    containerId = "rapport-a4-container"
}) => {
    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        return d.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    return (
        <>
            <style>{`
                @media print {
                    body { background: white !important; }
                    .pdf-viewer-bg { background: white !important; padding: 0 !important; }
                    .pdf-sheet { 
                        box-shadow: none !important; 
                        margin: 0 !important; 
                        transform: none !important; 
                        border: none !important;
                    }
                }
                /* Empêche la coupure des lignes de tableau entre deux pages PDF */
                tr { page-break-inside: avoid; break-inside: avoid; }
            `}</style>

            <div
                className="pdf-viewer-bg min-h-screen w-full py-10 px-4 flex flex-col items-center gap-8"
                style={{ backgroundColor: "#404040" }}
            >
                <div
                    id={containerId}
                    className="pdf-sheet bg-white font-serif text-[13px] shadow-2xl"
                    style={{
                        width: "210mm",
                        minHeight: "297mm",
                        padding: "20mm",
                        transform: `scale(${scale})`,
                        transformOrigin: "top center",
                        boxSizing: "border-box",
                        border: "1px solid #f0f0f0",
                    }}
                >
                    {/* ======= EN-TÊTE ======= */}
                    <div className="flex justify-between items-center mb-8 w-full">
                        <div className="flex items-center gap-3">
                            <img src={IMAGES.LOGO_REPOBLIKA} alt="Logo" className="w-[45px] h-auto" />
                            <div className="text-left">
                                <p className="text-[10px] uppercase font-bold leading-tight m-0 text-black">
                                    Repoblikan&apos;i Madagasikara
                                </p>
                                <p className="text-[9px] italic m-0 text-black">
                                    Fitiavana — Tanindrazana — Fandrosoana
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <p className="text-[12px] font-bold uppercase text-black m-0">MESUPRES</p>
                            <img src={IMAGES.LOGO_MESUPRES} alt="Logo" className="w-[45px] h-auto" />
                        </div>
                    </div>

                    {/* ======= TITRE ======= */}
                    <div className="text-center mb-6">
                        <h1 className="text-[14px] font-bold uppercase border-b-2 border-black pb-2 px-4 inline-block text-black">
                            Rapport Hebdomadaire d&apos;Activités
                        </h1>
                    </div>

                    {/* ======= TABLEAU ======= */}
                    <table className="w-full border-collapse border-2 border-black table-fixed">
                        <tbody>
                            {/* Entité - Accès via rapport.utilisateur.entite */}
                            <tr className="bg-[#D1E7B9]">
                                <td className="border-b border-r border-black w-[28%] p-3 font-bold uppercase text-[12px] text-black">
                                    Entité :
                                </td>
                                <td className="border-b border-black p-3 font-bold uppercase text-[12px] text-black">
                                    {rapport.user.entite}
                                </td>
                            </tr>

                            {/* Semaine - Accès via rapport.calendrier */}
                            <tr className="bg-[#E2D1F9]">
                                <td className="border-b-2 border-r border-black p-3 font-bold uppercase text-[12px] text-black">
                                    Semaine du :
                                </td>
                                <td className="border-b-2 border-black p-3 font-bold uppercase text-[12px] text-black">
                                    {formatDate(rapport.calendrier.dateDebut)} AU {formatDate(rapport.calendrier.dateFin)}
                                </td>
                            </tr>

                            {/* Headers de colonnes */}
                            <tr className="bg-[#BDE3FF] text-center font-bold uppercase text-[11px] text-black">
                                <td className="border-b-2 border-r border-black p-3 w-1/3">Activités</td>
                                <td className="border-b-2 border-r border-black p-3 w-1/3">Effets</td>
                                <td className="border-b-2 border-black p-3 w-1/3">Impacts</td>
                            </tr>

                            {/* Données - Accès via rapport.activites & effectsImpacts */}
                            {rapport.activites.map((item, idx) => (
                                <tr key={idx} className="text-black align-top">
                                    <td className="border-b border-r border-black p-3">
                                        • {item.activite.name}
                                    </td>
                                    <td className="border-b border-r border-black p-3">
                                        <ul className="list-none p-0 m-0">
                                            {item.effectsImpacts.map((ei, i) => (
                                                <li key={i} className="mb-1">• {ei.effect}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="border-b border-black p-3">
                                        <ul className="list-none p-0 m-0">
                                            {item.effectsImpacts.map((ei, i) => (
                                                <li key={i} className="mb-1">• {ei.impact}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* ======= SIGNATURES ======= */}
                    <div className="flex justify-between items-start mt-12 px-10">
                        <div className="text-center text-[11px]">
                            <p className="font-bold uppercase text-black">L&apos;Agent</p>
                            <div className="h-16" />
                            <p className="border-t-2 border-black w-40 mx-auto font-bold pt-1">
                                {rapport.user.email.split('@')[0]}
                            </p>
                        </div>
                        <div className="text-center text-[11px]">
                            <p className="font-bold uppercase text-black">Le Directeur / Chef de Service</p>
                            <div className="h-16" />
                            <p className="border-t-2 border-black w-40 mx-auto" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};