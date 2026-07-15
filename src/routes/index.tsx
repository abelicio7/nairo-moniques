import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { motion, useInView } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { sendContactMessage } from "@/lib/contact.functions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
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



export const Route = createFileRoute("/")({
  component: Home,
});

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

// ---------- Header ----------
const NAV = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Equipe", href: "#equipe" },
  { label: "Serviços", href: "#servicos" },
  { label: "Áreas de Atuação", href: "#areas" },
  { label: "Contactos", href: "#contactos" },
];

function Header() {
  const [open, setOpen] = useState(false);
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
              Advogados e Consultores
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

        <a
          href="https://wa.me/258864860000?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20um%20consultor%20da%20Nairo%20Moniques%20Advogados."
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full border border-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-gold transition-all hover:bg-gold hover:text-primary-foreground lg:inline-flex"
        >
          Falar com um Consultor
        </a>

        <button
          className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-gold/40 text-gold lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
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
              href="https://wa.me/258864860000?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20um%20consultor%20da%20Nairo%20Moniques%20Advogados."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full border border-gold px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.15em] text-gold"
            >
              Falar com um Consultor
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

// ---------- Hero ----------
function Hero() {
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
                Maputo · Moçambique
              </span>
            </div>
            <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4.25rem]">
              Excelência Jurídica,{" "}
              <span className="text-gradient-gold italic">Rigor Técnico</span> e Compromisso Permanente.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Defendemos direitos, protegemos interesses e construímos soluções jurídicas com
              excelência.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#contactos"
                className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-gold transition-all hover:brightness-110"
              >
                Agendar Consultoria Jurídica
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#sobre"
                className="inline-flex items-center gap-2 rounded-full border border-gold/60 px-7 py-3.5 text-sm font-semibold text-gold transition-all hover:bg-gold/10"
              >
                Conhecer a Firma
              </a>
            </div>

            <div className="mt-14 flex flex-col gap-6 border-t border-border/60 pt-8 sm:grid sm:grid-cols-3 sm:gap-6">
              {[
                { k: "10+", v: "Áreas do Direito" },
                { k: "100%", v: "Confidencialidade" },
                { k: "24/7", v: "Assessoria Permanente" },
              ].map((s) => (
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
                alt="Advogado fundador em conferência no escritório executivo"
                className="h-[520px] w-full object-cover md:h-[620px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="rounded-2xl border border-gold/25 bg-background/70 p-5 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-gold" />
                    <p className="text-sm text-foreground/90">
                      <span className="font-semibold text-gold">Sociedade de Advogados</span> vocacionada à excelência técnica e ética profissional.
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
  return (
    <section id="sobre" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHead
            eyebrow="A Firma"
            title={<>Uma tradição de <span className="text-gradient-gold italic">excelência jurídica</span></>}
            subtitle="Uma sociedade vocacionada para a prestação de serviços jurídicos e de consultoria de excelência, pautando a sua atuação pelo rigor técnico, ética profissional e confidencialidade."
          />
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <article className="group h-full rounded-2xl border border-border bg-surface p-8 transition-all hover:border-gold/50 md:p-10">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gold/40 bg-gold/5 text-gold">
                <Eye className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-2xl text-foreground md:text-3xl">Visão</h3>
              <div className="gold-hairline my-5 w-16" />
              <p className="text-base leading-relaxed text-muted-foreground">
                Ser uma referência nacional e regional na prestação de serviços jurídicos e de
                consultoria, reconhecida pela excelência, inovação e integridade.
              </p>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="group h-full rounded-2xl border border-border bg-surface p-8 transition-all hover:border-gold/50 md:p-10">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gold/40 bg-gold/5 text-gold">
                <Scale className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-2xl text-foreground md:text-3xl">Missão</h3>
              <div className="gold-hairline my-5 w-16" />
              <p className="text-base leading-relaxed text-muted-foreground">
                Prestar serviços jurídicos de elevada qualidade, assegurando uma defesa técnica
                eficiente e aconselhamento estratégico.
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ---------- Equipe ----------
type Membro = {
  name: string;
  title: string;
  role: string;
  carteira: string;
  image: string;
  areas: string[];
  bio: string[];
};

const EQUIPE: Membro[] = [
  {
    name: "Dr. Nairo Moniques",
    title: "Sócio Fundador & Advogado",
    role: "Advogado, Docente Universitário e Mestre em Ciências Policiais",
    carteira: "Carteira Profissional n.º 1955 — OAM",
    image: nairoImg.url,
    areas: ["Direito Criminal", "Família e Sucessões", "Direito Laboral", "Direito Comercial"],
    bio: [
      "O Dr. Nairo Moniques é Advogado inscrito na Ordem dos Advogados de Moçambique, sob a Carteira Profissional n.º 1955, dedicando-se ao exercício da advocacia com elevado rigor técnico, ética profissional e permanente compromisso com a defesa do Estado de Direito, da legalidade e dos direitos fundamentais dos cidadãos.",
      "É Licenciado em Direito e Mestre em Ciências Policiais, na especialidade de Segurança Pública e Investigação Criminal — formação que lhe proporciona uma visão multidisciplinar da justiça, conciliando o conhecimento jurídico com a investigação criminal, a segurança pública e a ciência forense.",
      "No plano institucional, exerceu as funções de Vice-Presidente da Comissão de Defesa e Reforço das Prerrogativas dos Advogados da Ordem dos Advogados de Moçambique, no mandato 2023–2026, contribuindo para a promoção, proteção e fortalecimento das garantias institucionais indispensáveis ao livre e independente exercício da advocacia. Neste âmbito, participou na reflexão e desenvolvimento de iniciativas voltadas ao reforço das prerrogativas profissionais, à valorização da classe e ao aperfeiçoamento do sistema de administração da justiça.",
      "Paralelamente à advocacia, exerce funções como Docente Universitário, dedicando-se à formação de novos profissionais do Direito e das Ciências Policiais, promovendo uma abordagem crítica, ética e científica do conhecimento jurídico.",
      "Actua com destaque nas áreas de Direito Criminal, Família e Sucessões, Direito Laboral e Direito Comercial.",
    ],
  },
  {
    name: "Dra. Adila Fátima Cassimo Omar",
    title: "Advogada Associada",
    role: "Advogada — Licenciada em Direito",
    carteira: "Carteira Profissional n.º 2542 — OAM",
    image: adilaImg.url,
    areas: ["Direito Civil", "Direito Laboral", "Direito Penal", "Direito Comercial", "Família e Menores"],
    bio: [
      "A Dra. Adila Fátima Cassimo Omar é Advogada inscrita na Ordem dos Advogados de Moçambique, sob a Carteira Profissional n.º 2542, encontrando-se plenamente habilitada ao exercício da advocacia.",
      "É Licenciada em Direito, possuindo sólida formação jurídica que sustenta uma atuação pautada pelo rigor técnico, ética profissional, independência e compromisso com a defesa dos direitos e interesses dos seus constituintes.",
      "Exerce funções como Advogada Associada da Nairo Moniques Advogados e Consultores, participando na prestação de serviços de consultoria jurídica, patrocínio forense e assessoria legal a clientes particulares, empresas e instituições, sempre orientada pelos princípios da legalidade, confidencialidade, responsabilidade e excelência profissional.",
      "A sua prática profissional caracteriza-se por uma abordagem personalizada de cada processo, privilegiando soluções jurídicas eficazes, preventivas e estrategicamente adequadas às necessidades dos clientes.",
      "Assume-se como uma briosa profissional, destacando-se pelo empenho, agilidade, responsabilidade e eficiência. Actua nas áreas de Direito Civil, Laboral, Penal, Comercial, Família e Menores.",
    ],
  },
];

function Equipe() {
  const [selected, setSelected] = useState<Membro | null>(null);
  return (
    <section id="equipe" className="relative border-t border-border/60 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHead
            eyebrow="A Nossa Equipe"
            title={<>Profissionais dedicados à sua <span className="text-gradient-gold italic">causa</span></>}
            subtitle="Conheça os advogados que compõem a Nairo Moniques Advogados e Consultores. Clique em qualquer membro para conhecer o seu perfil completo."
          />
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:gap-10">
          {EQUIPE.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08}>
              <button
                type="button"
                onClick={() => setSelected(m)}
                className="group block w-full overflow-hidden rounded-2xl border border-border bg-surface text-left transition-all hover:border-gold/60 hover:shadow-gold focus:outline-none focus:ring-2 focus:ring-gold/60"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-background">
                  <img
                    src={m.image}
                    alt={`Retrato de ${m.name}`}
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
                      Ver perfil completo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-h-[92vh] max-w-5xl overflow-y-auto border-border bg-surface p-0 pt-12 sm:pt-14">
          {selected && (
            <div className="grid gap-0 md:grid-cols-[380px_1fr]">
              <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[520px]">
                <img src={selected.image} alt={`Retrato de ${selected.name}`} className="h-full w-full object-cover" />
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
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Áreas de Atuação</p>
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
                      Voltar
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
const VALORES = [
  { icon: ShieldCheck, label: "Ética e Integridade" },
  { icon: Briefcase, label: "Profissionalismo" },
  { icon: Landmark, label: "Independência" },
  { icon: Lock, label: "Confidencialidade" },
  { icon: Award, label: "Excelência Técnica" },
  { icon: CheckCircle2, label: "Responsabilidade" },
  { icon: Eye, label: "Transparência" },
  { icon: Zap, label: "Celeridade" },
  { icon: Sparkles, label: "Inovação" },
  { icon: HeartHandshake, label: "Compromisso com o Cliente" },
];

function Valores() {
  return (
    <section className="relative border-y border-border/60 bg-surface/40 py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHead
            eyebrow="Valores Corporativos"
            title={<>Os pilares da nossa <span className="text-gradient-gold italic">atuação</span></>}
          />
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {VALORES.map(({ icon: Icon, label }, i) => (
            <Reveal key={label} delay={i * 0.04}>
              <div className="group h-full rounded-xl border border-border bg-background/60 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-gold">
                <Icon className="mx-auto h-7 w-7 text-gold transition-transform group-hover:scale-110" />
                <p className="mt-4 text-sm font-medium text-foreground/90">{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Serviços (Tabs) ----------
const TABS = [
  {
    id: "consultoria",
    title: "Consultoria & Assessoria Empresarial",
    icon: Briefcase,
    items: [
      {
        label: "Consultoria Jurídica Permanente",
        description: "Acompanhamento contínuo da empresa ou pessoa singular, antecipando riscos e garantindo decisões seguras em tempo real."
      },
      {
        label: "Assessoria Jurídica Empresarial",
        description: "Orientação estratégica no dia a dia da empresa, desde contratos até relações comerciais, com foco na sustentabilidade do negócio."
      },
      {
        label: "Elaboração e Revisão de Contratos",
        description: "Redação e análise de contratos claros, seguros e alinhados à lei, protegendo os interesses de todas as partes envolvidas."
      },
      {
        label: "Constituição de Empresas",
        description: "Apoio completo na criação de sociedades, definição de estatutos e escolha do melhor modelo societário para o projeto."
      },
      {
        label: "Due Diligence Jurídica",
        description: "Auditoria detalhada da situação legal de uma empresa antes de fusões, aquisições, investimentos ou parcerias."
      },
      {
        label: "Compliance e Governação Corporativa",
        description: "Implementação de regras internas, códigos de ética e controles que previnem ilícitos e fortalecem a transparência."
      },
      {
        label: "Consultoria em Investimento Nacional e Estrangeiro",
        description: "Assessoria a investidores nacionais e estrangeiros na estruturação, legalização e proteção de investimentos em Moçambique."
      },
    ],
  },
  {
    id: "contencioso",
    title: "Patrocínio & Contencioso",
    icon: Gavel,
    items: [
      {
        label: "Patrocínio Judicial",
        description: "Representação processual dedicada dos interesses do cliente em todos os tribunais e instâncias competentes."
      },
      {
        label: "Contencioso Cível",
        description: "Defesa e propositura de ações relacionadas a contratos, responsabilidade civil, propriedade e outras questões patrimoniais."
      },
      {
        label: "Contencioso Criminal",
        description: "Assistência técnica em processos-crime, desde a fase de investigação até o julgamento, em defesa dos direitos do cliente."
      },
      {
        label: "Contencioso Laboral",
        description: "Atuação em litígios entre empregadores e trabalhadores, incluindo rescisões, acidentes de trabalho e direitos sindicais."
      },
      {
        label: "Contencioso Administrativo",
        description: "Impugnação ou defesa de atos da Administração Pública, licitações, contratos públicos e sanções administrativas."
      },
      {
        label: "Recuperação de Créditos",
        description: "Estratégias judiciais e extrajudiciais para cobrança de dívidas, execuções e renegociação de passivos."
      },
    ],
  },
  {
    id: "areas",
    title: "Áreas de Especialidade",
    icon: Scale,
    items: [
      {
        label: "Direito Civil",
        description: "Atuação em questões de pessoas, família, sucessões, contratos, responsabilidade civil e direitos patrimoniais."
      },
      {
        label: "Direito Comercial e Societário",
        description: "Assessoria a empresas em constituição, fusões, dissoluções, acordos societários e operações comerciais complexas."
      },
      {
        label: "Direito do Trabalho",
        description: "Consultoria e contencioso em relações de trabalho, contratos, despedimentos, acidentes e cumprimento da legislação laboral."
      },
      {
        label: "Direito Criminal",
        description: "Defesa técnica em investigações e processos-crime, assegurando o exercício do direito de defesa em todas as fases."
      },
      {
        label: "Direito Administrativo",
        description: "Atuação junto da Administração Pública, licitações, contratos administrativos, impugnações e regimes especiais."
      },
      {
        label: "Direito Fiscal",
        description: "Orientação tributária, contestação de autuações fiscais, regularização fiscal e planeamento tributário adequado."
      },
      {
        label: "Direito Imobiliário",
        description: "Acompanhamento de compra, venda, arrendamento, regularização de propriedades e projetos de desenvolvimento imobiliário."
      },
      {
        label: "Direito Bancário",
        description: "Assessoria a instituições financeiras e clientes em operações de crédito, garantias, contratos bancários e regulamentação."
      },
      {
        label: "Direito das Tecnologias e Proteção de Dados",
        description: "Consultoria em contratos tecnológicos, privacidade, proteção de dados pessoais e conformidade digital."
      },
      {
        label: "Arbitragem e Mediação",
        description: "Resolução alternativa de conflitos através de arbitragem ou mediação, de forma mais rápida e confidencial."
      },
    ],
  },
];

function Servicos() {
  const [active, setActive] = useState(TABS[0].id);
  const current = TABS.find((t) => t.id === active)!;
  return (
    <section id="servicos" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHead
            eyebrow="Serviços & Áreas de Atuação"
            title={<>Um portfólio jurídico <span className="text-gradient-gold italic">completo</span></>}
            subtitle="Do aconselhamento estratégico ao contencioso, atuamos com rigor técnico em todas as frentes do Direito."
          />
        </Reveal>

        <div id="areas" className="mt-14">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {TABS.map((t) => {
              const Icon = t.icon;
              const isActive = active === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={`group inline-flex items-center gap-2.5 rounded-full border px-5 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "border-gold bg-gold/10 text-gold shadow-gold"
                      : "border-border text-muted-foreground hover:border-gold/50 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{t.title}</span>
                  <span className="sm:hidden">{t.title.split(" ")[0]}</span>
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
                <current.icon className="h-5 w-5" />
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
const REASONS = [
  { icon: Users, title: "Atendimento Personalizado", desc: "Cada cliente é atendido com escuta ativa e uma estratégia sob medida." },
  { icon: Award, title: "Elevado Padrão Técnico", desc: "Equipa multidisciplinar com sólida formação e prática consolidada." },
  { icon: Sparkles, title: "Soluções Estratégicas", desc: "Aconselhamento orientado a resultados e à prevenção de litígios." },
  { icon: Zap, title: "Rapidez e Eficiência", desc: "Resposta ágil sem comprometer profundidade técnica." },
  { icon: HeartHandshake, title: "Acompanhamento Permanente", desc: "Presença próxima e foco absoluto no resultado do cliente." },
];

function PorQue() {
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
                  Por que escolher
                </span>
              </div>
              <h2 className="font-serif text-3xl leading-tight md:text-5xl">
                A escolha da <span className="text-gradient-gold italic">Nairo Moniques</span> é a escolha da confiança.
              </h2>
              <p className="mt-6 text-muted-foreground md:text-lg">
                Construímos relações de longo prazo com clientes que exigem discrição, técnica
                impecável e resultados mensuráveis.
              </p>
              <div className="mt-8 overflow-hidden rounded-2xl border border-gold/20">
                <img
                  src={teamImg.url}
                  alt="Equipa Nairo Moniques Advogados e Consultores"
                  className="h-72 w-full object-cover md:h-96"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="space-y-4">
              {REASONS.map(({ icon: Icon, title, desc }, i) => (
                <li
                  key={title}
                  className="group flex gap-5 rounded-2xl border border-border bg-surface/70 p-6 transition-all hover:border-gold/50 hover:bg-surface"
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-gold/40 bg-gold/5 text-gold">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-xs text-gold">0{i + 1}</span>
                      <h4 className="font-serif text-xl text-foreground">{title}</h4>
                    </div>
                    <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ---------- Contactos ----------
const AREAS_OPTS = [
  "Direito Civil", "Direito Comercial e Societário", "Direito do Trabalho",
  "Direito Criminal", "Direito Administrativo", "Direito Fiscal",
  "Direito Imobiliário", "Direito Bancário", "Direito das Tecnologias",
  "Arbitragem e Mediação", "Outro",
];

function Contactos() {
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
      toast.error("Selecione uma área de interesse.");
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
      toast.success("Mensagem enviada. Responderemos em até 24 horas úteis.");
      setForm({ nome: "", email: "", telefone: "", area: "", mensagem: "" });
    } catch (err) {
      console.error(err);
      toast.error(
        "Não foi possível enviar. Tente novamente ou escreva para info@nairomoniquesadvogados.com."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contactos" className="border-t border-border/60 bg-surface/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHead
            eyebrow="Contactos"
            title={<>Fale-nos sobre o seu <span className="text-gradient-gold italic">caso</span></>}
            subtitle="Fale-nos sobre o seu caso."
          />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-background/60 p-8 md:p-10">
              <div className="space-y-6">
                {[
                  { icon: Phone, label: "Telefone", value: "(+258) 86 486 0000", href: "tel:+258864860000" },
                  { icon: Mail, label: "E-mail", value: "info@nairomoniquesadvogados.com", href: "mailto:info@nairomoniquesadvogados.com" },
                  { icon: MapPin, label: "Escritório", value: "Av. Agostinho Neto, n.º 1258, R/C, Porta 12, Cidade de Maputo, Moçambique" },
                ].map(({ icon: Icon, label, value, href }) => (
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
                    Toda a comunicação com a Nairo Moniques é tratada com absoluta confidencialidade,
                    conforme os princípios éticos da advocacia.
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
                <FormField label="Nome Completo" name="nome" type="text" required value={form.nome} onChange={update("nome")} />
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField label="E-mail" name="email" type="email" required value={form.email} onChange={update("email")} />
                  <FormField label="Telefone" name="telefone" type="tel" value={form.telefone} onChange={update("telefone")} />
                </div>
                <div>
                  <label className="mb-2 block text-[11px] font-medium uppercase tracking-[0.22em] text-gold">
                    Área de Interesse
                  </label>
                  <select
                    required
                    value={form.area}
                    onChange={(e) => update("area")(e.target.value)}
                    className="w-full rounded-lg border border-gold/30 bg-surface/60 px-4 py-3.5 text-sm text-foreground outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/30"
                  >
                    <option value="" disabled>Selecione uma área…</option>
                    {AREAS_OPTS.map((a) => (
                      <option key={a} value={a} className="bg-background">{a}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-[11px] font-medium uppercase tracking-[0.22em] text-gold">
                    Mensagem
                  </label>
                  <textarea
                    rows={5}
                    required
                    minLength={10}
                    maxLength={2000}
                    value={form.mensagem}
                    onChange={(e) => update("mensagem")(e.target.value)}
                    className="w-full resize-none rounded-lg border border-gold/30 bg-surface/60 px-4 py-3.5 text-sm text-foreground outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/30"
                    placeholder="Descreva brevemente a sua situação…"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-primary-foreground shadow-gold transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "A enviar…" : sent ? "Mensagem Enviada ✓" : "Enviar Mensagem Segura"}
                  {!loading && !sent && <ArrowRight className="h-4 w-4" />}
                </button>
                <p className="text-center text-[11px] text-muted-foreground">
                  Ao enviar, concorda com o tratamento confidencial dos seus dados.
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
                  Advogados e Consultores
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm text-muted-foreground">
              Defendemos direitos, protegemos interesses e construímos soluções jurídicas com
              excelência.
            </p>
          </div>

          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              Navegação
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
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              Contactos
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
                Av. Agostinho Neto, n.º 1258, R/C, Porta 12, Maputo, Moçambique
              </li>
            </ul>
          </div>
        </div>

        <div className="gold-hairline mt-12 opacity-40" />
        <p className="mt-6 text-center text-xs text-muted-foreground">
          © 2026 NAIRO MONIQUES – Advogados e Consultores. Todos os direitos reservados. Maputo, Moçambique.
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
