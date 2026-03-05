"use client";

import React, { useState, useEffect } from "react";
import { SupervisionTableProps } from "@/features/rapports/types/supervision/supervisionType";
import { ApiRapport } from "@/features/rapports/types";
import { rapportService } from "@/features/rapports/services/rapportService";
import { RapportTableEditor } from "@/features/rapports/components/form/rapports/RapportTableEditor";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AppTableSkeleton } from "@/features/common/components/ui/AppTableSkeleton";

const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
};

const statusClasses: Record<string, string> = {
    VALIDE: "text-green-800 bg-green-50 border border-green-300",
    TRANSMIS: "text-amber-800 bg-amber-50 border border-amber-300",
};

const buttonStatusClasses: Record<string, string> = {
    VALIDE: "bg-red-600 text-white hover:bg-red-700 shadow-red-100",
    TRANSMIS: "bg-green-600 text-white hover:bg-green-700 shadow-green-100",
    DEFAULT: "bg-green-600 text-white hover:bg-green-700"
};

export const SupervisionTable: React.FC<SupervisionTableProps> = ({
    rapports: initialRapports,
    isLoading,
    generatingId,
    onPdfClick,
    onHistoryClick,
    onUpdate
}) => {
    const [listRapports, setListRapports] = useState<ApiRapport[]>(initialRapports);
    const [localValidatingId, setLocalValidatingId] = useState<number | null>(null);
    const [editingRapport, setEditingRapport] = useState<ApiRapport | null>(null);
    const router = useRouter();

    useEffect(() => {
        setListRapports(initialRapports);
    }, [initialRapports]);

    // --- LOGIQUE DE MISE À JOUR LOCALE ---
    const handleUpdateSuccess = (idPrecedent: number, updatedRapport: ApiRapport) => {
        // 1. Mise à jour locale (pour l'affichage immédiat)
        setListRapports(prev =>
            prev.map(r => r.id === idPrecedent ? updatedRapport : r)
        );

        // 2. Notification du parent
        if (onUpdate) {
            onUpdate(idPrecedent, updatedRapport);
        }

        setEditingRapport(null);
        // Optionnel : router.refresh() si vous voulez forcer Next.js à resynchroniser le serveur
        router.refresh();
    };

    const handleValidateInternal = async (id?: number, currentStatut?: string) => {
        try {
            if (!id) return;
            setLocalValidatingId(id);
            await rapportService.changerValidationRapport(id);
            const nextStatut = currentStatut === "VALIDE" ? "TRANSMIS" : "VALIDE";
            setListRapports(prev =>
                prev.map(r => r.id === id ? { ...r, statut: nextStatut } : r)
            );
            // toast.success(`Statut mis à jour : ${nextStatut}`);
        } catch (error: any) {
            toast.error(error.message || "Une erreur est survenue lors de la validation.");
        } finally {
            setLocalValidatingId(null);
        }
    };

    // --- VUE ÉDITION ---
    if (editingRapport) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <button onClick={() => setEditingRapport(null)} className="p-2 hover:bg-white rounded-full transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div>
                        <h3 className="text-sm font-black text-slate-900 uppercase">Édition Supervision</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{editingRapport.user?.entite}</p>
                    </div>
                </div>

                <RapportTableEditor
                    rapport={editingRapport}
                    onSuccess={handleUpdateSuccess}
                />

                <button onClick={() => setEditingRapport(null)} className="text-xs font-black uppercase text-slate-400 hover:text-slate-600">
                    Annuler l'édition
                </button>
            </div>
        );
    }

    // --- VUE TABLEAU ---
    return (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            {isLoading ? (
                <AppTableSkeleton rows={6} cols={4} />
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Entité</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Période</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Statut</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {listRapports.length > 0 ? (
                                listRapports.map((rapport: ApiRapport) => {
                                    const statut = (rapport as any).statut || "EN COURS";
                                    const isValide = statut === "VALIDE";
                                    const dynamicButtonClass = buttonStatusClasses[statut] || buttonStatusClasses.DEFAULT;

                                    return (
                                        <tr key={rapport.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-5">
                                                <div className="text-sm font-bold text-slate-900 uppercase">{rapport.user?.entite}</div>
                                                <div className="text-[10px] text-slate-400">{rapport.user?.email}</div>
                                            </td>
                                            <td className="px-6 py-5 text-xs text-slate-500 italic">
                                                Du {formatDate(rapport.calendrier?.dateDebut)} au {formatDate(rapport.calendrier?.dateFin)}
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className={`px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full ${statusClasses[statut] || statusClasses.TRANSMIS}`}>
                                                    {statut}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-right flex justify-end gap-2">
                                                {/* On affiche le bouton Modifier SEULEMENT si le rapport n'est pas valide */}
                                                {!isValide && (
                                                    <button
                                                        onClick={() => setEditingRapport(rapport)}
                                                        className="p-2 bg-slate-100 text-slate-600 hover:bg-slate-900 hover:text-white rounded-lg transition-all"
                                                        title="Modifier le contenu"
                                                    >
                                                        ✏️
                                                    </button>
                                                )}

                                                {/* Le reste des boutons reste inchangé */}
                                                <button
                                                    onClick={() => handleValidateInternal(rapport.id, statut)}
                                                    disabled={localValidatingId === rapport.id}
                                                    className={`inline-flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all shadow-md disabled:opacity-70 ${dynamicButtonClass}`}
                                                >
                                                    {localValidatingId === rapport.id ? (
                                                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    ) : (
                                                        <span>{isValide ? "✖" : "✅"}</span>
                                                    )}
                                                    {isValide ? "Annuler" : "Valider"}
                                                </button>
                                                
                                                {/* ... boutons PDF et Historique */}
                                                <button
                                                    onClick={() => onHistoryClick(rapport)}
                                                    className="p-2 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg transition-all"
                                                    title="Voir l'historique"
                                                >
                                                    🕒
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr><td colSpan={4} className="py-20 text-center text-slate-400 uppercase text-[10px] font-black">Aucun rapport.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};