import assert from "node:assert/strict";
import test from "node:test";
import { chromium } from "playwright";

const siteUrl = process.env.TEST_SITE_URL || "http://localhost:3000";

test("mobile menu navigates after closing and moves keyboard focus to the selected section", async () => {
  const browser = await chromium.launch({
    executablePath:
      process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
  });
  try {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      reducedMotion: "reduce",
    });
    await page.goto(siteUrl);
    for (const [name, id] of [
      ["Experience", "experience"],
      ["Selected work", "work"],
      ["Skills", "skills"],
      ["Education", "education"],
      ["Contact", "contact"],
      ["Overview", "top"],
    ]) {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await page.getByRole("menuitem", { name, exact: true }).click();
      await page.waitForFunction((sectionId) => {
        const target = document.getElementById(sectionId);
        if (!target) return false;
        const { top, bottom } = target.getBoundingClientRect();
        return (
          document.activeElement === target && top < innerHeight && bottom > 72
        );
      }, id);
      assert.equal(new URL(page.url()).hash, `#${id}`);
      assert.equal(
        await page
          .getByRole("button", { name: "Open navigation" })
          .getAttribute("aria-expanded"),
        "false",
      );
    }
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      true,
    );
    await page.getByRole("button", { name: "Open navigation" }).focus();
    await page.keyboard.press("Enter");
    await page
      .getByRole("menuitem", { name: "Experience", exact: true })
      .focus();
    await page.keyboard.press("Enter");
    await page.waitForFunction(
      () => document.activeElement?.id === "experience" && scrollY > 0,
    );
  } finally {
    await browser.close();
  }
});

test("suggested resume searches execute in one click and show grounded results", async () => {
  const browser = await chromium.launch({
    executablePath:
      process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
  });
  try {
    const page = await browser.newPage();
    await page.goto(siteUrl);
    await page.locator("#chat summary").click();
    await page
      .getByRole("button", {
        name: "How has Chris improved performance?",
        exact: true,
      })
      .click();
    await page
      .getByRole("log")
      .getByText("Related résumé excerpts:", { exact: true })
      .waitFor();
    assert.match(
      await page.getByRole("log").innerText(),
      /about 100% to about 25%/,
    );
    await page
      .getByRole("button", { name: "Clear searches", exact: true })
      .click();
    assert.equal(await page.getByRole("log").innerText(), "");
  } finally {
    await browser.close();
  }
});
