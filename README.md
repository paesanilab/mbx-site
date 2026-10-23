# Paesani MBX Site

This repository contains the MBX website, built as a Vite + React single-page app. Page content lives in YAML and Markdown files under `content/`, so routine site updates can usually be made without editing React components.

## Funding

MBX development is supported by the U.S. National Science Foundation through [Award No. 2311260, “Frameworks: Data-Driven Software Infrastructure for Next-Generation Molecular Simulations.”](https://www.nsf.gov/awardsearch/show-award?AWD_ID=2311260)

## Content Files

All editable page data lives in `content/`:

```text
content/
├── pages/
│   ├── home.yaml
│   ├── about.yaml
│   └── faq.yaml
├── publications/
│   └── index.yaml
├── updates/
│   └── index.yaml
└── tutorials/
    ├── index.md
    ├── compilation-and-installation.md
    ├── testing.md
    └── …other tutorials
```

### Structured content (YAML)

- `pages/home.yaml`: home page `subheading` and Markdown `info`.
- `pages/about.yaml`: `current` and `former` contributor lists. People have `name`, `role`, and optional `image`. Use an image filename from `public/people/`; omit `image` or use `""` for no photo.
- `pages/faq.yaml`: `items` with `question` and Markdown `answer`.
- `publications/index.yaml`: key publication `items`, `applications_intro`, and `applications`. Publications have `title`, `authors`, `date`, `citation`, `link`, `description`, `img_src`, and optional `relationship`. Use an image filename from `public/publications/`, or `""` for no image. Descriptions remain plain text.
- `updates/index.yaml`: an ordered `updates` list with `version`, `date`, `releaseNotes` (`type` and `description`), and `changelog`. Optional fields include `type`, `patch_notes`, `download_link`, and `showDownloadCount`. Release notes and changelog entries remain plain text. Update pages and downloads retain their existing GitHub link defaults; explicit links override those defaults.

Use spaces for YAML indentation, never tabs. Keep dates and versions quoted as strings. Use `|-` for multiline Markdown: line breaks and blank lines are preserved, and the final newline is stripped. Use `|` when a final newline is wanted. Indent every line of the block beneath its field, including Markdown lists, tables, and code fences.

```yaml
items:
    - question: How do I install MBX?
      answer: |-
          See the [installation tutorial](/tutorials/compilation-and-installation).

          1. Install the prerequisites.
          2. Compile MBX.
```

### Tutorials (Markdown)

`tutorials/index.md` contains the introduction and requires a `heading` in its YAML front matter. Each other `.md` file in that directory is a tutorial with `heading`, `path`, and `order` metadata:

```markdown
---
heading: Compilation and Installation
path: compilation-and-installation
order: 1
---

## Compilation and Installation

Write normal Markdown here, including tables, code blocks, and relative links.
```

To add a tutorial, create `<path>.md` in `content/tutorials/`. Use a unique, lowercase, hyphen-separated `path` and a unique positive integer `order`. Navigation sorts by `order`, so gaps are allowed. The `path` sets the URL (`/tutorials/<path>`); keep it unchanged when renaming a heading to preserve existing links. The introduction always appears first and is served at `/tutorials`.

The Vite content plugin validates content and bundles plain data for the site. Missing fields, incorrect types, malformed YAML, and duplicate tutorial paths or orders produce errors naming the source file and field. Content edits, additions, and deletions refresh the running development site. React components access the validated groups through `lib/content.ts`; parsers run only in the build tooling.

## Static Assets

Vite serves files in `public/` from the site root.

- Site assets such as the logo live directly under `public/`.
- Contributor photos live under `public/people/`.
- Publication figures live under `public/publications/`.
- Do not include `public/` in content image paths.

Examples:

```yaml
image: fpaesani.png
```

```yaml
img_src: pub202.png
```

## Getting Started

Node.js 24.18.0 (LTS) or newer is required.

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the local site:

```text
http://localhost:5173
```

## Scripts

- `npm run dev`: start the Vite development server.
- `npm run build`: type-check and build the production site into `dist/`.
- `npm run serve`: preview the production build locally.
- `npm run lint`: run the TypeScript type check.
- `npm run format`: format the repository with Prettier.
- `npm run test`: run Playwright tests.
- `npm run test:e2e`: run Playwright tests.
- `npm run test:content`: run content-loader validation tests.
- `npm run check-git-hooks`: verify the secret-scan git hooks.

## Code Quality

The build and lint scripts both run `tsc --noEmit`. Prettier is available through `npm run format`.

Playwright tests live under `e2e/` and `tests/e2e/`. CI installs Playwright browsers before running the test suite.

## Deployment

The site builds as a Vite single-page app and can be deployed to any static host that serves `dist/`.

The GitHub Actions workflows currently:

- run type checks, build, and Playwright tests on pushes and pull requests to `main` or `master`;
- deploy the Vite build to GitHub Pages on pushes to `main`;
- copy `dist/index.html` to `dist/404.html` so browser-routed pages work on GitHub Pages.
