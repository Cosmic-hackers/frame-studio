"use server";

import { redirect } from "next/navigation";
import type { ActionState } from "@/lib/action-state";
import { createClient } from "@/lib/supabase/server";

export async function signIn(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient();
  if (!supabase) {
    return {
      ok: false,
      message: "Supabase is not configured. Add the environment variables before signing in.",
      fieldErrors: {},
    };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return {
      ok: false,
      message: "Those credentials were not recognized.",
      fieldErrors: {},
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, message: "Those credentials were not recognized.", fieldErrors: {} };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    await supabase.auth.signOut();
    return {
      ok: false,
      message: "This account does not have studio access.",
      fieldErrors: {},
    };
  }

  redirect("/admin/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/admin/login");
}
