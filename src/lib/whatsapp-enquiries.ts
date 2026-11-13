const DEFAULT_WHATSAPP_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER || "818089227375").replace(/\D/g, "");

export function buildWhatsAppHref(message: string, phoneNumber = DEFAULT_WHATSAPP_NUMBER): string {
  const number = phoneNumber.replace(/\D/g, "");
  if (!/^\d{8,15}$/.test(number)) {
    throw new Error("WhatsApp business number is not configured with a valid international number.");
  }
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Open the prepared WhatsApp message directly from a user gesture.
 * When a browser blocks the new tab, fall back to the same tab rather than
 * leaving the customer with a non-working submission button.
 */
export function openWhatsAppEnquiry(message: string): void {
  const href = buildWhatsAppHref(message);
  const opened = window.open(href, "_blank");
  if (opened) {
    opened.opener = null;
    return;
  }
  window.location.assign(href);
}
