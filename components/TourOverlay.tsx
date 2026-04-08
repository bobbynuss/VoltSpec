"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronRight, ChevronLeft, Zap } from "lucide-react";

export interface TourStep {
  id: string;
  target: string; // data-tour="<target>" selector
  title: string;
  body: string;
  placement?: "top" | "bottom" | "left" | "right" | "auto";
  beforeShow?: () => void; // e.g., open sidebar, switch tab
}

interface TourOverlayProps {
  steps: TourStep[];
  startAt?: number;
  onEnd: () => void;
}

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const PAD = 8; // spotlight padding around element

function getRect(el: Element): Rect {
  const r = el.getBoundingClientRect();
  return {
    top: r.top + window.scrollY,
    left: r.left + window.scrollX,
    width: r.width,
    height: r.height,
  };
}

function getViewportRect(el: Element): DOMRect {
  return el.getBoundingClientRect();
}

export function TourOverlay({ steps, startAt = 0, onEnd }: TourOverlayProps) {
  const [current, setCurrent] = useState(startAt);
  const [spotlight, setSpotlight] = useState<Rect | null>(null);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const [placement, setPlacement] = useState<"top" | "bottom">("bottom");
  const overlayRef = useRef<HTMLDivElement>(null);

  const step = steps[current];

  const positionTooltip = useCallback(() => {
    if (!step) return;
    const el = document.querySelector(`[data-tour="${step.target}"]`);
    if (!el) {
      // Element not visible — show centered fallback
      setSpotlight(null);
      setTooltipStyle({
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      });
      setPlacement("bottom");
      return;
    }

    // Scroll element into view
    el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });

    // Wait for scroll then measure
    requestAnimationFrame(() => {
      const vr = getViewportRect(el);
      const rect = getRect(el);
      setSpotlight(rect);

      const isMobile = window.innerWidth < 640;
      const tooltipW = isMobile ? window.innerWidth - 32 : 360;

      // Decide placement: prefer bottom, use top if not enough space
      const spaceBelow = window.innerHeight - vr.bottom;
      const useTop = spaceBelow < 200 && vr.top > 200;
      setPlacement(useTop ? "top" : "bottom");

      let left = vr.left + vr.width / 2 - tooltipW / 2;
      left = Math.max(16, Math.min(left, window.innerWidth - tooltipW - 16));

      const style: React.CSSProperties = {
        position: "fixed",
        width: tooltipW,
        left,
      };

      if (useTop) {
        style.bottom = window.innerHeight - vr.top + PAD + 12;
      } else {
        style.top = vr.bottom + PAD + 12;
      }

      setTooltipStyle(style);
    });
  }, [step]);

  useEffect(() => {
    if (!step) return;
    step.beforeShow?.();
    // Small delay to let DOM update (e.g., sidebar opening, tab switching)
    const timer = setTimeout(positionTooltip, 250);
    return () => clearTimeout(timer);
  }, [current, step, positionTooltip]);

  // Reposition on resize/scroll
  useEffect(() => {
    const handler = () => positionTooltip();
    window.addEventListener("resize", handler);
    window.addEventListener("scroll", handler, true);
    return () => {
      window.removeEventListener("resize", handler);
      window.removeEventListener("scroll", handler, true);
    };
  }, [positionTooltip]);

  const next = () => {
    if (current < steps.length - 1) setCurrent(current + 1);
    else onEnd();
  };
  const prev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  if (!step) return null;

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[9999]" style={{ pointerEvents: "none" }}>
      {/* Dark overlay with spotlight cutout */}
      <svg
        className="fixed inset-0 w-full h-full"
        style={{ pointerEvents: "auto" }}
        onClick={onEnd}
      >
        <defs>
          <mask id="tour-mask">
            <rect width="100%" height="100%" fill="white" />
            {spotlight && (
              <rect
                x={spotlight.left - PAD + window.scrollX * 0}
                y={spotlight.top - PAD - window.scrollY + window.scrollY * 0}
                width={spotlight.width + PAD * 2}
                height={spotlight.height + PAD * 2}
                rx="8"
                fill="black"
                style={{
                  transform: `translateY(${-window.scrollY}px)`,
                }}
              />
            )}
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(0,0,0,0.7)"
          mask="url(#tour-mask)"
        />
      </svg>

      {/* Spotlight ring glow */}
      {spotlight && (
        <div
          className="fixed rounded-lg ring-2 ring-yellow-400 ring-offset-2 ring-offset-transparent shadow-[0_0_30px_rgba(250,204,21,0.3)] transition-all duration-300"
          style={{
            pointerEvents: "none",
            top: spotlight.top - PAD - window.scrollY,
            left: spotlight.left - PAD,
            width: spotlight.width + PAD * 2,
            height: spotlight.height + PAD * 2,
            position: "fixed",
          }}
        />
      )}

      {/* Tooltip */}
      <div
        className="z-[10000] animate-in fade-in slide-in-from-bottom-2 duration-200"
        style={{ ...tooltipStyle, pointerEvents: "auto" }}
      >
        {/* Arrow */}
        {spotlight && (
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-[hsl(222,47%,12%)] border-yellow-400/40 ${
              placement === "top"
                ? "bottom-[-6px] border-r border-b"
                : "top-[-6px] border-l border-t"
            }`}
          />
        )}
        <div className="bg-[hsl(222,47%,12%)] border border-yellow-400/30 rounded-xl shadow-2xl shadow-yellow-400/10 p-4 sm:p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-xs font-bold bg-yellow-400/15 rounded-full w-6 h-6 flex items-center justify-center shrink-0">
                {current + 1}
              </span>
              <h3 className="text-white font-semibold text-sm">{step.title}</h3>
            </div>
            <button
              onClick={onEnd}
              className="text-gray-500 hover:text-gray-300 transition-colors shrink-0 p-1 -mr-1 -mt-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">
            {step.body}
          </p>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-600">
              {current + 1} of {steps.length}
            </span>
            <div className="flex items-center gap-2">
              {current > 0 && (
                <button
                  onClick={prev}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
                >
                  <ChevronLeft className="w-3 h-3" />
                  Back
                </button>
              )}
              <button
                onClick={onEnd}
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors px-3 py-1.5"
              >
                End Tour
              </button>
              <button
                onClick={next}
                className="flex items-center gap-1 text-xs font-semibold bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-4 py-1.5 rounded-lg transition-colors"
              >
                {current === steps.length - 1 ? (
                  <>
                    <Zap className="w-3 h-3 fill-gray-900" />
                    Done
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-3 h-3" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
