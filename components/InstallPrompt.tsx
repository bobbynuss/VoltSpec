"use client";

import { useState, useEffect, useRef } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/**
 * PWA install prompt.
 * - Android/Chrome: captures beforeinstallprompt, shows Install button
 * - iOS Safari: shows Share → Add to Home Screen instructions
 * - Desktop: shows Install if available, otherwise hints
 * Dismissible, remembers for 7 days.
 */
export function InstallPrompt() {
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const [canInstall, setCanInstall] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    // Already dismissed recently?
    const dismissedAt = localStorage.getItem("voltspec-pwa-dismissed");
    if (dismissedAt && Date.now() - parseInt(dismissedAt) < 7 * 86400000) return;

    // Already installed?
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    // Android/Chrome
    const handler = (e: Event) => {
      e.preventDefault();
      deferredPrompt.current = e as BeforeInstallPromptEvent;
      setCanInstall(true);
      setDismissed(false);
    };
    window.addEventListener("beforeinstallprompt", handler);

    // iOS Safari detection
    const ua = navigator.userAgent;
    const iosDevice = /iPad|iPhone|iPod/.test(ua) && !("MSStream" in window);
    const safari = /Safari/.test(ua) && !/Chrome|CriOS|FxiOS/.test(ua);
    if (iosDevice && safari) {
      setIsIos(true);
      setDismissed(false);
    }

    // If neither fires after 3s on mobile, show iOS-style hint as fallback
    const fallback = setTimeout(() => {
      if (!deferredPrompt.current && /Mobi|Android/i.test(ua)) {
        setIsIos(true); // show manual instructions
        setDismissed(false);
      }
    }, 3000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(fallback);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt.current) return;
    setInstalling(true);
    try {
      await deferredPrompt.current.prompt();
      const { outcome } = await deferredPrompt.current.userChoice;
      if (outcome === "accepted") {
        setDismissed(true);
      }
    } catch {
      // prompt failed
    } finally {
      setInstalling(false);
      deferredPrompt.current = null;
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem("voltspec-pwa-dismissed", String(Date.now()));
  };

  if (dismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="bg-[hsl(222,47%,10%)] border border-yellow-400/30 rounded-xl px-4 py-3.5 shadow-2xl shadow-black/40 flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-yellow-400/10 flex items-center justify-center shrink-0">
          <Download className="w-5 h-5 text-yellow-400" />
        </div>
        <div className="flex-1 min-w-0">
          {canInstall ? (
            <>
              <p className="text-sm font-semibold text-white">Install VoltSpec</p>
              <p className="text-xs text-gray-400 mt-0.5">Add to your home screen for quick access</p>
              <button
                onClick={handleInstall}
                disabled={installing}
                className="mt-2 text-xs font-bold text-gray-900 bg-yellow-400 hover:bg-yellow-300 px-4 py-1.5 rounded-md transition-colors cursor-pointer disabled:opacity-50"
              >
                {installing ? "Installing..." : "Install"}
              </button>
            </>
          ) : isIos ? (
            <>
              <p className="text-sm font-semibold text-white">Add VoltSpec to Home Screen</p>
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                Tap <span className="text-blue-400 font-medium">Share ↑</span> at the bottom of your screen, then <strong className="text-white">Add to Home Screen</strong>
              </p>
            </>
          ) : null}
        </div>
        <button
          onClick={handleDismiss}
          className="text-gray-500 hover:text-gray-300 shrink-0 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
