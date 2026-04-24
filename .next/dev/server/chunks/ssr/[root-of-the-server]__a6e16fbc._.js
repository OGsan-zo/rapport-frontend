module.exports = [
"[project]/src/hooks/useFetchAuth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFetchAuth",
    ()=>useFetchAuth
]);
"use client"; // 👈 Indispensable pour utiliser useRouter dans Next.js App Router
function useFetchAuth() {
    const login = ("TURBOPACK compile-time value", "/login") || '/login';
    const fetchWithAuth = async (url, options = {})=>{
        const response = await fetch(url, options);
        if (response.status === 401 || response.status === 403) {
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            throw new Error("Non autorisé, redirection en cours...");
        }
        return response;
    };
    return fetchWithAuth;
}
}),
"[project]/src/features/rapports/services/rapportService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rapportService",
    ()=>rapportService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFetchAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useFetchAuth.ts [app-ssr] (ecmascript)");
;
const fetchAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFetchAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFetchAuth"])();
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
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/worker_threads [external] (worker_threads, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("worker_threads", () => require("worker_threads"));

module.exports = mod;
}),
"[project]/src/features/rapports/services/pdfService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pdfService",
    ()=>pdfService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$node$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf/dist/jspdf.node.min.js [app-ssr] (ecmascript)");
;
const pdfService = {
    /**
     * Génère un Blob PDF performant avec jsPDF.
     * Cette méthode offre un meilleur rendu du texte et un poids de fichier optimisé.
     */ async generatePdfBlob (element, filename, isLandscape = false) {
        const orientation = isLandscape ? 'l' : 'p';
        const doc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$node$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsPDF"]({
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
}),
"[project]/src/features/rapports/hooks/usePdfExport.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePdfExport",
    ()=>usePdfExport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$services$2f$pdfService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/rapports/services/pdfService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
const usePdfExport = ()=>{
    const [isGenerating, setIsGenerating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    /**
     * Capture un élément HTML et l'ouvre dans un nouvel onglet en tant que PDF.
     */ const exportToPdf = async (elementId, filename = "Rapport_MESUPRES.pdf", isLandscape = false)=>{
        const element = document.getElementById(elementId);
        if (!element) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Élément avec l'ID \"" + elementId + "\" non trouvé.");
            return;
        }
        setIsGenerating(true);
        try {
            const blob = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$services$2f$pdfService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pdfService"].generatePdfBlob(element, filename, isLandscape);
            const url = URL.createObjectURL(blob);
            // Ouvrir dans un nouvel onglet
            const newWindow = window.open(url, "_blank");
            // Si le bloqueur de fenêtres surgissantes est actif
            if (!newWindow) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Veuillez autoriser les fenêtres surgissantes pour visualiser le PDF.");
            }
            // Nettoyage de l'URL après un délai (pour laisser le temps au navigateur de charger)
            setTimeout(()=>URL.revokeObjectURL(url), 10000);
        } catch (error) {
            // console.error("Erreur lors de la génération du PDF:", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(error.message || "Erreur lors de la génération du PDF.");
        } finally{
            setIsGenerating(false);
        }
    };
    return {
        exportToPdf,
        isGenerating
    };
};
}),
"[project]/src/features/rapports/components/vision/sub/RapportHeader.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RapportHeader",
    ()=>RapportHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/constants.ts [app-ssr] (ecmascript)");
"use client";
;
;
const RapportHeader = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full flex flex-col items-center text-center mt-0 pt-0 mb-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IMAGES"].LOGO_REPOBLIKA,
                alt: "Emblème Repoblikan'i Madagasikara",
                crossOrigin: "anonymous",
                className: "w-32 h-auto object-contain"
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/vision/sub/RapportHeader.tsx",
                lineNumber: 13,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-16 border-t border-black my-1"
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/vision/sub/RapportHeader.tsx",
                lineNumber: 21,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
}),
"[project]/src/features/rapports/components/vision/sub/RapportTable.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RapportTable",
    ()=>RapportTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
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
    let apoitra = isPdf;
    if (isTrimestriel) {
        apoitra = false;
    }
    const renderListCell = (items, showPoint = true)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
            style: {
                border: "1px solid black",
                padding: cellPadding,
                verticalAlign: "top",
                wordBreak: "break-word",
                overflowWrap: "break-word"
            },
            children: items && items.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                style: {
                    margin: 0,
                    padding: 0,
                    listStyleType: "none"
                },
                children: items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        style: {
                            display: "flex",
                            gap: "4px",
                            marginBottom: "4px"
                        },
                        children: [
                            showPoint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: "#000000",
                                    fontWeight: "bold"
                                },
                                children: "•"
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                                lineNumber: 86,
                                columnNumber: 43
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    textAlign: "justify",
                                    color: "#000000"
                                },
                                children: item.name
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                                lineNumber: 87,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, i, true, {
                        fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                        lineNumber: 85,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                lineNumber: 83,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    color: "#666666",
                    fontStyle: "italic",
                    fontSize: tableFontSize
                },
                children: " "
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                lineNumber: 92,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
            lineNumber: 75,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    // Fonction spéciale pour afficher le taux avec le symbole %
    const renderTauxCell = (items)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
            style: {
                border: "1px solid black",
                padding: cellPadding,
                verticalAlign: "top",
                wordBreak: "break-word",
                overflowWrap: "break-word"
            },
            children: items && items.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                style: {
                    margin: 0,
                    padding: 0,
                    listStyleType: "none"
                },
                children: items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        style: {
                            display: "flex",
                            gap: "4px",
                            marginBottom: "4px"
                        },
                        children: [
                            isPdf && !isTrimestriel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: "#000000",
                                    fontWeight: "bold"
                                },
                                children: "•"
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                                lineNumber: 110,
                                columnNumber: 57
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    textAlign: "justify",
                                    color: "#000000"
                                },
                                children: item.name
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                                lineNumber: 111,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0)),
                            i === items.length - 1 && !isNaN(parseFloat(item.name)) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: "#000000",
                                    fontWeight: "bold"
                                },
                                children: " %"
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                                lineNumber: 112,
                                columnNumber: 89
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, i, true, {
                        fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                        lineNumber: 109,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                lineNumber: 107,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    color: "#666666",
                    fontStyle: "italic",
                    fontSize: tableFontSize
                },
                children: " "
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                lineNumber: 117,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
            lineNumber: 99,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full",
        style: {
            maxHeight: isTrimestriel && isPdf ? "100%" : "100%",
            overflow: "hidden"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
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
                                lineNumber: 144,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                            lineNumber: 143,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
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
                                lineNumber: 162,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                            lineNumber: 161,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
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
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
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
                                    lineNumber: 189,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0));
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                            lineNumber: 179,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                    lineNumber: 142,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                    children: rapport.activites?.map((actData, idx)=>{
                        const act = actData;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
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
                                    lineNumber: 211,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)),
                                renderListCell(act.effects, apoitra),
                                renderListCell(act.impacts, apoitra),
                                isTrimestriel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        renderListCell(act.produits, apoitra),
                                        renderListCell(act.cibles, apoitra),
                                        renderListCell(act.previsions, apoitra),
                                        renderListCell(act.realisations, apoitra),
                                        renderTauxCell(act.taux),
                                        renderListCell(act.observations, isPdf)
                                    ]
                                }, void 0, true)
                            ]
                        }, idx, true, {
                            fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                            lineNumber: 210,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0));
                    })
                }, void 0, false, {
                    fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                    lineNumber: 206,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
            lineNumber: 127,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
        lineNumber: 123,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/features/rapports/components/vision/RapportView.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RapportView",
    ()=>RapportView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$vision$2f$sub$2f$RapportHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/rapports/components/vision/sub/RapportHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$vision$2f$sub$2f$RapportTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/rapports/components/vision/sub/RapportTable.tsx [app-ssr] (ecmascript)");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full flex justify-center",
        style: {
            paddingTop: isPrintMode ? "0" : "64px",
            paddingBottom: isPrintMode ? "0" : "64px",
            backgroundColor: isPrintMode ? "#ffffff" : "#f8fafc"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                isPdf && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$vision$2f$sub$2f$RapportHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RapportHeader"], {}, void 0, false, {
                    fileName: "[project]/src/features/rapports/components/vision/RapportView.tsx",
                    lineNumber: 57,
                    columnNumber: 27
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-f0702ee7f6251b79" + " " + "flex flex-col gap-10",
                    children: data.map((rapport, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            "data-report-section": true,
                            className: "jsx-f0702ee7f6251b79" + " " + "w-full",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$vision$2f$sub$2f$RapportTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RapportTable"], {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
}),
"[project]/src/features/rapports/components/form/utils/ToolbarTitle.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToolbarTitle",
    ()=>ToolbarTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const ToolbarTitle = ({ title, description })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-black text-slate-900 tracking-tight uppercase",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/form/utils/ToolbarTitle.tsx",
                lineNumber: 6,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]",
                children: description
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/form/utils/ToolbarTitle.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/rapports/components/form/utils/ToolbarTitle.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/features/dashboard/components/DashboardToolbarProps.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DashboardToolbar",
    ()=>DashboardToolbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$form$2f$utils$2f$ToolbarTitle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/rapports/components/form/utils/ToolbarTitle.tsx [app-ssr] (ecmascript)");
;
;
const DashboardToolbar = ({ selectedPeriodId, setSelectedPeriodId, calendrierResult })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "sticky top-0 bg-white/80 backdrop-blur-md z-30 py-8 mb-4 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 transition-all",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$form$2f$utils$2f$ToolbarTitle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToolbarTitle"], {
                title: "Mes Rapports",
                description: "Archives et suivi"
            }, void 0, false, {
                fileName: "[project]/src/features/dashboard/components/DashboardToolbarProps.tsx",
                lineNumber: 19,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto"
            }, void 0, false, {
                fileName: "[project]/src/features/dashboard/components/DashboardToolbarProps.tsx",
                lineNumber: 24,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/dashboard/components/DashboardToolbarProps.tsx",
        lineNumber: 18,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LigneActiviteEditor",
    ()=>LigneActiviteEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-ssr] (ecmascript)");
;
;
;
const LigneActiviteEditor = ({ control, register, setValue, index, remove, canRemove, isTrimestriel = false, objectifSpecifiques = [], logiqueInterventions = [], gridLayout, isSupervision = false })=>{
    // --- Hooks pour tous les champs ---
    const { fields: effectsFields, append: appendEffect, remove: removeEffect } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFieldArray"])({
        control,
        name: `lignes.${index}.effects`
    });
    const { fields: impactsFields, append: appendImpact, remove: removeImpact } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFieldArray"])({
        control,
        name: `lignes.${index}.impacts`
    });
    const { fields: produitsFields, append: appendProduit, remove: removeProduit } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFieldArray"])({
        control,
        name: `lignes.${index}.produits`
    });
    const { fields: ciblesFields, append: appendCible, remove: removeCible } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFieldArray"])({
        control,
        name: `lignes.${index}.cibles`
    });
    const { fields: previsionsFields, append: appendPrevision, remove: removePrevision } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFieldArray"])({
        control,
        name: `lignes.${index}.previsions`
    });
    const { fields: realisationsFields, append: appendRealisation, remove: removeRealisation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFieldArray"])({
        control,
        name: `lignes.${index}.realisations`
    });
    const { fields: tauxFields, append: appendTaux } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFieldArray"])({
        control,
        name: `lignes.${index}.taux`
    });
    const { fields: observationsFields, append: appendObservation, remove: removeObservation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFieldArray"])({
        control,
        name: `lignes.${index}.observations`
    });
    // Sécurité pour s'assurer qu'il y a toujours au moins un champ vide par colonne
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
    }, [
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
    const previsionsWatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWatch"])({
        control,
        name: `lignes.${index}.previsions`
    });
    const realisationsWatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWatch"])({
        control,
        name: `lignes.${index}.realisations`
    });
    const objectifSpecifiqueWatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWatch"])({
        control,
        name: `lignes.${index}.titre`
    });
    const calculerTaux = (i)=>{
        // Si c'est "Hors PTA", on retourne directement cette valeur
        if (objectifSpecifiqueWatch === "Hors PTA") {
            return "Hors PTA";
        }
        const prev = parseFloat(previsionsWatch?.[i]?.value) || 0;
        const real = parseFloat(realisationsWatch?.[i]?.value) || 0;
        if (prev <= 0) return "0.00";
        if (real === 0) return "0.00";
        return (real / prev * 100).toFixed(2);
    };
    // Effet pour mettre à jour tous les champs quand l'objectif spécifique change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (objectifSpecifiqueWatch === "Hors PTA") {
            // Mettre à jour tous les champs avec "Hors PTA"
            effectsFields.forEach((_, i)=>{
                setValue(`lignes.${index}.effects.${i}.value`, "Hors PTA");
            });
            ciblesFields.forEach((_, i)=>{
                setValue(`lignes.${index}.cibles.${i}.value`, "Hors PTA");
            });
            previsionsFields.forEach((_, i)=>{
                setValue(`lignes.${index}.previsions.${i}.value`, "Hors PTA");
            });
            realisationsFields.forEach((_, i)=>{
                setValue(`lignes.${index}.realisations.${i}.value`, "Hors PTA");
            });
            tauxFields.forEach((_, i)=>{
                setValue(`lignes.${index}.taux.${i}.value`, "Hors PTA");
            });
        }
    }, [
        objectifSpecifiqueWatch,
        index,
        setValue,
        effectsFields,
        ciblesFields,
        previsionsFields,
        realisationsFields,
        tauxFields
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        tauxFields.forEach((_, i)=>{
            setValue(`lignes.${index}.taux.${i}.value`, calculerTaux(i));
        });
    }, [
        previsionsWatch,
        realisationsWatch,
        objectifSpecifiqueWatch,
        setValue
    ]);
    // --- Grille dynamique synchronisée avec le parent ---
    // --- Classes CSS communes pour éviter la répétition ---
    const colContainerClass = "border-l border-slate-100 p-4 space-y-3 w-full h-full flex flex-col";
    const itemBoxClass = "flex items-center gap-2 bg-white p-3 border border-slate-200 rounded-lg shadow-sm w-full relative group/item";
    const textAreaClass = "w-full text-sm text-slate-600 bg-transparent border-none focus:ring-0 resize-none min-h-[100px] p-2 placeholder:text-slate-300 text-center placeholder:text-center flex items-center justify-center";
    const selectClass = "w-full text-sm text-slate-600 bg-transparent border-none focus:ring-0 p-2 cursor-pointer text-center";
    const inputClass = "w-full text-sm text-slate-600 bg-transparent border-none focus:ring-0 min-h-[100px] p-2 placeholder:text-slate-300 text-center placeholder:text-center flex items-center justify-center";
    const addBtnClass = "w-full py-2 mt-auto border border-dashed border-slate-300 rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all";
    const closeBtnClass = "text-slate-300 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `grid ${gridLayout} group/row transition-colors hover:bg-slate-50/30 items-stretch`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center text-xs font-black text-slate-300 bg-slate-50/20",
                children: String(index + 1).padStart(2, '0')
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: colContainerClass,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: itemBoxClass,
                    children: isTrimestriel ? isSupervision ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        ...register(`lignes.${index}.titre`),
                        className: `${textAreaClass} font-bold text-slate-800 h-full pointer-events-none bg-slate-50`,
                        placeholder: "Objectif spécifique",
                        readOnly: true
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                        lineNumber: 135,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        ...register(`lignes.${index}.titre`),
                        className: `${selectClass} font-bold text-slate-800`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Sélectionner un objectif..."
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                lineNumber: 146,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Hors PTA",
                                children: "Hors PTA"
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                lineNumber: 147,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            objectifSpecifiques.map((obj)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: obj.nom,
                                    children: obj.nom
                                }, obj.id, false, {
                                    fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                    lineNumber: 149,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                        lineNumber: 142,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        ...register(`lignes.${index}.titre`),
                        className: `${textAreaClass} font-bold text-slate-800 h-full`,
                        placeholder: "Nom de l'activité..."
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                        lineNumber: 154,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                    lineNumber: 132,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: colContainerClass,
                children: [
                    effectsFields.map((field, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: itemBoxClass,
                            children: [
                                isTrimestriel ? isSupervision ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    ...register(`lignes.${index}.effects.${i}.value`),
                                    className: `${textAreaClass} h-full pointer-events-none bg-slate-50`,
                                    placeholder: "Logique d'intervention",
                                    readOnly: true
                                }, void 0, false, {
                                    fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                    lineNumber: 169,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: objectifSpecifiqueWatch === "Hors PTA" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        ...register(`lignes.${index}.effects.${i}.value`, {
                                            value: "Hors PTA"
                                        }),
                                        className: inputClass,
                                        readOnly: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                        lineNumber: 178,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        ...register(`lignes.${index}.effects.${i}.value`),
                                        className: selectClass,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "Sélectionner une logique d'intervention..."
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                                lineNumber: 189,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            logiqueInterventions.map((logique)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: logique.nom,
                                                    children: logique.nom
                                                }, logique.id, false, {
                                                    fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                                    lineNumber: 191,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                        lineNumber: 185,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    ...register(`lignes.${index}.effects.${i}.value`),
                                    className: textAreaClass,
                                    placeholder: `Effet ${i + 1}...`
                                }, void 0, false, {
                                    fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                    lineNumber: 198,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                effectsFields.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>removeEffect(i),
                                    className: closeBtnClass,
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                    lineNumber: 205,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, field.id, true, {
                            fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                            lineNumber: 166,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))),
                    !isTrimestriel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>appendEffect({
                                value: ""
                            }),
                        className: addBtnClass,
                        children: "+ effet"
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                        lineNumber: 210,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                lineNumber: 164,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: colContainerClass,
                children: [
                    impactsFields.map((field, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: itemBoxClass,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    ...register(`lignes.${index}.impacts.${i}.value`),
                                    className: textAreaClass,
                                    placeholder: isTrimestriel ? `Activité PTA ${i + 1}...` : `Impact ${i + 1}...`
                                }, void 0, false, {
                                    fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                    lineNumber: 220,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                impactsFields.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>removeImpact(i),
                                    className: closeBtnClass,
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                    lineNumber: 226,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, field.id, true, {
                            fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                            lineNumber: 219,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))),
                    !isTrimestriel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>appendImpact({
                                value: ""
                            }),
                        className: addBtnClass,
                        children: "+ impact"
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                        lineNumber: 235,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                lineNumber: 217,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isTrimestriel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: colContainerClass,
                        children: produitsFields.map((field, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: itemBoxClass,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        ...register(`lignes.${index}.produits.${i}.value`),
                                        className: inputClass,
                                        placeholder: `Produit ${i + 1}...`,
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                        lineNumber: 248,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    produitsFields.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>removeProduit(i),
                                        className: closeBtnClass,
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                        lineNumber: 249,
                                        columnNumber: 47
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, field.id, true, {
                                fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                lineNumber: 247,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                        lineNumber: 245,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: colContainerClass,
                        children: ciblesFields.map((field, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: itemBoxClass,
                                children: [
                                    objectifSpecifiqueWatch === "Hors PTA" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        ...register(`lignes.${index}.cibles.${i}.value`, {
                                            value: "Hors PTA"
                                        }),
                                        className: inputClass,
                                        readOnly: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                        lineNumber: 260,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        ...register(`lignes.${index}.cibles.${i}.value`),
                                        className: inputClass,
                                        placeholder: `Cible ${i + 1}...`,
                                        min: "1"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                        lineNumber: 267,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    ciblesFields.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>removeCible(i),
                                        className: closeBtnClass,
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                        lineNumber: 269,
                                        columnNumber: 45
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, field.id, true, {
                                fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                lineNumber: 258,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                        lineNumber: 256,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: colContainerClass,
                        children: previsionsFields.map((field, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: itemBoxClass,
                                children: [
                                    objectifSpecifiqueWatch === "Hors PTA" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        ...register(`lignes.${index}.previsions.${i}.value`, {
                                            value: "Hors PTA"
                                        }),
                                        className: inputClass,
                                        readOnly: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                        lineNumber: 280,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        ...register(`lignes.${index}.previsions.${i}.value`),
                                        className: inputClass,
                                        placeholder: `Prévision ${i + 1}...`
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                        lineNumber: 287,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    previsionsFields.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>removePrevision(i),
                                        className: closeBtnClass,
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                        lineNumber: 294,
                                        columnNumber: 49
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, field.id, true, {
                                fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                lineNumber: 278,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                        lineNumber: 276,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: colContainerClass,
                        children: realisationsFields.map((field, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: itemBoxClass,
                                children: [
                                    objectifSpecifiqueWatch === "Hors PTA" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        ...register(`lignes.${index}.realisations.${i}.value`, {
                                            value: "Hors PTA"
                                        }),
                                        className: inputClass,
                                        readOnly: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                        lineNumber: 305,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        ...register(`lignes.${index}.realisations.${i}.value`),
                                        className: inputClass,
                                        placeholder: `Réalisation ${i + 1}...`
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                        lineNumber: 312,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    realisationsFields.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>removeRealisation(i),
                                        className: closeBtnClass,
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                        lineNumber: 319,
                                        columnNumber: 51
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, field.id, true, {
                                fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                lineNumber: 303,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                        lineNumber: 301,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: colContainerClass,
                        children: tauxFields.map((field, i)=>{
                            const valeurTaux = calculerTaux(i);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `${itemBoxClass} bg-slate-50 border-blue-100`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        ...register(`lignes.${index}.taux.${i}.value`),
                                        value: valeurTaux,
                                        readOnly: true,
                                        className: `${textAreaClass} font-bold text-blue-600 pointer-events-none`
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                        lineNumber: 331,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    valeurTaux !== "Hors PTA" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-bold text-blue-400 absolute right-2 top-1/2 transform -translate-y-1/2",
                                        children: "%"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                        lineNumber: 339,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, field.id, true, {
                                fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                lineNumber: 330,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0));
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                        lineNumber: 326,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: colContainerClass,
                        children: [
                            observationsFields.map((field, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: itemBoxClass,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            ...register(`lignes.${index}.observations.${i}.value`),
                                            className: textAreaClass,
                                            placeholder: `Observation ${i + 1}...`
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                            lineNumber: 350,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        observationsFields.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>removeObservation(i),
                                            className: closeBtnClass,
                                            children: "✕"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                            lineNumber: 351,
                                            columnNumber: 51
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, field.id, true, {
                                    fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                    lineNumber: 349,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>appendObservation({
                                        value: ""
                                    }),
                                className: addBtnClass,
                                children: "+ observation"
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                                lineNumber: 354,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                        lineNumber: 347,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-l border-slate-100 flex items-center justify-center p-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>remove(index),
                    disabled: !canRemove,
                    className: "p-2.5 rounded-full transition-all text-red-300 bg-red-50 opacity-100 md:text-slate-300 md:bg-transparent md:opacity-0 md:hover:text-red-500 md:hover:bg-red-50 md:group-hover/row:opacity-100 disabled:invisible",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-4 h-4",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "2.5",
                            d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        }, void 0, false, {
                            fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                            lineNumber: 368,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                        lineNumber: 367,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                    lineNumber: 361,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
                lineNumber: 360,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx",
        lineNumber: 123,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/features/admin/services/objectifSpecifiqueService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "objectifSpecifiqueService",
    ()=>objectifSpecifiqueService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFetchAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useFetchAuth.ts [app-ssr] (ecmascript)");
;
const fetchAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFetchAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFetchAuth"])();
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
    delete: async (_id)=>{
        await fetchAuth(`/api/rapports/OS/${_id}`, {
            method: "DELETE"
        });
    }
};
}),
"[project]/src/features/admin/services/logiqueInterventionService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "logiqueInterventionService",
    ()=>logiqueInterventionService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFetchAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useFetchAuth.ts [app-ssr] (ecmascript)");
;
const fetchAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFetchAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFetchAuth"])();
const logiqueInterventionService = {
    getAll: async ()=>{
        const response = await fetchAuth("/api/rapports/LI", {
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
        return items.map((item)=>({
                id: item.id,
                nom: item.name
            }));
    },
    create: async (nom)=>{
        const response = await fetchAuth("/api/rapports/LI", {
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
        const response = await fetchAuth(`/api/rapports/LI/${id}`, {
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
    delete: async (_id)=>{
        await fetchAuth(`/api/rapports/LI/${_id}`, {
            method: "DELETE"
        });
    }
};
}),
"[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RapportTableEditor",
    ()=>RapportTableEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$form$2f$utils$2f$LigneActiviteEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/rapports/components/form/utils/LigneActiviteEditor.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$services$2f$rapportService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/rapports/services/rapportService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$admin$2f$services$2f$objectifSpecifiqueService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/admin/services/objectifSpecifiqueService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$admin$2f$services$2f$logiqueInterventionService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/admin/services/logiqueInterventionService.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
const RapportTableEditor = ({ rapport, onSuccess, isSupervision = false })=>{
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [objectifSpecifiques, setObjectifSpecifiques] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [logiqueInterventions, setLogiqueInterventions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const isTrimestriel = rapport?.calendrier?.typeCalendrier?.id;
    const isTrim = isTrimestriel === 3 || isTrimestriel === 4;
    const fetchItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            const [OS, LI] = await Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$admin$2f$services$2f$objectifSpecifiqueService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["objectifSpecifiqueService"].getAll(),
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$admin$2f$services$2f$logiqueInterventionService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["logiqueInterventionService"].getAll()
            ]);
            setObjectifSpecifiques(OS);
            setLogiqueInterventions(LI);
        } catch  {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Erreur lors du chargement des objectifs spécifiques");
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Ne charger les listes OS/LI qu'une seule fois si mode trimestriel
        if (isTrim && objectifSpecifiques.length === 0 && logiqueInterventions.length === 0) {
            fetchItems();
        }
    }, [
        fetchItems,
        isTrim,
        objectifSpecifiques.length,
        logiqueInterventions.length
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
    const { register, control, handleSubmit, reset, setValue } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useForm"])({
        defaultValues: {
            lignes: [
                defaultLine
            ]
        }
    });
    const { fields, append, remove } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFieldArray"])({
        control,
        name: "lignes"
    });
    // 3. REMPLISSAGE AUTOMATIQUE ADAPTÉ AU TRIMESTRIEL
    // Pour le trimestriel, on attend que les listes OS/LI soient chargées avant de reset,
    // sinon les selects n'ont pas encore leurs options et la valeur par défaut ne s'applique pas.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!rapport?.activites) return;
        if (!isSupervision) {
            if (isTrim && (objectifSpecifiques.length === 0 || logiqueInterventions.length === 0)) return;
        }
        const formattedData = rapport.activites.map((act)=>({
                titre: act.activite.name,
                effects: act.effects?.length ? act.effects.map((e)=>({
                        value: e.name
                    })) : [
                    {
                        value: ""
                    }
                ],
                impacts: act.impacts?.length ? act.impacts.map((i)=>({
                        value: i.name
                    })) : [
                    {
                        value: ""
                    }
                ],
                produits: act.produits?.length ? act.produits.map((p)=>({
                        value: p.name
                    })) : [
                    {
                        value: ""
                    }
                ],
                cibles: act.cibles?.length ? act.cibles.map((c)=>({
                        value: c.name
                    })) : [
                    {
                        value: ""
                    }
                ],
                previsions: act.previsions?.length ? act.previsions.map((p)=>({
                        value: p.name
                    })) : [
                    {
                        value: ""
                    }
                ],
                realisations: act.realisations?.length ? act.realisations.map((r)=>({
                        value: r.name
                    })) : [
                    {
                        value: ""
                    }
                ],
                taux: act.taux?.length ? act.taux.map((t)=>({
                        value: t.name
                    })) : [
                    {
                        value: ""
                    }
                ],
                observations: act.observations?.length ? act.observations.map((o)=>({
                        value: o.name
                    })) : [
                    {
                        value: ""
                    }
                ]
            }));
        reset({
            lignes: formattedData
        });
    }, [
        rapport,
        reset,
        isTrim,
        objectifSpecifiques,
        logiqueInterventions
    ]);
    // LOGIQUE DE SOUMISSION
    const onSubmit = async (data)=>{
        if (!rapport.id) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("ID rapport manquant");
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
            const dataResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$services$2f$rapportService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rapportService"].updateRapport(rapport.id, payload);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Rapport mis à jour avec succès");
            if (onSuccess) {
                onSuccess(rapport.id, dataResponse);
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(error.message || "Erreur lors de la mise à jour");
        } finally{
            setIsSubmitting(false);
        }
    };
    // 5. CONFIGURATION DES EN-TÊTES ET DE LA GRILLE
    const headers = isTrimestriel === 3 ? [
        "#",
        "Objectif spécifique",
        "Logique d'intervention",
        "Activité",
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
        "Activité",
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit(onSubmit, (errors)=>console.log("Erreurs Formulaire:", errors)),
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overflow-x-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: isTrim ? "min-w-[2100px]" : "min-w-[1000px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `grid ${gridLayout} bg-slate-50/80 border-b border-slate-200 items-stretch`,
                                children: headers.map((header, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `p-4 text-[10px] font-black tracking-widest uppercase flex items-center ${idx === 0 || idx === headers.length - 1 ? "justify-center text-slate-400" : "text-slate-600 border-l border-slate-200/50"}`,
                                        children: header
                                    }, idx, false, {
                                        fileName: "[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx",
                                        lineNumber: 174,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx",
                                lineNumber: 172,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "divide-y divide-slate-100 flex flex-col gap-6 py-4 bg-slate-50/30",
                                children: fields.map((field, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$form$2f$utils$2f$LigneActiviteEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LigneActiviteEditor"], {
                                        control: control,
                                        register: register,
                                        index: index,
                                        remove: remove,
                                        canRemove: fields.length > 1,
                                        isTrimestriel: isTrim,
                                        objectifSpecifiques: objectifSpecifiques,
                                        logiqueInterventions: logiqueInterventions,
                                        setValue: setValue,
                                        gridLayout: gridLayout,
                                        isSupervision: isSupervision
                                    }, field.id, false, {
                                        fileName: "[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx",
                                        lineNumber: 190,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx",
                                lineNumber: 188,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx",
                        lineNumber: 169,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx",
                    lineNumber: 167,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx",
                lineNumber: 166,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>append(defaultLine),
                        className: "w-full py-6 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 hover:border-slate-900 hover:bg-slate-50 transition-all flex flex-col items-center justify-center gap-2 group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-lg",
                                    children: "+"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx",
                                    lineNumber: 218,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx",
                                lineNumber: 217,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-black uppercase tracking-[0.3em]",
                                children: "Ajouter une ligne"
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx",
                                lineNumber: 220,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx",
                        lineNumber: 212,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-end pt-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: isSubmitting,
                            className: "px-10 py-4 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-200",
                            children: isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"
                        }, void 0, false, {
                            fileName: "[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx",
                            lineNumber: 225,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx",
                        lineNumber: 224,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx",
                lineNumber: 210,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx",
        lineNumber: 165,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/features/common/components/ui/AppTableSkeleton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppTableSkeleton",
    ()=>AppTableSkeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
const AppTableSkeleton = ({ rows = 5, cols = 4, className = "" })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm animate-pulse ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                className: "w-full border-collapse",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "bg-slate-50/50 border-b border-slate-100",
                            children: Array.from({
                                length: cols
                            }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-6 py-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        children: Array.from({
                            length: rows
                        }).map((_, rowIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "border-b border-slate-50/80 last:border-0 hover:bg-slate-50/20 transition-colors",
                                children: Array.from({
                                    length: cols
                                }).map((_, colIndex)=>{
                                    // Logique déterministe : on crée une largeur entre 40% et 90% 
                                    // basée sur les index pour éviter le conflit serveur/client.
                                    const widthValue = 40 + (rowIndex * 7 + colIndex * 13) % 51;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-6 py-4 whitespace-nowrap",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
}),
"[project]/src/features/dashboard/components/DashboardTable.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DashboardTable",
    ()=>DashboardTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$form$2f$rapports$2f$RapportTableEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/rapports/components/form/rapports/RapportTableEditor.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$common$2f$components$2f$ui$2f$AppTableSkeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/common/components/ui/AppTableSkeleton.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const DashboardTable = ({ rapports: initialRapports, isLoading, generatingId, onPdfClick, onUpdate })=>{
    // 1. État local pour la liste (permet la mise à jour sans rechargement)
    const [listRapports, setListRapports] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialRapports);
    const [editingRapport, setEditingRapport] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    // Synchroniser si les props changent (ex: filtres ou pagination)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setListRapports(initialRapports);
    }, [
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setEditingRapport(null),
                                className: "p-2 hover:bg-white rounded-full transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-5 h-5",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-black text-slate-900 uppercase",
                                        children: "Modification du rapport"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                                        lineNumber: 75,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$form$2f$rapports$2f$RapportTableEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RapportTableEditor"], {
                    rapport: editingRapport,
                    onSuccess: handleUpdateSuccess
                }, void 0, false, {
                    fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                    lineNumber: 81,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-end gap-3",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm",
        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$common$2f$components$2f$ui$2f$AppTableSkeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AppTableSkeleton"], {
            rows: 5,
            cols: 4
        }, void 0, false, {
            fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
            lineNumber: 99,
            columnNumber: 17
        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "overflow-x-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                className: "w-full text-left border-collapse min-w-[800px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "bg-slate-50/50 border-b border-slate-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-6 py-5 text-[10px] font-black uppercase text-slate-500 tracking-widest",
                                    children: "Période"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                                    lineNumber: 105,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-6 py-5 text-[10px] font-black uppercase text-slate-500 tracking-widest",
                                    children: "Entité"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                                    lineNumber: 106,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-6 py-5 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center",
                                    children: "Statut"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                                    lineNumber: 107,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        className: "divide-y divide-slate-100",
                        children: listRapports.map((rapport)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "hover:bg-slate-50/40 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-6 py-5 border-r border-slate-100",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-6 py-4 border-r border-slate-100",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-6 py-4 border-r border-slate-100 text-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-6 py-4 text-right space-x-2",
                                        children: [
                                            rapport.statut !== "VALIDE" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setEditingRapport(rapport),
                                                className: "px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase rounded-lg hover:bg-slate-700",
                                                children: "Modifier"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/dashboard/components/DashboardTable.tsx",
                                                lineNumber: 134,
                                                columnNumber: 45
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
}),
"[project]/src/features/config/services/periodeService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "periodeService",
    ()=>periodeService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFetchAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useFetchAuth.ts [app-ssr] (ecmascript)");
;
const fetchAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFetchAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFetchAuth"])();
const periodeService = {
    /**
     * Liste les périodes du calendrier depuis le backend Symfony via le proxy Next.js.
     */ getPeriods: async (dateDebut, dateFin)=>{
        try {
            // 1. Construction dynamique de l'URL avec les paramètres
            const params = new URLSearchParams();
            if (dateDebut) params.append("dateDebut", dateDebut);
            if (dateFin) params.append("dateFin", dateFin);
            // Si des paramètres existent, on ajoute '?' à l'URL
            const queryString = params.toString() ? `?${params.toString()}` : "";
            const url = `/api/calendriers${queryString}`;
            const response = await fetchAuth(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                cache: "no-store"
            });
            if (!response.ok) {
                const errorData = await response.json().catch(()=>({}));
                throw new Error(errorData.message || errorData.error || `Erreur serveur: ${response.status}`);
            }
            const responseData = await response.json();
            return responseData.data || responseData;
        } catch (error) {
            throw error;
        }
    },
    getPeriodsUtilisateur: async ()=>{
        try {
            const response = await fetchAuth("/api/calendriers/utilisateur", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                cache: "no-store"
            });
            if (!response.ok) {
                const errorData = await response.json().catch(()=>({}));
                throw new Error(errorData.message || errorData.error || `Erreur serveur: ${response.status}`);
            }
            const responseData = await response.json();
            return responseData.data || responseData;
        } catch (error) {
            // console.error("Erreur getPeriods:", error);
            throw error;
        }
    },
    /**
     * Ajoute une nouvelle période en appelant le backend via le proxy Next.js.
     */ createPeriod: async (dateDebut, dateFin, typeCalendrierId)=>{
        try {
            const response = await fetchAuth("/api/calendriers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    dateDebut,
                    dateFin,
                    typeCalendrierId
                })
            });
            if (!response.ok) {
                const errorData = await response.json().catch(()=>({}));
                throw new Error(errorData.message || errorData.error || `Erreur serveur: ${response.status}`);
            }
            const responseData = await response.json();
            return responseData.data || responseData;
        } catch (error) {
            // console.error("Erreur createPeriod:", error);
            throw error;
        }
    },
    /**
     * Met à jour une période existante.
     */ updateCalendrier: async (id, data)=>{
        try {
            const response = await fetchAuth(`/api/calendriers/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                const errorData = await response.json().catch(()=>({}));
                throw new Error(errorData.message || errorData.error || `Erreur serveur: ${response.status}`);
            }
            const responseData = await response.json();
            return responseData.data || responseData;
        } catch (error) {
            throw error;
        }
    },
    /**
     * Supprime une période par son ID.
     */ deleteCalendrier: async (id)=>{
        try {
            const response = await fetchAuth(`/api/calendriers/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                const errorData = await response.json().catch(()=>({}));
                throw new Error(errorData.message || errorData.error || `Erreur serveur: ${response.status}`);
            }
        } catch (error) {
            throw error;
        }
    },
    /**
     * Récupère la liste des utilisateurs en retard pour un calendrier donné.
     */ getLateUsers: async (idCalendrier)=>{
        try {
            const response = await fetchAuth(`/api/admin/retard?idCalendrier=${idCalendrier}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                cache: "no-store"
            });
            if (!response.ok) {
                const errorData = await response.json().catch(()=>({}));
                throw new Error(errorData.message || errorData.error || `Erreur serveur: ${response.status}`);
            }
            const responseData = await response.json();
            return responseData.data || responseData;
        } catch (error) {
            // console.error("Erreur getLateUsers:", error);
            throw error;
        }
    },
    getCalendrierSupervision: async (date)=>{
        try {
            const response = await fetchAuth(`/api/calendriers/supervision?date=${date}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                cache: "no-store"
            });
            if (!response.ok) {
                const errorData = await response.json().catch(()=>({}));
                throw new Error(errorData.message || errorData.error || `Erreur serveur: ${response.status}`);
            }
            const responseData = await response.json();
            return responseData.data || responseData;
        } catch (error) {
            // console.error("Erreur getCalendrierSupervision:", error);
            throw error;
        }
    }
};
}),
"[project]/src/features/config/hooks/usePeriodes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getByIdCalendrier",
    ()=>getByIdCalendrier,
    "useCalendrierSupervision",
    ()=>useCalendrierSupervision,
    "usePeriodes",
    ()=>usePeriodes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$config$2f$services$2f$periodeService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/config/services/periodeService.ts [app-ssr] (ecmascript)");
;
;
const usePeriodes = (isInsert = false)=>{
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchPeriods = async ()=>{
        setIsLoading(true);
        setError(null);
        try {
            var periods = [];
            if (isInsert) {
                periods = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$config$2f$services$2f$periodeService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["periodeService"].getPeriodsUtilisateur();
            } else {
                periods = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$config$2f$services$2f$periodeService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["periodeService"].getPeriods();
            }
            setData(periods);
        } catch (err) {
            setError(err.message || "Erreur lors du chargement des périodes");
        } finally{
            setIsLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchPeriods();
    }, []);
    const result = {
        data: data,
        isLoading: isLoading,
        error: error,
        refetch: fetchPeriods
    };
    // On retourne l'objet typé
    return result;
};
const useCalendrierSupervision = (date)=>{
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchPeriods = async ()=>{
        setIsLoading(true);
        setError(null);
        try {
            var periods = [];
            periods = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$config$2f$services$2f$periodeService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["periodeService"].getCalendrierSupervision(date);
            setData(periods);
        } catch (err) {
            setError(err.message || "Erreur lors du chargement des périodes");
        } finally{
            setIsLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchPeriods();
    }, [
        date
    ]);
    const result = {
        data: data,
        isLoading: isLoading,
        error: error,
        refetch: fetchPeriods
    };
    // On retourne l'objet typé
    return result;
};
const getByIdCalendrier = (id, CalendrierResult)=>{
    return CalendrierResult.data.find((period)=>period.id === id);
};
}),
"[project]/src/features/dashboard/DashboardPage.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$services$2f$rapportService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/rapports/services/rapportService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$hooks$2f$usePdfExport$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/rapports/hooks/usePdfExport.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$vision$2f$RapportView$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/rapports/components/vision/RapportView.tsx [app-ssr] (ecmascript)");
// Sous-composants
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$dashboard$2f$components$2f$DashboardToolbarProps$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/dashboard/components/DashboardToolbarProps.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$dashboard$2f$components$2f$DashboardTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/dashboard/components/DashboardTable.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$config$2f$hooks$2f$usePeriodes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/config/hooks/usePeriodes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
function DashboardPage() {
    const [rapports, setRapports] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // const [filtered, setFiltered] = useState<ApiRapport[]>([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [selectedPeriodId, setSelectedPeriodId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const { exportToPdf } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$hooks$2f$usePdfExport$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePdfExport"])();
    const [selectedForPdf, setSelectedForPdf] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [generatingId, setGeneratingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const calendrierResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$config$2f$hooks$2f$usePeriodes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePeriodes"])(false);
    const handlePdfClick = async (rapport)=>{
        const idRp = rapport.id !== undefined ? rapport.id : 0;
        const isLandscape = rapport.calendrier?.typeCalendrier?.id === 3 || rapport.calendrier?.typeCalendrier?.id === 4;
        setGeneratingId(idRp);
        setSelectedForPdf(rapport);
        setTimeout(()=>{
            const year = new Date(rapport.calendrier.dateDebut).getFullYear();
            exportToPdf("rapport-a4-container", `Rapport_H${year}_ID${rapport.id}.pdf`, isLandscape).finally(()=>{
                setGeneratingId(null);
                setSelectedForPdf(null);
            });
        }, 500);
    };
    const handleRapportUpdated = (idPrecedent, updatedRapport)=>{
        // On met à jour la liste du parent
        setRapports((prev)=>prev.map((r)=>r.id === idPrecedent ? updatedRapport : r));
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchRapports = async ()=>{
            try {
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$services$2f$rapportService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rapportService"].getRapports();
                setRapports(data);
            // setFiltered(data);
            } catch (err) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error("Erreur lors de la récupération des rapports");
            // console.error("Erreur lors de la récupération des rapports:", err);
            } finally{
                setIsLoading(false);
            }
        };
        fetchRapports();
    }, []);
    // useEffect(() => {
    //     console.log("rapports", rapports);
    //     if (!selectedPeriodId) {
    //         setFiltered(rapports);
    //         return;
    //     }
    //     const filteredData = rapports.filter(r => r.calendrier.id === Number(selectedPeriodId));
    //     setFiltered(filteredData);
    // }, [selectedPeriodId, rapports]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-10 pb-20 px-4 md:px-0 max-w-7xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$dashboard$2f$components$2f$DashboardToolbarProps$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DashboardToolbar"], {
                selectedPeriodId: selectedPeriodId,
                setSelectedPeriodId: setSelectedPeriodId,
                calendrierResult: calendrierResult
            }, void 0, false, {
                fileName: "[project]/src/features/dashboard/DashboardPage.tsx",
                lineNumber: 78,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$dashboard$2f$components$2f$DashboardTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DashboardTable"], {
                rapports: rapports,
                isLoading: isLoading,
                generatingId: generatingId,
                onPdfClick: handlePdfClick,
                onUpdate: handleRapportUpdated
            }, void 0, false, {
                fileName: "[project]/src/features/dashboard/DashboardPage.tsx",
                lineNumber: 85,
                columnNumber: 13
            }, this),
            selectedForPdf && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed left-[-9999px] top-0 pointer-events-none opacity-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    id: "rapport-a4-container",
                    style: {
                        width: "210mm"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$vision$2f$RapportView$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RapportView"], {
                        data: [
                            selectedForPdf
                        ],
                        isPrintMode: true,
                        isLandscape: selectedForPdf.calendrier?.typeCalendrier?.id === 3
                    }, void 0, false, {
                        fileName: "[project]/src/features/dashboard/DashboardPage.tsx",
                        lineNumber: 97,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/features/dashboard/DashboardPage.tsx",
                    lineNumber: 96,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/dashboard/DashboardPage.tsx",
                lineNumber: 95,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/dashboard/DashboardPage.tsx",
        lineNumber: 76,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/app/dashboard/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Dashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$dashboard$2f$DashboardPage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/dashboard/DashboardPage.tsx [app-ssr] (ecmascript)");
"use client";
;
;
function Dashboard() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$dashboard$2f$DashboardPage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 9,
            columnNumber: 17
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/dashboard/page.tsx",
        lineNumber: 8,
        columnNumber: 13
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a6e16fbc._.js.map