"use client";

import React, { useMemo, useState } from "react";
import { Chip, Input, Modal, PillButton, Shell, VercelMark, UMark, cn } from "./ui";
import { Event, formatDateTR } from "../data/demo";

export function Landing({ onEnter }: { onEnter: () => void }) {
  return (
    <Shell
      footer={
        <div className="flex items-end justify-between">
          <div className="inline-flex h-7 w-7 items-center justify-center rounded-full ring-1 ring-white/20">
            <span className="text-[12px] font-semibold text-white/80">U</span>
          </div>
          <div className="hidden text-[11px] text-white/35 sm:block">
            © {new Date().getFullYear()} Uçuş Modu
          </div>
        </div>
      }
    >
      <div className="flex min-h-dvh items-center justify-center">
        <div className="w-full max-w-[560px] text-center">
          <div className="mb-10 flex items-center justify-center">
            <div className="text-[11px] font-semibold tracking-[0.28em] text-white/90">
              UÇUŞ MODU.
            </div>
          </div>

          <h1 className="mx-auto max-w-[34ch] text-balance text-[18px] font-medium leading-[1.35] text-white/95 sm:text-[20px]">
            Almanya’da gençlere yönelik konser, etkinlik ve organizasyon.
          </h1>

          <p className="mx-auto mt-3 max-w-[52ch] text-pretty text-[12px] leading-[1.6] text-white/55 sm:text-[13px]">
            Bir başlangıç noktası mı arıyorsun? Etkinlik takvimimize göz at veya
            hesabınla giriş yapıp biletlerini yönet.
          </p>

          <div className="mt-10 flex items-center justify-center gap-3">
            <PillButton variant="primary" onClick={onEnter}>
              <VercelMark className="h-3.5 w-3.5 text-black" />
              <span className="ml-2">Etkinliklere Git</span>
            </PillButton>

            <PillButton variant="ghost" onClick={onEnter}>
              Etkinlikler
            </PillButton>
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function TopNav({
  isAuthed,
  userHandle,
  onLogin,
  onLogout,
  onHome,
  onAccount,
}: {
  isAuthed: boolean;
  userHandle?: string | null;
  onLogin: () => void;
  onLogout: () => void;
  onHome: () => void;
  onAccount?: () => void;
}) {
  return (
    <div className="pt-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onHome}
          className="inline-flex items-center gap-2 rounded-full ring-1 ring-white/15 bg-white/[0.02] px-3 py-2 text-[12px] font-medium text-white/85 hover:bg-white/[0.05]"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full ring-1 ring-white/15 bg-white/[0.02]">
            <UMark className="h-3.5 w-3.5 text-white/85" />
          </span>
          <span className="tracking-[0.12em] text-[11px] font-semibold text-white/70">
            UÇUŞ MODU.
          </span>
        </button>

        <div className="flex items-center gap-2">
          {isAuthed ? (
            <>
              <span className="hidden sm:inline text-[12px] text-white/55">
                merhaba, <span className="text-white/85">@{userHandle ?? "uye"}</span>
              </span>
              {onAccount ? (
                <PillButton variant="ghost" onClick={onAccount}>
                  Panel
                </PillButton>
              ) : null}
              <PillButton variant="ghost" onClick={onLogout}>
                Çıkış
              </PillButton>
            </>
          ) : (
            <PillButton variant="ghost" onClick={onLogin}>
              Giriş
            </PillButton>
          )}
        </div>
      </div>
    </div>
  );
}

function EventCard({
  ev,
  onOpen,
  onBuy,
}: {
  ev: Event;
  onOpen: () => void;
  onBuy: () => void;
}) {
  const badge =
    ev.status === "SoldOut"
      ? "Tükendi"
      : ev.status === "FewLeft"
      ? "Az Kaldı"
      : "Satışta";

  return (
    <div className="rounded-2xl bg-white/[0.02] ring-1 ring-white/12 backdrop-blur-sm overflow-hidden">
      <button type="button" onClick={onOpen} className="w-full text-left">
        <div className="px-5 pt-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[13px] font-medium text-white/95">
                {ev.title}
              </div>
              <div className="mt-1 text-[12px] text-white/55">
                {ev.city} • {ev.venue}
              </div>
            </div>
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-[11px] font-medium ring-1",
                ev.status === "SoldOut"
                  ? "text-white/60 ring-white/15 bg-white/[0.02]"
                  : ev.status === "FewLeft"
                  ? "text-white/90 ring-white/20 bg-white/[0.04]"
                  : "text-black bg-white ring-white/10"
              )}
            >
              {badge}
            </span>
          </div>
        </div>

        <div className="px-5 pb-5 pt-4">
          <div className="flex items-center justify-between">
            <div className="text-[12px] text-white/55">
              {formatDateTR(ev.dateISO)} • {ev.time} • {ev.genre}
            </div>
            <div className="text-[12px] font-medium text-white/85">
              {ev.priceFromEUR}€+
            </div>
          </div>
        </div>
      </button>

      <div className="border-t border-white/10 px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onOpen}
            className="text-[12px] font-medium text-white/70 hover:text-white/90"
          >
            Detaylar
          </button>
          <PillButton
            variant={ev.status === "SoldOut" ? "ghost" : "primary"}
            onClick={onBuy}
            disabled={ev.status === "SoldOut"}
          >
            {ev.status === "SoldOut" ? "Bilet Yok" : "Bilet Al"}
          </PillButton>
        </div>
      </div>
    </div>
  );
}

export function EventsHome({
  events,
  onOpenEvent,
  onBuy,
}: {
  events: Event[];
  onOpenEvent: (id: string) => void;
  onBuy: (id: string) => void;
}) {
  const [q, setQ] = useState("");
  const [genre, setGenre] = useState<"All" | Event["genre"]>("All");
  const [city, setCity] = useState<"All" | string>("All");

  const cities = useMemo(() => {
    const set = new Set(events.map((e) => e.city));
    return ["All", ...Array.from(set)];
  }, [events]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return events
      .filter((e) => (genre === "All" ? true : e.genre === genre))
      .filter((e) => (city === "All" ? true : e.city === city))
      .filter((e) => {
        if (!query) return true;
        return (
          e.title.toLowerCase().includes(query) ||
          e.venue.toLowerCase().includes(query) ||
          e.city.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => a.dateISO.localeCompare(b.dateISO));
  }, [events, q, genre, city]);

  return (
    <div className="pt-10">
      <div className="mx-auto max-w-[980px]">
        <div className="text-center">
          <h1 className="text-balance text-[18px] font-medium leading-[1.35] text-white/95 sm:text-[20px]">
            Etkinlikler
          </h1>
          <p className="mx-auto mt-2 max-w-[70ch] text-pretty text-[12px] leading-[1.6] text-white/55 sm:text-[13px]">
            Konser, festival, parti ve stand-up etkinliklerini keşfet. Biletlerini
            hızlıca satın al ve hesabından yönet.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-12">
          <div className="sm:col-span-7">
            <Input value={q} onChange={setQ} placeholder="Ara: Berlin, Astra, indie…" />
          </div>
          <div className="sm:col-span-5">
            <div className="flex flex-wrap items-center justify-end gap-2">
              <Chip active={genre === "All"} label="Tümü" onClick={() => setGenre("All")} />
              <Chip active={genre === "Concert"} label="Konser" onClick={() => setGenre("Concert")} />
              <Chip active={genre === "Festival"} label="Festival" onClick={() => setGenre("Festival")} />
              <Chip active={genre === "Party"} label="Party" onClick={() => setGenre("Party")} />
              <Chip active={genre === "Comedy"} label="Stand-up" onClick={() => setGenre("Comedy")} />
            </div>
          </div>

          <div className="sm:col-span-12">
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-white/40">Şehir:</span>
              {cities.map((c) => (
                <Chip
                  key={c}
                  active={city === c}
                  label={c === "All" ? "Tümü" : c}
                  onClick={() => setCity(c)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {filtered.map((ev) => (
            <EventCard
              key={ev.id}
              ev={ev}
              onOpen={() => onOpenEvent(ev.id)}
              onBuy={() => onBuy(ev.id)}
            />
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-white/[0.02] ring-1 ring-white/12 px-5 py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-[12px] font-medium text-white/85">
                Organizator musun?
              </div>
              <div className="mt-1 text-[12px] text-white/55">
                Etkinliğini ekle, kontenjan ve bilet satışını panelden yönet.
              </div>
            </div>
            <PillButton variant="ghost" onClick={() => alert("(Demo) Organizator paneli")}>
              Organizator Paneli
            </PillButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EventDetail({
  ev,
  isAuthed,
  onBack,
  onBuy,
  onLogin,
}: {
  ev: Event;
  isAuthed: boolean;
  onBack: () => void;
  onBuy: () => void;
  onLogin: () => void;
}) {
  return (
    <div className="pt-10">
      <div className="mx-auto max-w-[980px]">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="text-[12px] font-medium text-white/70 hover:text-white/90"
          >
            ← Etkinlikler
          </button>
          <span className="text-[11px] text-white/40">ID: {ev.id}</span>
        </div>

        <div className="mt-5 rounded-2xl bg-white/[0.02] ring-1 ring-white/12 backdrop-blur-sm overflow-hidden">
          <div className="px-6 py-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="text-[18px] font-medium leading-[1.25] text-white/95">
                  {ev.title}
                </div>
                <div className="mt-2 text-[12px] text-white/55">
                  {ev.city} • {ev.venue}
                </div>
                <div className="mt-1 text-[12px] text-white/55">
                  {formatDateTR(ev.dateISO)} • {ev.time} • {ev.genre}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-full bg-white/[0.02] ring-1 ring-white/12 px-3 py-1.5 text-[12px] text-white/70">
                  {ev.priceFromEUR}€+
                </span>
                <PillButton
                  variant={ev.status === "SoldOut" ? "ghost" : "primary"}
                  onClick={() => {
                    if (!isAuthed) return onLogin();
                    onBuy();
                  }}
                  disabled={ev.status === "SoldOut"}
                >
                  {ev.status === "SoldOut"
                    ? "Tükendi"
                    : isAuthed
                    ? "Bilet Al"
                    : "Giriş Yap & Al"}
                </PillButton>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-12">
              <div className="sm:col-span-8">
                <div className="rounded-2xl bg-black/40 ring-1 ring-white/10 px-5 py-5">
                  <div className="text-[12px] font-medium text-white/85">
                    Açıklama
                  </div>
                  <p className="mt-2 text-[12px] leading-[1.7] text-white/55">
                    (Demo) Bu alana etkinlik açıklaması, kurallar, yaş sınırı,
                    kapı açılış saati ve ulaşım bilgileri eklenir.
                  </p>
                </div>
              </div>
              <div className="sm:col-span-4">
                <div className="rounded-2xl bg-black/40 ring-1 ring-white/10 px-5 py-5">
                  <div className="text-[12px] font-medium text-white/85">
                    Bilet Tipleri
                  </div>
                  <div className="mt-3 space-y-2">
                    <TicketRow label="Early" price={ev.priceFromEUR} />
                    <TicketRow label="Regular" price={ev.priceFromEUR + 10} />
                    <TicketRow label="VIP" price={ev.priceFromEUR + 25} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 px-6 py-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-[12px] text-white/55">
                Satış & iade koşulları: (Demo) checkout ekranında gösterilir.
              </div>
              <button
                type="button"
                className="text-[12px] font-medium text-white/70 hover:text-white/90"
                onClick={() => alert("(Demo) Paylaş")}
              >
                Paylaş
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TicketRow({ label, price }: { label: string; price: number }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/[0.02] ring-1 ring-white/12 px-3 py-2">
      <div className="text-[12px] text-white/75">{label}</div>
      <div className="text-[12px] font-medium text-white/85">{price}€</div>
    </div>
  );
}

export function Checkout({
  open,
  ev,
  onClose,
}: {
  open: boolean;
  ev: Event | null;
  onClose: () => void;
}) {
  const [qty, setQty] = useState(1);
  const [email, setEmail] = useState("");

  const price = ev?.priceFromEUR ?? 0;
  const total = Math.max(1, qty) * price;

  return (
    <Modal open={open} title="Bilet Satın Al" onClose={onClose}>
      {!ev ? null : (
        <div>
          <div className="rounded-2xl bg-white/[0.02] ring-1 ring-white/12 px-4 py-4">
            <div className="text-[12px] font-medium text-white/90">{ev.title}</div>
            <div className="mt-1 text-[12px] text-white/55">
              {ev.city} • {formatDateTR(ev.dateISO)} • {ev.time}
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-12">
            <div className="sm:col-span-5">
              <div className="rounded-2xl bg-white/[0.02] ring-1 ring-white/12 px-4 py-3">
                <div className="text-[11px] text-white/45">Adet</div>
                <div className="mt-2 flex items-center justify-between">
                  <button
                    type="button"
                    className="h-8 w-8 rounded-full ring-1 ring-white/15 bg-white/[0.02] text-white/80 hover:bg-white/[0.05]"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    −
                  </button>
                  <div className="text-[12px] font-medium text-white/90">{qty}</div>
                  <button
                    type="button"
                    className="h-8 w-8 rounded-full ring-1 ring-white/15 bg-white/[0.02] text-white/80 hover:bg-white/[0.05]"
                    onClick={() => setQty((q) => q + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="sm:col-span-7">
              <div className="rounded-2xl bg-white/[0.02] ring-1 ring-white/12 px-4 py-3">
                <div className="text-[11px] text-white/45">E-posta</div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="bilet@ornek.com"
                  className="mt-2 w-full bg-transparent text-[12px] text-white/90 placeholder:text-white/35 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-black/40 ring-1 ring-white/10 px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="text-[12px] text-white/55">Toplam</div>
              <div className="text-[14px] font-medium text-white/95">{total}€</div>
            </div>
            <div className="mt-1 text-[11px] text-white/40">
              (Demo) Ödeme sağlayıcısı entegrasyonu burada yapılır.
            </div>
          </div>

          <div className="mt-5 flex items-center justify-end gap-2">
            <PillButton variant="ghost" onClick={onClose}>
              Vazgeç
            </PillButton>
            <PillButton
              variant="primary"
              onClick={() => {
                alert("(Demo) Ödeme başlatıldı");
                onClose();
              }}
            >
              Ödeme
            </PillButton>
          </div>
        </div>
      )}
    </Modal>
  );
}

export function Login({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Modal open={open} title="Giriş" onClose={onClose}>
      <div className="space-y-3">
        <div className="rounded-2xl bg-white/[0.02] ring-1 ring-white/12 px-4 py-3">
          <div className="text-[11px] text-white/45">E-posta</div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@mail.com"
            className="mt-2 w-full bg-transparent text-[12px] text-white/90 placeholder:text-white/35 outline-none"
          />
        </div>
        <div className="rounded-2xl bg-white/[0.02] ring-1 ring-white/12 px-4 py-3">
          <div className="text-[11px] text-white/45">Şifre</div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            type="password"
            className="mt-2 w-full bg-transparent text-[12px] text-white/90 placeholder:text-white/35 outline-none"
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={() => alert("(Demo) Şifre sıfırlama")}
            className="text-[12px] font-medium text-white/60 hover:text-white/85"
          >
            Şifremi unuttum
          </button>
          <div className="flex items-center gap-2">
            <PillButton variant="ghost" onClick={onClose}>
              İptal
            </PillButton>
            <PillButton
              variant="primary"
              onClick={() => {
                if (!email.trim()) return alert("E-posta gerekli");
                if (password.length < 4) return alert("Şifre çok kısa (demo)");
                onSuccess();
                onClose();
              }}
            >
              Giriş Yap
            </PillButton>
          </div>
        </div>

        <div className="pt-2 text-[11px] leading-[1.6] text-white/40">
          (Demo) Burada gerçek auth entegrasyonu (JWT / OAuth / magic link)
          bağlanır.
        </div>
      </div>
    </Modal>
  );
}
