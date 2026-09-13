// lib/resumeData.ts

import { Globe, Linkedin, Mail, Phone } from "lucide-react";

export const profile = {
  name: "Christopher Diasanta",
  role: "Software Engineer II",
  company: "Mission Technologies, a division of HII",
  location: "Virginia Beach, VA",
  clearance: "Active Secret clearance",
  opportunities: "Open to backend and platform engineering roles",
  history:
    "Software Engineer II: Apr 2025–Present. Software Engineer I: Sep 2021–Apr 2025. Remote, Virginia.",
};

// 1. Contact Information
export const contact = [
  {
    label: "Email",
    value: "chrisdiasanta@gmail.com",
    href: "mailto:chrisdiasanta@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "(757) 339-8084",
    href: "tel:+17573398084",
    icon: Phone,
  },

  {
    label: "LinkedIn",
    value: "LinkedIn Profile",
    href: "https://www.linkedin.com/in/christopher-diasanta-7a210b1a9",
    icon: Linkedin,
  },
  {
    label: "Website",
    value: "chris.diasanta.com",
    href: "https://chris.diasanta.com",
    icon: Globe,
  },
];

// Shared by the website, search, and generated PDF.
export const careerImpact = {
  simulation: { value: "20×", before: "~100", after: "~2,000" },
  cpu: { value: "75%", before: "~100%", after: "~25%" },
};

export const metrics = [
  { value: careerImpact.simulation.value, label: "simulation entity scale-up" },
  { value: careerImpact.cpu.value, label: "CPU utilization reduction" },
  { value: "4", label: "live customer demonstrations" },
];

// 3. Professional Highlights/Focus Areas
export const highlights = [
  {
    title: "Simulation R&D",
    body: "Built cloud simulation prototypes with Kafka data pipelines, Java Spring services, WebSocket messaging, and Vue/Cesium visualization.",
  },
  {
    title: "Service Architecture",
    body: "Defined service boundaries and extracted monolith features into Dockerized microservices while preserving feature parity.",
  },
  {
    title: "Performance Work",
    body: "Tuned persistence, batching, caching, and concurrent message processing for lower endpoint latency, CPU usage, and database load.",
  },
  {
    title: "Customer Demos",
    body: "Supported four live customer-facing demos by troubleshooting real-time issues with Sales and Product Management partners.",
  },
];

// 4. Experience Bullet Points
export const experienceBullets = [
  {
    title: "Data Pipeline & Simulation Scaling",
    description: `Built distributed pipelines and streaming services for a Monte Carlo simulation platform, scaling concurrent entity support from about ${careerImpact.simulation.before.slice(1)} to about ${careerImpact.simulation.after.slice(1)} (${careerImpact.simulation.value}).`,
  },
  {
    title: "Real-time Mapping Performance Improvement",
    description: `Optimized concurrent message processing in a Java Spring Kafka/WebSocket backend for Vue/Cesium mapping, reducing CPU utilization from about ${careerImpact.cpu.before.slice(1)} to about ${careerImpact.cpu.after.slice(1)}.`,
  },
  {
    title: "Microservices Migration",
    description:
      "Led a monolith-to-microservices migration: defined service boundaries and extracted services while maintaining feature parity.",
  },
  {
    title: "Simulation Platform Development",
    description:
      "Built cloud simulation R&D prototypes connecting Kafka pipelines, Java Spring services, WebSocket messaging, and Vue/Cesium visualization.",
  },
  {
    title: "API Design & Integration",
    description:
      "Designed REST APIs with Spring Boot and integrated them with Vue/React interfaces and external services.",
  },
  {
    title: "Persistence Layer Optimization",
    description:
      "Migrated persistence to Spring Data JPA/Hibernate, using batching, caching, and optimized database access to improve endpoint performance and reduce query complexity.",
  },
  {
    title: "Security Remediation",
    description:
      "Resolved dependency vulnerabilities and CVE findings while maintaining build stability and application compatibility.",
  },
  {
    title: "Customer Demonstration Support",
    description:
      "Supported four live customer demonstrations, troubleshooting technical issues with Sales and Product Management and explaining platform capabilities.",
  },
];

export const selectedWork = [
  {
    title: "Cloud simulation & real-time mapping",
    category: "Backend & streaming",
    stack: ["Java", "Spring", "Kafka", "WebSockets", "Vue", "Cesium"],
    scope:
      "Simulation R&D and streaming systems with an interactive geospatial interface.",
    contribution:
      "Built data pipelines and services, connected them to Vue/Cesium visualization, and optimized concurrent message processing in the mapping backend.",
    result: `Simulation entity support grew from ${careerImpact.simulation.before} to ${careerImpact.simulation.after}. Mapping backend CPU utilization fell from ${careerImpact.cpu.before} to ${careerImpact.cpu.after}.`,
  },
  {
    title: "Monolith-to-microservices migration",
    category: "Service architecture",
    stack: ["Spring Boot", "Docker", "REST"],
    scope:
      "Extracting services from an existing monolith while preserving feature parity.",
    contribution:
      "Led the migration, defined service boundaries, and extracted capabilities into services. Built and deployed features in a Dockerized microservices architecture.",
    result:
      "Preserved existing functionality while separating capabilities into focused services.",
  },
];

export const primarySkillGroups = [
  {
    title: "Backend & streaming",
    skills: ["Java", "Spring Boot", "Apache Kafka", "REST APIs", "WebSockets"],
  },
  {
    title: "Data & delivery",
    skills: ["SQL", "PostgreSQL", "Spring Data JPA", "Docker", "Git", "CI/CD"],
  },
  { title: "Frontend", skills: ["JavaScript", "Vue.js", "React", "Cesium"] },
];

// 5. Skill Groups
export const skillGroups = [
  {
    title: "Core",
    skills: [
      "Microservices",
      "REST APIs",
      "WebSockets",
      "Distributed Systems",
      "Full-Stack Web Development",
      "SPA Applications",
      "SQL Databases",
      "Event-Driven Architecture",
      "Concurrent Processing",
      "Performance Optimization",
    ],
  },
  {
    title: "Languages",
    skills: ["Java", "Scala", "Python", "JavaScript", "SQL", "Bash"],
  },
  {
    title: "Frontend",
    skills: [
      "Vue.js",
      "React",
      "HTML",
      "CSS",
      "Vue Router",
      "React Router",
      "Vuetify",
      "PrimeVue",
      "ESLint",
    ],
  },
  {
    title: "Backend",
    skills: [
      "Spring Boot",
      "Spring Data JPA",
      "Apache Kafka",
      "Protocol Buffers",
    ],
  },
  {
    title: "Database",
    skills: ["PostgreSQL", "SQLite", "RocksDB"],
  },
  {
    title: "DevOps / Tools",
    skills: [
      "Docker",
      "Maven",
      "Nginx",
      "Git",
      "Postman",
      "Playwright",
      "CI/CD",
      "YAML Pipeline",
    ],
  },
  {
    title: "AI-Assisted Development",
    skills: [
      "Local LLMs via Continue.dev",
      "GPT Codex",
      "GitHub Copilot",
      "Cline",
    ],
  },
];

// 6. Education History
export const education = [
  {
    school: "Old Dominion University",
    detail: "Bachelor of Science in Computer Science",
    date: "December 2020",
    location: "Norfolk, VA",
  },
  {
    school: "Tidewater Community College",
    detail: "Associate of Science in Computer Science",
    date: "May 2018",
    location: "Norfolk, VA",
  },
];

export const hobbies = [
  {
    name: "Travel",
    note: "New places, good food, different perspectives.",
    image: "/hobby-travel.png",
  },
  {
    name: "Cars",
    note: "Design, engineering, and the joy of the drive.",
    image: "/hobby-cars.png",
  },
  {
    name: "Photography",
    note: "Finding the frame in everyday moments.",
    image: "/hobby-photography.png",
  },
  {
    name: "Fitness",
    note: "Consistency, challenge, and a clear head.",
    image: "/hobby-fitness.png",
  },
  {
    name: "Technology",
    note: "Always curious about what comes next.",
    image: "/hobby-technology.png",
  },
];
