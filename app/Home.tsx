import Header from "./Header";
import Reveal from "./Reveal";
import Films from "./Films";
import Record from "./Record";
import Corridor from "./Corridor";
import RequestProduct from "./RequestProduct";
import RequestButton from "./RequestButton";
import NogalesClock from "./NogalesClock";
import Logo from "./Logo";
import Honours from "./Honours";
import {
  ADDRESS,
  MAPS,
  EMAIL,
  PHONE,
  TEL,
  WAREHOUSE,
  WAREHOUSE_TEL,
  FORM_NAME,
  FORM_FIELDS,
  commodities,
  copy,
  credentials,
  films,
  record,
  type Bi,
  type Lang,
} from "./content";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

function Arrow() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
      <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

// Section opening in the hero's register: a small-caps label, the heading in Garamond,
// the short gold rule, then one paragraph.
function SectionHead({ label, title, lead, dark = false }: { label: string; title: React.ReactNode; lead?: string; dark?: boolean }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      <p data-reveal className={`label pt-4 ${dark ? "text-ivory/60" : "text-muted"}`}>
        {label}
      </p>
      <div>
        <h2
          data-reveal
          style={d(80)}
          className={`max-w-[44rem] font-display text-[2.6rem] leading-[1.02] font-medium tracking-[-0.015em] sm:text-[3.4rem] ${dark ? "text-ivory" : "text-ink"}`}
        >
          {title}
        </h2>
        <span data-reveal style={d(120)} className="mt-7 block h-px w-14 bg-sun" aria-hidden="true" />
        {lead && (
          <p data-reveal style={d(160)} className={`mt-6 max-w-[36rem] text-[1rem] leading-[1.75] ${dark ? "text-ivory/70" : "text-muted"}`}>
            {lead}
          </p>
        )}
      </div>
    </div>
  );
}

export default function Home({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const L = (x: Bi) => x[lang];
  return (
    <>
      <Reveal />
      <Header lang={lang} />

      <main id="top">
        {/* ---------- Hero: the portrait, his name, his title and three credentials. Nothing else. ---------- */}
        <section className="relative min-h-[100svh] overflow-hidden bg-night text-ivory">
          <div className="fade-in absolute inset-x-0 top-0 h-[58svh] overflow-hidden lg:inset-y-0 lg:right-0 lg:left-auto lg:h-auto lg:w-[54%]" style={d(100)}>
            <img src="/photos/jaime-portrait.jpg" alt={t.portraitAlt} className="h-full w-full object-cover object-[50%_18%]" />
            <div className="absolute inset-0 hidden bg-[linear-gradient(to_right,var(--color-night)_0%,rgb(12_19_16/0.9)_12%,rgb(12_19_16/0.55)_30%,rgb(12_19_16/0.15)_55%,transparent_75%)] lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent lg:via-night/25" />
            {/* keeps the header readable over the bright window behind him */}
            <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-night/90 via-night/45 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col px-5 pt-[34svh] pb-8 sm:px-8 lg:pt-[4.5rem] lg:pb-10">
            <div className="lg:pt-[15vh]">
              <h1 className="fade-in font-display text-[3.6rem] leading-[0.94] font-medium tracking-[-0.015em] sm:text-[5.2rem] lg:text-[6.4rem]" style={d(400)}>
                Jaime S.
                <br />
                Chamberlain
              </h1>
              <span className="fade-in mt-8 block h-px w-14 bg-sun" style={d(650)} aria-hidden="true" />
              <p className="fade-in mt-6 text-[0.76rem] font-medium tracking-[0.18em] text-ivory uppercase" style={d(800)}>
                {t.hero.role}
                <span className="mx-2.5 hidden text-ivory/35 sm:inline">·</span>
                <span className="mt-2 block sm:mt-0 sm:inline">{t.hero.company}</span>
              </p>
              <p className="fade-in mt-2 text-[0.76rem] tracking-[0.18em] text-ivory/60 uppercase" style={d(850)}>
                {t.hero.place}
              </p>
            </div>

            {/* his experiences, as a small row of cards that stays clear of the portrait */}
            <div className="fade-in mt-12 lg:mt-auto" style={d(1050)}>
              <Honours items={credentials} lang={lang} />
            </div>
          </div>
        </section>

        {/* ---------- On camera ---------- */}
        <section id="camera" className="scroll-mt-16 bg-paper py-20 sm:py-24">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <Films
              films={films}
              lang={lang}
              head={
                <>
                  <h2 data-reveal style={d(80)} className="font-display text-[2.4rem] leading-[1.04] font-medium tracking-[-0.015em] text-ink sm:text-[2.9rem]">
                    {t.camera.title} <em>{t.camera.titleEm}</em>
                  </h2>
                  <span data-reveal style={d(120)} className="mt-6 block h-px w-14 bg-sun" aria-hidden="true" />
                  <p data-reveal style={d(160)} className="mt-5 max-w-[34rem] text-[0.98rem] leading-[1.7] text-muted">
                    {t.camera.lead}
                  </p>
                </>
              }
            />
          </div>
        </section>

        {/* ---------- The record ---------- */}
        <section id="record" className="bg-ink">
          <Record chapters={record} lang={lang} head={<SectionHead label={t.record.label} title={t.record.title} dark />} />
        </section>

        {/* ---------- The house: its own forest green, from the field rows in the badge ---------- */}
        <section id="house" className="scroll-mt-16 bg-forest text-ivory">
          {/* the band: the cold room moving behind the heading */}
          <div className="relative overflow-hidden">
            <video
              className="absolute inset-0 h-full w-full object-cover opacity-45"
              src="/film/cooler-loop.mp4"
              poster="/film/cooler-loop.jpg"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#16382a_0%,rgb(22_56_42/0.85)_38%,rgb(22_56_42/0.35)_75%,rgb(22_56_42/0.2)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-forest to-transparent" />
            <div className="relative mx-auto flex min-h-[min(68svh,560px)] max-w-[1400px] flex-col justify-end px-5 pt-28 pb-14 sm:px-8">
              <p data-reveal className="label text-ivory/65">
                {t.house.label}
              </p>
              <h2 data-reveal style={d(80)} className="mt-5 max-w-[40rem] font-display text-[2.6rem] leading-[1.02] font-medium tracking-[-0.015em] sm:text-[3.4rem]">
                {t.house.title} <em className="text-sun">{t.house.titleEm}</em>
              </h2>
              <span data-reveal style={d(120)} className="mt-6 block h-px w-14 bg-sun" aria-hidden="true" />
              <p data-reveal style={d(160)} className="mt-5 max-w-[40rem] text-[1rem] leading-[1.75] text-ivory/80">
                {t.house.lead}
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-[1400px] px-5 pb-16 sm:px-8 sm:pb-20">
            {/* the four figures, one level band */}
            <dl data-reveal className="grid grid-cols-2 border-t border-ivory/20 lg:grid-cols-4">
              {t.house.stats.map(([k, v], i) => (
                <div
                  key={k}
                  className={`py-6 pr-6 ${i % 2 === 1 ? "border-l border-ivory/15 pl-6" : ""} ${i > 1 ? "border-t border-ivory/15 lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:pl-6" : ""}`}
                >
                  <dt className="font-display text-[2.6rem] leading-none font-medium tracking-[-0.02em] text-ivory sm:text-[3rem]">{k}</dt>
                  <dd className="mt-3 max-w-[16rem] text-[0.84rem] leading-snug text-ivory/70">{v}</dd>
                </div>
              ))}
            </dl>

          </div>
        </section>

        {/* ---------- The corridor: ivory, the diagram drawn dark and strong ---------- */}
        <section id="corridor" className="bg-ivory py-16 text-ink sm:py-20">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
              <p data-reveal className="label pt-3 text-muted">
                {t.house.corridor}
              </p>
              <div>
                <h2 data-reveal style={d(80)} className="max-w-[40rem] font-display text-[2.2rem] leading-[1.08] font-medium tracking-[-0.01em] sm:text-[2.8rem]">
                  {t.house.corridorTitle}
                </h2>
                <span data-reveal style={d(120)} className="mt-6 block h-px w-14 bg-sun" aria-hidden="true" />
              </div>
            </div>
            <div className="mt-10">
              <Corridor lang={lang} />
            </div>
          </div>
        </section>

        {/* ---------- Contact: compact; the heading and the live Nogales time on the left, the details as cards ---------- */}
        <section id="contact" className="scroll-mt-16 bg-paper py-16 text-ink sm:py-20">
          <div className="mx-auto grid max-w-[1400px] gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16">
            <div>
              <p data-reveal className="label text-muted">
                {t.contact.label}
              </p>
              <h2 data-reveal style={d(80)} className="mt-5 font-display text-[3rem] leading-[0.95] font-medium tracking-[-0.015em] sm:text-[3.8rem]">
                {t.contact.title}
              </h2>
              <span data-reveal style={d(120)} className="mt-6 block h-px w-14 bg-sun" aria-hidden="true" />
              <p data-reveal style={d(160)} className="mt-5 max-w-[26rem] text-[0.96rem] leading-[1.7] text-muted">
                {t.contact.lead}
              </p>
              <div data-reveal style={d(200)} className="mt-6">
                <NogalesClock lang={lang} label={t.contact.now} />
              </div>
            </div>

            <div>
              <dl className="grid gap-3 sm:grid-cols-2">
                <a data-reveal style={d(0)} href={TEL} className="group relative overflow-hidden rounded-[3px] border border-rule bg-ivory/60 px-5 py-5 transition-colors duration-300 hover:bg-ivory">
                  <dt className="label text-[0.6rem] text-muted">{t.contact.office}</dt>
                  <dd className="mt-2.5 flex items-center justify-between gap-3 font-display text-[1.65rem] leading-none font-medium">
                    {PHONE}
                    <span className="text-muted transition group-hover:translate-x-1 group-hover:text-forest"><Arrow /></span>
                  </dd>
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-sun transition-transform duration-500 ease-out group-hover:scale-x-100" />
                </a>
                <a data-reveal style={d(90)} href={WAREHOUSE_TEL} className="group relative overflow-hidden rounded-[3px] border border-rule bg-ivory/60 px-5 py-5 transition-colors duration-300 hover:bg-ivory">
                  <dt className="label text-[0.6rem] text-muted">{t.contact.warehouse}</dt>
                  <dd className="mt-2.5 flex items-center justify-between gap-3 font-display text-[1.65rem] leading-none font-medium">
                    {WAREHOUSE}
                    <span className="text-muted transition group-hover:translate-x-1 group-hover:text-forest"><Arrow /></span>
                  </dd>
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-sun transition-transform duration-500 ease-out group-hover:scale-x-100" />
                </a>
                <a data-reveal style={d(180)} href={MAPS} target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden rounded-[3px] border border-rule bg-ivory/60 px-5 py-5 transition-colors duration-300 hover:bg-ivory">
                  <dt className="label text-[0.6rem] text-muted">{t.contact.address}</dt>
                  <dd className="mt-2.5 flex items-end justify-between gap-3 text-[0.95rem] leading-snug">
                    <span>
                      {ADDRESS[0]}
                      <br />
                      {ADDRESS[1]}
                    </span>
                    <span className="text-muted transition group-hover:translate-x-1 group-hover:text-forest"><Arrow /></span>
                  </dd>
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-sun transition-transform duration-500 ease-out group-hover:scale-x-100" />
                </a>
                <a data-reveal style={d(270)} href={`mailto:${EMAIL}`} className="group relative overflow-hidden rounded-[3px] border border-rule bg-ivory/60 px-5 py-5 transition-colors duration-300 hover:bg-ivory">
                  <dt className="label text-[0.6rem] text-muted">{t.contact.sales}</dt>
                  <dd className="mt-2.5 flex items-end justify-between gap-3 text-[0.92rem] leading-snug">
                    <span className="break-all">{EMAIL}</span>
                    <span className="text-muted transition group-hover:translate-x-1 group-hover:text-forest"><Arrow /></span>
                  </dd>
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-sun transition-transform duration-500 ease-out group-hover:scale-x-100" />
                </a>
              </dl>
              <div data-reveal style={d(320)} className="mt-6">
                <RequestButton label={t.contact.request} lead={t.contact.requestLead} />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ---------- Footer: forest green, set apart from the light contact section ---------- */}
      <footer className="bg-forest text-ivory/75">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-5 pt-10 pb-24 sm:flex-row sm:pb-10 lg:pr-60 sm:items-center sm:px-8">
          <div className="flex items-center gap-5">
            <Logo className="h-12 w-auto" />
            <p className="text-[0.84rem] leading-snug">
              Chamberlain Distributing, Inc.
              <br />
              {t.footer}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1 text-[0.8rem] sm:items-end">
            <a href={TEL} className="transition hover:text-ivory">
              {PHONE}
            </a>
            <p className="label text-[0.6rem] text-ivory/50">© {new Date().getFullYear()} Chamberlain Distributing, Inc.</p>
          </div>
        </div>
      </footer>

      <RequestProduct lang={lang} />
      {/* Netlify reads this hidden form at build time so the request box can post to it */}
      <form name={FORM_NAME} data-netlify="true" netlify-honeypot="bot-field" hidden>
        <input type="hidden" name="form-name" value={FORM_NAME} />
        <input name="bot-field" />
        {FORM_FIELDS.map((f) => (
          <input key={f} name={f} />
        ))}
      </form>
    </>
  );
}
