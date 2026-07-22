"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, Loader2, Clock, ShieldCheck, Sparkles, MessagesSquare } from "lucide-react";

const SUBJECTS = [
  "Account Support",
  "Deposits & Withdrawals",
  "Sports Betting",
  "Casino Games",
  "Promotions",
  "Other",
] as const;

type Status = "idle" | "submitting" | "success";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fields, setFields] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    // Simulate API call
    setTimeout(() => setStatus("success"), 1500);
  }

  const inputBase =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none backdrop-blur-sm transition-all duration-200 focus:border-[#FF6B00]/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#FF6B00]/15";

  const labelBase =
    "mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400";

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      {/* Ambient Glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-[#FF6B00]/5 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-[#138808]/4 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
            Send Us A Message
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            How Can We{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#138808] bg-clip-text text-transparent">
              Help You?
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-slate-400">
            Fill out the form below and our dedicated support team will get back to you as soon as possible.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-stretch">
          
          {/* Left Column: Support info & stats */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="flex-1 rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl flex flex-col justify-center">
              <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                <MessagesSquare className="text-[#FF6B00]" size={22} />
                BetIndia Customer Care
              </h3>
              <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                Our support team is dedicated to providing fast and reliable assistance for players across India. We operate 24 hours a day, 7 days a week.
              </p>
              
              <div className="mt-8 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/15">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-white font-bold uppercase tracking-wider">Average Response Time</p>
                    <p className="text-sm font-bold text-slate-500">Under 2 Minutes</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#138808]/10 text-[#138808] border border-[#138808]/15">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-white font-bold uppercase tracking-wider">Data Protection & Privacy</p>
                    <p className="text-sm font-bold text-slate-500">SSL Encrypted & Secured</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/15">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-white font-bold uppercase tracking-wider">Availability</p>
                    <p className="text-sm font-bold text-slate-500">24/7/365 Support Access</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl">
              <h4 className="text-xs font-bold text-white uppercase tracking-[0.15em] flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#138808]" />
                Support Notice
              </h4>
              <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                For security enquiries and account verification support, please ensure you use your registered email address so that our agents can retrieve your account credentials immediately.
              </p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 flex">
            <div
              className="w-full overflow-hidden rounded-3xl p-px flex"
              style={{ background: "linear-gradient(135deg, rgba(255,107,0,0.3) 0%, rgba(255,255,255,0.06) 50%, rgba(19,136,8,0.2) 100%)" }}
            >
              <div className="relative flex-1 overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#081425]/95 p-8 backdrop-blur-xl md:p-10 flex flex-col justify-center">
                <div aria-hidden className="pointer-events-none absolute -left-12 -top-12 h-44 w-44 rounded-full bg-[#FF6B00]/8 blur-2xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-12 -right-12 h-44 w-44 rounded-full bg-[#138808]/6 blur-2xl" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.025] via-transparent to-transparent" />

                {status === "success" ? (
                  <div className="relative flex flex-col items-center gap-5 py-10 text-center">
                    <div className="grid h-20 w-20 place-items-center rounded-full border border-[#138808]/40 bg-[#138808]/15">
                      <CheckCircle2 size={40} strokeWidth={1.5} className="text-[#138808]" />
                    </div>
                    <div>
                      <p className="text-xl font-extrabold text-white">Message Sent!</p>
                      <p className="mt-2 text-sm text-slate-400">
                        Thanks for reaching out. Our support team will get back to you within 24 hours.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setStatus("idle");
                        setFields({ name: "", email: "", subject: "", message: "" });
                      }}
                      className="mt-2 rounded-xl border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="relative space-y-5">
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className={labelBase}>Full Name</label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={fields.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          className={inputBase}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className={labelBase}>Email Address</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={fields.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          className={inputBase}
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className={labelBase}>Subject</label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={fields.subject}
                        onChange={handleChange}
                        className={[
                          inputBase,
                          "cursor-pointer",
                          fields.subject === "" ? "text-slate-600" : "text-white",
                        ].join(" ")}
                      >
                        <option value="" disabled className="bg-[#081425] text-slate-400">
                          Select a topic
                        </option>
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s} className="bg-[#081425] text-white">
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className={labelBase}>Message</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={fields.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        className={[inputBase, "resize-none"].join(" ")}
                      />
                    </div>

                    {/* Marketing consent checkbox */}
                    <label className="flex items-start gap-3 mt-4 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        required
                        className="mt-1 h-4 w-4 shrink-0 rounded border-white/10 bg-white/[0.04] text-[#FF6B00] accent-[#FF6B00] outline-none transition-all focus:ring-2 focus:ring-[#FF6B00]/15 cursor-pointer"
                      />
                      <span className="text-xs leading-normal text-slate-400">
                        I agree to receive promotional offers, account updates and service
                        notifications from BetIndia via RCS, WhatsApp, SMS and Email.
                        I understand that I can opt out at any time.
                      </span>
                    </label>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#FF6B00] py-4 text-base font-bold text-white shadow-lg shadow-[#FF6B00]/25 transition-all duration-300 hover:scale-[1.01] hover:bg-[#FF8A00] hover:shadow-[#FF6B00]/40 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 size={18} strokeWidth={2} className="animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send size={17} strokeWidth={2} />
                          Send Message
                        </>
                      )}
                    </button>

                    <p className="text-center text-[11px] text-slate-600">
                      We typically respond within 24 hours · Your data is always secure
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
