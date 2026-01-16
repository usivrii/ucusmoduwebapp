"use client";

import React, { useMemo, useState } from "react";
import { Chip, FooterMark, Modal, PillButton, Shell, VercelMark, UMark, cn } from "./ui";
import { Event, Order, Ticket, User, formatDateTR, formatDateTimeShort } from "../data/demo";

function StatCard({
  title,
  value,
  hint,
}: {
  title: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl bg-white/[0.02] ring-1 ring-white/12 px-5 py-5 backdrop-blur-sm">
      <div className="text-[11px] text-white/45">{title}</div>
      <div className="mt-2 text-[18px] font-medium text-white/95">{value}</div>
      {hint ? <div className="mt-1 text-[12px] text-white/55">{hint}</div> : null}
    </div>
  );
}

function Panel({ title, right, children }: { title: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white/[0.02] ring-1 ring-white/12 backdrop-blur-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <div className="text-[12px] font-medium text-white/85">{title}</div>
        {right}
      </div>
      <div className="px-5 py-5">{children}</div>
    </div>
  );
}

function SideLink({ active, label, onClick }: { active?: boolean; label: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full text-left rounded-2xl px-4 py-3 ring-1 transition",
        active
          ? "bg-white text-black ring-white/10"
          : "bg-white/[0.02] text-white/75 ring-white/12 hover:bg-white/[0.05]"
      )}
    >
      <div className="text-[12px] font-medium">{label}</div>
    </button>
  );
}

function ActionRow({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white/[0.02] ring-1 ring-white/12 px-4 py-3">
      <div>
        <div className="text-[12px] font-medium text-white/85">{label}</div>
        <div className="mt-0.5 text-[12px] text-white/55">{hint}</div>
      </div>
      <span className="text-[12px] text-white/45">→</span>
    </div>
  );
}

function TicketListRow({
  ticket,
  events,
  onOpen,
}: {
  ticket: Ticket;
  events: Event[];
  onOpen?: () => void;
}) {
  const ev = events.find((e) => e.id === ticket.eventId);
  const stateLabel =
    ticket.state === "Upcoming" ? "Aktif" : ticket.state === "Used" ? "Kullanıldı" : "İade";

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white/[0.02] ring-1 ring-white/12 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="text-[12px] font-medium text-white/90">
          {ev ? ev.title : "Etkinlik"}
        </div>
        <div className="mt-1 text-[12px] text-white/55">
          {ev ? `${ev.city} • ${formatDateTR(ev.dateISO)} • ${ev.time}` : ticket.eventId}
        </div>
        <div className="mt-1 text-[11px] text-white/40">
          Satın alma: {formatDateTimeShort(ticket.purchasedAtISO)} • {ticket.type} ×{ticket.qty}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-[11px] font-medium ring-1",
            ticket.state === "Refunded"
              ? "text-white/60 ring-white/15 bg-white/[0.02]"
              : ticket.state === "Used"
              ? "text-white/75 ring-white/15 bg-white/[0.03]"
              : "text-black bg-white ring-white/10"
          )}
        >
          {stateLabel}
        </span>
        <PillButton variant="ghost" onClick={() => alert("(Demo) PDF indir")}
        >
          PDF
        </PillButton>
        <PillButton variant={ticket.state === "Upcoming" ? "primary" : "ghost"} onClick={onOpen} disabled={!onOpen}>
          QR
        </PillButton>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white/[0.02] ring-1 ring-white/12 px-4 py-3">
      <div className="text-[11px] text-white/45">{label}</div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export function AccountLayout({
  user,
  active,
  onNavigate,
  children,
}: {
  user: User;
  active: "/account" | "/account/tickets" | "/account/orders" | "/account/profile";
  onNavigate?: (path: string) => void;
  children: React.ReactNode;
}) {
  return (
    <Shell footer={<FooterMark />}>
      <div className="pt-6">
        <div className="mx-auto max-w-[1100px]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="inline-flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-white/15 bg-white/[0.02]">
                <UMark className="h-5 w-5 text-white/85" />
              </span>
              <div>
                <div className="text-[12px] text-white/55">
                  <span className="font-medium text-white/85">{user.name}</span> • @{user.handle}
                </div>
                <div className="text-[12px] text-white/40">{user.email}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <PillButton
                variant="ghost"
                onClick={() => onNavigate?.("/")}
              >
                Ana Sayfa
              </PillButton>
              <PillButton
                variant="primary"
                onClick={() => alert("(Demo) Çıkış")}
              >
                <VercelMark className="h-3.5 w-3.5 text-black" />
                <span className="ml-2">Çıkış</span>
              </PillButton>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-12">
            <aside className="sm:col-span-3">
              <div className="space-y-2">
                <SideLink
                  active={active === "/account"}
                  label="Genel Bakış"
                  onClick={() => onNavigate?.("/account")}
                />
                <SideLink
                  active={active === "/account/tickets"}
                  label="Biletlerim"
                  onClick={() => onNavigate?.("/account/tickets")}
                />
                <SideLink
                  active={active === "/account/orders"}
                  label="Siparişler"
                  onClick={() => onNavigate?.("/account/orders")}
                />
                <SideLink
                  active={active === "/account/profile"}
                  label="Profil"
                  onClick={() => onNavigate?.("/account/profile")}
                />
              </div>

              <div className="mt-4 rounded-2xl bg-white/[0.02] ring-1 ring-white/12 px-4 py-4">
                <div className="text-[11px] font-semibold tracking-[0.28em] text-white/70">
                  UÇUŞ MODU.
                </div>
                <div className="mt-2 text-[12px] text-white/55">
                  Biletlerini yönet, QR’larını göster ve satın alma geçmişini gör.
                </div>
              </div>
            </aside>

            <section className="sm:col-span-9">{children}</section>
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function AccountPage({
  user,
  events,
  tickets,
  orders,
  onOpenTicket,
}: {
  user: User;
  events: Event[];
  tickets: Ticket[];
  orders: Order[];
  onOpenTicket?: (ticketId: string) => void;
}) {
  const upcoming = tickets.filter((t) => t.state === "Upcoming");
  const refunded = tickets.filter((t) => t.state === "Refunded");
  const lastOrder = [...orders].sort((a, b) => b.purchasedAtISO.localeCompare(a.purchasedAtISO))[0];

  const nextTicket = useMemo(() => {
    const withEvent = upcoming
      .map((t) => ({ t, ev: events.find((e) => e.id === t.eventId) }))
      .filter((x): x is { t: Ticket; ev: Event } => Boolean(x.ev))
      .sort((a, b) => a.ev.dateISO.localeCompare(b.ev.dateISO));
    return withEvent[0] ?? null;
  }, [upcoming, events]);

  return (
    <div className="space-y-4">
      <div className="text-center sm:text-left">
        <div className="text-[18px] font-medium text-white/95">Hesabım</div>
        <div className="mt-1 text-[12px] text-white/55">
          Hoş geldin, <span className="text-white/85">{user.name}</span>. Bilet ve siparişlerin burada.
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Aktif bilet" value={String(upcoming.length)} hint="Yaklaşan etkinlikler" />
        <StatCard title="Sipariş" value={String(orders.length)} hint={lastOrder ? `Son: ${formatDateTimeShort(lastOrder.purchasedAtISO)}` : "—"} />
        <StatCard title="İade" value={String(refunded.length)} hint="İade edilen biletler" />
      </div>

      <div className="grid gap-4 sm:grid-cols-12">
        <div className="sm:col-span-7">
          <Panel
            title="Yaklaşan Etkinlik"
            right={
              nextTicket ? (
                <button
                  type="button"
                  className="text-[12px] font-medium text-white/70 hover:text-white/90"
                  onClick={() => onOpenTicket?.(nextTicket.t.id)}
                >
                  QR Göster
                </button>
              ) : null
            }
          >
            {nextTicket ? (
              <div>
                <div className="text-[13px] font-medium text-white/90">{nextTicket.ev.title}</div>
                <div className="mt-1 text-[12px] text-white/55">
                  {nextTicket.ev.city} • {nextTicket.ev.venue}
                </div>
                <div className="mt-1 text-[12px] text-white/55">
                  {formatDateTR(nextTicket.ev.dateISO)} • {nextTicket.ev.time} • {nextTicket.ev.genre}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="rounded-full bg-white/[0.02] ring-1 ring-white/12 px-3 py-1.5 text-[12px] text-white/70">
                    {nextTicket.t.type} ×{nextTicket.t.qty}
                  </span>
                  <span className="rounded-full bg-white/[0.02] ring-1 ring-white/12 px-3 py-1.5 text-[12px] text-white/70">
                    Ticket: {nextTicket.t.id}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-[12px] text-white/55">Aktif bilet bulunamadı.</div>
            )}
          </Panel>
        </div>

        <div className="sm:col-span-5">
          <Panel title="Hızlı İşlemler">
            <div className="space-y-2">
              <ActionRow label="Biletlerim" hint="Aktif QR ve geçmiş" />
              <ActionRow label="Siparişler" hint="Fatura ve durum" />
              <ActionRow label="Profil" hint="Şifre / bildirim" />
            </div>
            <div className="mt-4 text-[11px] text-white/40">
              (Demo) Bu satırlar gerçek router link’lerine bağlanır.
            </div>
          </Panel>
        </div>
      </div>

      <Panel title="Son Biletler">
        <div className="space-y-2">
          {tickets
            .slice()
            .sort((a, b) => b.purchasedAtISO.localeCompare(a.purchasedAtISO))
            .slice(0, 3)
            .map((t) => (
              <TicketListRow key={t.id} ticket={t} events={events} onOpen={() => onOpenTicket?.(t.id)} />
            ))}
        </div>
      </Panel>
    </div>
  );
}

export function TicketsPage({
  events,
  tickets,
  onOpenTicket,
}: {
  events: Event[];
  tickets: Ticket[];
  onOpenTicket?: (ticketId: string) => void;
}) {
  const [filter, setFilter] = useState<"All" | Ticket["state"]>("All");

  const filtered = tickets
    .filter((t) => (filter === "All" ? true : t.state === filter))
    .slice()
    .sort((a, b) => b.purchasedAtISO.localeCompare(a.purchasedAtISO));

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-[18px] font-medium text-white/95">Biletlerim</div>
          <div className="mt-1 text-[12px] text-white/55">QR göster, PDF indir ve durumunu takip et.</div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Chip active={filter === "All"} label="Tümü" onClick={() => setFilter("All")} />
          <Chip active={filter === "Upcoming"} label="Aktif" onClick={() => setFilter("Upcoming")} />
          <Chip active={filter === "Used"} label="Kullanıldı" onClick={() => setFilter("Used")} />
          <Chip active={filter === "Refunded"} label="İade" onClick={() => setFilter("Refunded")} />
        </div>
      </div>

      <Panel
        title={`Liste (${filtered.length})`}
        right={<span className="text-[11px] text-white/40">Biletler</span>}
      >
        <div className="space-y-2">
          {filtered.map((t) => (
            <TicketListRow key={t.id} ticket={t} events={events} onOpen={() => onOpenTicket?.(t.id)} />
          ))}
        </div>
      </Panel>
    </div>
  );
}

export function OrdersPage({
  orders,
  tickets,
}: {
  orders: Order[];
  tickets: Ticket[];
}) {
  const byId = useMemo(() => new Map(tickets.map((t) => [t.id, t])), [tickets]);

  return (
    <div className="space-y-4">
      <div>
        <div className="text-[18px] font-medium text-white/95">Siparişler</div>
        <div className="mt-1 text-[12px] text-white/55">Ödeme durumu, toplam ve içerik.</div>
      </div>

      <Panel title={`Siparişler (${orders.length})`}>
        <div className="space-y-2">
          {orders
            .slice()
            .sort((a, b) => b.purchasedAtISO.localeCompare(a.purchasedAtISO))
            .map((o) => (
              <div key={o.id} className="rounded-2xl bg-white/[0.02] ring-1 ring-white/12 px-4 py-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="text-[12px] font-medium text-white/90">{o.id}</div>
                    <div className="mt-1 text-[12px] text-white/55">
                      {formatDateTimeShort(o.purchasedAtISO)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-white/[0.02] ring-1 ring-white/12 px-3 py-1.5 text-[12px] text-white/70">
                      {o.totalEUR}€
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[11px] font-medium ring-1",
                        o.status === "Paid"
                          ? "text-black bg-white ring-white/10"
                          : o.status === "Refunded"
                          ? "text-white/60 ring-white/15 bg-white/[0.02]"
                          : "text-white/75 ring-white/15 bg-white/[0.03]"
                      )}
                    >
                      {o.status === "Paid" ? "Ödendi" : o.status === "Refunded" ? "İade" : "Bekliyor"}
                    </span>
                    <PillButton variant="ghost" onClick={() => alert("(Demo) Fatura indir")}
                    >
                      Fatura
                    </PillButton>
                  </div>
                </div>

                <div className="mt-3 text-[11px] text-white/40">Biletler</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {o.ticketIds.map((tid) => {
                    const t = byId.get(tid);
                    return (
                      <span
                        key={tid}
                        className="rounded-full bg-white/[0.02] ring-1 ring-white/12 px-3 py-1.5 text-[12px] text-white/70"
                      >
                        {t ? `${t.type} ×${t.qty}` : tid}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      </Panel>
    </div>
  );
}

export function ProfilePage({ user }: { user: User }) {
  const [name, setName] = useState(user.name);
  const [city, setCity] = useState(user.city ?? "");

  return (
    <div className="space-y-4">
      <div>
        <div className="text-[18px] font-medium text-white/95">Profil</div>
        <div className="mt-1 text-[12px] text-white/55">Hesap bilgilerin ve tercihlerin.</div>
      </div>

      <Panel title="Hesap">
        <div className="grid gap-3 sm:grid-cols-12">
          <div className="sm:col-span-6">
            <Field label="Ad Soyad">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent text-[12px] text-white/90 outline-none"
              />
            </Field>
          </div>
          <div className="sm:col-span-6">
            <Field label="Şehir">
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Berlin"
                className="w-full bg-transparent text-[12px] text-white/90 placeholder:text-white/35 outline-none"
              />
            </Field>
          </div>
          <div className="sm:col-span-6">
            <Field label="E-posta">
              <input
                value={user.email}
                readOnly
                className="w-full bg-transparent text-[12px] text-white/70 outline-none"
              />
            </Field>
          </div>
          <div className="sm:col-span-6">
            <Field label="Kullanıcı adı">
              <input
                value={`@${user.handle}`}
                readOnly
                className="w-full bg-transparent text-[12px] text-white/70 outline-none"
              />
            </Field>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <PillButton variant="ghost" onClick={() => alert("(Demo) Değişiklikleri sıfırla")}
          >
            Sıfırla
          </PillButton>
          <PillButton
            variant="primary"
            onClick={() => alert("(Demo) Profil güncellendi")}
          >
            Kaydet
          </PillButton>
        </div>
      </Panel>

      <Panel title="Güvenlik">
        <div className="rounded-2xl bg-black/40 ring-1 ring-white/10 px-4 py-4">
          <div className="text-[12px] font-medium text-white/85">Şifre</div>
          <div className="mt-1 text-[12px] text-white/55">Şifreni düzenli aralıklarla güncelle.</div>
          <div className="mt-3 flex items-center justify-end">
            <PillButton variant="ghost" onClick={() => alert("(Demo) Şifre değiştir")}
            >
              Şifre Değiştir
            </PillButton>
          </div>
        </div>

        <div className="mt-3 rounded-2xl bg-black/40 ring-1 ring-white/10 px-4 py-4">
          <div className="text-[12px] font-medium text-white/85">Bildirimler</div>
          <div className="mt-1 text-[12px] text-white/55">Etkinlik güncellemeleri ve bilet bilgilendirmeleri.</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Chip active label="E-posta" />
            <Chip label="SMS" />
            <Chip label="Push" />
          </div>
        </div>
      </Panel>
    </div>
  );
}

export function QRModal({
  open,
  onClose,
  ticket,
  event,
}: {
  open: boolean;
  onClose: () => void;
  ticket: Ticket | null;
  event: Event | null;
}) {
  return (
    <Modal open={open} title="Bilet QR" onClose={onClose}>
      {!ticket ? null : (
        <div>
          <div className="rounded-2xl bg-white/[0.02] ring-1 ring-white/12 px-4 py-4">
            <div className="text-[12px] font-medium text-white/90">{event?.title ?? "Etkinlik"}</div>
            <div className="mt-1 text-[12px] text-white/55">
              {event ? `${event.city} • ${formatDateTR(event.dateISO)} • ${event.time}` : ticket.eventId}
            </div>
            <div className="mt-1 text-[11px] text-white/40">Ticket: {ticket.id} • {ticket.type} ×{ticket.qty}</div>
          </div>

          <div className="mt-4 rounded-2xl bg-black/40 ring-1 ring-white/10 px-4 py-4">
            <div className="text-[11px] text-white/45">QR Token (Demo)</div>
            <div className="mt-2 font-mono text-[12px] text-white/85 break-all">
              {ticket.qrToken}
            </div>
            <div className="mt-3 grid place-items-center rounded-2xl bg-white/[0.02] ring-1 ring-white/12 px-4 py-10">
              <div className="text-[12px] text-white/55">(Demo) QR görseli burada render edilir</div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-end gap-2">
            <PillButton variant="ghost" onClick={() => alert("(Demo) Wallet ekle")}
            >
              Wallet
            </PillButton>
            <PillButton variant="primary" onClick={onClose}>
              Kapat
            </PillButton>
          </div>
        </div>
      )}
    </Modal>
  );
}
