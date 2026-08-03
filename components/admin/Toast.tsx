"use client";

// Shared inline toast for the admin panel, replacing blocking window.alert()
// popups. Toasts appear bottom-right, auto-dismiss, and can be stacked one at a
// time (a new message replaces the previous one).

import { useCallback, useEffect, useState } from "react";
import { CheckCircle2, AlertTriangle, X } from "lucide-react";

export type ToastKind = "success" | "error";

export type ToastState = {
  /** Changes on every show() so repeat messages restart the dismiss timer. */
  id: number;
  kind: ToastKind;
  message: string;
} | null;

/** Auto-dismiss delays — errors linger so they're not missed. */
const DISMISS_MS: Record<ToastKind, number> = {
  success: 3500,
  error: 6000,
};

export function useToast() {
  const [toast, setToast] = useState<ToastState>(null);

  const showToast = useCallback((kind: ToastKind, message: string) => {
    setToast({ id: Date.now(), kind, message });
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), DISMISS_MS[toast.kind]);
    return () => clearTimeout(timer);
  }, [toast]);

  return { toast, showToast, dismissToast };
}

export function ToastHost({
  toast,
  onDismiss,
}: {
  toast: ToastState;
  onDismiss: () => void;
}) {
  if (!toast) return null;

  const isError = toast.kind === "error";

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-[60] flex max-w-sm items-start gap-3 rounded-2xl border px-4 py-3.5 shadow-2xl shadow-black/50 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2"
      style={
        isError
          ? { borderColor: "rgba(239,68,68,0.3)", background: "rgba(69,10,10,0.95)" }
          : { borderColor: "rgba(19,136,8,0.35)", background: "rgba(5,46,22,0.95)" }
      }
    >
      {isError ? (
        <AlertTriangle size={17} className="mt-0.5 shrink-0 text-red-400" />
      ) : (
        <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald-400" />
      )}
      <span
        className={`text-sm font-semibold ${isError ? "text-red-100" : "text-emerald-50"}`}
      >
        {toast.message}
      </span>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className={`ml-1 shrink-0 transition ${
          isError ? "text-red-400 hover:text-red-200" : "text-emerald-400 hover:text-emerald-200"
        }`}
      >
        <X size={15} />
      </button>
    </div>
  );
}
