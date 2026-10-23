import React from "react";
import Markdown from "react-markdown";
import { useParams } from "react-router";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import supersub from "remark-supersub";
import "../../github-markdown.css";

import { tutorials as content } from "@/lib/content";

export default function SubTutorial() {
    const { path } = useParams<{ path: string }>();
    const update = content.tutorials.find((tutorial) => tutorial.path === path);
    if (!update) {
        return (
            <div className="bg-[#030625] text-white min-h-screen h-full rounded-[40px] m-[20px] md:my-[70px] md:ml-[32px] md:mr-[45px]">
                <div className="flex flex-col p-[20px] md:p-[80px]">
                    <h2 className="font-bold text-3xl">Tutorial not found</h2>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="bg-[#030625] text-white min-h-screen h-full rounded-[40px] m-[20px] md:my-[70px] md:ml-[32px] md:mr-[45px]">
                <div className="markdown-body flex flex-col p-[20px] rounded-[40px] md:p-[80px] text-xs md:text-base">
                    <Markdown
                        remarkPlugins={[[remarkGfm, { singleTilde: false }], remarkMath, supersub]}
                    >
                        {update.markdown_text}
                    </Markdown>
                </div>
            </div>
        </div>
    );
}
