export type Person = { name: string; role: string; image?: string };

export type Publication = {
    title: string;
    authors: string;
    date: string;
    citation: string;
    link: string;
    description: string;
    img_src: string;
    relationship?: string;
};

export type Update = {
    version: string;
    date: string;
    releaseNotes: { type: string; description: string }[];
    changelog: string[];
    type?: string;
    patch_notes?: string;
    download_link?: string;
    showDownloadCount?: boolean;
};

export type Tutorial = {
    heading: string;
    path: string;
    order: number;
    markdown_text: string;
};

export type SiteContent = {
    home: { subheading: string; info: string };
    about: { current: Person[]; former: Person[] };
    faq: { items: { question: string; answer: string }[] };
    publications: {
        items: Publication[];
        applications_intro: string;
        applications: Publication[];
    };
    updates: { updates: Update[] };
    tutorials: {
        introduction: { heading: string; markdown_text: string };
        tutorials: Tutorial[];
    };
};
