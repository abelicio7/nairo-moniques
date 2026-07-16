import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "pt" | "en";

type Dict = {
  nav: { inicio: string; sobre: string; equipe: string; servicos: string; areas: string; contactos: string };
  cta: { consultor: string; agendar: string; conhecer: string; enviar: string; enviando: string; enviada: string; verPerfil: string; voltar: string };
  location: string;
  hero: {
    title1: string; titleItalic: string; title2: string;
    subtitle: string;
    stats: { k: string; v: string }[];
    badge: string;
  };
  sobre: {
    eyebrow: string; titlePre: string; titleItalic: string;
    subtitle: string;
    visao: { title: string; text: string };
    missao: { title: string; text: string };
  };
  equipe: {
    eyebrow: string; titlePre: string; titleItalic: string; subtitle: string;
    areasLabel: string;
    membros: {
      id: string;
      name: string; title: string; role: string; carteira: string;
      areas: string[]; bio: string[];
    }[];
  };
  valores: { eyebrow: string; titlePre: string; titleItalic: string; items: { id: string; label: string }[] };
  servicos: {
    eyebrow: string; titlePre: string; titleItalic: string; subtitle: string;
    tabs: { id: string; title: string; items: { label: string; description: string }[] }[];
  };
  porque: {
    eyebrow: string; titlePre: string; titleItalic: string; titleEnd: string;
    subtitle: string;
    reasons: { id: string; title: string; desc: string }[];
  };
  contactos: {
    eyebrow: string; titlePre: string; titleItalic: string; subtitle: string;
    labels: { phone: string; email: string; office: string };
    address: string;
    confidentiality: string;
    form: { name: string; email: string; phone: string; area: string; areaPlaceholder: string; message: string; messagePlaceholder: string; consent: string };
    areasOpts: string[];
    toasts: { selectArea: string; success: string; error: string };
  };
  footer: { nav: string; contactos: string; privacy: string; tagline: string; rights: string };
};

const pt: Dict = {
  nav: { inicio: "Início", sobre: "Sobre Nós", equipe: "Equipe", servicos: "Serviços", areas: "Áreas de Atuação", contactos: "Contactos" },
  cta: { consultor: "Falar com um Consultor", agendar: "Agendar Consultoria Jurídica", conhecer: "Conhecer a Firma", enviar: "Enviar Mensagem Segura", enviando: "A enviar…", enviada: "Mensagem Enviada ✓", verPerfil: "Ver perfil completo", voltar: "Voltar" },
  location: "Maputo · Moçambique",
  hero: {
    title1: "Excelência Jurídica, ",
    titleItalic: "Rigor Técnico",
    title2: " e Compromisso Permanente.",
    subtitle: "Defendemos direitos, protegemos interesses e construímos soluções jurídicas com excelência.",
    stats: [
      { k: "10+", v: "Áreas do Direito" },
      { k: "100%", v: "Confidencialidade" },
      { k: "24/7", v: "Assessoria Permanente" },
    ],
    badge: "Sociedade de Advogados vocacionada à excelência, ética e deontologia profissional.",
  },
  sobre: {
    eyebrow: "A Firma",
    titlePre: "Uma tradição de ",
    titleItalic: "excelência jurídica",
    subtitle: "Uma sociedade vocacionada para a prestação de serviços jurídicos e de consultoria de excelência, pautando a sua atuação pelo rigor técnico, ética profissional e confidencialidade.",
    visao: { title: "Visão", text: "Ser uma referência nacional e regional na prestação de serviços jurídicos e de consultoria, reconhecida pela excelência, inovação e integridade." },
    missao: { title: "Missão", text: "Prestar serviços jurídicos de elevada qualidade, assegurando uma defesa técnica eficiente e aconselhamento estratégico." },
  },
  equipe: {
    eyebrow: "A Nossa Equipe",
    titlePre: "Profissionais dedicados à sua ",
    titleItalic: "causa",
    subtitle: "Conheça os advogados que compõem a Nairo Moniques Advogados e Consultores. Clique em qualquer membro para conhecer o seu perfil completo.",
    areasLabel: "Áreas de Atuação",
    membros: [
      {
        id: "nairo",
        name: "Dr. Nairo Moniques",
        title: "SÓCIO FUNDADOR & ADMINISTRADOR",
        role: "Advogado, Docente Universitário e Mestre em Segurança Pública e Investigação Criminal",
        carteira: "Carteira Profissional n.º 1955 — OAM",
        areas: ["Direito Criminal", "Família e Sucessões", "Direito Laboral", "Direito Comercial"],
        bio: [
          "O Dr. Nairo Moniques é Advogado inscrito na Ordem dos Advogados de Moçambique, sob a Carteira Profissional n.º 1955, dedicando-se ao exercício da advocacia com elevado rigor técnico, ética profissional e permanente compromisso com a defesa do Estado de Direito, da legalidade e dos direitos fundamentais dos cidadãos.",
          "É Licenciado em Direito e Mestre em Ciências Policiais, na especialidade de Segurança Pública e Investigação Criminal — formação que lhe proporciona uma visão multidisciplinar da justiça, conciliando o conhecimento jurídico com a investigação criminal, a segurança pública e a ciência forense.",
          "No plano institucional, exerceu as funções de Vice-Presidente da Comissão de Defesa e Reforço das Prerrogativas dos Advogados da Ordem dos Advogados de Moçambique, no mandato 2023–2026, contribuindo para a promoção, proteção e fortalecimento das garantias institucionais indispensáveis ao livre e independente exercício da advocacia. Neste âmbito, participou na reflexão e desenvolvimento de iniciativas voltadas ao reforço das prerrogativas profissionais, à valorização da classe e ao aperfeiçoamento do sistema de administração da justiça.",
          "Paralelamente à advocacia, é CEO da WARYA CONSULTING AND SERVICES, LDA, empresa vocacionada na Consultoria de negócios e mercados. Exerce funções como Docente Universitário, dedicando-se à formação de novos profissionais do Direito e das Ciências Policiais, promovendo uma abordagem crítica, ética e científica do conhecimento jurídico.",
          "Actua com destaque nas áreas de Direito Criminal, Família e Sucessões, Direito Laboral e Direito Comercial.",
        ],
      },
      {
        id: "adila",
        name: "Dra. Adila Fátima Cassimo Omar",
        title: "Advogada Associada",
        role: "Advogada — Licenciada em Direito",
        carteira: "Carteira Profissional n.º 2542 — OAM",
        areas: ["Direito Civil", "Direito Laboral", "Direito Penal", "Direito Comercial", "Família e Menores"],
        bio: [
          "A Dra. Adila Fátima Cassimo Omar é Advogada inscrita na Ordem dos Advogados de Moçambique, sob a Carteira Profissional n.º 2542, encontrando-se plenamente habilitada ao exercício da advocacia.",
          "É Licenciada em Direito, possuindo sólida formação jurídica que sustenta uma atuação pautada pelo rigor técnico, ética profissional, independência e compromisso com a defesa dos direitos e interesses dos seus constituintes.",
          "Exerce funções como Advogada Associada da Nairo Moniques Advogados e Consultores, participando na prestação de serviços de consultoria jurídica, patrocínio forense e assessoria legal a clientes particulares, empresas e instituições, sempre orientada pelos princípios da legalidade, confidencialidade, responsabilidade e excelência profissional.",
          "A sua prática profissional caracteriza-se por uma abordagem personalizada de cada processo, privilegiando soluções jurídicas eficazes, preventivas e estrategicamente adequadas às necessidades dos clientes.",
          "Assume-se como uma briosa profissional, destacando-se pelo empenho, agilidade, responsabilidade e eficiência. Actua nas áreas de Direito Civil, Laboral, Penal, Comercial, Família e Menores.",
        ],
      },
    ],
  },
  valores: {
    eyebrow: "Valores Corporativos",
    titlePre: "Os pilares da nossa ",
    titleItalic: "atuação",
    items: [
      { id: "etica", label: "Ética e Integridade" },
      { id: "prof", label: "Profissionalismo" },
      { id: "indep", label: "Independência" },
      { id: "conf", label: "Confidencialidade" },
      { id: "exc", label: "Excelência Técnica" },
      { id: "resp", label: "Responsabilidade" },
      { id: "transp", label: "Transparência" },
      { id: "cel", label: "Celeridade" },
      { id: "inov", label: "Inovação" },
      { id: "comp", label: "Compromisso com o Cliente" },
    ],
  },
  servicos: {
    eyebrow: "Serviços & Áreas de Atuação",
    titlePre: "Um portfólio jurídico ",
    titleItalic: "completo",
    subtitle: "Do aconselhamento estratégico ao contencioso, atuamos com rigor técnico em todas as frentes do Direito.",
    tabs: [
      {
        id: "consultoria",
        title: "Consultoria & Assessoria Empresarial",
        items: [
          { label: "Consultoria Jurídica Permanente", description: "Acompanhamento contínuo da empresa ou pessoa singular, antecipando riscos e garantindo decisões seguras em tempo real." },
          { label: "Assessoria Jurídica Empresarial", description: "Orientação estratégica no dia a dia da empresa, desde contratos até relações comerciais, com foco na sustentabilidade do negócio." },
          { label: "Elaboração e Revisão de Contratos", description: "Redação e análise de contratos claros, seguros e alinhados à lei, protegendo os interesses de todas as partes envolvidas." },
          { label: "Constituição de Empresas", description: "Apoio completo na criação de sociedades, definição de estatutos e escolha do melhor modelo societário para o projeto." },
          { label: "Due Diligence Jurídica", description: "Auditoria detalhada da situação legal de uma empresa antes de fusões, aquisições, investimentos ou parcerias." },
          { label: "Compliance e Governação Corporativa", description: "Implementação de regras internas, códigos de ética e controles que previnem ilícitos e fortalecem a transparência." },
          { label: "Consultoria em Investimento Nacional e Estrangeiro", description: "Assessoria a investidores nacionais e estrangeiros na estruturação, legalização e proteção de investimentos em Moçambique." },
        ],
      },
      {
        id: "contencioso",
        title: "Patrocínio & Contencioso",
        items: [
          { label: "Patrocínio Judicial", description: "Representação processual dedicada dos interesses do cliente em todos os tribunais e instâncias competentes." },
          { label: "Contencioso Cível", description: "Defesa e propositura de ações relacionadas a contratos, responsabilidade civil, propriedade e outras questões patrimoniais." },
          { label: "Contencioso Criminal", description: "Assistência técnica em processos-crime, desde a fase de investigação até o julgamento, em defesa dos direitos do cliente." },
          { label: "Contencioso Laboral", description: "Atuação em litígios entre empregadores e trabalhadores, incluindo rescisões, acidentes de trabalho e direitos sindicais." },
          { label: "Contencioso Administrativo", description: "Impugnação ou defesa de atos da Administração Pública, licitações, contratos públicos e sanções administrativas." },
          { label: "Recuperação de Créditos", description: "Estratégias judiciais e extrajudiciais para cobrança de dívidas, execuções e renegociação de passivos." },
        ],
      },
      {
        id: "areas",
        title: "Áreas de Especialidade",
        items: [
          { label: "Direito Civil", description: "Atuação em questões de pessoas, família, sucessões, contratos, responsabilidade civil e direitos patrimoniais." },
          { label: "Direito Comercial e Societário", description: "Assessoria a empresas em constituição, fusões, dissoluções, acordos societários e operações comerciais complexas." },
          { label: "Direito do Trabalho", description: "Consultoria e contencioso em relações de trabalho, contratos, despedimentos, acidentes e cumprimento da legislação laboral." },
          { label: "Direito Criminal", description: "Defesa técnica em investigações e processos-crime, assegurando o exercício do direito de defesa em todas as fases." },
          { label: "Direito Administrativo", description: "Atuação junto da Administração Pública, licitações, contratos administrativos, impugnações e regimes especiais." },
          { label: "Direito Fiscal", description: "Orientação tributária, contestação de autuações fiscais, regularização fiscal e planeamento tributário adequado." },
          { label: "Direito Imobiliário", description: "Acompanhamento de compra, venda, arrendamento, regularização de propriedades e projetos de desenvolvimento imobiliário." },
          { label: "Direito Bancário", description: "Assessoria a instituições financeiras e clientes em operações de crédito, garantias, contratos bancários e regulamentação." },
          { label: "Direito das Tecnologias e Proteção de Dados", description: "Consultoria em contratos tecnológicos, privacidade, proteção de dados pessoais e conformidade digital." },
          { label: "Arbitragem e Mediação", description: "Resolução alternativa de conflitos através de arbitragem ou mediação, de forma mais rápida e confidencial." },
        ],
      },
    ],
  },
  porque: {
    eyebrow: "Por que escolher",
    titlePre: "A escolha da ",
    titleItalic: "Nairo Moniques",
    titleEnd: " é a escolha da confiança.",
    subtitle: "Construímos relações de longo prazo com clientes que exigem discrição, técnica impecável e resultados mensuráveis.",
    reasons: [
      { id: "atend", title: "Atendimento Personalizado", desc: "Cada cliente é atendido com escuta ativa e uma estratégia sob medida." },
      { id: "padrao", title: "Elevado Padrão Técnico", desc: "Equipa multidisciplinar com sólida formação e prática consolidada." },
      { id: "sol", title: "Soluções Estratégicas", desc: "Aconselhamento orientado a resultados e à prevenção de litígios." },
      { id: "rap", title: "Rapidez e Eficiência", desc: "Resposta ágil sem comprometer profundidade técnica." },
      { id: "acomp", title: "Acompanhamento Permanente", desc: "Presença próxima e foco absoluto no resultado do cliente." },
    ],
  },
  contactos: {
    eyebrow: "Contactos",
    titlePre: "Fale-nos sobre o seu ",
    titleItalic: "caso",
    subtitle: "Fale-nos sobre o seu caso.",
    labels: { phone: "Telefone", email: "E-mail", office: "Escritório" },
    address: "Av. Agostinho Neto, n.º 1258, R/C, Porta 12, Cidade de Maputo, Moçambique",
    confidentiality: "Toda a comunicação com a Nairo Moniques é tratada com absoluta confidencialidade, conforme os princípios éticos da advocacia.",
    form: {
      name: "Nome Completo", email: "E-mail", phone: "Telefone",
      area: "Área de Interesse", areaPlaceholder: "Selecione uma área…",
      message: "Mensagem", messagePlaceholder: "Descreva brevemente a sua situação…",
      consent: "Ao enviar, concorda com o tratamento confidencial dos seus dados.",
    },
    areasOpts: ["Direito Civil", "Direito Comercial e Societário", "Direito do Trabalho", "Direito Criminal", "Direito Administrativo", "Direito Fiscal", "Direito Imobiliário", "Direito Bancário", "Direito das Tecnologias", "Arbitragem e Mediação", "Outro"],
    toasts: {
      selectArea: "Selecione uma área de interesse.",
      success: "Mensagem enviada. Responderemos em até 24 horas úteis.",
      error: "Não foi possível enviar. Tente novamente ou escreva para info@nairomoniquesadvogados.com.",
    },
  },
  footer: {
    nav: "Navegação", contactos: "Contactos", privacy: "Política de Privacidade",
    tagline: "Defendemos direitos, protegemos interesses e construímos soluções jurídicas com excelência.",
    rights: "© 2026 NAIRO MONIQUES – Advogados e Consultores. Todos os direitos reservados. Maputo, Moçambique.",
  },
};

const en: Dict = {
  nav: { inicio: "Home", sobre: "About Us", equipe: "Team", servicos: "Services", areas: "Practice Areas", contactos: "Contact" },
  cta: { consultor: "Speak with a Consultant", agendar: "Book a Legal Consultation", conhecer: "About the Firm", enviar: "Send Secure Message", enviando: "Sending…", enviada: "Message Sent ✓", verPerfil: "View full profile", voltar: "Back" },
  location: "Maputo · Mozambique",
  hero: {
    title1: "Legal Excellence, ",
    titleItalic: "Technical Rigor",
    title2: " and Unwavering Commitment.",
    subtitle: "We defend rights, protect interests and build legal solutions with excellence.",
    stats: [
      { k: "10+", v: "Practice Areas" },
      { k: "100%", v: "Confidentiality" },
      { k: "24/7", v: "Ongoing Counsel" },
    ],
    badge: "A law firm devoted to excellence, ethics and professional deontology.",
  },
  sobre: {
    eyebrow: "The Firm",
    titlePre: "A tradition of ",
    titleItalic: "legal excellence",
    subtitle: "A firm dedicated to delivering outstanding legal and advisory services, guided by technical rigor, professional ethics and confidentiality.",
    visao: { title: "Vision", text: "To be a national and regional reference in legal and advisory services, recognized for excellence, innovation and integrity." },
    missao: { title: "Mission", text: "To deliver high-quality legal services, ensuring effective technical defense and strategic counsel." },
  },
  equipe: {
    eyebrow: "Our Team",
    titlePre: "Professionals dedicated to your ",
    titleItalic: "cause",
    subtitle: "Meet the lawyers of Nairo Moniques Advogados e Consultores. Click any member to view their full profile.",
    areasLabel: "Practice Areas",
    membros: [
      {
        id: "nairo",
        name: "Dr. Nairo Moniques",
        title: "FOUNDING PARTNER & MANAGING DIRECTOR",
        role: "Attorney, University Lecturer and Master in Public Security and Criminal Investigation",
        carteira: "Bar Card No. 1955 — Mozambique Bar Association",
        areas: ["Criminal Law", "Family & Succession", "Labor Law", "Commercial Law"],
        bio: [
          "Dr. Nairo Moniques is an attorney registered with the Mozambique Bar Association, under Bar Card No. 1955, practicing law with high technical rigor, professional ethics and an ongoing commitment to the rule of law, legality and the fundamental rights of citizens.",
          "He holds a Law degree and a Master's in Police Sciences, specializing in Public Security and Criminal Investigation — training that provides him with a multidisciplinary view of justice, combining legal knowledge with criminal investigation, public security and forensic science.",
          "Institutionally, he served as Vice-President of the Commission for the Defense and Reinforcement of Lawyers' Prerogatives of the Mozambique Bar Association during the 2023–2026 term, contributing to the promotion, protection and strengthening of the institutional safeguards essential to the free and independent practice of law. In this role, he took part in shaping initiatives aimed at reinforcing professional prerogatives, uplifting the profession and improving the administration of justice.",
          "Alongside his legal practice, he is CEO of WARYA CONSULTING AND SERVICES, LDA, a firm devoted to business and market consulting. He also serves as a university lecturer, training new professionals in Law and Police Sciences and promoting a critical, ethical and scientific approach to legal knowledge.",
          "He is particularly active in Criminal Law, Family & Succession, Labor Law and Commercial Law.",
        ],
      },
      {
        id: "adila",
        name: "Dra. Adila Fátima Cassimo Omar",
        title: "Associate Attorney",
        role: "Attorney — Law Degree",
        carteira: "Bar Card No. 2542 — Mozambique Bar Association",
        areas: ["Civil Law", "Labor Law", "Criminal Law", "Commercial Law", "Family & Minors"],
        bio: [
          "Dra. Adila Fátima Cassimo Omar is an attorney registered with the Mozambique Bar Association, under Bar Card No. 2542, and fully qualified to practice law.",
          "She holds a Law degree, with solid legal training that underpins her work, marked by technical rigor, professional ethics, independence and a commitment to defending the rights and interests of her clients.",
          "She serves as Associate Attorney at Nairo Moniques Advogados e Consultores, providing legal consulting, court representation and legal advisory services to individuals, companies and institutions, always guided by the principles of legality, confidentiality, responsibility and professional excellence.",
          "Her practice is characterized by a personalized approach to each case, favoring effective, preventive and strategically tailored legal solutions.",
          "She is a diligent professional, known for dedication, agility, responsibility and efficiency. She practices in Civil, Labor, Criminal, Commercial and Family & Minors Law.",
        ],
      },
    ],
  },
  valores: {
    eyebrow: "Corporate Values",
    titlePre: "The pillars of our ",
    titleItalic: "practice",
    items: [
      { id: "etica", label: "Ethics & Integrity" },
      { id: "prof", label: "Professionalism" },
      { id: "indep", label: "Independence" },
      { id: "conf", label: "Confidentiality" },
      { id: "exc", label: "Technical Excellence" },
      { id: "resp", label: "Responsibility" },
      { id: "transp", label: "Transparency" },
      { id: "cel", label: "Responsiveness" },
      { id: "inov", label: "Innovation" },
      { id: "comp", label: "Client Commitment" },
    ],
  },
  servicos: {
    eyebrow: "Services & Practice Areas",
    titlePre: "A comprehensive legal ",
    titleItalic: "portfolio",
    subtitle: "From strategic advice to litigation, we work with technical rigor across every field of law.",
    tabs: [
      {
        id: "consultoria",
        title: "Consulting & Business Advisory",
        items: [
          { label: "Ongoing Legal Counsel", description: "Continuous support for companies or individuals, anticipating risks and enabling sound decisions in real time." },
          { label: "Corporate Legal Advisory", description: "Strategic guidance for day-to-day company matters, from contracts to commercial relations, focused on business sustainability." },
          { label: "Contract Drafting & Review", description: "Drafting and reviewing clear, secure and legally aligned contracts that protect all parties' interests." },
          { label: "Company Formation", description: "Full support in setting up companies, drafting bylaws and choosing the best corporate structure for the project." },
          { label: "Legal Due Diligence", description: "Detailed audit of a company's legal standing prior to mergers, acquisitions, investments or partnerships." },
          { label: "Compliance & Corporate Governance", description: "Implementation of internal rules, codes of ethics and controls that prevent wrongdoing and strengthen transparency." },
          { label: "Domestic & Foreign Investment Advisory", description: "Advising domestic and foreign investors on structuring, licensing and protecting investments in Mozambique." },
        ],
      },
      {
        id: "contencioso",
        title: "Litigation & Court Representation",
        items: [
          { label: "Court Representation", description: "Dedicated procedural representation of the client's interests before all competent courts and instances." },
          { label: "Civil Litigation", description: "Defense and initiation of proceedings involving contracts, civil liability, property and other patrimonial matters." },
          { label: "Criminal Litigation", description: "Technical assistance in criminal proceedings, from investigation to trial, safeguarding the client's rights." },
          { label: "Labor Litigation", description: "Handling disputes between employers and employees, including terminations, workplace accidents and union rights." },
          { label: "Administrative Litigation", description: "Challenging or defending acts of Public Administration, tenders, public contracts and administrative sanctions." },
          { label: "Debt Recovery", description: "Judicial and out-of-court strategies for debt collection, enforcement and liability renegotiation." },
        ],
      },
      {
        id: "areas",
        title: "Specialty Areas",
        items: [
          { label: "Civil Law", description: "Matters involving persons, family, succession, contracts, civil liability and patrimonial rights." },
          { label: "Commercial & Corporate Law", description: "Advising companies on incorporation, mergers, dissolutions, shareholder agreements and complex commercial deals." },
          { label: "Labor Law", description: "Advisory and litigation on labor relations, contracts, dismissals, accidents and labor law compliance." },
          { label: "Criminal Law", description: "Technical defense in investigations and criminal proceedings, ensuring the right of defense at every stage." },
          { label: "Administrative Law", description: "Engagement with Public Administration, tenders, administrative contracts, appeals and special regimes." },
          { label: "Tax Law", description: "Tax guidance, challenging tax assessments, tax regularization and appropriate tax planning." },
          { label: "Real Estate Law", description: "Support with buying, selling, leasing, regularizing property and real estate development projects." },
          { label: "Banking Law", description: "Advising financial institutions and clients on credit, guarantees, banking contracts and regulation." },
          { label: "Technology & Data Protection Law", description: "Advisory on technology contracts, privacy, personal data protection and digital compliance." },
          { label: "Arbitration & Mediation", description: "Alternative dispute resolution through arbitration or mediation, faster and more confidential." },
        ],
      },
    ],
  },
  porque: {
    eyebrow: "Why choose us",
    titlePre: "Choosing ",
    titleItalic: "Nairo Moniques",
    titleEnd: " is choosing trust.",
    subtitle: "We build long-term relationships with clients who demand discretion, impeccable technique and measurable results.",
    reasons: [
      { id: "atend", title: "Personalized Service", desc: "Every client is met with active listening and a tailored strategy." },
      { id: "padrao", title: "High Technical Standard", desc: "A multidisciplinary team with solid training and consolidated practice." },
      { id: "sol", title: "Strategic Solutions", desc: "Result-oriented counsel focused on preventing litigation." },
      { id: "rap", title: "Speed & Efficiency", desc: "Agile response without compromising technical depth." },
      { id: "acomp", title: "Ongoing Support", desc: "Close presence and absolute focus on the client's outcome." },
    ],
  },
  contactos: {
    eyebrow: "Contact",
    titlePre: "Tell us about your ",
    titleItalic: "case",
    subtitle: "Tell us about your case.",
    labels: { phone: "Phone", email: "Email", office: "Office" },
    address: "Av. Agostinho Neto, No. 1258, Ground Floor, Door 12, Maputo, Mozambique",
    confidentiality: "All communication with Nairo Moniques is handled with strict confidentiality, in line with the ethical principles of the legal profession.",
    form: {
      name: "Full Name", email: "Email", phone: "Phone",
      area: "Area of Interest", areaPlaceholder: "Select an area…",
      message: "Message", messagePlaceholder: "Briefly describe your situation…",
      consent: "By submitting, you agree to the confidential handling of your data.",
    },
    areasOpts: ["Civil Law", "Commercial & Corporate Law", "Labor Law", "Criminal Law", "Administrative Law", "Tax Law", "Real Estate Law", "Banking Law", "Technology Law", "Arbitration & Mediation", "Other"],
    toasts: {
      selectArea: "Please select an area of interest.",
      success: "Message sent. We will reply within 24 business hours.",
      error: "Could not send. Please try again or email info@nairomoniquesadvogados.com.",
    },
  },
  footer: {
    nav: "Navigation", contactos: "Contact", privacy: "Privacy Policy",
    tagline: "We defend rights, protect interests and build legal solutions with excellence.",
    rights: "© 2026 NAIRO MONIQUES – Advogados e Consultores. All rights reserved. Maputo, Mozambique.",
  },
};

const DICTS: Record<Lang, Dict> = { pt, en };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("nm-lang");
      if (saved === "pt" || saved === "en") setLangState(saved);
    } catch { /* ignore */ }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { window.localStorage.setItem("nm-lang", l); } catch { /* ignore */ }
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: DICTS[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): Ctx {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
