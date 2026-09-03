/**
 * ------------------------------------------------------------------
 *  SINGLE SOURCE OF TRUTH
 * ------------------------------------------------------------------
 *  Everything personal lives here. To customise the whole site you
 *  should only ever need to edit THIS file (plus dropping your resume
 *  PDFs and headshot into /public).
 *
 *  Fields marked  // TODO  are the ones I could not fill for you.
 * ------------------------------------------------------------------
 */

export type Social = {
  key: "github" | "linkedin" | "credly" | "email";
  label: string;
  href: string;
  handle: string;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  /** Simple Icons slug for the logo, or "" to fall back to initials. */
  logoSlug: string;
  /** Optional visible fallback text if the logo image is unavailable. */
  logoText?: string;
  summary: string;
  points: string[];
  stack: string[];
};

export type Project = {
  title: string;
  blurb: string;
  tags: string[];
  featured?: boolean;
  /** Optional external link (repo / case study). "" hides the link. */
  href?: string;
};

export type Cert = {
  title: string;
  issuer: string;
  href: string;
};

export const site = {
  name: "Nakul Bukkawar",
  initials: "NB",
  role: "Full-Stack & GenAI Engineer",
  location: "Nagpur, India",
  availability: "Available for remote and hybrid roles",

  // Hero copy. Words wrapped in <accent> render in the accent colour.
  headline: ["I build reliable backend systems", "and the <accent>GenAI</accent> layer on top."],
  subhead:
    "Full-stack engineer with 4.2 years building production-grade systems for BMW, HDFC, and IBM. I work across backend engineering, AI integration, and platform operations.",

  email: "nakulbukkawar07@gmail.com",
  // Your number is in the config but NOT rendered anywhere by default
  // (public pages attract spam). Wire it into Connect.tsx if you want it shown.
  phone: "+91 8669788784",

  // Drop a square headshot at /public/headshot.jpg and set this to "/headshot.jpg".
  // Left blank, the site shows a clean "NB" monogram instead.
  photoUrl: "",

  // Put the two PDFs in /public and keep these paths in sync.
  resumes: [
    { label: "GenAI resume", href: "/Nakul-Bukkawar-GenAI.pdf" },
    { label: "Full-stack resume", href: "/Nakul-Bukkawar-FullStack.pdf" },
  ],

  socials: [
    {
      key: "github",
      label: "GitHub",
      href: "https://github.com/NakS15",
      handle: "@NakS15",
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/nakul-bukkawar-115a89204/",
      handle: "in/nakul-bukkawar",
    },
    {
      key: "credly",
      label: "Credly",
      href: "https://www.credly.com/users/nakul-bukkawar",
      handle: "AWS + GCP badges",
    },
    {
      key: "email",
      label: "Email",
      href: "mailto:nakulbukkawar07@gmail.com",
      handle: "nakulbukkawar07@gmail.com",
    },
  ] as Social[],

  // Short, real, non-inflated numbers for the About strip.
  stats: [
    { value: "4.2+", label: "years shipping production software" },
    { value: "2M+", label: "daily transactions served (FASTAG)" },
    { value: "AWS + GCP", label: "cloud certified" },
    { value: "RAG · MCP · Agents", label: "GenAI, in production" },
  ],

  stack: [
    { group: "Languages", items: ["Java", "Python", "TypeScript", "JavaScript", "Bash"] },
    { group: "Backend", items: ["Quarkus", "Spring Boot", "Node.js", "FastAPI"] },
    { group: "Frontend", items: ["Angular", "RxJS / NgRx", "React"] },
    { group: "Data & Messaging", items: ["PostgreSQL", "pgvector", "MongoDB", "MySQL", "Kafka", "RabbitMQ"] },
    { group: "Cloud & DevOps", items: ["AWS", "GCP", "Azure", "Docker", "Kubernetes", "GitHub Actions", "GitLab CI", "Jenkins"] },
    { group: "GenAI & ML", items: ["RAG", "Anthropic API", "MCP", "LangGraph", "Prompt engineering", "Pandas / NumPy"] },
  ],

  experience: [
    {
      company: "BMW TechWorks India",
      role: "Full Stack Developer",
      period: "Jun 2025 - Present",
      location: "Pune",
      logoSlug: "bmw",
      logoText: "BMW",
      summary: "Sustainability platform engineering on the CO2MOS / Product Carbon Footprint stack.",
      points: [
        "Built and operated microservices on the CO2MOS / PCF platform for carbon accounting and sustainability reporting.",
        "Shipped full-stack features across Quarkus and Spring Boot services with an Angular front end.",
        "Worked on Kubernetes deployment pipelines, GitHub workflows, and event-driven services with Kafka.",
      ],
      stack: ["Java", "Quarkus", "Spring Boot", "Angular", "Kafka", "Kubernetes"],
    },
    {
      company: "IBM",
      role: "Software Engineer",
      period: "Jun 2022 - May 2025",
      location: "Pune",
      logoSlug: "ibm",
      logoText: "IBM",
      summary: "Enterprise delivery for banking, telecom, and healthcare clients.",
      points: [
        "Built the HDFC Bank FASTAG backend handling 2M+ daily transactions for a high-scale payments workflow.",
        "Delivered backend and integration work for AT&T and Horizon BCBS across enterprise service modernization.",
        "Built feature pipelines in Pandas / NumPy for a production demand-forecasting model used by retail planning teams.",
      ],
      stack: ["Java", "Spring Boot", "Node.js", "PostgreSQL", "Kafka", "Python"],
    },
  ] as Experience[],

  projects: [
    {
      title: "FASTAG transactions platform",
      blurb:
        "High-throughput payment backend work for HDFC Bank, supporting millions of daily FASTAG transactions with robust service and integration patterns.",
      tags: ["Java", "Spring Boot", "MySQL", "Kafka"],
      featured: true,
      href: "",
    },
    {
      title: "Telecom and healthcare modernization",
      blurb:
        "Enterprise integrations and backend delivery for AT&T and Horizon BCBS, focused on reliability, API flows, and operational resilience.",
      tags: ["Java", "Node.js", "PostgreSQL", "Integration"],
      href: "",
    },
    {
      title: "BMW carbon footprint platform",
      blurb:
        "Microservices for sustainability and carbon accounting workflows, including backend APIs, deployment automation, and event-driven processing.",
      tags: ["Quarkus", "Angular", "Kubernetes", "Kafka"],
      href: "",
    },
    {
      title: "RAG knowledge engine",
      blurb:
        "Retrieval-augmented generation over PostgreSQL + pgvector, grounded on the Anthropic API. Chunking, hybrid retrieval, and citation-backed answers.",
      tags: ["Python", "FastAPI", "pgvector", "Anthropic API"],
      href: "",
    },
    {
      title: "MCP tool server",
      blurb:
        "A working Model Context Protocol server that exposes typed tools to LLM clients, so models can act against real systems safely.",
      tags: ["TypeScript", "MCP", "Node.js"],
      href: "",
    },
    {
      title: "Saree marketplace MVP",
      blurb:
        "A side project inspired by a marketplace model where sellers can list sarees and buyers can browse, compare, and purchase them online.",
      tags: ["React", "Node.js", "MongoDB", "Full-stack"],
      href: "",
    },
  ] as Project[],

  certs: [
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      href: "https://www.credly.com/users/nakul-bukkawar",
    },
    {
      title: "Google Cloud Digital Leader",
      issuer: "Google Cloud",
      href: "https://www.credly.com/users/nakul-bukkawar",
    },
  ] as Cert[],
};

export type Site = typeof site;
