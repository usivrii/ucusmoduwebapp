"use client";

import React, { useState } from "react";
import { Chip, Input, PillButton, cn } from "./ui";

const wizardSteps = [
  {
    title: "Genel Bilgiler",
    description: "Ad, tarih ve mekan bilgilerini eksiksiz girin.",
    fields: ["Etkinlik adı", "Tarih & Saat", "Mekan"],
    status: "Tamamlandı",
  },
  {
    title: "Medya",
    description: "Kapak görseli ve galeri yükleyin.",
    fields: ["Kapak fotoğrafı", "Galeri (min. 4 görsel)", "Tanıtım videosu"],
    status: "Sırada",
  },
  {
    title: "Bilet Tiplemesi",
    description: "Early Bird, Normal ve VIP fiyatlarını tanımlayın.",
    fields: ["Early Bird", "Normal", "VIP"],
    status: "Sırada",
  },
  {
    title: "Cinsiyet Kotası",
    description: "Akıllı stok yönetimi ve QR üretimi zorunlu.",
    fields: ["Maksimum erkek/kadın", "Akıllı stok", "Unique Hash"],
    status: "Sırada",
  },
];

const revenueSeries = [62, 45, 80, 55, 90, 74, 95];

const attendees = [
  {
    id: "#A-2491",
    name: "Selin Yılmaz",
    ticket: "VIP",
    status: "Check-in",
  },
  {
    id: "#A-2492",
    name: "Emre Kaya",
    ticket: "Normal",
    status: "Beklemede",
  },
  {
    id: "#A-2493",
    name: "Laura Becker",
    ticket: "Early Bird",
    status: "Check-in",
  },
  {
    id: "#A-2494",
    name: "Mehmet Arslan",
    ticket: "Normal",
    status: "İade",
  },
];

export function AdminDashboard({ onBack }: { onBack: () => void }) {
  const [attendeeQuery, setAttendeeQuery] = useState("");
  const filteredAttendees = attendees.filter((attendee) => {
    const query = attendeeQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      attendee.name.toLowerCase().includes(query) ||
      attendee.ticket.toLowerCase().includes(query) ||
      attendee.id.toLowerCase().includes(query)
    );
  });

  return (
    <div className="pt-10">
      <div className="mx-auto max-w-[1100px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              type="button"
              onClick={onBack}
              className="text-[12px] font-medium text-white/70 hover:text-white/90"
            >
              ← Ana sayfa
            </button>
            <h1 className="mt-3 text-balance text-[20px] font-semibold text-white/95 sm:text-[24px]">
              Organizatör Yönetim Paneli
            </h1>
            <p className="mt-2 max-w-[70ch] text-pretty text-[12px] text-white/55">
              Etkinlikleri sihirbaz yapısında oluştur, gelir ve katılımcılarını tek panelden
              yönet. Backend ile gerçek zamanlı senkronize çalışan kokpit.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <PillButton variant="primary">Yeni Etkinlik</PillButton>
            <PillButton variant="ghost">Yayınla</PillButton>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Aktif Etkinlik", value: "4", note: "2 satışta" },
            { label: "Toplam Ciro", value: "€42.850", note: "Bu ay" },
            { label: "Anlık Satış", value: "36", note: "Son 24 saat" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white/[0.02] ring-1 ring-white/12 px-5 py-4"
            >
              <div className="text-[11px] text-white/50">{stat.label}</div>
              <div className="mt-2 text-[18px] font-semibold text-white/95">
                {stat.value}
              </div>
              <div className="mt-2 text-[11px] text-white/45">{stat.note}</div>
            </div>
          ))}
        </div>

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[14px] font-semibold text-white/90">
                Etkinlik Yönetimi (Wizard)
              </h2>
              <p className="mt-1 text-[12px] text-white/55">
                Adım adım ilerleyen form ile verileri C# backend’e doğrulanmış şekilde gönder.
              </p>
            </div>
            <Chip label="Taslak • Berlin Night" />
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-4">
            {wizardSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl bg-white/[0.02] ring-1 ring-white/12 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-white/50">Adım {index + 1}</span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-1 text-[10px] font-semibold",
                      step.status === "Tamamlandı"
                        ? "bg-white text-black"
                        : "bg-white/[0.08] text-white/70"
                    )}
                  >
                    {step.status}
                  </span>
                </div>
                <div className="mt-3 text-[13px] font-semibold text-white/90">
                  {step.title}
                </div>
                <p className="mt-2 text-[11px] text-white/55">{step.description}</p>
                <ul className="mt-3 space-y-1 text-[11px] text-white/60">
                  {step.fields.map((field) => (
                    <li key={field}>• {field}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="rounded-2xl bg-white/[0.02] ring-1 ring-white/12 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[12px] font-semibold text-white/85">
                    Cinsiyet Kotası & Akıllı Stok
                  </div>
                  <p className="mt-1 text-[11px] text-white/55">
                    Erkek/kadın limitleri dolduğunda satış otomatik kapanır.
                  </p>
                </div>
                <Chip label="Gender Balance" />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-black/30 ring-1 ring-white/10 p-4">
                  <div className="text-[11px] text-white/60">Maksimum Erkek</div>
                  <div className="mt-2 text-[16px] font-semibold text-white/95">50</div>
                  <div className="mt-2 text-[11px] text-white/45">Stok: 8 kaldı</div>
                </div>
                <div className="rounded-2xl bg-black/30 ring-1 ring-white/10 p-4">
                  <div className="text-[11px] text-white/60">Maksimum Kadın</div>
                  <div className="mt-2 text-[16px] font-semibold text-white/95">50</div>
                  <div className="mt-2 text-[11px] text-white/45">Stok: 12 kaldı</div>
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/[0.02] ring-1 ring-white/10 p-4">
                  <div className="text-[11px] font-semibold text-white/85">Akıllı Stok</div>
                  <p className="mt-1 text-[11px] text-white/55">
                    Erkek biletleri bittiğinde satış otomatik kapanır.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/[0.02] ring-1 ring-white/10 p-4">
                  <div className="text-[11px] font-semibold text-white/85">QR Kod Üretimi</div>
                  <p className="mt-1 text-[11px] text-white/55">
                    Backend her bilet için unique hash üretir ve QR’a dönüştürür.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/[0.02] ring-1 ring-white/12 p-5">
              <div className="text-[12px] font-semibold text-white/85">Yayın Kontrolü</div>
              <p className="mt-1 text-[11px] text-white/55">
                Eksik adımları tamamlamadan yayınlayamazsın.
              </p>
              <div className="mt-4 space-y-2">
                {wizardSteps.map((step) => (
                  <div
                    key={step.title}
                    className="flex items-center justify-between rounded-xl bg-black/30 px-3 py-2 text-[11px]"
                  >
                    <span className="text-white/70">{step.title}</span>
                    <span className="text-white/50">{step.status}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <PillButton variant="ghost">Yayın Ön İzleme</PillButton>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div>
            <h2 className="text-[14px] font-semibold text-white/90">
              Finansal Dashboard & Raporlama
            </h2>
            <p className="mt-1 text-[12px] text-white/55">
              Günlük/haftalık ciro grafikleri ve otomatik fatura oluşturma akışı.
            </p>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl bg-white/[0.02] ring-1 ring-white/12 p-5">
              <div className="flex items-center justify-between">
                <div className="text-[12px] font-semibold text-white/85">Gelir Takibi</div>
                <div className="text-[11px] text-white/50">Son 7 gün</div>
              </div>
              <div className="mt-4 flex items-end gap-2">
                {revenueSeries.map((value, index) => (
                  <div
                    key={value}
                    className="flex h-28 w-full items-end"
                    aria-label={`Gün ${index + 1}`}
                  >
                    <div
                      className="w-full rounded-full bg-white/80"
                      style={{ height: `${value}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 text-[11px] text-white/55">
                Etkinlik bazlı ciro kırılımı C# servisinden canlı çekilir.
              </div>
            </div>

            <div className="rounded-2xl bg-white/[0.02] ring-1 ring-white/12 p-5">
              <div className="text-[12px] font-semibold text-white/85">Nakit Akışı</div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-white/60">Bilet Gelirleri</span>
                  <span className="text-white/90">€48.200</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-white/60">İadeler & Komisyonlar</span>
                  <span className="text-white/90">-€5.350</span>
                </div>
                <div className="flex items-center justify-between text-[12px] font-semibold">
                  <span className="text-white/80">Net Kâr</span>
                  <span className="text-white/95">€42.850</span>
                </div>
              </div>
              <div className="mt-5 rounded-xl bg-black/30 px-4 py-3 text-[11px] text-white/55">
                Otomatik PDF fatura: Kullanıcı bilet aldığında e-posta ekinde gönderilir.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div>
            <h2 className="text-[14px] font-semibold text-white/90">Katılımcı Yönetimi</h2>
            <p className="mt-1 text-[12px] text-white/55">
              CRM görünümüyle arama/filtreleme, manuel ekleme ve hızlı check-in.
            </p>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl bg-white/[0.02] ring-1 ring-white/12 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Input
                  value={attendeeQuery}
                  onChange={setAttendeeQuery}
                  placeholder="İsim veya bilet tipi ara"
                />
                <div className="flex flex-wrap gap-2">
                  <Chip label="Tümü" active />
                  <Chip label="VIP" />
                  <Chip label="Normal" />
                  <Chip label="Early Bird" />
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {filteredAttendees.map((attendee) => (
                  <div
                    key={attendee.id}
                    className="flex flex-col gap-2 rounded-xl bg-black/30 px-4 py-3 text-[12px] sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <div className="text-white/90">{attendee.name}</div>
                      <div className="text-[11px] text-white/50">
                        {attendee.id} • {attendee.ticket}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] text-white/70">
                        {attendee.status}
                      </span>
                      <PillButton variant="ghost">Detay</PillButton>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white/[0.02] ring-1 ring-white/12 p-5">
              <div className="text-[12px] font-semibold text-white/85">Check-in Paneli</div>
              <p className="mt-1 text-[11px] text-white/55">
                QR okutulduğunda gerçek zamanlı doğrulama ve uyarı mesajı göster.
              </p>
              <div className="mt-4 rounded-xl bg-black/30 p-4">
                <div className="text-[11px] text-white/50">QR/Hash</div>
                <div className="mt-2 rounded-lg bg-white/[0.05] px-3 py-2 text-[12px] text-white/70">
                  5F2A-4C9D-992F
                </div>
                <div className="mt-3 rounded-lg bg-white/10 px-3 py-2 text-[11px] text-white/75">
                  Giriş Başarılı • Kapı 1
                </div>
              </div>
              <div className="mt-4 rounded-xl bg-black/30 p-4">
                <div className="text-[11px] text-white/50">Manuel Ekleme</div>
                <div className="mt-2 text-[12px] text-white/70">
                  Kapıda nakit ödeyenleri hızlıca sisteme ekleyin.
                </div>
                <div className="mt-3">
                  <PillButton variant="primary">Kişi Ekle</PillButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}