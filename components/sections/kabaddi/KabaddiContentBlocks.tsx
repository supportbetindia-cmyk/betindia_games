import { kabaddiContent } from "@/data/kabaddi";
import { Shield, Heart, Clock, AlertTriangle, Wallet, HelpCircle } from "lucide-react";

type BlockProps = {
  id?: string;
  title: string;
  paragraphs?: string[];
  listLabel?: string;
  bullets?: string[];
  closing?: string;
  gradientWord?: string;
};

export function KabaddiContentBlock({
  id,
  title,
  paragraphs = [],
  listLabel,
  bullets,
  closing,
  gradientWord,
}: BlockProps) {
  return (
    <section id={id} className="relative overflow-hidden bg-[#050B18] border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl text-center">
          {gradientWord && title.includes(gradientWord) ? (
            <>
              {title.split(gradientWord)[0]}
              <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
                {gradientWord}
              </span>
              {title.split(gradientWord)[1]}
            </>
          ) : (
            title
          )}
        </h2>

        <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-300 sm:text-base">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
        </div>

        {listLabel && <p className="mt-6 text-sm font-semibold text-slate-200 sm:text-base">{listLabel}</p>}

        {bullets && bullets.length > 0 && (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {bullets.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 text-sm leading-relaxed text-slate-300"
              >
                <span className="mt-0.5 shrink-0 text-[#138808]">✔</span>
                {item}
              </li>
            ))}
          </ul>
        )}

        {closing && <p className="mt-6 text-sm leading-relaxed text-slate-400 sm:text-base">{closing}</p>}
      </div>
    </section>
  );
}

export default function KabaddiWhatIs() {
  const data = kabaddiContent.whatIsKabaddi;
  return (
    <KabaddiContentBlock
      title={data.title}
      paragraphs={data.paragraphs}
      listLabel={data.listLabel}
      bullets={data.bullets}
      closing={data.closing}
      gradientWord="Kabaddi Betting"
    />
  );
}

export function KabaddiHowMatchesWork() {
  const data = kabaddiContent.howMatchesWork;
  return <KabaddiContentBlock title={data.title} paragraphs={data.paragraphs} gradientWord="Kabaddi Matches" />;
}

export function KabaddiWhyPopular() {
  const data = kabaddiContent.whyPopular;
  return (
    <KabaddiContentBlock title={data.title} paragraphs={data.paragraphs} gradientWord="Sports Betting" />
  );
}

export function KabaddiMistakes() {
  const data = kabaddiContent.mistakes;
  return (
    <KabaddiContentBlock
      title={data.title}
      paragraphs={[data.intro]}
      listLabel={data.listLabel}
      bullets={data.bullets}
      closing={data.closing}
      gradientWord="Betting Mistakes"
    />
  );
}

export function KabaddiResponsible() {
  const data = kabaddiContent.responsible;

  const rules = [
    { text: "Set a betting budget.", icon: Wallet, color: "#FF6B00" },
    { text: "Never chase losses.", icon: AlertTriangle, color: "#138808" },
    { text: "Bet responsibly.", icon: Shield, color: "#FF6B00" },
    { text: "Only wager money you can afford to lose.", icon: Wallet, color: "#138808" },
    { text: "Take regular breaks.", icon: Clock, color: "#FF6B00" },
    { text: "Seek support if gambling becomes a problem.", icon: HelpCircle, color: "#138808" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 lg:px-8 border-t border-white/[0.04]">
      {/* Background ambient glows */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/4 h-[400px] w-[400px] rounded-full bg-[#FF6B00]/5 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full bg-[#138808]/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">

          {/* Left Column: Heading and info */}
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-red-400">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              Play Safe
            </span>

            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Responsible{" "}
              <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
                Gambling
              </span>
            </h2>

            <p className="text-base leading-relaxed text-slate-300">
              {data.intro}
            </p>

            <p className="text-sm leading-relaxed text-slate-400">
              {data.closing}
            </p>

            <div className="rounded-2xl border border-white/[0.08] bg-[#071324] p-5">
              <h4 className="text-sm font-bold text-white">Need Assistance?</h4>
              <p className="mt-1 text-xs text-slate-400">
                If betting stops being fun, take control. Reach out to support or local help organizations immediately.
              </p>
            </div>
          </div>

          {/* Right Column: Dynamic Cards Grid */}
          <div className="lg:col-span-7">
            <p className="mb-6 text-sm font-semibold text-slate-200 uppercase tracking-widest">{data.alwaysLabel}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {rules.map(({ text, icon: Icon, color }) => (
                <div
                  key={text}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]"
                >
                  <div className="flex gap-4">
                    <span
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border transition-colors duration-300"
                      style={{
                        borderColor: `${color}30`,
                        backgroundColor: `${color}10`,
                        color: color
                      }}
                    >
                      <Icon size={18} strokeWidth={2.5} />
                    </span>
                    <p className="text-sm font-semibold leading-relaxed text-slate-200 group-hover:text-white transition-colors">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
