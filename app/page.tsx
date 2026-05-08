"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const contact = [
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

const metrics = [
  { value: "50K+", label: "line enterprise codebase" },
  { value: "20x", label: "simulation entity scale-up" },
  { value: "75%", label: "CPU utilization reduction" },
  { value: "4", label: "live product demo events" },
];

const highlights = [
  "Java and Spring Boot backend engineering",
  "React and Vue full-stack feature delivery",
  "Microservices, Kafka, WebSockets, and distributed data pipelines",
  "Performance tuning across database, API, and realtime map workloads",
];

const experienceBullets = [
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

const skillGroups = [
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

const education = [
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

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;

export default function Home() {
  return (
    <main className="resume-shell min-h-screen overflow-hidden">
      <header className="sticky top-0 z-50 border-b bg-background/88 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" className="text-sm font-bold tracking-normal">
            Christopher Diasanta
          </a>
          <div className="hidden items-center gap-5 text-sm font-medium text-muted-foreground md:flex">
            <a className="transition hover:text-foreground" href="#experience">
              Experience
            </a>
            <a className="transition hover:text-foreground" href="#skills">
              Skills
            </a>
            <a className="transition hover:text-foreground" href="#education">
              Education
            </a>
          </div>
          <Button asChild size="sm">
            <a href={assetPath("/Diasanta_Resume.pdf")} target="_blank" rel="noreferrer">
              <Download />
              Resume
            </a>
          </Button>
        </nav>
      </header>

      <section id="top" className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-20">
        <motion.div
          className="flex flex-col justify-center"
          initial="initial"
          animate="animate"
          transition={{ staggerChildren: 0.08 }}
        >
          <motion.div variants={fadeUp} className="mb-5 flex flex-wrap items-center gap-3">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
              <ShieldCheck className="mr-1 size-3.5" />
              Active Secret Clearance
            </Badge>
            <Badge variant="secondary">
              <Sparkles className="mr-1 size-3.5" />
              Software Engineer
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="max-w-4xl text-balance text-5xl font-black leading-[0.96] tracking-normal text-foreground sm:text-6xl lg:text-7xl"
          >
            Christopher Diasanta
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl"
          >
            Full-stack software engineer building Java/Spring services, React and Vue interfaces,
            microservices, realtime streaming systems, and performance-critical data workflows.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="mailto:chrisdiasanta@gmail.com">
                <Mail />
                Contact
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#experience">
                <BriefcaseBusiness />
                View Experience
              </a>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-9 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3"
          >
            {contact.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex min-h-12 items-center gap-3 rounded-lg border bg-card/70 px-3 transition hover:border-primary/40 hover:text-foreground"
              >
                <item.icon className="size-4 text-primary" />
                <span className="truncate">{item.value}</span>
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, scale: 0.97, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative mx-auto flex w-full max-w-[480px] items-center lg:mr-0"
        >
          <div className="absolute inset-x-10 top-10 h-72 rounded-[32px] bg-primary/12 blur-3xl" />
          <div className="relative w-full overflow-hidden rounded-lg border bg-card p-6 shadow-soft-border">
            <div className="mx-auto flex aspect-square w-full max-w-[300px] items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-[radial-gradient(circle_at_35%_25%,#f7b267_0%,#2a9d8f_38%,#183642_100%)] p-3 shadow-inner">
              <div className="relative size-full overflow-hidden rounded-full border border-white/30 bg-background">
                <Image
                  src={assetPath("/profile-picture.png")}
                  alt="Christopher Diasanta profile picture"
                  fill
                  priority
                  sizes="(max-width: 640px) 260px, 300px"
                  className="object-cover object-[50%_28%]"
                />
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border bg-background p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                  Clearance
                </p>
                <p className="mt-2 font-semibold">Active Secret</p>
              </div>
              <div className="rounded-md border bg-background p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                  Based In
                </p>
                <p className="mt-2 font-semibold">Norfolk, VA</p>
              </div>
            </div>
          </div>
        </motion.aside>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-3 rounded-lg border bg-card/80 p-3 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              className="min-h-28 rounded-md bg-background p-5"
            >
              <p className="text-3xl font-black text-primary">{metric.value}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.65fr_1.35fr] lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Profile</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal">Engineering Focus</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {highlights.map((highlight) => (
            <motion.div
              key={highlight}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              className="rounded-lg border bg-card p-5 shadow-sm"
            >
              <p className="leading-7 text-muted-foreground">{highlight}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Separator className="mx-auto max-w-7xl" />

      <section id="experience" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Experience</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal">Mission Technologies, HII</h2>
          </div>
          <div className="text-sm font-medium text-muted-foreground md:text-right">
            <p>Software Engineer</p>
            <p>Norfolk, VA | September 2021 to Present</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {experienceBullets.map((bullet, index) => (
            <motion.div
              key={bullet}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: Math.min(index * 0.03, 0.18) }}
            >
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <CardDescription>Impact {String(index + 1).padStart(2, "0")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="leading-7 text-muted-foreground">{bullet}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="skills" className="border-y bg-card/55">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Skills</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal">Technical Stack</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-5">
            {skillGroups.map((group) => (
              <Card key={group.title} className="bg-background/80">
                <CardHeader>
                  <CardTitle>{group.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-secondary/70">
                      {skill}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.55fr_1.45fr] lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Education</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal">Computer Science</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {education.map((item) => (
            <Card key={item.school}>
              <CardHeader>
                <GraduationCap className="mb-3 size-8 text-primary" />
                <CardTitle>{item.school}</CardTitle>
                <CardDescription>{item.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">{item.detail}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t bg-foreground text-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="font-bold">Christopher Diasanta</p>
            <p className="mt-1 text-sm text-background/70">Software Engineer | Norfolk, VA</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <a href="mailto:chrisdiasanta@gmail.com">
                <Mail />
                Email
              </a>
            </Button>
            <Button asChild variant="secondary">
              <a href={assetPath("/Diasanta_Resume.pdf")} target="_blank" rel="noreferrer">
                <Download />
                PDF
              </a>
            </Button>
          </div>
        </div>
      </footer>
    </main>
  );
}
