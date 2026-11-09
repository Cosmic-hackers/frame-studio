"use client";

import { useActionState, useState } from "react";
import { submitInquiry } from "@/lib/actions/inquiries";
import type { ActionState } from "@/lib/action-state";
import { PROJECT_TYPES, BUDGET_RANGES, TIMELINES } from "@/lib/types";
import { Magnetic } from "@/components/Magnetic";
import { motion, AnimatePresence } from "motion/react";

const initialState: ActionState = {
  ok: false,
  message: "",
  fieldErrors: {},
};

export function InquiryForm() {
  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);
  const [startedAt] = useState<string>(() => Date.now().toString());

  return (
    <div className="w-full">
      <AnimatePresence>
        {state.message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 mb-6 text-xs border rounded-xs transition-colors ${
              state.ok
                ? "bg-[#c8ff00]/10 border-[#c8ff00] text-[#c8ff00] shadow-[0_0_15px_rgba(200,255,0,0.15)]"
                : "bg-red-950/40 border-red-500/50 text-red-200"
            }`}
          >
            {state.message}
          </motion.div>
        )}
      </AnimatePresence>

      {state.ok ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="p-8 sm:p-12 border border-[#c8ff00]/50 bg-[#0d0d0d] text-center shadow-[0_0_30px_rgba(200,255,0,0.1)] rounded-xs"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
            className="w-14 h-14 rounded-full border-2 border-[#c8ff00] text-[#c8ff00] flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-[0_0_20px_rgba(200,255,0,0.3)]"
          >
            ✓
          </motion.div>
          <h4 className="text-white font-bold text-xl uppercase tracking-tight">
            Transmission Received
          </h4>
          <p className="text-neutral-400 text-sm mt-2 max-w-sm mx-auto">
            Thank you for reaching out. We will review your inquiry and get back to you within 48 hours.
          </p>
        </motion.div>
      ) : (
        <form action={formAction} className="space-y-4 text-xs">
          {/* Honeypot & timing */}
          <input
            type="text"
            name="companyWebsite"
            tabIndex={-1}
            autoComplete="off"
            className="hp"
            aria-hidden="true"
          />
          <input type="hidden" name="startedAt" value={startedAt} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono text-neutral-400 mb-1.5 uppercase tracking-wider">
                Name <span className="text-[#c8ff00]">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Jane Doe"
                className="w-full bg-[#0d0d0d] border border-neutral-800 px-4 py-3.5 text-sm text-white placeholder-neutral-600 rounded-xs focus:border-[#c8ff00] focus:shadow-[0_0_15px_rgba(200,255,0,0.15)] focus:outline-none transition-all duration-200"
              />
              {state.fieldErrors?.name && (
                <p className="text-red-400 text-[11px] mt-1.5">{state.fieldErrors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-mono text-neutral-400 mb-1.5 uppercase tracking-wider">
                Email Address <span className="text-[#c8ff00]">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="jane@studio.com"
                className="w-full bg-[#0d0d0d] border border-neutral-800 px-4 py-3.5 text-sm text-white placeholder-neutral-600 rounded-xs focus:border-[#c8ff00] focus:shadow-[0_0_15px_rgba(200,255,0,0.15)] focus:outline-none transition-all duration-200"
              />
              {state.fieldErrors?.email && (
                <p className="text-red-400 text-[11px] mt-1.5">{state.fieldErrors.email}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-neutral-400 mb-1.5 uppercase tracking-wider">
              Company / Organization <span className="text-neutral-600 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              name="company"
              placeholder="Acme Corp"
              className="w-full bg-[#0d0d0d] border border-neutral-800 px-4 py-3.5 text-sm text-white placeholder-neutral-600 rounded-xs focus:border-[#c8ff00] focus:shadow-[0_0_15px_rgba(200,255,0,0.15)] focus:outline-none transition-all duration-200"
            />
            {state.fieldErrors?.company && (
              <p className="text-red-400 text-[11px] mt-1.5">{state.fieldErrors.company}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-mono text-neutral-400 mb-1.5 uppercase tracking-wider">
                Project Type <span className="text-[#c8ff00]">*</span>
              </label>
              <div className="relative">
                <select
                  name="projectType"
                  defaultValue={PROJECT_TYPES[0]}
                  className="w-full bg-[#0d0d0d] border border-neutral-800 px-3.5 py-3.5 text-sm text-white rounded-xs focus:border-[#c8ff00] focus:shadow-[0_0_15px_rgba(200,255,0,0.15)] focus:outline-none transition-all duration-200 appearance-none cursor-pointer"
                >
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-[#111111] text-white">
                      {t}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 text-xs">
                  ▼
                </span>
              </div>
              {state.fieldErrors?.projectType && (
                <p className="text-red-400 text-[11px] mt-1.5">{state.fieldErrors.projectType}</p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-mono text-neutral-400 mb-1.5 uppercase tracking-wider">
                Budget Range <span className="text-[#c8ff00]">*</span>
              </label>
              <div className="relative">
                <select
                  name="budgetRange"
                  defaultValue={BUDGET_RANGES[1]}
                  className="w-full bg-[#0d0d0d] border border-neutral-800 px-3.5 py-3.5 text-sm text-white rounded-xs focus:border-[#c8ff00] focus:shadow-[0_0_15px_rgba(200,255,0,0.15)] focus:outline-none transition-all duration-200 appearance-none cursor-pointer"
                >
                  {BUDGET_RANGES.map((b) => (
                    <option key={b} value={b} className="bg-[#111111] text-white">
                      {b.startsWith("Still") || b.startsWith("Under") ? b : `$${b}`}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 text-xs">
                  ▼
                </span>
              </div>
              {state.fieldErrors?.budgetRange && (
                <p className="text-red-400 text-[11px] mt-1.5">{state.fieldErrors.budgetRange}</p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-mono text-neutral-400 mb-1.5 uppercase tracking-wider">
                Timeline <span className="text-[#c8ff00]">*</span>
              </label>
              <div className="relative">
                <select
                  name="timeline"
                  defaultValue={TIMELINES[1]}
                  className="w-full bg-[#0d0d0d] border border-neutral-800 px-3.5 py-3.5 text-sm text-white rounded-xs focus:border-[#c8ff00] focus:shadow-[0_0_15px_rgba(200,255,0,0.15)] focus:outline-none transition-all duration-200 appearance-none cursor-pointer"
                >
                  {TIMELINES.map((tl) => (
                    <option key={tl} value={tl} className="bg-[#111111] text-white">
                      {tl}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 text-xs">
                  ▼
                </span>
              </div>
              {state.fieldErrors?.timeline && (
                <p className="text-red-400 text-[11px] mt-1.5">{state.fieldErrors.timeline}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-neutral-400 mb-1.5 uppercase tracking-wider">
              Project Brief <span className="text-[#c8ff00]">*</span>
            </label>
            <textarea
              name="description"
              required
              rows={4}
              placeholder="Tell us about your project goals, scope, and vision (min 30 characters)..."
              className="w-full bg-[#0d0d0d] border border-neutral-800 p-4 text-sm text-white placeholder-neutral-600 rounded-xs focus:border-[#c8ff00] focus:shadow-[0_0_15px_rgba(200,255,0,0.15)] focus:outline-none transition-all duration-200 resize-none"
            />
            {state.fieldErrors?.description && (
              <p className="text-red-400 text-[11px] mt-1.5">{state.fieldErrors.description}</p>
            )}
          </div>

          <div className="pt-2">
            <Magnetic strength={0.2}>
              <button
                type="submit"
                disabled={isPending}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#c8ff00] text-black px-8 py-4 text-xs uppercase font-bold tracking-wider rounded-xs hover:bg-white active:scale-[0.98] transition-all duration-200 disabled:opacity-50 shadow-[0_0_20px_rgba(200,255,0,0.25)] hover:shadow-[0_0_30px_rgba(200,255,0,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>{isPending ? "Transmitting..." : "Send Inquiry"}</span>
                <span className="text-sm leading-none transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </button>
            </Magnetic>
          </div>
        </form>
      )}
    </div>
  );
}
