"use client";

import { useEffect } from "react";

function contactTypeFromLink(link) {
  const href = link.getAttribute("href") || "";
  if (/^tel:/i.test(href)) return "phone";

  try {
    const url = new URL(href, window.location.href);
    const host = url.hostname.toLowerCase();
    if (
      host === "wa.me" ||
      host === "api.whatsapp.com" ||
      url.protocol === "whatsapp:"
    ) {
      return "whatsapp";
    }
  } catch {
    return null;
  }

  return null;
}

function sendClick(type) {
  const body = JSON.stringify({
    type,
    page: window.location.pathname,
  });

  if (navigator.sendBeacon) {
    const queued = navigator.sendBeacon(
      "/api/clicks",
      new Blob([body], { type: "application/json" }),
    );
    if (queued) return;
  }

  fetch("/api/clicks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    credentials: "same-origin",
    keepalive: true,
  }).catch(() => {});
}

export default function ClickTracker() {
  useEffect(() => {
    const onClick = (event) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a[href]");
      if (!link) return;

      const type = contactTypeFromLink(link);
      if (type) sendClick(type);
    };

    const onSubmit = (event) => {
      if (!(event.target instanceof HTMLFormElement)) return;
      if (event.target.dataset.contactAction === "whatsapp") {
        sendClick("whatsapp");
      }
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("submit", onSubmit, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("submit", onSubmit, true);
    };
  }, []);

  return null;
}
