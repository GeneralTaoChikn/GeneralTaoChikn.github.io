// lib/resumeData.ts

import { Globe, Linkedin, Mail, MapPin, Phone } from "lucide-react";

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

// 2. Achievements/Metrics
export const metrics = [
  { value: "100x", label: "simulation entity scale-up" },
  { value: "75%", label: "CPU utilization reduction" },
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
    title: "Simulation Platform Development",
    description: "Built and iterated R&D prototypes for a cloud-based simulation platform, integrating Kafka-based data pipelines, Java Spring services, WebSocket messaging, and Vue/Cesium visualization to validate real-time system capabilities.",
  },
  {
    title: "API Design & Integration",
    description: "Designed and implemented RESTful APIs using Spring Boot, integrating with Vue/React frontend components and external services.",
  },
  {
    title: "Microservices Migration",
    description: "Led a monolith-to-microservices migration by defining service boundaries and extracting services while maintaining feature parity.",
  },
  {
    title: "Security Remediation",
    description: "Remediated security vulnerabilities by upgrading application dependencies and resolving CVE findings, reducing security exposure while maintaining build stability and compatibility.",
  },
  {
    title: "Persistence Layer Optimization",
    description: "Migrated an application persistence layer to Spring Data JPA/Hibernate, reducing query complexity and improving endpoint performance through batching, caching, and optimized database access patterns.",
  },
  {
    title: "Customer Demonstration Support",
    description: "Supported four live customer-facing product demonstrations by troubleshooting real-time technical issues and partnering with Sales and Product Management to translate platform capabilities into clear technical value for prospective customers.",
  },
  {
    title: "Data Pipeline & Simulation Scaling",
    description: "Built distributed data pipelines and real-time streaming services for a cloud-based Monte Carlo simulation platform, scaling concurrent entity support from about 100 to about 10,000—a 100× increase—while reducing processing latency and improving simulation throughput.",
  },
  {
    title: "Real-time Mapping Performance Improvement",
    description: "Improved scalability of a Java Spring Kafka/WebSocket backend for a Vue.js/Cesium real-time mapping application by optimizing concurrent message processing, reducing CPU utilization from about 100% to about 25% and lowering infrastructure resource demand.",
  },
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
    skills: ["Local LLMs via Continue.dev", "GPT Codex", "GitHub Copilot", "Cline"],
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
