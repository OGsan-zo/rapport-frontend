import React from "react";
import { SupervisionTableProps } from "@/features/rapports/types/supervision/supervisionType";

const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
};

const statusClasses: Record<string, string> = {
    VALIDE: "text-green-800 bg-green-50 border border-green-300",
    TRANSMIS: "text-blue-800 bg-blue-50 border border-blue-300",
    BROUILLON: "text-amber-800 bg-amber-50 border border-amber-300",
};

export const SupervisionTable: React.FC<SupervisionTableProps> = ({
    rapports,
    isLoading,
    generatingId,
    onPdfClick
}) => {
    return (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-200">
                            <th className="px-6 py-5 text-[10px] font-bold uppercase text-slate-500 tracking-wider">Entité Émettrice</th>
                            <th className="px-6 py-5 text-[10px] font-bold uppercase text-slate-500 tracking-wider">Période</th>
                            <th className="px-6 py-5 text-[10px] font-bold uppercase text-slate-500 tracking-wider text-center">État</th>
                            <th className="px-6 py-5 text-[10px] font-bold uppercase text-slate-500 tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {isLoading ? (
                            Array(4).fill(0).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td colSpan={4} className="px-6 py-6"><div className="h-4 bg-slate-50 w-3/4 rounded" /></td>
                                </tr>
                            ))
                        ) : rapports.length > 0 ? (
                            rapports.map((rapport) => {
                                const statut = (rapport as any).statut || "TRANSMIS";

                                return (
                                    <tr key={rapport.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="text-sm font-bold text-slate-900 uppercase">{rapport.user?.entite}</div>
                                            <div className="text-[10px] text-slate-400 lowercase">{rapport.user?.email}</div>
                                        </td>
                                        <td className="px-6 py-5 text-xs text-slate-500 italic">
                                            Du {formatDate(rapport.calendrier?.dateDebut)} au {formatDate(rapport.calendrier?.dateFin)}
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <span className={`px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full ${statusClasses[statut] || statusClasses.TRANSMIS}`}>
                                                {statut}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button
                                                onClick={() => onPdfClick(rapport)}
                                                disabled={generatingId === rapport.id}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all shadow-md shadow-slate-200 disabled:opacity-50"
                                            >
                                                {generatingId === rapport.id ? (
                                                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <span>👁️</span>
                                                )}
                                                Consulter
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={4} className="py-20 text-center text-slate-400 text-[10px] font-medium uppercase tracking-widest">
                                    Aucun rapport trouvé.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};