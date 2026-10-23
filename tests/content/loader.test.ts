import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { test, type TestContext } from "node:test";
import { fileURLToPath } from "node:url";
import { stringify } from "yaml";
import { loadContent } from "../../tooling/content-loader.ts";

const contentRoot = fileURLToPath(new URL("../../content", import.meta.url));

function fixture(t: TestContext) {
    const root = mkdtempSync(path.join(tmpdir(), "mbx-content-"));
    t.after(() => rmSync(root, { recursive: true, force: true }));
    for (const directory of ["pages", "publications", "updates", "tutorials"]) {
        mkdirSync(path.join(root, directory));
    }
    const files = {
        "pages/home.yaml": { subheading: "Example", info: "# What is MBX?" },
        "pages/about.yaml": {
            current: [{ name: "Current", role: "Student", image: "" }],
            former: [{ name: "Former", role: "Student" }],
        },
        "pages/faq.yaml": {
            items: [{ question: "Example", answer: "| Cores | Waters |\n| - | - |\n| 4 | 256 |" }],
        },
        "publications/index.yaml": {
            items: [],
            applications_intro: "Example",
            applications: [
                {
                    title: "Paper",
                    authors: "Author",
                    date: "2026",
                    citation: "Journal",
                    link: "https://example.com",
                    description: "Description",
                    img_src: "",
                },
            ],
        },
        "updates/index.yaml": {
            updates: [
                {
                    version: "1.4.0",
                    date: "2026-07-20",
                    releaseNotes: [],
                    changelog: [],
                    showDownloadCount: false,
                },
            ],
        },
    };
    for (const [filename, data] of Object.entries(files)) {
        writeFileSync(
            path.join(root, filename),
            stringify(data, { defaultStringType: "QUOTE_DOUBLE" }),
        );
    }
    tutorial(root, "index.md", "heading: Introduction");
    tutorial(root, "testing.md", "heading: Testing\npath: testing\norder: 2");
    writeFileSync(
        path.join(root, "tutorials/compilation-and-installation.md"),
        "---\nheading: Installation\npath: compilation-and-installation\norder: 1\n---\n```console\ngit clone https://example.com\n```\n",
    );
    return root;
}

function tutorial(root: string, filename: string, metadata: string) {
    writeFileSync(path.join(root, "tutorials", filename), `---\n${metadata}\n---\n# Example\n`);
}

test("validates all repository content", () => {
    assert.doesNotThrow(() => loadContent(contentRoot));
});

test("preserves optional values and sorts tutorials independently of filenames", (t) => {
    const content = loadContent(fixture(t));
    assert.equal(content.tutorials.tutorials.length, 2);
    assert.equal(content.tutorials.tutorials[0].path, "compilation-and-installation");
    assert.equal(content.tutorials.tutorials.at(-1)?.path, "testing");
    assert.equal(content.updates.updates[0].version, "1.4.0");
    assert.equal(content.updates.updates[0].date, "2026-07-20");
    assert.equal(content.updates.updates[0].showDownloadCount, false);
    assert.equal(content.publications.applications[0].img_src, "");
    assert.equal(Object.hasOwn(content.about.former[0], "image"), false);
    assert.equal(content.faq.items[0].answer.includes("\n| - | - |"), true);
    assert.match(content.tutorials.tutorials[0].markdown_text, /```console\ngit clone/);
});

test("preserves literal Markdown including blank lines, tables, math, code, and quotes", (t) => {
    const root = fixture(t);
    const markdown =
        '# Heading\n\n| A | B |\n| - | - |\n| 1 | 2 |\n\n```sh\necho "hello"\n```\n\n$x^2$ and [link](testing)';
    writeFileSync(
        path.join(root, "pages/home.yaml"),
        `subheading: "Example"\ninfo: |-\n${markdown
            .split("\n")
            .map((line) => `  ${line}`)
            .join("\n")}\n`,
    );
    assert.equal(loadContent(root).home.info, markdown);
});

test("discovers additions and deletions, orders by metadata, and keeps explicit paths", (t) => {
    const root = fixture(t);
    tutorial(root, "aaa-example.md", 'heading: "Different Heading"\npath: stable-path\norder: 11');
    assert.equal(loadContent(root).tutorials.tutorials.at(-1)?.path, "stable-path");
    rmSync(path.join(root, "tutorials/aaa-example.md"));
    assert.equal(loadContent(root).tutorials.tutorials.length, 2);
});

for (const [metadata, expected] of [
    ["path: new-tutorial\norder: 11", /example\.md\.heading: expected a string/],
    ["heading: Example\norder: 11", /example\.md\.path: expected a string/],
    ["heading: Example\npath: new-tutorial", /example\.md\.order: expected a positive integer/],
    ['heading: Example\npath: new-tutorial\norder: "11"', /\.order: expected a positive integer/],
    ["heading: Example\npath: new-tutorial\norder: 0", /\.order: expected a positive integer/],
    ["heading: Example\npath: Bad\/Path\norder: 11", /\.path: expected a lowercase/],
    ["heading: Example\npath: testing\norder: 11", /\.path: duplicate testing; already used by/],
    ["heading: Example\npath: new-tutorial\norder: 1", /\.order: duplicate 1; already used by/],
] as const) {
    test(`rejects invalid tutorial metadata: ${metadata.replaceAll("\n", ", ")}`, (t) => {
        const root = fixture(t);
        tutorial(root, "example.md", metadata);
        assert.throws(() => loadContent(root), expected);
    });
}

test("reports malformed YAML with its filename", (t) => {
    const root = fixture(t);
    writeFileSync(path.join(root, "pages/faq.yaml"), "items: [\n");
    assert.throws(() => loadContent(root), /pages\/faq\.yaml:/);
});

test("rejects incorrect structured field types with their field path", (t) => {
    const root = fixture(t);
    writeFileSync(
        path.join(root, "pages/faq.yaml"),
        "items:\n  - question: Example\n    answer: 123\n",
    );
    assert.throws(() => loadContent(root), /faq\.yaml: \$\.items\[0\]\.answer: expected a string/);
});

test("rejects tutorial files without complete front matter", (t) => {
    const root = fixture(t);
    writeFileSync(path.join(root, "tutorials/example.md"), "---\nheading: Missing delimiter\n");
    assert.throws(() => loadContent(root), /example\.md: front matter: expected/);
});

test("rejects malformed front matter with the tutorial filename", (t) => {
    const root = fixture(t);
    tutorial(root, "example.md", "heading: [");
    assert.throws(() => loadContent(root), /example\.md:/);
});

test("requires string version values and boolean download flags", (t) => {
    const root = fixture(t);
    const file = path.join(root, "updates/index.yaml");
    const source = readFileSync(file, "utf8");
    writeFileSync(file, source.replace('"1.4.0"', "1.4"));
    assert.throws(() => loadContent(root), /\.version: expected a string/);
    writeFileSync(file, source.replace(/(showDownloadCount"?: )false/, '$1"false"'));
    assert.throws(() => loadContent(root), /\.showDownloadCount: expected a boolean/);
});
