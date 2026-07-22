import Link from "next/link";
import { Mail, Clock } from "lucide-react";

export default function TermsContact() {
  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FF6B00]/20 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/5 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-20 h-[360px] w-[360px] rounded-full bg-[#138808]/6 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
          Questions About These{" "}
          <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#FF6B00] bg-clip-text text-transparent">
            Terms?
          </span>
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
          If you have questions regarding these Terms &amp; Conditions, please contact our support team.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.04] px-5 py-4 backdrop-blur-md">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00]">
              <Mail size={14} strokeWidth={2} />
            </span>
            <span className="text-sm font-semibold text-slate-300">support@betindia.com</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.04] px-5 py-4 backdrop-blur-md">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[#138808]/30 bg-[#138808]/10 text-[#138808]">
              <Clock size={14} strokeWidth={2} />
            </span>
            <span className="text-sm font-semibold text-slate-300">24/7 Customer Assistance</span>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B00] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#FF6B00]/25 transition-all duration-300 hover:scale-[1.02] hover:bg-[#FF8A00] hover:shadow-[#FF6B00]/40"
          >
            Contact Support
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
