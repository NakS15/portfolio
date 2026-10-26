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
  /**
   * Optional status pill shown instead of a link arrow when there's no
   * href. Use this so an empty href reads as an intentional choice
   * (NDA'd client work, or in-progress) rather than a broken/dead card.
   */
  status?: "private" | "in-progress";
  /** Optional one-line origin shown in the project detail modal. */
  context?: string;
  /** Optional extra depth (from resume bullets) shown only in the modal. */
  highlights?: string[];
};

export type Cert = {
  title: string;
  issuer: string;
  href: string;
};

// Career start: IBM, June 2022. Computed on each build/request instead of a
// hardcoded string so "years of experience" never silently goes stale.
const CAREER_START = new Date(2022, 5, 1);
function yearsOfExperience(): string {
  const months =
    (Date.now() - CAREER_START.getTime()) / (1000 * 60 * 60 * 24 * 30.4369);
  return (months / 12).toFixed(1);
}

export const site = {
  name: "Nakul Bukkawar",
  initials: "NB",
  role: "Full-Stack & GenAI Engineer",
  location: "Nagpur, India",
  availability: "Available for remote and hybrid roles",

  // Hero copy. Words wrapped in <accent> render in the accent colour.
  headline: ["I build reliable backend systems", "and the <accent>GenAI</accent> layer on top."],
  subhead:
    `Full-stack engineer with ${yearsOfExperience()} years building production-grade systems for BMW, HDFC, and IBM. I work across backend engineering, AI integration, and platform operations.`,

  email: "nakulbukkawar07@gmail.com",
  // Phone number intentionally omitted from source. Public repos + committed
  // git history are not a safe place for a personal phone number. If you
  // want to show it somewhere, read it from process.env.CONTACT_PHONE
  // (set in an untracked .env.local) inside the component that needs it.

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
    { value: `${yearsOfExperience()}+`, label: "years shipping production software" },
    { value: "2M+", label: "daily transactions served (FASTAG)" },
    { value: "AWS + GCP", label: "cloud certified" },
    { value: "RAG · MCP · Agents", label: "GenAI, in production" },
  ],

  stack: [
    { group: "Languages", items: ["Java", "Python", "TypeScript", "JavaScript", "Bash"] },
    { group: "Backend", items: ["Quarkus", "Spring Boot", "Node.js", "FastAPI"] },
    { group: "Frontend", items: ["Angular", "RxJS / NgRx", "React", "Flutter", "FlutterFlow", "Thymeleaf", "JavaFX"] },
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
      status: "private",
      context: "Built at IBM, 2022-2025",
      highlights: [
        "Migrated a legacy C# monolith to Java/Quarkus microservices serving 2M+ daily transactions with zero downtime.",
        "Cut response times by 50% and tripled throughput through a PostgreSQL schema redesign and load testing.",
        "Added RabbitMQ async messaging and circuit breakers, reaching 99.95% uptime.",
      ],
    },
    {
      title: "Telecom and healthcare modernization",
      blurb:
        "Enterprise integrations and backend delivery for AT&T and Horizon BCBS, focused on reliability, API flows, and operational resilience.",
      tags: ["Java", "Node.js", "PostgreSQL", "Integration"],
      href: "",
      status: "private",
      context: "Built at IBM, 2022-2025",
      highlights: [
        "Automated manual QA for AT&T's Common Test Platform, raising test coverage from 45% to 85%.",
        "Hardened Horizon BCBS's healthcare APIs with caching, load balancing, and Splunk-based real-time monitoring.",
        "Built scalable Spring Boot, Kafka, and MongoDB services to absorb traffic growth without new infrastructure.",
      ],
    },
    {
      title: "BMW carbon footprint platform",
      blurb:
        "Microservices for sustainability and carbon accounting workflows, including backend APIs, deployment automation, and event-driven processing.",
      tags: ["Quarkus", "Angular", "Kubernetes", "Kafka"],
      href: "",
      status: "private",
      context: "Built at BMW TechWorks India, 2025-present",
      highlights: [
        "Designed a weighted-similarity matching algorithm that replaced manual SME lookups for component-to-sustainability mapping.",
        "Eliminated N+1 query patterns with bulk-fetch endpoints, cutting per-vehicle load times.",
        "Prototyped an Anthropic-API matching pipeline with a deterministic fallback, plus a two-stage human-in-the-loop review workflow.",
      ],
    },
    {
      title: "RAG knowledge engine",
      blurb:
        "Retrieval-augmented generation over PostgreSQL + pgvector, grounded on the Anthropic API. Chunking, hybrid retrieval, and citation-backed answers.",
      tags: ["Python", "FastAPI", "pgvector", "Anthropic API"],
      href: "https://github.com/NakS15/RAG-Knowledge-Engine",
      context: "Personal project",
      highlights: [
        "Implemented chunking, embedding, and similarity search on PostgreSQL + pgvector.",
        "Grounded responses in retrieved context end to end via the Anthropic API.",
      ],
    },
    {
      title: "MCP tool server",
      blurb:
        "A working Model Context Protocol server that exposes typed tools to LLM clients, so models can act against real systems safely.",
      tags: ["TypeScript", "MCP", "Node.js"],
      href: "https://github.com/NakS15/MCP-tool-server",
      context: "Personal project",
      highlights: [
        "Built a functional MCP server exposing a custom tool to an LLM client, following the MCP spec, running end to end locally.",
      ],
    },

    {
      title: "Saree marketplace MVP",
      blurb:
        "A side project inspired by a marketplace model where sellers can list sarees and buyers can browse, compare, and purchase them online.",
      tags: ["React", "Node.js", "MongoDB", "Full-stack"],
      href: "https://github.com/NakS15/saree",
      context: "Personal project",
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
