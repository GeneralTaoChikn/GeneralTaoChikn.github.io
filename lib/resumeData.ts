
// lib/resumeData.ts

import { Mail, Phone, MapPin } from "lucide-react";

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
        label: "Location",
        value: "Norfolk, VA",
        href: "#experience",
        icon: MapPin,
    },
];

// 2. Achievements/Metrics
export const metrics = [
    { value: "50K+", label: "line enterprise codebase" },
    { value: "20x", label: "simulation entity scale-up" },
    { value: "75%", label: "CPU utilization reduction" },
    { value: "4", label: "live product demo events" },
];

// 3. Professional Highlights/Focus Areas
export const highlights = [
    "Java and Spring Boot backend engineering",
    "React and Vue full-stack feature delivery",
    "Microservices, Kafka, WebSockets, and distributed data pipelines",
    "Performance tuning across database, API, and realtime map workloads",
];

// 4. Experience Bullet Points
export const experienceBullets = [
    "Refactored frontend and Spring backend modules in a 50,000+ line codebase, reducing complexity and improving application performance.",
    "Designed RESTful APIs with Spring Boot and integrated them with Vue/React frontend components and external services.",
    "Led a monolith-to-microservices migration by defining service boundaries, extracting services, maintaining feature parity, and reducing release risk.",
    "Built and deployed features in a Dockerized microservices architecture, improving modularity and scalability across multiple services.",
    "Upgraded dependencies and remediated security findings through IntelliJ, reducing CVE exposure while preserving build stability.",
    "Migrated persistence to Spring Data JPA/Hibernate, reducing query complexity, improving endpoint latency by 200%, and cutting database load through batching and caching.",
    "Supported live product demos for four events, troubleshooting in real time with sales and product management partners.",
    "Built distributed data pipelines and streaming services for a cloud-based Monte Carlo simulation platform, scaling from about 100 to 2,000 concurrent entities.",
    "Tuned a Java Spring Kafka/WebSocket backend for a Vue/Cesium map, lowering CPU utilization from about 100% to 25%.",
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
            "Full-Stack Development",
            "SQL",
            "NoSQL",
        ],
    },
    {
        title: "Languages",
        skills: ["Java", "Scala", "Python", "TypeScript", "JavaScript", "SQL", "C#", "C++"],
    },
    {
        title: "Frameworks",
        skills: ["Spring Boot", "Spring Data JPA", "Hibernate", "Vue.js", "React", "D3.js"],
    },
    {
        title: "Data & DevOps",
        skills: ["Apache Kafka", "Protocol Buffers", "Docker", "Maven", "Nginx", "Git", "Postman", "CI/CD"],
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
