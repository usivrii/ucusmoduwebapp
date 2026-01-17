"use client";

import React, { useMemo, useState } from "react";

/**
 * Uçuş Modu UI Kit + Sayfalar (React + Tailwind v4)
 *
 * Bu dosya sadece DEMO akışını birleştirir. Gerçekte router’larınız
 * `components/` altındaki sayfaları/komponentleri render edecek.
 */

import {
  AccountLayout,
  AccountPage,
  OrdersPage,
  ProfilePage,
  QRModal,
  TicketsPage,
} from "./components/account";
import {
  Checkout,
  EventDetail,
  EventsHome,
  Landing,
  Login,
  TopNav,
} from "./components/events";
import { AdminDashboard } from "./components/admin";
import { FooterMark, Shell } from "./components/ui";
import { DEMO_EVENTS, DEMO_ORDERS, DEMO_TICKETS, DEMO_USER } from "./data/demo";

type AppRoute = "landing" | "home" | "event" | "admin";
type AccountRoute = "/account" | "/account/tickets" | "/account/orders" | "/account/profile";
type DemoRoute = AppRoute | AccountRoute;

export default function DemoApp() {
  const [route, setRoute] = useState<DemoRoute>("landing");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isAuthed, setIsAuthed] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutEventId, setCheckoutEventId] = useState<string | null>(null);
  const [qrOpen, setQrOpen] = useState(false);
  const [qrTicketId, setQrTicketId] = useState<string | null>(null);

  const selectedEvent = useMemo(
    () => DEMO_EVENTS.find((e) => e.id === selectedEventId) ?? null,
    [selectedEventId]
  );

  const checkoutEvent = useMemo(
    () => DEMO_EVENTS.find((e) => e.id === checkoutEventId) ?? null,
    [checkoutEventId]
  );

  const qrTicket = useMemo(
    () => DEMO_TICKETS.find((t) => t.id === qrTicketId) ?? null,
    [qrTicketId]
  );
  const qrEvent = useMemo(
    () => DEMO_EVENTS.find((e) => e.id === qrTicket?.eventId) ?? null,
    [qrTicket, qrTicketId]
  );

  const isAccountRoute =
    route === "/account" ||
    route === "/account/tickets" ||
    route === "/account/orders" ||
    route === "/account/profile";

  function openEvent(id: string) {
    setSelectedEventId(id);
    setRoute("event");
  }

  function buyTicket(id: string) {
    setCheckoutEventId(id);
    setCheckoutOpen(true);
  }

  const goLanding = () => {
    setRoute("landing");
    setSelectedEventId(null);
  };

  const goEventsHome = () => {
    setRoute("home");
    setSelectedEventId(null);
  };

  const goAccount = (path: AccountRoute = "/account") => setRoute(path);
  const goAdmin = () => setRoute("admin");

  if (route === "landing") {
    return (
      <Landing
        onEnter={goEventsHome}
        events={DEMO_EVENTS}
        userCity={DEMO_USER.city}
        onOpenEvent={(id) => openEvent(id)}
        onBuy={(id) => buyTicket(id)}
      />
    );
  }


  if (isAccountRoute) {
    return (
      <AccountLayout
        user={DEMO_USER}
        active={route}
        onNavigate={(p) => {
          if (p === "/") return goEventsHome();
          if (p === "/account") return setRoute("/account");
          if (p === "/account/tickets") return setRoute("/account/tickets");
          if (p === "/account/orders") return setRoute("/account/orders");
          if (p === "/account/profile") return setRoute("/account/profile");
        }}
      >
        {route === "/account" ? (
          <AccountPage
            user={DEMO_USER}
            events={DEMO_EVENTS}
            tickets={DEMO_TICKETS}
            orders={DEMO_ORDERS}
            onOpenTicket={(id) => {
              setQrTicketId(id);
              setQrOpen(true);
            }}
          />
        ) : route === "/account/tickets" ? (
          <TicketsPage
            events={DEMO_EVENTS}
            tickets={DEMO_TICKETS}
            onOpenTicket={(id) => {
              setQrTicketId(id);
              setQrOpen(true);
            }}
          />
        ) : route === "/account/orders" ? (
          <OrdersPage orders={DEMO_ORDERS} tickets={DEMO_TICKETS} />
        ) : (
          <ProfilePage user={DEMO_USER} />
        )}

        <QRModal
          open={qrOpen}
          onClose={() => {
            setQrOpen(false);
            setQrTicketId(null);
          }}
          ticket={qrTicket}
          event={qrEvent}
        />
      </AccountLayout>
    );
  }

  return (
    <Shell footer={<FooterMark />}>
      <TopNav
        isAuthed={isAuthed}
        userHandle={isAuthed ? DEMO_USER.handle : null}
        onLogin={() => setLoginOpen(true)}
        onLogout={() => setIsAuthed(false)}
        onHome={goLanding}
        onAccount={() => goAccount("/account")}
      />

     {route === "admin" ? (
        <AdminDashboard onBack={goEventsHome} />
      ) : route === "home" ? (
        <EventsHome
          events={DEMO_EVENTS}
          userCity={DEMO_USER.city}
          onOpenEvent={(id) => openEvent(id)}
          onBuy={(id) => buyTicket(id)}
          onOpenAdmin={goAdmin}
        />
      ) : selectedEvent ? (
        <EventDetail
          ev={selectedEvent}
          isAuthed={isAuthed}
          onBack={() => goEventsHome()}
          onBuy={() => buyTicket(selectedEvent.id)}
        />
      ) : (
        <EventsHome
          events={DEMO_EVENTS}
          onOpenEvent={(id) => openEvent(id)}
          onBuy={(id) => buyTicket(id)}
          onOpenAdmin={goAdmin}
        />
      )}

      <Login
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={() => {
          setIsAuthed(true);
          if (checkoutEventId) {
            setCheckoutOpen(true);
          }
        }}
      />

      <Checkout
        open={checkoutOpen}
        ev={checkoutEvent}
        onClose={() => {
          setCheckoutOpen(false);
          setCheckoutEventId(null);
        }}
          onLogin={() => setLoginOpen(true)}
      />
    </Shell>
  );
}
