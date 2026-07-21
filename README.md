# Paesani MBX Site

This repository contains the MBX website, built as a Vite + React single-page app. Most page content lives in JSON files under `content/`, so routine site updates can usually be made without editing React components.

## Content Files

All editable page data lives in `content/`:

- `content/home.json`
  - `subheading`: home page subtitle.
  - `info_title`: heading for the home page information section.
  - `info`: Markdown text. Use `\n\n` for paragraph breaks.

- `content/publications.json`
  - `items`: publication objects with `title`, `authors`, `date`, `citation`, `link`, `description`, and `img_src`.
  - Publication images are stored in `public/publications/`.
  - Set `img_src` to a filename such as `pub202.png`; set it to `""` to show no image.

- `content/faq.json`
  - `items`: FAQ objects with `question` and `answer`.
  - Answers are rendered as Markdown.

- `content/about.json`
  - `current`: current contributors.
  - `former`: former contributors.
  - Contributor images are stored in `public/people/`.
  - Set `image` to a filename such as `fpaesani.png`; omit it or set it to `""` to show no photo.

- `content/updates.json`
  - `updates`: release objects with `version`, `date`, `releaseNotes`, and `changelog`.
  - The updates pages, updates sidebar, and download page all read from this file.
  - The download page defaults release notes and source ZIP links to the matching MBX GitHub release tag.

- `content/tutorials.json`
  - `introduction`: main tutorials page content with `heading` and `markdown_text`.
  - `tutorials`: tutorial page objects with `heading`, `markdown_text`, and optional `path`.
  - If `path` is omitted, the route is generated from the lower-case heading with spaces replaced by hyphens.

## Static Assets

Vite serves files in `public/` from the site root.

- Site assets such as the logo live directly under `public/`.
- Contributor photos live under `public/people/`.
- Publication figures live under `public/publications/`.
- Do not include `public/` in JSON image paths.

Examples:

```json
{
    "image": "fpaesani.png"
}
```

```json
{
    "img_src": "pub202.png"
}
```

## Getting Started

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
