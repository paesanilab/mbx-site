# Paesani MBX Site

This README explains how to use the `content.json` file to edit the site’s pages, where to place images and downloadable files, and how to update content without modifying component code directly.

---

## 1. Overview of `content/content.json`

All page content lives in **`content/content.json`**. Each top‐level key corresponds to a section of the site:

-   **`home`**  
    Contains:

    -   `subheading` (string)
    -   `info_title` (string)
    -   `info` (string with `\n\n` for line breaks)

-   **`publications`**

    -   `items`: an array of publication objects
        ```json
        {
            "title": "...",
            "author": "...",
            "date": "...",
            "link": "...",
            "link_title": "...",
            "description": "...",
            "img_src": "/images/your_image.png",
            "img_alt": "Alt text"
        }
        ```
    -   If `img_src` is a non‐empty string, the Publications page will render an `<Image>` from `/public/images/`. If empty, no image is shown.

-   **`faq`**

    -   `items`: an array of `{ question: string, answer: string }`. Line breaks in `answer` can be represented by `\n\n`.

-   **`about`**

    -   `current`: array of people currently in the group
    -   `former`: array of former people  
        Each person object:

    ```json
    {
        "name": "Full Name",
        "role": "Title/Role",
        "image": "/images/filename.png"
    }
    ```

    -   If `"image"` is empty (`""`), that card will render without a photo.

-   **`download`**

    -   `versions`: array of downloadable version objects:
        ```json
        {
            "version": "1.2",
            "date": "20 August 2024",
            "size": "12.3MB",
            "type": "GitHub",
            "link": "/downloads/your_file.zip"
        }
        ```
    -   `bottom_description`: a short string displayed under the table/cards.
    -   Each `link` should point to a file in `public/downloads/` (see Section 2 for setup).

-   **`updates`**

    -   Array of update objects
        ```json
        {
            "id": "oct-2024",
            "version": "Version x.0",
            "date": "October 2024",
            "releaseNotes": [
                { "type": "Security update", "description": "Lorem ipsum…" },
                { "type": "Patch", "description": "Details…" }
            ],
            "newFeatures": ["Feature A: …", "Feature B: …"]
        }
        ```
    -   The `[id]` property must exactly match the folder name under `app/updates/[id]/page.tsx`.
    -   The sidebar and index page read from this array. To add, remove, or reorder update links, edit **`content.updates`**.

-   **`tutorials`**
    -   Keys: `comp`, `testing`, `jsn`, `executable`, `interfaces`, `coverage`
    -   Each is an array of objects `{ subheading: string, text: string }`.

---

## 2. Where to Place Static Assets

### 2.1 Images

-   Save all image files under **`public/images/`**.

    -   Example path: `public/images/francesco.png`
    -   In `content.json`, refer to `/images/francesco.png`.

-   The React components use Next.js’ built‐in `<Image>` component (which looks in `public/` automatically).
    -   If `content.about.current[i].image === "/images/test.png"`, the `<Image>` will resolve to `public/images/test.png`.
    -   Do not include `public` in the JSON path—omit it. Always start with `/images/...`.

### 2.2 Downloadable Files

-   Save files under **`public/downloads/`**.

    -   Example: if you place `MBX_v1.2.zip` in `public/downloads/MBX_v1.2.zip`, then in `content.download.versions` set `"link": "/downloads/MBX_v1.2.zip"`.
    -   Next.js serves everything in `public/` at root, so the download button’s `href="/downloads/MBX_v1.2.zip"` will work out of the box.

-   In `content.json`:
    ```json
    {
        "version": "1.2",
        "date": "20 August 2024",
        "size": "15.4MB",
        "type": "GitHub",
        "link": "/downloads/MBX_v1.2.zip"
    }
    ```
-   The “Download” `<button>` in **`app/download/page.tsx`** should be replaced (if needed) with:
    ```tsx
    <a href={item.link} download>
        <button>Download</button>
    </a>
    ```
    to trigger a download rather than navigation.

---

## 3. Editing Content

1. Open **`content/content.json`** in your editor.
2. Locate the section you want to modify (e.g. `"updates"`, `"about"`, `"publications"`, etc.).
3. For each array item or sub‐object, update titles, dates, descriptions, or file paths.
    - Always maintain correct JSON syntax (commas, quotes, brackets).
4. Save. The dev server (if running with `npm run dev`) will hot‐reload and reflect your changes immediately.

---

## 4. Folder Structure Overview

```
paesani-mbx-site/
├─ app/
│  ├─ about/
│  │  ├─ Contributors.tsx
│  │  └─ page.tsx
│  ├─ updates/
│  │  ├─ [id]/
│  │  │  └─ page.tsx
│  │  ├─ navbar.tsx
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ download/
│  │  └─ page.tsx
│  ├─ publications/
│  │  └─ page.tsx
│  ├─ faq/
│  │  └─ page.tsx
│  ├─ home/
│  │  └─ page.tsx
│  └─ about/
│     └─ page.tsx
├─ content/
│  └─ content.json
├─ public/
│  ├─ images/
│  │  ├─ francesco.png
│  │  └─ ...other images...
│  └─ downloads/
│     ├─ MBX_v1.2.zip
│     └─ ...other downloadable files...
├─ README.md
├─ package.json
└─ next.config.js
```

-   **`app/updates/[id]/page.tsx`** reads from `content.updates`.
-   **`app/updates/navbar.tsx`** renders the sidebar from `content.updates`.
-   **`app/updates/page.tsx`** lists all updates.
-   **`public/images/`** contains all images referenced in JSON.
-   **`public/downloads/`** contains any versioned files you want users to download.

---

## 5. Example: Adding a New Update

1. Save any images (if needed for release notes) under `public/images/`.
2. In `content/content.json`, append:
    ```json
    {
        "id": "nov-2024",
        "version": "Version x-3.0",
        "date": "November 2024",
        "releaseNotes": [{ "type": "Major Feature", "description": "Launched new GPU support." }],
        "newFeatures": ["Feature A: GPU accelerated routines", "Feature B: Interactive log viewer"]
    }
    ```
3. Now visiting `/updates/nov-2024` in your browser will render that page automatically.

---

## Getting Started

### Install the dependencies from npm:

```bash
npm install
```

### Update your .env file.

Copy paste the .env.example file and rename it to .env and update it with the values supplied by your EM.

### Generate the prisma types/ config:

```bash
npx prisma generate
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
