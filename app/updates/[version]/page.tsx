// app/updates/[version]/page.tsx
import { notFound } from "next/navigation";
import content from "@/content/updates.json";
// import { FaGithub } from "react-icons/fa6";


type Update = {
    version: string;
    date: string;
    releaseNotes: { type: string; description: string }[];
    changelog: string[];
    type?: string;
    patch_notes?: string;
    download_link?: string;
}

export function generateStaticParams() {
    return (content as { updates: Update[] }).updates
}

export default async function UpdatePage({ params }: { params: Promise<{ version: string }> }) {
    const { version } = await params;

    const content_data: Update[] = content.updates;


    const data: Update[] = [];
    for (const content_item of content_data) {
        const item = { ...content_item }
        item.patch_notes ??= `https://github.com/paesanilab/MBX/releases/tag/v${item.version}`
        item.download_link ??= `https://github.com/paesanilab/MBX/archive/refs/tags/v${item.version}.zip`
        item.releaseNotes ??= [];
        item.changelog ??= [];
        data.push(item)
    }


    const update = data.find((u) => u.version === version);
    if (!update) {
        return notFound();
    }

    return (
        <div className="space-y-8">
            <div className="bg-[#030625] text-white min-h-screen h-full rounded-[40px] m-[20px] md:my-[70px] md:ml-[32px] md:mr-[45px]">
                <div className="flex flex-col p-[20px] md:p-[80px]">
                    <h2 className="font-bold text-3xl pb-[30px] md:pb-[50px]  flex justify-between align-center">
                        MBX v{update.version} [{update.date}]
                        <a
                            href={update.download_link}
                            download
                            className="bg-[#60A7FF] text-white font-bold px-4 py-1 rounded-3xl hover:bg-[#508fd4] transition text-xs md:px-6 md:py-2 md:text-sm"
                        >
                            Download v{update.version}
                        </a>
                    </h2>

                    {update.releaseNotes.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-2">Release Notes</h2>
                            <ul className="space-y-3">
                                {update.releaseNotes.map((note, i) => (
                                    <li key={i}>
                                        <span className="text-[#60A7FF] font-medium">
                                            {note.type}:
                                        </span>{" "}
                                        {note.description}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {update.changelog.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-2">Changelog</h2>
                            <ul className="list-disc pl-5 text-[#CCCCCC] space-y-1">
                                {update.changelog.map((feature, i) => (
                                    <li key={i}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="flex flex-wrap justify-between">
                        <a
                            href={update.patch_notes}
                            className="bg-[#60A7FF] text-white font-bold px-4 py-1 rounded-3xl hover:bg-[#508fd4] transition text-xs md:px-6 md:py-2 md:text-sm"
                        >
                            Full Patch Notes
                        </a>
                        <a
                            href={update.download_link}
                            download
                            className="bg-[#60A7FF] text-white font-bold px-4 py-1 rounded-3xl hover:bg-[#508fd4] transition text-xs md:px-6 md:py-2 md:text-sm"
                        >
                            Download v{update.version}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}