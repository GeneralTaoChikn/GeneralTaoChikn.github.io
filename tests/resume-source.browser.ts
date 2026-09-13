import assert from "node:assert/strict";
import test from "node:test";
import { chromium, type Page } from "playwright";

const siteUrl = process.env.TEST_SITE_URL || "http://localhost:3000";
const launch = () =>
  chromium.launch({
    executablePath:
      process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
  });

async function search(page: Page, query: string) {
  if (
    !(await page
      .locator("#chat > details")
      .evaluate((element) => (element as HTMLDetailsElement).open))
  ) {
    await page.locator("#chat summary").click();
  }
  await page
    .getByRole("textbox", { name: "Search by skill, experience, or education" })
    .fill(query);
  await page
    .getByRole("textbox", { name: "Search by skill, experience, or education" })
    .press("Enter");
  await answerIsVisible(page);
}

async function answerIsVisible(page: Page) {
  await page.waitForFunction(() => {
    const answer = [
      ...document.querySelectorAll<HTMLElement>(".chat-message-assistant"),
    ].at(-1);
    const header = document
      .querySelector(".site-header")!
      .getBoundingClientRect();
    const firstText = answer?.querySelector("p")?.getBoundingClientRect();
    return (
      answer &&
      firstText &&
      document.activeElement === answer &&
      firstText.top >= header.bottom &&
      firstText.bottom <= innerHeight
    );
  });
}

test("source links reveal exact experience and skill items, including direct URLs", async () => {
  const browser = await launch();
  try {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      reducedMotion: "no-preference",
    });
    await page.goto(siteUrl);
    for (const [query, title, targetId, disclosure] of [
      [
        "CVE",
        "Security Remediation",
        "resume-experience-security-remediation",
        ".experience-details",
      ],
      [
        "Python",
        "Languages skills",
        "resume-skills-languages",
        ".additional-skills",
      ],
    ]) {
      await search(page, query);
      const link = page
        .getByRole("log")
        .getByRole("link", { name: title, exact: true })
        .last();
      assert.equal(await link.getAttribute("href"), `#${targetId}`);
      await link.click();
      await page.waitForFunction((id) => {
        const target = document.getElementById(id)!;
        return (
          document.activeElement === target &&
          target.checkVisibility() &&
          target.getBoundingClientRect().top >=
            document.querySelector(".site-header")!.getBoundingClientRect()
              .bottom &&
          target.getBoundingClientRect().top < innerHeight
        );
      }, targetId);
      assert.equal(
        await page
          .locator(disclosure)
          .evaluate((element) => (element as HTMLDetailsElement).open),
        true,
      );
      assert.match(
        await page.locator(`#${targetId}`).innerText(),
        new RegExp(query),
      );
      // Opening a copied result URL must reveal a closed disclosure after hydration.
      const directPage = await browser.newPage({
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      });
      await directPage.goto(`${siteUrl}/#${targetId}`);
      await directPage.waitForFunction(
        (id) =>
          document.activeElement?.id === id &&
          document.getElementById(id)!.checkVisibility(),
        targetId,
      );
      assert.equal(
        await directPage
          .locator(disclosure)
          .evaluate((element) => (element as HTMLDetailsElement).open),
        true,
      );
      await directPage.close();
    }
  } finally {
    await browser.close();
  }
});

for (const width of [390, 1440]) {
  test(`new answers start in view at ${width}px, including subsequent searches and no matches`, async () => {
    const browser = await launch();
    try {
      const page = await browser.newPage({
        viewport: { width, height: 844 },
        isMobile: width === 390,
        hasTouch: width === 390,
      });
      await page.goto(siteUrl);
      await page.locator("#chat summary").click();
      await page
        .getByRole("button", {
          name: "How has Chris improved performance?",
          exact: true,
        })
        .click();
      await answerIsVisible(page);
      await search(page, "CVE");
      await search(page, "What is the weather forecast?");
      assert.equal(await page.locator(".chat-message-assistant").count(), 3);
      assert.match(
        await page.locator(".chat-message-assistant").last().innerText(),
        /couldn’t find/,
      );
      if (width === 390) {
        assert.equal(
          await page
            .getByRole("log")
            .evaluate((element) => getComputedStyle(element).overflowY),
          "visible",
        );
        assert.equal(
          await page
            .getByRole("log")
            .evaluate(
              (element) => element.scrollHeight - element.clientHeight <= 1,
            ),
          true,
        );
      }
      await page
        .getByRole("button", { name: "Clear searches", exact: true })
        .click();
      assert.equal(await page.getByRole("log").innerText(), "");
      assert.equal(
        await page
          .getByRole("textbox")
          .evaluate((element) => document.activeElement === element),
        true,
      );
    } finally {
      await browser.close();
    }
  });
}
