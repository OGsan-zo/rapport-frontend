import React, { useMemo, useEffect } from "react";
import Link from "next/link";
import { IMAGES } from "@/features/common/constants";
import { usePathname } from "next/navigation";
import { useUser } from "@/features/auth/contexts/UserContext";

interface MenuItem {
    label: string;
    href: string;
    roles: string[];
    section: "Navigation" | "Pilotage" | "Administration";
    icon?: React.ReactNode;
}

const ALL_LINKS: MenuItem[] = [
    { label: "Dashboard", href: "/dashboard", roles: ["Admin", "Utilisateur"], section: "Navigation" },
    { label: "Nouveau", href: "/dashboard/nouveau", roles: ["Admin", "Utilisateur"], section: "Navigation" },
    { label: "Supervision", href: "/admin/supervision", roles: ["Admin"], section: "Pilotage" },
    { label: "Stats", href: "/admin/dashboard", roles: ["Admin"], section: "Administration" },
    { label: "Périodes", href: "/admin/periodes", roles: ["Admin"], section: "Administration" },
    {
        label: "Utilisateurs",
        href: "/admin/utilisateurs",
        roles: ["Admin"],
        section: "Administration",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        )
    },
];

const UserBadgeSkeleton = () => (
    <div className="px-8 py-4 animate-pulse">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="h-10 w-10 rounded-full bg-slate-200" />
            <div className="flex-1 space-y-2">
                <div className="h-3 bg-slate-200 rounded w-24" />
                <div className="h-2 bg-slate-100 rounded w-16" />
            </div>
        </div>
    </div>
);

const UserBadge = ({ user }: { user: any }) => (
    <div className="px-8 py-4 transition-all duration-500 ease-out translate-y-0 opacity-100">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-colors group">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors uppercase">
                {user.email.substring(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
                <h2 className="text-[11px] font-bold text-slate-900 truncate uppercase tracking-wider">
                    {user.email.split('@')[0]}
                </h2>
                <p className="text-[9px] font-medium text-slate-400 truncate uppercase tracking-widest mt-0.5">
                    {user.role} — {user.entite}
                </p>
            </div>
        </div>
    </div>
);

const NavSkeleton = () => (
    <div className="px-8 space-y-4 animate-pulse mt-6">
        <div className="h-2 bg-slate-100 rounded w-12 mb-6" />
        <div className="space-y-3">
            {[1, 2, 3].map(i => (
                <div key={i} className="h-8 bg-slate-50 rounded-lg w-full" />
            ))}
        </div>
    </div>
);

export const Sidebar: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
    const { user, loading } = useUser();
    const pathname = usePathname();

    // Surveillance du changement d'utilisateur (pour log ou triggers spécifiques)
    useEffect(() => {
        // console.log("Sidebar: User/Role changed", user?.role);
    }, [user]);

    // Filtrage dynamique des liens via useMemo
    const menuItems = useMemo(() => {
        if (!user) return [];
        return ALL_LINKS.filter(link => link.roles.includes(user.role));
    }, [user]);

    const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

    const linkClass = (href: string) =>
        `flex items-center gap-3 px-8 py-2.5 text-[11px] font-medium uppercase tracking-widest transition-all ${isActive(href)
            ? "text-blue-600 bg-blue-50/50 border-r-2 border-blue-500"
            : "text-slate-500 hover:text-slate-900 border-r-2 border-transparent hover:bg-slate-50"
        }`;

    const renderSection = (section: MenuItem["section"], title: string) => {
        const items = menuItems.filter(item => item.section === section);
        if (items.length === 0) return null;

        return (
            <div className={section !== "Navigation" ? "mt-8" : "mb-2"}>
                <div className="px-8 mb-3">
                    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em]">{title}</span>
                </div>
                {items.map(item => (
                    <Link key={item.href} href={item.href} className={linkClass(item.href)}>
                        {item.icon}
                        {item.label}
                    </Link>
                ))}
            </div>
        );
    };

    return (
        <aside className="w-[240px] h-screen bg-white border-r border-slate-100 flex flex-col sticky top-0 z-50 transition-all shadow-sm">
            {/* Mobile close button */}
            {onClose && (
                <div className="flex justify-end px-4 pt-4 lg:hidden">
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-md text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        aria-label="Fermer le menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            <div className="px-8 py-8 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <img src={IMAGES.LOGO_REPOBLIKA} alt="Logo" className="h-8 w-auto mix-blend-multiply" />
                    <div className="h-6 w-[1px] bg-slate-200" />
                    <img src={IMAGES.LOGO_MESUPRES} alt="Logo" className="h-8 w-auto mix-blend-multiply" />
                </div>
                <div>
                    <h1 className="text-[11px] font-bold text-slate-900 tracking-[0.2em] uppercase leading-tight">
                        Rapport d&apos;Activités
                    </h1>
                    <p className="text-[9px] font-medium text-slate-400 uppercase tracking-widest mt-1">
                        ESPA / DSINT
                    </p>
                </div>
            </div>

            {/* User Badge / Skeleton (Étape 1) */}
            {loading ? <UserBadgeSkeleton /> : (user && <UserBadge user={user} />)}

            {/* Navigation (Étape 2) */}
            <nav className={`flex-1 overflow-y-auto transition-all duration-700 delay-150 ${loading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                {loading ? <NavSkeleton /> : (
                    <>
                        {renderSection("Navigation", "Navigation")}
                        {renderSection("Pilotage", "Pilotage")}
                        {renderSection("Administration", "Administration")}
                    </>
                )}
            </nav>
        </aside>
    );
};
