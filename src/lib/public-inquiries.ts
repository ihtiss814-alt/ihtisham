import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export interface PublicInquiryPayload {
  name: string;
  email: string;
  phone: string;
  country: string;
  destination_port: string;
  message: string;
  inquiry_type: string;
}

/**
 * Keep public enquiry writes on the stable fields already used by the Contact
 * form. Vehicle references, model names, budgets and requirements belong in
 * message until the live inquiries table schema is explicitly verified.
 */
export async function savePublicInquiry(
  payload: PublicInquiryPayload,
  source: "contact" | "vehicle" | "quote",
): Promise<void> {
  if (!isSupabaseConfigured) {
    throw new Error("INQUIRY_NOT_CONFIGURED");
  }

  try {
    const { error } = await supabase.from("inquiries").insert([payload]);
    if (error) throw error;
  } catch (error) {
    const candidate =
      error && typeof error === "object"
        ? (error as { code?: unknown; status?: unknown; message?: unknown })
        : undefined;
    const code = typeof candidate?.code === "string" ? candidate.code : "unknown";
    const status =
      typeof candidate?.status === "number" || typeof candidate?.status === "string"
        ? candidate.status
        : undefined;
    const message = typeof candidate?.message === "string" ? candidate.message : String(error);

    // Record the database reason without logging the customer's submitted data.
    console.error("[public-inquiry] Save failed", { source, code, status, message });
    throw error;
  }
}

export function publicInquiryErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message === "INQUIRY_NOT_CONFIGURED") {
    return "The online enquiry service is not configured. Please contact us through WhatsApp or email.";
  }

  const candidate =
    error && typeof error === "object"
      ? (error as { code?: unknown; status?: unknown; message?: unknown })
      : undefined;
  const code = typeof candidate?.code === "string" ? candidate.code : "";
  const message = typeof candidate?.message === "string" ? candidate.message : "";
  const status = candidate?.status;

  if (code === "42501" || code === "PGRST301" || status === 401 || status === 403) {
    return "The online enquiry service is temporarily blocked by a permissions issue. Please contact us directly so your request is not lost.";
  }
  if (code === "PGRST204" || code === "PGRST205" || code === "42703") {
    return "The online enquiry service needs a database configuration check. Please contact us directly while this is being resolved.";
  }
  if (error instanceof TypeError || /failed to fetch|network|load failed|timeout/i.test(message)) {
    return "We could not connect to the enquiry service. Please check your connection and try again, or contact us directly.";
  }

  return "We could not save this enquiry. Your details have not been confirmed as received. Please try again or contact us directly using WhatsApp or email.";
}
