# Paesani MBX Site

This README explains how to use the `content.json` file to edit the site’s pages, where to place images and downloadable files, and how to update content without modifying component code directly.

---

## 1. Overview of `content/content.json`

All page content lives in **`content/`** as various JSON files. Each JSON file corresponds to a section of the site:

- **`home`**  
  Contains:
    - `subheading` (string)
    - `info_title` (string)
    - `info` (string with `\n\n` for line breaks)

- **`publications`**
    - `items`: an array of publication objects
        ```json
        {
            "title": "...",
            "author": "...",
            "date": "...",
            "citation": "...",
            "link": "...",
            "description": "...",
            "img_src": "/images/your_image.png"
        }
        ```
    - If `img_src` is a non‐empty string, the Publications page will render an `<Image>` from `/public/images/`. If empty, no image is shown.

- **`faq`**
    - `items`: an array of `{ question: string, answer: string }`. Line breaks in `answer` can be represented by `\n\n`.

- **`about`**
    - `current`: array of people currently in the group
    - `former`: array of former people  
      Each person object:

    ```json
    {
        "name": "Full Name",
        "role": "Title/Role",
        "image": "/filename.png"
    }
    ```

    - If `"image"` is empty (`""`), that card will render without a photo.

- **`updates`**
    - Array of update objects
        ```json
        {
            "version": "x.x.0",
            "date": "2025-01-30",
            "releaseNotes": [
                { "type": "Security update", "description": "Lorem ipsum…" },
                { "type": "Patch", "description": "Details…" }
            ],
            "changelog": ["Feature A: …", "Feature B: …"]
        }
        ```
    - The sidebar and index page automatically read from this array. To add, remove, or reorder update links, edit **`content.updates`**.

- **`tutorials`**
    - Keys: `introduction`, `tutorials`
    - `introduction`: single tutorial object
    - `tutorials`: array of tutorial objects
        ```json
        {
            "heading": "Tutorial Title",
            "markdown_text": "Markdown content for the tutorial"
        }
        ```

---

## 2. Where to Place Static Assets

### 2.1 Images

- Save all image files under **`public/`**.
    - Example path: `public/images/francesco.png`
    - In `content.json`, refer to `/images/francesco.png`.

- The React components use Next.js’ built‐in `<Image>` component (which looks in `public/` automatically).
    - If `content.about.current[i].image === "test.png"`, the `<Image>` will resolve to `public/test.png`.
    - Do not include `public` in the JSON path—omit it. Always start with `/...`.

### 2.2 Downloadable Files

- Save files under **`public/downloads/`**.
    - Example: if you place `MBX_v1.2.zip` in `public/downloads/MBX_v1.2.zip`, then in `content.download.versions` set `"link": "/downloads/MBX_v1.2.zip"`.
    - Next.js serves everything in `public/` at root, so the download button’s `href="/downloads/MBX_v1.2.zip"` will work out of the box.

- In `content.json`:
    ```json
    {
        "version": "1.2",
        "date": "20 August 2024",
        "size": "15.4MB",
        "type": "GitHub",
        "link": "/downloads/MBX_v1.2.zip"
    }
    ```
- The “Download” `<button>` in **`app/download/page.tsx`** should be replaced (if needed) with:
    ```tsx
    <a href={item.link} download>
        <button>Download</button>
    </a>
    ```
    to trigger a download rather than navigation.

---

## 3. Editing Content

1. Open **`content/`** in your editor.
2. Locate the JSON file for the page you want to modify (e.g. `"updates"`, `"about"`, `"publications"`, etc.).
3. For each array item or sub‐object, update titles, dates, descriptions, or file paths.
    - Always maintain correct JSON syntax (commas, quotes, brackets).
4. Save. The dev server (if running with `npm run dev`) will hot‐reload and reflect your changes immediately.

---

## Getting Started

### Install the dependencies from npm:

```bash
npm install
```

### Run the development server:

```bash
npm run dev
```

### Enter the following into your browser:

```bash
http://localhost:3000
```

## Code Quality and Linting

This project uses ESLint and Prettier to ensure code quality and consistent formatting.

### Linting Check

To manually check for linting errors, run:

```bash
npm run lint-check
```

### Auto-fix Linting Errors

To automatically fix linting errors, run

```bash
npm run lint-fix
```

### Prettier Formatting

To format your code with Prettier, run

```bash
npx prettier --write .
```

## Committing and Pushing

On commit, linting checks are automatically run to ensure code quality. Fix any errors manually or using the above commands, then stage those changes to proceed.

On push, a secret scan is triggered to ensure no sensitive data is accidentally pushed.

## Running Tests

To run Playwright tests, run

```bash
npm run test
```

## Deployment

This project is [deployed](https://nextjs-boilerplate-nu-six-50.vercel.app/) via Vercel. The demo page can be found at '/demo'.

Any changes to the 'main' branch will trigger Playwright tests and auto-deployment to Vercel.

## Contributing Guidelines

Branching + PR Guidelines (Work in Progress)

## Documentation

Link to Documentation (Work in Progress)
