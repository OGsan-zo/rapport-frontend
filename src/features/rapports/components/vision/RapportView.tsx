"use client";

import React from "react";
// Mise à jour de l'import vers ApiRapport
import { ApiRapport } from "../../types"; 
import { IMAGES } from "@/features/common/constants";

interface RapportViewProps {
    rapport: ApiRapport; // Utilisation du nouveau type
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
                tr { page-break-inside: avoid; break-inside: avoid; }
            `}</style>

            <div
                className="pdf-viewer-bg min-h-screen w-full py-10 px-4 flex flex-col items-center gap-8"
                style={{ backgroundColor: "#404040" }}
            >
                <div
                    id={containerId}
                    className="pdf-sheet bg-white font-sans text-[13px] shadow-2xl"
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
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", width: "100%" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <img src={IMAGES.LOGO_REPOBLIKA} alt="Logo Madagascar" style={{ width: "45px", height: "auto" }} />
                            <div style={{ textAlign: "left" }}>
                                <p style={{ fontSize: "10px", textTransform: "uppercase", fontWeight: "bold", lineHeight: "1.2", color: "#1e293b", margin: 0 }}>
                                    Repoblikan&apos;i Madagasikara
                                </p>
                                <p style={{ fontSize: "9px", fontStyle: "italic", color: "#64748b", margin: 0 }}>
                                    Fitiavana — Tanindrazana — Fandrosoana
                                </p>
                            </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <div style={{ textAlign: "right" }}>
                                <p style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", color: "#1e293b", margin: 0 }}>
                                    MESUPRES
                                </p>
                            </div>
                            <img src={IMAGES.LOGO_MESUPRES} alt="Logo MESUPRES" style={{ width: "45px", height: "auto" }} />
                        </div>
                    </div>

                    <div style={{ textAlign: "center", marginBottom: "24px" }}>
                        <h1 style={{ fontSize: "14px", fontWeight: "bold", textTransform: "uppercase", borderBottom: "1.5px solid #1e293b", paddingBottom: "8px", display: "inline-block", paddingLeft: "16px", paddingRight: "16px", color: "#1e293b" }}>
                            Rapport d&apos;Activités
                        </h1>
                    </div>

                    {/* ======= TABLEAU PRINCIPAL ======= */}
                    <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed", border: "1px solid #1e293b" }}>
                        <tbody>
                            {/* Modification : rapport.utilisateur au lieu de rapport.user */}
                            <tr className="bg-[#D1E7B9]">
                                <td className="border-b border-r border-black w-[28%] p-3 font-bold uppercase text-[12px] text-black">
                                    Entité :
                                </td>
                                <td className="border-b border-black p-3 font-bold uppercase text-[12px] text-black">
                                    {rapport.user.entite || "N/A"}
                                </td>
                            </tr>

                            <tr className="bg-[#E2D1F9]">
                                <td className="border-b-2 border-r border-black p-3 font-bold uppercase text-[12px] text-black">
                                    Semaine du :
                                </td>
                                <td className="border-b-2 border-black p-3 font-bold uppercase text-[12px] text-black">
                                    {formatDate(rapport.calendrier.dateDebut)} AU {formatDate(rapport.calendrier.dateFin)}
                                </td>
                            </tr>

                            <tr style={{ backgroundColor: "#F8FAFC", textAlign: "center", fontWeight: "bold", textTransform: "uppercase", fontSize: "11px", color: "#475569" }}>
                                <td style={{ borderBottom: "1px solid #e2e8f0", borderRight: "1px solid #e2e8f0", padding: "12px" }}>Activités</td>
                                <td style={{ borderBottom: "1px solid #e2e8f0", borderRight: "1px solid #e2e8f0", padding: "12px" }}>Effets</td>
                                <td style={{ borderBottom: "1px solid #e2e8f0", padding: "12px" }}>Impacts</td>
                            </tr>

                            {/* Lignes de données */}
                            {rapport.activites.map((activite, actIndex) => (
                                <React.Fragment key={`act-${actIndex}`}>
                                    {activite.effectsImpacts.map((ei, eiIndex) => (
                                        <tr key={`${actIndex}-${eiIndex}`} style={{ breakInside: "avoid" }}>
                                            {eiIndex === 0 && (
                                                <td
                                                    rowSpan={activite.effectsImpacts.length}
                                                    style={{
                                                        borderBottom: "1px solid #000000",
                                                        borderRight: "1px solid #000000",
                                                        verticalAlign: "top",
                                                        padding: "12px",
                                                        fontWeight: "500"
                                                    }}
                                                >
                                                    {/* On privilégie 'name', sinon 'entite' (selon votre structure ApiRapport) */}
                                                    {activite.name || (activite as any).entite}
                                                </td>
                                            )}
                                            <td style={{ borderBottom: "1px solid #000000", borderRight: "1px solid #000000", verticalAlign: "top", padding: "12px" }}>
                                                <div className="flex gap-2"><span>•</span><span>{ei.effect}</span></div>
                                            </td>
                                            <td style={{ borderBottom: "1px solid #000000", verticalAlign: "top", padding: "12px" }}>
                                                <div className="flex gap-2"><span>•</span><span>{ei.impact}</span></div>
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>

                    {/* ======= SIGNATURES ======= */}
                    <div className="flex justify-between items-start mt-12 px-10">
                        <div className="text-center text-[11px]">
                            <p className="font-bold uppercase text-black">L&apos;Agent</p>
                            <div className="h-16" />
                            <p className="border-t-2 border-black w-40 mx-auto font-bold pt-1">
                                {/* Accès sécurisé au nom de l'utilisateur */}
                                {rapport.user.entite || rapport.user.email?.split('@')[0]}
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