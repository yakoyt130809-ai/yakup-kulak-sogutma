"use client";

import { useState } from "react";
import Icon from "@/components/Icon";

export function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-slate-400">{hint}</span>}
    </label>
  );
}

export function Input(props) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 ${props.className || ""}`}
    />
  );
}

export function Textarea(props) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 ${props.className || ""}`}
    />
  );
}

export function Btn({ children, variant = "primary", ...props }) {
  const styles = {
    primary: "bg-brand text-white hover:bg-brand-dark",
    ghost: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
    success: "bg-emerald-600 text-white hover:bg-emerald-700",
  };
  return (
    <button
      {...props}
      className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-60 ${styles[variant]} ${props.className || ""}`}
    >
      {children}
    </button>
  );
}

export function Card({ title, children, action, subtitle }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      {(title || action) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title && (
              <h3 className="font-heading text-base font-bold text-slate-800">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
            )}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

// Görsel ikon seçici — küçük bir grid açar, tıklayınca seçer.
export function IconPicker({ value, onChange, icons }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm hover:border-brand"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand/10 text-brand">
          <Icon name={value} className="h-5 w-5" />
        </span>
        <span className="text-slate-600">{value}</span>
        <Icon name="chevronDown" className="ml-auto h-4 w-4 text-slate-400" />
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute z-20 mt-1 grid w-64 grid-cols-6 gap-1 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
            {icons.map((ic) => (
              <button
                key={ic}
                type="button"
                title={ic}
                onClick={() => {
                  onChange(ic);
                  setOpen(false);
                }}
                className={`flex h-9 w-9 items-center justify-center rounded-md transition-colors ${
                  value === ic
                    ? "bg-brand text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon name={ic} className="h-5 w-5" />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Yukarı/aşağı taşıma kontrolü.
export function Reorder({ onUp, onDown, canUp, canDown }) {
  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={onUp}
        disabled={!canUp}
        aria-label="Yukarı taşı"
        className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-30"
      >
        <Icon name="chevronUp" className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={onDown}
        disabled={!canDown}
        aria-label="Aşağı taşı"
        className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-30"
      >
        <Icon name="chevronDown" className="h-4 w-4" />
      </button>
    </div>
  );
}
