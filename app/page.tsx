"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Braces,
  Cloud,
  Code2,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Moon,
  Phone,
  ServerCog,
  ShieldCheck,
  Sun,
  Workflow,
} from "lucide-react";
import { education, experienceBullets, skillGroups } from "@/lib/resumeData";

const assetPath = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
type Theme = "light" | "dark";
const achievements = [
  {
    value: "100×",
    label: "simulation scale",
    note: "~100 → ~10,000 concurrent entities",
  },
  {
    value: "75%",
    label: "less CPU usage",
    note: "real-time Kafka/WebSocket backend",
  },
  {
    value: "4",
    label: "live product demos",
    note: "customer-facing technical support",
  },
];
const capabilities = [
  { icon: ServerCog, text: "Java & Spring services built for production" },
  { icon: Workflow, text: "Kafka pipelines and distributed systems" },
  { icon: Code2, text: "Vue and React interface fluency" },
  { icon: Cloud, text: "Dockerized microservice delivery" },
  { icon: ShieldCheck, text: "Active Secret clearance" },
  { icon: MapPin, text: "Based in Virginia Beach, VA" },
];
const projects = [
  {
    index: "01",
    title: "Cloud Simulation Platform",
    stack: "Java, Spring, Kafka, WebSockets, Vue, Cesium",
    summary:
      "A real-time simulation environment connecting distributed data pipelines to an interactive geospatial interface.",
    metric: "100×",
    metricLabel: "entity scale",
  },
  {
    index: "02",
    title: "Service Architecture Migration",
    stack: "Spring Boot, Docker, REST, PostgreSQL",
    summary:
      "A measured extraction of monolith capabilities into focused, deployable services without losing feature parity.",
    metric: "REST",
    metricLabel: "service boundaries",
  },
];
const hobbies = [
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

export default function Home() {
  const [theme, setTheme] = useState<Theme>("light");
  useEffect(
    () =>
      setTheme(
        document.documentElement.classList.contains("dark") ? "dark" : "light",
      ),
    [],
  );
  const toggleTheme = () =>
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      localStorage.setItem("theme", next);
      return next;
    });
  return (
    <main id="top" className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <a href="#top" className="identity" aria-label="Back to top">
            <strong>Christopher Diasanta</strong>
            <span>Full-Stack Software Engineer</span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#top" className="active">
              Overview
            </a>
            <a href="#experience">Experience</a>
            <a href="#work">Selected work</a>
            <a href="#skills">Technical range</a>
            <a href="#hobbies">Hobbies</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="header-actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </button>
            <a
              className="resume-link"
              href={assetPath("/Diasanta_Resume.pdf")}
              target="_blank"
              rel="noreferrer"
            >
              <ArrowDownToLine />
              <span>Download résumé</span>
            </a>
          </div>
        </div>
      </header>
      <div className="page-wrap">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              Software engineer · Active Secret clearance
            </p>
            <h1 id="hero-title">
              Full-stack software engineer
              <br />
              <span>Building scalable systems.</span>
            </h1>
            <p className="hero-intro">
              I develop scalable Java and Spring applications with a focus on
              backend services, distributed data processing, system performance, 
              and real-time communication.
            </p>
            <p className="location">
              <MapPin /> Virginia Beach, VA <i /> Open to backend, platform, and software engineering roles
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#work">
                View selected work <ArrowUpRight />
              </a>
              <a className="text-action" href="mailto:chrisdiasanta@gmail.com">
                Email Chris <ArrowUpRight />
              </a>
            </div>
          </div>
          <div className="portrait-wrap">
            <div className="portrait-frame">
              <Image
                src={assetPath("/profile-picture.png")}
                alt="Christopher Diasanta"
                fill
                priority
                sizes="(max-width:760px) 210px, 280px"
              />
            </div>
            <span>PROFILE / 2026</span>
          </div>
        </section>
        <section id="experience" className="section-grid">
          <div className="main-column">
            <div className="section-heading">
              <b>01</b>
              <h2>Experience</h2>
              <span />
            </div>
            <article className="experience-row">
              <div className="date">
                <i />
                2021—Now
              </div>
              <div className="experience-copy">
                <h3>
                  Software Engineer II{" "}
                  <span>· Mission Technologies, a division of HII</span>
                </h3>
                <p className="role-history">
                  <strong>Software Engineer II</strong> · Apr 2025—Present
                  <br />
                  <strong>Software Engineer I</strong> · Sep 2021—Apr 2025 ·
                  Remote, Virginia
                </p>
                <p>
                  Building and scaling cloud simulation products across backend
                  services, streaming infrastructure, and browser-based
                  visualization.
                </p>
                <ul>
                  {experienceBullets.map((item) => (
                    <li key={item.title}>{item.description}</li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
          <aside className="glance">
            <div className="section-heading compact">
              <h2>At a glance</h2>
              <span />
            </div>
            {capabilities.map(({ icon: Icon, text }) => (
              <div className="glance-row" key={text}>
                <Icon />
                <span>{text}</span>
              </div>
            ))}
          </aside>
        </section>
        <section id="work" className="work-section">
          <div className="section-heading">
            <b>02</b>
            <h2>Selected work</h2>
            <span />
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article className="project" key={project.title}>
                <span className="project-index">{project.index}</span>
                <div className="project-copy">
                  <h3>{project.title}</h3>
                  <p className="stack">{project.stack}</p>
                  <p>{project.summary}</p>
                </div>
                <div className="project-metric">
                  <strong>{project.metric}</strong>
                  <span>{project.metricLabel}</span>
                </div>
                <Braces className="project-icon" />
              </article>
            ))}
          </div>
        </section>
        <section id="skills" className="skills-section">
          <div className="section-heading">
            <b>03</b>
            <h2>Technical range</h2>
            <span />
          </div>
          <div className="skill-lines">
            {skillGroups.map((group) => (
              <p key={group.title}>
                <strong>{group.title}:</strong> {group.skills.join(", ")}
              </p>
            ))}
          </div>
        </section>
        <section className="bottom-grid">
          <div>
            <div className="section-heading">
              <b>04</b>
              <h2>Education</h2>
              <span />
            </div>
            {education.map((item) => (
              <article className="education" key={item.school}>
                <span>{item.date}</span>
                <div>
                  <h3>{item.school}</h3>
                  <p>
                    {item.detail} · {item.location}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="achievement-panel">
            {achievements.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
                <small>{item.note}</small>
              </div>
            ))}
          </div>
        </section>
        <section id="hobbies" className="hobbies-section">
          <div className="section-heading">
            <b>05</b>
            <h2>Beyond the screen</h2>
            <span />
          </div>
          <p className="hobbies-intro">
            The interests that keep me curious, moving, and looking at things
            from a different angle.
          </p>
          <div className="hobby-grid">
            {hobbies.map((hobby) => (
              <article className="hobby-card" key={hobby.name}>
                <div className="hobby-image">
                  <Image
                    src={assetPath(hobby.image)}
                    alt={`${hobby.name} — a personal hobby`}
                    fill
                    sizes="(max-width:700px) 100vw, (max-width:1050px) 50vw, 20vw"
                  />
                </div>
                <div className="hobby-copy">
                  <h3>{hobby.name}</h3>
                  <p>{hobby.note}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <footer id="contact">
          <div className="footer-links">
            <a href="tel:+17573398084">
              <Phone />
              Call
              <ArrowUpRight />
            </a>
            <a href="mailto:chrisdiasanta@gmail.com">
              <Mail />
              Email
              <ArrowUpRight />
            </a>
            <a
              href="https://www.linkedin.com/in/christopher-diasanta-7a210b1a9"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin />
              LinkedIn
              <ArrowUpRight />
            </a>
            <a
              href="https://chris.diasanta.com"
              target="_blank"
              rel="noreferrer"
            >
              <Globe />
              Website
              <ArrowUpRight />
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
