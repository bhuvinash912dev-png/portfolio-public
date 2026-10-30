export type ProjectImage = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  lqip?: string;
  // CSS object-position from the focus point (hotspot) set in the Studio.
  position?: string;
};

export type Project = {
  id: string;
  title: string;
  description?: string;
  images?: ProjectImage[];
  tags?: string[];
  featured?: boolean;
  liveUrl?: string;
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3001");

export const site = {
  name: "Bhuvinash Kumaran",
  firstName: "Bhuvinash",
  lastName: "Kumaran",
  initials: "BK",
  title: "AI Engineer | Full Stack Developer",
  url: siteUrl,
  // Path under /public, e.g. "/photo.jpg". Leave empty to show initials instead.
  photo: "/photo.png",
  description:
    "Bhuvinash Kumaran — AI Engineer and Full Stack Developer with 6 years of experience building intelligent web applications, scalable backend systems, and AI-powered automation solutions.",
  roles: ["AI Engineer", "Full Stack Developer", "AI Agent Builder", "Automation Specialist"],
  tagline:
    "I design, build, and deploy intelligent web applications — from scalable backends and cloud infrastructure to RAG chatbots and AI agents that automate real business work.",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Showcase", href: "#showcase" },
];

export const stats = [
  { label: "Years Experience", value: "6+", icon: "⚡" },
  { label: "Less Manual Work via AI", value: "40%", icon: "🤖" },
  { label: "Cloud Platforms", value: "AWS·GCP·Azure", icon: "☁️" },
  { label: "Certifications", value: "5", icon: "🎓" },
];

export const about = {
  intro:
    "an AI Engineer and Full Stack Developer with 6 years of experience designing, developing, and deploying intelligent web applications, scalable backend systems, and AI-powered automation solutions.",
  body:
    "I turn business requirements into secure, scalable, and user-friendly software — from REST API design and database architecture to cloud deployment on AWS, Vercel, and DigitalOcean. My day-to-day stack spans Python, TypeScript, React, Next.js, Node.js, FastAPI, Django, PostgreSQL, and MongoDB.",
  focus:
    "Lately I focus on practical AI: chatbots built on OpenAI, LangChain, and retrieval-augmented generation, plus agentic workflows that automate customer support, document processing, and internal operations — cutting manual work by up to 40%.",
};

export const focusAreas = [
  { area: "AI Engineering", desc: "LLMs · RAG · AI Agents · LangChain · LangGraph · OpenAI · Claude" },
  { area: "Full Stack Development", desc: "React · Next.js · TypeScript · Node.js · FastAPI · Django" },
  { area: "Cloud & DevOps", desc: "AWS · GCP · Azure · Docker · Kubernetes · Terraform · CI/CD" },
  { area: "Data & Databases", desc: "PostgreSQL · MongoDB · MySQL · Pandas · PyTorch · Scikit-learn" },
];

export const experience = [
  {
    year: "2023–2025",
    role: "AI Engineer | Full Stack Developer",
    org: "Cognitive Consulting Sdn Bhd",
    highlights: [
      "Built RAG chatbots with OpenAI, LangChain & vector search",
      "AI automation tools that cut manual operations by up to 40%",
      "Shipped full-stack platforms on AWS, Vercel & DigitalOcean",
    ],
  },
  {
    year: "2020–2022",
    role: "Full Stack Developer",
    org: "Nintex",
    highlights: [
      "Dashboards, customer portals, booking & CRM systems",
      "REST APIs with React, Node.js, Laravel & PostgreSQL",
      "Payment, email, Google & messaging API integrations",
    ],
  },
  {
    year: "2018–2020",
    role: "Junior Software Developer",
    org: "WoodWing",
    highlights: [
      "Websites, internal tools & admin dashboards",
      "JavaScript, PHP, MySQL & React.js",
    ],
  },
];

export const education = {
  year: "2017–2021",
  degree: "Bachelor's degree, Computer Science",
  school: "Tunku Abdul Rahman College",
};

export const stack = [
  {
    title: "AI Engineering & GenAI",
    icon: "🤖",
    color: "#f59e0b",
    items: ["LLMs", "RAG Pipelines", "AI Agents", "Multi-Agent Workflows", "Prompt Engineering", "OpenAI API", "Anthropic Claude API", "LangChain", "LangGraph", "LlamaIndex", "CrewAI", "AutoGen", "OpenAI Agents SDK", "MCP", "Hugging Face", "Fine-Tuning (LoRA/QLoRA)", "vLLM", "Ollama"],
  },
  {
    title: "Machine Learning & Data",
    icon: "🧠",
    color: "#8b5cf6",
    items: ["Python", "NumPy", "Pandas", "Scikit-learn", "PyTorch", "TensorFlow", "Keras", "NLP", "Sentiment Analysis", "Model Training & Evaluation", "MLflow"],
  },
  {
    title: "Frontend",
    icon: "🎨",
    color: "#3b82f6",
    items: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Zustand", "TanStack Query", "SEO Optimization"],
  },
  {
    title: "Backend",
    icon: "⚙️",
    color: "#10b981",
    items: ["Node.js", "Express.js", "NestJS", "FastAPI", "Django", "Flask", "REST APIs", "GraphQL", "WebSockets", "Microservices", "Serverless", "JWT / OAuth 2.0 / OIDC", "RBAC", "Webhooks", "Event-Driven Architecture", "PostgreSQL", "MongoDB", "MySQL"],
  },
  {
    title: "Cloud, DevOps & Infra",
    icon: "☁️",
    color: "#06b6d4",
    items: ["AWS", "Google Cloud", "Azure", "Vercel", "Netlify", "Cloudflare Workers", "DigitalOcean", "Docker", "Kubernetes", "Helm", "Terraform", "Pulumi", "GitHub Actions", "GitLab CI/CD", "Nginx", "Linux", "Observability"],
  },
  {
    title: "Practices & Tools",
    icon: "🛠️",
    color: "#ef4444",
    items: ["System Design", "Clean Architecture", "TDD", "Jest", "Playwright", "Cypress", "Agile / Scrum", "Git", "Postman", "Swagger", "Figma", "Jira", "Claude Code", "Cursor", "Turborepo"],
  },
];

export const certifications = [
  { name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", year: "2024" },
  { name: "Microsoft Certified: Azure AI Engineer Associate", issuer: "Microsoft", year: "2025" },
  { name: "NVIDIA-Certified Associate: Generative AI LLMs", issuer: "NVIDIA", year: "2025" },
  { name: "Google Cloud Professional Machine Learning Engineer", issuer: "Google Cloud", year: "" },
  { name: "Python for Data Science and Machine Learning", issuer: "IBM / Coursera", year: "2022" },
  { name: "AWS Certified Machine Learning Engineer", issuer: "Amazon Web Services", year: "Expected 2026" },
];

// Shown only if Sanity is not configured. Add real projects in /studio.
export const defaultProjects: Project[] = [];

export const showcase = {
  label: "04 — Technical Showcase",
  title: "Production RAG",
  titleAccent: " AI Assistant",
  intro:
    "The architecture I use to ship AI chatbots and automation for real businesses — grounding LLM answers in company documents, wrapping them in secure APIs, and deploying them to the cloud with monitoring.",
};

export const showcaseSteps = [
  {
    id: "01", title: "Document Ingestion", icon: "📄", color: "#25d366",
    description: "Business documents — PDFs, policies, tickets, knowledge bases — are collected by background jobs, cleaned, and split into semantically meaningful chunks.",
    tech: ["Python", "Background Jobs", "Webhooks", "Document Processing"],
  },
  {
    id: "02", title: "Embeddings & Vector Search", icon: "🧭", color: "#3b9eff",
    description: "Each chunk is embedded and stored in a vector index alongside metadata, so the assistant can retrieve the most relevant context for any question in milliseconds.",
    tech: ["OpenAI Embeddings", "Vector Search", "PostgreSQL", "LlamaIndex"],
  },
  {
    id: "03", title: "Agentic Reasoning", icon: "🧠", color: "#a78bfa",
    description: "A LangGraph agent decides whether to answer from retrieved context, call internal tools and APIs, or hand off to a human — keeping answers grounded and actions auditable.",
    tech: ["LangChain", "LangGraph", "OpenAI / Claude", "Tool Calling"],
  },
  {
    id: "04", title: "Secure API Layer", icon: "🔐", color: "#f59e0b",
    description: "A FastAPI service exposes the assistant with JWT/OAuth authentication and role-based access control, so each user only retrieves documents they are allowed to see.",
    tech: ["FastAPI", "JWT / OAuth 2.0", "RBAC", "REST APIs"],
  },
  {
    id: "05", title: "Deployment & Monitoring", icon: "🚀", color: "#10b981",
    description: "The Next.js chat UI and admin dashboard ship on Vercel, the API runs in Docker on AWS, and analytics track usage, answer quality, and response time.",
    tech: ["Next.js", "Docker", "AWS", "Vercel", "Observability"],
  },
];

export const showcaseCode = `# Simplified RAG endpoint
@app.post("/chat")
async def chat(req: ChatRequest, user: User = Depends(current_user)):
    # 1. Retrieve only documents this user may access
    docs = await vector_store.asimilarity_search(
        req.question,
        k=5,
        filter={"team": user.team}
    )

    # 2. Let the agent reason over context and tools
    result = await agent.ainvoke({
        "question": req.question,
        "context": format_docs(docs),
        "history": await memory.load(user.id)
    })

    # 3. Persist conversation and log metrics
    await memory.save(user.id, req.question, result["answer"])
    metrics.track("chat_response", user_id=user.id)

    return {"answer": result["answer"], "sources": cite(docs)}`;

export const showcaseFeatures = [
  { icon: "🎯", title: "Grounded answers", desc: "Responses cite the source documents they were built from, reducing hallucinations" },
  { icon: "🔐", title: "Secure by design", desc: "Authentication and role-based access control applied at retrieval time, not just in the UI" },
  { icon: "⚡", title: "Real automation", desc: "Agentic workflows that have cut manual business operations by up to 40%" },
];

export const footerTagline = "Practical AI solutions that improve productivity";
