import React from "react";
import { AppTableSkeleton } from "@/features/common/components/ui/AppTableSkeleton";
import { ObjectifSpecifique } from "@/features/admin/type/objectifSpecifique/objectifSpecifiqueSchema";

interface ObjectifSpecifiqueListProps {
    items: ObjectifSpecifique[];
    isLoading: boolean;
    onEdit: (item: ObjectifSpecifique) => void;
    onDelete: (id: number) => void;
    onValidate: (id: number) => void;
}

export const ObjectifSpecifiqueList = ({ items, isLoading, onEdit, onDelete, onValidate }: ObjectifSpecifiqueListProps) => {
    return (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto overflow-y-auto max-h-[500px]">
                <table className="w-full border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
                        <tr>
                            <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 text-left">Objectifs spécifiques</th>
                            <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 text-left">Logique d'intervention</th>
                            <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 text-left">Activité PTA</th>
                            <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 text-left">Produit</th>
                            <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 text-left">Cible</th>
                            <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {isLoading ? (
                            <tr><td colSpan={2}><AppTableSkeleton rows={5} cols={2} /></td></tr>
                        ) : items.length > 0 ? (
                            items.map((item) => (
                                <tr key={item.id} className={`transition-colors ${item.dateValidation ? 'bg-white text-slate-700' : 'bg-amber-50 text-amber-900 border-l-4 border-l-amber-500'}`}>
                                    <td className="p-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className={`h-2 w-2 rounded-full shrink-0 ${item.dateValidation ? 'bg-emerald-500' : 'bg-slate-500'}`} />
                                            <span className="flex-1 font-medium">{item.name}</span>
                                            {item.dateValidation ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Valide
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-amber-200 text-amber-800">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-amber-600"></span>
                                                    Déjà utilisé
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm">
                                        {item.li}
                                    </td>
                                    <td className="p-4 text-sm">
                                        {item.activitePta}
                                    </td>
                                    <td className="p-4 text-sm">
                                        {item.produit}
                                    </td>
                                    <td className="p-4 text-sm">
                                        {item.cible}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <button
                                                onClick={() => onEdit(item)}
                                                className="text-slate-400 hover:text-blue-600 transition-colors p-1.5 rounded-lg hover:bg-blue-50"
                                                title="Modifier"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => onDelete(item.id)}
                                                className="text-slate-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50"
                                                title="Supprimer"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => onValidate(item.id)}
    
                                                className={`transition-colors p-1.5 rounded-lg ${item.dateValidation ? 'text-emerald-200 bg-emerald-700 cursor-not-allowed' : 'text-slate-400 hover:text-green-500 hover:bg-green-50'}`}
                                                title={item.dateValidation ? "Déjà validé" : "Valider"}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan={2} className="p-12 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">Aucun objectif spécifique trouvé</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
