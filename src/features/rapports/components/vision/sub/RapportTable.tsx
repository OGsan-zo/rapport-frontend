"use client";

import React from "react";
import { ApiRapport, ApiActivite, BaseNom } from "../../../types";

interface RapportTableProps {
    rapport: ApiRapport;
    isPdf?: boolean; // Nouvel argument optionnel
}

const formatDateStr = (dateStr?: string) => {
    if (!dateStr) return { day: "", month: "", year: "" };
    const d = new Date(dateStr);
    const day = d.getDate();
    const month = d.toLocaleString("fr-FR", { month: "long" }).toUpperCase();
    const year = d.getFullYear();
    return { day, month, year };
};

const formatPeriode = (rapport: ApiRapport) => {
    const d1 = formatDateStr(rapport.calendrier?.dateDebut);
    const d2 = formatDateStr(rapport.calendrier?.dateFin);

    if (!d1.day || !d2.day) return "N/A";

    if (d1.month === d2.month && d1.year === d2.year) {
        return `DU ${d1.day} AU ${d2.day} ${d2.month} ${d2.year}`;
    } else if (d1.year === d2.year) {
        return `DU ${d1.day} ${d1.month} AU ${d2.day} ${d2.month} ${d2.year}`;
    } else {
        return `DU ${d1.day} ${d1.month} ${d1.year} AU ${d2.day} ${d2.month} ${d2.year}`;
    }
};

export const RapportTable: React.FC<RapportTableProps> = ({ 
    rapport, 
    isPdf = true // Valeur par défaut à true
}) => {
    const entityName = rapport.user?.entite || "DIRECTION DES SYSTÈMES D'INFORMATION ET DES NOUVELLES TECHNOLOGIES (DSINT)";
    const periodeStr = formatPeriode(rapport);

    return (
        <div className="w-full">
            <table
                className="w-full"
                style={{ borderCollapse: "collapse", tableLayout: "fixed", fontSize: "11px", border: "1px solid black" }}
            >
                <thead>
                    {/* Primary Header: Entity Name */}
                    <tr>
                        <th
                            colSpan={3}
                            style={{
                                backgroundColor: "#D1E7B9",
                                border: "1px solid black",
                                padding: "16px",
                                textAlign: "center",
                                fontSize: "13px",
                                fontWeight: "bold",
                                textTransform: "uppercase",
                                color: "#000000"
                            }}
                        >
                            {entityName}
                        </th>
                    </tr>

                    {/* Secondary Header: Period */}
                    <tr>
                        <th
                            colSpan={3}
                            style={{
                                backgroundColor: "#E2D1F9",
                                border: "1px solid black",
                                padding: "10px",
                                textAlign: "center",
                                fontSize: "12px",
                                fontWeight: "bold",
                                textTransform: "uppercase",
                                color: "#4A148C"
                            }}
                        >
                            PERIODE {periodeStr}
                        </th>
                    </tr>

                    {/* Column Header Titles */}
                    <tr style={{ backgroundColor: "#BFDBFE", textAlign: "center", fontWeight: "bold", textTransform: "uppercase" }}>
                        <th style={{ border: "1px solid black", padding: "12px", width: "33.33%", color: "#000000" }}>Activités</th>
                        <th style={{ border: "1px solid black", padding: "12px", width: "33.33%", color: "#000000" }}>Effets</th>
                        <th style={{ border: "1px solid black", padding: "12px", width: "33.33%", color: "#000000" }}>Impacts</th>
                    </tr>
                </thead>
                <tbody>
                    {rapport.activites?.map((act: ApiActivite, idx: number) => (
                        <tr key={idx}>
                            {/* Activities */}
                            <td
                                style={{
                                    border: "1px solid black",
                                    padding: "12px",
                                    verticalAlign: "top",
                                    textAlign: "justify",
                                    lineHeight: "1.6",
                                    fontWeight: "bold",
                                    color: "#000000"
                                }}
                            >
                                {act.activite?.name || " "}
                            </td>
                            {/* Effects */}
                            <td style={{ border: "1px solid black", padding: "12px", verticalAlign: "top" }}>
                                {act.effects && act.effects.length > 0 ? (
                                    <ul style={{ margin: 0, padding: 0, listStyleType: "none" }}>
                                        {act.effects.map((e: BaseNom, i: number) => (
                                            <li key={i} style={{ display: "flex", gap: "8px", marginBottom: "6px" }}>
                                                {/* On affiche le point seulement si isPdf est true */}
                                                {isPdf && <span style={{ color: "#000000", fontWeight: "bold" }}>•</span>}
                                                <span style={{ textAlign: "justify", color: "#000000" }}>{e.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span style={{ color: "#666666", fontStyle: "italic", fontSize: "10px" }}> </span>
                                )}
                            </td>
                            {/* Impacts */}
                            <td style={{ border: "1px solid black", padding: "12px", verticalAlign: "top" }}>
                                {act.impacts && act.impacts.length > 0 ? (
                                    <ul style={{ margin: 0, padding: 0, listStyleType: "none" }}>
                                        {act.impacts.map((imp: BaseNom, i: number) => (
                                            <li key={i} style={{ display: "flex", gap: "8px", marginBottom: "6px" }}>
                                                {/* On affiche le point seulement si isPdf est true */}
                                                {isPdf && <span style={{ color: "#000000", fontWeight: "bold" }}>•</span>}
                                                <span style={{ textAlign: "justify", color: "#000000" }}>{imp.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span style={{ color: "#666666", fontStyle: "italic", fontSize: "10px" }}> </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};