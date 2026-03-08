"use client";

import React, { useState, useEffect } from "react";
import { PeriodForm } from "@/features/admin/components/period/PeriodForm";
import { User } from "@/features/auth/types";
import { useRouter } from "next/navigation";
import { authService } from "@/features/auth/services/authService";


export default function PeriodsPage() {
      const [user, setUser] = useState<User | null>(null);
                // const [loading, setLoading] = useState(true);
                const [authChecked, setAuthChecked] = useState(false);
                const router = useRouter();
                const login = process.env.NEXT_PUBLIC_LOGIN_URL || '/login';
            
                useEffect(() => {
                    if (!authChecked) {
                        checkAuth();
                        setAuthChecked(true);
                    }
                }, [authChecked]);
            
                const checkAuth = async () => {
                    try {
                        const user = await authService.checkAuth();
                        setUser(user);
                        if (user.role !== "Admin" && user.role !== "Supervisor") {
                            authService.logout();
                            router.push(login);
                        }
                        } catch (err) {
                        authService.logout();
                        router.push(login);
                    } finally {
                        setAuthChecked(true);
                        // setLoading(false);
                    }
                };
    return (
        <main className="p-6 lg:p-10 max-w-7xl mx-auto">
            <PeriodForm />
        </main>
    );
}
