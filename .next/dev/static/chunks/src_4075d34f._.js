(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/features/rapports/types/rapport.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rapportSchema",
    ()=>rapportSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-client] (ecmascript) <export * as z>");
;
const rapportSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    idCalendrier: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
    lignes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        titre: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Le titre est requis"),
        effects: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
        })),
        impacts: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
        })),
        statut: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        // 👇 Ajoute les nouveaux champs au schéma Zod en optionnel
        produits: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
        })).optional(),
        cibles: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
        })).optional(),
        previsions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
        })).optional(),
        realisations: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
        })).optional(),
        taux: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
        })).optional(),
        observations: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
        })).optional()
    }))
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/rapports/components/form/utils/ToolbarTitle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToolbarTitle",
    ()=>ToolbarTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const ToolbarTitle = ({ title, description })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-black text-slate-900 tracking-tight uppercase",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/form/utils/ToolbarTitle.tsx",
                lineNumber: 6,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
_c = ToolbarTitle;
var _c;
__turbopack_context__.k.register(_c, "ToolbarTitle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/common/components/ui/AppSelect.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppSelect",
    ()=>AppSelect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const AppSelect = ({ label, options, onValueChange, value, isLoading = false, className = "", disabled, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative group ${className}`,
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "absolute -top-2 left-3 px-1.5 bg-white text-[9px] font-bold text-slate-400/80 uppercase tracking-widest z-10 transition-colors group-focus-within:text-blue-500",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/features/common/components/ui/AppSelect.tsx",
                lineNumber: 41,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: value,
                        onChange: (e)=>onValueChange(e.target.value),
                        disabled: disabled || isLoading,
                        className: `
                        w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 
                        text-xs font-semibold text-slate-700 
                        appearance-none cursor-pointer outline-none transition-all duration-200
                        hover:border-slate-300 hover:bg-slate-50/30
                        focus:border-blue-400 focus:ring-4 focus:ring-blue-50/50 
                        disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400
                        shadow-sm
                    `,
                        ...props,
                        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: "",
                            children: "Chargement..."
                        }, void 0, false, {
                            fileName: "[project]/src/features/common/components/ui/AppSelect.tsx",
                            lineNumber: 63,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)) : options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: opt.id,
                                className: "py-2",
                                children: opt.label
                            }, opt.id, false, {
                                fileName: "[project]/src/features/common/components/ui/AppSelect.tsx",
                                lineNumber: 66,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/features/common/components/ui/AppSelect.tsx",
                        lineNumber: 47,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-2",
                        children: [
                            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-3.5 h-3.5 border-2 border-slate-200 border-t-blue-500 rounded-full animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/src/features/common/components/ui/AppSelect.tsx",
                                lineNumber: 76,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                className: `h-4 w-4 text-slate-400 transition-transform duration-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`,
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2.5,
                                    d: "M19 9l-7 7-7-7"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/common/components/ui/AppSelect.tsx",
                                    lineNumber: 85,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/common/components/ui/AppSelect.tsx",
                                lineNumber: 78,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/common/components/ui/AppSelect.tsx",
                        lineNumber: 74,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/common/components/ui/AppSelect.tsx",
                lineNumber: 46,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/common/components/ui/AppSelect.tsx",
        lineNumber: 39,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = AppSelect;
var _c;
__turbopack_context__.k.register(_c, "AppSelect");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/config/components/PeriodeSelect.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PeriodeSelect",
    ()=>PeriodeSelect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$common$2f$components$2f$ui$2f$AppSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/common/components/ui/AppSelect.tsx [app-client] (ecmascript)");
"use client";
;
;
const PeriodeSelect = ({ value, onValueChange, label = "", className = "", calendrierResult, typeCalendrierId })=>{
    const allData = calendrierResult.data;
    const data = typeCalendrierId ? allData.filter((p)=>p.typeCalendrier?.id == typeCalendrierId) : allData;
    const error = calendrierResult.error;
    const isLoading = calendrierResult.isLoading;
    const formatDate = (dateStr)=>{
        try {
            // Gère le format "YYYY-MM-DD HH:mm:ss" ou "YYYY-MM-DD"
            const date = new Date(dateStr.replace(' ', 'T'));
            return date.toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit'
            });
        } catch (e) {
            return dateStr;
        }
    };
    const options = [
        {
            id: "",
            label: "Choisir une période..."
        },
        ...data.map((p)=>({
                id: p.id ?? "",
                label: `Du ${formatDate(p.dateDebut)} au ${formatDate(p.dateFin)}`
            }))
    ];
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `text-xs text-red-500 p-2 border border-red-100 rounded bg-red-50 ${className}`,
            children: [
                "Erreur: ",
                error
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/config/components/PeriodeSelect.tsx",
            lineNumber: 53,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$common$2f$components$2f$ui$2f$AppSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppSelect"], {
        label: label,
        options: options,
        value: value,
        onValueChange: onValueChange,
        isLoading: isLoading,
        className: className
    }, void 0, false, {
        fileName: "[project]/src/features/config/components/PeriodeSelect.tsx",
        lineNumber: 60,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = PeriodeSelect;
var _c;
__turbopack_context__.k.register(_c, "PeriodeSelect");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/config/services/typeCalendrierService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "typeCalendrierService",
    ()=>typeCalendrierService
]);
const typeCalendrierService = {
    /**
     * Récupère la liste des types de calendriers depuis l'API Symfony via le proxy Next.js.
     */ getTypeCalendriers: async ()=>{
        try {
            const response = await fetch("/api/type-calendriers", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                cache: "no-store"
            });
            if (!response.ok) {
                const errorData = await response.json().catch(()=>({}));
                throw new Error(errorData.message || `Erreur serveur: ${response.status}`);
            }
            const responseData = await response.json();
            // On s'attend à ce que Symfony renvoie les données dans un champ 'data' ou directement
            // Selon BaseApiController, c'est souvent dans 'data'
            const data = responseData.data || responseData;
            return data;
        } catch (error) {
            // console.error("Erreur getTypeCalendriers:", error);
            throw error;
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/config/hooks/useTypeCalendriers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTypeCalendriers",
    ()=>useTypeCalendriers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$config$2f$services$2f$typeCalendrierService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/config/services/typeCalendrierService.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useTypeCalendriers() {
    _s();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTypeCalendriers.useEffect": ()=>{
            const fetchTypes = {
                "useTypeCalendriers.useEffect.fetchTypes": async ()=>{
                    try {
                        setIsLoading(true);
                        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$config$2f$services$2f$typeCalendrierService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["typeCalendrierService"].getTypeCalendriers();
                        setData(result);
                        setError(null);
                    } catch (err) {
                        setError(err.message || "Erreur lors du chargement des types de calendriers");
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["useTypeCalendriers.useEffect.fetchTypes"];
            fetchTypes();
        }
    }["useTypeCalendriers.useEffect"], []);
    return {
        data,
        isLoading,
        error
    };
}
_s(useTypeCalendriers, "/iJyIuGohDU8HmiUawlNhy7FaxE=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/config/components/TypeCalendrierSelect.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TypeCalendrierSelect",
    ()=>TypeCalendrierSelect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$common$2f$components$2f$ui$2f$AppSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/common/components/ui/AppSelect.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$config$2f$hooks$2f$useTypeCalendriers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/config/hooks/useTypeCalendriers.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const TypeCalendrierSelect = ({ value, onValueChange, label = "", className = "" })=>{
    _s();
    const { data, isLoading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$config$2f$hooks$2f$useTypeCalendriers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTypeCalendriers"])();
    const options = [
        {
            id: "",
            label: "Choisir un type..."
        },
        ...data.map((type)=>({
                id: type.id ?? "",
                label: type.name
            }))
    ];
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `text-xs text-red-500 p-2 border border-red-100 rounded bg-red-50 ${className}`,
            children: [
                "Erreur: ",
                error
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/config/components/TypeCalendrierSelect.tsx",
            lineNumber: 32,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$common$2f$components$2f$ui$2f$AppSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppSelect"], {
        label: label,
        options: options,
        value: value,
        onValueChange: onValueChange,
        isLoading: isLoading,
        className: className
    }, void 0, false, {
        fileName: "[project]/src/features/config/components/TypeCalendrierSelect.tsx",
        lineNumber: 39,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(TypeCalendrierSelect, "Moj0sgLpnHhNvcLOburC/2C5STk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$config$2f$hooks$2f$useTypeCalendriers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTypeCalendriers"]
    ];
});
_c = TypeCalendrierSelect;
var _c;
__turbopack_context__.k.register(_c, "TypeCalendrierSelect");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/rapports/components/form/utils/ToolbarSelect.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToolbarSelects",
    ()=>ToolbarSelects
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$config$2f$components$2f$PeriodeSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/config/components/PeriodeSelect.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$config$2f$components$2f$TypeCalendrierSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/config/components/TypeCalendrierSelect.tsx [app-client] (ecmascript)");
;
;
;
const ToolbarSelects = ({ selectedTypeId, onTypeChange, periodeValue, onPeriodeChange, calendrierResult })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col lg:flex-row items-stretch lg:items-center gap-4 w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-1 w-full lg:w-auto lg:border-r lg:border-slate-100 lg:pr-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1",
                        children: "Type de calendrier"
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/utils/ToolbarSelect.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$config$2f$components$2f$TypeCalendrierSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TypeCalendrierSelect"], {
                        value: selectedTypeId,
                        onValueChange: onTypeChange,
                        className: "min-w-[200px]"
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/utils/ToolbarSelect.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/rapports/components/form/utils/ToolbarSelect.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-1 w-full lg:w-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1",
                        children: "Période"
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/utils/ToolbarSelect.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$config$2f$components$2f$PeriodeSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PeriodeSelect"], {
                        value: periodeValue,
                        onValueChange: onPeriodeChange,
                        typeCalendrierId: selectedTypeId,
                        calendrierResult: calendrierResult,
                        className: "min-w-[280px]"
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/utils/ToolbarSelect.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/rapports/components/form/utils/ToolbarSelect.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/rapports/components/form/utils/ToolbarSelect.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = ToolbarSelects;
var _c;
__turbopack_context__.k.register(_c, "ToolbarSelects");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/rapports/components/form/rapports/RapportToolbarActions.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RapportToolbarActions",
    ()=>RapportToolbarActions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const RapportToolbarActions = ({ isPdfGenerating, onPreviewPdf, isSubmitting, periodeValue })=>{
    const isPreviewDisabled = isPdfGenerating || !periodeValue;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                disabled: isPreviewDisabled,
                onClick: onPreviewPdf,
                title: !periodeValue ? "Veuillez sélectionner une période" : undefined,
                className: "px-6 py-2.5 bg-white border border-slate-200 text-slate-700 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-50 transition-all disabled:opacity-50",
                children: isPdfGenerating ? "Génération..." : "Aperçu PDF"
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/form/rapports/RapportToolbarActions.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "submit",
                disabled: isSubmitting,
                className: "px-8 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 disabled:opacity-50",
                children: isSubmitting ? "Traitement..." : "Enregistrer"
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/form/rapports/RapportToolbarActions.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/rapports/components/form/rapports/RapportToolbarActions.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = RapportToolbarActions;
var _c;
__turbopack_context__.k.register(_c, "RapportToolbarActions");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/rapports/components/form/rapports/RapportToolbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RapportToolbar",
    ()=>RapportToolbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Imports des sous-composants fraîchement créés
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$form$2f$utils$2f$ToolbarTitle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/rapports/components/form/utils/ToolbarTitle.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$form$2f$utils$2f$ToolbarSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/rapports/components/form/utils/ToolbarSelect.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$form$2f$rapports$2f$RapportToolbarActions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/rapports/components/form/rapports/RapportToolbarActions.tsx [app-client] (ecmascript)");
;
;
;
;
const RapportToolbar = ({ selectedTypeId, onTypeChange, periodeValue, onPeriodeChange, isPdfGenerating, onPreviewPdf, isSubmitting, calendrierResult })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "sticky top-0 bg-white/90 backdrop-blur-md z-30 py-6 mb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-4 sm:px-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$form$2f$utils$2f$ToolbarTitle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToolbarTitle"], {
                title: "Rapport",
                description: "Definition des activités"
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/form/rapports/RapportToolbar.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$form$2f$utils$2f$ToolbarSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToolbarSelects"], {
                        selectedTypeId: selectedTypeId,
                        onTypeChange: onTypeChange,
                        periodeValue: periodeValue,
                        onPeriodeChange: onPeriodeChange,
                        calendrierResult: calendrierResult
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/rapports/RapportToolbar.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$form$2f$rapports$2f$RapportToolbarActions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RapportToolbarActions"], {
                        isPdfGenerating: isPdfGenerating,
                        onPreviewPdf: onPreviewPdf,
                        isSubmitting: isSubmitting,
                        periodeValue: periodeValue
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/rapports/RapportToolbar.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/rapports/components/form/rapports/RapportToolbar.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/rapports/components/form/rapports/RapportToolbar.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = RapportToolbar;
var _c;
__turbopack_context__.k.register(_c, "RapportToolbar");
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
                            isPdf && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: "#000000",
                                    fontWeight: "bold"
                                },
                                children: "•"
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                                lineNumber: 82,
                                columnNumber: 39
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
                            isPdf && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: "#000000",
                                    fontWeight: "bold"
                                },
                                children: "•"
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                                lineNumber: 106,
                                columnNumber: 39
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
                            i === items.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: "#000000",
                                    fontWeight: "bold"
                                },
                                children: " %"
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/vision/sub/RapportTable.tsx",
                                lineNumber: 108,
                                columnNumber: 56
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
"[project]/src/features/config/services/periodeService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "periodeService",
    ()=>periodeService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFetchAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useFetchAuth.ts [app-client] (ecmascript)");
;
const fetchAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFetchAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFetchAuth"])();
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/config/hooks/usePeriodes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getByIdCalendrier",
    ()=>getByIdCalendrier,
    "useCalendrierSupervision",
    ()=>useCalendrierSupervision,
    "usePeriodes",
    ()=>usePeriodes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$config$2f$services$2f$periodeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/config/services/periodeService.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
const usePeriodes = (isInsert = false)=>{
    _s();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchPeriods = async ()=>{
        setIsLoading(true);
        setError(null);
        try {
            var periods = [];
            if (isInsert) {
                periods = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$config$2f$services$2f$periodeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["periodeService"].getPeriodsUtilisateur();
            } else {
                periods = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$config$2f$services$2f$periodeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["periodeService"].getPeriods();
            }
            setData(periods);
        } catch (err) {
            setError(err.message || "Erreur lors du chargement des périodes");
        } finally{
            setIsLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePeriodes.useEffect": ()=>{
            fetchPeriods();
        }
    }["usePeriodes.useEffect"], []);
    const result = {
        data: data,
        isLoading: isLoading,
        error: error,
        refetch: fetchPeriods
    };
    // On retourne l'objet typé
    return result;
};
_s(usePeriodes, "/iJyIuGohDU8HmiUawlNhy7FaxE=");
const useCalendrierSupervision = (date)=>{
    _s1();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchPeriods = async ()=>{
        setIsLoading(true);
        setError(null);
        try {
            var periods = [];
            periods = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$config$2f$services$2f$periodeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["periodeService"].getCalendrierSupervision(date);
            setData(periods);
        } catch (err) {
            setError(err.message || "Erreur lors du chargement des périodes");
        } finally{
            setIsLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCalendrierSupervision.useEffect": ()=>{
            fetchPeriods();
        }
    }["useCalendrierSupervision.useEffect"], [
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
_s1(useCalendrierSupervision, "/iJyIuGohDU8HmiUawlNhy7FaxE=");
const getByIdCalendrier = (id, CalendrierResult)=>{
    return CalendrierResult.data.find((period)=>period.id === id);
};
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
"[project]/src/features/rapports/components/form/LigneActivite.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LigneActivite",
    ()=>LigneActivite
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
const LigneActivite = ({ control, register, index, remove, canRemove, isTrimestriel = false, objectifSpecifiques = [], setValue, gridLayout })=>{
    _s();
    // --- Hooks ---
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
    const { fields: tauxFields, append: appendTaux, remove: removeTaux } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldArray"])({
        control,
        name: `lignes.${index}.taux`
    });
    const { fields: observationsFields, append: appendObservation, remove: removeObservation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldArray"])({
        control,
        name: `lignes.${index}.observations`
    });
    // Ajout par défaut d'une ligne vide si la liste est vide
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LigneActivite.useEffect": ()=>{
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
    }["LigneActivite.useEffect"], [
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
        appendTaux,
        appendObservation
    ]);
    // ... à l'intérieur de votre composant LigneActivite ...
    // Surveiller la sélection de l'objectif spécifique pour remplir automatiquement les autres champs
    const objectifSpecifiqueWatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control,
        name: `lignes.${index}.titre`
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LigneActivite.useEffect": ()=>{
            if (isTrimestriel && objectifSpecifiqueWatch) {
                const selectedObj = objectifSpecifiques.find({
                    "LigneActivite.useEffect.selectedObj": (obj)=>obj.name === objectifSpecifiqueWatch
                }["LigneActivite.useEffect.selectedObj"]);
                if (selectedObj) {
                    // Remplir automatiquement les champs avec les valeurs de l'objectif spécifique
                    setValue(`lignes.${index}.effects.0.value`, selectedObj.li || '');
                    setValue(`lignes.${index}.impacts.0.value`, selectedObj.activitePta || '');
                    setValue(`lignes.${index}.produits.0.value`, selectedObj.produit || '');
                    setValue(`lignes.${index}.cibles.0.value`, selectedObj.cible || '');
                }
            }
        }
    }["LigneActivite.useEffect"], [
        objectifSpecifiqueWatch,
        objectifSpecifiques,
        isTrimestriel,
        setValue,
        index
    ]);
    // On surveille les valeurs des prévisions et réalisations pour cet index précis
    // ... à l'intérieur de votre composant LigneActivite ...
    // On surveille les valeurs des prévisions et réalisations
    const previsionsWatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control,
        name: `lignes.${index}.previsions`
    });
    const realisationsWatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control,
        name: `lignes.${index}.realisations`
    });
    // Fonction pour calculer le taux pour une ligne i donnée
    const calculerTaux = (i)=>{
        const prev = parseFloat(previsionsWatch?.[i]?.value) || 0;
        const real = parseFloat(realisationsWatch?.[i]?.value) || 0;
        if (prev <= 0) return "0.00";
        if (real === 0) {
            return "0.00";
        }
        return (real / prev * 100).toFixed(2);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LigneActivite.useEffect": ()=>{
            tauxFields.forEach({
                "LigneActivite.useEffect": (_, i)=>{
                    const resultatCalcul = calculerTaux(i);
                    // On force la mise à jour INTERNE du formulaire
                    // C'est ce qui permet de récupérer la valeur au submit !
                    setValue(`lignes.${index}.taux.${i}.value`, resultatCalcul);
                }
            }["LigneActivite.useEffect"]);
        }
    }["LigneActivite.useEffect"], [
        previsionsWatch,
        realisationsWatch,
        setValue
    ]);
    // const gridLayout = isTrimestriel
    //   ? "grid-cols-[50px_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_50px]"
    //   : "grid-cols-[70px_1fr_1fr_1fr_70px]";
    const colContainerClass = "border-l border-slate-100 p-4 space-y-3 w-full h-full flex flex-col";
    const itemBoxClass = "flex items-center gap-2 bg-white p-3 border border-slate-200 rounded-lg shadow-sm w-full relative group/item";
    const textAreaClass = "w-full text-sm text-slate-600 bg-transparent border-none focus:ring-0 resize-none min-h-[100px] p-2 placeholder:text-slate-300 text-center placeholder:text-center flex items-center justify-center";
    // Classe ajustée pour le select afin d'éviter le min-h-[100px] qui ferait un select trop grand
    const selectClass = "w-full text-sm text-slate-600 bg-transparent border-none focus:ring-0 p-2 cursor-pointer text-center";
    const inputClass = "w-full text-sm text-slate-600 bg-transparent border-none focus:ring-0 min-h-[100px] p-2 placeholder:text-slate-300 text-center placeholder:text-center flex items-center justify-center";
    const addBtnClass = "w-full py-2 mt-auto border border-dashed border-slate-300 rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all";
    const closeBtnClass = "text-slate-300 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `grid ${gridLayout} ${isTrimestriel ? 'min-w-[2100px]' : 'w-full'} group/row bg-white border border-slate-200 rounded-xl shadow-sm transition-colors hover:border-blue-200 items-stretch overflow-hidden`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center text-xs font-black text-slate-300 bg-slate-50/50",
                children: String(index + 1).padStart(2, '0')
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                lineNumber: 114,
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
                                children: "Objectif spécifique"
                            }, void 0, false, {
                                fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                lineNumber: 126,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            objectifSpecifiques.map((obj)=>// ⚠️ Assure-toi que obj.id et obj.libelle correspondent à ton schéma réel
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: obj.name,
                                    children: obj.name
                                }, obj.id, false, {
                                    fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                    lineNumber: 129,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                        lineNumber: 122,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        ...register(`lignes.${index}.titre`),
                        className: `${textAreaClass} font-bold text-slate-800`,
                        placeholder: "Nom de l'activité..."
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                        lineNumber: 135,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                    lineNumber: 120,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: colContainerClass,
                children: [
                    effectsFields.map((field, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: itemBoxClass,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    ...register(`lignes.${index}.effects.${i}.value`),
                                    className: textAreaClass,
                                    placeholder: isTrimestriel ? "Logique d'intervention" : `Effet ${i + 1}...`
                                }, void 0, false, {
                                    fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                    lineNumber: 148,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                effectsFields.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>removeEffect(i),
                                    className: closeBtnClass,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-4 h-4",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: "2",
                                            d: "M6 18L18 6M6 6l12 12"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                            lineNumber: 156,
                                            columnNumber: 96
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                        lineNumber: 156,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                    lineNumber: 155,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, field.id, true, {
                            fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                            lineNumber: 147,
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
                        fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                        lineNumber: 162,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: colContainerClass,
                children: [
                    impactsFields.map((field, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: itemBoxClass,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    ...register(`lignes.${index}.impacts.${i}.value`),
                                    className: textAreaClass,
                                    placeholder: isTrimestriel ? `Activité suivant le PTA ` : `Impact ${i + 1}...`
                                }, void 0, false, {
                                    fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                    lineNumber: 172,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                impactsFields.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>removeImpact(i),
                                    className: closeBtnClass,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-4 h-4",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: "2",
                                            d: "M6 18L18 6M6 6l12 12"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                            lineNumber: 175,
                                            columnNumber: 96
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                        lineNumber: 175,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                    lineNumber: 174,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, field.id, true, {
                            fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                            lineNumber: 171,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))),
                    !isTrimestriel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>appendImpact({
                                value: ""
                            }),
                        className: addBtnClass,
                        children: "+ impact"
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                        lineNumber: 182,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                lineNumber: 169,
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
                                        className: inputClass,
                                        placeholder: `Produit`,
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                        lineNumber: 195,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    produitsFields.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>removeProduit(i),
                                        className: closeBtnClass,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-4 h-4",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: "2",
                                                d: "M6 18L18 6M6 6l12 12"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                                lineNumber: 198,
                                                columnNumber: 100
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                            lineNumber: 198,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                        lineNumber: 197,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, field.id, true, {
                                fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                lineNumber: 194,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                        lineNumber: 192,
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
                                        className: inputClass,
                                        placeholder: `0`,
                                        min: "1"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                        lineNumber: 210,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    ciblesFields.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>removeCible(i),
                                        className: closeBtnClass,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-4 h-4",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: "2",
                                                d: "M6 18L18 6M6 6l12 12"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                                lineNumber: 213,
                                                columnNumber: 100
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                            lineNumber: 213,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                        lineNumber: 212,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, field.id, true, {
                                fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                lineNumber: 209,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                        lineNumber: 207,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: colContainerClass,
                        children: previsionsFields.map((field, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: itemBoxClass,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    ...register(`lignes.${index}.previsions.${i}.value`),
                                    className: inputClass,
                                    placeholder: "0"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                    lineNumber: 225,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, field.id, false, {
                                fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                lineNumber: 224,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                        lineNumber: 222,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: colContainerClass,
                        children: realisationsFields.map((field, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: itemBoxClass,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    ...register(`lignes.${index}.realisations.${i}.value`),
                                    className: inputClass,
                                    placeholder: "0"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                    lineNumber: 239,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, field.id, false, {
                                fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                lineNumber: 238,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                        lineNumber: 236,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: colContainerClass,
                        children: tauxFields.map((field, i)=>{
                            const valeurTaux = calculerTaux(i);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `${itemBoxClass} bg-slate-50 border-blue-100`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        ...register(`lignes.${index}.taux.${i}.value`),
                                        value: valeurTaux,
                                        // readOnly
                                        className: `${textAreaClass} font-bold text-blue-600 pointer-events-none`
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                        lineNumber: 255,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-bold text-blue-400 absolute right-2 top-1/2 -translate-y-1/2",
                                        children: "%"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                        lineNumber: 262,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, field.id, true, {
                                fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                lineNumber: 254,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0));
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                        lineNumber: 250,
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
                                            fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                            lineNumber: 286,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        observationsFields.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>removeObservation(i),
                                            className: closeBtnClass,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-4 h-4",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: "2",
                                                    d: "M6 18L18 6M6 6l12 12"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                                    lineNumber: 289,
                                                    columnNumber: 100
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                                lineNumber: 289,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                            lineNumber: 288,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, field.id, true, {
                                    fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                    lineNumber: 285,
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
                                fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                                lineNumber: 294,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                        lineNumber: 283,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-l border-slate-100 flex items-center justify-center p-3 bg-slate-50/50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>remove(index),
                    disabled: !canRemove,
                    className: "p-2.5 rounded-full transition-all text-red-300 hover:text-red-600 hover:bg-red-100 disabled:opacity-30 disabled:hover:bg-transparent",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-5 h-5",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "2.5",
                            d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        }, void 0, false, {
                            fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                            lineNumber: 308,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                        lineNumber: 307,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                    lineNumber: 301,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
                lineNumber: 300,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/rapports/components/form/LigneActivite.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(LigneActivite, "gsvEf9Ow37msQtyr1lpqWxrFad4=", false, function() {
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
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"]
    ];
});
_c = LigneActivite;
var _c;
__turbopack_context__.k.register(_c, "LigneActivite");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/rapports/components/form/TableauActivite.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$form$2f$LigneActivite$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/rapports/components/form/LigneActivite.tsx [app-client] (ecmascript)"); // Ajustez le chemin
;
;
const TableauActivites = ({ fields, control, register, remove, isTrimestriel = 0, objectifSpecifiques = [], setValue })=>{
    const isTrim = isTrimestriel === 3 || isTrimestriel === 4;
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
    // 1. CORRECTION DES COLONNES : Distribution optimisée pour le mode trimestriel
    const gridLayout = isTrim ? "grid-cols-[70px_1.5fr_1.5fr_1.5fr_1.5fr_0.8fr_0.8fr_0.8fr_0.8fr_1.5fr_70px]" // Meilleure répartition
     : "grid-cols-[70px_1fr_1fr_1fr_70px]";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                fileName: "[project]/src/features/rapports/components/form/TableauActivite.tsx",
                                lineNumber: 48,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/TableauActivite.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-6 py-4 bg-slate-50/30",
                        children: fields.map((field, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$form$2f$LigneActivite$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LigneActivite"], {
                                control: control,
                                register: register,
                                index: index,
                                remove: remove,
                                isTrimestriel: isTrim,
                                canRemove: fields.length > 1,
                                objectifSpecifiques: objectifSpecifiques,
                                setValue: setValue,
                                gridLayout: gridLayout
                            }, field.id, false, {
                                fileName: "[project]/src/features/rapports/components/form/TableauActivite.tsx",
                                lineNumber: 64,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/TableauActivite.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/rapports/components/form/TableauActivite.tsx",
                lineNumber: 43,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/features/rapports/components/form/TableauActivite.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/features/rapports/components/form/TableauActivite.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = TableauActivites;
const __TURBOPACK__default__export__ = TableauActivites;
var _c;
__turbopack_context__.k.register(_c, "TableauActivites");
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
                name: item.name,
                li: item.li || "",
                activitePta: item.activitePta,
                produit: item.produit,
                cible: item.cible
            }));
    },
    create: async (data)=>{
        const response = await fetchAuth("/api/rapports/OS", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: data.name,
                li: data.li,
                activitePta: data.activitePta,
                produit: data.produit,
                cible: data.cible
            })
        });
        if (!response.ok) {
            const err = await response.json().catch(()=>({}));
            throw new Error(err.message || err.error || `Erreur serveur: ${response.status}`);
        }
        const result = await response.json();
        const item = result.data || result;
        return {
            id: item.id,
            name: item.name,
            li: item.li || "",
            activitePta: item.activitePta,
            produit: item.produit,
            cible: item.cible,
            dateValidation: item.dateValidation || null
        };
    },
    update: async (id, data)=>{
        const response = await fetchAuth(`/api/rapports/OS/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: data.name,
                li: data.li,
                activitePta: data.activitePta,
                produit: data.produit,
                cible: data.cible
            })
        });
        if (!response.ok) {
            const err = await response.json().catch(()=>({}));
            throw new Error(err.message || err.error || `Erreur serveur: ${response.status}`);
        }
        const result = await response.json();
        const item = result.data || result;
        return {
            id: item.id,
            name: item.name,
            li: item.li || "",
            activitePta: item.activitePta,
            produit: item.produit,
            cible: item.cible,
            dateValidation: item.dateValidation || null
        };
    },
    // Pas d'endpoint DELETE dans l'API pour l'instant
    delete: async (_id)=>{
        await fetchAuth(`/api/rapports/OS/${_id}`, {
            method: "DELETE"
        });
    },
    validate: async (id)=>{
        const response = await fetchAuth(`/api/rapports/OS/${id}/validate`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: ""
            })
        });
        const result = await response.json();
        const item = result.data.data;
        return {
            id: item.id,
            name: item.name,
            li: item.li || "",
            activitePta: item.activitePta,
            produit: item.produit,
            cible: item.cible,
            dateValidation: item.dateValidation || null
        };
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/rapports/components/form/RapportForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConsolidationForm",
    ()=>ConsolidationForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@hookform/resolvers/zod/dist/zod.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
// Imports séparés
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$types$2f$rapport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/rapports/types/rapport.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$form$2f$rapports$2f$RapportToolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/rapports/components/form/rapports/RapportToolbar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$vision$2f$RapportView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/rapports/components/vision/RapportView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$hooks$2f$usePdfExport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/rapports/hooks/usePdfExport.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$config$2f$hooks$2f$usePeriodes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/config/hooks/usePeriodes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$contexts$2f$UserContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/contexts/UserContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$services$2f$rapportService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/rapports/services/rapportService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$audioService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/audioService.ts [app-client] (ecmascript)");
// 👇 Import du nouveau composant
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$form$2f$TableauActivite$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/rapports/components/form/TableauActivite.tsx [app-client] (ecmascript)");
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
;
;
;
;
;
;
;
;
;
const ConsolidationForm = ()=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedTypeId, setSelectedTypeId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const { exportToPdf, isGenerating: isPdfGenerating } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$hooks$2f$usePdfExport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePdfExport"])();
    // 👇 MODIFICATION ICI : On vérifie si l'ID sélectionné est "3"
    const isTrimestriel = selectedTypeId === "3" || selectedTypeId === "4";
    const { register, handleSubmit, control, watch, setValue, formState: { errors } } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"])({
        resolver: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["zodResolver"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$types$2f$rapport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rapportSchema"]),
        defaultValues: {
            idCalendrier: undefined,
            lignes: [
                {
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
                    statut: "TERMINE"
                }
            ]
        }
    });
    const [objectifSpecifiques, setObjectifSpecifiques] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [logiqueInterventions, setLogiqueInterventions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { fields, append, remove } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldArray"])({
        control,
        name: "lignes"
    });
    const calendrierResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$config$2f$hooks$2f$usePeriodes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePeriodes"])(true);
    const watchedValues = watch();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$contexts$2f$UserContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"])();
    const rapportPreview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ConsolidationForm.useMemo[rapportPreview]": ()=>{
            const selectedCalendrier = calendrierResult.data?.find({
                "ConsolidationForm.useMemo[rapportPreview]": (c)=>c.id === Number(watchedValues.idCalendrier)
            }["ConsolidationForm.useMemo[rapportPreview]"]);
            return {
                id: 0,
                idCalendrier: Number(watchedValues.idCalendrier),
                // Si selectedCalendrier est undefined, on fournit un objet vide ou par défaut
                calendrier: selectedCalendrier || {
                    id: Number(watchedValues.idCalendrier) || 0,
                    dateDebut: "Non définie",
                    dateFin: "Non définie",
                    typeCalendrier: {
                        id: Number(selectedTypeId) || undefined,
                        name: ""
                    }
                },
                user: user || {
                    id: 0,
                    email: "utilisateur@system.mg",
                    entite: "VOTRE DIRECTION",
                    role: "Admin"
                },
                activites: watchedValues.lignes.map({
                    "ConsolidationForm.useMemo[rapportPreview]": (l)=>({
                            activite: {
                                name: l.titre
                            },
                            effects: l.effects?.filter({
                                "ConsolidationForm.useMemo[rapportPreview]": (e)=>e.value && e.value.trim() !== ""
                            }["ConsolidationForm.useMemo[rapportPreview]"]).map({
                                "ConsolidationForm.useMemo[rapportPreview]": (e)=>({
                                        name: e.value
                                    })
                            }["ConsolidationForm.useMemo[rapportPreview]"]) || [],
                            impacts: l.impacts?.filter({
                                "ConsolidationForm.useMemo[rapportPreview]": (i)=>i.value && i.value.trim() !== ""
                            }["ConsolidationForm.useMemo[rapportPreview]"]).map({
                                "ConsolidationForm.useMemo[rapportPreview]": (i)=>({
                                        name: i.value
                                    })
                            }["ConsolidationForm.useMemo[rapportPreview]"]) || [],
                            produits: l.produits?.filter({
                                "ConsolidationForm.useMemo[rapportPreview]": (p)=>p.value && p.value.trim() !== ""
                            }["ConsolidationForm.useMemo[rapportPreview]"]).map({
                                "ConsolidationForm.useMemo[rapportPreview]": (p)=>({
                                        name: p.value
                                    })
                            }["ConsolidationForm.useMemo[rapportPreview]"]) || [],
                            cibles: l.cibles?.filter({
                                "ConsolidationForm.useMemo[rapportPreview]": (c)=>c.value && c.value.trim() !== ""
                            }["ConsolidationForm.useMemo[rapportPreview]"]).map({
                                "ConsolidationForm.useMemo[rapportPreview]": (c)=>({
                                        name: c.value
                                    })
                            }["ConsolidationForm.useMemo[rapportPreview]"]) || [],
                            previsions: l.previsions?.filter({
                                "ConsolidationForm.useMemo[rapportPreview]": (p)=>p.value && p.value.trim() !== ""
                            }["ConsolidationForm.useMemo[rapportPreview]"]).map({
                                "ConsolidationForm.useMemo[rapportPreview]": (p)=>({
                                        name: p.value
                                    })
                            }["ConsolidationForm.useMemo[rapportPreview]"]) || [],
                            realisations: l.realisations?.filter({
                                "ConsolidationForm.useMemo[rapportPreview]": (r)=>r.value && r.value.trim() !== ""
                            }["ConsolidationForm.useMemo[rapportPreview]"]).map({
                                "ConsolidationForm.useMemo[rapportPreview]": (r)=>({
                                        name: r.value
                                    })
                            }["ConsolidationForm.useMemo[rapportPreview]"]) || [],
                            taux: l.taux?.filter({
                                "ConsolidationForm.useMemo[rapportPreview]": (t)=>t.value && t.value.trim() !== ""
                            }["ConsolidationForm.useMemo[rapportPreview]"]).map({
                                "ConsolidationForm.useMemo[rapportPreview]": (t)=>({
                                        name: t.value
                                    })
                            }["ConsolidationForm.useMemo[rapportPreview]"]) || [],
                            observations: l.observations?.filter({
                                "ConsolidationForm.useMemo[rapportPreview]": (o)=>o.value && o.value.trim() !== ""
                            }["ConsolidationForm.useMemo[rapportPreview]"]).map({
                                "ConsolidationForm.useMemo[rapportPreview]": (o)=>({
                                        name: o.value
                                    })
                            }["ConsolidationForm.useMemo[rapportPreview]"]) || []
                        })
                }["ConsolidationForm.useMemo[rapportPreview]"]),
                statut: "BROUILLON"
            };
        }
    }["ConsolidationForm.useMemo[rapportPreview]"], [
        watchedValues,
        calendrierResult.data,
        user,
        selectedTypeId
    ]);
    const onSubmit = async (data)=>{
        setIsSubmitting(true);
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$services$2f$rapportService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rapportService"].saveRapport(rapportPreview);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Rapport enregistré avec succès !");
            router.push("/dashboard");
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err.message || "Erreur lors de l'enregistrement du rapport.");
        } finally{
            setIsSubmitting(false);
        }
    };
    const fetchItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ConsolidationForm.useCallback[fetchItems]": async ()=>{
            setIsLoading(true);
            try {
                const OS = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$admin$2f$services$2f$objectifSpecifiqueService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["objectifSpecifiqueService"].getAll();
                setObjectifSpecifiques(OS);
            } catch  {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Erreur lors du chargement des objectifs spécifiques");
            } finally{
                setIsLoading(false);
            }
        }
    }["ConsolidationForm.useCallback[fetchItems]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConsolidationForm.useEffect": ()=>{
            // Ne charger les listes OS/LI qu'une seule fois si mode trimestriel
            if (isTrimestriel && objectifSpecifiques.length === 0 && logiqueInterventions.length === 0) {
                fetchItems();
            }
        }
    }["ConsolidationForm.useEffect"], [
        fetchItems,
        isTrimestriel,
        objectifSpecifiques.length,
        logiqueInterventions.length
    ]);
    const onInvalid = (errors)=>{
        const champsManquants = Object.keys(errors).join(", ");
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$audioService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["audioService"].playErrorValidation();
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(`Le formulaire est incomplet. Champs manquants : ${champsManquants}`, {
            duration: 4000,
            position: "top-center"
        });
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-screen",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/form/RapportForm.tsx",
                lineNumber: 143,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/features/rapports/components/form/RapportForm.tsx",
            lineNumber: 142,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit(onSubmit, onInvalid),
        className: "space-y-10 max-w-6xl mx-auto pb-20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$form$2f$rapports$2f$RapportToolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RapportToolbar"], {
                selectedTypeId: selectedTypeId,
                onTypeChange: (val)=>{
                    setSelectedTypeId(val);
                    setValue("idCalendrier", undefined);
                },
                periodeValue: watchedValues.idCalendrier?.toString() || "",
                onPeriodeChange: (val)=>setValue("idCalendrier", Number(val), {
                        shouldValidate: true
                    }),
                isPdfGenerating: isPdfGenerating,
                onPreviewPdf: ()=>exportToPdf("pdf-render-zone", "Apercu_Rapport.pdf", isTrimestriel),
                isSubmitting: isSubmitting,
                calendrierResult: calendrierResult
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/form/RapportForm.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$form$2f$TableauActivite$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                fields: fields,
                control: control,
                register: register,
                remove: remove,
                isTrimestriel: Number(selectedTypeId),
                objectifSpecifiques: objectifSpecifiques,
                setValue: setValue
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/form/RapportForm.tsx",
                lineNumber: 166,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>append({
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
                    }),
                className: "w-full py-10 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 hover:border-slate-900 hover:bg-slate-50 transition-all flex flex-col items-center justify-center gap-2 group",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xl font-light",
                            children: "+"
                        }, void 0, false, {
                            fileName: "[project]/src/features/rapports/components/form/RapportForm.tsx",
                            lineNumber: 191,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/RapportForm.tsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] font-black uppercase tracking-[0.3em]",
                        children: "Ajouter une autre"
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/RapportForm.tsx",
                        lineNumber: 193,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/rapports/components/form/RapportForm.tsx",
                lineNumber: 176,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed left-[-9999px] top-0 pointer-events-none opacity-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    id: "pdf-render-zone",
                    style: {
                        width: isTrimestriel ? "297mm" : "210mm"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$components$2f$vision$2f$RapportView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RapportView"], {
                        data: [
                            rapportPreview
                        ],
                        isPrintMode: true,
                        isLandscape: isTrimestriel
                    }, void 0, false, {
                        fileName: "[project]/src/features/rapports/components/form/RapportForm.tsx",
                        lineNumber: 199,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/rapports/components/form/RapportForm.tsx",
                    lineNumber: 198,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/form/RapportForm.tsx",
                lineNumber: 197,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            Object.keys(errors).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[10px] font-bold uppercase tracking-widest text-center",
                children: "Veuillez remplir tous les champs obligatoires (Titre, Effets, Impacts et Période)."
            }, void 0, false, {
                fileName: "[project]/src/features/rapports/components/form/RapportForm.tsx",
                lineNumber: 204,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/rapports/components/form/RapportForm.tsx",
        lineNumber: 149,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ConsolidationForm, "9wx42/Nkx8eCegqZUDZf72c9PBw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$rapports$2f$hooks$2f$usePdfExport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePdfExport"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldArray"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$config$2f$hooks$2f$usePeriodes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePeriodes"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$contexts$2f$UserContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"]
    ];
});
_c = ConsolidationForm;
var _c;
__turbopack_context__.k.register(_c, "ConsolidationForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_4075d34f._.js.map