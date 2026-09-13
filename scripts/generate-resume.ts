import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";
import {
  contact,
  education,
  experienceBullets,
  primarySkillGroups,
  profile,
  skillGroups,
} from "../lib/resumeData";

const escape = (text: string) =>
  text.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character]!,
  );

async function main() {
  const browser = await chromium.launch({
    executablePath:
      process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
    headless: true,
  });
  try {
    const page = await browser.newPage();
    await page.setContent(
      `<!doctype html><html lang="en"><head><meta charset="utf-8">
      <title>Christopher Diasanta — Résumé</title>
      <style>
        @page { size: Letter; margin: .48in .55in; }
        * { box-sizing: border-box; }
        body { font-family: Arial, sans-serif; font-size: 10pt; line-height: 1.35; color: #17202b; margin: 0; }
        h1 { font-size: 23pt; letter-spacing: -.5pt; margin: 0 0 3pt; }
        .role { font-size: 12pt; margin: 0 0 5pt; }
        .contact, .location { font-size: 9pt; margin: 3pt 0; }
        a { color: #17202b; text-decoration: none; }
        h2 { font-size: 10pt; text-transform: uppercase; letter-spacing: 0; border-bottom: 1px solid #a6afbd; padding-bottom: 4pt; margin: 13pt 0 7pt; }
        h3 { font-size: 10.5pt; margin: 0 0 4pt; }
        p { margin: 4pt 0; }
        .career { margin: 2pt 0; }
        ul { padding-left: 14pt; margin: 7pt 0 0; }
        li { padding-left: 2pt; margin: 0 0 5pt; break-inside: avoid; }
        .skills p { margin: 4pt 0; }
        .education p { margin: 5pt 0; }
        section, header { break-inside: avoid; }
      </style></head><body>
      <header>
        <h1>${escape(profile.name)}</h1>
        <p class="role">${escape(profile.role)} · Java, Spring Boot &amp; Kafka</p>
        <p class="location">${escape(profile.location)} · ${escape(profile.clearance)}</p>
        <p class="contact">${contact
          .filter((item) => ["Email", "Phone", "Website"].includes(item.label))
          .map(
            (item) =>
              `<a href="${escape(item.href)}">${escape(item.value)}</a>`,
          )
          .join(" · ")}</p>
        <p class="contact"><a href="${escape(contact.find((item) => item.label === "LinkedIn")!.href)}">linkedin.com/in/christopher-diasanta-7a210b1a9</a></p>
        <p>${escape(profile.opportunities)}.</p>
      </header>
      <section>
        <h2>Experience</h2>
        <h3>${escape(profile.company)} · Remote, Virginia</h3>
        <p class="career"><strong>Software Engineer II</strong> · Apr 2025–Present</p>
        <p class="career"><strong>Software Engineer I</strong> · Sep 2021–Apr 2025</p>
        <ul>${experienceBullets.map((item) => `<li>${escape(item.description)}</li>`).join("")}</ul>
      </section>
      <section class="skills">
        <h2>Technical skills</h2>
        ${primarySkillGroups.map((group) => `<p><strong>${escape(group.title)}:</strong> ${escape(group.skills.join(", "))}</p>`).join("")}
        <p><strong>Additional languages:</strong> ${escape((skillGroups.find((group) => group.title === "Languages")?.skills || []).filter((skill) => !primarySkillGroups.some((group) => group.skills.includes(skill))).join(", "))}</p>
      </section>
      <section class="education">
        <h2>Education</h2>
        ${education.map((item) => `<p><strong>${escape(item.detail)}</strong><br>${escape(item.school)} · ${escape(item.date)}</p>`).join("")}
      </section>
      </body></html>`,
      { waitUntil: "load" },
    );
    await page.evaluate(() => document.fonts.ready);
    const pdf = await page.pdf({
      format: "Letter",
      preferCSSPageSize: true,
      printBackground: true,
      tagged: true,
    });
    await mkdir("public", { recursive: true });
    await writeFile("public/Diasanta_Resume.pdf", pdf);
    console.log("Generated public/Diasanta_Resume.pdf from lib/resumeData.ts");
  } finally {
    await browser.close();
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
