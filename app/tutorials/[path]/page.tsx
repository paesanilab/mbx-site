import React from "react";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math';
import supersub from "remark-supersub";
import "../github-markdown.css";

import { notFound } from "next/navigation";
import content from "@/content/tutorials.json";

type Tutorial = {
    heading: string;
    markdown_text: string;
    path?: string;
}

export function generateStaticParams() {
    return content.tutorials.map((tutorial: Tutorial) => ({
        title: tutorial.heading,
        markdown_text: tutorial.markdown_text,
        path: tutorial.path ?? tutorial.heading.toLowerCase().replace(/ /g, '-')
    }));
}

export default async function SubTutorial({ params }: { params: Promise<{ path: string }> }) {
    const { path } = await params;

    const content_data: Tutorial[] = content.tutorials; // Importing again from the JSON file

    const data: Tutorial[] = [];
    for (const content_item of content_data) {
        const item = { ...content_item }
        item.path ??= content_item.heading.toLowerCase().replace(/ /g, '-');
        data.push(item);
    }

    const update = data.find((u) => u.path === path);
    if (!update) {
        return notFound();
    }

    return (
        <div>
            <div className="bg-[#030625] text-white min-h-screen h-full rounded-[40px] m-[20px] md:my-[70px] md:ml-[32px] md:mr-[45px]">
                <div className="markdown-body flex flex-col p-[20px] rounded-[40px] md:p-[80px] text-xs md:text-base">
                    <Markdown remarkPlugins={[[remarkGfm, { singleTilde: false }], remarkMath, supersub]}>
                        {update.markdown_text}
                    </Markdown>
                </div>
            </div>
        </div>
    );
}
