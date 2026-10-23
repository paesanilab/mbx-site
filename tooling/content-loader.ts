import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { parse } from "yaml";
import type { SiteContent, Tutorial } from "../lib/content-types.ts";

type Validator<T> = (value: unknown, location: string) => T;
type Shape<T> = { [K in keyof T]-?: Validator<T[K]> };

function invalid(location: string, expected: string): never {
    throw new Error(`${location}: expected ${expected}`);
}

const string: Validator<string> = (value, location) =>
    typeof value === "string" ? value : invalid(location, "a string");
const boolean: Validator<boolean> = (value, location) =>
    typeof value === "boolean" ? value : invalid(location, "a boolean");
const order: Validator<number> = (value, location) =>
    typeof value === "number" && Number.isInteger(value) && value > 0
        ? value
        : invalid(location, "a positive integer");
const nonempty: Validator<string> = (value, location) => {
    const result = string(value, location);
    return result.trim() ? result : invalid(location, "a nonempty string");
};
const routePath: Validator<string> = (value, location) => {
    const result = nonempty(value, location);
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(result)
        ? result
        : invalid(location, "a lowercase, hyphen-separated URL path");
};

function optional<T>(validate: Validator<T>): Validator<T | undefined> {
    return (value, location) => (value === undefined ? undefined : validate(value, location));
}

function array<T>(validate: Validator<T>): Validator<T[]> {
    return (value, location) => {
        if (!Array.isArray(value)) invalid(location, "an array");
        return value.map((item, index) => validate(item, `${location}[${index}]`));
    };
}

function object<T>(shape: Shape<T>): Validator<T> {
    return (value, location) => {
        if (value === null || typeof value !== "object" || Array.isArray(value)) {
            invalid(location, "an object");
        }
        const source = value as Record<string, unknown>;
        // Keep additional fields and distinguish absent optional fields from empty strings.
        const result = { ...source };
        for (const key of Object.keys(shape) as (keyof T & string)[]) {
            const parsed = shape[key](source[key], `${location}.${key}`);
            if (parsed !== undefined) result[key] = parsed;
        }
        return result as T;
    };
}

const person = object<SiteContent["about"]["current"][number]>({
    name: string,
    role: string,
    image: optional(string),
});
const publication = object<SiteContent["publications"]["items"][number]>({
    title: string,
    authors: string,
    date: string,
    citation: string,
    link: string,
    description: string,
    img_src: string,
    relationship: optional(string),
});
const update = object<SiteContent["updates"]["updates"][number]>({
    version: string,
    date: string,
    releaseNotes: array(object({ type: string, description: string })),
    changelog: array(string),
    type: optional(string),
    patch_notes: optional(string),
    download_link: optional(string),
    showDownloadCount: optional(boolean),
});
const tutorialMetadata = object<Omit<Tutorial, "markdown_text">>({
    heading: nonempty,
    path: routePath,
    order,
});

function read<T>(file: string, parseSource: (source: string) => T): T {
    try {
        return parseSource(readFileSync(file, "utf8"));
    } catch (error) {
        throw new Error(`${file}: ${error instanceof Error ? error.message : String(error)}`);
    }
}

function yaml<T>(root: string, file: string, validate: Validator<T>): T {
    return read(path.join(root, file), (source) => validate(parse(source), "$"));
}

function markdown(file: string) {
    return read(file, (source) => {
        if (!/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/.test(source)) {
            invalid("front matter", "a YAML metadata block enclosed by --- lines");
        }
        return matter(source, { engines: { yaml: (metadata) => parse(metadata) } });
    });
}

export function loadContent(root: string): SiteContent {
    const home = yaml(
        root,
        "pages/home.yaml",
        object<SiteContent["home"]>({
            subheading: string,
            info: string,
        }),
    );
    const about = yaml(
        root,
        "pages/about.yaml",
        object<SiteContent["about"]>({
            current: array(person),
            former: array(person),
        }),
    );
    const faq = yaml(
        root,
        "pages/faq.yaml",
        object<SiteContent["faq"]>({
            items: array(object({ question: string, answer: string })),
        }),
    );
    const publications = yaml(
        root,
        "publications/index.yaml",
        object<SiteContent["publications"]>({
            items: array(publication),
            applications_intro: string,
            applications: array(publication),
        }),
    );
    const updates = yaml(
        root,
        "updates/index.yaml",
        object<SiteContent["updates"]>({
            updates: array(update),
        }),
    );

    const tutorialRoot = path.join(root, "tutorials");
    const introductionFile = path.join(tutorialRoot, "index.md");
    const intro = markdown(introductionFile);
    const introduction = {
        ...object({ heading: nonempty })(intro.data, introductionFile),
        markdown_text: intro.content,
    };
    const paths = new Map<string | number, string>();
    const orders = new Map<string | number, string>();
    const tutorials = readdirSync(tutorialRoot)
        .filter((file) => file.endsWith(".md") && file !== "index.md")
        .map((filename) => {
            const file = path.join(tutorialRoot, filename);
            const parsed = markdown(file);
            const metadata = tutorialMetadata(parsed.data, file);
            for (const [field, value, seen] of [
                ["path", metadata.path, paths],
                ["order", metadata.order, orders],
            ] as const) {
                // Both maps identify the original file in duplicate diagnostics.
                const previous = seen.get(value);
                if (previous) {
                    throw new Error(
                        `${file}.${field}: duplicate ${value}; already used by ${previous}`,
                    );
                }
                seen.set(value, file);
            }
            return { ...metadata, markdown_text: parsed.content };
        })
        .sort((a, b) => a.order - b.order);

    return { home, about, faq, publications, updates, tutorials: { introduction, tutorials } };
}
