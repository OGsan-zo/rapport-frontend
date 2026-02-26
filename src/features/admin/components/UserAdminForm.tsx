"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authService } from "@/features/auth/services/authService";

const userAdminSchema = z.object({
    nom: z.string().min(2, "Le nom doit faire au moins 2 caractères"),
    email: z.string().email("Adresse email invalide"),
    password: z.string().min(6, "6 caractères minimum"),
    role: z.enum(["USER", "MANAGER", "DIRECTEUR", "ADMIN"]),
});

type UserAdminFormValues = z.infer<typeof userAdminSchema>;

interface UserAdminFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export const UserAdminForm: React.FC<UserAdminFormProps> = ({ onSuccess, onCancel }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserAdminFormValues>({
        resolver: zodResolver(userAdminSchema),
        defaultValues: {
            role: "USER"
        }
    });

    const onSubmit = async (data: UserAdminFormValues) => {
        setIsLoading(true);
        setError(null);
        try {
            await authService.createUser(data);
            onSuccess();
        } catch (err: any) {
            setError(err.message || "Erreur lors de la création");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white border border-slate-300 rounded-lg shadow-sm p-8 max-w-sm w-full animate-fade-in">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Nouvel Utilisateur</h2>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-medium">Administration système</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-widest block">Nom complet</label>
                    <input
                        {...register("nom")}
                        type="text"
                        placeholder="Ex: Jean Paul"
                        className={`w-full px-3 py-2 border rounded text-sm text-slate-900 placeholder-slate-400 transition-colors outline-none focus:ring-1 focus:ring-slate-900 ${errors.nom ? "border-red-500" : "border-slate-300"}`}
                    />
                    {errors.nom && <p className="text-[10px] text-red-600 font-bold">{errors.nom.message}</p>}
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-widest block">Email</label>
                    <input
                        {...register("email")}
                        type="email"
                        placeholder="votre@email.com"
                        className={`w-full px-3 py-2 border rounded text-sm text-slate-900 placeholder-slate-400 transition-colors outline-none focus:ring-1 focus:ring-slate-900 ${errors.email ? "border-red-500" : "border-slate-300"}`}
                    />
                    {errors.email && <p className="text-[10px] text-red-600 font-bold">{errors.email.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-widest block">Mot de passe</label>
                        <input
                            {...register("password")}
                            type="password"
                            placeholder="••••••••"
                            className={`w-full px-3 py-2 border rounded text-sm text-slate-900 placeholder-slate-400 transition-colors outline-none focus:ring-1 focus:ring-slate-900 ${errors.password ? "border-red-500" : "border-slate-300"}`}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-widest block">Rôle</label>
                        <select
                            {...register("role")}
                            className="w-full px-3 py-2 border border-slate-300 rounded text-sm text-slate-900 bg-white outline-none focus:ring-1 focus:ring-slate-900 appearance-none"
                            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2394a3b8\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '0.8em' }}
                        >
                            <option value="USER">USER</option>
                            <option value="MANAGER">MANAGER</option>
                            <option value="DIRECTEUR">DIRECTEUR</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>
                </div>

                {error && (
                    <div className="p-2 bg-red-50 border border-red-200 rounded text-center">
                        <p className="text-[10px] text-red-700 font-bold">{error}</p>
                    </div>
                )}

                <div className="flex gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 py-2.5 px-4 border border-slate-300 hover:bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-widest rounded transition-colors"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 py-2.5 px-4 bg-slate-900 hover:bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded transition-colors disabled:opacity-50"
                    >
                        {isLoading ? "Envoi..." : "Créer"}
                    </button>
                </div>
            </form>
        </div>
    );
};
