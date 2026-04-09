(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/hooks/useFetchAuth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFetchAuth",
    ()=>useFetchAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use client"; // 👈 Indispensable pour utiliser useRouter dans Next.js App Router
function useFetchAuth() {
    const login = ("TURBOPACK compile-time value", "/login") || '/login';
    const fetchWithAuth = async (url, options = {})=>{
        const response = await fetch(url, options);
        if (response.status === 401 || response.status === 403) {
            if ("TURBOPACK compile-time truthy", 1) {
                await fetch("/api/auth/logout", {
                    method: "POST"
                });
                window.location.href = login;
            }
            throw new Error("Non autorisé, redirection en cours...");
        }
        return response;
    };
    return fetchWithAuth;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/rapports/services/rechercheService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rechercheService",
    ()=>rechercheService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFetchAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useFetchAuth.ts [app-client] (ecmascript)");
;
/**
 * Convertit une date du format HTML (YYYY-MM-DD) au format attendu par l'API (DD-MM-YYYY).
 * Ex: "2026-01-04" → "04-01-2026"
 */ const toApiDateFormat = (htmlDate)=>{
    if (!htmlDate) return htmlDate;
    const [year, month, day] = htmlDate.split("-");
    return `${day}-${month}-${year}`;
};
const fetchAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFetchAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFetchAuth"])();
const rechercheService = {
    /**
     * Recherche les rapports à une date spécifique.
     * @param date Date au format YYYY-MM-DD (venant de l'input HTML)
     */ searchRapportsByDate: async (date)=>{
        const formattedDate = toApiDateFormat(date);
        try {
            const response = await fetchAuth(`/api/rapports/recherche?date=${encodeURIComponent(formattedDate)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                cache: "no-store"
            });
            if (!response.ok) {
                const errorData = await response.json().catch(()=>({}));
                // console.warn(`API non disponible (${response.status}). Simulation Mock :`, errorData.message || "");
                throw new Error(errorData.message || errorData.error || "Impossible de charger les rapports");
            }
            const responseData = await response.json();
            // Extrait le champ "data" de la réponse { status: "success", data: [...] }
            return responseData.data || [];
        } catch (error) {
            // console.error("Erreur lors de la recherche de rapports:", error);
            throw error;
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/rapports/services/pdfService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pdfService",
    ()=>pdfService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf/dist/jspdf.es.min.js [app-client] (ecmascript)");
;
const pdfService = {
    /**
     * Génère un Blob PDF performant avec jsPDF.
     * Cette méthode offre un meilleur rendu du texte et un poids de fichier optimisé.
     */ async generatePdfBlob (element, filename, isLandscape = false) {
        const orientation = isLandscape ? 'l' : 'p';
        const doc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsPDF"]({
            orientation: orientation,
            unit: 'mm',
            format: 'a4',
            compress: true
        });
        const pageWidth = isLandscape ? 297 : 210;
        const margin = 10;
        const contentWidth = pageWidth - margin * 2;
        // 1. On augmente significativement la windowWidth pour que le texte respire
        // Pour un tableau complexe, 1600px est une bonne base.
        const virtualWidth = 750;
        return new Promise((resolve, reject)=>{
            doc.html(element, {
                callback: (doc)=>{
                    const pageCount = doc.getNumberOfPages();
                    // 1. Calculer la hauteur d'une page A4 utile (en mm)
                    const pageHeight = isLandscape ? 210 : 297;
                    // 2. Calculer la hauteur réelle du contenu convertie en mm
                    // Formule : (Pixels de l'élément * Largeur PDF) / Largeur virtuelle
                    const contentHeightMm = element.offsetHeight * contentWidth / virtualWidth;
                    // 3. Si la hauteur totale du contenu est inférieure à l'espace des pages précédentes
                    // on supprime la dernière page (on ajoute une marge de sécurité de 5mm)
                    const totalAvailableHeightBeforeLastPage = (pageCount - 1) * (pageHeight - margin);
                    if (pageCount > 1 && contentHeightMm <= totalAvailableHeightBeforeLastPage) {
                        doc.deletePage(pageCount);
                    }
                    resolve(doc.output('blob'));
                },
                x: margin,
                y: margin,
                width: contentWidth,
                windowWidth: virtualWidth,
                html2canvas: {
                    // 2. SUPPRIMER LE SCALE. jsPDF le calcule tout seul 
                    // via le rapport entre 'width' (277mm) et 'windowWidth' (1600px).
                    useCORS: true,
                    logging: false,
                    backgroundColor: "#ffffff",
                    letterRendering: true
                },
                autoPaging: 'text'
            });
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/rapports/hooks/usePdfExport.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePdfExport",
    ()=>usePdfExport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$services$2f$pdfService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/rapports/services/pdfService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const usePdfExport = ()=>{
    _s();
    const [isGenerating, setIsGenerating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    /**
     * Capture un élément HTML et l'ouvre dans un nouvel onglet en tant que PDF.
     */ const exportToPdf = async (elementId, filename = "Rapport_MESUPRES.pdf", isLandscape = false)=>{
        const element = document.getElementById(elementId);
        if (!element) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Élément avec l'ID \"" + elementId + "\" non trouvé.");
            return;
        }
        setIsGenerating(true);
        try {
            const blob = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$services$2f$pdfService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pdfService"].generatePdfBlob(element, filename, isLandscape);
            const url = URL.createObjectURL(blob);
            // Ouvrir dans un nouvel onglet
            const newWindow = window.open(url, "_blank");
            // Si le bloqueur de fenêtres surgissantes est actif
            if (!newWindow) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Veuillez autoriser les fenêtres surgissantes pour visualiser le PDF.");
            }
            // Nettoyage de l'URL après un délai (pour laisser le temps au navigateur de charger)
            setTimeout(()=>URL.revokeObjectURL(url), 10000);
        } catch (error) {
            // console.error("Erreur lors de la génération du PDF:", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error.message || "Erreur lors de la génération du PDF.");
        } finally{
            setIsGenerating(false);
        }
    };
    return {
        exportToPdf,
        isGenerating
    };
};
_s(usePdfExport, "UwcDqC7CmUDXsdKWKaG4uXzzAaQ=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/rapports/components/vision/sub/RapportHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RapportHeader",
    ()=>RapportHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/constants.ts [app-client] (ecmascript)");
"use client";
;
;
const RapportHeader = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full flex flex-col items-center text-center mt-0 pt-0 mb-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IMAGES"].LOGO_REPOBLIKA,
                alt: "Emblème Repoblikan'i Madagasikara",
                crossOrigin: "anonymous",
                className: "w-32 h-auto object-contain"
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/vision/sub/RapportHeader.tsx",
                lineNumber: 13,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-16 border-t border-black my-1"
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/vision/sub/RapportHeader.tsx",
                lineNumber: 21,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[10px] font-black uppercase leading-snug tracking-wide",
                style: {
                    color: "#0f172a"
                },
                children: "Ministère de l'Enseignement Supérieur et de la"
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/vision/sub/RapportHeader.tsx",
                lineNumber: 24,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[10px] font-black uppercase leading-snug tracking-wide",
                style: {
                    color: "#0f172a"
                },
                children: "Recherche Scientifique"
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/vision/sub/RapportHeader.tsx",
                lineNumber: 30,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-16 border-t border-black mt-2 mb-0"
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/vision/sub/RapportHeader.tsx",
                lineNumber: 38,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/rapports/components/vision/sub/RapportHeader.tsx",
        lineNumber: 10,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = RapportHeader;
var _c;
__turbopack_context__.k.register(_c, "RapportHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/rapports/components/vision/sub/RapportTable.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RapportTable",
    ()=>RapportTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const formatDateStr = (dateStr)=>{
    if (!dateStr) return {
        day: "",
        month: "",
        year: ""
    };
    const d = new Date(dateStr);
    const day = d.getDate();
    const month = d.toLocaleString("fr-FR", {
        month: "long"
    }).toUpperCase();
    const year = d.getFullYear();
    return {
        day,
        month,
        year
    };
};
const formatPeriode = (rapport)=>{
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
const RapportTable = ({ rapport, isPdf = true })=>{
    const entityName = rapport.user?.entite || "DIRECTION DES SYSTÈMES D'INFORMATION ET DES NOUVELLES TECHNOLOGIES (DSINT)";
    const periodeStr = formatPeriode(rapport);
    const isTrimestriel = rapport?.calendrier?.typeCalendrier?.id === 3 || rapport?.calendrier?.typeCalendrier?.id === 4;
    const idTypeCalendrier = rapport?.calendrier?.typeCalendrier?.id;
    const headers = idTypeCalendrier === 3 ? [
        "Objectif spécifique",
        "Logique d'intervention",
        "Activité PTA",
        "Produit",
        "Cible",
        "Prévision Trim.",
        "Réalisation Trim.",
        "Taux de réalisation",
        "Observation"
    ] : idTypeCalendrier === 4 ? [
        "Objectif spécifique",
        "Logique d'intervention",
        "Activité PTA",
        "Produit",
        "Cible",
        "Prévision annuel",
        "Réalisation annuel",
        "Taux de réalisation",
        "Observation"
    ] : [
        "Titre de l'activité",
        "Effets",
        "Impacts"
    ];
    const colSpanCount = headers.length;
    // Réduction de la taille pour forcer l'ajustement sur PDF
    const tableFontSize = isTrimestriel ? "8px" : "11px";
    const cellPadding = isTrimestriel ? "4px 6px" : "12px";
    // Fonction utilitaire pour le rendu des cellules contenant des listes
    const renderListCell = (items)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
            style: {
                border: "1px solid black",
                padding: cellPadding,
                verticalAlign: "top",
                wordBreak: "break-word",
                overflowWrap: "break-word"
            },
            children: items && items.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                style: {
                    margin: 0,
                    padding: 0,
                    listStyleType: "none"
                },
                children: items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        style: {
                            display: "flex",
                            gap: "4px",
                            marginBottom: "4px"
                        },
                        children: [
                            isPdf && !isTrimestriel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: "#000000",
                                    fontWeight: "bold"
                                },
                                children: "•"
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                                lineNumber: 82,
                                columnNumber: 57
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    textAlign: "justify",
                                    color: "#000000"
                                },
                                children: item.name
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                                lineNumber: 83,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, i, true, {
                        fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                        lineNumber: 81,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                lineNumber: 79,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    color: "#666666",
                    fontStyle: "italic",
                    fontSize: tableFontSize
                },
                children: " "
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                lineNumber: 88,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
            lineNumber: 71,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    // Fonction spéciale pour afficher le taux avec le symbole %
    const renderTauxCell = (items)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
            style: {
                border: "1px solid black",
                padding: cellPadding,
                verticalAlign: "top",
                wordBreak: "break-word",
                overflowWrap: "break-word"
            },
            children: items && items.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                style: {
                    margin: 0,
                    padding: 0,
                    listStyleType: "none"
                },
                children: items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        style: {
                            display: "flex",
                            gap: "4px",
                            marginBottom: "4px"
                        },
                        children: [
                            isPdf && !isTrimestriel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: "#000000",
                                    fontWeight: "bold"
                                },
                                children: "•"
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                                lineNumber: 106,
                                columnNumber: 57
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    textAlign: "justify",
                                    color: "#000000"
                                },
                                children: item.name
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                                lineNumber: 107,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0)),
                            i === items.length - 1 && !isNaN(parseFloat(item.name)) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: "#000000",
                                    fontWeight: "bold"
                                },
                                children: " %"
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                                lineNumber: 108,
                                columnNumber: 89
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, i, true, {
                        fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                        lineNumber: 105,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                lineNumber: 103,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    color: "#666666",
                    fontStyle: "italic",
                    fontSize: tableFontSize
                },
                children: " "
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                lineNumber: 113,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
            lineNumber: 95,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full",
        style: {
            maxHeight: isTrimestriel && isPdf ? "100%" : "100%",
            overflow: "hidden"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: "w-full bg-white",
            style: {
                borderCollapse: "collapse",
                tableLayout: "fixed",
                fontSize: tableFontSize,
                border: "1px solid black",
                width: "100%",
                maxWidth: "100%",
                height: "auto",
                maxHeight: "100%",
                wordSpacing: "0.5px",
                letterSpacing: "0.2px" // Espacement entre les lettres
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                colSpan: colSpanCount,
                                style: {
                                    backgroundColor: "#D1E7B9",
                                    border: "1px solid black",
                                    padding: "12px",
                                    textAlign: "center",
                                    fontSize: isTrimestriel ? "11px" : "13px",
                                    fontWeight: "bold",
                                    textTransform: "uppercase",
                                    color: "#000000"
                                },
                                children: entityName
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                                lineNumber: 140,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                            lineNumber: 139,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                colSpan: colSpanCount,
                                style: {
                                    backgroundColor: "#E2D1F9",
                                    border: "1px solid black",
                                    padding: "8px",
                                    textAlign: "center",
                                    fontSize: isTrimestriel ? "10px" : "12px",
                                    fontWeight: "bold",
                                    textTransform: "uppercase",
                                    color: "#4A148C"
                                },
                                children: [
                                    "PERIODE ",
                                    periodeStr
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                                lineNumber: 158,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                            lineNumber: 157,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            style: {
                                backgroundColor: "#BFDBFE",
                                textAlign: "center",
                                fontWeight: "bold",
                                textTransform: "uppercase"
                            },
                            children: headers.map((header, idx)=>{
                                // Distribution des largeurs de colonnes
                                let colWidth = `${100 / colSpanCount}%`;
                                if (isTrimestriel) {
                                    // On donne 16% à la première, et les 8 autres se partagent les 84% restants (10.5% chacune)
                                    colWidth = idx === 0 ? "16%" : "10.5%";
                                }
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    style: {
                                        border: "1px solid black",
                                        padding: cellPadding,
                                        width: colWidth,
                                        color: "#000000",
                                        wordBreak: "break-word"
                                    },
                                    children: header
                                }, idx, false, {
                                    fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                                    lineNumber: 185,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0));
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                            lineNumber: 175,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                    lineNumber: 138,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                    children: rapport.activites?.map((actData, idx)=>{
                        const act = actData;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    style: {
                                        border: "1px solid black",
                                        padding: cellPadding,
                                        verticalAlign: "top",
                                        textAlign: "justify",
                                        lineHeight: "1.4",
                                        fontWeight: "bold",
                                        color: "#000000",
                                        wordBreak: "break-word",
                                        overflowWrap: "break-word"
                                    },
                                    children: act.activite?.name || " "
                                }, void 0, false, {
                                    fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                                    lineNumber: 207,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)),
                                renderListCell(act.effects),
                                renderListCell(act.impacts),
                                isTrimestriel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        renderListCell(act.produits),
                                        renderListCell(act.cibles),
                                        renderListCell(act.previsions),
                                        renderListCell(act.realisations),
                                        renderTauxCell(act.taux),
                                        renderListCell(act.observations)
                                    ]
                                }, void 0, true)
                            ]
                        }, idx, true, {
                            fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                            lineNumber: 206,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0));
                    })
                }, void 0, false, {
                    fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                    lineNumber: 202,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
            lineNumber: 123,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
        lineNumber: 119,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = RapportTable;
var _c;
__turbopack_context__.k.register(_c, "RapportTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/rapports/components/vision/RapportView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RapportView",
    ()=>RapportView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$vision$2f$sub$2f$RapportHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/rapports/components/vision/sub/RapportHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$vision$2f$sub$2f$RapportTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/rapports/components/vision/sub/RapportTable.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
const RapportView = ({ data, isPrintMode = false, isPdf = true, isLandscape = false })=>{
    if (!data || data.length === 0) return null;
    const pageWidth = isLandscape ? "297mm" : "210mm";
    const pageHeight = isLandscape ? "210mm" : "297mm";
    // Appliquer un scale pour le mode paysage afin d'éviter les pages multiples
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full flex justify-center",
        style: {
            paddingTop: isPrintMode ? "0" : "64px",
            paddingBottom: isPrintMode ? "0" : "64px",
            backgroundColor: isPrintMode ? "#ffffff" : "#f8fafc"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            id: "unified-report-content",
            style: {
                width: pageWidth,
                minHeight: pageHeight,
                padding: "15mm 12mm",
                boxSizing: "border-box",
                color: "#000000",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "40px",
                // Use standard shadow to avoid modern color function issues
                boxShadow: isPrintMode ? "none" : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                border: isPrintMode ? "none" : "1px solid #e2e8f0"
            },
            className: "jsx-f0702ee7f6251b79" + " " + "bg-white font-sans text-[12px]",
            children: [
                isPdf && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$vision$2f$sub$2f$RapportHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RapportHeader"], {}, void 0, false, {
                    fileName: "[project]/src/features/rapports/components/vision/RapportView.tsx",
                    lineNumber: 57,
                    columnNumber: 27
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-f0702ee7f6251b79" + " " + "flex flex-col gap-10",
                    children: data.map((rapport, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            "data-report-section": true,
                            className: "jsx-f0702ee7f6251b79" + " " + "w-full",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$vision$2f$sub$2f$RapportTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RapportTable"], {
                                rapport: rapport,
                                isPdf: isPdf
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/vision/RapportView.tsx",
                                lineNumber: 63,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        }, rapport.id || index, false, {
                            fileName: "[project]/src/features/rapports/components/vision/RapportView.tsx",
                            lineNumber: 62,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)))
                }, void 0, false, {
                    fileName: "[project]/src/features/rapports/components/vision/RapportView.tsx",
                    lineNumber: 60,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    id: "f0702ee7f6251b79",
                    children: "@media print{body{background:#fff!important;margin:0!important;padding:0!important}#unified-report-content{box-shadow:none!important;border:none!important;width:100%!important;margin:0!important;padding:10mm!important}tr{break-inside:avoid}}"
                }, void 0, false, void 0, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/rapports/components/vision/RapportView.tsx",
            lineNumber: 38,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/features/rapports/components/vision/RapportView.tsx",
        lineNumber: 30,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = RapportView;
var _c;
__turbopack_context__.k.register(_c, "RapportView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LigneActiviteEditor",
    ()=>LigneActiviteEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
const LigneActiviteEditor = ({ control, register, setValue, index, remove, canRemove, isTrimestriel = false, objectifSpecifiques = [], logiqueInterventions = [], gridLayout })=>{
    _s();
    // --- Hooks pour tous les champs ---
    const { fields: effectsFields, append: appendEffect, remove: removeEffect } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldArray"])({
        control,
        name: `lignes.${index}.effects`
    });
    const { fields: impactsFields, append: appendImpact, remove: removeImpact } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldArray"])({
        control,
        name: `lignes.${index}.impacts`
    });
    const { fields: produitsFields, append: appendProduit, remove: removeProduit } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldArray"])({
        control,
        name: `lignes.${index}.produits`
    });
    const { fields: ciblesFields, append: appendCible, remove: removeCible } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldArray"])({
        control,
        name: `lignes.${index}.cibles`
    });
    const { fields: previsionsFields, append: appendPrevision, remove: removePrevision } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldArray"])({
        control,
        name: `lignes.${index}.previsions`
    });
    const { fields: realisationsFields, append: appendRealisation, remove: removeRealisation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldArray"])({
        control,
        name: `lignes.${index}.realisations`
    });
    const { fields: tauxFields, append: appendTaux } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldArray"])({
        control,
        name: `lignes.${index}.taux`
    });
    const { fields: observationsFields, append: appendObservation, remove: removeObservation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldArray"])({
        control,
        name: `lignes.${index}.observations`
    });
    // Sécurité pour s'assurer qu'il y a toujours au moins un champ vide par colonne
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LigneActiviteEditor.useEffect": ()=>{
            if (effectsFields.length === 0) appendEffect({
                value: ""
            });
            if (impactsFields.length === 0) appendImpact({
                value: ""
            });
            if (isTrimestriel) {
                if (produitsFields.length === 0) appendProduit({
                    value: ""
                });
                if (ciblesFields.length === 0) appendCible({
                    value: ""
                });
                if (previsionsFields.length === 0) appendPrevision({
                    value: ""
                });
                if (realisationsFields.length === 0) appendRealisation({
                    value: ""
                });
                if (tauxFields.length === 0) appendTaux({
                    value: ""
                });
                if (observationsFields.length === 0) appendObservation({
                    value: ""
                });
            }
        }
    }["LigneActiviteEditor.useEffect"], [
        effectsFields.length,
        impactsFields.length,
        produitsFields.length,
        ciblesFields.length,
        previsionsFields.length,
        realisationsFields.length,
        tauxFields.length,
        observationsFields.length,
        isTrimestriel,
        appendEffect,
        appendImpact,
        appendProduit,
        appendCible,
        appendPrevision,
        appendRealisation,
        appendTaux,
        appendObservation
    ]);
    // --- Calcul automatique du taux (comme dans LigneActivite) ---
    const previsionsWatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control,
        name: `lignes.${index}.previsions`
    });
    const realisationsWatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control,
        name: `lignes.${index}.realisations`
    });
    const calculerTaux = (i)=>{
        const prev = parseFloat(previsionsWatch?.[i]?.value) || 0;
        const real = parseFloat(realisationsWatch?.[i]?.value) || 0;
        if (prev <= 0) return "0.00";
        if (real === 0) return "0.00";
        return (real / prev * 100).toFixed(2);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LigneActiviteEditor.useEffect": ()=>{
            tauxFields.forEach({
                "LigneActiviteEditor.useEffect": (_, i)=>{
                    setValue(`lignes.${index}.taux.${i}.value`, calculerTaux(i));
                }
            }["LigneActiviteEditor.useEffect"]);
        }
    }["LigneActiviteEditor.useEffect"], [
        previsionsWatch,
        realisationsWatch
    ]);
    // --- Grille dynamique synchronisée avec le parent ---
    // --- Classes CSS communes pour éviter la répétition ---
    const colContainerClass = "border-l border-slate-100 p-3 space-y-2 flex flex-col h-full";
    const itemBoxClass = "flex items-start gap-2 bg-white p-2 border border-slate-200 rounded-lg shadow-sm relative";
    const textAreaClass = "w-full text-sm text-slate-600 bg-transparent border-none focus:ring-0 resize-none min-h-[80px] p-0 placeholder:text-slate-300";
    const selectClass = "w-full text-sm text-slate-600 bg-transparent border-none focus:ring-0 p-1 cursor-pointer";
    const addBtnClass = "w-full py-2 mt-auto border border-dashed border-slate-300 rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all";
    const closeBtnClass = "mt-1 text-slate-300 hover:text-red-500 transition-colors";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `grid ${gridLayout} group/row transition-colors hover:bg-slate-50/30 items-stretch`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center text-xs font-black text-slate-300 bg-slate-50/20",
                children: String(index + 1).padStart(2, '0')
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: colContainerClass,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: itemBoxClass,
                    children: isTrimestriel ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        ...register(`lignes.${index}.titre`),
                        className: `${selectClass} font-bold text-slate-800`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Sélectionner un objectif..."
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                lineNumber: 106,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            objectifSpecifiques.map((obj)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: obj.nom,
                                    children: obj.nom
                                }, obj.id, false, {
                                    fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                    lineNumber: 108,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                        lineNumber: 102,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        ...register(`lignes.${index}.titre`),
                        className: `${textAreaClass} font-bold text-slate-800 h-full`,
                        placeholder: "Nom de l'activité..."
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                        lineNumber: 112,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                    lineNumber: 100,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: colContainerClass,
                children: [
                    effectsFields.map((field, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: itemBoxClass,
                            children: [
                                isTrimestriel ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    ...register(`lignes.${index}.effects.${i}.value`),
                                    className: selectClass,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "",
                                            children: "Sélectionner une logique d'intervention..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                            lineNumber: 130,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        logiqueInterventions.map((logique)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: logique.nom,
                                                children: logique.nom
                                            }, logique.id, false, {
                                                fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                                lineNumber: 132,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                    lineNumber: 126,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    ...register(`lignes.${index}.effects.${i}.value`),
                                    className: textAreaClass,
                                    placeholder: `Effet ${i + 1}...`
                                }, void 0, false, {
                                    fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                    lineNumber: 136,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                effectsFields.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>removeEffect(i),
                                    className: closeBtnClass,
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                    lineNumber: 143,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, field.id, true, {
                            fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                            lineNumber: 124,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))),
                    !isTrimestriel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>appendEffect({
                                value: ""
                            }),
                        className: addBtnClass,
                        children: "+ effet"
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                        lineNumber: 148,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: colContainerClass,
                children: impactsFields.map((field, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: itemBoxClass,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                ...register(`lignes.${index}.impacts.${i}.value`),
                                className: textAreaClass,
                                placeholder: isTrimestriel ? `Activité PTA ${i + 1}...` : `Impact ${i + 1}...`
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                lineNumber: 158,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            impactsFields.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>removeImpact(i),
                                className: closeBtnClass,
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                lineNumber: 164,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, field.id, true, {
                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                        lineNumber: 157,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                lineNumber: 155,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isTrimestriel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: colContainerClass,
                        children: produitsFields.map((field, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: itemBoxClass,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        ...register(`lignes.${index}.produits.${i}.value`),
                                        className: textAreaClass,
                                        placeholder: `Produit ${i + 1}...`,
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                        lineNumber: 180,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    produitsFields.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>removeProduit(i),
                                        className: closeBtnClass,
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                        lineNumber: 181,
                                        columnNumber: 47
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, field.id, true, {
                                fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                lineNumber: 179,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                        lineNumber: 177,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: colContainerClass,
                        children: ciblesFields.map((field, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: itemBoxClass,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        ...register(`lignes.${index}.cibles.${i}.value`),
                                        className: textAreaClass,
                                        placeholder: `Cible ${i + 1}...`,
                                        min: "1"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                        lineNumber: 191,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    ciblesFields.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>removeCible(i),
                                        className: closeBtnClass,
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                        lineNumber: 192,
                                        columnNumber: 45
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, field.id, true, {
                                fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                lineNumber: 190,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                        lineNumber: 188,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: colContainerClass,
                        children: [
                            previsionsFields.map((field, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: itemBoxClass,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            ...register(`lignes.${index}.previsions.${i}.value`),
                                            className: textAreaClass,
                                            placeholder: `Prévision ${i + 1}...`
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                            lineNumber: 202,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        previsionsFields.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>removePrevision(i),
                                            className: closeBtnClass,
                                            children: "✕"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                            lineNumber: 203,
                                            columnNumber: 49
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, field.id, true, {
                                    fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                    lineNumber: 201,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>appendPrevision({
                                        value: ""
                                    }),
                                className: addBtnClass,
                                children: "+ prévision"
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                lineNumber: 206,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                        lineNumber: 199,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: colContainerClass,
                        children: [
                            realisationsFields.map((field, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: itemBoxClass,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            ...register(`lignes.${index}.realisations.${i}.value`),
                                            className: textAreaClass,
                                            placeholder: `Réalisation ${i + 1}...`
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                            lineNumber: 213,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        realisationsFields.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>removeRealisation(i),
                                            className: closeBtnClass,
                                            children: "✕"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                            lineNumber: 214,
                                            columnNumber: 51
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, field.id, true, {
                                    fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                    lineNumber: 212,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>appendRealisation({
                                        value: ""
                                    }),
                                className: addBtnClass,
                                children: "+ réalisation"
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                lineNumber: 217,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                        lineNumber: 210,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: colContainerClass,
                        children: tauxFields.map((field, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `${itemBoxClass} bg-slate-50 border-blue-100 relative`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        ...register(`lignes.${index}.taux.${i}.value`),
                                        value: calculerTaux(i),
                                        readOnly: true,
                                        className: "w-full text-sm font-bold text-blue-600 bg-transparent border-none focus:ring-0 p-0 pointer-events-none"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                        lineNumber: 224,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-bold text-blue-400 absolute right-2 top-2",
                                        children: "%"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                        lineNumber: 231,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, field.id, true, {
                                fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                lineNumber: 223,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                        lineNumber: 221,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: colContainerClass,
                        children: [
                            observationsFields.map((field, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: itemBoxClass,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            ...register(`lignes.${index}.observations.${i}.value`),
                                            className: textAreaClass,
                                            placeholder: `Observation ${i + 1}...`
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                            lineNumber: 240,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        observationsFields.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>removeObservation(i),
                                            className: closeBtnClass,
                                            children: "✕"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                            lineNumber: 241,
                                            columnNumber: 51
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, field.id, true, {
                                    fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                    lineNumber: 239,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>appendObservation({
                                        value: ""
                                    }),
                                className: addBtnClass,
                                children: "+ observation"
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                lineNumber: 244,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                        lineNumber: 237,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-l border-slate-100 flex items-center justify-center p-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>remove(index),
                    disabled: !canRemove,
                    className: "p-2.5 rounded-full transition-all text-red-300 bg-red-50 opacity-100 md:text-slate-300 md:bg-transparent md:opacity-0 md:hover:text-red-500 md:hover:bg-red-50 md:group-hover/row:opacity-100 disabled:invisible",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-4 h-4",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "2.5",
                            d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        }, void 0, false, {
                            fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                            lineNumber: 258,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                        lineNumber: 257,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                    lineNumber: 251,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                lineNumber: 250,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
        lineNumber: 91,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(LigneActiviteEditor, "je4cetstsJx0ebW8X4kObCgFj1c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldArray"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldArray"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldArray"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldArray"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldArray"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldArray"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldArray"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldArray"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"]
    ];
});
_c = LigneActiviteEditor;
var _c;
__turbopack_context__.k.register(_c, "LigneActiviteEditor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/rapports/services/rapportService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rapportService",
    ()=>rapportService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFetchAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useFetchAuth.ts [app-client] (ecmascript)");
;
const fetchAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFetchAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFetchAuth"])();
const rapportService = {
    /**
     * Récupère les rapports de l'utilisateur connecté.
     */ getRapports: async ()=>{
        try {
            // L'appel se fait sur la route interne de Next.js
            const response = await fetchAuth("/api/rapports", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                // Désactiver le cache si vous voulez des données en temps réel
                cache: "no-store"
            });
            if (!response.ok) {
                const errorData = await response.json().catch(()=>({}));
                const message = errorData.message || errorData.error || `Erreur serveur: ${response.status}`;
                throw new Error(message);
            }
            const responseData = await response.json();
            const data = responseData.data;
            // Tri par date de début décroissante (les plus récents en premier)
            return data;
        } catch (error) {
            throw error;
        }
    },
    getAllRapports: async (idCalendrier)=>{
        if (!idCalendrier || idCalendrier <= 0) throw new Error("ID Calendrier invalide");
        try {
            // L'appel se fait sur la route interne de Next.js
            const response = await fetchAuth(`/api/rapports/calendrier?idCalendrier=${encodeURIComponent(idCalendrier)}`);
            if (!response.ok) {
                const errorData = await response.json().catch(()=>({}));
                const message = errorData.message || errorData.error || `Erreur serveur: ${response.status}`;
                throw new Error(message);
            }
            const responseData = await response.json();
            const data = responseData.data;
            // Tri par date de début décroissante (les plus récents en premier)
            return data;
        } catch (error) {
            throw error;
        }
    },
    /**
     * Enregistre un nouveau rapport avec la structure ApiRapport.
     */ saveRapport: async (rapport)=>{
        try {
            // L'appel se fait sur la route interne de Next.js
            const response = await fetchAuth("/api/rapports", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(rapport),
                // Désactiver le cache si vous voulez des données en temps réel
                cache: "no-store"
            });
            if (!response.ok) {
                const errorData = await response.json().catch(()=>({}));
                const message = errorData.message || errorData.error || `Erreur serveur: ${response.status}`;
                throw new Error(message);
            }
            const responseData = await response.json();
            const data = responseData.data;
            // Tri par date de début décroissante (les plus récents en premier)
            return data;
        } catch (error) {
            throw error;
        }
    },
    updateRapport: async (id, rapport)=>{
        try {
            // L'appel se fait sur la route interne de Next.js
            const response = await fetchAuth(`/api/rapports/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(rapport),
                cache: "no-store" // désactiver le cache si nécessaire
            });
            if (!response.ok) {
                const errorData = await response.json().catch(()=>({}));
                const message = errorData.message || errorData.error || `Erreur serveur: ${response.status}`;
                throw new Error(message);
            }
            const responseData = await response.json();
            const data = responseData.data.data;
            // Ici on peut trier ou traiter les données si nécessaire
            return data;
        } catch (error) {
            throw error;
        }
    },
    changerValidationRapport: async (idCalendrierUtilisateur)=>{
        try {
            // L'appel se fait sur la route interne de Next.js
            const body = {
                id: idCalendrierUtilisateur
            };
            const response = await fetchAuth("/api/rapports/changerValidation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body),
                // Désactiver le cache si vous voulez des données en temps réel
                cache: "no-store"
            });
            if (!response.ok) {
                const errorData = await response.json().catch(()=>({}));
                const message = errorData.message || errorData.error || `Erreur serveur: ${response.status}`;
                throw new Error(message);
            }
            const responseData = await response.json();
            const data = responseData.data;
            // Tri par date de début décroissante (les plus récents en premier)
            return data;
        } catch (error) {
            throw error;
        }
    },
    /**
     * Récupère l'historique des modifications d'un rapport.
     */ getHistorique: async (idUtilisateur, idCalendrier)=>{
        if (!idCalendrier || idCalendrier <= 0) throw new Error("ID Calendrier invalide");
        try {
            const response = await fetchAuth(`/api/rapports/historique?idUtilisateur=${idUtilisateur}&idCalendrier=${idCalendrier}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                cache: "no-store"
            });
            if (!response.ok) {
                const errorData = await response.json().catch(()=>({}));
                const message = errorData.message || errorData.error || `Erreur serveur: ${response.status}`;
                throw new Error(message);
            }
            const responseData = await response.json();
            return responseData.data || [];
        } catch (error) {
            throw error;
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/admin/services/objectifSpecifiqueService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "objectifSpecifiqueService",
    ()=>objectifSpecifiqueService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFetchAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useFetchAuth.ts [app-client] (ecmascript)");
;
const fetchAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFetchAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFetchAuth"])();
const objectifSpecifiqueService = {
    getAll: async ()=>{
        const response = await fetchAuth("/api/rapports/OS", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            cache: "no-store"
        });
        if (!response.ok) {
            const err = await response.json().catch(()=>({}));
            throw new Error(err.message || err.error || `Erreur serveur: ${response.status}`);
        }
        const data = await response.json();
        const items = data.data || data;
        // L'API retourne { name, id }, on mappe vers { nom, id }
        return items.map((item)=>({
                id: item.id,
                nom: item.name
            }));
    },
    create: async (nom)=>{
        const response = await fetchAuth("/api/rapports/OS", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: nom
            })
        });
        if (!response.ok) {
            const err = await response.json().catch(()=>({}));
            throw new Error(err.message || err.error || `Erreur serveur: ${response.status}`);
        }
        const data = await response.json();
        const item = data.data || data;
        return {
            id: item.id,
            nom: item.name
        };
    },
    update: async (id, nom)=>{
        const response = await fetchAuth(`/api/rapports/OS/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: nom
            })
        });
        if (!response.ok) {
            const err = await response.json().catch(()=>({}));
            throw new Error(err.message || err.error || `Erreur serveur: ${response.status}`);
        }
        const data = await response.json();
        const item = data.data || data;
        return {
            id: item.id,
            nom: item.name
        };
    },
    // Pas d'endpoint DELETE dans l'API pour l'instant
    delete: async (_id)=>{}
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RapportTableEditor",
    ()=>RapportTableEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$form$2f$utils$2f$LigneActiviteEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$services$2f$rapportService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/rapports/services/rapportService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$admin$2f$services$2f$objectifSpecifiqueService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/admin/services/objectifSpecifiqueService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const RapportTableEditor = ({ rapport, onSuccess, isSupervision = false })=>{
    _s();
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [objectifSpecifiques, setObjectifSpecifiques] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const isTrimestriel = rapport?.calendrier?.typeCalendrier?.id;
    const isTrim = isTrimestriel === 3 || isTrimestriel === 4;
    const fetchItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RapportTableEditor.useCallback[fetchItems]": async ()=>{
            try {
                const [OS] = await Promise.all([
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$admin$2f$services$2f$objectifSpecifiqueService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["objectifSpecifiqueService"].getAll()
                ]);
                setObjectifSpecifiques(OS);
            } catch  {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Erreur lors du chargement des objectifs spécifiques");
            }
        }
    }["RapportTableEditor.useCallback[fetchItems]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RapportTableEditor.useEffect": ()=>{
            // Ne charger les listes OS/LI qu'une seule fois si mode trimestriel
            if (isTrim && objectifSpecifiques.length === 0) {
                fetchItems();
            }
        }
    }["RapportTableEditor.useEffect"], [
        fetchItems,
        isTrim,
        objectifSpecifiques.length
    ]);
    // 1. DÉTECTION DU TYPE DE CALENDRIER (Ajuste "type" ou "name" selon ton API)
    // 2. DÉFINITION DE LA LIGNE PAR DÉFAUT SELON LE TYPE
    const defaultLine = isTrim ? {
        titre: "",
        effects: [
            {
                value: ""
            }
        ],
        impacts: [
            {
                value: ""
            }
        ],
        produits: [
            {
                value: ""
            }
        ],
        cibles: [
            {
                value: ""
            }
        ],
        previsions: [
            {
                value: ""
            }
        ],
        realisations: [
            {
                value: ""
            }
        ],
        taux: [
            {
                value: ""
            }
        ],
        observations: [
            {
                value: ""
            }
        ]
    } : {
        titre: "",
        effects: [
            {
                value: ""
            }
        ],
        impacts: [
            {
                value: ""
            }
        ]
    };
    // Initialisation du formulaire
    const { register, control, handleSubmit, reset, setValue } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"])({
        defaultValues: {
            lignes: [
                defaultLine
            ]
        }
    });
    const { fields, append, remove } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldArray"])({
        control,
        name: "lignes"
    });
    // 3. REMPLISSAGE AUTOMATIQUE ADAPTÉ AU TRIMESTRIEL
    // Pour le trimestriel, on attend que les listes OS/LI soient chargées avant de reset,
    // sinon les selects n'ont pas encore leurs options et la valeur par défaut ne s'applique pas.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RapportTableEditor.useEffect": ()=>{
            if (!rapport?.activites) return;
            if (isTrim && objectifSpecifiques.length === 0) return;
            const formattedData = rapport.activites.map({
                "RapportTableEditor.useEffect.formattedData": (act)=>({
                        titre: act.activite.name,
                        effects: act.effects?.length ? act.effects.map({
                            "RapportTableEditor.useEffect.formattedData": (e)=>({
                                    value: e.name
                                })
                        }["RapportTableEditor.useEffect.formattedData"]) : [
                            {
                                value: ""
                            }
                        ],
                        impacts: act.impacts?.length ? act.impacts.map({
                            "RapportTableEditor.useEffect.formattedData": (i)=>({
                                    value: i.name
                                })
                        }["RapportTableEditor.useEffect.formattedData"]) : [
                            {
                                value: ""
                            }
                        ],
                        produits: act.produits?.length ? act.produits.map({
                            "RapportTableEditor.useEffect.formattedData": (p)=>({
                                    value: p.name
                                })
                        }["RapportTableEditor.useEffect.formattedData"]) : [
                            {
                                value: ""
                            }
                        ],
                        cibles: act.cibles?.length ? act.cibles.map({
                            "RapportTableEditor.useEffect.formattedData": (c)=>({
                                    value: c.name
                                })
                        }["RapportTableEditor.useEffect.formattedData"]) : [
                            {
                                value: ""
                            }
                        ],
                        previsions: act.previsions?.length ? act.previsions.map({
                            "RapportTableEditor.useEffect.formattedData": (p)=>({
                                    value: p.name
                                })
                        }["RapportTableEditor.useEffect.formattedData"]) : [
                            {
                                value: ""
                            }
                        ],
                        realisations: act.realisations?.length ? act.realisations.map({
                            "RapportTableEditor.useEffect.formattedData": (r)=>({
                                    value: r.name
                                })
                        }["RapportTableEditor.useEffect.formattedData"]) : [
                            {
                                value: ""
                            }
                        ],
                        taux: act.taux?.length ? act.taux.map({
                            "RapportTableEditor.useEffect.formattedData": (t)=>({
                                    value: t.name
                                })
                        }["RapportTableEditor.useEffect.formattedData"]) : [
                            {
                                value: ""
                            }
                        ],
                        observations: act.observations?.length ? act.observations.map({
                            "RapportTableEditor.useEffect.formattedData": (o)=>({
                                    value: o.name
                                })
                        }["RapportTableEditor.useEffect.formattedData"]) : [
                            {
                                value: ""
                            }
                        ]
                    })
            }["RapportTableEditor.useEffect.formattedData"]);
            reset({
                lignes: formattedData
            });
        }
    }["RapportTableEditor.useEffect"], [
        rapport,
        reset,
        isTrim,
        objectifSpecifiques
    ]);
    // LOGIQUE DE SOUMISSION
    const onSubmit = async (data)=>{
        if (!rapport.id) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("ID rapport manquant");
            return;
        }
        setIsSubmitting(true);
        try {
            // 4. FORMATAGE DU PAYLOAD POUR L'API
            const activitesFormatted = data.lignes.map((l)=>{
                const baseAct = {
                    activite: {
                        name: l.titre
                    },
                    effects: l.effects.filter((e)=>e.value.trim() !== "").map((e)=>({
                            name: e.value
                        })),
                    impacts: l.impacts.filter((i)=>i.value.trim() !== "").map((i)=>({
                            name: i.value
                        }))
                };
                if (isTrimestriel) {
                    return {
                        ...baseAct,
                        produits: l.produits?.filter((x)=>x.value.trim() !== "").map((x)=>({
                                name: x.value
                            })) || [],
                        cibles: l.cibles?.filter((x)=>x.value.trim() !== "").map((x)=>({
                                name: x.value
                            })) || [],
                        previsions: l.previsions?.filter((x)=>x.value.trim() !== "").map((x)=>({
                                name: x.value
                            })) || [],
                        realisations: l.realisations?.filter((x)=>x.value.trim() !== "").map((x)=>({
                                name: x.value
                            })) || [],
                        taux: l.taux?.filter((x)=>x.value.trim() !== "").map((x)=>({
                                name: x.value
                            })) || [],
                        observations: l.observations?.filter((x)=>x.value.trim() !== "").map((x)=>({
                                name: x.value
                            })) || []
                    };
                }
                return baseAct;
            });
            const payload = {
                ...rapport,
                idCalendrier: rapport.calendrier.id,
                activites: activitesFormatted
            };
            const dataResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$services$2f$rapportService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rapportService"].updateRapport(rapport.id, payload);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Rapport mis à jour avec succès");
            if (onSuccess) {
                onSuccess(rapport.id, dataResponse);
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error.message || "Erreur lors de la mise à jour");
        } finally{
            setIsSubmitting(false);
        }
    };
    // 5. CONFIGURATION DES EN-TÊTES ET DE LA GRILLE
    const headers = isTrimestriel === 3 ? [
        "#",
        "Objectif spécifique",
        "Logique d'intervention",
        "Activité PTA",
        "Produit",
        "Cible",
        "Prévision Trim.",
        "Réalisation Trim.",
        "Taux de réalisation",
        "Observation",
        ""
    ] : isTrimestriel === 4 ? [
        "#",
        "Objectif spécifique",
        "Logique d'intervention",
        "Activité PTA",
        "Produit",
        "Cible",
        "Prévision annuel",
        "Réalisation annuel",
        "Taux de réalisation",
        "Observation",
        ""
    ] : [
        "#",
        "Titre de l'activité",
        "Effets",
        "Impacts",
        ""
    ];
    const gridLayout = isTrim ? "grid-cols-[70px_1.5fr_1.5fr_1.5fr_1.5fr_0.8fr_0.8fr_0.8fr_0.8fr_1.5fr_70px]" // Meilleure répartition
     : "grid-cols-[70px_1fr_1fr_1fr_70px]";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit(onSubmit, (errors)=>console.log("Erreurs Formulaire:", errors)),
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overflow-x-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: isTrim ? "min-w-[2100px]" : "min-w-[1000px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `grid ${gridLayout} bg-slate-50/80 border-b border-slate-200 items-stretch`,
                                children: headers.map((header, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `p-4 text-[10px] font-black tracking-widest uppercase flex items-center ${idx === 0 || idx === headers.length - 1 ? "justify-center text-slate-400" : "text-slate-600 border-l border-slate-200/50"}`,
                                        children: header
                                    }, idx, false, {
                                        fileName: "[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx",
                                        lineNumber: 166,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx",
                                lineNumber: 164,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "divide-y divide-slate-100 flex flex-col gap-6 py-4 bg-slate-50/30",
                                children: fields.map((field, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$form$2f$utils$2f$LigneActiviteEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LigneActiviteEditor"], {
                                        control: control,
                                        register: register,
                                        index: index,
                                        remove: remove,
                                        canRemove: fields.length > 1,
                                        isTrimestriel: isTrim,
                                        objectifSpecifiques: objectifSpecifiques,
                                        setValue: setValue,
                                        gridLayout: gridLayout
                                    }, field.id, false, {
                                        fileName: "[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx",
                                        lineNumber: 182,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx",
                                lineNumber: 180,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx",
                        lineNumber: 161,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx",
                    lineNumber: 159,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx",
                lineNumber: 158,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>append(defaultLine),
                        className: "w-full py-6 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 hover:border-slate-900 hover:bg-slate-50 transition-all flex flex-col items-center justify-center gap-2 group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-lg",
                                    children: "+"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx",
                                    lineNumber: 209,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx",
                                lineNumber: 208,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-black uppercase tracking-[0.3em]",
                                children: "Ajouter une ligne"
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx",
                                lineNumber: 211,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx",
                        lineNumber: 203,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-end pt-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: isSubmitting,
                            className: "px-10 py-4 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-200",
                            children: isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"
                        }, void 0, false, {
                            fileName: "[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx",
                            lineNumber: 216,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx",
                        lineNumber: 215,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx",
                lineNumber: 201,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx",
        lineNumber: 157,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(RapportTableEditor, "paxKJkqucEKbRZ0v2LHINkmaOlM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldArray"]
    ];
});
_c = RapportTableEditor;
var _c;
__turbopack_context__.k.register(_c, "RapportTableEditor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/common/components/ui/AppTableSkeleton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppTableSkeleton",
    ()=>AppTableSkeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const AppTableSkeleton = ({ rows = 5, cols = 4, className = "" })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm animate-pulse ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                className: "w-full border-collapse",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "bg-slate-50/50 border-b border-slate-100",
                            children: Array.from({
                                length: cols
                            }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-6 py-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-3 bg-slate-200 rounded-full w-2/3 mx-auto"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/common/components/ui/AppTableSkeleton.tsx",
                                        lineNumber: 31,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, `head-${i}`, false, {
                                    fileName: "[project]/src/features/common/components/ui/AppTableSkeleton.tsx",
                                    lineNumber: 30,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/src/features/common/components/ui/AppTableSkeleton.tsx",
                            lineNumber: 28,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/common/components/ui/AppTableSkeleton.tsx",
                        lineNumber: 27,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        children: Array.from({
                            length: rows
                        }).map((_, rowIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "border-b border-slate-50/80 last:border-0 hover:bg-slate-50/20 transition-colors",
                                children: Array.from({
                                    length: cols
                                }).map((_, colIndex)=>{
                                    // Logique déterministe : on crée une largeur entre 40% et 90% 
                                    // basée sur les index pour éviter le conflit serveur/client.
                                    const widthValue = 40 + (rowIndex * 7 + colIndex * 13) % 51;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-6 py-4 whitespace-nowrap",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-2.5 bg-slate-100 rounded-full animate-pulse",
                                            style: {
                                                width: `${widthValue}%`,
                                                margin: "0 auto"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/common/components/ui/AppTableSkeleton.tsx",
                                            lineNumber: 51,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, `cell-${rowIndex}-${colIndex}`, false, {
                                        fileName: "[project]/src/features/common/components/ui/AppTableSkeleton.tsx",
                                        lineNumber: 50,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0));
                                })
                            }, `row-${rowIndex}`, false, {
                                fileName: "[project]/src/features/common/components/ui/AppTableSkeleton.tsx",
                                lineNumber: 40,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/features/common/components/ui/AppTableSkeleton.tsx",
                        lineNumber: 38,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/common/components/ui/AppTableSkeleton.tsx",
                lineNumber: 25,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] animate-[shimmer_2s_infinite] -translate-x-[100%]"
                }, void 0, false, {
                    fileName: "[project]/src/features/common/components/ui/AppTableSkeleton.tsx",
                    lineNumber: 68,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/common/components/ui/AppTableSkeleton.tsx",
                lineNumber: 67,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/common/components/ui/AppTableSkeleton.tsx",
        lineNumber: 24,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = AppTableSkeleton;
var _c;
__turbopack_context__.k.register(_c, "AppTableSkeleton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/dashboard/components/DashboardTable.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DashboardTable",
    ()=>DashboardTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$form$2f$rapports$2f$RapportTableEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$common$2f$components$2f$ui$2f$AppTableSkeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/common/components/ui/AppTableSkeleton.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const DashboardTable = ({ rapports: initialRapports, isLoading, generatingId, onPdfClick, onUpdate })=>{
    _s();
    // 1. État local pour la liste (permet la mise à jour sans rechargement)
    const [listRapports, setListRapports] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialRapports);
    const [editingRapport, setEditingRapport] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Synchroniser si les props changent (ex: filtres ou pagination)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardTable.useEffect": ()=>{
            setListRapports(initialRapports);
        }
    }["DashboardTable.useEffect"], [
        initialRapports
    ]);
    const formatDate = (dateStr)=>{
        if (!dateStr) return "N/A";
        const d = new Date(dateStr);
        return d.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };
    const statusClasses = {
        VALIDE: "text-green-800 bg-green-50 border-green-300",
        TRANSMIS: "text-blue-800 bg-blue-50 border-blue-300",
        "EN COURS": "text-amber-800 bg-amber-50 border-amber-300"
    };
    // 2. Fonction de succès appelée par l'éditeur
    const handleUpdateSuccess = (idPrecedent, updatedData)=>{
        // Mise à jour de la liste locale (on remplace le vieux rapport par le nouveau)
        // console.log("Updated Data:", updatedData);
        setListRapports((prev)=>prev.map((r)=>r.id === idPrecedent ? updatedData : r));
        if (onUpdate) {
            onUpdate(idPrecedent, updatedData);
        }
        // Quitter le mode édition
        setEditingRapport(null);
        // Optionnel : Forcer Next.js à rafraîchir le cache serveur
        router.refresh();
    };
    // --- VUE ÉDITION ---
    if (editingRapport) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setEditingRapport(null),
                                className: "p-2 hover:bg-white rounded-full transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-5 h-5",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: "2.5",
                                        d: "M15 19l-7-7 7-7"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                                        lineNumber: 71,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                                    lineNumber: 70,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                                lineNumber: 69,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-black text-slate-900 uppercase",
                                        children: "Modification du rapport"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                                        lineNumber: 75,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] font-bold text-slate-400 uppercase",
                                        children: [
                                            "Période du ",
                                            formatDate(editingRapport.calendrier.dateDebut)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                                        lineNumber: 76,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                                lineNumber: 74,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                        lineNumber: 68,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                    lineNumber: 67,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$form$2f$rapports$2f$RapportTableEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RapportTableEditor"], {
                    rapport: editingRapport,
                    onSuccess: handleUpdateSuccess
                }, void 0, false, {
                    fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                    lineNumber: 81,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-end gap-3",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setEditingRapport(null),
                        className: "px-6 py-3 text-xs font-black uppercase text-slate-500",
                        children: "Annuler"
                    }, void 0, false, {
                        fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                        lineNumber: 87,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                    lineNumber: 86,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
            lineNumber: 66,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0));
    }
    // --- VUE TABLEAU ---
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm",
        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$common$2f$components$2f$ui$2f$AppTableSkeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppTableSkeleton"], {
            rows: 5,
            cols: 4
        }, void 0, false, {
            fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
            lineNumber: 99,
            columnNumber: 17
        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "overflow-x-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                className: "w-full text-left border-collapse min-w-[800px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "bg-slate-50/50 border-b border-slate-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-6 py-5 text-[10px] font-black uppercase text-slate-500 tracking-widest",
                                    children: "Période"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                                    lineNumber: 105,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-6 py-5 text-[10px] font-black uppercase text-slate-500 tracking-widest",
                                    children: "Entité"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                                    lineNumber: 106,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-6 py-5 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center",
                                    children: "Statut"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                                    lineNumber: 107,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-6 py-5 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right",
                                    children: "Actions"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                                    lineNumber: 108,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                            lineNumber: 104,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                        lineNumber: 103,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        className: "divide-y divide-slate-100",
                        children: listRapports.map((rapport)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "hover:bg-slate-50/40 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-6 py-5 border-r border-slate-100",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm font-black text-slate-900",
                                                    children: [
                                                        "Du ",
                                                        formatDate(rapport.calendrier.dateDebut)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                                                    lineNumber: 116,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-[10px] font-medium text-slate-400 uppercase",
                                                    children: [
                                                        "au ",
                                                        formatDate(rapport.calendrier.dateFin)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                                                    lineNumber: 117,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-[9px] font-bold text-blue-600 uppercase bg-blue-50 px-2 py-1 rounded-md inline-block",
                                                    children: rapport.calendrier.typeCalendrier?.name || "Calendrier"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                                                    lineNumber: 118,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                                            lineNumber: 115,
                                            columnNumber: 41
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                                        lineNumber: 114,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-6 py-4 border-r border-slate-100",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[11px] font-bold text-slate-600 uppercase",
                                            children: rapport.user.entite || "N/A"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                                            lineNumber: 124,
                                            columnNumber: 41
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                                        lineNumber: 123,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-6 py-4 border-r border-slate-100 text-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `px-3 py-1 text-[9px] font-black uppercase rounded-md border ${statusClasses[rapport.statut || "EN COURS"]}`,
                                            children: rapport.statut || "EN COURS"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                                            lineNumber: 127,
                                            columnNumber: 41
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                                        lineNumber: 126,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-6 py-4 text-right space-x-2",
                                        children: [
                                            rapport.statut !== "VALIDE" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setEditingRapport(rapport),
                                                className: "px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase rounded-lg hover:bg-slate-700",
                                                children: "Modifier"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                                                lineNumber: 134,
                                                columnNumber: 45
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>onPdfClick(rapport),
                                                disabled: generatingId === rapport.id,
                                                className: "px-4 py-2 bg-white border border-slate-200 text-slate-600 text-[10px] font-black uppercase rounded-lg",
                                                children: generatingId === rapport.id ? "..." : "PDF"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                                                lineNumber: 142,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                                        lineNumber: 131,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, rapport.id, true, {
                                fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                                lineNumber: 113,
                                columnNumber: 33
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                        lineNumber: 111,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                lineNumber: 102,
                columnNumber: 21
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
            lineNumber: 101,
            columnNumber: 17
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
        lineNumber: 97,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(DashboardTable, "PJqqxVmzpK84sLqMNInJmjApGJk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = DashboardTable;
var _c;
__turbopack_context__.k.register(_c, "DashboardTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/audioService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "audioService",
    ()=>audioService
]);
const playSound = (path)=>{
    if ("TURBOPACK compile-time truthy", 1) {
        const audio = new Audio(path);
        audio.volume = 0.4; // Volume à 40% pour ne pas agresser l'utilisateur
        audio.play().catch((err)=>{
            // Le navigateur bloque parfois le son si l'utilisateur n'a pas encore interagi avec la page
            console.warn("Lecture audio bloquée par le navigateur :", err);
        });
    }
};
const audioService = {
    playSuccessRecherche: ()=>playSound("/sounds/successed-295058.mp3"),
    playErrorValidation: ()=>playSound("/sounds/error-011-352286.mp3")
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/dashboard/rapports/recherche/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RecherchePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$services$2f$rechercheService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/rapports/services/rechercheService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$hooks$2f$usePdfExport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/rapports/hooks/usePdfExport.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$vision$2f$RapportView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/rapports/components/vision/RapportView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$dashboard$2f$components$2f$DashboardTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/dashboard/components/DashboardTable.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$audioService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/audioService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function RecherchePage() {
    _s();
    const [selectedDate, setSelectedDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [rapports, setRapports] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasSearched, setHasSearched] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // PDF Export — même logique que DashboardPage
    const { exportToPdf } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$hooks$2f$usePdfExport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePdfExport"])();
    const [selectedForPdf, setSelectedForPdf] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [generatingId, setGeneratingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handlePdfClick = async (rapport)=>{
        // console.log(rapport)
        const idRp = rapport.id !== undefined ? rapport.id : 0;
        setGeneratingId(idRp);
        setSelectedForPdf(rapport);
        setTimeout(()=>{
            const year = new Date(rapport.calendrier.dateDebut).getFullYear();
            exportToPdf("rapport-a4-container", `Rapport_H${year}_ID${rapport.id}.pdf`).finally(()=>{
                setGeneratingId(null);
                setSelectedForPdf(null);
            });
        }, 500);
    };
    const handleSearch = async (e)=>{
        e.preventDefault();
        if (!selectedDate) return;
        setIsLoading(true);
        setHasSearched(true);
        setError(null);
        try {
            const results = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$services$2f$rechercheService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rechercheService"].searchRapportsByDate(selectedDate);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$audioService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["audioService"].playSuccessRecherche();
            setRapports(results);
        } catch (err) {
            // console.error("Erreur lors de la recherche:", err);
            const message = err.message || err.error || "Une erreur est survenue lors de la recherche.";
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error(message);
            setError(message);
            setRapports([]);
        } finally{
            setIsLoading(false);
        }
    };
    const handleRapportUpdated = (idPrecedent, updatedRapport)=>{
        // On met à jour la liste du parent
        setRapports((prev)=>prev.map((r)=>r.id === idPrecedent ? updatedRapport : r));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-10 pb-20 px-4 md:px-0 max-w-7xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4 pt-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-10 w-1 bg-slate-900 rounded-full"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/rapports/recherche/page.tsx",
                                lineNumber: 74,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-extrabold text-slate-900 tracking-tight uppercase",
                                children: "Recherche de rapports"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/rapports/recherche/page.tsx",
                                lineNumber: 75,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/rapports/recherche/page.tsx",
                        lineNumber: 73,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em] ml-4",
                        children: "Consulter les rapports par date spécifique"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/rapports/recherche/page.tsx",
                        lineNumber: 79,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/rapports/recherche/page.tsx",
                lineNumber: 72,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white border border-slate-200 rounded-2xl p-8 shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSearch,
                    className: "flex flex-col md:flex-row items-end gap-6 max-w-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1",
                                    children: "Sélectionner une date"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/rapports/recherche/page.tsx",
                                    lineNumber: 88,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "date",
                                    value: selectedDate,
                                    onChange: (e)=>setSelectedDate(e.target.value),
                                    className: "w-full border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all text-slate-700 bg-slate-50/30",
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/rapports/recherche/page.tsx",
                                    lineNumber: 91,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/rapports/recherche/page.tsx",
                            lineNumber: 87,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: isLoading || !selectedDate,
                            className: "w-full md:w-48 py-4 bg-slate-900 text-white font-bold text-[10px] uppercase tracking-[0.2em] rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2",
                            children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "animate-spin h-4 w-4 text-white",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                className: "opacity-25",
                                                cx: "12",
                                                cy: "12",
                                                r: "10",
                                                stroke: "currentColor",
                                                strokeWidth: "4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/rapports/recherche/page.tsx",
                                                lineNumber: 107,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                className: "opacity-75",
                                                fill: "currentColor",
                                                d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/rapports/recherche/page.tsx",
                                                lineNumber: 108,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/rapports/recherche/page.tsx",
                                        lineNumber: 106,
                                        columnNumber: 33
                                    }, this),
                                    "Recherche..."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/rapports/recherche/page.tsx",
                                lineNumber: 105,
                                columnNumber: 29
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        className: "h-4 w-4",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2.5,
                                            d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/rapports/recherche/page.tsx",
                                            lineNumber: 115,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/rapports/recherche/page.tsx",
                                        lineNumber: 114,
                                        columnNumber: 33
                                    }, this),
                                    "Rechercher"
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/rapports/recherche/page.tsx",
                            lineNumber: 99,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/rapports/recherche/page.tsx",
                    lineNumber: 86,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/rapports/recherche/page.tsx",
                lineNumber: 85,
                columnNumber: 13
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 px-5 py-4 bg-red-50 border border-red-200 rounded-xl text-red-700",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        className: "h-5 w-5 text-red-400 shrink-0",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/rapports/recherche/page.tsx",
                            lineNumber: 128,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/rapports/recherche/page.tsx",
                        lineNumber: 127,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-bold uppercase tracking-wide",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/rapports/recherche/page.tsx",
                        lineNumber: 130,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/rapports/recherche/page.tsx",
                lineNumber: 126,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$dashboard$2f$components$2f$DashboardTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardTable"], {
                rapports: rapports,
                isLoading: isLoading,
                generatingId: generatingId,
                onPdfClick: handlePdfClick,
                onUpdate: handleRapportUpdated
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/rapports/recherche/page.tsx",
                lineNumber: 135,
                columnNumber: 13
            }, this),
            selectedForPdf && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed left-[-9999px] top-0 pointer-events-none opacity-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    id: "rapport-a4-container",
                    style: {
                        width: "210mm"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$vision$2f$RapportView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RapportView"], {
                        data: [
                            selectedForPdf
                        ],
                        isPrintMode: true
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/rapports/recherche/page.tsx",
                        lineNumber: 145,
                        columnNumber: 37
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/rapports/recherche/page.tsx",
                    lineNumber: 144,
                    columnNumber: 33
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/rapports/recherche/page.tsx",
                lineNumber: 143,
                columnNumber: 29
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/rapports/recherche/page.tsx",
        lineNumber: 69,
        columnNumber: 9
    }, this);
}
_s(RecherchePage, "+1YkG3q/f/hA3amiMQG8T9Aw8bA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$hooks$2f$usePdfExport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePdfExport"]
    ];
});
_c = RecherchePage;
var _c;
__turbopack_context__.k.register(_c, "RecherchePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_fc0810d9._.js.map