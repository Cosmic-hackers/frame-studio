"use server";

import { headers } from "next/headers";
import type { ActionState } from "@/lib/action-state";
import { assessTiming, countLinks, rateLimit } from "@/lib/spam";
import { createPublicClient } from "@/lib/supabase/public";
import { fieldErrorsFrom, inquirySchema } from "@/lib/validators";
import { sendInquiryNotification } from "@/lib/notifications";

export async function submitInquiry(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = inquirySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company") ?? "",
    projectType: formData.get("projectType"),
    budgetRange: formData.get("budgetRange"),
    timeline: formData.get("timeline"),
    description: formData.get("description"),
    companyWebsite: formData.get("companyWebsite") ?? "",
    startedAt: formData.get("startedAt") ?? "",
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Check the highlighted fields and try again.",
      fieldErrors: fieldErrorsFrom(parsed.error),
    };
  }

  const input = parsed.data;
  if (input.companyWebsite.trim()) {
    return {
      ok: true,
      message: "Message received. The studio will read it from the inquiry desk.",
      fieldErrors: {},
    };
  }

  const timing = assessTiming(Number(input.startedAt));
  if (timing) {
    return {
      ok: false,
      message:
        timing === "expired"
          ? "This form sat open too long. Refresh the page and send it again."
          : "Take a moment to review the message, then send it.",
      fieldErrors: {},
    };
  }

  if (countLinks(input.description) > 2) {
    return {
      ok: false,
      message: "Remove extra links from the description and send it again.",
      fieldErrors: { description: "Keep links to two or fewer." },
    };
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "local";
  if (!rateLimit(`inquiry:${ip}`)) {
    return {
      ok: false,
      message: "Too many messages from this connection. Try again in a few minutes.",
      fieldErrors: {},
    };
  }

  const supabase = createPublicClient();
  if (!supabase) {
    return {
      ok: false,
      message:
        "The inquiry database is not connected. Add the Supabase environment variables, then send the message again.",
      fieldErrors: {},
    };
  }

  const { error } = await supabase.from("inquiries").insert({
    name: input.name,
    email: input.email,
    company: input.company?.trim() ? input.company.trim() : null,
    project_type: input.projectType,
    budget_range: input.budgetRange,
    timeline: input.timeline,
    description: input.description,
    status: "new",
  });

  if (error) {
    return {
      ok: false,
      message: "The message could not be saved. Try again in a moment.",
      fieldErrors: {},
    };
  }

  // Dispatch background email & webhook notifications to studio owner
  await sendInquiryNotification({
    name: input.name,
    email: input.email,
    company: input.company?.trim() ? input.company.trim() : null,
    projectType: input.projectType,
    budgetRange: input.budgetRange,
    timeline: input.timeline,
    description: input.description,
  });

  return {
    ok: true,
    message: "Message received. It is stored for the studio to review.",
    fieldErrors: {},
  };
}
