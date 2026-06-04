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
];

// 2. Achievements/Metrics
export const metrics = [
  { value: "50K+", label: "line enterprise codebase" },
  { value: "20x", label: "simulation entity scale-up" },
  { value: "75%", label: "CPU utilization reduction" },
  { value: "200%", label: "endpoint latency improvement" },
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
  "Built and iterated R&D prototypes for a cloud-based simulation platform, integrating Kafka data pipelines, Java Spring services, WebSocket messaging, and Vue/Cesium visualization.",
  "Refactored frontend and Spring backend modules in a 50,000+ line codebase, reducing complexity and improving application performance.",
  "Designed RESTful APIs with Spring Boot and integrated them with Vue/React frontend components and external services.",
  "Led a monolith-to-microservices migration by defining service boundaries and extracting services while maintaining feature parity.",
  "Built and deployed features in a Dockerized microservices architecture, improving modularity and scalability across multiple services.",
  "Remediated security vulnerabilities by upgrading application dependencies and resolving CVE findings while maintaining build stability and compatibility.",
  "Migrated the persistence layer to Spring Data JPA/Hibernate, reducing query complexity, improving endpoint latency by 200%, and cutting database load through batching and caching.",
  "Supported four live customer-facing product demonstrations by troubleshooting real-time technical issues and translating platform capabilities into clear technical value.",
  "Built distributed data pipelines and real-time streaming services for a cloud-based Monte Carlo simulation platform, scaling concurrent entity support from about 100 to about 2,000.",
  "Improved scalability of a Java Spring Kafka/WebSocket backend for a Vue.js/Cesium real-time mapping application, reducing CPU utilization from about 100% to about 25%.",
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
      "Data Structures & Algorithms",
      "OOP",
      "Full-Stack Web Development",
      "SPA Applications",
      "SQL Databases",
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
    title: "Backend & Data",
    skills: [
      "Spring Boot",
      "Spring Data JPA",
      "Apache Kafka",
      "Protocol Buffers",
      "PostgreSQL",
      "SQLite",
      "Kafka Streams API",
      "RocksDB",
    ],
  },
  {
    title: "DevOps & AI",
    skills: [
      "Docker",
      "Maven",
      "Nginx",
      "Git",
      "Postman",
      "Playwright",
      "CI/CD",
      "YAML Pipeline",
      "Continue.dev",
      "GPT Codex",
      "GitHub Copilot",
      "CLine",
    ],
  },
  {
    title: "Platforms",
    skills: ["Linux", "RHEL", "Ubuntu", "WSL", "Windows"],
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
