"use client";

import { useState, type FormEvent } from "react";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";

type Status = "idle" | "submitting" | "success";

type NewsletterContent = {
  titleLead?: string;
  titleAccent?: string;
  description?: string;
  buttonText?: string;
};

const DEFAULT_CONTENT: Required<NewsletterContent> = {
  titleLead: "Never Miss",
  titleAccent: "An Update",
  description:
    "Get the latest betting guides, casino tips, promotions, and platform updates delivered directly to your inbox.",
  buttonText: "Subscribe",
};

export default function NewsletterCTA({
  content = DEFAULT_CONTENT,
}: {
  content?: NewsletterContent;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 1400);
  }

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute left-1/4 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/11 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute right-1/4 top-1/2 h-[540px] w-[540px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138808]/8 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <div
          className="rounded-3xl p-px"
          style={{ background: "linear-gradient(135deg, rgba(255,107,0,0.45) 0%, rgba(255,138,0,0.18) 40%, rgba(19,136,8,0.22) 100%)" }}
        >
          <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#081425]/95 p-8 text-center backdrop-blur-xl md:p-12">
            {/* Inner glows */}
            <div aria-hidden className="pointer-events-none absolute -left-14 -top-14 h-52 w-52 rounded-full bg-[#FF6B00]/9 blur-2xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-14 -right-14 h-52 w-52 rounded-full bg-[#138808]/7 blur-2xl" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.035] via-transparent to-transparent" />

            {status === "success" ? (
              <div className="relative flex flex-col items-center gap-5 py-6">
                <div className="grid h-20 w-20 place-items-center rounded-full border border-[#138808]/40 bg-[#138808]/15">
                  <CheckCircle2 size={38} strokeWidth={1.5} className="text-[#138808]" />
                </div>
                <div>
                  <p className="text-xl font-extrabold text-white">You&apos;re Subscribed!</p>
                  <p className="mt-2 text-sm text-slate-400">
                    Welcome to the BetIndia insider list. Expect expert guides and updates in your inbox.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Icon */}
                <div className="relative mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl border border-[#FF6B00]/30 bg-[#FF6B00]/12">
                  <Mail size={28} strokeWidth={1.6} className="text-[#FF6B00]" />
                </div>

                <h2 className="relative text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl">
                  {content.titleLead ?? DEFAULT_CONTENT.titleLead}{" "}
                  <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#138808] bg-clip-text text-transparent">
                    {content.titleAccent ?? DEFAULT_CONTENT.titleAccent}
                  </span>
                </h2>
                <p className="relative mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-400 md:text-base">
                  {content.description ?? DEFAULT_CONTENT.description}
                </p>

                {/* Form */}
                <form
                  onSubmit={handleSubmit}
                  className="relative mt-8 flex flex-col gap-3 sm:flex-row"
                >
                  <div className="relative flex-1">
                    <Mail
                      size={15}
                      strokeWidth={2}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-600 outline-none backdrop-blur-sm transition-all duration-200 focus:border-[#FF6B00]/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#FF6B00]/15"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#FF6B00]/25 transition-all duration-300 hover:scale-[1.02] hover:bg-[#FF8A00] hover:shadow-[#FF6B00]/40 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={15} strokeWidth={2.5} className="animate-spin" />
                        Subscribing…
                      </>
                    ) : (
                      content.buttonText ?? DEFAULT_CONTENT.buttonText
                    )}
                  </button>
                </form>

                {/* Trust text */}
                <p className="relative mt-5 text-[11px] font-semibold text-slate-600">
                  No Spam&nbsp;·&nbsp;Useful Updates&nbsp;·&nbsp;Unsubscribe Anytime
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
