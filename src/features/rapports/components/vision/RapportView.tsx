"use client";

import React from "react";
import { ApiRapport } from "../../types"; 
import { IMAGES } from "@/features/common/constants";

interface RapportViewProps {
    rapport: ApiRapport;
    scale?: number;
    containerId?: string;
}

export const RapportView: React.FC<RapportViewProps> = ({
    rapport,
    scale = 1,
    containerId = "rapport-a4-container"
}) => {
    // Fonction avancée pour formater "DU 23 AU 27 FEVRIER 2026"
    const formatPeriodeStr = (dateDebutStr?: string, dateFinStr?: string) => {
        if (!dateDebutStr || !dateFinStr) return "N/A";
        
        const d1 = new Date(dateDebutStr);
        const d2 = new Date(dateFinStr);

        const day1 = d1.getDate();
        const month1 = d1.toLocaleString("fr-FR", { month: "long" }).toUpperCase();
        const year1 = d1.getFullYear();

        const day2 = d2.getDate();
        const month2 = d2.toLocaleString("fr-FR", { month: "long" }).toUpperCase();
        const year2 = d2.getFullYear();

        if (month1 === month2 && year1 === year2) {
            return `DU ${day1} AU ${day2} ${month2} ${year2}`;
        } else if (year1 === year2) {
            return `DU ${day1} ${month1} AU ${day2} ${month2} ${year2}`;
        } else {
            return `DU ${day1} ${month1} ${year1} AU ${day2} ${month2} ${year2}`;
        }
    };

    // Fonction pour générer la liste à puces proprement dans les cases
    const renderListText = (text?: string) => {
        if (!text) return null;
        const items = text.split('\n').filter(item => item.trim() !== '');
        if (items.length === 0) return null;

        return (
            <ul className="list-none m-0 p-0 space-y-1">
                {items.map((item, index) => (
                    <li key={index} className="flex gap-2 items-start text-justify">
                        {items.length > 1 && <span className="text-black mt-[1px]">-</span>}
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        );
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
                    className="pdf-sheet bg-white font-sans text-[12px] shadow-2xl"
                    style={{
                        width: "210mm",
                        minHeight: "297mm",
                        padding: "20mm",
                        transform: `scale(${scale})`,
                        transformOrigin: "top center",
                        boxSizing: "border-box",
                        border: "1px solid #f0f0f0",
                        color: "#000"
                    }}
                >
                    {/* ======= EN-TÊTE LOGOS ======= */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px", width: "100%" }}>
                        {/* REPOBLIKA */}
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <img src={IMAGES.LOGO_REPOBLIKA} alt="Logo Madagascar" style={{ width: "55px", height: "auto" }} />
                            <div style={{ textAlign: "left" }}>
                                <p style={{ fontSize: "10px", textTransform: "uppercase", fontWeight: "bold", lineHeight: "1.2", margin: 0 }}>
                                    Repoblikan'i Madagasikara
                                </p>
                                <p style={{ fontSize: "9px", fontStyle: "italic", margin: 0 }}>
                                    Fitiavana — Tanindrazana — Fandrosoana
                                </p>
                            </div>
                        </div>

                        {/* MESUPRES */}
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <div style={{ textAlign: "right" }}>
                                <p style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", margin: 0 }}>
                                    MESUPRES
                                </p>
                            </div>
                            <img src={IMAGES.LOGO_MESUPRES} alt="Logo MESUPRES" style={{ width: "55px", height: "auto" }} />
                        </div>
                    </div>

                    {/* ======= TABLEAU PRINCIPAL ======= */}
                    <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed", border: "1px solid #000" }}>
                        <thead>
                            {/* LIGNE 1 : ENTITÉ (Fond Vert Clair, centré, fusion de 3 colonnes) */}
                            <tr>
                                <th colSpan={3} style={{ border: "1px solid #000", padding: "12px", backgroundColor: "#D1E7B9", textAlign: "center", fontSize: "14px", fontWeight: "bold", textTransform: "uppercase" }}>
                                    {rapport.user?.entite || "DIRECTION DES SYSTEMES D'INFORMATION ET DES NOUVELLES TECHNOLOGIES (DSINT)"}
                                </th>
                            </tr>
                            
                            {/* LIGNE 2 : SEMAINE (Fond Violet Clair, centré, fusion de 3 colonnes) */}
                            <tr>
                                <th colSpan={3} style={{ border: "1px solid #000", padding: "10px", backgroundColor: "#E2D1F9", textAlign: "center", fontSize: "13px", fontWeight: "bold", textTransform: "uppercase" }}>
                                    SEMAINE {formatPeriodeStr(rapport.calendrier?.dateDebut, rapport.calendrier?.dateFin)}
                                </th>
                            </tr>

                            {/* LIGNE 3 : TITRES DES COLONNES (Fond Bleu Clair, centré) */}
                            <tr style={{ textAlign: "center", fontWeight: "bold", textTransform: "uppercase", fontSize: "12px", backgroundColor: "#BFDBFE" }}>
                                <th style={{ border: "1px solid #000", padding: "10px", width: "33%" }}>ACTIVITES</th>
                                <th style={{ border: "1px solid #000", padding: "10px", width: "33%" }}>EFFETS</th>
                                <th style={{ border: "1px solid #000", padding: "10px", width: "34%" }}>IMPACTS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* LIGNES DE DONNÉES */}
                            {rapport.activites?.map((activite, actIndex) => (
                                <React.Fragment key={`act-${actIndex}`}>
                                    {activite.effectsImpacts?.map((ei, eiIndex) => (
                                        <tr key={`${actIndex}-${eiIndex}`} style={{ breakInside: "avoid" }}>
                                            {/* Colonne Activités */}
                                            {eiIndex === 0 && (
                                                <td
                                                    rowSpan={activite.effectsImpacts.length}
                                                    style={{
                                                        border: "1px solid #000",
                                                        verticalAlign: "top",
                                                        padding: "10px",
                                                        fontWeight: "normal",
                                                        textAlign: "justify"
                                                    }}
                                                >
                                                    {activite.name || (activite as any).entite}
                                                </td>
                                            )}
                                            
                                            {/* Colonne Effets */}
                                            <td style={{ border: "1px solid #000", verticalAlign: "top", padding: "10px" }}>
                                                {renderListText(ei.effect)}
                                            </td>
                                            
                                            {/* Colonne Impacts */}
                                            <td style={{ border: "1px solid #000", verticalAlign: "top", padding: "10px" }}>
                                                {renderListText(ei.impact)}
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>

                    {/* ======= SIGNATURES ======= */}
                    <div className="flex justify-between items-start mt-16 px-8">
                        <div className="text-center text-[12px]">
                            <p className="font-bold uppercase">L'Agent</p>
                            <div className="h-20" /> {/* Espace pour la signature manuscrite */}
                            <p className="border-t border-black w-48 mx-auto pt-2 font-bold uppercase">
                                {rapport.user?.email?.split('@')[0] || "Nom de l'agent"}
                            </p>
                        </div>
                        <div className="text-center text-[12px]">
                            <p className="font-bold uppercase">Le Directeur / Chef de Service</p>
                            <div className="h-20" />
                            <p className="border-t border-black w-48 mx-auto pt-2" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};