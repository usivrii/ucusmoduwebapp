"use client";

import React from "react";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function VercelMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 256 222" aria-hidden="true" focusable="false" {...props}>
      <path d="M128 0 256 222H0L128 0Z" fill="currentColor" />
    </svg>
  );
}

export function UMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M18 14v20c0 8.284 6.716 15 15 15s15-6.716 15-15V14h-8v20c0 3.866-3.134 7-7 7s-7-3.134-7-7V14h-8Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Shell({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <main
      className={
        "min-h-dvh bg-black text-white " +
        "[background-image:radial-gradient(1100px_500px_at_50%_20%,rgba(255,255,255,0.08),transparent_60%),radial-gradient(700px_350px_at_50%_85%,rgba(255,255,255,0.06),transparent_60%)]"
      }
    >
      <div className="mx-auto flex min-h-dvh max-w-[1200px] flex-col px-6">
        <div className="flex-1">{children}</div>
        <div className="pb-6">{footer}</div>
      </div>
    </main>
  );
}

export function PillButton({
  variant,
  children,
  onClick,
  disabled,
}: {
  variant: "primary" | "ghost";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-4 py-2 text-[12px] font-medium transition",
        "active:translate-y-[1px] disabled:opacity-50 disabled:active:translate-y-0",
        variant === "primary" &&
          "bg-white text-black shadow-[0_1px_0_rgba(255,255,255,0.22),0_12px_30px_rgba(0,0,0,0.55)] ring-1 ring-white/10",
        variant === "ghost" &&
          "text-white/90 ring-1 ring-white/15 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.05]"
      )}
    >
      {children}
    </button>
  );
}

export function Input({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex items-center rounded-full bg-white/[0.02] ring-1 ring-white/12 px-4 py-2 backdrop-blur-sm">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-[12px] text-white/90 placeholder:text-white/35 outline-none"
      />
    </div>
  );
}

export function Chip({
  active,
  label,
  onClick,
}: {
  active?: boolean;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1.5 text-[11px] font-medium ring-1 transition",
        active
          ? "bg-white text-black ring-white/10"
          : "bg-white/[0.02] text-white/70 ring-white/12 hover:bg-white/[0.05]"
      )}
    >
      {label}
    </button>
  );
}

export function Modal({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="w-full max-w-[560px] rounded-2xl bg-black/70 ring-1 ring-white/15 backdrop-blur-xl shadow-[0_24px_70px_rgba(0,0,0,0.75)]">
          <div className="flex items-center justify-between px-6 pt-6">
            <div>
              <div className="text-[11px] font-semibold tracking-[0.28em] text-white/70">
                UÇUŞ MODU.
              </div>
              <div className="mt-2 text-[14px] font-medium text-white/95">
                {title}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-white/15 bg-white/[0.02] text-white/70 hover:bg-white/[0.05]"
              aria-label="Kapat"
            >
              ×
            </button>
          </div>
          <div className="px-6 pb-6 pt-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function FooterMark() {
  return (
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-7 w-7 items-center justify-center rounded-full ring-1 ring-white/20">
            <span className="text-[12px] font-semibold text-white/80">U</span>
          </div>
          <div className="text-[11px] text-white/35">
            © {new Date().getFullYear()} Uçuş Modu
          </div>
      </div>
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-white/50">
          <button type="button" className="hover:text-white/80">
            Impressum
          </button>
          <button type="button" className="hover:text-white/80">
            AGB
          </button>
          <button type="button" className="hover:text-white/80">
            Datenschutz
          </button>
      </div>
    </div>
  );
}
