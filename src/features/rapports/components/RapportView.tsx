"use client";

import React from "react";
import { RapportConsolide } from "../types";
import { IMAGES } from "@/features/common/constants";

interface RapportViewProps {
    rapport: RapportConsolide;
    scale?: number;
    containerId?: string;
}

/**
 * Composant de visualisation style "Liseuse PDF".
 *
 * - Fond gris anthracite (#404040) simulant l'environnement d'un lecteur PDF.
 * - Feuille A4 (210mm) blanche centrée avec ombre 2xl marquée.
 * - Tableau administratif strict : border-2 border-black, aucun arrondi.
 * - Multi-pages : les lignes trop longues passent sur une nouvelle feuille A4 (break-inside: avoid).
 */
export const RapportView: React.FC<RapportViewProps> = ({
    rapport,
    scale = 1,
    containerId = "rapport-a4-container"
}) => {
    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const renderBulletList = (items: string[]) => {
        if (!items || items.length === 0) return null;
        return (
            <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
                {items.map((item, idx) => (
                    <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "4px", marginBottom: "4px", lineHeight: "1.2" }}>
                        <span style={{ flexShrink: 0, marginTop: "2px", color: "#000000" }}>•</span>
                        <span style={{ color: "#000000" }}>{item}</span>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <>
            {/* Styles globaux pour l'impression */}
            <style>{`
                @media print {
                    body {
                        background: white !important;
                        padding: 0 !important;
                        margin: 0 !important;
                    }
                    .pdf-viewer-bg {
                        background: white !important;
                        padding: 0 !important;
                    }
                    .pdf-sheet {
                        box-shadow: none !important;
                        margin: 0 !important;
                        position: static !important;
                        transform: none !important;
                    }
                    table {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        border-collapse: collapse !important;
                    }
                    @page {
                        size: A4;
                        margin: 15mm;
                    }
                }
            `}</style>

            {/* Fond gris anthracite — rendu liseuse PDF */}
            <div
                className="pdf-viewer-bg min-h-screen w-full py-10 px-4 flex flex-col items-center gap-8"
                style={{ backgroundColor: "#404040" }}
            >
                {/* Feuille A4 blanc brillant */}
                <div
                    id={containerId}
                    className="pdf-sheet bg-white font-serif text-[13px] shadow-2xl"
                    style={{
                        width: "210mm",
                        minHeight: "297mm",
                        padding: "20mm",
                        transform: `scale(${scale})`,
                        transformOrigin: "top center",
                        breakAfter: "avoid",
                        boxSizing: "border-box",
                        border: "1px solid #f0f0f0", // Bordure subtile pour html2canvas
                    }}
                >
                    {/* ======= EN-TÊTE OFFICIEL ======= */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", width: "100%" }}>
                        {/* Logo Repoblika + Texte */}
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <img
                                src={IMAGES.LOGO_REPOBLIKA}
                                alt="Logo Madagascar"
                                style={{ width: "45px", height: "auto" }}
                            />
                            <div style={{ textAlign: "left" }}>
                                <p style={{ fontSize: "10px", textTransform: "uppercase", fontWeight: "bold", lineHeight: "1.2", letterSpacing: "0.05em", color: "#000000", margin: 0 }}>
                                    Repoblikan&apos;i Madagasikara
                                </p>
                                <p style={{ fontSize: "9px", fontStyle: "italic", color: "#000000", marginTop: "2px", margin: 0 }}>
                                    Fitiavana — Tanindrazana — Fandrosoana
                                </p>
                            </div>
                        </div>

                        {/* Logo MESUPRES + Texte */}
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <div style={{ textAlign: "right" }}>
                                <p style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", color: "#000000", margin: 0 }}>
                                    MESUPRES
                                </p>
                            </div>
                            <img
                                src={IMAGES.LOGO_MESUPRES}
                                alt="Logo MESUPRES"
                                style={{ width: "45px", height: "auto" }}
                            />
                        </div>
                    </div>

                    {/* ======= TITRE ======= */}
                    <div style={{ textAlign: "center", marginBottom: "24px" }}>
                        <h1 style={{ fontSize: "14px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: "2px solid #000000", paddingBottom: "8px", display: "inline-block", paddingLeft: "16px", paddingRight: "16px", color: "#000000" }}>
                            Rapport Hebdomadaire d&apos;Activités
                        </h1>
                    </div>

                    {/* ======= TABLEAU PRINCIPAL ======= */}
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            tableLayout: "fixed",
                            border: "2px solid #000000", // Contour extérieur
                        }}
                    >
                        <tbody>
                            {/* Ligne Entité */}
                            <tr style={{ backgroundColor: "#D1E7B9" }}>
                                <td
                                    style={{
                                        borderBottom: "1px solid #000000",
                                        borderRight: "1px solid #000000",
                                        width: "28%",
                                        padding: "12px",
                                        fontWeight: "bold",
                                        textTransform: "uppercase",
                                        fontSize: "12px",
                                        color: "#000000"
                                    }}
                                >
                                    Entité :
                                </td>
                                <td
                                    colSpan={2}
                                    style={{
                                        borderBottom: "1px solid #000000",
                                        padding: "12px",
                                        fontWeight: "bold",
                                        textTransform: "uppercase",
                                        fontSize: "12px",
                                        color: "#000000"
                                    }}
                                >
                                    {rapport.entiteNom}
                                </td>
                            </tr>

                            {/* Ligne Semaine */}
                            <tr style={{ backgroundColor: "#E2D1F9" }}>
                                <td
                                    style={{
                                        borderBottom: "2px solid #000000",
                                        borderRight: "1px solid #000000",
                                        padding: "12px",
                                        fontWeight: "bold",
                                        textTransform: "uppercase",
                                        fontSize: "12px",
                                        color: "#000000"
                                    }}
                                >
                                    Semaine du
                                </td>
                                <td
                                    colSpan={2}
                                    style={{
                                        borderBottom: "2px solid #000000",
                                        padding: "12px",
                                        fontWeight: "bold",
                                        textTransform: "uppercase",
                                        fontSize: "12px",
                                        color: "#000000"
                                    }}
                                >
                                    {formatDate(rapport.dateDebut)} AU {formatDate(rapport.dateFin)}
                                </td>
                            </tr>

                            {/* En-têtes colonnes */}
                            <tr
                                style={{ backgroundColor: "#BDE3FF", textAlign: "center", fontWeight: "bold", textTransform: "uppercase", fontSize: "11px", letterSpacing: "0.05em", color: "#000000" }}
                            >
                                <td
                                    style={{
                                        borderBottom: "2px solid #000000", // Séparation majeure
                                        borderRight: "1px solid #000000",
                                        width: "33.33%",
                                        padding: "12px"
                                    }}
                                >
                                    Activités
                                </td>
                                <td
                                    style={{
                                        borderBottom: "2px solid #000000", // Séparation majeure
                                        borderRight: "1px solid #000000",
                                        width: "33.33%",
                                        padding: "12px"
                                    }}
                                >
                                    Effets
                                </td>
                                <td
                                    style={{
                                        borderBottom: "2px solid #000000", // Séparation majeure
                                        width: "33.33%",
                                        padding: "12px"
                                    }}
                                >
                                    Impacts
                                </td>
                            </tr>

                            {/* Lignes de données */}
                            {rapport.lignes.map((ligne, index) => (
                                <tr
                                    key={index}
                                    style={{ breakInside: "avoid", pageBreakInside: "avoid" }}
                                >
                                    <td
                                        style={{
                                            borderBottom: index === rapport.lignes.length - 1 && rapport.lignes.length >= 3 ? "none" : "1px solid #000000",
                                            borderRight: "1px solid #000000",
                                            minHeight: "40px",
                                            verticalAlign: "top",
                                            padding: "12px",
                                            color: "#000000"
                                        }}
                                    >
                                        {renderBulletList(ligne.activites)}
                                    </td>
                                    <td
                                        style={{
                                            borderBottom: index === rapport.lignes.length - 1 && rapport.lignes.length >= 3 ? "none" : "1px solid #000000",
                                            borderRight: "1px solid #000000",
                                            minHeight: "40px",
                                            verticalAlign: "top",
                                            padding: "12px",
                                            color: "#000000"
                                        }}
                                    >
                                        {renderBulletList(ligne.effets)}
                                    </td>
                                    <td
                                        style={{
                                            borderBottom: index === rapport.lignes.length - 1 && rapport.lignes.length >= 3 ? "none" : "1px solid #000000",
                                            minHeight: "40px",
                                            verticalAlign: "top",
                                            padding: "12px",
                                            color: "#000000"
                                        }}
                                    >
                                        {renderBulletList(ligne.impacts)}
                                    </td>
                                </tr>
                            ))}

                            {/* Lignes vides de remplissage (min 3 lignes visible) */}
                            {rapport.lignes.length < 3 &&
                                Array.from({ length: 3 - rapport.lignes.length }).map((_, index) => (
                                    <tr key={`empty-${index}`}>
                                        <td
                                            style={{
                                                borderRight: "1px solid #000000",
                                                borderBottom: index === (3 - rapport.lignes.length) - 1 ? "none" : "1px solid #000000",
                                                height: "48px",
                                                verticalAlign: "top",
                                                padding: "12px"
                                            }}
                                        />
                                        <td
                                            style={{
                                                borderRight: "1px solid #000000",
                                                borderBottom: index === (3 - rapport.lignes.length) - 1 ? "none" : "1px solid #000000",
                                                height: "48px",
                                                verticalAlign: "top",
                                                padding: "12px"
                                            }}
                                        />
                                        <td
                                            style={{
                                                borderBottom: index === (3 - rapport.lignes.length) - 1 ? "none" : "1px solid #000000",
                                                height: "48px",
                                                verticalAlign: "top",
                                                padding: "12px"
                                            }}
                                        />
                                    </tr>
                                ))}
                        </tbody>
                    </table>

                    {/* ======= SIGNATURES ======= */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: "48px" }}>
                        <div style={{ textAlign: "center", fontSize: "11px" }}>
                            <p style={{ fontWeight: "bold", textTransform: "uppercase", color: "#000000" }}>L&apos;Agent</p>
                            <div style={{ height: "48px" }} />
                            <p style={{ borderTop: "2px solid #000000", paddingTop: "4px", width: "160px", marginLeft: "auto", marginRight: "auto" }} />
                        </div>
                        <div style={{ textAlign: "center", fontSize: "11px" }}>
                            <p style={{ fontWeight: "bold", textTransform: "uppercase", color: "#000000" }}>Le Directeur</p>
                            <div style={{ height: "48px" }} />
                            <p style={{ borderTop: "2px solid #000000", paddingTop: "4px", width: "160px", marginLeft: "auto", marginRight: "auto" }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
