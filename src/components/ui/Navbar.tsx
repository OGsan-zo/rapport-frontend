import React from "react";
import Link from "next/link";
import { useUser } from "@/features/auth/contexts/UserContext";
import { APP_CONSTANTS } from "@/config/constants";

/**
 * Barre de navigation épurée.
 */
export const Navbar: React.FC = () => {
  const { user, logout } = useUser();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo / Titre - Clean */}
        <Link href="/dashboard" className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-900 tracking-tight uppercase">Rapports {APP_CONSTANTS.appName}</span>
          <div className="h-3 w-[1px] bg-slate-200"></div>
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{APP_CONSTANTS.ministryName}</span>
        </Link>

        {/* Profile + Logout - Simple */}
        <div className="flex items-center gap-6">
          {user && (
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[11px] font-bold text-slate-900 uppercase leading-none">{user.entite}</span>
              <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wider mt-1">Antananarivo / {APP_CONSTANTS.ministryName}</span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="text-[10px] font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest transition-colors py-1.5 px-3 border border-slate-100 rounded-lg hover:border-red-100 hover:bg-red-50"
          >
            Quitter
          </button>
        </div>
      </div>
    </header>
  );
};
