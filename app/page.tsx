"use client";

import Image from "next/image";
import ResumeChat from "@/components/resume-chat/resume-chat";
import { useEffect, useRef, useState } from "react";
import {
  Badge,
  Button,
  Card,
  DropdownMenu,
  IconButton,
} from "@radix-ui/themes";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Check,
  ChevronDown,
  Cloud,
  Code2,
  Database,
  GraduationCap,
  Layers3,
  Mail,
  Linkedin,
  MapPin,
  Menu,
  Moon,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Sun,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import {
  contact,
  education,
  experienceBullets,
  skillGroups,
  profile,
  hobbies,
  careerImpact,
  selectedWork,
  primarySkillGroups,
} from "@/lib/resumeData";

const assetPath = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
const navigation = [
  { id: "top", label: "Overview" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Selected work" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
const achievements = [
  {
    value: careerImpact.simulation.value,
    label: "simulation scale",
    note: `${careerImpact.simulation.before} to ${careerImpact.simulation.after} concurrent entities`,
    icon: Layers3,
  },
  {
    value: careerImpact.cpu.value,
    label: "less CPU usage",
    note: `${careerImpact.cpu.before} to ${careerImpact.cpu.after} in mapping backend`,
    icon: ServerCog,
  },
];
const capabilities = [
  { icon: ServerCog, text: "Java & Spring service development" },
  { icon: Workflow, text: "Kafka & distributed systems" },
  { icon: Code2, text: "Vue & React interfaces" },
  { icon: Cloud, text: "Dockerized microservice delivery" },
];
const skillIcons: Record<string, LucideIcon> = {
  "Backend & streaming": ServerCog,
  "Data & delivery": Database,
  Core: Layers3,
  Languages: Code2,
  Frontend: Code2,
  Backend: ServerCog,
  Database,
  "DevOps / Tools": Cloud,
  "AI-Assisted Development": Sparkles,
};

function SectionHeading({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <div className="section-title">
        <span className="section-number">{number}</span>
        <h2>{title}</h2>
      </div>
      {description && <p>{description}</p>}
    </div>
  );
}

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeSection, setActiveSection] = useState("top");
  const pendingSection = useRef<string | null>(null);

  useEffect(() => {
    setTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    );
    let frame = 0;
    const updateSection = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const atBottom =
          window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 4;
        const current = [...navigation].reverse().find(({ id }) => {
          const section = document.getElementById(id);
          return section && section.getBoundingClientRect().top <= 160;
        });
        setActiveSection(atBottom ? "contact" : current?.id || "top");
      });
    };
    updateSection();
    window.addEventListener("scroll", updateSection, { passive: true });
    window.addEventListener("resize", updateSection);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateSection);
      window.removeEventListener("resize", updateSection);
    };
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* Theme still works when storage is unavailable. */
    }
  };

  return (
    <div id="top" className="site-shell" tabIndex={-1}>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <a
            href="#top"
            className="identity"
            aria-label="Christopher Diasanta — back to top"
          >
            <span className="identity-mark" aria-hidden="true">
              cd<span>.</span>
            </span>
            <span className="identity-copy">
              <strong>{profile.name}</strong>
              <span>Software Engineer</span>
            </span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={activeSection === id ? "location" : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <IconButton
              variant="ghost"
              color="gray"
              size="3"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </IconButton>
            <Button asChild variant="soft" className="header-resume">
              <a href={assetPath("/Diasanta_Resume.pdf")} download>
                <ArrowDownToLine />
                <span>Résumé</span>
              </a>
            </Button>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <IconButton
                  className="mobile-menu"
                  size="3"
                  variant="soft"
                  color="gray"
                  aria-label="Open navigation"
                >
                  <Menu />
                </IconButton>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                align="end"
                size="2"
                aria-label="Mobile navigation"
                onCloseAutoFocus={(event) => {
                  const id = pendingSection.current;
                  pendingSection.current = null;
                  if (!id) return;
                  event.preventDefault();
                  // Wait until the menu releases its scroll lock before navigation.
                  requestAnimationFrame(() => {
                    const target = document.getElementById(id);
                    target?.focus({ preventScroll: true });
                    target?.scrollIntoView({
                      behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)",
                      ).matches
                        ? "instant"
                        : "smooth",
                      block: "start",
                    });
                  });
                }}
              >
                {navigation.map(({ id, label }) => (
                  <DropdownMenu.Item
                    key={id}
                    asChild
                    onSelect={() => {
                      pendingSection.current = id;
                    }}
                  >
                    <a
                      href={`#${id}`}
                      aria-current={
                        activeSection === id ? "location" : undefined
                      }
                    >
                      {label}
                    </a>
                  </DropdownMenu.Item>
                ))}
                <DropdownMenu.Separator />
                <DropdownMenu.Item asChild>
                  <a href={assetPath("/Diasanta_Resume.pdf")} download>
                    Download résumé
                  </a>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="page-wrap">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <Badge
              size="2"
              variant="soft"
              color="green"
              className="availability"
            >
              <span className="status-dot" />
              Open to engineering opportunities
            </Badge>
            <p className="eyebrow">Christopher Diasanta</p>
            <h1 id="hero-title">
              Software Engineer II
              <br />
              <span>Java · Spring · Kafka</span>
            </h1>
            <p className="hero-intro">
              I build backend services and real-time simulation systems at HII,
              connecting Kafka data pipelines with Vue and React interfaces.
            </p>
            <div className="hero-meta">
              <span>
                <MapPin />
                {profile.location}
              </span>
              <span>
                <ShieldCheck />
                {profile.clearance}
              </span>
            </div>
            <div className="hero-actions">
              <Button size="3" asChild>
                <a href={assetPath("/Diasanta_Resume.pdf")} download>
                  <ArrowDownToLine />
                  Download résumé
                </a>
              </Button>
              <Button size="3" variant="outline" asChild>
                <a href="mailto:chrisdiasanta@gmail.com">
                  <Mail />
                  Email Chris
                  <ArrowUpRight />
                </a>
              </Button>
              <Button size="3" variant="ghost" asChild>
                <a
                  href={contact.find((item) => item.label === "LinkedIn")!.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin /> LinkedIn <ArrowUpRight />
                </a>
              </Button>
            </div>
            <a className="hero-email" href="mailto:chrisdiasanta@gmail.com">
              chrisdiasanta@gmail.com
            </a>
          </div>
          <Card className="profile-card" size="3">
            <div className="portrait-frame">
              <Image
                src={assetPath("/profile-picture.png")}
                alt={profile.name}
                fill
                priority
                sizes="(max-width: 700px) 85vw, 340px"
              />
            </div>
            <div className="profile-caption">
              <div>
                <strong>{profile.name}</strong>
                <span>Software Engineer II · HII</span>
              </div>
              <span className="profile-icon">
                <Code2 />
              </span>
            </div>
            <div className="profile-tags">
              <Badge variant="soft" color="gray">
                Backend
              </Badge>
              <Badge variant="soft" color="gray">
                Platform
              </Badge>
              <Badge variant="soft" color="gray">
                Full-stack
              </Badge>
            </div>
          </Card>
        </section>

        <section className="impact-grid" aria-label="Career impact">
          {achievements.map(({ value, label, note, icon: Icon }) => (
            <Card className="impact-card" key={label} size="3">
              <div className="impact-top">
                <strong>{value}</strong>
                <span className="icon-tile">
                  <Icon />
                </span>
              </div>
              <h2>{label}</h2>
              <p>{note}</p>
            </Card>
          ))}
        </section>

        <section id="experience" className="content-section" tabIndex={-1}>
          <SectionHeading
            number="01"
            title="Experience"
            description="Building software that performs in the real world."
          />
          <div className="experience-grid">
            <Card className="experience-card" size="4">
              <div className="job-heading">
                <span className="company-mark">HII</span>
                <div>
                  <h3>{profile.role}</h3>
                  <p>{profile.company}</p>
                </div>
                <Badge color="green" variant="soft">
                  Current
                </Badge>
              </div>
              <div className="role-history">
                <span>At HII: Sep 2021 — Present</span>
                <span>Remote · Virginia</span>
              </div>
              <p className="job-summary">
                Backend services, streaming infrastructure, and visualization
                for cloud simulation, including R&D prototypes.
              </p>
              <div className="career-path">
                <div>
                  <span className="timeline-dot" />
                  <strong>Software Engineer II</strong>
                  <span>Apr 2025 — Present</span>
                </div>
                <div>
                  <span className="timeline-dot previous" />
                  <strong>Software Engineer I</strong>
                  <span>Sep 2021 — Apr 2025</span>
                </div>
              </div>
              <ul className="experience-highlights">
                {experienceBullets.slice(0, 3).map((item) => (
                  <li key={item.title}>
                    <Check />
                    <span>{item.description}</span>
                  </li>
                ))}
              </ul>
              <details className="experience-details">
                <summary>
                  More experience
                  <ChevronDown />
                </summary>
                <ul className="experience-highlights">
                  {experienceBullets.slice(3).map((item) => (
                    <li key={item.title}>
                      <Check />
                      <span>{item.description}</span>
                    </li>
                  ))}
                </ul>
              </details>
            </Card>
            <aside
              className="experience-aside"
              aria-label="Professional overview"
            >
              <Card size="3" className="glance-card">
                <p className="eyebrow">What I bring</p>
                <h3>From service to screen.</h3>
                <p className="aside-intro">
                  Hands-on engineering across the stack, with a focus on
                  performance and reliability.
                </p>
                <div className="capabilities">
                  {capabilities.map(({ icon: Icon, text }) => (
                    <div key={text}>
                      <span className="icon-tile">
                        <Icon />
                      </span>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </Card>
              <Card size="3" className="opportunity-card">
                <ShieldCheck />
                <h3>Ready for the next challenge.</h3>
                <p>{profile.opportunities}.</p>
                <Button asChild variant="soft">
                  <a href="mailto:chrisdiasanta@gmail.com">
                    Start a conversation
                    <ArrowUpRight />
                  </a>
                </Button>
              </Card>
            </aside>
          </div>
        </section>

        <section id="work" className="content-section" tabIndex={-1}>
          <SectionHeading
            number="02"
            title="Selected work"
            description="My contributions, technical scope, and results."
          />
          <div className="project-grid">
            {selectedWork.map((project) => (
              <Card key={project.title} className="project-card" size="4">
                <div className="project-top">
                  <span className="icon-tile large">
                    <Workflow />
                  </span>
                  <Badge color="gray" variant="soft">
                    {project.category}
                  </Badge>
                </div>
                <h3>{project.title}</h3>
                <dl className="project-details">
                  <div>
                    <dt>Scope</dt>
                    <dd>{project.scope}</dd>
                  </div>
                  <div>
                    <dt>My contribution</dt>
                    <dd>{project.contribution}</dd>
                  </div>
                  <div>
                    <dt>Result</dt>
                    <dd>{project.result}</dd>
                  </div>
                </dl>
                <div className="project-stack">
                  {project.stack.map((technology) => (
                    <Badge key={technology} color="gray" variant="outline">
                      {technology}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section id="skills" className="content-section" tabIndex={-1}>
          <SectionHeading
            number="03"
            title="Technical skills"
            description="Core tools used in the work above."
          />
          <Card className="skills-card" size="3">
            {primarySkillGroups.map((group) => {
              const Icon = skillIcons[group.title] || Code2;
              return (
                <div className="skill-row" key={group.title}>
                  <h3>
                    <Icon />
                    {group.title}
                  </h3>
                  <div className="skill-badges">
                    {group.skills.map((skill) => (
                      <Badge key={skill} size="2" color="gray" variant="soft">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </Card>
          <details className="additional-skills">
            <summary>
              Additional languages, libraries & tools <ChevronDown />
            </summary>
            <div className="additional-skills-grid">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <h3>{group.title}</h3>
                  <p>
                    {group.skills
                      .filter(
                        (skill) =>
                          !primarySkillGroups.some((primary) =>
                            primary.skills.includes(skill),
                          ),
                      )
                      .join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </details>
        </section>

        <section
          id="education"
          tabIndex={-1}
          className="content-section"
          aria-label="Education"
        >
          <SectionHeading number="04" title="Education" />
          <div className="education-grid">
            {education.map((item) => (
              <Card key={item.school} size="3" className="education-card">
                <span className="icon-tile">
                  <GraduationCap />
                </span>
                <div>
                  <p className="education-date">{item.date}</p>
                  <h3>{item.school}</h3>
                  <p>{item.detail}</p>
                  <span className="education-location">{item.location}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section
          id="contact"
          tabIndex={-1}
          className="contact-section"
          aria-labelledby="contact-title"
        >
          <div>
            <p className="eyebrow">Let’s connect</p>
            <h2 id="contact-title">Let’s talk about your team.</h2>
            <p>
              {profile.opportunities}. Based in {profile.location}.
            </p>
          </div>
          <div className="contact-actions">
            <Button size="3" asChild>
              <a href="mailto:chrisdiasanta@gmail.com">
                <Mail />
                Email Chris
                <ArrowUpRight />
              </a>
            </Button>
            <span>chrisdiasanta@gmail.com</span>
          </div>
        </section>
        <section
          id="hobbies"
          className="interests-section"
          aria-labelledby="interests-title"
        >
          <h2 id="interests-title">Outside work</h2>
          <p>{hobbies.map((hobby) => hobby.name).join(" · ")}</p>
        </section>
        <ResumeChat />
      </main>
      <footer className="site-footer">
        <div>
          <a href="#top" className="footer-name">
            Christopher Diasanta<span>Software Engineer</span>
          </a>
          <nav aria-label="Contact links">
            {contact.map(({ icon: Icon, ...item }) => (
              <a
                key={item.label}
                href={item.href}
                {...(item.href.startsWith("https")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                <Icon />
                {item.label}
                <ArrowUpRight />
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
