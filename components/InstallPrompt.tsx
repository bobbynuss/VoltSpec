"use client";

import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/**
 * Shows a subtle install banner when the browser fires beforeinstallprompt.
 * On iOS (no beforeinstallprompt), shows a Share → Add to Home Screen hint.
 * Dismissible, remembers for 7 days.
 */
export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showIosHint, setShowIosHint] = useState(false);
  const [dismissed, setDismissed] = useState(true); // start hidden

  useEffect(() => {
    // Check if already dismissed recently
    const dismissedAt = localStorage.getItem("voltspec-pwa-dismissed");
    if (dismissedAt && Date.now() - parseInt(dismissedAt) < 7 * 86400000) return;

    // Check if already installed (standalone mode)
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    // Android/Chrome: listen for install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setDismissed(false);
    };
    window.addEventListener("beforeinstallprompt", handler);

    // iOS: detect Safari and show manual hint
    const isIos =
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as unknown as { MSStream?: unknown }).MSStream;
    const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    if (isIos && isSafari) {
      setShowIosHint(true);
      setDismissed(false);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDismissed(true);
    }
    setDeferredPrompt(null);
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
          {deferredPrompt ? (
            <>
              <p className="text-sm font-semibold text-white">Install VoltSpec</p>
              <p className="text-xs text-gray-400 mt-0.5">Add to your home screen for quick access</p>
              <button
                onClick={handleInstall}
                className="mt-2 text-xs font-bold text-gray-900 bg-yellow-400 hover:bg-yellow-300 px-4 py-1.5 rounded-md transition-colors cursor-pointer"
              >
                Install
              </button>
            </>
          ) : showIosHint ? (
            <>
              <p className="text-sm font-semibold text-white">Add VoltSpec to Home Screen</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Tap <span className="inline-block text-blue-400">⎙ Share</span> then <strong>Add to Home Screen</strong>
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
