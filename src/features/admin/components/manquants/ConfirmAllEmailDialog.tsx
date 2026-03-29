import React from 'react';
import { User } from "@/features/auth/types";
import { CalendarPeriod } from "@/features/rapports/types/calendrier/calendrierType";

interface ConfirmAllEmailDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    users: User[];
    calendrierPeriod: CalendarPeriod;
}

export const ConfirmAllEmailDialog: React.FC<ConfirmAllEmailDialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    users,
    calendrierPeriod
}) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4 transform transition-all">
                {/* Header */}
                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-6 rounded-t-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                            <span className="text-2xl">📢</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">Envoi groupé d'emails</h3>
                            <p className="text-red-100 text-sm">Email de rappel de rapport - {calendrierPeriod.typeCalendrier?.name || 'Calendrier'}</p>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-sm text-red-800 font-medium mb-3">
                            Voulez-vous vraiment envoyer un email de rappel à tous les utilisateurs ({users.length}) :
                        </p>
                        <div className="max-h-40 overflow-y-auto space-y-2">
                            {users.map((user, index) => (
                                <div key={user.id} className="flex items-center gap-2 text-sm">
                                    <span className="text-red-600 font-semibold text-xs">{index + 1}.</span>
                                    <span className="text-gray-700 font-medium">{user.entite}</span>
                                    <span className="text-gray-500 text-xs">({user.email})</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-xs text-blue-800">
                            <span className="font-semibold">Période concernée :</span> {calendrierPeriod.typeCalendrier?.name || 'Calendrier'} du {new Date(calendrierPeriod.dateFin).toLocaleDateString('fr-FR')}
                        </p>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <p className="text-xs text-amber-800">
                            <span className="font-semibold">Attention :</span> Cette action enverra un email à {users.length} utilisateur(s). Cette opération est irréversible.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 rounded-b-xl flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium text-sm transition-colors"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
                    >
                        <span>📧</span>
                        Envoyer à tous ({users.length})
                    </button>
                </div>
            </div>
        </div>
    );
};
