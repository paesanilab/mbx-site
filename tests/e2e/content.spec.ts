import { expect, test } from "@playwright/test";
import path from "node:path";
import { loadContent } from "../../tooling/content-loader";

const content = loadContent(path.resolve(__dirname, "../../content"));

test("home Markdown and publication sections render", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "What is MBX?" })).toBeVisible();
    await page.goto("/publications");
    await expect(page.getByRole("heading", { name: "Key MBX Publications" })).toBeVisible();
    await expect(
        page.getByRole("heading", { name: "Applications and Derivative Work" }),
    ).toBeVisible();
    await expect(page.locator("article")).toHaveCount(
        content.publications.items.length + content.publications.applications.length,
    );
    await expect(page.locator("article").first()).toContainText(
        content.publications.items[0].description,
    );
});

test("FAQ retains its Markdown table", async ({ page }) => {
    await page.goto("/faq");
    await page.getByRole("button", { name: "How fast is MBX?" }).click();
    await expect(page.getByRole("table")).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "256 waters" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "0.726", exact: true })).toBeVisible();
});

test("contributor tabs retain their people and optional images", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByText(content.about.current[0].name, { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Former Contributors" }).click();
    await expect(page.getByText(content.about.former[0].name, { exact: true })).toBeVisible();
    await expect(page.getByText(content.about.current[0].name, { exact: true })).toHaveCount(0);
});

test("tutorial introduction and sidebar preserve ordering and destinations", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/tutorials");
    const heading = content.tutorials.introduction.markdown_text
        .split("\n")[0]
        .replace(/^#+\s*/, "");
    await expect(page.getByRole("heading", { name: heading, exact: true })).toBeVisible();
    const links = page.locator('a[href^="/tutorials/"]');
    const hrefs = await links.evaluateAll((elements) =>
        elements.map((element) => element.getAttribute("href")),
    );
    expect(hrefs).toEqual(
        content.tutorials.tutorials.map((tutorial) => `/tutorials/${tutorial.path}`),
    );
    await page.getByRole("link", { name: "Compilation and Installation", exact: true }).click();
    await expect(page).toHaveURL(/\/tutorials\/compilation-and-installation$/);
    await expect(page.locator(".markdown-body pre").first()).toContainText("git clone");
});

for (const tutorial of content.tutorials.tutorials) {
    test(`tutorial URL works: ${tutorial.path}`, async ({ page }) => {
        await page.goto(`/tutorials/${tutorial.path}`);
        await expect(page.locator(".markdown-body")).toBeVisible();
        await expect(page.getByText("Tutorial not found", { exact: true })).toHaveCount(0);
        const firstLine = tutorial.markdown_text.split("\n").find((line) => line.trim());
        if (firstLine?.startsWith("#")) {
            await expect(page.locator(".markdown-body")).toContainText(
                firstLine.replace(/^#+\s*/, ""),
            );
        }
    });
}

test("mobile tutorial navigation uses the same ordered links", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: "Open navigation" }).click();
    const menu = page.getByRole("dialog");
    await menu.getByRole("button", { name: "Tutorials", exact: true }).click();
    const links = menu.locator('a[href^="/tutorials/"]');
    await expect(links).toHaveCount(content.tutorials.tutorials.length + 1);
    expect(
        await links.evaluateAll((elements) =>
            elements.map((element) => element.getAttribute("href")),
        ),
    ).toEqual([
        "/tutorials/",
        ...content.tutorials.tutorials.map((tutorial) => `/tutorials/${tutorial.path}`),
    ]);
    await menu.getByRole("link", { name: "Testing", exact: true }).click();
    await expect(page).toHaveURL(/\/tutorials\/testing$/);
    await expect(menu).toHaveCount(0);
});

test("update versions, release content, and download defaults remain available", async ({
    page,
}) => {
    await page.goto("/updates");
    for (const update of content.updates.updates) {
        const link = page.getByRole("link", {
            name: `MBX v${update.version} [${update.date}]`,
            exact: true,
        });
        await expect(link).toHaveAttribute("href", `/updates/${update.version}`);
    }
    const latest = content.updates.updates[0];
    await page.goto(`/updates/${latest.version}`);
    for (const note of latest.releaseNotes) {
        await expect(page.getByText(note.description, { exact: false })).toBeVisible();
    }
    await expect(page.getByRole("link", { name: "Full Patch Notes" })).toHaveAttribute(
        "href",
        latest.patch_notes ?? `https://github.com/paesanilab/MBX/releases/tag/v${latest.version}`,
    );
    await expect(
        page.getByRole("link", { name: `Download v${latest.version}`, exact: true }).first(),
    ).toHaveAttribute(
        "href",
        latest.download_link ??
            `https://github.com/paesanilab/MBX/archive/refs/tags/v${latest.version}.zip`,
    );
    await page.goto("/download");
    await expect(page.getByRole("heading", { name: "Version Downloads" })).toBeVisible();
    for (const width of [1440, 390]) {
        await page.setViewportSize({ width, height: 1000 });
        for (const update of content.updates.updates) {
            const expected =
                update.download_link ??
                (update.showDownloadCount === false
                    ? `https://github.com/paesanilab/MBX/archive/refs/tags/v${update.version}.tar.gz`
                    : `https://github.com/paesanilab/MBX/releases/download/v${update.version}/mbx-${update.version}.tar.gz`);
            await expect(
                page.getByRole("link", {
                    name: `Download v${update.version}${width === 1440 ? ".tgz" : ""}`,
                    exact: true,
                }),
            ).toHaveAttribute("href", expected);
        }
    }
});

test("missing tutorials and update versions retain their fallback pages", async ({ page }) => {
    await page.goto("/tutorials/does-not-exist");
    await expect(page.getByRole("heading", { name: "Tutorial not found" })).toBeVisible();
    await page.goto("/updates/does-not-exist");
    await expect(page.getByRole("heading", { name: "Update not found" })).toBeVisible();
});
