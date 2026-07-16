import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { motion, useInView } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { sendContactMessage } from "@/lib/contact.functions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { LangProvider, useLang, type Lang } from "@/lib/i18n";
import {
  Menu, X, Phone, Mail, MapPin, ArrowRight, ShieldCheck, Scale, Gavel,
  Landmark, Briefcase, FileText, Users, Award, Lock, Zap, Sparkles,
  HeartHandshake, Eye, CheckCircle2, ChevronRight,
} from "lucide-react";

const logo = { url: "/images/logo-nm.png" };
const founderImg = { url: "/images/founder-desk.png" };
const teamImg = { url: "/images/team-portrait.png" };
const nairoImg = { url: "/images/nairo-moniques.png" };
const adilaImg = { url: "/images/adila-omar.png" };

// image map by member id
const MEMBER_IMG: Record<string, string> = {
  nairo: nairoImg.url,
  adila: adilaImg.url,
};

// icon maps for translated arrays
const TAB_ICONS: Record<string, typeof Briefcase> = {
  consultoria: Briefcase,
  contencioso: Gavel,
  areas: Scale,
};
const VALUE_ICONS: Record<string, typeof ShieldCheck> = {
  etica: ShieldCheck, prof: Briefcase, indep: Landmark, conf: Lock, exc: Award,
  resp: CheckCircle2, transp: Eye, cel: Zap, inov: Sparkles, comp: HeartHandshake,
};
const REASON_ICONS: Record<string, typeof Users> = {
  atend: Users, padrao: Award, sol: Sparkles, rap: Zap, acomp: HeartHandshake,
};

const WHATSAPP_PT = "https://wa.me/258864860000?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20um%20consultor%20da%20Nairo%20Moniques%20Advogados.";
const WHATSAPP_EN = "https://wa.me/258864860000?text=Hello%2C%20I%20would%20like%20to%20speak%20with%20a%20consultant%20at%20Nairo%20Moniques%20Advogados.";

export const Route = createFileRoute("/")({
  component: HomeWrapper,
});

function HomeWrapper() {
  return (
    <LangProvider>
      <Home />
    </LangProvider>
  );
}

// ---------- Reveal wrapper ----------
function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ---------- Language Toggle ----------
function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  const btn = (l: Lang, label: string) => (
    <button
      key={l}
      type="button"
      onClick={() => setLang(l)}
      aria-pressed={lang === l}
      aria-label={l === "pt" ? "Português" : "English"}
      className={`px-2.5 py-1 text-[11px] font-semibold tracking-[0.15em] transition-colors ${
        lang === l ? "bg-gold text-primary-foreground" : "text-gold hover:bg-gold/10"
      }`}
    >
      {label}
    </button>
  );
  return (
    <div className={`inline-flex items-center overflow-hidden rounded-full border border-gold/60 ${className}`}>
      {btn("pt", "PT")}
      <span className="h-4 w-px bg-gold/40" />
      {btn("en", "EN")}
    </div>
  );
}

// ---------- Header ----------
function Header() {
  const [open, setOpen] = useState(false);
  const { t, lang } = useLang();
  const NAV = [
    { label: t.nav.inicio, href: "#inicio" },
    { label: t.nav.sobre, href: "#sobre" },
    { label: t.nav.equipe, href: "#equipe" },
    { label: t.nav.servicos, href: "#servicos" },
    { label: t.nav.areas, href: "#areas" },
    { label: t.nav.contactos, href: "#contactos" },
  ];
  const wa = lang === "pt" ? WHATSAPP_PT : WHATSAPP_EN;
  return (
    <header className="glass sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <a href="#inicio" className="flex min-w-0 items-center gap-3">
          <img src={logo.url} alt="Nairo Moniques" className="h-10 w-auto shrink-0" />
          <div className="hidden min-w-0 flex-col leading-tight sm:flex">
            <span className="font-serif text-sm font-semibold tracking-[0.15em] text-gold">
              NAIRO MONIQUES
            </span>
            <span className="truncate text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              {lang === "pt" ? "Advogados e Consultores" : "Attorneys & Consultants"}
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="group relative text-sm font-medium text-foreground/85 transition-colors hover:text-gold"
            >
              {n.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LangToggle />
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-gold transition-all hover:bg-gold hover:text-primary-foreground"
          >
            {t.cta.consultor}
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LangToggle />
          <button
            className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-gold/40 text-gold"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/50 bg-background/95 backdrop-blur-md lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium text-foreground/90 transition-colors hover:bg-surface hover:text-gold"
              >
                {n.label}
              </a>
            ))}
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full border border-gold px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.15em] text-gold"
            >
              {t.cta.consultor}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

// ---------- Hero ----------
function Hero() {
  const { t, lang } = useLang();
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-gold/5 blur-[160px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-2 lg:py-32">
        <Reveal>
          <div>
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="text-xs font-medium uppercase tracking-[0.32em] text-gold">
                {t.location}
              </span>
            </div>
            <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4.25rem]">
              {t.hero.title1}
              <span className="text-gradient-gold italic">{t.hero.titleItalic}</span>
              {t.hero.title2}
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t.hero.subtitle}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#contactos"
                className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-gold transition-all hover:brightness-110"
              >
                {t.cta.agendar}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#sobre"
                className="inline-flex items-center gap-2 rounded-full border border-gold/60 px-7 py-3.5 text-sm font-semibold text-gold transition-all hover:bg-gold/10"
              >
                {t.cta.conhecer}
              </a>
            </div>

            <div className="mt-14 flex flex-col gap-6 border-t border-border/60 pt-8 sm:grid sm:grid-cols-3 sm:gap-6">
              {t.hero.stats.map((s) => (
                <div key={s.v} className="flex items-baseline gap-3 sm:block">
                  <div className="font-serif text-2xl text-gold md:text-3xl">{s.k}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground sm:mt-1">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-gold/25 via-transparent to-gold/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-gold/30 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
              <img
                src={founderImg.url}
                alt={lang === "pt" ? "Advogado fundador em conferência no escritório executivo" : "Founding attorney in the executive office"}
                className="h-[520px] w-full object-cover md:h-[620px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="rounded-2xl border border-gold/25 bg-background/70 p-5 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-gold" />
                    <p className="text-sm text-foreground/90">
                      {t.hero.badge}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Section header ----------
function SectionHead({ eyebrow, title, subtitle }: { eyebrow: string; title: ReactNode; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="mb-5 inline-flex items-center gap-3">
        <span className="h-px w-8 bg-gold" />
        <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold">
          {eyebrow}
        </span>
        <span className="h-px w-8 bg-gold" />
      </div>
      <h2 className="font-serif text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ---------- Sobre ----------
function Sobre() {
  const { t } = useLang();
  return (
    <section id="sobre" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHead
            eyebrow={t.sobre.eyebrow}
            title={<>{t.sobre.titlePre}<span className="text-gradient-gold italic">{t.sobre.titleItalic}</span></>}
            subtitle={t.sobre.subtitle}
          />
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <article className="group h-full rounded-2xl border border-border bg-surface p-8 transition-all hover:border-gold/50 md:p-10">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gold/40 bg-gold/5 text-gold">
                <Eye className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-2xl text-foreground md:text-3xl">{t.sobre.visao.title}</h3>
              <div className="gold-hairline my-5 w-16" />
              <p className="text-base leading-relaxed text-muted-foreground">
                {t.sobre.visao.text}
              </p>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="group h-full rounded-2xl border border-border bg-surface p-8 transition-all hover:border-gold/50 md:p-10">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gold/40 bg-gold/5 text-gold">
                <Scale className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-2xl text-foreground md:text-3xl">{t.sobre.missao.title}</h3>
              <div className="gold-hairline my-5 w-16" />
              <p className="text-base leading-relaxed text-muted-foreground">
                {t.sobre.missao.text}
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ---------- Equipe ----------
type Membro = ReturnType<typeof useLang>["t"]["equipe"]["membros"][number];

function Equipe() {
  const { t, lang } = useLang();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected: Membro | null = selectedId ? t.equipe.membros.find((m) => m.id === selectedId) ?? null : null;

  return (
    <section id="equipe" className="relative border-t border-border/60 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHead
            eyebrow={t.equipe.eyebrow}
            title={<>{t.equipe.titlePre}<span className="text-gradient-gold italic">{t.equipe.titleItalic}</span></>}
            subtitle={t.equipe.subtitle}
          />
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:gap-10">
          {t.equipe.membros.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.08}>
              <button
                type="button"
                onClick={() => setSelectedId(m.id)}
                className="group block w-full overflow-hidden rounded-2xl border border-border bg-surface text-left transition-all hover:border-gold/60 hover:shadow-gold focus:outline-none focus:ring-2 focus:ring-gold/60"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-background">
                  <img
                    src={MEMBER_IMG[m.id]}
                    alt={`${lang === "pt" ? "Retrato de" : "Portrait of"} ${m.name}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <p className="text-xs uppercase tracking-[0.2em] text-gold">{m.title}</p>
                    <h3 className="mt-2 font-serif text-2xl text-foreground md:text-3xl">{m.name}</h3>
                    <div className="gold-hairline mt-4 w-12" />
                    <p className="mt-3 text-sm text-muted-foreground">{m.role}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold">
                      {t.cta.verPerfil} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelectedId(null)}>
        <DialogContent className="max-h-[92vh] max-w-5xl overflow-y-auto border-border bg-surface p-0 pt-12 sm:pt-14">
          {selected && (
            <div className="grid gap-0 md:grid-cols-[380px_1fr]">
              <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[520px]">
                <img src={MEMBER_IMG[selected.id]} alt={`${lang === "pt" ? "Retrato de" : "Portrait of"} ${selected.name}`} className="h-full w-full object-cover" />
              </div>
              <div className="p-6 md:p-8">
                <DialogHeader className="text-left">
                  <p className="text-xs uppercase tracking-[0.2em] text-gold">{selected.title}</p>
                  <DialogTitle className="mt-2 font-serif text-2xl text-foreground md:text-3xl">{selected.name}</DialogTitle>
                  <div className="gold-hairline mt-3 w-12" />
                  <DialogDescription className="mt-3 text-sm text-muted-foreground">
                    {selected.role} · {selected.carteira}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-6 space-y-4 text-sm leading-relaxed text-foreground/85">
                  {selected.bio.map((p, i) => <p key={i}>{p}</p>)}
                </div>

                <div className="mt-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t.equipe.areasLabel}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selected.areas.map((a) => (
                      <span key={a} className="rounded-full border border-gold/40 bg-gold/5 px-3 py-1 text-xs font-medium text-gold">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex justify-center md:hidden">
                  <DialogClose asChild>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-full border border-gold/60 px-6 py-3 text-sm font-semibold text-gold transition-all hover:bg-gold/10"
                    >
                      <X className="h-4 w-4" />
                      {t.cta.voltar}
                    </button>
                  </DialogClose>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

// ---------- Valores ----------
function Valores() {
  const { t } = useLang();
  return (
    <section className="relative border-y border-border/60 bg-surface/40 py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHead
            eyebrow={t.valores.eyebrow}
            title={<>{t.valores.titlePre}<span className="text-gradient-gold italic">{t.valores.titleItalic}</span></>}
          />
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {t.valores.items.map((v, i) => {
            const Icon = VALUE_ICONS[v.id] ?? ShieldCheck;
            return (
              <Reveal key={v.id} delay={i * 0.04}>
                <div className="group h-full rounded-xl border border-border bg-background/60 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-gold">
                  <Icon className="mx-auto h-7 w-7 text-gold transition-transform group-hover:scale-110" />
                  <p className="mt-4 text-sm font-medium text-foreground/90">{v.label}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------- Serviços (Tabs) ----------
function Servicos() {
  const { t } = useLang();
  const tabs = t.servicos.tabs;
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((x) => x.id === active) ?? tabs[0];
  const CurrentIcon = TAB_ICONS[current.id] ?? Briefcase;

  return (
    <section id="servicos" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHead
            eyebrow={t.servicos.eyebrow}
            title={<>{t.servicos.titlePre}<span className="text-gradient-gold italic">{t.servicos.titleItalic}</span></>}
            subtitle={t.servicos.subtitle}
          />
        </Reveal>

        <div id="areas" className="mt-14">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {tabs.map((tab) => {
              const Icon = TAB_ICONS[tab.id] ?? Briefcase;
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={`group inline-flex items-center gap-2.5 rounded-full border px-5 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "border-gold bg-gold/10 text-gold shadow-gold"
                      : "border-border text-muted-foreground hover:border-gold/50 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.title}</span>
                  <span className="sm:hidden">{tab.title.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>

          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 rounded-2xl border border-border bg-surface p-6 md:p-10"
          >
            <div className="mb-8 flex items-center gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-gold/40 bg-gold/5 text-gold">
                <CurrentIcon className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-2xl text-foreground md:text-3xl">{current.title}</h3>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {current.items.map((item) => (
                <li
                  key={item.label}
                  className="group flex flex-col gap-2 rounded-lg border border-transparent bg-background/40 p-4 transition-all hover:border-gold/30 hover:bg-background/70"
                >
                  <div className="flex items-start gap-3">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-gold transition-transform group-hover:translate-x-0.5" />
                    <span className="text-sm font-medium text-foreground/90">{item.label}</span>
                  </div>
                  <p className="pl-7 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ---------- Por que escolher ----------
function PorQue() {
  const { t, lang } = useLang();
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-gold/8 blur-[140px]" />
      </div>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <div className="mb-5 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold">
                  {t.porque.eyebrow}
                </span>
              </div>
              <h2 className="font-serif text-3xl leading-tight md:text-5xl">
                {t.porque.titlePre}<span className="text-gradient-gold italic">{t.porque.titleItalic}</span>{t.porque.titleEnd}
              </h2>
              <p className="mt-6 text-muted-foreground md:text-lg">
                {t.porque.subtitle}
              </p>
              <div className="mt-8 overflow-hidden rounded-2xl border border-gold/20">
                <img
                  src={teamImg.url}
                  alt={lang === "pt" ? "Equipa Nairo Moniques Advogados e Consultores" : "Nairo Moniques Attorneys & Consultants team"}
                  className="h-72 w-full object-cover md:h-96"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="space-y-4">
              {t.porque.reasons.map((r, i) => {
                const Icon = REASON_ICONS[r.id] ?? Users;
                return (
                  <li
                    key={r.id}
                    className="group flex gap-5 rounded-2xl border border-border bg-surface/70 p-6 transition-all hover:border-gold/50 hover:bg-surface"
                  >
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-gold/40 bg-gold/5 text-gold">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-xs text-gold">0{i + 1}</span>
                        <h4 className="font-serif text-xl text-foreground">{r.title}</h4>
                      </div>
                      <p className="mt-1.5 text-sm text-muted-foreground">{r.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ---------- Contactos ----------
function Contactos() {
  const { t } = useLang();
  const send = useServerFn(sendContactMessage);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    area: "",
    mensagem: "",
  });

  const update = (k: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    if (!form.area) {
      toast.error(t.contactos.toasts.selectArea);
      return;
    }
    setLoading(true);
    try {
      await send({
        data: {
          nome: form.nome,
          email: form.email,
          telefone: form.telefone,
          area: form.area as any,
          mensagem: form.mensagem,
        },
      });
      setSent(true);
      toast.success(t.contactos.toasts.success);
      setForm({ nome: "", email: "", telefone: "", area: "", mensagem: "" });
    } catch (err) {
      console.error(err);
      toast.error(t.contactos.toasts.error);
    } finally {
      setLoading(false);
    }
  }

  const contactItems = [
    { icon: Phone, label: t.contactos.labels.phone, value: "(+258) 86 486 0000", href: "tel:+258864860000" },
    { icon: Mail, label: t.contactos.labels.email, value: "info@nairomoniquesadvogados.com", href: "mailto:info@nairomoniquesadvogados.com" },
    { icon: MapPin, label: t.contactos.labels.office, value: t.contactos.address, href: undefined as string | undefined },
  ];

  return (
    <section id="contactos" className="border-t border-border/60 bg-surface/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHead
            eyebrow={t.contactos.eyebrow}
            title={<>{t.contactos.titlePre}<span className="text-gradient-gold italic">{t.contactos.titleItalic}</span></>}
            subtitle={t.contactos.subtitle}
          />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-background/60 p-8 md:p-10">
              <div className="space-y-6">
                {contactItems.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href ?? "#"}
                    className="group flex items-start gap-5 rounded-xl border border-transparent p-3 transition-all hover:border-gold/30 hover:bg-surface"
                  >
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-gold/40 bg-gold/5 text-gold">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold">
                        {label}
                      </div>
                      <div className="mt-1 text-base text-foreground/90 group-hover:text-gold">
                        {value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              <div className="mt-10 rounded-xl border border-gold/20 bg-gold/5 p-5">
                <div className="flex items-start gap-3">
                  <Lock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {t.contactos.confidentiality}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border bg-background/60 p-8 md:p-10"
            >
              <div className="grid gap-5">
                <FormField label={t.contactos.form.name} name="nome" type="text" required value={form.nome} onChange={update("nome")} />
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField label={t.contactos.form.email} name="email" type="email" required value={form.email} onChange={update("email")} />
                  <FormField label={t.contactos.form.phone} name="telefone" type="tel" value={form.telefone} onChange={update("telefone")} />
                </div>
                <div>
                  <label className="mb-2 block text-[11px] font-medium uppercase tracking-[0.22em] text-gold">
                    {t.contactos.form.area}
                  </label>
                  <select
                    required
                    value={form.area}
                    onChange={(e) => update("area")(e.target.value)}
                    className="w-full rounded-lg border border-gold/30 bg-surface/60 px-4 py-3.5 text-sm text-foreground outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/30"
                  >
                    <option value="" disabled>{t.contactos.form.areaPlaceholder}</option>
                    {t.contactos.areasOpts.map((a) => (
                      <option key={a} value={a} className="bg-background">{a}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-[11px] font-medium uppercase tracking-[0.22em] text-gold">
                    {t.contactos.form.message}
                  </label>
                  <textarea
                    rows={5}
                    required
                    minLength={10}
                    maxLength={2000}
                    value={form.mensagem}
                    onChange={(e) => update("mensagem")(e.target.value)}
                    className="w-full resize-none rounded-lg border border-gold/30 bg-surface/60 px-4 py-3.5 text-sm text-foreground outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/30"
                    placeholder={t.contactos.form.messagePlaceholder}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-primary-foreground shadow-gold transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? t.cta.enviando : sent ? t.cta.enviada : t.cta.enviar}
                  {!loading && !sent && <ArrowRight className="h-4 w-4" />}
                </button>
                <p className="text-center text-[11px] text-muted-foreground">
                  {t.contactos.form.consent}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  name,
  type,
  required,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-[11px] font-medium uppercase tracking-[0.22em] text-gold">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        maxLength={type === "tel" ? 30 : type === "email" ? 255 : 100}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gold/30 bg-surface/60 px-4 py-3.5 text-sm text-foreground outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/30"
      />
    </div>
  );
}

// ---------- Footer ----------
function Footer() {
  const { t, lang } = useLang();
  const NAV = [
    { label: t.nav.inicio, href: "#inicio" },
    { label: t.nav.sobre, href: "#sobre" },
    { label: t.nav.equipe, href: "#equipe" },
    { label: t.nav.servicos, href: "#servicos" },
    { label: t.nav.areas, href: "#areas" },
    { label: t.nav.contactos, href: "#contactos" },
  ];
  return (
    <footer className="border-t border-border/60 bg-background py-14">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo.url} alt="Nairo Moniques" className="h-10 w-auto" />
              <div className="leading-tight">
                <div className="font-serif text-sm font-semibold tracking-[0.15em] text-gold">
                  NAIRO MONIQUES
                </div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  {lang === "pt" ? "Advogados e Consultores" : "Attorneys & Consultants"}
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm text-muted-foreground">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              {t.footer.nav}
            </div>
            <ul className="mt-5 space-y-2.5 text-sm">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-muted-foreground transition-colors hover:text-gold">
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-gold">
                  {t.footer.privacy}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              {t.footer.contactos}
            </div>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                (+258) 86 486 0000
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                info@nairomoniquesadvogados.com
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {t.contactos.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="gold-hairline mt-12 opacity-40" />
        <p className="mt-6 text-center text-xs text-muted-foreground">
          {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}

// ---------- Page ----------
function Home() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Sobre />
        <Equipe />
        <Valores />
        <Servicos />
        <PorQue />
        <Contactos />
      </main>
      <Footer />
    </div>
  );
}
