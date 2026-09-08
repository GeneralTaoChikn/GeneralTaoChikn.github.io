import {
  contact,
  hobbies,
  education,
  experienceBullets,
  profile,
  skillGroups,
} from "./resumeData";
import {
  MAX_QUESTION_LENGTH,
  type ResumeSource,
} from "./resume-chat-types";

// Build the knowledge from the same data displayed on the portfolio.
const sources: ResumeSource[] = [
  {
    title: "Profile",
    href: "#top",
    text: `${profile.name} is a ${profile.role} at ${profile.company}. Based in ${profile.location}. ${profile.clearance}. ${profile.opportunities}.`,
  },
  {
    title: "Career history",
    href: "#experience",
    text: `${profile.company}. ${profile.history}`,
  },
  ...experienceBullets.map((item) => ({
    title: item.title,
    href: "#experience",
    text: item.description,
  })),
  ...skillGroups.map((group) => ({
    title: `${group.title} skills`,
    href: "#skills",
    text: `${group.title}: ${group.skills.join(", ")}.`,
  })),
  ...education.map((item) => ({
    title: "Education",
    href: "#education",
    text: `${item.school}: ${item.detail}, ${item.date}, ${item.location}.`,
  })),
  {
    title: "Contact",
    href: "#contact",
    text: contact
      .map((item) => `${item.label}: ${item.value} (${item.href})`)
      .join(". "),
  },
  {
    title: "Interests",
    href: "#hobbies",
    text: `Chris’s interests include ${hobbies.map((hobby) => hobby.name.toLowerCase()).join(", ")}.`,
  },
  {
    title: "About this site",
    href: "#chat",
    text: "This résumé portfolio uses Next.js, TypeScript, Radix Themes, Tailwind CSS, and Lucide icons. The résumé search matches questions to existing portfolio excerpts locally in the browser without downloading an AI model. The résumé PDF can be downloaded using the Download résumé button.",
  },
];
const stopWords = new Set(
  "a an the is are was were do does did has have his he him chris christopher diasanta s i me you your about what which how tell can could would please and or to of in for with it that this more".split(
    " ",
  ),
);
const aliases: Record<string, string[]> = {
  work: ["career", "services"],
  experience: ["career", "platform"],
  background: ["career", "education"],
  skills: ["languages", "backend", "frontend"],
  technologies: ["skills"],
  tech: ["skills"],
  stack: ["skills"],
  study: ["education"],
  studied: ["education"],
  college: ["education"],
  degree: ["education"],
  university: ["education"],
  school: ["education"],
  graduated: ["education"],
  graduation: ["education"],
  performance: ["cpu", "scaling", "optimization"],
  impact: ["cpu", "scaling"],
  achievements: ["cpu", "scaling"],
  hobbies: ["interests"],
  hobby: ["interests"],
  interests: ["interests"],
  email: ["contact"],
  phone: ["contact"],
  reach: ["contact"],
  linkedin: ["contact"],
  located: ["based"],
  location: ["based"],
  live: ["based"],
  clearance: ["secret"],
  opportunities: ["roles"],
  jobs: ["roles"],
  resume: ["résumé"],
  website: ["site"],
};
const words = (text: string) =>
  text
    .toLowerCase()
    .match(/[\p{L}\p{N}+#]+(?:\.[\p{L}\p{N}+#]+)*/gu)
    ?.filter((word) => !stopWords.has(word)) || [];

export function retrieveSources(
  question: string,
  previousQuestion = "",
): ResumeSource[] {
  question = question.trim().slice(0, MAX_QUESTION_LENGTH);
  previousQuestion = previousQuestion.slice(0, MAX_QUESTION_LENGTH);
  const isFollowUp =
    /\b(that|those|it|more|they)\b/i.test(question) &&
    words(question).length < 5;
  const terms = new Set(
    words(`${question} ${isFollowUp ? previousQuestion : ""}`),
  );
  if (/who\s+is\s+(chris|christopher)/i.test(question)) terms.add("profile");
  for (const term of [...terms])
    for (const alias of aliases[term] || []) terms.add(alias);
  if (
    !terms.size &&
    /\b(chris|christopher|background|yourself)\b/i.test(question)
  )
    terms.add("profile");
  return sources
    .map((source) => {
      const title = new Set(words(source.title));
      const content = new Set(words(source.text));
      const score = [...terms].reduce(
        (total, term) =>
          total + (title.has(term) ? 4 : 0) + (content.has(term) ? 1 : 0),
        0,
      );
      return { source, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.source);
}
