"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { adminService } from "@/features/admin/services/adminService";
import { RoleSelect } from "../../config/components/RoleSelect";
import { roleService, Role } from "../../config/services/roleService";
import { User } from "@/features/auth/types";

const userEditSchema = z.object({
    entite: z.string().min(2, "L'entité doit faire au moins 2 caractères"),
    nom: z.string().optional(),
    prenom: z.string().optional(),
    adresse: z.string().optional(),
    email: z.string().email("Adresse email invalide"),
    mdp: z.string().optional(),
    idRole: z.string().min(1, "Veuillez choisir un rôle"),
});

type UserEditFormValues = z.infer<typeof userEditSchema>;

interface UserEditFormProps {
    user: User;
    onSuccess: () => void;
    onCancel: () => void;
}

export const UserEditForm: React.FC<UserEditFormProps> = ({ user, onSuccess, onCancel }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [roles, setRoles] = useState<Role[]>([]);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<UserEditFormValues>({
        resolver: zodResolver(userEditSchema),
        defaultValues: {
            entite: user.entite,
            email: user.email,
            idRole: "",
            nom: user.nom || "",
            prenom: user.prenom || "",
            adresse: user.adresse || "",
            mdp: ""
        }
    });

    useEffect(() => {
        const loadInitialData = async () => {
            if (!user.id) return;
            try {
                // 1. Charger les rôles pour faire le mapping
                const allRoles = await roleService.getAllRoles();
                setRoles(allRoles);

                // 2. Charger les détails complets de l'utilisateur
                const fullUser = await adminService.getUserById(user.id);

                // 3. Trouver l'ID du rôle à partir du nom (fullUser.role)
                const currentRole = allRoles.find(r => r.nom === fullUser.role);

                reset({
                    entite: fullUser.entite,
                    email: fullUser.email,
                    idRole: currentRole ? currentRole.id.toString() : "",
                    nom: fullUser.nom || "",
                    prenom: fullUser.prenom || "",
                    adresse: fullUser.adresse || "",
                    mdp: ""
                });
            } catch (err) {
                console.error("Erreur lors du chargement des données", err);
                setError("Erreur lors du chargement des informations");
            } finally {
                setIsFetching(false);
            }
        };
        loadInitialData();
    }, [user.id, reset]);

    const onSubmit = async (data: UserEditFormValues) => {
        if (!user.id) return;
        setIsLoading(true);
        setError(null);

        // Trouver le NOM du rôle à partir de l'ID sélectionné
        const selectedRole = roles.find(r => r.id.toString() === data.idRole);

        if (!selectedRole) {
            setError("Rôle invalide sélectionné");
            setIsLoading(false);
            return;
        }

        // Payload final avec les champs demandés
        const payload: any = {
            entite: data.entite,
            email: data.email,
            nom: data.nom || null,
            prenom: data.prenom || null,
            adresse: data.adresse || null,
            role: selectedRole.nom // Le backend attend le nom du rôle
        };

        // Si le mdp n'est pas vide, on l'ajoute
        if (data.mdp && data.mdp.trim() !== "") {
            payload.mdp = data.mdp;
        }

        try {
            await adminService.updateUser(user.id, payload);
            onSuccess();
        } catch (err: any) {
            setError(err.message || "Erreur lors de la modification");
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div className="bg-white border border-slate-300 rounded-lg shadow-sm p-8 max-w-2xl w-full flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
            </div>
        );
    }

    return (
        <div className="bg-white border border-slate-300 rounded-lg shadow-sm p-8 max-w-2xl w-full animate-fade-in mx-auto">
            <div className="mb-6 flex justify-between items-start">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Modifier l'Utilisateur</h2>
                    <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-medium">Édition des informations de compte</p>
                </div>
                <div className="px-3 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    ID: {user.id}
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-widest block">Entité</label>
                        <input
                            {...register("entite")}
                            type="text"
                            placeholder="Ex: DSINT"
                            className={`w-full px-3 py-2 border rounded text-sm text-slate-900 placeholder-slate-400 transition-colors outline-none focus:ring-1 focus:ring-slate-900 ${errors.entite ? "border-red-500" : "border-slate-300"}`}
                        />
                        {errors.entite && <p className="text-[10px] text-red-600 font-bold">{errors.entite.message}</p>}
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

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-widest block">Nom</label>
                        <input
                            {...register("nom")}
                            type="text"
                            placeholder="Nom"
                            className="w-full px-3 py-2 border border-slate-300 rounded text-sm text-slate-900 placeholder-slate-400 transition-colors outline-none focus:ring-1 focus:ring-slate-900"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-widest block">Prénom</label>
                        <input
                            {...register("prenom")}
                            type="text"
                            placeholder="Prénom"
                            className="w-full px-3 py-2 border border-slate-300 rounded text-sm text-slate-900 placeholder-slate-400 transition-colors outline-none focus:ring-1 focus:ring-slate-900"
                        />
                    </div>

                    <div className="space-y-1 md:col-span-2">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-widest block">Adresse</label>
                        <textarea
                            {...register("adresse")}
                            placeholder="Adresse physique"
                            rows={2}
                            className="w-full px-3 py-2 border border-slate-300 rounded text-sm text-slate-900 placeholder-slate-400 transition-colors outline-none focus:ring-1 focus:ring-slate-900 resize-none"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-widest block">Mot de passe</label>
                        <input
                            {...register("mdp")}
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-3 py-2 border border-slate-300 rounded text-sm text-slate-900 placeholder-slate-400 transition-colors outline-none focus:ring-1 focus:ring-slate-900"
                        />
                        <p className="text-[10px] text-slate-400 italic">Laisser vide pour ne pas modifier</p>
                    </div>

                    <div className="space-y-1">
                        <RoleSelect
                            value={watch("idRole")}
                            onChange={(val) => {
                                setValue("idRole", val, { shouldValidate: true });
                            }}
                            error={errors.idRole?.message}
                        />
                    </div>
                </div>

                {error && (
                    <div className="p-2 bg-red-50 border border-red-200 rounded text-center">
                        <p className="text-[10px] text-red-700 font-bold">{error}</p>
                    </div>
                )}

                <div className="flex gap-4 pt-4 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 py-3 px-4 border border-slate-300 hover:bg-slate-50 text-slate-600 text-xs font-bold uppercase tracking-widest rounded transition-colors"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 py-3 px-4 bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Enregistrement...
                            </>
                        ) : "Mettre à jour"}
                    </button>
                </div>
            </form>
        </div>
    );
};
