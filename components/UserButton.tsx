"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { AuthModal } from "./AuthModal";
import { User, LogOut, ChevronDown } from "lucide-react";

export function UserButton() {
  const { user, loading, signOut } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  if (loading) return null;

  if (!user) {
    return (
      <>
        <button
          onClick={() => setAuthOpen(true)}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-yellow-400 transition-colors font-medium min-h-[44px] px-2 cursor-pointer"
        >
          <User className="w-4 h-4" />
          <span className="hidden sm:inline">Log In</span>
        </button>
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      </>
    );
  }

  const displayEmail = user.email ?? "User";
  const shortEmail =
    displayEmail.length > 20
      ? displayEmail.slice(0, 17) + "..."
      : displayEmail;

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-yellow-400 transition-colors font-medium min-h-[44px] px-2 cursor-pointer"
      >
        <div className="w-5 h-5 rounded-full bg-yellow-400/20 flex items-center justify-center">
          <span className="text-[10px] text-yellow-400 font-bold">
            {displayEmail[0].toUpperCase()}
          </span>
        </div>
        <span className="hidden sm:inline">{shortEmail}</span>
        <ChevronDown className="w-3 h-3" />
      </button>

      {menuOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-[hsl(222,47%,10%)] border border-[hsl(217,33%,20%)] rounded-lg shadow-xl py-1 z-50">
          <div className="px-3 py-2 border-b border-[hsl(217,33%,18%)]">
            <p className="text-xs text-gray-400 truncate">{displayEmail}</p>
          </div>
          <button
            onClick={() => {
              signOut();
              setMenuOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-red-400 hover:bg-[hsl(217,33%,14%)] transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
