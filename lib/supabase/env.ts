export type SupabasePublicConfig = {
  url: string;
  publishableKey: string;
};

let rejectedKeyWarningShown = false;

function warnRejectedKey() {
  if (rejectedKeyWarningShown) return;
  rejectedKeyWarningShown = true;
  console.error(
    "Supabase refused NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. Set the project publishable key. Secret keys are not accepted in public configuration.",
  );
}

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function legacyJwtRole(key: string) {
  const segment = key.split(".")[1];
  if (!segment) return null;
  try {
    const padded = segment.replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(padded);
    const payload = JSON.parse(json) as { role?: unknown };
    return typeof payload.role === "string" ? payload.role : null;
  } catch {
    return null;
  }
}

function isPublishableKey(key: string) {
  if (key.startsWith("sb_secret")) return false;
  if (key.startsWith("sb_publishable_")) return key.length > "sb_publishable_".length;
  if (key.startsWith("eyJ") && key.split(".").length === 3) {
    return legacyJwtRole(key) === "anon";
  }
  return false;
}

export function getSupabasePublicConfig(): SupabasePublicConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ?? "";
  if (!url || !publishableKey) return null;
  if (!isHttpUrl(url) || !isPublishableKey(publishableKey)) {
    warnRejectedKey();
    return null;
  }
  return { url, publishableKey };
}

export function isSupabaseConfigured() {
  return getSupabasePublicConfig() !== null;
}
