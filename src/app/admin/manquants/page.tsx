"use client";

import React, { useEffect } from "react";
import { MissingUsers } from "@/features/admin/components/MissingUsers";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { useRouter } from "next/navigation";

export default function MissingUsersPage() {
    const user = useCurrentUser();
    const router = useRouter();

    useEffect(() => {
        if (user && user.role !== "ADMIN" && user.role !== "DIRECTEUR") {
            router.push("/dashboard");
        }
    }, [user, router]);

    if (!user || (user.role !== "ADMIN" && user.role !== "DIRECTEUR")) {
        return null;
    }

    return (
        <main className="p-6 lg:p-10 max-w-7xl mx-auto">
            <MissingUsers />
        </main>
    );
}
