module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/getServerAxios.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getServerAxios",
    ()=>getServerAxios
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-route] (ecmascript)");
;
function getServerAxios(request) {
    const token = request.cookies.get("auth_token")?.value;
    const serverApi = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].create({
        baseURL: ("TURBOPACK compile-time value", "http://localhost:8000"),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            ...token ? {
                Authorization: `Bearer ${token}`
            } : {}
        }
    });
    //   serverApi.interceptors.response.use(
    //   (response) => response,
    //   (error: unknown) => {
    //     if (axios.isAxiosError(error)) {
    //       if (error.response && (error.response.status === 401 || error.response.status === 403)) {
    //         return Promise.reject(new Error("UNAUTHORIZED"));
    //       }
    //     }
    //     return Promise.reject(error);
    //   }
    // );
    return serverApi;
}
}),
"[project]/src/lib/callApi.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "callApiDelete",
    ()=>callApiDelete,
    "callApiGet",
    ()=>callApiGet,
    "callApiPost",
    ()=>callApiPost,
    "callApiPut",
    ()=>callApiPut
]);
// lib/apiHandler.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$getServerAxios$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/getServerAxios.ts [app-route] (ecmascript)");
;
;
;
async function callApiGet(request, url, allowedParams = []) {
    try {
        const api = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$getServerAxios$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServerAxios"])(request);
        const { searchParams } = new URL(request.url);
        const queryParams = {};
        // Générer automatiquement les paramètres autorisés
        allowedParams.forEach((key)=>{
            const value = searchParams.get(key);
            if (value) queryParams[key] = value;
        });
        const response = await api.get(url, {
            params: queryParams
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(response.data);
    } catch (err) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].isAxiosError(err)) {
            if (err.response) {
                const status = err.response.status || 500;
                const data = err.response.data || {};
                const msg = data.message || data.error || (typeof data === "string" ? data : JSON.stringify(data)) || "Erreur interne lors de l'appel au service";
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: msg
                }, {
                    status
                });
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: err.message || "Erreur de connexion au service backend."
            }, {
                status: 503
            });
        }
        // console.error("Erreur inconnue :", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Erreur interne inconnue du serveur"
        }, {
            status: 500
        });
    }
}
async function callApiPost(request, url, requiredFields = [], isFormData = false // 👈 nouvel argument
) {
    try {
        const api = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$getServerAxios$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServerAxios"])(request);
        let body;
        const missingFields = [];
        if (isFormData) {
            // ✅ Si FormData
            const formData = await request.formData();
            body = formData;
            for (const field of requiredFields){
                const value = formData.get(field);
                if (value === null || value === undefined || value === "") {
                    missingFields.push(field);
                }
            }
        } else {
            // ✅ Si JSON (comportement normal)
            body = await request.json();
            for (const field of requiredFields){
                if (body[field] === undefined || body[field] === null || body[field] === "") {
                    missingFields.push(field);
                }
            }
        }
        if (missingFields.length > 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                status: "error",
                message: "Champs requis manquants ou vide : " + missingFields.join(", "),
                error: "Champs requis manquants ou vide : " + missingFields.join(", "),
                missingFields
            }, {
                status: 400
            });
        }
        // 🚀 Envoi vers backend
        const response = await api.post(url, body, {
            headers: isFormData ? {
                "Content-Type": "multipart/form-data"
            } : {
                "Content-Type": "application/json"
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(response.data, {
            status: 201
        });
    } catch (err) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].isAxiosError(err)) {
            const msg = err.response?.data?.error || err.response?.data?.message || err.message;
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: msg
            }, {
                status: err.response?.status || 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Erreur interne inconnue du serveur"
        }, {
            status: 500
        });
    }
}
async function callApiPut(request, url, requiredFields = []) {
    try {
        const api = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$getServerAxios$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServerAxios"])(request);
        const body = await request.json();
        const missingFields = [];
        // Vérification des champs requis
        for (const field of requiredFields){
            if (body[field] === undefined || body[field] === null || body[field] === "") {
                missingFields.push(field);
            }
        }
        if (missingFields.length > 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                status: "error",
                message: "Champs requis manquants : " + missingFields.join(", "),
                error: "Champs requis manquants : " + missingFields.join(", "),
                missingFields
            }, {
                status: 400
            });
        }
        // Body envoyé tel quel
        const response = await api.put(url, body, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Créé avec succès",
            data: response.data
        }, {
            status: 201
        });
    } catch (err) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].isAxiosError(err)) {
            const msg = err.response?.data?.error || err.response?.data?.message || err.message;
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: msg
            }, {
                status: err.response?.status || 500
            });
        }
        console.error("Erreur inconnue sur l'api put:", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Erreur interne inconnue du serveur"
        }, {
            status: 500
        });
    }
}
async function callApiDelete(request, url// Ici, tu passeras l'url complète, ex: "/rapports/1"
) {
    try {
        const api = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$getServerAxios$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServerAxios"])(request);
        // Appel direct sans params ni body
        const response = await api.delete(url);
        // Retourne les données ou un message de succès par défaut
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(response.data || {
            message: "Supprimé avec succès"
        }, {
            status: response.status || 200
        });
    } catch (err) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].isAxiosError(err)) {
            const msg = err.response?.data?.error || err.response?.data?.message || err.message || "Erreur lors de la suppression";
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: msg
            }, {
                status: err.response?.status || 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Erreur interne inconnue du serveur"
        }, {
            status: 500
        });
    }
}
}),
"[project]/src/app/api/rapports/LI/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$callApi$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/callApi.ts [app-route] (ecmascript)");
;
async function GET(request) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$callApi$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["callApiGet"])(request, "rapports/LI");
}
async function POST(request) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$callApi$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["callApiPost"])(request, "rapports/LI", [
        "name"
    ]);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f348083c._.js.map