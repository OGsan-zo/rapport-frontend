import React, { useState, useEffect } from "react"; // Ajout de useState
import { SupervisionTableProps } from "@/features/rapports/types/supervision/supervisionType";
import { rapportService } from "@/features/rapports/services/rapportService";

const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
};

const statusClasses: Record<string, string> = {
    VALIDE: "text-green-800 bg-green-50 border border-green-300",
    TRANSMIS: "text-amber-800 bg-amber-50 border border-amber-300",
};
const buttonStatusClasses: Record<string, string> = {
    VALIDE: "bg-red-600 text-white hover:bg-red-700 shadow-red-100", // Rouge pour annuler
    TRANSMIS: "bg-green-600 text-white hover:bg-green-700 shadow-green-100", // Vert pour valider
    DEFAULT: "bg-green-600 text-white hover:bg-green-700"
};

export const SupervisionTable: React.FC<SupervisionTableProps> = ({
    rapports: initialRapports, // On renomme pour l'utiliser comme valeur initiale
    isLoading,
    generatingId,
    onPdfClick
}) => {
    // 1. Créer un état local pour la liste des rapports
    const [listRapports, setListRapports] = useState(initialRapports);
    const [localValidatingId, setLocalValidatingId] = useState<number | null>(null);

    // Mettre à jour la liste locale si les props du parent changent
    useEffect(() => {
        setListRapports(initialRapports);
    }, [initialRapports]);

    // 2. Fonction de mise à jour locale de l'UI
    const updateRapportStatusLocal = (id: number, newStatut: string) => {
        setListRapports(prev => 
            prev.map(r => r.id === id ? { ...r, statut: newStatut } : r)
        );
    };

    const handleValidateInternal = async (id?: number, currentStatut?: string) => {
        try {
            if (!id) return;
            setLocalValidatingId(id);

            // Appel API
            await rapportService.changerValidationRapport(id);
            
            // 3. Changement d'état local selon le statut actuel
            // Si c'était VALIDE -> ça devient TRANSMIS (ou BROUILLON)
            // Si c'était TRANSMIS -> ça devient VALIDE
            const nextStatut = currentStatut === "VALIDE" ? "TRANSMIS" : "VALIDE";
            updateRapportStatusLocal(id, nextStatut);

        } catch (error) {
            console.error("Erreur lors de la modification:", error);
            alert("Une erreur est survenue.");
        } finally {
            setLocalValidatingId(null);
        }
    };

    return (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    {/* ... (thead inchangé) ... */}
                    <tbody className="divide-y divide-slate-100">
                        {isLoading ? (
                            // ... (Skeleton loading)
                            Array(4).fill(0).map((_, i) => <tr key={i}><td colSpan={4}>...</td></tr>)
                        ) : listRapports.length > 0 ? (
                            listRapports.map((rapport) => {
                                // Important : on utilise le statut de notre liste locale
                                const statut = (rapport as any).statut || "TRANSMIS";
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
                                            {/* Le badge change aussi automatiquement ici */}
                                            <span className={`px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full ${statusClasses[statut] || statusClasses.TRANSMIS}`}>
                                                {statut}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right flex justify-end gap-2">
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
                                            <button
                                                onClick={() => onPdfClick(rapport)}
                                                disabled={generatingId === rapport.id}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all shadow-md shadow-slate-200 disabled:opacity-50"
                                            >
                                                {generatingId === rapport.id ? (
                                                    // On utilise exactement le même loader que pour la validation
                                                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    // L'icône oeil normale
                                                    <span>👁️</span>
                                                )}

                                                {/* Le texte change aussi selon l'état du chargement */}
                                                {generatingId === rapport.id ? "Chargement..." : "Consulter"}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            // ... (Empty state)
                            <tr><td colSpan={4} className="py-20 text-center">Aucun rapport trouvé.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};