import React from "react";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import "./github-markdown.css";

import data from "@/content/tutorials.json";

export default function MainTutorial() {
    const item = data.introduction;
    return (
        <div>
            <div className="bg-[#030625] text-white min-h-screen h-full rounded-[40px] m-[20px] md:my-[70px] md:ml-[32px] md:mr-[45px]">
                <div className="markdown-body flex flex-col p-[20px] rounded-[40px] md:p-[80px] text-xs md:text-base">
                    <Markdown remarkPlugins={[remarkGfm]}>
                        {item.markdown_text}
                    </Markdown>
                </div>
            </div>
        </div>
    );
}
