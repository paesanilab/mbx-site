import Molecular from "@/components/molecular";

import data from "@/content/home.json";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./github-markdown.css";

export default function Home() {
    const homeData = data;
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 md:p-8">
            <Molecular />
            <h2 className="text-center text-xs md:text-sm font-bold md:w-4/5 mb-16">
                {homeData.subheading}
            </h2>

            <div className="max-w-7xl w-full">
                <div className="markdown-body  flex flex-col p-[20px] rounded-[40px] md:p-[80px] md:text-base shadow-md">
                    <Markdown remarkPlugins={[remarkGfm]}>{homeData.info}</Markdown>
                </div>
            </div>
        </div>
    );
}
