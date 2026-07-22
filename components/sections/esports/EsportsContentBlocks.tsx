import { esportsContent } from "@/data/esports";
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

export function EsportsContentBlock({
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

export function EsportsWhatIs() {
  const data = esportsContent.whatIsEsports;
  return (
    <EsportsContentBlock
      title={data.title}
      paragraphs={data.paragraphs}
      listLabel={data.listLabel}
      bullets={data.bullets}
      closing={data.closing}
      gradientWord="Esports Betting"
    />
  );
}

export function EsportsWhyBet() {
  const data = esportsContent.whyBetEsports;
  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 lg:px-8 border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">
          Why Bet on{" "}
          <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
            Esports?
          </span>
        </h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#138808]" />
        <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">{data.intro}</p>
        <p className="mx-auto mt-6 text-sm font-semibold text-slate-200 sm:text-base">{data.listLabel}</p>

        <ul className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 text-left sm:grid-cols-2">
          {data.items.map(({ title, description }) => (
            <li
              key={title}
              className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 text-sm leading-relaxed text-slate-300"
            >
              <span className="font-semibold text-white">{title}: </span>
              {description}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function EsportsHowWorks() {
  const data = esportsContent.howWorks;
  return (
    <EsportsContentBlock
      title={data.title}
      paragraphs={data.paragraphs}
      gradientWord="Esports Betting Works"
    />
  );
}

export function EsportsMarkets() {
  const data = esportsContent.markets;
  return (
    <section id="esports-markets" className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 lg:px-8 border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">
          Popular Esports{" "}
          <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
            Betting Markets
          </span>
        </h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#138808]" />
        <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">{data.intro}</p>

        <ul className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 text-left sm:grid-cols-2">
          {data.items.map(({ title, description }) => (
            <li
              key={title}
              className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 text-sm leading-relaxed text-slate-300"
            >
              <span className="font-semibold text-white">{title}: </span>
              {description}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function EsportsLiveBetting() {
  const data = esportsContent.liveBetting;
  return (
    <EsportsContentBlock
      title={data.title}
      paragraphs={data.paragraphs}
      gradientWord="Live Esports"
    />
  );
}

export function EsportsOddsWork() {
  const data = esportsContent.oddsWork;
  return (
    <EsportsContentBlock
      title={data.title}
      paragraphs={data.paragraphs}
      gradientWord="Esports Betting Odds"
    />
  );
}

export function EsportsHowToPlace() {
  const data = esportsContent.howToPlace;
  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 lg:px-8 border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">
          How to Place an Esports Bet on{" "}
          <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
            Bet India
          </span>
        </h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#138808]" />
        <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">{data.intro}</p>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
          {data.steps.map(({ step, title, description }) => (
            <div
              key={step}
              className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#071324] p-6 transition hover:border-[#FF6B00]/40"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF6B00]">{step}</span>
              <h3 className="mt-2 text-base font-bold text-white">{title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">{description}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-xs leading-relaxed text-slate-400 sm:text-sm">{data.closing}</p>
      </div>
    </section>
  );
}

export function EsportsPopularGames() {
  const data = esportsContent.popularGames;
  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 lg:px-8 border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">
          Popular Esports Games for{" "}
          <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
            Betting
          </span>
        </h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#138808]" />
        <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">{data.intro}</p>

        <div className="mx-auto mt-8 space-y-4 max-w-4xl text-left">
          {data.games.map(({ title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-5 leading-relaxed text-slate-300"
            >
              <h3 className="text-base font-bold text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-300">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EsportsTournaments() {
  const data = esportsContent.tournaments;
  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 lg:px-8 border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">
          Major Esports{" "}
          <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
            Tournaments
          </span>
        </h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#138808]" />
        <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">{data.intro}</p>

        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4 text-left sm:grid-cols-2">
          {data.items.map(({ title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-5 leading-relaxed text-slate-300"
            >
              <h3 className="text-base font-bold text-white">{title}</h3>
              <p className="mt-2 text-xs text-slate-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EsportsWhyChoose() {
  const data = esportsContent.whyChoose;
  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 lg:px-8 border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">
          Why Choose{" "}
          <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
            Bet India?
          </span>
        </h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#138808]" />
        <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">{data.intro}</p>

        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map(({ title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-5 leading-relaxed text-slate-300 hover:border-[#138808]/40"
            >
              <h3 className="text-base font-bold text-white">{title}</h3>
              <p className="mt-2 text-xs text-slate-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EsportsTips() {
  const data = esportsContent.tips;
  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 lg:px-8 border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">
          Esports Betting{" "}
          <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
            Tips & Strategies
          </span>
        </h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#138808]" />
        <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">{data.intro}</p>

        <ul className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-3 text-left sm:grid-cols-2">
          {data.items.map(({ title, description }) => (
            <li
              key={title}
              className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 text-sm leading-relaxed text-slate-300"
            >
              <span className="font-semibold text-white">{title}: </span>
              {description}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function EsportsMistakes() {
  const data = esportsContent.mistakes;
  return (
    <section className="relative overflow-hidden bg-[#050B18] px-4 py-16 sm:px-6 lg:px-8 border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl">
          Common Esports{" "}
          <span className="bg-gradient-to-r from-[#FF6B00] to-[#138808] bg-clip-text text-transparent">
            Betting Mistakes
          </span>
        </h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#138808]" />
        <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">{data.intro}</p>

        <ul className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-3 text-left sm:grid-cols-2">
          {data.items.map(({ title, description }) => (
            <li
              key={title}
              className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 text-sm leading-relaxed text-slate-300"
            >
              <span className="font-semibold text-white">{title}: </span>
              {description}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function EsportsResponsible() {
  const data = esportsContent.responsible;

  const rules = [
    { text: "Setting a betting budget", icon: Wallet, color: "#FF6B00" },
    { text: "Betting responsibly", icon: Shield, color: "#138808" },
    { text: "Taking regular breaks", icon: Clock, color: "#FF6B00" },
    { text: "Avoiding emotional decisions", icon: AlertTriangle, color: "#138808" },
    { text: "Managing your bankroll carefully", icon: Wallet, color: "#FF6B00" },
    { text: "Seeking support if gambling stops being enjoyable", icon: HelpCircle, color: "#138808" },
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
